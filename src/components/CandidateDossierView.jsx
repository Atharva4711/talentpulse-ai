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
  ChevronLeft
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CandidateDossierView({ 
  candidateState, 
  activeDrive, 
  onResetWorkflow,
  onSwitchToTpo 
}) {
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
  let verdictStyle = 'bg-emerald-50 text-emerald-800 border-emerald-300';
  let verdictSummary = 'Exceptional candidate demonstrating deep technical mastery, structured STAR communication, and strong cultural alignment.';

  if (compositeScore < 70) {
    verdict = 'Needs Improvement';
    verdictStyle = 'bg-red-50 text-red-800 border-red-300';
    verdictSummary = 'Candidate requires targeted coaching in technical fundamentals and speech filler reduction prior to corporate placement drives.';
  } else if (compositeScore < 82) {
    verdict = 'Hire with Training';
    verdictStyle = 'bg-amber-50 text-amber-800 border-amber-300';
    verdictSummary = 'Solid candidate with demonstrable aptitude; recommend fast-track onboarding and structured behavioral mentoring.';
  }

  // 5-Axis Radar Chart SVG Points Calculation
  const cx = 150;
  const cy = 150;
  const r = 100;

  const metrics = [
    { label: 'ATS Match', val: atsScore, angle: -90 },
    { label: 'Technical Depth', val: techScore, angle: -18 },
    { label: 'Communication', val: interviewScore, angle: 54 },
    { label: 'Eye Contact', val: eyeContactRatio, angle: 126 },
    { label: 'STAR Rigor', val: Math.min(100, interviewScore + 2), angle: 198 }
  ];

  const getPoint = (val, angleDeg) => {
    const rad = (angleDeg * Math.PI) / 180;
    const distance = (val / 100) * r;
    return `${cx + distance * Math.cos(rad)},${cy + distance * Math.sin(rad)}`;
  };

  const polygonPoints = metrics.map(m => getPoint(m.val, m.angle)).join(' ');

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 print:p-0 print:max-w-none">
      
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
        <button
          onClick={onResetWorkflow}
          className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" /> Start New Assessment / Switch Drive
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={() => window.print()}
            className="px-4 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold flex items-center gap-2 border border-slate-200 transition-colors shadow-2xs cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" /> Print / Save Dossier PDF
          </button>

          <button
            onClick={onSwitchToTpo}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer"
          >
            <Users className="w-3.5 h-3.5" /> Open HR Placement Command Center
          </button>
        </div>
      </div>

      {/* Hero Certificate & Dossier Header */}
      <div className="p-8 rounded-3xl light-card border border-slate-200 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" /> Official Candidate Placement Evaluation Dossier
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Aarav Sharma — <span className="text-slate-500 font-normal">Roll No: 21CS042</span>
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Candidate Evaluated for: <strong className="text-slate-900">{activeDrive.company}</strong> ({activeDrive.role})
            </p>
          </div>

          {/* Placement Verdict Stamp Badge */}
          <div className={`p-4 rounded-2xl border text-center ${verdictStyle} shadow-xs`}>
            <div className="text-[11px] uppercase tracking-wider font-extrabold">Placement Verdict</div>
            <div className="text-2xl font-black mt-0.5">{verdict}</div>
            <div className="text-xs font-semibold opacity-90 mt-1">Composite Score: {compositeScore}%</div>
          </div>
        </div>

        <p className="text-xs text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-200 leading-relaxed">
          <strong className="text-indigo-900 font-bold">Executive Summary: </strong>
          {verdictSummary}
        </p>
      </div>

      {/* Main Analysis Grid: Radar Chart + 3-Pillar Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Interactive Radar Pentagonal Chart */}
        <div className="lg:col-span-5 p-6 rounded-2xl light-card border border-slate-200 space-y-4 flex flex-col items-center justify-center">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2 self-start">
            <TrendingUp className="w-4 h-4 text-indigo-600" /> Multi-Dimensional Competency Radar
          </h2>

          <div className="relative w-[300px] h-[300px] flex items-center justify-center">
            <svg width="300" height="300" className="overflow-visible">
              {/* Concentric Reference Rings */}
              {[25, 50, 75, 100].map((ringVal) => {
                const ringPoints = metrics.map(m => getPoint(ringVal, m.angle)).join(' ');
                return (
                  <polygon
                    key={ringVal}
                    points={ringPoints}
                    fill="none"
                    stroke="#E2E8F0"
                    strokeWidth="1.2"
                  />
                );
              })}

              {/* Axis Rays */}
              {metrics.map((m, idx) => {
                const outer = getPoint(100, m.angle).split(',');
                return (
                  <line
                    key={idx}
                    x1={cx}
                    y1={cy}
                    x2={outer[0]}
                    y2={outer[1]}
                    stroke="#CBD5E1"
                    strokeWidth="1"
                    strokeDasharray="2,2"
                  />
                );
              })}

              {/* Candidate Data Polygon */}
              <polygon
                points={polygonPoints}
                fill="rgba(79, 70, 229, 0.2)"
                stroke="#4F46E5"
                strokeWidth="2.5"
                className="filter drop-shadow-[0_0_8px_rgba(79,70,229,0.3)]"
              />

              {/* Data Vertex Dots */}
              {metrics.map((m, idx) => {
                const pt = getPoint(m.val, m.angle).split(',');
                return (
                  <circle
                    key={idx}
                    cx={pt[0]}
                    cy={pt[1]}
                    r="4.5"
                    fill="#0284C7"
                    stroke="#FFFFFF"
                    strokeWidth="2"
                  />
                );
              })}
            </svg>
          </div>

          {/* Radar Legend */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-[11px] w-full pt-2 border-t border-slate-200">
            {metrics.map((m, idx) => (
              <div key={idx} className="flex items-center justify-between text-slate-700">
                <span className="text-slate-500 font-medium">{m.label}:</span>
                <span className="font-bold text-slate-900">{m.val}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Three Pillars Score Cards */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Pillar 1: ATS Resume Screening Card */}
          <div className="p-5 rounded-2xl light-card border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Phase 1: ATS Resume Qualification</h3>
                <p className="text-xs text-slate-500 font-medium">Keyword Density, Formatting & Quantification Metrics</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xl font-black text-indigo-600">{atsScore}%</div>
              <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Passed Cutoff</span>
            </div>
          </div>

          {/* Pillar 2: Technical Assessment Card */}
          <div className="p-5 rounded-2xl light-card border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                <Code2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Phase 2: MNC Technical Round</h3>
                <p className="text-xs text-slate-500 font-medium">Core CS Fundamentals & Algorithmic Problem Solving</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xl font-black text-emerald-600">{techScore}%</div>
              <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Optimal Complexity</span>
            </div>
          </div>

          {/* Pillar 3: AI HR Interview Card */}
          <div className="p-5 rounded-2xl light-card border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-violet-50 border border-violet-200 flex items-center justify-center text-violet-600">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Phase 3: Live Multimodal AI HR Interview</h3>
                <p className="text-xs text-slate-500 font-medium">STAR Behavioral Structure & Biometric Composure</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xl font-black text-violet-600">{interviewScore}%</div>
              <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">High Composure</span>
            </div>
          </div>

          {/* Speech & Biometric Diagnostics Strip */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="p-3.5 rounded-xl light-card border border-slate-200 text-center">
              <div className="text-[11px] text-slate-500 font-semibold">Gaze & Eye Contact</div>
              <div className="text-base font-black text-cyan-600 mt-0.5">{eyeContactRatio}%</div>
              <div className="text-[10px] text-slate-400">Stable Camera Focus</div>
            </div>

            <div className="p-3.5 rounded-xl light-card border border-slate-200 text-center">
              <div className="text-[11px] text-slate-500 font-semibold">Speech Rate (WPM)</div>
              <div className="text-base font-black text-emerald-600 mt-0.5">{speechWpm} WPM</div>
              <div className="text-[10px] text-slate-400">Optimal Pace</div>
            </div>

            <div className="p-3.5 rounded-xl light-card border border-slate-200 text-center">
              <div className="text-[11px] text-slate-500 font-semibold">Filler Words Count</div>
              <div className="text-base font-black text-amber-600 mt-0.5">{fillerCount}</div>
              <div className="text-[10px] text-slate-400">Minimal Hesitation</div>
            </div>
          </div>

        </div>

      </div>

      {/* Recruiter Insights & Actionable Feedback */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Key Strengths */}
        <div className="p-6 rounded-2xl light-card border border-slate-200 space-y-3">
          <div className="text-xs font-bold text-emerald-800 flex items-center gap-1.5 uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Core Candidate Strengths:
          </div>
          <ul className="text-xs text-slate-700 space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">•</span>
              <span><strong>Strong Algorithmic Rigor:</strong> Implemented optimal O(N) hash map solution with zero syntax errors.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">•</span>
              <span><strong>High Metric Quantification:</strong> Resume effectively highlights percentage latency reductions and distributed concurrency metrics.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">•</span>
              <span><strong>Poised Visual Composure:</strong> Maintained over 90% direct eye contact with steady head posture throughout the HR round.</span>
            </li>
          </ul>
        </div>

        {/* Areas for Improvement */}
        <div className="p-6 rounded-2xl light-card border border-slate-200 space-y-3">
          <div className="text-xs font-bold text-indigo-800 flex items-center gap-1.5 uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-indigo-600" /> Placement Coaching Guidance:
          </div>
          <ul className="text-xs text-slate-700 space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-indigo-600 font-bold">•</span>
              <span><strong>STAR Result Articulation:</strong> When describing team conflict, state the business impact and retrospectives more explicitly.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-600 font-bold">•</span>
              <span><strong>Pause Discipline:</strong> Replace occasional filler words with deliberate 1-second pauses to command authority.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-600 font-bold">•</span>
              <span><strong>Cloud Scale Deep Dive:</strong> Prepare architecture trade-off justifications for microservices vs monolithic databases.</span>
            </li>
          </ul>
        </div>

      </div>

    </div>
  );
}
