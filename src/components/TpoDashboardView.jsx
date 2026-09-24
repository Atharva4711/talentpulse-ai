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
  FileSpreadsheet,
  ArrowRight
} from 'lucide-react';
import { INITIAL_TPO_CANDIDATES, MNC_JOB_DRIVES } from '../data/mockData';

export default function TpoDashboardView({ isDark, onSelectCandidate, onSwitchToStudent }) {
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
    link.setAttribute('download', `TPO_Placement_Report_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleUpdateStatus = (id, newStatus) => {
    setCandidates(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              TPO Placement Command Center
            </h1>
            <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
              Recruiter Mode
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Real-time candidate pipeline, multimodal assessment analytics, and corporate CSV export
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCsv}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Official CSV</span>
          </button>

          <button
            onClick={onSwitchToStudent}
            className={`px-4 py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
              isDark 
                ? 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800' 
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-xs'
            }`}
          >
            Switch to Student View
          </button>
        </div>
      </div>

      {/* Aggregate KPI Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className={`p-5 rounded-2xl border transition-all ${
          isDark ? 'glass-panel-dark' : 'glass-panel-light'
        }`}>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Total Assessed</span>
          <div className="text-2xl sm:text-3xl font-black mt-1 text-slate-900 dark:text-white">{totalApplicants}</div>
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 font-semibold">100% Verified Batch</p>
        </div>

        <div className={`p-5 rounded-2xl border transition-all ${
          isDark ? 'glass-panel-dark' : 'glass-panel-light'
        }`}>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Shortlisted Rate</span>
          <div className="text-2xl sm:text-3xl font-black mt-1 text-indigo-600 dark:text-indigo-400">
            {Math.round((shortlistedCount / (totalApplicants || 1)) * 100)}%
          </div>
          <p className="text-[11px] text-slate-500 mt-1">{shortlistedCount} Candidates Qualified</p>
        </div>

        <div className={`p-5 rounded-2xl border transition-all ${
          isDark ? 'glass-panel-dark' : 'glass-panel-light'
        }`}>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Mean ATS Match</span>
          <div className="text-2xl sm:text-3xl font-black mt-1 text-emerald-600 dark:text-emerald-400">{avgAts}%</div>
          <p className="text-[11px] text-slate-500 mt-1">Across 4 Visiting MNCs</p>
        </div>

        <div className={`p-5 rounded-2xl border transition-all ${
          isDark ? 'glass-panel-dark' : 'glass-panel-light'
        }`}>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">HR Delivery Mean</span>
          <div className="text-2xl sm:text-3xl font-black mt-1 text-purple-600 dark:text-purple-400">{avgInterview}%</div>
          <p className="text-[11px] text-slate-500 mt-1">STAR Method Adherence</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4 ${
        isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
      }`}>
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by student name or roll no..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-transparent text-xs outline-none border-b border-slate-300 dark:border-slate-700 focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={selectedDriveFilter}
            onChange={(e) => setSelectedDriveFilter(e.target.value)}
            className={`px-3 py-2 rounded-xl text-xs font-semibold border outline-none cursor-pointer ${
              isDark ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-700'
            }`}
          >
            <option value="All">All Corporate Drives</option>
            {MNC_JOB_DRIVES.map(d => (
              <option key={d.id} value={d.company}>{d.company}</option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={`px-3 py-2 rounded-xl text-xs font-semibold border outline-none cursor-pointer ${
              isDark ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-700'
            }`}
          >
            <option value="All">All Statuses</option>
            <option value="Shortlisted">Shortlisted</option>
            <option value="Under Review">Under Review</option>
            <option value="Waitlisted">Waitlisted</option>
          </select>
        </div>
      </div>

      {/* Candidate Table */}
      <div className={`rounded-3xl border overflow-hidden shadow-xl ${
        isDark ? 'border-slate-800 bg-slate-900/60' : 'border-slate-200 bg-white'
      }`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className={`border-b font-bold uppercase tracking-wider text-[10px] ${
              isDark ? 'bg-slate-800/60 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-500'
            }`}>
              <tr>
                <th className="p-4">Candidate</th>
                <th className="p-4">Target Company</th>
                <th className="p-4">ATS Match</th>
                <th className="p-4">Tech Round</th>
                <th className="p-4">HR Round</th>
                <th className="p-4">Verdict</th>
                <th className="p-4">Status & Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {filteredCandidates.map(cand => (
                <tr 
                  key={cand.id} 
                  className={`transition-colors cursor-pointer ${
                    isDark ? 'hover:bg-slate-800/40' : 'hover:bg-slate-50'
                  }`}
                  onClick={() => setSelectedCandidateModal(cand)}
                >
                  <td className="p-4">
                    <div className="font-bold text-slate-900 dark:text-white">{cand.name}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{cand.rollNo}</div>
                  </td>
                  <td className="p-4 font-semibold">{cand.driveApplied}</td>
                  <td className="p-4 font-black text-indigo-600 dark:text-indigo-400">{cand.atsScore}%</td>
                  <td className="p-4 font-black text-emerald-600 dark:text-emerald-400">{cand.technicalScore}%</td>
                  <td className="p-4 font-black text-purple-600 dark:text-purple-400">{cand.interviewScore}%</td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                      {cand.verdict}
                    </span>
                  </td>
                  <td className="p-4" onClick={(e) => e.stopPropagation()}>
                    <select
                      value={cand.status}
                      onChange={(e) => handleUpdateStatus(cand.id, e.target.value)}
                      className={`px-2 py-1 rounded-lg text-[11px] font-bold border outline-none cursor-pointer ${
                        cand.status === 'Shortlisted' 
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300'
                          : cand.status === 'Waitlisted'
                          ? 'bg-amber-50 text-amber-800 border-amber-300 dark:bg-amber-950 dark:text-amber-300'
                          : 'bg-slate-100 text-slate-700 border-slate-300 dark:bg-slate-800 dark:text-slate-300'
                      }`}
                    >
                      <option value="Shortlisted">Shortlisted</option>
                      <option value="Under Review">Under Review</option>
                      <option value="Waitlisted">Waitlisted</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Candidate Deep-Dive Modal */}
      {selectedCandidateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-in fade-in">
          <div className={`border rounded-3xl max-w-xl w-full p-6 space-y-6 shadow-2xl relative ${
            isDark ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold">{selectedCandidateModal.name}</h3>
                <p className="text-xs text-indigo-500 font-mono font-medium">{selectedCandidateModal.rollNo} • {selectedCandidateModal.email}</p>
              </div>
              <button
                onClick={() => setSelectedCandidateModal(null)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <span className="text-slate-400">Target Drive:</span>
                <div className="font-bold mt-0.5">{selectedCandidateModal.driveApplied}</div>
              </div>
              <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <span className="text-slate-400">Placement Verdict:</span>
                <div className="font-bold text-emerald-500 mt-0.5">{selectedCandidateModal.verdict}</div>
              </div>
              <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <span className="text-slate-400">Speech Acoustics:</span>
                <div className="font-bold mt-0.5">{selectedCandidateModal.speechWpm} WPM ({selectedCandidateModal.fillerWordsCount} fillers)</div>
              </div>
              <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <span className="text-slate-400">Gaze Stability:</span>
                <div className="font-bold text-cyan-500 mt-0.5">{selectedCandidateModal.eyeContactRatio}% Stable Focus</div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setSelectedCandidateModal(null)}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold cursor-pointer"
              >
                Close Inspection
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
