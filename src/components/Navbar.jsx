import React from 'react';
import { 
  Activity, 
  GraduationCap, 
  Building2,
  Sun,
  Moon,
  ChevronDown
} from 'lucide-react';

export default function Navbar({ 
  activeView, 
  setActiveView, 
  userRole, 
  setUserRole, 
  isDark, 
  toggleTheme, 
  onOpenProfile,
  currentTenant,
  onOpenTenantConfig
}) {
  const isCandidate = userRole === 'student';

  return (
    <header className={`sticky top-0 z-50 border-b backdrop-blur-xl transition-all duration-200 ${
      isDark 
        ? 'bg-slate-950/90 border-slate-800 text-white shadow-lg shadow-black/20' 
        : 'bg-white/90 border-slate-200/90 text-slate-900 shadow-xs'
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Left: Brand Identity & Active Client Instance */}
          <div className="flex items-center gap-3">
            <div 
              className="flex items-center gap-2.5 cursor-pointer group" 
              onClick={() => setActiveView(isCandidate ? 'jobs' : 'tpo-dashboard')}
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/25 group-hover:scale-105 transition-all">
                <Activity className="w-5 h-5 stroke-[2.4]" />
              </div>
              <div>
                <span className="text-base font-black tracking-tight">
                  TalentPulse <span className="text-indigo-600 dark:text-indigo-400">AI</span>
                </span>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold truncate max-w-[180px] sm:max-w-xs">
                  {currentTenant?.name || 'Government Polytechnic Pune'}
                </p>
              </div>
            </div>

            {/* Client Instance Pill */}
            {currentTenant && (
              <button
                onClick={onOpenTenantConfig}
                className={`hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[11px] font-bold transition-all cursor-pointer ${
                  isDark 
                    ? 'bg-slate-900 border-slate-700 text-slate-300 hover:border-indigo-500' 
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-indigo-300'
                }`}
                title="Switch client deployment instance"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Client: {currentTenant.name.split(' ')[0]}</span>
                <ChevronDown className="w-3 h-3 opacity-60" />
              </button>
            )}
          </div>

          {/* Right: Clean Persona Switcher + Theme Toggle + User Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Student vs TPO Switcher */}
            <div className={`flex items-center p-1 rounded-xl border ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'
            }`}>
              <button
                id="portal-candidate-btn"
                onClick={() => {
                  setUserRole('student');
                  setActiveView('jobs');
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  isCandidate
                    ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Student</span>
              </button>

              <button
                id="portal-hr-btn"
                onClick={() => {
                  setUserRole('tpo');
                  setActiveView('tpo-dashboard');
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  !isCandidate
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>TPO Admin</span>
              </button>
            </div>

            {/* Dark / Light Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-all cursor-pointer ${
                isDark 
                  ? 'bg-slate-900 border-slate-800 text-amber-400 hover:bg-slate-800' 
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-xs'
              }`}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Candidate Profile Avatar */}
            <button
              onClick={onOpenProfile}
              className={`flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl border transition-all cursor-pointer ${
                isDark 
                  ? 'bg-slate-900 border-slate-800 hover:border-slate-700' 
                  : 'bg-white border-slate-200 hover:border-indigo-300 shadow-xs'
              }`}
            >
              <div className="relative">
                <div className="w-6 h-6 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-[11px] font-black">
                  AP
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 border border-white dark:border-slate-900" />
              </div>
              <div className="text-left hidden sm:block">
                <div className="text-xs font-bold leading-tight">Atharva P.</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">Diploma IT</div>
              </div>
            </button>

          </div>

        </div>
      </div>
    </header>
  );
}
