import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Upload, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  ArrowRight, 
  Sparkles, 
  Briefcase, 
  Layers, 
  TrendingUp, 
  Search,
  ExternalLink,
  Info,
  ChevronLeft
} from 'lucide-react';
import { MNC_JOB_DRIVES, BENCHMARK_RESUMES } from '../data/mockData';
import { scanResume } from '../utils/atsScanner';

export default function AtsScannerView({ 
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
    }, 350);
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Breadcrumb & Drive Selector Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl light-card border border-slate-200">
        <div>
          <button
            onClick={onBackToJobs}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 mb-2 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-3.5 h-3.5" /> Back to Campus Drives
          </button>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" /> Phase 1: Industry-Grade ATS Screening
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Resume ATS Analysis & Keyword Parser
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Parses resume formatting, hard skill keywords, quantification, and section structure against corporate benchmarks.
          </p>
        </div>

        {/* Target Drive Selector */}
        <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200">
          <label className="text-xs font-semibold text-slate-600">Active Drive:</label>
          <select 
            id="target-job-drive-select"
            value={activeDrive.id}
            onChange={(e) => {
              const drive = MNC_JOB_DRIVES.find(d => d.id === e.target.value);
              if (drive) setActiveDrive(drive);
            }}
            className="bg-white border border-slate-200 text-slate-900 rounded-lg px-3 py-1.5 text-xs font-semibold outline-none cursor-pointer shadow-2xs"
          >
            {MNC_JOB_DRIVES.map(drive => (
              <option key={drive.id} value={drive.id}>
                {drive.company} — {drive.role}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Target Drive Criteria Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl light-card border border-slate-200">
          <div className="text-xs text-slate-500 font-medium">Recruiting Company</div>
          <div className="text-sm font-bold text-slate-900 mt-0.5">{activeDrive.company}</div>
          <div className="text-xs text-indigo-600 font-semibold">{activeDrive.role}</div>
        </div>
        <div className="p-4 rounded-xl light-card border border-slate-200">
          <div className="text-xs text-slate-500 font-medium">CTC & Location</div>
          <div className="text-sm font-bold text-emerald-600 mt-0.5">{activeDrive.ctc}</div>
          <div className="text-xs text-slate-500">{activeDrive.location}</div>
        </div>
        <div className="p-4 rounded-xl light-card border border-slate-200">
          <div className="text-xs text-slate-500 font-medium">Mandatory Cutoff</div>
          <div className="text-sm font-bold text-slate-900 mt-0.5">{activeDrive.minAtsScore}% Match</div>
          <div className="text-xs text-slate-500">Required to unlock Round 2</div>
        </div>
        <div className="p-4 rounded-xl light-card border border-slate-200">
          <div className="text-xs text-slate-500 font-medium">Target Tech Stack</div>
          <div className="text-xs text-slate-700 font-medium mt-1 truncate">
            {activeDrive.requiredHardSkills.slice(0, 4).join(', ')}...
          </div>
        </div>
      </div>

      {/* Main Dual Grid: Left Resume Input & Right ATS Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Resume Input */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 rounded-2xl light-card border border-slate-200 space-y-4">
            
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-600" /> Resume Document Input
              </h2>
              <span className="text-xs text-slate-500 font-medium">
                {resumeText.split(/\s+/).filter(Boolean).length} words
              </span>
            </div>

            {/* Quick Benchmark Resume Selectors for Viva Demonstration */}
            <div>
              <label className="text-xs font-bold text-slate-700 mb-2 block">
                ⚡ 1-Click Benchmark Candidates (Test Real-World Scenarios):
              </label>
              <div className="grid grid-cols-3 gap-2">
                {Object.entries(BENCHMARK_RESUMES).map(([key, sample]) => {
                  const isSelected = selectedResumeKey === key;
                  return (
                    <button
                      key={key}
                      onClick={() => handleSampleSelect(key)}
                      className={`p-2.5 rounded-xl text-left border text-xs transition-all cursor-pointer ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50/70 text-indigo-950 font-bold shadow-2xs'
                          : 'border-slate-200 bg-slate-50 hover:bg-white text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      <div className="font-bold truncate text-slate-900">{sample.name.split(' ')[0]}</div>
                      <div className={`text-[10px] px-1.5 py-0.5 rounded mt-1 font-semibold inline-block ${
                        key === 'highMatch' ? 'bg-emerald-100 text-emerald-800' :
                        key === 'averageMatch' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {sample.badge}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Drag & Drop File Upload */}
            <div className="relative border-2 border-dashed border-slate-300 rounded-xl p-4 text-center hover:border-indigo-500 transition-colors bg-slate-50/50">
              <input
                type="file"
                accept=".txt,.pdf,.docx,.doc"
                onChange={handleFileUpload}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
              <Upload className="w-6 h-6 text-indigo-600 mx-auto mb-1.5" />
              <p className="text-xs font-semibold text-slate-800">
                Drag and drop resume file here, or <span className="text-indigo-600 underline">browse</span>
              </p>
              <p className="text-[10px] text-slate-500 mt-0.5">Supports PDF, DOCX, or plain text</p>
            </div>

            {/* Raw Text Preview / Editor */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-700">Parsed Resume Text:</label>
                <button
                  onClick={() => handleRunScan(resumeText)}
                  disabled={isScanning}
                  className="text-xs text-indigo-600 hover:text-indigo-800 font-bold cursor-pointer"
                >
                  {isScanning ? 'Scanning...' : 'Re-calculate ATS Score'}
                </button>
              </div>
              <textarea
                value={resumeText}
                onChange={(e) => {
                  setSelectedResumeKey('custom');
                  setResumeText(e.target.value);
                  handleRunScan(e.target.value);
                }}
                rows={12}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 font-mono focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none resize-none leading-relaxed"
                placeholder="Paste or edit resume text here..."
              />
            </div>

          </div>
        </div>

        {/* Right Column: ATS Evaluation Diagnostics */}
        <div className="lg:col-span-6 space-y-6">
          {scanResult && (
            <div className="p-6 rounded-2xl light-card border border-slate-200 space-y-6">
              
              {/* ATS Score Header Card */}
              <div className="flex items-center justify-between p-5 rounded-xl bg-slate-50 border border-slate-200">
                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Industry ATS Match Score
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className={`text-4xl font-black ${
                      scanResult.atsScore >= activeDrive.minAtsScore 
                        ? 'text-emerald-600' 
                        : scanResult.atsScore >= 55 
                        ? 'text-amber-600' 
                        : 'text-red-600'
                    }`}>
                      {scanResult.atsScore}%
                    </span>
                    <span className="text-xs text-slate-500 font-bold">/ 100</span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-2">
                    {scanResult.passedCutoff ? (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" /> Qualified for Technical Round (≥ {activeDrive.minAtsScore}%)
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-red-800 bg-red-100 px-2.5 py-0.5 rounded-full border border-red-300">
                        <XCircle className="w-3.5 h-3.5 text-red-700" /> Below Drive Cutoff ({activeDrive.minAtsScore}%)
                      </span>
                    )}
                  </div>
                </div>

                {/* Score Radial Ring */}
                <div className="relative w-20 h-20 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-slate-200"
                      strokeWidth="3.5"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className={
                        scanResult.atsScore >= activeDrive.minAtsScore 
                          ? 'text-emerald-500' 
                          : scanResult.atsScore >= 55 
                          ? 'text-amber-500' 
                          : 'text-red-500'
                      }
                      strokeDasharray={`${scanResult.atsScore}, 100`}
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <span className="absolute text-sm font-black text-slate-900">
                    {scanResult.atsScore}%
                  </span>
                </div>
              </div>

              {/* 4-Factor Breakdown Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-[11px] font-semibold text-slate-500">Hard Skills</div>
                  <div className="text-base font-bold text-slate-900 mt-0.5">{scanResult.hardSkillsMatch}%</div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${scanResult.hardSkillsMatch}%` }} />
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-[11px] font-semibold text-slate-500">Soft Skills</div>
                  <div className="text-base font-bold text-slate-900 mt-0.5">{scanResult.softSkillsMatch}%</div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div className="bg-violet-600 h-full rounded-full" style={{ width: `${scanResult.softSkillsMatch}%` }} />
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-[11px] font-semibold text-slate-500">Quantification</div>
                  <div className="text-base font-bold text-slate-900 mt-0.5">{scanResult.quantificationScore}%</div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div className="bg-emerald-600 h-full rounded-full" style={{ width: `${scanResult.quantificationScore}%` }} />
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-[11px] font-semibold text-slate-500">Sections Valid</div>
                  <div className="text-base font-bold text-slate-900 mt-0.5">{scanResult.sectionsFound.length} / 4</div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div className="bg-amber-500 h-full rounded-full" style={{ width: `${(scanResult.sectionsFound.length / 4) * 100}%` }} />
                  </div>
                </div>
              </div>

              {/* Matched vs Missing Keywords */}
              <div className="space-y-3">
                <div className="text-xs font-bold text-slate-800">Technical Keyword Breakdown:</div>
                
                {/* Matched Keywords */}
                <div>
                  <div className="text-[11px] text-emerald-700 font-bold mb-1.5 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Matched Keywords ({scanResult.foundHardSkills.length}):
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {scanResult.foundHardSkills.map((skill, idx) => (
                      <span key={idx} className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {skill}
                      </span>
                    ))}
                    {scanResult.foundHardSkills.length === 0 && (
                      <span className="text-xs text-slate-500 italic">No hard skill matches found in resume text.</span>
                    )}
                  </div>
                </div>

                {/* Missing Keywords */}
                <div>
                  <div className="text-[11px] text-amber-700 font-bold mb-1.5 flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" /> Missing Drive Keywords ({scanResult.missingHardSkills.length}):
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {scanResult.missingHardSkills.map((skill, idx) => (
                      <span key={idx} className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200">
                        + {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Red Flags & Recommendations */}
              <div className="space-y-2">
                {scanResult.redFlags.length > 0 && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200">
                    <div className="text-xs font-bold text-red-800 flex items-center gap-1 mb-1">
                      <XCircle className="w-3.5 h-3.5 text-red-600" /> ATS Red Flags Detected:
                    </div>
                    <ul className="text-[11px] text-red-700 list-disc list-inside space-y-0.5 font-medium">
                      {scanResult.redFlags.map((flag, idx) => (
                        <li key={idx}>{flag}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {scanResult.recommendations.length > 0 && (
                  <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-200">
                    <div className="text-xs font-bold text-indigo-900 flex items-center gap-1 mb-1">
                      <Info className="w-3.5 h-3.5 text-indigo-600" /> Keyword & Format Guidance:
                    </div>
                    <ul className="text-[11px] text-indigo-800 list-disc list-inside space-y-0.5 font-medium">
                      {scanResult.recommendations.map((rec, idx) => (
                        <li key={idx}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Transition to Phase 2: Technical Round */}
              <div className="pt-2">
                <button
                  id="proceed-to-technical-btn"
                  onClick={onProceedToTechnical}
                  disabled={!scanResult.passedCutoff}
                  className={`w-full py-3 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    scanResult.passedCutoff
                      ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/25'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300'
                  }`}
                >
                  <span>Proceed to Phase 2: MNC Technical Assessment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                {!scanResult.passedCutoff && (
                  <p className="text-[11px] text-center text-slate-500 mt-2 font-medium">
                    *ATS score must meet or exceed {activeDrive.minAtsScore}% to unlock the technical assessment round.
                  </p>
                )}
              </div>

            </div>
          )}
        </div>

      </div>

    </div>
  );
}
