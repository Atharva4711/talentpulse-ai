import React from 'react';
import { 
  Building2, 
  Briefcase, 
  MapPin, 
  DollarSign, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  GraduationCap, 
  Clock, 
  ShieldCheck,
  ChevronDown
} from 'lucide-react';

export default function CandidateJobsView({ 
  isDark, 
  activeDrive, 
  setActiveDrive, 
  onApplyDrive,
  currentTenant,
  onOpenTenantConfig
}) {
  const openings = currentTenant?.openings || [];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6 animate-in fade-in duration-300">
      
      {/* Client Organization Header */}
      <div className="text-center sm:text-left space-y-2 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
            <Building2 className="w-3.5 h-3.5" />
            <span>{currentTenant?.name}</span>
          </div>

          <button
            onClick={onOpenTenantConfig}
            className="text-[11px] font-bold text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>({currentTenant?.clientType})</span>
            <span className="text-[10px] underline">Change Organization</span>
          </button>
        </div>
        
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
          {currentTenant?.openingsHeader || 'Current Employment Openings'}
        </h1>
        
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          {currentTenant?.openingsSubtext || 'Apply for technical, engineering, and administrative roles.'}
        </p>
      </div>

      {/* Single Focused Job Position Workspace */}
      <div className={`p-6 sm:p-8 rounded-3xl border shadow-xl transition-all ${
        isDark ? 'glass-panel-dark' : 'glass-panel-light'
      } space-y-6`}>
        
        {/* Role Selector */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-200/80 dark:border-slate-800">
          <div>
            <span className="text-[11px] font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block mb-0.5">
              Available Position
            </span>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Select the open role at {currentTenant?.name} you wish to apply for:
            </div>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={activeDrive.id}
              onChange={(e) => {
                const selected = openings.find(o => o.id === e.target.value);
                if (selected) setActiveDrive(selected);
              }}
              className={`px-3 py-2 rounded-xl text-xs font-bold border outline-none cursor-pointer ${
                isDark 
                  ? 'bg-slate-900 border-slate-700 text-slate-100 focus:border-indigo-500' 
                  : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-indigo-500'
              }`}
            >
              {openings.map(opening => (
                <option key={opening.id} value={opening.id} className="dark:bg-slate-900 dark:text-white">
                  {opening.title} ({opening.salary})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Selected Position Details */}
        <div className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/25 shrink-0">
                <Briefcase className="w-7 h-7" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                    {activeDrive.type || 'Full-Time Position'}
                  </span>
                  <span className="text-xs text-slate-400 font-semibold">• {activeDrive.department}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black tracking-tight mt-0.5">{activeDrive.title}</h2>
                <p className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300">
                  {currentTenant?.name} • {activeDrive.location}
                </p>
              </div>
            </div>

            <div className="sm:text-right shrink-0">
              <span className="text-xs font-bold text-slate-400 block uppercase">Compensation</span>
              <span className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400">
                {activeDrive.salary || activeDrive.ctc}
              </span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {activeDrive.description}
          </p>

          {/* Key Parameters */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <div className={`p-3.5 rounded-2xl border text-xs ${
              isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}>
              <span className="text-slate-400 font-semibold block text-[10px] uppercase">Department</span>
              <span className="font-bold text-slate-800 dark:text-slate-200 mt-0.5 block truncate">
                {activeDrive.department}
              </span>
            </div>

            <div className={`p-3.5 rounded-2xl border text-xs ${
              isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}>
              <span className="text-slate-400 font-semibold block text-[10px] uppercase">ATS Resume Cutoff</span>
              <span className="font-bold text-indigo-600 dark:text-indigo-400 mt-0.5 block">
                {activeDrive.minAtsScore}% Match Required
              </span>
            </div>

            <div className={`p-3.5 rounded-2xl border text-xs ${
              isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}>
              <span className="text-slate-400 font-semibold block text-[10px] uppercase">Recruitment Mode</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400 mt-0.5 block">
                Automated 3-Round Screening
              </span>
            </div>
          </div>

          {/* Required Skills Evaluated */}
          <div className="pt-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Core Technical Skills Evaluated for this Role
            </span>
            <div className="flex flex-wrap gap-2">
              {(activeDrive.requiredHardSkills || []).map((skill, idx) => (
                <span 
                  key={idx}
                  className={`px-3 py-1 rounded-xl text-xs font-semibold ${
                    isDark 
                      ? 'bg-slate-800 text-slate-300 border border-slate-700' 
                      : 'bg-white text-slate-700 border border-slate-200 shadow-2xs'
                  }`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* 3-Round Assessment Pipeline */}
          <div className="pt-2 space-y-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Automated Candidate Evaluation Pipeline
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/50 text-indigo-800 dark:text-indigo-300 font-semibold">
                <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0">1</span>
                <span>ATS Resume Heuristics</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-purple-50/70 dark:bg-purple-950/50 text-purple-800 dark:text-purple-300 font-semibold">
                <span className="w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0">2</span>
                <span>Technical Code Sandbox</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 font-semibold">
                <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0">3</span>
                <span>Multimodal AI HR Interview</span>
              </div>
            </div>
          </div>
        </div>

        {/* Start Evaluation Button */}
        <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800">
          <button
            onClick={onApplyDrive}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/25 hover:scale-[1.01] transition-all cursor-pointer"
          >
            <span>Apply & Start Step 1: ATS Resume Screening</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
}
