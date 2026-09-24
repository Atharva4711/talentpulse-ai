import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  Mic, 
  MicOff, 
  Video, 
  Volume2, 
  Sparkles, 
  Eye, 
  Smile, 
  Activity, 
  CheckCircle2, 
  ArrowRight,
  Cpu,
  RefreshCw,
  ChevronLeft
} from 'lucide-react';
import { HR_INTERVIEW_QUESTIONS } from '../data/mockData';
import { speechEngine } from '../utils/speechEngine';
import { visionAnalyzer } from '../utils/visionAnalyzer';
import { aiGateway } from '../utils/aiGateway';

export default function AiInterviewStudioView({ 
  activeDrive, 
  candidateState, 
  setCandidateState, 
  onProceedToDossier,
  onBackToTechnical 
}) {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [candidateAnswer, setCandidateAnswer] = useState('');
  const [isAiSpeaking, setIsAiSpeaking] = useState(false);
  const [isCandidateSpeaking, setIsCandidateSpeaking] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [activeModel, setActiveModel] = useState('Claude 3.5 Sonnet + Gemini Flash');
  const [apiKeyInput, setApiKeyInput] = useState('');
  
  const [telemetry, setTelemetry] = useState({
    eyeContactRatio: 92,
    isLookingAtCamera: true,
    postureStability: 95,
    sentiment: 'Confident & Focused',
    confidenceScore: 91,
    faceBox: { x: 30, y: 25, width: 40, height: 50 }
  });

  const [acoustics, setAcoustics] = useState({
    wpm: 132,
    fillerCount: 0,
    paceVerdict: 'Optimal Conversational Pace'
  });

  const [interviewTurns, setInterviewTurns] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);

  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const animationFrameRef = useRef(null);

  const currentQ = HR_INTERVIEW_QUESTIONS[currentQuestionIdx];

  useEffect(() => {
    let active = true;

    async function setupCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: 'user' },
          audio: false
        });
        if (!active) return;
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          visionAnalyzer.attachVideo(videoRef.current);
          visionAnalyzer.start();
        }
      } catch (err) {
        console.warn('[Camera] Using mock video telemetry:', err.message);
      }
    }

    setupCamera();

    const runVisionLoop = () => {
      const metrics = visionAnalyzer.analyzeCurrentFrame();
      setTelemetry(metrics);
      animationFrameRef.current = requestAnimationFrame(runVisionLoop);
    };
    runVisionLoop();

    return () => {
      active = false;
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
      }
      visionAnalyzer.stop();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (currentQ && !isCompleted) {
      speakCurrentQuestion();
    }
  }, [currentQuestionIdx]);

  const speakCurrentQuestion = () => {
    setIsAiSpeaking(true);
    speechEngine.speak(currentQ.question, () => {
      setIsAiSpeaking(false);
    });
  };

  const toggleListening = () => {
    if (isCandidateSpeaking) {
      speechEngine.stopListening();
      setIsCandidateSpeaking(false);
    } else {
      setIsCandidateSpeaking(true);
      speechEngine.startListening((text) => {
        setCandidateAnswer(text);
        const ac = speechEngine.calculateAcoustics(text, 25);
        setAcoustics(ac);
      });
    }
  };

  const handleSubmitAnswer = async () => {
    if (!candidateAnswer.trim() && candidateAnswer.length < 5) {
      alert('Please provide your response either via microphone or typing.');
      return;
    }

    if (isCandidateSpeaking) {
      speechEngine.stopListening();
      setIsCandidateSpeaking(false);
    }

    setIsEvaluating(true);

    const evaluation = await aiGateway.generateInterviewTurn({
      question: currentQ.question,
      candidateAnswer,
      stage: currentQ.stage,
      apiKey: apiKeyInput
    });

    const turnRecord = {
      questionId: currentQ.id,
      stage: currentQ.stage,
      question: currentQ.question,
      answer: candidateAnswer,
      evaluation,
      eyeContact: telemetry.eyeContactRatio,
      postureStability: telemetry.postureStability,
      sentiment: telemetry.sentiment,
      acoustics
    };

    const updatedTurns = [...interviewTurns, turnRecord];
    setInterviewTurns(updatedTurns);
    setIsEvaluating(false);
    setCandidateAnswer('');

    if (currentQuestionIdx + 1 < HR_INTERVIEW_QUESTIONS.length) {
      setCurrentQuestionIdx(prev => prev + 1);
    } else {
      setIsCompleted(true);
      const avgScore = Math.round(updatedTurns.reduce((acc, t) => acc + t.evaluation.score, 0) / updatedTurns.length);
      const avgEyeContact = Math.round(updatedTurns.reduce((acc, t) => acc + t.eyeContact, 0) / updatedTurns.length);
      const avgWpm = Math.round(updatedTurns.reduce((acc, t) => acc + t.acoustics.wpm, 0) / updatedTurns.length);
      const totalFillers = updatedTurns.reduce((acc, t) => acc + t.acoustics.fillerCount, 0);

      setCandidateState(prev => ({
        ...prev,
        interviewResult: {
          completed: true,
          overallScore: avgScore,
          eyeContactRatio: avgEyeContact,
          speechWpm: avgWpm,
          fillerWordsCount: totalFillers,
          turns: updatedTurns,
          aiRemark: "Candidate exhibited solid composure, structured responses, and high behavioral readiness."
        }
      }));
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <button
            onClick={onBackToTechnical}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 mb-2 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-3.5 h-3.5" /> Back to Technical Round
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Live AI HR Interview Studio
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Multimodal evaluation for <strong className="text-slate-800">{activeDrive.company}</strong> ({activeDrive.role})
          </p>
        </div>

        {/* AI Co-Worker Model Selector */}
        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-200 shadow-2xs text-xs">
          <Cpu className="w-4 h-4 text-indigo-600" />
          <span className="text-slate-500 font-semibold">Engine:</span>
          <select
            value={activeModel}
            onChange={(e) => setActiveModel(e.target.value)}
            className="bg-transparent text-slate-800 font-semibold outline-none cursor-pointer"
          >
            <option value="Claude 3.5 Sonnet + Gemini Flash">Claude 3.5 Sonnet + Gemini Flash</option>
            <option value="OpenAI GPT-4o Enterprise">OpenAI GPT-4o Enterprise</option>
            <option value="OmniRoute Local Viva Engine">Zero-Failure Offline Engine</option>
          </select>
        </div>
      </div>

      {/* Main Studio Dual Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: AI HR Persona & Animated Avatar */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-7 rounded-3xl light-card border border-slate-200 space-y-6 flex flex-col justify-between min-h-[540px]">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center shadow-xs text-white">
                    <Bot className="w-6 h-6" />
                    {isAiSpeaking && (
                      <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white animate-ping" />
                    )}
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-slate-900">Sarah Jenkins</h2>
                    <p className="text-xs text-indigo-600 font-semibold">Senior Placement Director</p>
                  </div>
                </div>

                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                  {currentQuestionIdx + 1} / {HR_INTERVIEW_QUESTIONS.length}
                </span>
              </div>

              {/* Stage Breadcrumb */}
              <div className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider mb-2">
                {currentQ.stage}
              </div>

              {/* Animated Avatar Visualizer & Audio Waveform */}
              <div className="relative h-40 rounded-2xl bg-slate-900 text-white border border-slate-800 flex flex-col items-center justify-center overflow-hidden p-4 shadow-inner">
                <div className={`absolute w-32 h-32 rounded-full border border-indigo-400/20 transition-all duration-700 ${isAiSpeaking ? 'scale-125 border-indigo-400/40 animate-pulse' : 'scale-100'}`} />
                <div className={`absolute w-24 h-24 rounded-full border border-violet-400/30 transition-all duration-500 ${isAiSpeaking ? 'scale-110 border-violet-400/60' : 'scale-90'}`} />
                
                <div className="relative z-10 w-14 h-14 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-600 flex items-center justify-center shadow-md border border-white/20">
                  <Bot className="w-7 h-7 text-white" />
                </div>

                {/* Live Waveform Equalizer Bars */}
                <div className="flex items-center gap-1.5 mt-3.5 z-10">
                  {[12, 24, 38, 18, 42, 28, 16, 34, 20, 30].map((baseHeight, idx) => (
                    <div
                      key={idx}
                      className={`w-1 rounded-full transition-all duration-200 ${
                        isAiSpeaking 
                          ? 'bg-gradient-to-t from-indigo-400 to-cyan-300' 
                          : isCandidateSpeaking 
                          ? 'bg-gradient-to-t from-emerald-400 to-teal-300' 
                          : 'bg-slate-700'
                      }`}
                      style={{
                        height: isAiSpeaking 
                          ? `${Math.max(8, (baseHeight * (idx % 2 === 0 ? 1.2 : 0.8)))}px` 
                          : isCandidateSpeaking 
                          ? `${Math.max(6, (baseHeight * 0.7))}px` 
                          : '6px'
                      }}
                    />
                  ))}
                </div>

                <div className="text-[11px] text-slate-300 mt-2 font-medium">
                  {isAiSpeaking ? 'Sarah is speaking...' : isCandidateSpeaking ? 'Listening to candidate...' : 'Awaiting candidate response'}
                </div>
              </div>

              {/* Current Spoken Question Box */}
              <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700">Interview Prompt:</span>
                  <button
                    onClick={speakCurrentQuestion}
                    className="text-xs text-indigo-600 hover:text-indigo-800 flex items-center gap-1 font-semibold transition-colors cursor-pointer"
                    title="Repeat question"
                  >
                    <Volume2 className="w-3.5 h-3.5" /> Replay Voice
                  </button>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-slate-900 leading-relaxed">
                  "{currentQ.question}"
                </p>
              </div>
            </div>

            {/* Answered turns count */}
            {interviewTurns.length > 0 && (
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                <span>Completed Responses:</span>
                <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {interviewTurns.length} of {HR_INTERVIEW_QUESTIONS.length} Done
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Live Candidate Studio & Computer Vision HUD */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-7 rounded-3xl light-card border border-slate-200 space-y-6">
            
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Video className="w-4 h-4 text-emerald-600" /> Candidate Video & Biometric Feed
              </h2>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Live Vision Telemetry 60 FPS
              </span>
            </div>

            {/* Video Viewport with HUD Overlay */}
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-md">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover transform -scale-x-100"
              />

              {/* HUD Target Reticle */}
              <div 
                className="absolute border-2 border-cyan-400/80 rounded-xl transition-all duration-300 pointer-events-none shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                style={{
                  left: `${telemetry.faceBox.x}%`,
                  top: `${telemetry.faceBox.y}%`,
                  width: `${telemetry.faceBox.width}%`,
                  height: `${telemetry.faceBox.height}%`
                }}
              >
                <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-cyan-300" />
                <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-cyan-300" />
                <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-cyan-300" />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-cyan-300" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-400 shadow-md shadow-cyan-400 animate-ping" />
              </div>

              {/* HUD Top Bar */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                <div className="flex items-center gap-1.5 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 text-[10px] font-mono text-cyan-300">
                  <Eye className="w-3 h-3 text-cyan-400" />
                  <span>EYE CONTACT: {telemetry.eyeContactRatio}% STABLE</span>
                </div>

                <div className="flex items-center gap-1.5 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 text-[10px] font-mono text-emerald-300">
                  <Smile className="w-3 h-3 text-emerald-400" />
                  <span>{telemetry.sentiment.toUpperCase()}</span>
                </div>
              </div>

              {/* HUD Bottom Bar */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                <div className="flex items-center gap-1.5 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 text-[10px] font-mono text-slate-300">
                  <Activity className="w-3 h-3 text-indigo-400" />
                  <span>POSTURE: {telemetry.postureStability}%</span>
                </div>

                <div className="flex items-center gap-1.5 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 text-[10px] font-mono text-amber-300">
                  <span>WPM: {acoustics.wpm} | FILLERS: {acoustics.fillerCount}</span>
                </div>
              </div>
            </div>

            {/* Candidate Response Workspace */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700">
                  Candidate Spoken & Written Answer:
                </label>

                <button
                  id="mic-toggle-btn"
                  onClick={toggleListening}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    isCandidateSpeaking
                      ? 'bg-red-600 hover:bg-red-700 text-white animate-pulse shadow-md shadow-red-600/25'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-2xs'
                  }`}
                >
                  {isCandidateSpeaking ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                  <span>{isCandidateSpeaking ? 'Stop Recording' : 'Speak into Microphone'}</span>
                </button>
              </div>

              <textarea
                value={candidateAnswer}
                onChange={(e) => setCandidateAnswer(e.target.value)}
                placeholder="Click 'Speak into Microphone' or type your response here..."
                rows={3}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-xs text-slate-900 placeholder-slate-400 font-sans focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none leading-relaxed resize-none"
              />

              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-slate-500 font-medium">
                  {candidateAnswer.split(/\s+/).filter(Boolean).length} words spoken
                </span>

                <button
                  id="submit-answer-next-btn"
                  onClick={handleSubmitAnswer}
                  disabled={isEvaluating}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-2 shadow-xs transition-all cursor-pointer"
                >
                  {isEvaluating ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Evaluating Response...</span>
                    </>
                  ) : (
                    <>
                      <span>{currentQuestionIdx + 1 === HR_INTERVIEW_QUESTIONS.length ? 'Submit Final Answer' : 'Submit Answer & Next'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              {isCompleted && (
                <div className="mt-4 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-emerald-800">All 4 Interview Rounds Successfully Completed!</div>
                    <div className="text-[11px] text-emerald-700">Biometric and verbal telemetry compiled into your placement dossier.</div>
                  </div>
                  <button
                    id="view-final-dossier-btn"
                    onClick={onProceedToDossier}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <span>View Placement Dossier</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
