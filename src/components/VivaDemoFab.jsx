import React, { useState } from 'react';
import { 
  GraduationCap, 
  X, 
  Sparkles, 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Cpu, 
  Eye, 
  ShieldCheck, 
  Award,
  Database,
  ArrowRight
} from 'lucide-react';
import { BENCHMARK_RESUMES } from '../data/mockData';

export default function VivaDemoFab({ 
  isDark, 
  setCandidateState, 
  setActiveView, 
  candidateState,
  onOpenCloudAi
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  // 1-Click Complete Flow for Viva Demonstration
  const handleAutoFillFullJourney = () => {
    setCandidateState({
      resumeText: BENCHMARK_RESUMES.highMatch.rawText,
      atsResult: {
        score: 92,
        passedCutoff: true,
        keywordScore: 94,
        quantScore: 90,
        formatScore: 92,
        matchedSkills: ['JavaScript', 'React', 'Node.js', 'PostgreSQL', 'Docker', 'AWS', 'Git', 'REST APIs', 'CI/CD'],
        missingSkills: ['Kubernetes'],
        quantifiedBullets: [
          'Engineered responsive web app serving 10,000+ daily requests with 99.9% uptime',
          'Optimized database queries reducing p95 latency by 42%',
          'Automated CI/CD pipelines cutting deployment cycles by 35%'
        ],
        formatIssues: [],
        timestamp: new Date().toISOString()
      },
      techResult: {
        passed: true,
        mcqScore: 100,
        codePassed: true,
        proctoringViolations: 0,
        totalScore: 95,
        executionTime: '0.42ms',
        timestamp: new Date().toISOString()
      },
      interviewResult: {
        completed: true,
        totalScore: 89,
        eyeContactRatio: 86,
        sentiment: 'Confident & Focused',
        wpm: 128,
        fillerCount: 1,
        starAdherence: 'Strong',
        feedbackNotes: 'Exemplary technical articulation and structured STAR responses.',
        timestamp: new Date().toISOString()
      }
    });
    setActiveView('dossier');
    setIsOpen(false);
  };

  const handleReset = () => {
    setCandidateState({
      resumeText: BENCHMARK_RESUMES.highMatch.rawText,
      atsResult: null,
      techResult: null,
      interviewResult: null
    });
    setActiveView('jobs');
    setIsOpen(false);
  };

  const vivaQuestions = [
    {
      q: "Q1. How does the ATS Heuristic Engine work without external cloud dependencies?",
      a: "Our ATS Engine tokenizes the candidate's resume and compares it against industry job description vectors using weighted keyword intersections. It also applies regular expression heuristics to benchmark quantifiable metrics (STAR format) and flags formatting vulnerabilities—all computed instantly in-browser."
    },
    {
      q: "Q2. How does the 60 FPS Computer Vision HUD track eye contact on client devices?",
      a: "It leverages the HTML5 Canvas API and WebRTC video stream. By sampling pixel luminance gradients and iris reticle drift at 60 FPS directly on the client, it calculates gaze center percentage and posture stability with zero latency and complete student privacy."
    },
    {
      q: "Q3. What anti-cheat mechanisms are used during the coding assessment?",
      a: "We integrate the HTML5 Page Visibility API (`document.visibilityState`) and window focus/blur event listeners. Any attempt to switch tabs or open auxiliary windows is logged and deducted from the candidate's Proctoring Integrity Score."
    },
    {
      q: "Q4. Why is this project especially valuable for College Placement Cells (TPOs)?",
      a: "Traditional college placements rely on manual spreadsheets. TalentPulse AI gives TPOs a single dashboard with live leaderboards, cutoff filters, candidate deep-dive dossiers, and one-click standard CSV exports for corporate recruiters."
    },
    {
      q: "Q5. Why use an In-House Small Language Model (SLM) instead of paid OpenAI/AWS APIs?",
      a: "Enterprise HR and institutional placement drives require 100% data privacy (DPDP/GDPR compliant) and cannot leak candidate resumes or webcam audio to external US cloud servers. Fine-tuning a local SLM (1.82 GB Q4_K_M) eliminates $3,000/month in recurring token bills, provides <20ms inference latency, guarantees 100% offline resilience during network outages, and gives our software proprietary IP ownership."
    },
    {
      q: "Q6. How does the MongoDB Atlas + Local SQLite dual resilience architecture work?",
      a: "TalentPulse AI operates with active-active dual persistence. Dynamic job vacancies and interview STAR evaluations are automatically synced to MongoDB Atlas cloud collections over TLS/HTTPS when online, and replicated locally to embedded SQLite. If internet connectivity drops during an active campus drive, the system operates completely autonomously without losing a single candidate record."
    }
  ];

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:scale-105 active:scale-95 transition-all cursor-pointer font-bold text-xs"
        >
          <GraduationCap className="w-4 h-4" />
          <span className="hidden sm:inline">Examiner Viva Voce Controller</span>
          <span className="sm:hidden">Viva Demo</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </button>
      </div>

      {/* Floating Modal / Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-end sm:justify-center p-4 bg-slate-950/50 backdrop-blur-xs animate-in fade-in">
          <div 
            className={`w-full max-w-lg rounded-3xl p-6 shadow-2xl border transition-all ${
              isDark 
                ? 'bg-slate-900/95 text-slate-100 border-slate-700' 
                : 'bg-white/95 text-slate-900 border-slate-200'
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold">Examiner Demonstration Controller</h3>
                  <p className="text-[11px] text-slate-500">1-Click Test Scenarios for Diploma Viva Voce</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Quick Demo Actions */}
            <div className="py-4 space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">1-Click Demo Scenarios</span>
              
              <button
                onClick={handleAutoFillFullJourney}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-indigo-500/10 to-violet-500/10 border border-indigo-500/30 hover:border-indigo-500/60 text-left transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-indigo-600 dark:text-indigo-400 group-hover:underline">
                      ⚡ Complete Full Student Assessment
                    </h4>
                    <p className="text-[10px] text-slate-500">Auto-evaluates ATS (92%), Tech round, AI interview & generates official Dossier</p>
                  </div>
                </div>
                <Play className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
              </button>

              <button
                onClick={() => {
                  setIsOpen(false);
                  if (onOpenCloudAi) onOpenCloudAi();
                }}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 hover:border-emerald-500/60 text-left transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <Database className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-emerald-600 dark:text-emerald-400 group-hover:underline">
                      ☁️ Inspect MongoDB Atlas & In-House AI Studio
                    </h4>
                    <p className="text-[10px] text-slate-500">Live cloud cluster collections, model fine-tuning loss, and 5TB cloud storage sync</p>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              </button>

              <button
                onClick={handleReset}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-left hover:bg-slate-200/60 dark:hover:bg-slate-700 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-slate-400 text-white flex items-center justify-center shrink-0">
                    <RotateCcw className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold">Reset Candidate State</h4>
                    <p className="text-[10px] text-slate-500">Clear all assessment results and return to Campus Placement Drives</p>
                  </div>
                </div>
              </button>
            </div>

            {/* Academic Viva Q&A Accordion */}
            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2 max-h-56 overflow-y-auto pr-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Viva Voce Q&A Cheat-Sheet</span>
              
              {vivaQuestions.map((item, index) => (
                <div 
                  key={index}
                  className={`rounded-xl border text-xs transition-all overflow-hidden ${
                    isDark ? 'border-slate-800 bg-slate-800/40' : 'border-slate-200 bg-slate-50'
                  }`}
                >
                  <button
                    onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                    className="w-full p-2.5 flex items-center justify-between text-left font-semibold cursor-pointer"
                  >
                    <span>{item.q}</span>
                    {activeFaq === index ? (
                      <ChevronUp className="w-3.5 h-3.5 text-indigo-500 shrink-0 ml-2" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-2" />
                    )}
                  </button>
                  {activeFaq === index && (
                    <div className="px-2.5 pb-2.5 text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-200/50 dark:border-slate-700/50 pt-2">
                      {item.a}
                    </div>
                  )}
                </div>
              ))}
            </div>

          </div>
        </div>
      )}
    </>
  );
}
