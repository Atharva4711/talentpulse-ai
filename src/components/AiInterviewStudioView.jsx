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
  isDark,
  activeDrive, 
  currentTenant,
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
      organization: currentTenant?.name || 'Recruitment Organization',
      role: activeDrive.title || activeDrive.role || 'Job Candidate',
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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-8 animate-in fade-in duration-300">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <button
            onClick={onBackToTechnical}
            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 flex items-center gap-1 mb-2 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-3.5 h-3.5" /> Back to Technical Assessment
          </button>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Multimodal AI HR Interview Studio
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Real-time Computer Vision Gaze HUD & Acoustic Telemetry for <strong className="text-slate-900 dark:text-white">{activeDrive.title || activeDrive.role}</strong> at {currentTenant?.name || 'Client Organization'}
          </p>
        </div>

        {/* Status Pill */}
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Telemetry: 60 FPS Active</span>
          </span>
        </div>
      </div>

      {/* Main Studio Frame */}
      <div className={`p-6 sm:p-8 rounded-3xl border transition-all ${
        isDark ? 'glass-panel-dark' : 'glass-panel-light'
      } space-y-8`}>
        
        {/* Dual Stream Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* AI Interviewer Persona: Sarah Jenkins */}
          <div className="space-y-4">
            <div className={`p-6 rounded-3xl border flex flex-col items-center justify-center text-center relative overflow-hidden transition-all ${
              isDark ? 'bg-slate-900/90 border-slate-700/80' : 'bg-slate-900 text-white border-slate-800'
            }`}>
              <div className="relative mb-4">
                <div className={`w-24 h-24 rounded-full p-1 transition-all ${
                  isAiSpeaking 
                    ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-spin-slow' 
                    : 'bg-slate-700'
                }`}>
                  <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center text-white overflow-hidden">
                    <Bot className="w-12 h-12 text-indigo-400" />
                  </div>
                </div>

                {isAiSpeaking && (
                  <span className="absolute -bottom-1 -right-1 px-2 py-0.5 rounded-full bg-indigo-600 text-[10px] font-black uppercase tracking-wider text-white shadow-md animate-pulse">
                    Speaking
                  </span>
                )}
              </div>

              <h3 className="text-base font-black text-white">Sarah Jenkins</h3>
              <p className="text-xs text-indigo-300">Lead Campus Talent Partner • {activeDrive.company}</p>

              {/* Dynamic Waveform Visualizer */}
              <div className="flex items-center gap-1.5 h-8 my-4">
                {[...Array(12)].map((_, i) => (
                  <div 
                    key={i}
                    className={`w-1 rounded-full transition-all duration-150 ${
                      isAiSpeaking ? 'bg-indigo-400' : 'bg-slate-700'
                    }`}
                    style={{
                      height: isAiSpeaking ? `${Math.max(6, (Math.sin(i + Date.now() / 150) * 16 + 18))}px` : '6px'
                    }}
                  />
                ))}
              </div>

              {/* Spoken Question Box */}
              <div className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 text-left">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-black uppercase tracking-wider text-indigo-300">
                    Round {currentQuestionIdx + 1} of 4 • {currentQ.stage.toUpperCase()}
                  </span>
                  <button 
                    onClick={speakCurrentQuestion}
                    className="text-[11px] font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" /> Replay Voice
                  </button>
                </div>
                <p className="text-xs sm:text-sm text-slate-100 font-medium leading-relaxed">
                  "{currentQ.question}"
                </p>
              </div>
            </div>
          </div>

          {/* Candidate Webcam & Real-Time Computer Vision HUD */}
          <div className="space-y-4">
            <div className="relative rounded-3xl overflow-hidden bg-slate-950 aspect-4/3 border border-slate-800 shadow-xl flex items-center justify-center">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover -scale-x-100"
              />

              {/* HUD Reticle Overlay */}
              <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4">
                
                {/* Top HUD Stats */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono text-emerald-400">
                    <Eye className="w-3.5 h-3.5" />
                    <span>EYE CONTACT: {telemetry.eyeContactRatio}%</span>
                  </div>

                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono text-indigo-300">
                    <Smile className="w-3.5 h-3.5" />
                    <span>{telemetry.sentiment}</span>
                  </div>
                </div>

                {/* Center Target Box */}
                <div className="self-center w-36 h-36 border border-emerald-500/40 rounded-2xl flex items-center justify-center relative">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping absolute" />
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="absolute -bottom-5 text-[9px] font-mono text-emerald-400/80 uppercase">
                    Face Alignment Target
                  </span>
                </div>

                {/* Bottom HUD Metrics */}
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-300">
                  <span className="bg-black/60 px-2 py-1 rounded-lg border border-white/10">
                    POSTURE: {telemetry.postureStability}%
                  </span>
                  <span className="bg-black/60 px-2 py-1 rounded-lg border border-white/10 text-amber-300">
                    WPM: {acoustics.wpm} | FILLERS: {acoustics.fillerCount}
                  </span>
                </div>
              </div>
            </div>

            {/* Candidate Response Workspace */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Candidate Spoken & Written Answer:
                </label>

                <button
                  id="mic-toggle-btn"
                  onClick={toggleListening}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    isCandidateSpeaking
                      ? 'bg-red-600 hover:bg-red-700 text-white animate-pulse shadow-md shadow-red-600/25'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
                  }`}
                >
                  {isCandidateSpeaking ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                  <span>{isCandidateSpeaking ? 'Stop Mic' : 'Speak into Microphone'}</span>
                </button>
              </div>

              <textarea
                value={candidateAnswer}
                onChange={(e) => setCandidateAnswer(e.target.value)}
                placeholder="Click 'Speak into Microphone' or type your response here..."
                rows={3}
                className={`w-full rounded-2xl p-3.5 text-xs outline-none leading-relaxed resize-none border transition-all ${
                  isDark 
                    ? 'bg-slate-900 border-slate-700 text-slate-100 placeholder-slate-500 focus:border-indigo-500' 
                    : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-indigo-500'
                }`}
              />

              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                  {candidateAnswer.split(/\s+/).filter(Boolean).length} words recorded
                </span>

                <button
                  id="submit-answer-next-btn"
                  onClick={handleSubmitAnswer}
                  disabled={isEvaluating}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
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
                <div className="mt-4 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-emerald-800 dark:text-emerald-300">All 4 Interview Rounds Successfully Completed!</div>
                    <div className="text-[11px] text-emerald-700 dark:text-emerald-400">Biometric and verbal telemetry compiled into your placement dossier.</div>
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
