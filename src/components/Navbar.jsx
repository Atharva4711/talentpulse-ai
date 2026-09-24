import React from 'react';
import { 
  Activity, 
  FileText, 
  Code2, 
  Bot, 
  Award, 
  Users, 
  GraduationCap, 
  Building2
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
    { id: 'dossier', label: '4. Placement Dossier', icon: Award, unlocked: candidateState.interviewResult?.completed }
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-md shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand Identity */}
          <div 
            className="flex items-center gap-2.5 cursor-pointer" 
            onClick={() => setActiveView(isCandidate ? 'jobs' : 'tpo-dashboard')}
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-emerald-500 flex items-center justify-center shadow-xs text-white">
              <Activity className="w-5 h-5 stroke-[2.4]" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-slate-900">
                TalentPulse <span className="text-indigo-600">AI</span>
              </span>
              <p className="text-[10px] text-slate-500 font-medium hidden sm:block">Campus Placement Intelligence</p>
            </div>
          </div>

          {/* Clean Stepper for Candidate */}
          {isCandidate && (
            <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200/60">
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
                        ? 'text-slate-600 hover:text-slate-900 hover:bg-white/60 cursor-pointer'
                        : 'text-slate-400 cursor-not-allowed opacity-50'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{step.label}</span>
                  </button>
                );
              })}
            </nav>
          )}

          {/* Right Section: Clean Persona Toggle */}
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                id="portal-candidate-btn"
                onClick={() => {
                  setUserRole('student');
                  setActiveView('jobs');
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  isCandidate
                    ? 'bg-white text-indigo-700 shadow-xs border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
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
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  !isCandidate
                    ? 'bg-indigo-600 text-white shadow-xs'
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
