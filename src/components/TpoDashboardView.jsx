import React, { useState } from 'react';
import { 
  Users, 
  Download, 
  Search, 
  Filter, 
  TrendingUp, 
  Award, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle,
  Building2,
  GraduationCap,
  Sparkles,
  Eye,
  FileSpreadsheet
} from 'lucide-react';
import { INITIAL_TPO_CANDIDATES, MNC_JOB_DRIVES } from '../data/mockData';

export default function TpoDashboardView({ onSelectCandidate, onSwitchToStudent }) {
  const [candidates, setCandidates] = useState(INITIAL_TPO_CANDIDATES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDriveFilter, setSelectedDriveFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedCandidateModal, setSelectedCandidateModal] = useState(null);

  const filteredCandidates = candidates.filter(cand => {
    const matchSearch = cand.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      cand.rollNo.toLowerCase().includes(searchQuery.toLowerCase());
    const matchDrive = selectedDriveFilter === 'All' || cand.driveApplied.includes(selectedDriveFilter);
    const matchStatus = statusFilter === 'All' || cand.status === statusFilter;
    return matchSearch && matchDrive && matchStatus;
  });

  const totalApplicants = candidates.length;
  const shortlistedCount = candidates.filter(c => c.status === 'Shortlisted').length;
  const avgAts = Math.round(candidates.reduce((a, b) => a + b.atsScore, 0) / (totalApplicants || 1));
  const avgTech = Math.round(candidates.reduce((a, b) => a + b.technicalScore, 0) / (totalApplicants || 1));
  const avgInterview = Math.round(candidates.reduce((a, b) => a + b.interviewScore, 0) / (totalApplicants || 1));

  const handleExportCsv = () => {
    const headers = ['Roll No', 'Name', 'Email', 'Target Drive', 'ATS Match %', 'Technical Score %', 'HR Interview %', 'Eye Contact %', 'WPM', 'Filler Count', 'Placement Verdict', 'Status'];
    const rows = filteredCandidates.map(c => [
      c.rollNo,
      `"${c.name}"`,
      c.email,
      `"${c.driveApplied}"`,
      c.atsScore,
      c.technicalScore,
      c.interviewScore,
      c.eyeContactRatio,
      c.speechWpm,
      c.fillerWordsCount,
      `"${c.verdict}"`,
      c.status
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Campus_Placement_Shortlist_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleUpdateStatus = (id, newStatus) => {
    setCandidates(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header & Export Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl light-card border border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" /> Training & Placement Officer (TPO) Command Hub
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Corporate Recruitment Management Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Live candidate screening telemetry, ATS compliance rankings, and one-click corporate shortlisting.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            id="export-csv-btn"
            onClick={handleExportCsv}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-2 shadow-xs transition-all cursor-pointer"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Export Official CSV Shortlist</span>
          </button>
        </div>
      </div>

      {/* 4 Placement Analytics KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-2xl light-card border border-slate-200 space-y-1.5">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Total Evaluated</span>
            <Users className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-3xl font-black text-slate-900">{totalApplicants}</div>
          <div className="text-[11px] text-slate-500 font-medium">Registered student profiles</div>
        </div>

        <div className="p-5 rounded-2xl light-card border border-slate-200 space-y-1.5">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Shortlisted for MNCs</span>
            <Award className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-black text-emerald-600">{shortlistedCount}</div>
          <div className="text-[11px] text-emerald-700 font-bold">
            {Math.round((shortlistedCount / (totalApplicants || 1)) * 100)}% Placement Conversion
          </div>
        </div>

        <div className="p-5 rounded-2xl light-card border border-slate-200 space-y-1.5">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Average ATS Match</span>
            <TrendingUp className="w-4 h-4 text-cyan-600" />
          </div>
          <div className="text-3xl font-black text-cyan-700">{avgAts}%</div>
          <div className="text-[11px] text-slate-500 font-medium">Across engineering cohort</div>
        </div>

        <div className="p-5 rounded-2xl light-card border border-slate-200 space-y-1.5">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>Avg Technical / HR</span>
            <CheckCircle2 className="w-4 h-4 text-violet-600" />
          </div>
          <div className="text-3xl font-black text-violet-700">{avgTech}% / {avgInterview}%</div>
          <div className="text-[11px] text-slate-500 font-medium">Benchmark standards passed</div>
        </div>

      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl light-card border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search candidate name or roll number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-600 font-medium">MNC Drive:</span>
            <select
              value={selectedDriveFilter}
              onChange={(e) => setSelectedDriveFilter(e.target.value)}
              className="bg-white border border-slate-200 text-slate-900 rounded-xl px-3 py-1.5 text-xs font-semibold outline-none cursor-pointer"
            >
              <option value="All">All Companies</option>
              <option value="Amazon">Amazon</option>
              <option value="TCS">TCS Digital</option>
              <option value="Infosys">Infosys</option>
              <option value="FinTech">FinTech</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-600 font-medium">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-white border border-slate-200 text-slate-900 rounded-xl px-3 py-1.5 text-xs font-semibold outline-none cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="Shortlisted">Shortlisted</option>
              <option value="Under Review">Under Review</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>

      </div>

      {/* Master Candidate Leaderboard Table */}
      <div className="rounded-2xl light-card border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3.5 px-4">Candidate</th>
                <th className="py-3.5 px-4">Target Drive</th>
                <th className="py-3.5 px-4 text-center">ATS Match</th>
                <th className="py-3.5 px-4 text-center">Tech Score</th>
                <th className="py-3.5 px-4 text-center">HR Interview</th>
                <th className="py-3.5 px-4 text-center">Eye Contact</th>
                <th className="py-3.5 px-4">Placement Verdict</th>
                <th className="py-3.5 px-4 text-center">TPO Decision</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredCandidates.map((cand) => (
                <tr key={cand.id} className="hover:bg-slate-50/80 transition-colors">
                  
                  {/* Candidate Name & Roll */}
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900 text-sm">{cand.name}</div>
                    <div className="text-[11px] text-indigo-600 font-mono font-medium">{cand.rollNo} • {cand.email}</div>
                  </td>

                  {/* Drive */}
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-800">{cand.driveApplied.split('(')[0]}</div>
                    <div className="text-[11px] text-slate-500">{cand.date}</div>
                  </td>

                  {/* ATS Match */}
                  <td className="py-3.5 px-4 text-center">
                    <span className={`font-bold ${cand.atsScore >= 75 ? 'text-emerald-700' : cand.atsScore >= 60 ? 'text-amber-700' : 'text-red-700'}`}>
                      {cand.atsScore}%
                    </span>
                  </td>

                  {/* Tech Score */}
                  <td className="py-3.5 px-4 text-center">
                    <span className={`font-bold ${cand.technicalScore >= 75 ? 'text-emerald-700' : cand.technicalScore >= 60 ? 'text-amber-700' : 'text-red-700'}`}>
                      {cand.technicalScore}%
                    </span>
                  </td>

                  {/* HR Score */}
                  <td className="py-3.5 px-4 text-center">
                    <span className={`font-bold ${cand.interviewScore >= 75 ? 'text-violet-700' : cand.interviewScore >= 60 ? 'text-amber-700' : 'text-red-700'}`}>
                      {cand.interviewScore}%
                    </span>
                  </td>

                  {/* Eye Contact */}
                  <td className="py-3.5 px-4 text-center">
                    <span className="font-mono text-cyan-700 font-bold">
                      {cand.eyeContactRatio}%
                    </span>
                  </td>

                  {/* Verdict */}
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                      cand.verdict === 'Strong Hire' 
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300' 
                        : cand.verdict === 'Hire with Training'
                        ? 'bg-amber-50 text-amber-800 border-amber-300'
                        : 'bg-red-50 text-red-800 border-red-300'
                    }`}>
                      {cand.verdict}
                    </span>
                  </td>

                  {/* TPO Action */}
                  <td className="py-3.5 px-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <select
                        value={cand.status}
                        onChange={(e) => handleUpdateStatus(cand.id, e.target.value)}
                        className={`text-[11px] font-bold rounded-lg px-2 py-1 border outline-none cursor-pointer ${
                          cand.status === 'Shortlisted'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                            : cand.status === 'Under Review'
                            ? 'bg-amber-50 text-amber-800 border-amber-300'
                            : 'bg-red-50 text-red-800 border-red-300'
                        }`}
                      >
                        <option value="Shortlisted">Shortlist</option>
                        <option value="Under Review">Under Review</option>
                        <option value="Rejected">Reject</option>
                      </select>

                      <button
                        onClick={() => setSelectedCandidateModal(cand)}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold border border-slate-300 transition-colors cursor-pointer"
                        title="View Detailed Dossier"
                      >
                        Inspect
                      </button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Candidate Deep-Dive Modal */}
      {selectedCandidateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-xl w-full p-6 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">{selectedCandidateModal.name}</h3>
                <p className="text-xs text-indigo-600 font-mono font-medium">{selectedCandidateModal.rollNo} • {selectedCandidateModal.email}</p>
              </div>
              <button
                onClick={() => setSelectedCandidateModal(null)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 flex items-center justify-center font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500">Target Drive:</span>
                <div className="font-bold text-slate-900 mt-0.5">{selectedCandidateModal.driveApplied}</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500">Placement Verdict:</span>
                <div className="font-bold text-emerald-700 mt-0.5">{selectedCandidateModal.verdict}</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500">Speech Acoustics:</span>
                <div className="font-bold text-slate-900 mt-0.5">{selectedCandidateModal.speechWpm} WPM ({selectedCandidateModal.fillerWordsCount} fillers)</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500">Gaze Stability:</span>
                <div className="font-bold text-cyan-700 mt-0.5">{selectedCandidateModal.eyeContactRatio}% Stable Focus</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
              <div className="font-bold text-slate-800">Competency Breakdown:</div>
              <div className="space-y-1.5">
                <div className="flex justify-between text-slate-600">
                  <span>ATS Keyword Match:</span>
                  <span className="font-bold text-slate-900">{selectedCandidateModal.radarMetrics?.atsMatch || 90}%</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Technical Problem Solving:</span>
                  <span className="font-bold text-slate-900">{selectedCandidateModal.radarMetrics?.technicalDepth || 92}%</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Communication Clarity:</span>
                  <span className="font-bold text-slate-900">{selectedCandidateModal.radarMetrics?.communicationClarity || 85}%</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>STAR Behavioral Framework:</span>
                  <span className="font-bold text-slate-900">{selectedCandidateModal.radarMetrics?.starMethodology || 88}%</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setSelectedCandidateModal(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
