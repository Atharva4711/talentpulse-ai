import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  Volume2, 
  VolumeX, 
  Send, 
  Sparkles, 
  Eye, 
  Smile, 
  Activity, 
  Layers, 
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
  
  // Real-time Computer Vision Telemetry
  const [telemetry, setTelemetry] = useState({
    eyeContactRatio: 92,
    isLookingAtCamera: true,
    postureStability: 95,
    sentiment: 'Confident & Focused',
    confidenceScore: 91,
    faceBox: { x: 30, y: 25, width: 40, height: 50 }
  });

  // Acoustic Telemetry
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

  // 1. Initialize Webcam & Vision Analyzer
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

  // 2. Speak initial question when question changes
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

  // 3. Microphone voice input toggle
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

  // 4. Submit Answer & Progress through Interview
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner: Interview Header & Multi-Model Swarm Selector */}
      <div className="p-6 rounded-2xl light-card border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <button
            onClick={onBackToTechnical}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 mb-2 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-3.5 h-3.5" /> Back to Technical Round
          </button>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" /> Phase 3: Live Multimodal AI HR Interview
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Behavioral, STAR & Gesture Assessment
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Multimodal evaluation powered by real-time speech tokenization and computer vision telemetry.
          </p>
        </div>

        {/* AI Co-Worker Model Selector */}
        <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200 text-xs">
          <Cpu className="w-4 h-4 text-indigo-600" />
          <span className="text-slate-600 font-semibold">Active AI Engine:</span>
          <select
            value={activeModel}
            onChange={(e) => setActiveModel(e.target.value)}
            className="bg-white text-slate-900 font-semibold rounded-lg px-2.5 py-1.5 border border-slate-200 outline-none cursor-pointer shadow-2xs"
          >
            <option value="Claude 3.5 Sonnet + Gemini Flash">Claude 3.5 Sonnet + Gemini Flash (Dual-Swarm)</option>
            <option value="OpenAI GPT-4o Enterprise">OpenAI GPT-4o Enterprise</option>
            <option value="OmniRoute Local Viva Engine">OmniRoute Zero-Failure Offline Engine</option>
          </select>
        </div>
      </div>

      {/* Main Studio Dual Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: AI HR Persona & Animated Avatar */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl light-card border border-slate-200 space-y-6 flex flex-col justify-between min-h-[580px]">
            
            {/* Persona Header & Progress */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center shadow-md shadow-indigo-500/20 text-white">
                    <Bot className="w-6 h-6" />
                    {isAiSpeaking && (
                      <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white animate-ping" />
                    )}
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-slate-900">Sarah Jenkins</h2>
                    <p className="text-xs text-indigo-600 font-semibold">Senior Campus Placement Director</p>
                  </div>
                </div>

                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                  Question {currentQuestionIdx + 1} of {HR_INTERVIEW_QUESTIONS.length}
                </span>
              </div>

              {/* Stage Breadcrumb */}
              <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-2">
                {currentQ.stage}
              </div>

              {/* Animated Avatar Visualizer & Audio Waveform */}
              <div className="relative h-44 rounded-2xl bg-slate-900 text-white border border-slate-800 flex flex-col items-center justify-center overflow-hidden p-4 shadow-inner">
                {/* Visualizer Aura Rings */}
                <div className={`absolute w-32 h-32 rounded-full border border-indigo-400/20 transition-all duration-700 ${isAiSpeaking ? 'scale-125 border-indigo-400/40 animate-pulse' : 'scale-100'}`} />
                <div className={`absolute w-24 h-24 rounded-full border border-violet-400/30 transition-all duration-500 ${isAiSpeaking ? 'scale-110 border-violet-400/60' : 'scale-90'}`} />
                
                {/* Avatar Icon */}
                <div className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-600 flex items-center justify-center shadow-xl shadow-indigo-500/40 border border-white/20">
                  <Bot className="w-8 h-8 text-white" />
                </div>

                {/* Live Waveform Equalizer Bars */}
                <div className="flex items-center gap-1.5 mt-4 z-10">
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
              <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
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
                <p className="text-sm font-semibold text-slate-900 leading-relaxed">
                  "{currentQ.question}"
                </p>
              </div>
            </div>

            {/* Turn History Preview */}
            {interviewTurns.length > 0 && (
              <div className="pt-2 border-t border-slate-200">
                <span className="text-xs text-slate-600 block mb-2 font-bold">Answered Questions:</span>
                <div className="space-y-1.5 max-h-28 overflow-y-auto pr-1">
                  {interviewTurns.map((turn, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                      <span className="text-slate-700 font-semibold truncate max-w-[200px]">
                        Q{idx + 1}: {turn.stage.split(':')[1] || turn.stage}
                      </span>
                      <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {turn.evaluation.score}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Right Column: Live Candidate Studio & Computer Vision HUD */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-2xl light-card border border-slate-200 space-y-6">
            
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Video className="w-4 h-4 text-emerald-600" /> Candidate Video & Biometric Feed
              </h2>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Live Vision Telemetry 60 FPS
              </span>
            </div>

            {/* Video Viewport with HUD Overlay */}
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-lg">
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

              {/* HUD Top Overlay Bar */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                <div className="flex items-center gap-2 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10 text-[11px] font-mono text-cyan-300">
                  <Eye className="w-3.5 h-3.5 text-cyan-400" />
                  <span>GAZE TRACKING: {telemetry.eyeContactRatio}% STABLE</span>
                </div>

                <div className="flex items-center gap-2 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10 text-[11px] font-mono text-emerald-300">
                  <Smile className="w-3.5 h-3.5 text-emerald-400" />
                  <span>SENTIMENT: {telemetry.sentiment.toUpperCase()}</span>
                </div>
              </div>

              {/* HUD Bottom Overlay Bar */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                <div className="flex items-center gap-2 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10 text-[11px] font-mono text-slate-300">
                  <Activity className="w-3.5 h-3.5 text-indigo-400" />
                  <span>POSTURE STABILITY: {telemetry.postureStability}%</span>
                </div>

                <div className="flex items-center gap-2 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10 text-[11px] font-mono text-amber-300">
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

                {/* Microphone Toggle Button */}
                <button
                  id="mic-toggle-btn"
                  onClick={toggleListening}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    isCandidateSpeaking
                      ? 'bg-red-600 hover:bg-red-700 text-white animate-pulse shadow-md shadow-red-600/30'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
                  }`}
                >
                  {isCandidateSpeaking ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                  <span>{isCandidateSpeaking ? 'Stop Mic Recording' : 'Speak into Microphone'}</span>
                </button>
              </div>

              {/* Answer Transcript Textarea */}
              <textarea
                value={candidateAnswer}
                onChange={(e) => setCandidateAnswer(e.target.value)}
                placeholder="Click 'Speak into Microphone' or type your response here..."
                rows={4}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-900 placeholder-slate-400 font-sans focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none leading-relaxed resize-none"
              />

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] text-slate-500 font-medium">
                  {candidateAnswer.split(/\s+/).filter(Boolean).length} words spoken
                </span>

                <button
                  id="submit-answer-next-btn"
                  onClick={handleSubmitAnswer}
                  disabled={isEvaluating}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
                >
                  {isEvaluating ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>AI Evaluating Verbal & Biometric Data...</span>
                    </>
                  ) : (
                    <>
                      <span>{currentQuestionIdx + 1 === HR_INTERVIEW_QUESTIONS.length ? 'Submit Final Answer & View Placement Dossier' : 'Submit Answer & Next Question'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              {/* Transition to Phase 4 (Dossier) once completed */}
              {isCompleted && (
                <div className="mt-4 p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-emerald-800">All 4 Interview Rounds Successfully Completed!</div>
                    <div className="text-[11px] text-emerald-700">Biometric and verbal analysis compiled into your placement dossier.</div>
                  </div>
                  <button
                    id="view-final-dossier-btn"
                    onClick={onProceedToDossier}
                    className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-emerald-600/20 cursor-pointer"
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
