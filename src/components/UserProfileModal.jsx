import React from 'react';
import { 
  X, 
  User, 
  GraduationCap, 
  Award, 
  CheckCircle2, 
  Building2, 
  Sparkles, 
  Briefcase, 
  FileText, 
  ShieldCheck,
  TrendingUp,
  Mail,
  Phone,
  Calendar
} from 'lucide-react';

export default function UserProfileModal({ isOpen, onClose, isDark, candidateState, userRole, setUserRole }) {
  if (!isOpen) return null;

  const atsScore = candidateState.atsResult?.score || 92;
  const techScore = candidateState.techResult?.passed ? 88 : 82;
  const interviewScore = candidateState.interviewResult?.completed ? 90 : 85;
  const overallReadiness = Math.round((atsScore + techScore + interviewScore) / 3);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className={`w-full max-w-2xl rounded-3xl p-6 sm:p-8 shadow-2xl relative border overflow-hidden transition-all ${
          isDark 
            ? 'bg-slate-900/95 text-slate-100 border-slate-700/80' 
            : 'bg-white/95 text-slate-900 border-slate-200'
        }`}
      >
        {/* Background gradient glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-violet-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-200 dark:border-slate-800 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight">Candidate Profile & Readiness</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Campus Placement Verification ID: TP-2026-IT42</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Profile Content */}
        <div className="py-6 space-y-6 relative z-10 max-h-[75vh] overflow-y-auto pr-1">
          
          {/* Main Bio Card */}
          <div className={`p-5 rounded-2xl border flex flex-col sm:flex-row items-center gap-5 ${
            isDark ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-0.5 shadow-lg">
                <div className="w-full h-full rounded-2xl bg-slate-900 flex items-center justify-center text-white text-2xl font-black">
                  AP
                </div>
              </div>
              <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full" />
            </div>

            <div className="space-y-1.5 text-center sm:text-left flex-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h3 className="text-lg font-bold">Atharva P.</h3>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-100 text-indigo-700 dark:bg-indigo-950/80 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                  Diploma IT Final Year
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300">
                  TPO Verified
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Department of Information Technology • Class of 2026
              </p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-500 dark:text-slate-400 pt-1">
                <span className="flex items-center gap-1"><GraduationCap className="w-3.5 h-3.5" /> Aggregate: 84.6%</span>
                <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Backlogs: 0</span>
                <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" /> Target: SDE-1 / Full Stack</span>
              </div>
            </div>

            {/* Circular Readiness Gauge */}
            <div className="flex flex-col items-center shrink-0">
              <div className="relative w-16 h-16 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-slate-200 dark:text-slate-700"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-indigo-600 dark:text-indigo-400 transition-all duration-1000"
                    strokeDasharray={`${overallReadiness}, 100`}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute text-center">
                  <span className="text-sm font-black tracking-tight">{overallReadiness}%</span>
                </div>
              </div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-1">Readiness</span>
            </div>
          </div>

          {/* Placement Competency Breakdown */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Assessed Competency Dimensions
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-white border-slate-200'}`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">ATS Match</span>
                  <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">{atsScore}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
                  <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${atsScore}%` }} />
                </div>
                <p className="text-[10px] text-slate-500 mt-2">STAR quantification high</p>
              </div>

              <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-white border-slate-200'}`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Coding & CS</span>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{techScore}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${techScore}%` }} />
                </div>
                <p className="text-[10px] text-slate-500 mt-2">O(n) runtime efficiency</p>
              </div>

              <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-white border-slate-200'}`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">HR Delivery</span>
                  <span className="text-xs font-bold text-violet-600 dark:text-violet-400">{interviewScore}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
                  <div className="h-full bg-violet-500 rounded-full" style={{ width: `${interviewScore}%` }} />
                </div>
                <p className="text-[10px] text-slate-500 mt-2">84% eye contact ratio</p>
              </div>
            </div>
          </div>

          {/* Earned Badges Showcase */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Placement Drive Badges Earned
            </h4>
            <div className="flex flex-wrap gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800">
                <Sparkles className="w-3.5 h-3.5 text-indigo-500" /> ATS Level-1 Certified
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Algorithmic Benchmark Passed
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-violet-50 dark:bg-violet-950/70 text-violet-700 dark:text-violet-300 border border-violet-200/80 dark:border-violet-800">
                <Award className="w-3.5 h-3.5 text-violet-500" /> STAR Behavioral Articulation
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-amber-50 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-500" /> Zero Proctoring Violations
              </span>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between relative z-10 text-xs text-slate-500">
          <span>Targeting TCS Digital & Amazon 2026</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl font-bold bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-md cursor-pointer"
          >
            Close Profile
          </button>
        </div>

      </div>
    </div>
  );
}
