import React from 'react';
import { ShieldCheck, AlertTriangle, AlertCircle, MapPin, UserCheck, Database, Send, Download } from 'lucide-react';
import { OverallRating } from '../../types/audit';

interface AuditHeaderProps {
  scorePercentage: number;
  earnedPoints: number;
  maxPoints: number;
  criticalCount: number;
  majorCount: number;
  rating: OverallRating;
  auditorName: string;
  auditDate: string;
  onOpenSupabase: () => void;
  onOpenShareEmail: () => void;
  onGeneratePDF: () => void;
}

export const AuditHeader: React.FC<AuditHeaderProps> = ({
  scorePercentage,
  earnedPoints,
  maxPoints,
  criticalCount,
  majorCount,
  rating,
  auditorName,
  auditDate,
  onOpenSupabase,
  onOpenShareEmail,
  onGeneratePDF
}) => {
  return (
    <header class="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 shadow-2xl">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div class="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Facility Branding */}
          <div class="flex items-center space-x-4">
            <div class="w-12 h-12 rounded-xl bg-gradient-to-tr from-sky-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-sky-500/20">
              MW
            </div>
            <div>
              <div class="flex items-center space-x-2">
                <h1 class="text-lg font-bold text-white tracking-tight">Maliban Wovens (Pvt) Ltd</h1>
                <span class="px-2 py-0.5 text-xs font-semibold rounded-full bg-slate-800 text-sky-400 border border-slate-700">
                  Balangoda Plant
                </span>
              </div>
              <p class="text-xs text-slate-400 flex items-center gap-2">
                <span class="flex items-center gap-1"><MapPin class="w-3 h-3 text-slate-400" /> Balangoda, Sri Lanka</span>
                <span>•</span>
                <span class="flex items-center gap-1"><UserCheck class="w-3 h-3 text-slate-400" /> {auditorName}</span>
                <span>•</span>
                <span>{auditDate}</span>
              </p>
            </div>
          </div>

          {/* Dynamic Scorecard Banner */}
          <div class="flex items-center space-x-6">
            <div class={`px-4 py-2 rounded-xl border flex items-center space-x-3 transition-all duration-300 ${
              rating === 'RED' ? 'bg-red-950/70 border-red-500/50 text-red-300' :
              rating === 'YELLOW' ? 'bg-amber-950/70 border-amber-500/50 text-amber-300' :
              'bg-emerald-950/70 border-emerald-500/50 text-emerald-300'
            }`}>
              <div class={`w-8 h-8 rounded-lg flex items-center justify-center ${
                rating === 'RED' ? 'bg-red-500/20' : rating === 'YELLOW' ? 'bg-amber-500/20' : 'bg-emerald-500/20'
              }`}>
                {rating === 'RED' ? <AlertTriangle class="w-5 h-5 text-red-400" /> :
                 rating === 'YELLOW' ? <AlertCircle class="w-5 h-5 text-amber-400" /> :
                 <ShieldCheck class="w-5 h-5 text-emerald-400" />}
              </div>
              <div>
                <div class="text-[10px] uppercase tracking-wider font-semibold opacity-80">Overall Facility Rating</div>
                <div class="text-sm font-bold tracking-wide">
                  {rating === 'RED' ? 'RED (NON-COMPLIANT)' : rating === 'YELLOW' ? 'YELLOW (NEEDS IMPROVEMENT)' : 'GREEN (COMPLIANT)'}
                </div>
              </div>
            </div>

            {/* Score Box */}
            <div class="text-center px-4 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700">
              <div class="text-[10px] uppercase text-slate-400 font-medium">Compliance Score</div>
              <div class="text-xl font-black text-sky-400">{scorePercentage}%</div>
              <div class="text-[10px] text-slate-400">{earnedPoints} / {maxPoints} pts</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div class="flex items-center space-x-2">
            <button onClick={onOpenSupabase} class="px-3 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center gap-1.5 transition">
              <Database class="w-4 h-4 text-emerald-400" />
              <span class="hidden sm:inline">Supabase DB</span>
            </button>
            <button onClick={onOpenShareEmail} class="px-3.5 py-2 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-1.5 shadow-lg shadow-indigo-600/30 transition">
              <Send class="w-4 h-4" />
              <span>Share & Distribute</span>
            </button>
            <button onClick={onGeneratePDF} class="px-3.5 py-2 text-xs font-semibold rounded-lg bg-sky-600 hover:bg-sky-500 text-white flex items-center gap-1.5 shadow-lg shadow-sky-600/30 transition">
              <Download class="w-4 h-4" />
              <span>Download PDF</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
