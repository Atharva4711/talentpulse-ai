import React from 'react';
import { Sparkles, Building2, TrendingUp, Award, Clock } from 'lucide-react';

export default function PlacementTicker({ isDark, currentTenant }) {
  const tickerItems = [
    { icon: Sparkles, text: `${currentTenant?.name || 'Government Polytechnic'} Placement Season 2026 Active`, highlight: "Verified Client" },
    { icon: Building2, text: `${currentTenant?.stats?.activeDrives || 4} Visiting Tech MNCs Approved for Campus Drive`, highlight: "Approved" },
    { icon: TrendingUp, text: `${currentTenant?.stats?.offersSecured || 48} Offers Rolled | Highest CTC: ${currentTenant?.stats?.highestPackage || '₹28 LPA'}`, highlight: "Top Package" },
    { icon: Award, text: `TPO Eligibility: Minimum 65% Aggregate & Zero Active Backlogs`, highlight: "Cutoff" },
    { icon: Clock, text: `Service Provider: Atharva Tech Solutions (Isolated Tenant)`, highlight: "Private SLA" }
  ];

  return (
    <div className={`border-b text-xs overflow-hidden transition-colors ${
      isDark 
        ? 'bg-slate-950/80 border-slate-800 text-slate-400' 
        : 'bg-gradient-to-r from-indigo-50 via-purple-50 to-sky-50 border-slate-200/80 text-slate-700'
    }`}>
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between gap-4">
        
        {/* Left Badge */}
        <div className="flex items-center gap-1.5 shrink-0 font-bold text-[11px] text-indigo-600 dark:text-indigo-400">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="uppercase tracking-wider">CRD 2026 Live:</span>
        </div>

        {/* Scrolling / Rotating Ticker Items */}
        <div className="flex-1 overflow-x-auto no-scrollbar whitespace-nowrap flex items-center gap-6 text-[11px] font-medium">
          {tickerItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="inline-flex items-center gap-1.5 shrink-0">
                <Icon className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400 shrink-0" />
                <span>{item.text}</span>
                <span className="px-1.5 py-0.2 rounded-md bg-indigo-100 text-indigo-700 dark:bg-indigo-950/80 dark:text-indigo-300 font-bold text-[10px]">
                  {item.highlight}
                </span>
                {idx < tickerItems.length - 1 && <span className="text-slate-300 dark:text-slate-700 ml-4">•</span>}
              </div>
            );
          })}
        </div>

        {/* Right Quick Status */}
        <div className="hidden lg:flex items-center gap-2 shrink-0 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span>TPO Server Connected</span>
        </div>

      </div>
    </div>
  );
}
