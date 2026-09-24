import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import PlacementTicker from './components/PlacementTicker';
import CandidateJobsView from './components/CandidateJobsView';
import AtsScannerView from './components/AtsScannerView';
import TechnicalAssessmentView from './components/TechnicalAssessmentView';
import AiInterviewStudioView from './components/AiInterviewStudioView';
import CandidateDossierView from './components/CandidateDossierView';
import TpoDashboardView from './components/TpoDashboardView';
import UserProfileModal from './components/UserProfileModal';
import VivaDemoFab from './components/VivaDemoFab';
import ClientConfigModal from './components/ClientConfigModal';
import { MNC_JOB_DRIVES, BENCHMARK_RESUMES } from './data/mockData';
import { CLIENT_TENANTS } from './data/tenantConfig';
import { Cpu, ShieldCheck, Sparkles, Terminal, Activity, Building2, FileText, Code2, Bot, Award, AlertTriangle, RotateCcw } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[TalentPulse ErrorBoundary caught error]:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 max-w-xl mx-auto my-12 rounded-3xl bg-red-50 dark:bg-slate-900 border border-red-200 dark:border-red-900 text-center space-y-4 shadow-xl">
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto" />
          <h2 className="text-xl font-bold text-red-900 dark:text-red-200">Something went wrong</h2>
          <p className="text-xs text-red-700 dark:text-red-300 font-mono">
            {this.state.error?.message || 'Unexpected application error.'}
          </p>
          <button
            onClick={() => {
              this.setState({ hasError: false, error: null });
              window.location.reload();
            }}
            className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold inline-flex items-center gap-2 cursor-pointer shadow-md"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reload Application
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  const [activeView, setActiveView] = useState('jobs');
  const [userRole, setUserRole] = useState('student');
  const [activeDrive, setActiveDrive] = useState(MNC_JOB_DRIVES[0]);
  const [profileOpen, setProfileOpen] = useState(false);
  const [tenantModalOpen, setTenantModalOpen] = useState(false);
  const [currentTenant, setCurrentTenant] = useState(CLIENT_TENANTS.college_polytechnic);

  // Theme Management (Light by default, with rich mesh gradients & dark option)
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('talentpulse_theme');
    return saved ? saved === 'dark' : false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('talentpulse_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('talentpulse_theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(prev => !prev);

  // Candidate pipeline state
  const [candidateState, setCandidateState] = useState({
    resumeText: BENCHMARK_RESUMES.highMatch.rawText,
    atsResult: null,
    techResult: null,
    interviewResult: null
  });

  const handleApplyDrive = () => {
    setActiveView('ats');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProceedToTechnical = () => {
    setActiveView('technical');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProceedToInterview = () => {
    setActiveView('interview');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProceedToDossier = () => {
    setActiveView('dossier');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetWorkflow = () => {
    setActiveView('jobs');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 relative selection:bg-indigo-500/20 selection:text-indigo-600 ${
      isDark ? 'ambient-bg-dark text-slate-100' : 'ambient-bg-light text-slate-800'
    }`}>
      
      {/* Dynamic Animated Ambient Background Orbs (Zero plain white!) */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className={`absolute -top-40 -left-40 w-96 h-96 rounded-full blur-3xl opacity-40 animate-orb-1 transition-colors ${
          isDark ? 'bg-indigo-600/30' : 'bg-indigo-400/25'
        }`} />
        <div className={`absolute top-1/3 -right-40 w-96 h-96 rounded-full blur-3xl opacity-35 animate-orb-2 transition-colors ${
          isDark ? 'bg-violet-600/25' : 'bg-purple-300/30'
        }`} />
        <div className={`absolute -bottom-40 left-1/3 w-96 h-96 rounded-full blur-3xl opacity-30 animate-orb-1 transition-colors ${
          isDark ? 'bg-emerald-600/20' : 'bg-sky-300/25'
        }`} />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        
        {/* Global Navigation Header with Dual Personas, Profile & Client Config */}
        <Navbar
          activeView={activeView}
          setActiveView={setActiveView}
          userRole={userRole}
          setUserRole={setUserRole}
          activeDrive={activeDrive}
          candidateState={candidateState}
          isDark={isDark}
          toggleTheme={toggleTheme}
          onOpenProfile={() => setProfileOpen(true)}
          currentTenant={currentTenant}
          onOpenTenantConfig={() => setTenantModalOpen(true)}
        />

        {/* Main View Router */}
        <main className="flex-1 pb-20">
          <ErrorBoundary>
            {userRole === 'tpo' || activeView.startsWith('tpo') ? (
              <TpoDashboardView
                isDark={isDark}
                currentTenant={currentTenant}
                onSelectCandidate={() => setActiveView('dossier')}
                onSwitchToStudent={() => {
                  setUserRole('student');
                  setActiveView('jobs');
                }}
              />
            ) : activeView === 'jobs' ? (
              <CandidateJobsView
                isDark={isDark}
                currentTenant={currentTenant}
                activeDrive={activeDrive}
                setActiveDrive={setActiveDrive}
                onApplyDrive={handleApplyDrive}
                onOpenTenantConfig={() => setTenantModalOpen(true)}
              />
            ) : activeView === 'ats' ? (
              <AtsScannerView
                isDark={isDark}
                activeDrive={activeDrive}
                setActiveDrive={setActiveDrive}
                candidateState={candidateState}
                setCandidateState={setCandidateState}
                onProceedToTechnical={handleProceedToTechnical}
                onBackToJobs={() => setActiveView('jobs')}
              />
            ) : activeView === 'technical' ? (
              <TechnicalAssessmentView
                isDark={isDark}
                activeDrive={activeDrive}
                candidateState={candidateState}
                setCandidateState={setCandidateState}
                onProceedToInterview={handleProceedToInterview}
                onBackToAts={() => setActiveView('ats')}
              />
            ) : activeView === 'interview' ? (
              <AiInterviewStudioView
                isDark={isDark}
                activeDrive={activeDrive}
                candidateState={candidateState}
                setCandidateState={setCandidateState}
                onProceedToDossier={handleProceedToDossier}
                onBackToTechnical={() => setActiveView('technical')}
              />
            ) : (
              <CandidateDossierView
                isDark={isDark}
                candidateState={candidateState}
                activeDrive={activeDrive}
                onResetWorkflow={handleResetWorkflow}
                onSwitchToTpo={() => {
                  setUserRole('tpo');
                  setActiveView('tpo-dashboard');
                }}
              />
            )}
          </ErrorBoundary>
        </main>

        {/* User Profile Modal */}
        <UserProfileModal
          isOpen={profileOpen}
          onClose={() => setProfileOpen(false)}
          isDark={isDark}
          candidateState={candidateState}
          userRole={userRole}
          setUserRole={setUserRole}
          currentTenant={currentTenant}
        />

        {/* B2B Client Tenant Configurator Modal */}
        <ClientConfigModal
          isOpen={tenantModalOpen}
          onClose={() => setTenantModalOpen(false)}
          isDark={isDark}
          currentTenant={currentTenant}
          setCurrentTenant={setCurrentTenant}
        />

        {/* Examiner Viva Voce Demonstration Floating Controller */}
        <VivaDemoFab
          isDark={isDark}
          candidateState={candidateState}
          setCandidateState={setCandidateState}
          setActiveView={setActiveView}
        />

        {/* Capstone System Status Footer */}
        <footer className={`border-t py-6 px-4 sm:px-6 lg:px-8 text-xs transition-colors ${
          isDark 
            ? 'bg-slate-950/80 border-slate-800 text-slate-400' 
            : 'bg-white/80 border-slate-200 text-slate-500 backdrop-blur-md'
        }`}>
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-md bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white">
                <Activity className="w-3.5 h-3.5" />
              </div>
              <span className="font-bold tracking-tight text-slate-900 dark:text-white">TalentPulse AI</span>
              <span className="text-slate-300 dark:text-slate-700">|</span>
              <span>Final Year Diploma in IT Capstone</span>
              <span className="text-slate-300 dark:text-slate-700">|</span>
              <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Dual-Mode Engine Active
              </span>
            </div>

            <div className="flex items-center gap-4 text-[11px] font-medium text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1">
                <Cpu className="w-3.5 h-3.5 text-indigo-500" /> OmniRoute Gateway
              </span>
              <span className="flex items-center gap-1">
                <Terminal className="w-3.5 h-3.5 text-purple-500" /> Ruflo Swarm v1.0
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Proctoring Engine
              </span>
            </div>
          </div>
        </footer>

        {/* Mobile Bottom Navigation Bar */}
        {userRole === 'student' && (
          <nav className={`md:hidden fixed bottom-0 left-0 right-0 z-40 border-t backdrop-blur-xl px-2 py-1.5 flex items-center justify-around text-[10px] font-semibold transition-colors ${
            isDark ? 'bg-slate-950/90 border-slate-800 text-slate-400' : 'bg-white/90 border-slate-200 text-slate-600'
          }`}>
            <button
              onClick={() => setActiveView('jobs')}
              className={`flex flex-col items-center gap-1 py-1 px-2 rounded-lg ${
                activeView === 'jobs' ? 'text-indigo-600 dark:text-indigo-400 font-bold' : ''
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Drives</span>
            </button>
            <button
              onClick={() => setActiveView('ats')}
              className={`flex flex-col items-center gap-1 py-1 px-2 rounded-lg ${
                activeView === 'ats' ? 'text-indigo-600 dark:text-indigo-400 font-bold' : ''
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>ATS</span>
            </button>
            <button
              onClick={() => setActiveView('technical')}
              disabled={!candidateState.atsResult?.passedCutoff}
              className={`flex flex-col items-center gap-1 py-1 px-2 rounded-lg ${
                activeView === 'technical' ? 'text-indigo-600 dark:text-indigo-400 font-bold' : ''
              } ${!candidateState.atsResult?.passedCutoff ? 'opacity-40' : ''}`}
            >
              <Code2 className="w-4 h-4" />
              <span>Tech</span>
            </button>
            <button
              onClick={() => setActiveView('interview')}
              disabled={!candidateState.techResult?.passed}
              className={`flex flex-col items-center gap-1 py-1 px-2 rounded-lg ${
                activeView === 'interview' ? 'text-indigo-600 dark:text-indigo-400 font-bold' : ''
              } ${!candidateState.techResult?.passed ? 'opacity-40' : ''}`}
            >
              <Bot className="w-4 h-4" />
              <span>Interview</span>
            </button>
            <button
              onClick={() => setActiveView('dossier')}
              disabled={!candidateState.interviewResult?.completed}
              className={`flex flex-col items-center gap-1 py-1 px-2 rounded-lg ${
                activeView === 'dossier' ? 'text-indigo-600 dark:text-indigo-400 font-bold' : ''
              } ${!candidateState.interviewResult?.completed ? 'opacity-40' : ''}`}
            >
              <Award className="w-4 h-4" />
              <span>Dossier</span>
            </button>
          </nav>
        )}

      </div>
    </div>
  );
}
