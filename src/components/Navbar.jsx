import React, { useState } from 'react';
import { 
  Activity, 
  FileText, 
  Code2, 
  Bot, 
  Award, 
  Users, 
  GraduationCap, 
  Building2,
  Sun,
  Moon,
  User,
  Sparkles,
  Menu,
  X
} from 'lucide-react';

export default function Navbar({ 
  activeView, 
  setActiveView, 
  userRole, 
  setUserRole, 
  activeDrive, 
  candidateState,
  isDark,
  toggleTheme,
  onOpenProfile
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isCandidate = userRole === 'student';

  const candidateSteps = [
    { id: 'jobs', label: 'Drives', icon: Building2, unlocked: true },
    { id: 'ats', label: '1. ATS Scanner', icon: FileText, unlocked: true },
    { id: 'technical', label: '2. Tech Round', icon: Code2, unlocked: candidateState.atsResult?.passedCutoff },
    { id: 'interview', label: '3. AI Interview', icon: Bot, unlocked: candidateState.techResult?.passed },
    { id: 'dossier', label: '4. Dossier', icon: Award, unlocked: candidateState.interviewResult?.completed }
  ];

  return (
    <header className={`sticky top-0 z-50 border-b backdrop-blur-xl transition-all duration-300 ${
      isDark 
        ? 'bg-slate-950/85 border-slate-800/80 text-white shadow-xl shadow-black/20' 
        : 'bg-white/85 border-slate-200/80 text-slate-900 shadow-md shadow-indigo-950/5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand Identity */}
          <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => setActiveView(isCandidate ? 'jobs' : 'tpo-dashboard')}
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-emerald-500 flex items-center justify-center shadow-lg shadow-indigo-600/30 text-white group-hover:scale-105 transition-all">
              <Activity className="w-5 h-5 stroke-[2.4]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-extrabold tracking-tight">
                  TalentPulse <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">AI</span>
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                  v2.0
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
                Campus Recruitment & Interview Intelligence
              </p>
            </div>
          </div>

          {/* Stepper Navigation (Desktop) */}
          {isCandidate && (
            <nav className={`hidden md:flex items-center gap-1 p-1 rounded-2xl border transition-all ${
              isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-slate-100/90 border-slate-200/80'
            }`}>
              {candidateSteps.map((step) => {
                const Icon = step.icon;
                const isActive = activeView === step.id;
                const isUnlocked = step.unlocked;

                return (
                  <button
                    key={step.id}
                    onClick={() => isUnlocked && setActiveView(step.id)}
                    disabled={!isUnlocked}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-600/20'
                        : isUnlocked
                        ? isDark 
                          ? 'text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer' 
                          : 'text-slate-600 hover:text-slate-900 hover:bg-white cursor-pointer'
                        : 'text-slate-400 dark:text-slate-600 cursor-not-allowed opacity-40'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{step.label}</span>
                  </button>
                );
              })}
            </nav>
          )}

          {/* Right Section: Persona Toggle + Theme Switcher + User Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Student vs HR / TPO Switcher */}
            <div className={`flex items-center p-1 rounded-xl border transition-all ${
              isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-100 border-slate-200'
            }`}>
              <button
                id="portal-candidate-btn"
                onClick={() => {
                  setUserRole('student');
                  setActiveView('jobs');
                }}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  isCandidate
                    ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Student</span>
              </button>

              <button
                id="portal-hr-btn"
                onClick={() => {
                  setUserRole('tpo');
                  setActiveView('tpo-dashboard');
                }}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  !isCandidate
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">HR / TPO</span>
              </button>
            </div>

            {/* Light / Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-all cursor-pointer ${
                isDark 
                  ? 'bg-slate-900 border-slate-800 text-amber-400 hover:bg-slate-800 hover:scale-105' 
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-indigo-600 hover:scale-105 shadow-xs'
              }`}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* User Profile Button */}
            <button
              onClick={onOpenProfile}
              className={`flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl border transition-all cursor-pointer ${
                isDark 
                  ? 'bg-slate-900/90 border-slate-800 hover:border-slate-700' 
                  : 'bg-white border-slate-200 hover:border-indigo-300 shadow-xs'
              }`}
            >
              <div className="relative">
                <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white text-[11px] font-black">
                  AP
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 border border-white dark:border-slate-900" />
              </div>
              <div className="text-left hidden lg:block">
                <div className="text-xs font-bold leading-tight">Atharva P.</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400">Diploma IT</div>
              </div>
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>

          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-slate-200 dark:border-slate-800 space-y-2">
            {isCandidate && candidateSteps.map((step) => {
              const Icon = step.icon;
              const isActive = activeView === step.id;
              const isUnlocked = step.unlocked;

              return (
                <button
                  key={step.id}
                  onClick={() => {
                    if (isUnlocked) {
                      setActiveView(step.id);
                      setMobileMenuOpen(false);
                    }
                  }}
                  disabled={!isUnlocked}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold ${
                    isActive
                      ? 'bg-indigo-600 text-white'
                      : isUnlocked
                      ? 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                      : 'text-slate-400 opacity-50 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    <span>{step.label}</span>
                  </div>
                  {isUnlocked && <span className="text-[10px] font-bold opacity-75">Ready</span>}
                </button>
              );
            })}
          </div>
        )}

      </div>
    </header>
  );
}
