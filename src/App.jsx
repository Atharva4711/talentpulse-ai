import React, { useState } from 'react';
import Navbar from './components/Navbar';
import CandidateJobsView from './components/CandidateJobsView';
import AtsScannerView from './components/AtsScannerView';
import TechnicalAssessmentView from './components/TechnicalAssessmentView';
import AiInterviewStudioView from './components/AiInterviewStudioView';
import CandidateDossierView from './components/CandidateDossierView';
import TpoDashboardView from './components/TpoDashboardView';
import { MNC_JOB_DRIVES, BENCHMARK_RESUMES } from './data/mockData';
import { Cpu, ShieldCheck, Sparkles, Terminal, Activity } from 'lucide-react';

export default function App() {
  const [activeView, setActiveView] = useState('jobs');
  const [userRole, setUserRole] = useState('student');
  const [activeDrive, setActiveDrive] = useState(MNC_JOB_DRIVES[0]);

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
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col font-sans selection:bg-indigo-500/20 selection:text-indigo-800">
      
      {/* Top Global Navigation with Dual Persona Switcher */}
      <Navbar
        activeView={activeView}
        setActiveView={setActiveView}
        userRole={userRole}
        setUserRole={setUserRole}
        activeDrive={activeDrive}
        candidateState={candidateState}
      />

      {/* Main View Router */}
      <main className="flex-1 pb-16">
        {userRole === 'tpo' || activeView.startsWith('tpo') ? (
          <TpoDashboardView
            onSelectCandidate={() => setActiveView('dossier')}
            onSwitchToStudent={() => {
              setUserRole('student');
              setActiveView('jobs');
            }}
          />
        ) : activeView === 'jobs' ? (
          <CandidateJobsView
            activeDrive={activeDrive}
            setActiveDrive={setActiveDrive}
            onApplyDrive={handleApplyDrive}
          />
        ) : activeView === 'ats' ? (
          <AtsScannerView
            activeDrive={activeDrive}
            setActiveDrive={setActiveDrive}
            candidateState={candidateState}
            setCandidateState={setCandidateState}
            onProceedToTechnical={handleProceedToTechnical}
            onBackToJobs={() => setActiveView('jobs')}
          />
        ) : activeView === 'technical' ? (
          <TechnicalAssessmentView
            activeDrive={activeDrive}
            candidateState={candidateState}
            setCandidateState={setCandidateState}
            onProceedToInterview={handleProceedToInterview}
            onBackToAts={() => setActiveView('ats')}
          />
        ) : activeView === 'interview' ? (
          <AiInterviewStudioView
            activeDrive={activeDrive}
            candidateState={candidateState}
            setCandidateState={setCandidateState}
            onProceedToDossier={handleProceedToDossier}
            onBackToTechnical={() => setActiveView('technical')}
          />
        ) : (
          <CandidateDossierView
            candidateState={candidateState}
            activeDrive={activeDrive}
            onResetWorkflow={handleResetWorkflow}
            onSwitchToTpo={() => {
              setUserRole('tpo');
              setActiveView('tpo-dashboard');
            }}
          />
        )}
      </main>

      {/* Capstone System Status Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-md bg-indigo-600 flex items-center justify-center text-white">
              <Activity className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-slate-900 tracking-tight">TalentPulse AI</span>
            <span className="text-slate-300">|</span>
            <span>Final Year College Capstone Project</span>
            <span className="text-slate-300">|</span>
            <span className="text-emerald-700 flex items-center gap-1 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Dual-Mode Engine Active
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-500 font-medium">
            <span className="flex items-center gap-1">
              <Cpu className="w-3.5 h-3.5 text-indigo-600" /> OmniRoute Gateway
            </span>
            <span className="flex items-center gap-1">
              <Terminal className="w-3.5 h-3.5 text-violet-600" /> Ruflo Swarm v1.0
            </span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Proctoring Engine
            </span>
          </div>
        </div>
      </footer>

    </div>
  );
}
