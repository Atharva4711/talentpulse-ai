import React from 'react';
import { 
  Activity, 
  FileText, 
  Code2, 
  Bot, 
  Award, 
  Users, 
  GraduationCap, 
  Sparkles,
  Building2,
  Cpu,
  Layers
} from 'lucide-react';

export default function Navbar({ 
  activeView, 
  setActiveView, 
  userRole, 
  setUserRole, 
  activeDrive,
  candidateState 
}) {
  const isCandidate = userRole === 'student';

  const candidateSteps = [
    { id: 'jobs', label: 'Campus Drives', icon: Building2, unlocked: true },
    { id: 'ats', label: '1. ATS Scanner', icon: FileText, unlocked: true },
    { id: 'technical', label: '2. Tech Round', icon: Code2, unlocked: candidateState.atsResult?.passedCutoff },
    { id: 'interview', label: '3. AI Interview', icon: Bot, unlocked: candidateState.techResult?.passed },
    { id: 'dossier', label: '4. My Dossier', icon: Award, unlocked: candidateState.interviewResult?.completed }
  ];

  const hrTabs = [
    { id: 'tpo-dashboard', label: 'Placement Command Hub', icon: Users },
    { id: 'tpo-drives', label: 'Manage Drives & Cutoffs', icon: Building2 },
    { id: 'tpo-analytics', label: 'Cohort Analytics', icon: Activity }
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-md shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveView(isCandidate ? 'jobs' : 'tpo-dashboard')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-500 flex items-center justify-center shadow-md shadow-indigo-500/20 text-white">
              <Activity className="w-5 h-5 stroke-[2.4]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-slate-900">
                  TalentPulse <span className="text-indigo-600">AI</span>
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <Sparkles className="w-3 h-3 text-emerald-600" /> College Edition
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">Campus Placement & Interview Intelligence</p>
            </div>
          </div>

          {/* Center Navigation depending on Role */}
          {isCandidate ? (
            <nav className="hidden lg:flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200/60">
              {candidateSteps.map((step) => {
                const Icon = step.icon;
                const isActive = activeView === step.id;
                const isUnlocked = step.unlocked;

                return (
                  <button
                    key={step.id}
                    onClick={() => isUnlocked && setActiveView(step.id)}
                    disabled={!isUnlocked}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-white text-indigo-700 shadow-xs border border-slate-200/80'
                        : isUnlocked
                        ? 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                        : 'text-slate-400 cursor-not-allowed opacity-60'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{step.label}</span>
                  </button>
                );
              })}
            </nav>
          ) : (
            <nav className="hidden lg:flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200/60">
              {hrTabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeView === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveView(tab.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-white text-indigo-700 shadow-xs border border-slate-200/80'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          )}

          {/* Right Section: Multi-Model Swarm Indicator & Dual Persona Switcher */}
          <div className="flex items-center gap-3">
            
            {/* Multi-Model Co-Worker Swarm Badge */}
            <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-50 border border-indigo-100 text-[11px] text-indigo-700 font-medium">
              <Cpu className="w-3.5 h-3.5 text-indigo-600" />
              <span>Claude + Gemini + GPT Swarm</span>
            </div>

            {/* Portal Switcher (Candidate vs HR/TPO) */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 shadow-inner">
              <button
                id="portal-candidate-btn"
                onClick={() => {
                  setUserRole('student');
                  setActiveView('jobs');
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  isCandidate
                    ? 'bg-white text-indigo-700 shadow-sm border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Candidate</span>
              </button>

              <button
                id="portal-hr-btn"
                onClick={() => {
                  setUserRole('tpo');
                  setActiveView('tpo-dashboard');
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  !isCandidate
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>HR / TPO</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
}
