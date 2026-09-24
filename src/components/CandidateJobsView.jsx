import React from 'react';
import { 
  Building2, 
  Briefcase, 
  MapPin, 
  DollarSign, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Layers,
  GraduationCap
} from 'lucide-react';
import { MNC_JOB_DRIVES } from '../data/mockData';

export default function CandidateJobsView({ activeDrive, setActiveDrive, onApplyDrive }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Hero Welcome Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-indigo-200 text-xs font-semibold border border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-indigo-300" /> College Placement Season 2026
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Campus Placement & AI Assessment Portal
          </h1>
          <p className="text-sm text-indigo-100/90 leading-relaxed">
            Welcome, Candidate! Select an active campus recruitment drive to evaluate your resume with our Industry ATS Scanner, complete the MNC technical assessment, and undergo your live AI HR interview.
          </p>
        </div>

        {/* Decorative background glow */}
        <div className="absolute right-0 top-0 -mt-10 -mr-10 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Drives Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Active Campus Placement Drives</h2>
            <p className="text-xs text-slate-500">Verified visiting corporate recruiters with active hiring slots</p>
          </div>
          <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
            {MNC_JOB_DRIVES.length} Drives Open
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MNC_JOB_DRIVES.map((drive) => {
            const isSelected = activeDrive.id === drive.id;

            return (
              <div 
                key={drive.id}
                className={`p-6 rounded-2xl light-card-interactive border transition-all flex flex-col justify-between ${
                  isSelected ? 'border-indigo-500 ring-2 ring-indigo-500/20 shadow-md' : 'border-slate-200'
                }`}
              >
                <div className="space-y-4">
                  {/* Top: Company Logo, Name & Package */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center p-2 shadow-xs">
                        <Building2 className="w-6 h-6 text-indigo-600" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">{drive.tier}</span>
                        <h3 className="text-lg font-bold text-slate-900 leading-tight">{drive.company}</h3>
                        <p className="text-xs font-medium text-slate-600">{drive.role}</p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="inline-block text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {drive.ctc}
                      </span>
                    </div>
                  </div>

                  {/* Location & Summary */}
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {drive.description}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{drive.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                      <span>Min ATS: {drive.minAtsScore}%</span>
                    </div>
                  </div>

                  {/* Required Tech Stack */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-100">
                    <span className="text-[11px] font-semibold text-slate-500">Core Skills Required:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {drive.requiredHardSkills.slice(0, 6).map((skill, idx) => (
                        <span key={idx} className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                          {skill}
                        </span>
                      ))}
                      {drive.requiredHardSkills.length > 6 && (
                        <span className="text-[11px] text-slate-400 self-center">
                          +{drive.requiredHardSkills.length - 6} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Apply Button */}
                <div className="pt-6">
                  <button
                    onClick={() => {
                      setActiveDrive(drive);
                      onApplyDrive();
                    }}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      isSelected 
                        ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20' 
                        : 'bg-slate-900 hover:bg-slate-800 text-white'
                    }`}
                  >
                    <span>Apply & Launch ATS Screening</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
