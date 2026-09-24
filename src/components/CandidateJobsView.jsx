import React from 'react';
import { 
  Building2, 
  Briefcase, 
  MapPin, 
  DollarSign, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Layers,
  GraduationCap,
  Users,
  Calendar,
  Clock,
  ExternalLink
} from 'lucide-react';
import { MNC_JOB_DRIVES } from '../data/mockData';

export default function CandidateJobsView({ isDark, activeDrive, setActiveDrive, onApplyDrive }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Radiant Hero Banner */}
      <div className={`p-8 sm:p-10 rounded-3xl relative overflow-hidden shadow-2xl border transition-all ${
        isDark 
          ? 'bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 border-slate-800 text-white' 
          : 'bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 border-indigo-700/40 text-white'
      }`}>
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-indigo-200 text-xs font-semibold border border-white/15 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-indigo-300 animate-spin-slow" /> 
            <span>Placement Season 2026 • Final Year Diploma in IT</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            Campus Recruitment & <br className="hidden sm:block"/>
            <span className="bg-gradient-to-r from-indigo-200 via-sky-200 to-emerald-200 bg-clip-text text-transparent">
              AI Interview Intelligence
            </span>
          </h1>

          <p className="text-sm sm:text-base text-indigo-100/90 leading-relaxed font-normal">
            Welcome, Diploma Candidate! Select an active campus recruitment drive below to screen your resume through our Industry ATS Heuristic Engine, pass the algorithmic technical assessment, and undergo your real-time multimodal AI HR interview.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-semibold text-indigo-200">
            <span className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-xl border border-white/10">
              <Building2 className="w-3.5 h-3.5 text-indigo-300" /> 42 Verified Visiting MNCs
            </span>
            <span className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-xl border border-white/10">
              <GraduationCap className="w-3.5 h-3.5 text-emerald-300" /> TPO Approved Eligibility
            </span>
            <span className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-xl border border-white/10">
              <Clock className="w-3.5 h-3.5 text-amber-300" /> Active Hiring Window
            </span>
          </div>
        </div>

        {/* Ambient Decorative Background Glows */}
        <div className="absolute right-0 top-0 -mt-10 -mr-10 w-96 h-96 bg-indigo-500/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-1/4 bottom-0 -mb-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Drives Grid Header */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">Active Campus Placement Drives</h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Select a visiting corporate recruiter to begin your progressive evaluation pipeline
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-xs font-bold px-3 py-1.5 rounded-full border ${
              isDark ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-white text-slate-700 border-slate-200 shadow-xs'
            }`}>
              {MNC_JOB_DRIVES.length} Recruitment Drives Open
            </span>
          </div>
        </div>

        {/* Dynamic Drive Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MNC_JOB_DRIVES.map((drive) => {
            const isSelected = activeDrive.id === drive.id;

            return (
              <div 
                key={drive.id}
                onClick={() => setActiveDrive(drive)}
                className={`p-6 sm:p-7 rounded-3xl border transition-all flex flex-col justify-between cursor-pointer ${
                  isSelected 
                    ? isDark 
                      ? 'bg-slate-900/90 border-indigo-500 ring-2 ring-indigo-500/30 shadow-xl shadow-indigo-950/50' 
                      : 'bg-white/95 border-indigo-500 ring-2 ring-indigo-500/20 shadow-xl shadow-indigo-950/10'
                    : isDark
                      ? 'glass-panel-interactive-dark'
                      : 'glass-panel-interactive-light'
                }`}
              >
                <div className="space-y-4">
                  {/* Top Bar: Company Identity & Package */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center p-3 shadow-md border ${
                        isSelected 
                          ? 'bg-gradient-to-tr from-indigo-600 to-purple-600 text-white border-transparent' 
                          : isDark 
                            ? 'bg-slate-800 text-indigo-400 border-slate-700' 
                            : 'bg-indigo-50 text-indigo-600 border-indigo-100'
                      }`}>
                        <Building2 className="w-7 h-7" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${
                            drive.tier.includes('Super') 
                              ? 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300' 
                              : 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300'
                          }`}>
                            {drive.tier}
                          </span>
                          <span className="text-xs text-slate-400">• Verified Drive</span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-black tracking-tight mt-0.5">{drive.company}</h3>
                        <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">{drive.role}</p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="inline-block text-xs font-black px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 shadow-xs">
                        {drive.ctc}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {drive.description}
                  </p>

                  {/* Badges / Location / Cutoff */}
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 pt-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-indigo-500" />
                      <span>{drive.location}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <GraduationCap className="w-3.5 h-3.5 text-purple-500" />
                      <span>Cutoff: {drive.minScore}% Agg</span>
                    </span>
                    <span>•</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                      {drive.vacancies} Positions
                    </span>
                  </div>

                  {/* Required Tech Skills Pills */}
                  <div className="pt-2">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                      Required Skill Stack
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {drive.skillsRequired.map((skill, idx) => (
                        <span 
                          key={idx}
                          className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                            isDark 
                              ? 'bg-slate-800/90 text-slate-300 border border-slate-700' 
                              : 'bg-slate-100 text-slate-700 border border-slate-200'
                          }`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="pt-6 mt-6 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
                  <div className="text-xs">
                    {isSelected ? (
                      <span className="font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Selected for Evaluation
                      </span>
                    ) : (
                      <span className="text-slate-500">Click to select drive</span>
                    )}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveDrive(drive);
                      onApplyDrive();
                    }}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer ${
                      isSelected
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-indigo-600/25 hover:scale-105'
                        : isDark
                        ? 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                        : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700'
                    }`}
                  >
                    <span>Apply & Screen ATS</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
