import React from 'react';
import { 
  Building2, 
  GraduationCap, 
  ShieldCheck, 
  Settings, 
  CheckCircle2, 
  X, 
  Layers, 
  Sparkles,
  Server,
  Lock
} from 'lucide-react';
import { CLIENT_TENANTS } from '../data/tenantConfig';

export default function ClientConfigModal({ 
  isOpen, 
  onClose, 
  isDark, 
  currentTenant, 
  setCurrentTenant 
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/65 backdrop-blur-md animate-in fade-in">
      <div className={`w-full max-w-2xl rounded-3xl p-6 sm:p-8 shadow-2xl border transition-all relative overflow-hidden ${
        isDark ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-5 border-b border-slate-200 dark:border-slate-800 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold tracking-tight">Client Instance & Tenant Configuration</h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                  B2B Software
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Service Provider: <strong className="text-indigo-600 dark:text-indigo-400">Atharva Tech Solutions</strong> • Client-Specific Deployment
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="py-6 space-y-6 relative z-10">
          <div className={`p-4 rounded-2xl border text-xs leading-relaxed ${
            isDark ? 'bg-slate-800/40 border-slate-700 text-slate-300' : 'bg-indigo-50/70 border-indigo-100 text-indigo-900'
          }`}>
            <span className="font-bold flex items-center gap-1.5 mb-1">
              <ShieldCheck className="w-4 h-4 text-indigo-500" /> Private Institutional Architecture
            </span>
            This software is proprietary B2B software deployed specifically for authorized client organizations. When deployed for a college, it operates as an isolated institutional placement ecosystem for registered students and scheduled campus drives. When licensed to corporate clients, it reconfigures according to their recruitment requirements.
          </div>

          {/* Selectable Client Instances */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
              Active Client Deployments (Demonstration Instances)
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Instance 1: College Placement Cell */}
              <div
                onClick={() => setCurrentTenant(CLIENT_TENANTS.college_polytechnic)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  currentTenant.id === 'college_polytechnic'
                    ? isDark
                      ? 'bg-indigo-950/50 border-indigo-500 ring-2 ring-indigo-500/30 shadow-lg'
                      : 'bg-white border-indigo-600 ring-2 ring-indigo-500/20 shadow-md'
                    : isDark
                      ? 'bg-slate-800/40 border-slate-700 hover:border-slate-600'
                      : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="p-2 rounded-xl bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                      <GraduationCap className="w-5 h-5" />
                    </span>
                    {currentTenant.id === 'college_polytechnic' && (
                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Active Client
                      </span>
                    )}
                  </div>

                  <h3 className="text-sm font-bold mt-2">{CLIENT_TENANTS.college_polytechnic.name}</h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {CLIENT_TENANTS.college_polytechnic.division}
                  </p>
                  <p className="text-[10px] text-slate-400">
                    License: {CLIENT_TENANTS.college_polytechnic.licenseStatus}
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">
                  <span>{CLIENT_TENANTS.college_polytechnic.candidatePoolLabel}</span>
                  <span>{CLIENT_TENANTS.college_polytechnic.openingsCountLabel}</span>
                </div>
              </div>

              {/* Instance 2: Corporate Enterprise Client */}
              <div
                onClick={() => setCurrentTenant(CLIENT_TENANTS.corporate_tech)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  currentTenant.id === 'corporate_tech'
                    ? isDark
                      ? 'bg-indigo-950/50 border-indigo-500 ring-2 ring-indigo-500/30 shadow-lg'
                      : 'bg-white border-indigo-600 ring-2 ring-indigo-500/20 shadow-md'
                    : isDark
                      ? 'bg-slate-800/40 border-slate-700 hover:border-slate-600'
                      : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="p-2 rounded-xl bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
                      <Building2 className="w-5 h-5" />
                    </span>
                    {currentTenant.id === 'corporate_tech' && (
                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Active Client
                      </span>
                    )}
                  </div>

                  <h3 className="text-sm font-bold mt-2">{CLIENT_TENANTS.corporate_tech.name}</h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {CLIENT_TENANTS.corporate_tech.division}
                  </p>
                  <p className="text-[10px] text-slate-400">
                    License: {CLIENT_TENANTS.corporate_tech.licenseStatus}
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-[11px] font-semibold text-purple-600 dark:text-purple-400">
                  <span>{CLIENT_TENANTS.corporate_tech.candidatePoolLabel}</span>
                  <span>{CLIENT_TENANTS.corporate_tech.openingsCountLabel}</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
          <span>Client Isolation: High Security Private Tenant</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all shadow-md cursor-pointer"
          >
            Apply Tenant Configuration
          </button>
        </div>

      </div>
    </div>
  );
}
