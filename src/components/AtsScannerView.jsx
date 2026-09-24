import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Upload, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  ArrowRight, 
  Sparkles, 
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Building2,
  MapPin,
  GraduationCap,
  Target
} from 'lucide-react';
import { MNC_JOB_DRIVES, BENCHMARK_RESUMES } from '../data/mockData';
import { scanResume } from '../utils/atsScanner';

export default function AtsScannerView({ 
  isDark,
  activeDrive, 
  setActiveDrive, 
  candidateState, 
  setCandidateState, 
  onProceedToTechnical,
  onBackToJobs
}) {
  const [selectedResumeKey, setSelectedResumeKey] = useState('highMatch');
  const [resumeText, setResumeText] = useState(BENCHMARK_RESUMES.highMatch.rawText);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [showRawEditor, setShowRawEditor] = useState(false);

  useEffect(() => {
    handleRunScan(resumeText);
  }, [activeDrive]);

  const handleRunScan = (text) => {
    setIsScanning(true);
    setTimeout(() => {
      const result = scanResume({ resumeText: text, jobDrive: activeDrive });
      setScanResult(result);
      setCandidateState(prev => ({
        ...prev,
        resumeText: text,
        atsResult: result
      }));
      setIsScanning(false);
    }, 250);
  };

  const handleSampleSelect = (key) => {
    setSelectedResumeKey(key);
    const sample = BENCHMARK_RESUMES[key];
    setResumeText(sample.rawText);
    handleRunScan(sample.rawText);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === 'string') {
        setSelectedResumeKey('custom');
        setResumeText(content);
        handleRunScan(content);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8 animate-in fade-in duration-300">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <button
            onClick={onBackToJobs}
            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 flex items-center gap-1 mb-2 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-3.5 h-3.5" /> Back to Campus Drives
          </button>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            ATS Resume Intelligence
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Evaluating algorithmic match for <strong className="text-slate-900 dark:text-white">{activeDrive.company}</strong> ({activeDrive.role})
          </p>
        </div>

        {/* Minimal Drive Switcher */}
        <div className={`flex items-center gap-2 px-3 py-2 rounded-2xl border transition-all ${
          isDark ? 'bg-slate-900/90 border-slate-700' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <Building2 className="w-4 h-4 text-indigo-500" />
          <select 
            value={activeDrive.id}
            onChange={(e) => {
              const drive = MNC_JOB_DRIVES.find(d => d.id === e.target.value);
              if (drive) setActiveDrive(drive);
            }}
            className="bg-transparent text-xs font-bold outline-none cursor-pointer text-slate-800 dark:text-slate-200"
          >
            {MNC_JOB_DRIVES.map(drive => (
              <option key={drive.id} value={drive.id} className="dark:bg-slate-900 dark:text-white">
                {drive.company} ({drive.minAtsScore}% Cutoff)
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Step 1: Resume Input Card */}
      <div className={`p-6 sm:p-8 rounded-3xl border transition-all ${
        isDark ? 'glass-panel-dark' : 'glass-panel-light'
      } space-y-6`}>
        <div>
          <span className="text-[11px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block mb-1">
            Phase 01 • Step 1 of 2
          </span>
          <h2 className="text-lg sm:text-xl font-black tracking-tight">Select or Upload Your Resume</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Choose a benchmark profile for instant viva evaluation or upload your custom resume file.
          </p>
        </div>

        {/* 1-Click Benchmark Candidates */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {Object.entries(BENCHMARK_RESUMES).map(([key, sample]) => {
            const isSelected = selectedResumeKey === key;
            return (
              <button
                key={key}
                onClick={() => handleSampleSelect(key)}
                className={`p-4 rounded-2xl text-left border transition-all cursor-pointer ${
                  isSelected
                    ? isDark 
                      ? 'border-indigo-500 bg-indigo-950/60 ring-2 ring-indigo-500/30' 
                      : 'border-indigo-600 bg-indigo-50/70 ring-2 ring-indigo-500/15 shadow-xs'
                    : isDark
                      ? 'border-slate-800 bg-slate-800/40 hover:bg-slate-800 hover:border-slate-700'
                      : 'border-slate-200 bg-slate-50/70 hover:bg-white hover:border-slate-300'
                }`}
              >
                <div className="text-xs font-bold">{sample.name.split(' ')[0]}</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                  {key === 'highMatch' ? 'Top-Tier CS Candidate' : key === 'averageMatch' ? 'Average Profile' : 'Missing Tech Keywords'}
                </div>
                <div className={`text-[10px] px-2 py-0.5 rounded-full mt-2 font-bold inline-block ${
                  key === 'highMatch' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' :
                  key === 'averageMatch' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' : 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'
                }`}>
                  {sample.badge}
                </div>
              </button>
            );
          })}
        </div>

        {/* Drag & Drop Upload Zone */}
        <div className={`relative border-2 border-dashed rounded-2xl p-6 text-center transition-colors cursor-pointer ${
          isDark 
            ? 'border-slate-700 hover:border-indigo-400 bg-slate-800/30' 
            : 'border-slate-300 hover:border-indigo-500 bg-slate-50/50'
        }`}>
          <input
            type="file"
            accept=".txt,.pdf,.docx,.doc"
            onChange={handleFileUpload}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
          />
          <Upload className="w-6 h-6 text-indigo-500 mx-auto mb-2" />
          <p className="text-xs font-bold">
            Click to upload your resume or drag and drop
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">PDF, DOCX, or TXT up to 5MB</p>
        </div>

        {/* Optional Collapsible Text Editor */}
        <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800">
          <button
            onClick={() => setShowRawEditor(!showRawEditor)}
            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>{showRawEditor ? 'Hide Parsed Resume Text' : 'View / Edit Parsed Resume Text'}</span>
            {showRawEditor ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {showRawEditor && (
            <div className="mt-3 space-y-2 animate-in fade-in">
              <textarea
                value={resumeText}
                onChange={(e) => {
                  setSelectedResumeKey('custom');
                  setResumeText(e.target.value);
                  handleRunScan(e.target.value);
                }}
                rows={8}
                className={`w-full rounded-2xl p-3 text-xs font-mono outline-none leading-relaxed resize-none border transition-all ${
                  isDark 
                    ? 'bg-slate-900 border-slate-700 text-slate-200 focus:border-indigo-500' 
                    : 'bg-slate-50 border-slate-200 text-slate-800 focus:bg-white focus:border-indigo-500'
                }`}
              />
            </div>
          )}
        </div>
      </div>

      {/* Step 2: Instant ATS Diagnostics Card */}
      {scanResult && (
        <div className={`p-6 sm:p-8 rounded-3xl border transition-all ${
          isDark ? 'glass-panel-dark' : 'glass-panel-light'
        } space-y-6`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/80 dark:border-slate-800">
            <div>
              <span className="text-[11px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block mb-1">
                Phase 01 • Step 2 of 2
              </span>
              <h2 className="text-lg sm:text-xl font-black tracking-tight">ATS Evaluation & Heuristic Matrix</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Target Cutoff: <strong className="text-slate-900 dark:text-white">{activeDrive.minAtsScore}%</strong> for {activeDrive.company}
              </p>
            </div>

            {/* Score Pill */}
            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-xs font-bold text-slate-400 block">Match Score</span>
                <span className={`text-3xl sm:text-4xl font-black ${
                  scanResult.atsScore >= activeDrive.minAtsScore 
                    ? 'text-emerald-500' 
                    : scanResult.atsScore >= 55 
                    ? 'text-amber-500' 
                    : 'text-red-500'
                }`}>
                  {scanResult.atsScore}%
                </span>
              </div>

              <div className={`p-3 rounded-2xl ${
                scanResult.passedCutoff 
                  ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' 
                  : 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300'
              }`}>
                {scanResult.passedCutoff ? <CheckCircle2 className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
              </div>
            </div>
          </div>

          {/* 3 Key Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className={`p-4 rounded-2xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Hard Skills Match</div>
              <div className="text-xl font-black mt-1">{scanResult.hardSkillsMatch}%</div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${scanResult.hardSkillsMatch}%` }} />
              </div>
            </div>

            <div className={`p-4 rounded-2xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold">STAR Quantification</div>
              <div className="text-xl font-black mt-1">{scanResult.quantificationScore}%</div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${scanResult.quantificationScore}%` }} />
              </div>
            </div>

            <div className={`p-4 rounded-2xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Format & Structure</div>
              <div className="text-xl font-black mt-1">{scanResult.sectionsFound.length} / 4 Sections</div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-amber-500 h-full rounded-full" style={{ width: `${(scanResult.sectionsFound.length / 4) * 100}%` }} />
              </div>
            </div>
          </div>

          {/* Matched vs Missing Keywords */}
          <div className="space-y-4 pt-2">
            <div>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 mb-2">
                <CheckCircle2 className="w-3.5 h-3.5" /> Matched Skills ({scanResult.foundHardSkills.length}):
              </span>
              <div className="flex flex-wrap gap-1.5">
                {scanResult.foundHardSkills.map((s, idx) => (
                  <span key={idx} className="text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {scanResult.missingHardSkills.length > 0 && (
              <div>
                <span className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1.5 mb-2">
                  <AlertTriangle className="w-3.5 h-3.5" /> Missing Target Keywords ({scanResult.missingHardSkills.length}):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {scanResult.missingHardSkills.map((s, idx) => (
                    <span key={idx} className="text-xs font-bold px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                      + {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Button */}
          <div className="pt-4">
            <button
              onClick={onProceedToTechnical}
              disabled={!scanResult.passedCutoff}
              className={`w-full py-4 px-6 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                scanResult.passedCutoff
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-600/30 hover:scale-[1.01]'
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed border border-slate-300 dark:border-slate-700'
              }`}
            >
              <span>{scanResult.passedCutoff ? 'Proceed to Phase 2: MNC Technical Assessment' : `Score Below Cutoff (${activeDrive.minAtsScore}%) — Update Resume`}</span>
              {scanResult.passedCutoff && <ArrowRight className="w-4 h-4" />}
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
