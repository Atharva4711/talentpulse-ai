import React from 'react';
import { 
  Award, 
  CheckCircle2, 
  FileText, 
  Code2, 
  Bot, 
  Printer, 
  ArrowLeft, 
  TrendingUp, 
  Eye, 
  Mic, 
  ShieldCheck, 
  Sparkles,
  Users,
  ChevronLeft,
  Building2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import OfficialLetterModal from './OfficialLetterModal';

export default function CandidateDossierView({ 
  isDark,
  candidateState, 
  activeDrive, 
  currentTenant,
  onResetWorkflow,
  onSwitchToTpo 
}) {
  const [showLetterModal, setShowLetterModal] = React.useState(false);

  React.useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {}
  }, []);

  const atsScore = candidateState.atsResult?.atsScore || 92;
  const techScore = candidateState.techResult?.score || 95;
  const interviewScore = candidateState.interviewResult?.overallScore || 88;
  const eyeContactRatio = candidateState.interviewResult?.eyeContactRatio || 94;
  const speechWpm = candidateState.interviewResult?.speechWpm || 132;
  const fillerCount = candidateState.interviewResult?.fillerWordsCount || 3;

  const compositeScore = Math.round((atsScore * 0.35) + (techScore * 0.35) + (interviewScore * 0.30));

  let verdict = 'Strong Hire';
  let verdictStyle = 'bg-emerald-50 text-emerald-800 border-emerald-300 dark:bg-emerald-950/80 dark:text-emerald-300 dark:border-emerald-800';
  let verdictSummary = 'Exceptional candidate demonstrating deep technical mastery, structured STAR communication, and strong cultural alignment.';

  if (compositeScore < 70) {
    verdict = 'Needs Improvement';
    verdictStyle = 'bg-red-50 text-red-800 border-red-300 dark:bg-red-950/80 dark:text-red-300 dark:border-red-800';
    verdictSummary = 'Candidate requires targeted coaching in technical fundamentals and speech filler reduction prior to corporate placement drives.';
  } else if (compositeScore < 82) {
    verdict = 'Hire with Training';
    verdictStyle = 'bg-amber-50 text-amber-800 border-amber-300 dark:bg-amber-950/80 dark:text-amber-300 dark:border-amber-800';
    verdictSummary = 'Solid candidate with demonstrable aptitude; recommend fast-track onboarding and structured behavioral mentoring.';
  }

  // 5-Axis Radar Chart SVG Points Calculation
  const cx = 150;
  const cy = 150;
  const radius = 105;

  const axes = [
    { label: 'ATS Match', val: atsScore },
    { label: 'Tech Depth', val: techScore },
    { label: 'Communication', val: interviewScore },
    { label: 'Eye Contact', val: eyeContactRatio },
    { label: 'STAR Rigor', val: Math.min(100, interviewScore + 6) }
  ];

  const points = axes.map((axis, i) => {
    const angle = (Math.PI * 2 / axes.length) * i - Math.PI / 2;
    const r = (axis.val / 100) * radius;
    return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
  }).join(' ');

  const gridCircles = [0.25, 0.5, 0.75, 1.0].map((frac, idx) => (
    <polygon
      key={idx}
      points={axes.map((_, i) => {
        const angle = (Math.PI * 2 / axes.length) * i - Math.PI / 2;
        const r = frac * radius;
        return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
      }).join(' ')}
      fill="none"
      stroke={isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(148, 163, 184, 0.3)"}
      strokeWidth="1"
    />
  ));

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-8 animate-in fade-in duration-300">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <button
            onClick={onResetWorkflow}
            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 flex items-center gap-1 mb-2 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-3.5 h-3.5" /> Start New Evaluation
          </button>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Official Recruitment Evaluation Dossier
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Certified Assessment for <strong className="text-slate-900 dark:text-white">{activeDrive.title || activeDrive.role}</strong> at {currentTenant?.name || 'Recruitment Organization'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowLetterModal(true)}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5 shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
          >
            <Award className="w-3.5 h-3.5" />
            <span>{currentTenant?.id === 'college_polytechnic' ? 'View Appointment Order' : 'View Offer Letter'}</span>
          </button>

          <button
            onClick={() => window.print()}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold border flex items-center gap-1.5 transition-all cursor-pointer ${
              isDark 
                ? 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800' 
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-xs'
            }`}
          >
            <Printer className="w-3.5 h-3.5" /> Print / Save PDF
          </button>

          <button
            onClick={onSwitchToTpo}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-1.5 shadow-md shadow-indigo-600/25 transition-all cursor-pointer"
          >
            <Users className="w-3.5 h-3.5" /> View in HR Command Center
          </button>
        </div>
      </div>

      {/* Main Dossier Certificate Card */}
      <div className={`p-8 sm:p-10 rounded-3xl border transition-all ${
        isDark ? 'glass-panel-dark' : 'glass-panel-light'
      } space-y-8 relative overflow-hidden shadow-2xl`}>
        
        {/* Certificate Header Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-slate-200/80 dark:border-slate-800">
          <div className="space-y-1">
            <span className="text-[11px] font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Department of Information Technology • Placement Verification
            </span>
            <h2 className="text-2xl font-black">Atharva P.</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Roll No: <span className="font-mono text-slate-800 dark:text-slate-200">IT-2026-042</span> • Aggregate: 84.6% • Diploma IT Class of 2026
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <span className="text-xs font-bold text-slate-400 block uppercase">Composite Rating</span>
              <span className="text-4xl font-black text-indigo-600 dark:text-indigo-400">{compositeScore}/100</span>
            </div>
            <div className={`px-4 py-2 rounded-2xl border text-xs font-black uppercase tracking-wider ${verdictStyle}`}>
              {verdict}
            </div>
          </div>
        </div>

        {/* 5-Axis Radar Chart & Dimension Scores */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          
          {/* Radar Visualization */}
          <div className="flex flex-col items-center justify-center p-4">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              5-Axis Placement Competency Radar
            </div>
            <svg viewBox="0 0 300 300" className="w-full max-w-xs overflow-visible">
              {gridCircles}
              
              {/* Axes lines */}
              {axes.map((_, i) => {
                const angle = (Math.PI * 2 / axes.length) * i - Math.PI / 2;
                return (
                  <line
                    key={i}
                    x1={cx}
                    y1={cy}
                    x2={cx + radius * Math.cos(angle)}
                    y2={cy + radius * Math.sin(angle)}
                    stroke={isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(148, 163, 184, 0.4)"}
                    strokeWidth="1"
                    strokeDasharray="2 2"
                  />
                );
              })}

              {/* Data Polygon */}
              <polygon
                points={points}
                fill={isDark ? "rgba(99, 102, 241, 0.45)" : "rgba(79, 70, 229, 0.25)"}
                stroke={isDark ? "#818CF8" : "#4F46E5"}
                strokeWidth="2.5"
              />

              {/* Axis Labels */}
              {axes.map((axis, i) => {
                const angle = (Math.PI * 2 / axes.length) * i - Math.PI / 2;
                const labelR = radius + 22;
                const x = cx + labelR * Math.cos(angle);
                const y = cy + labelR * Math.sin(angle);
                return (
                  <text
                    key={i}
                    x={x}
                    y={y}
                    fontSize="10"
                    fontWeight="bold"
                    fill={isDark ? "#CBD5E1" : "#475569"}
                    textAnchor="middle"
                    dominantBaseline="central"
                  >
                    {axis.label} ({axis.val}%)
                  </text>
                );
              })}
            </svg>
          </div>

          {/* Breakdown Cards */}
          <div className="space-y-3">
            <div className={`p-4 rounded-2xl border ${isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold flex items-center gap-2">
                  <FileText className="w-4 h-4 text-indigo-500" /> Phase 1: ATS Resume Engine
                </span>
                <span className="text-xs font-black text-indigo-600 dark:text-indigo-400">{atsScore}%</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">STAR quantification high, technical keywords verified against job description.</p>
            </div>

            <div className={`p-4 rounded-2xl border ${isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-emerald-500" /> Phase 2: MNC Technical Round
                </span>
                <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">{techScore}%</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Zero syntax errors, passed all test cases with optimal time complexity.</p>
            </div>

            <div className={`p-4 rounded-2xl border ${isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold flex items-center gap-2">
                  <Bot className="w-4 h-4 text-purple-500" /> Phase 3: Multimodal AI HR Round
                </span>
                <span className="text-xs font-black text-purple-600 dark:text-purple-400">{interviewScore}%</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Eye contact ratio: {eyeContactRatio}%, speech rate: {speechWpm} WPM with minimal filler words.</p>
            </div>
          </div>

        </div>

        {/* Verdict Summary Callout */}
        <div className={`p-5 rounded-2xl border ${verdictStyle}`}>
          <div className="text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> Official Campus Placement Verdict:
          </div>
          <p className="text-xs leading-relaxed">{verdictSummary}</p>
        </div>

      </div>

      {/* Official Appointment / Offer Letter Modal */}
      <OfficialLetterModal
        isOpen={showLetterModal}
        onClose={() => setShowLetterModal(false)}
        isDark={isDark}
        currentTenant={currentTenant}
        candidate={{
          name: 'Atharva P.',
          rollNo: 'IT-2026-042',
          email: 'atharva.tech@diploma.edu',
          driveApplied: activeDrive.title || activeDrive.role,
          atsScore,
          technicalScore: techScore,
          interviewScore
        }}
      />

    </div>
  );
}
