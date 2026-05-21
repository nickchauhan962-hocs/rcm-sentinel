'use client';

import React, { useState } from 'react';
import { 
  History, 
  Search, 
  Filter, 
  ShieldCheck, 
  TrendingUp, 
  DollarSign, 
  Download,
  AlertTriangle,
  FolderOpen
} from 'lucide-react';
import MetricCard from '@/components/MetricCard';

interface AuditTrail {
  timestamp: string;
  claimId: string;
  patientName: string;
  fieldModified: string;
  originalValue: string;
  correctedValue: string;
  actor: string;
  npiToken: string;
  status: 'SUCCESS' | 'WARNING' | 'PENDING';
}

const mockAuditTrail: AuditTrail[] = [
  {
    timestamp: "2026-05-21 16:45:11",
    claimId: "CLM-9082",
    patientName: "Marcus Vance",
    fieldModified: "Prior Authorization Indicator",
    originalValue: "Null",
    correctedValue: "AUTH-UHC-88192A",
    actor: "Claim Recovery Agent",
    npiToken: "NPI-AI-RECOVERY",
    status: "SUCCESS"
  },
  {
    timestamp: "2026-05-21 15:32:04",
    claimId: "CLM-8841",
    patientName: "Sarah Jenkins",
    fieldModified: "ICD-10 Diagnostic Code",
    originalValue: "J45.909 (Asthma)",
    correctedValue: "R07.9 (Chest Pain)",
    actor: "Coding Compliance Agent",
    npiToken: "NPI-AI-COMPLIANCE",
    status: "SUCCESS"
  },
  {
    timestamp: "2026-05-20 11:22:45",
    claimId: "CLM-8552",
    patientName: "Elena Rostova",
    fieldModified: "CPT Modifier Code",
    originalValue: "99285",
    correctedValue: "99285-27",
    actor: "Dr. Niket Chauhan",
    npiToken: "NPI-18821992",
    status: "SUCCESS"
  },
  {
    timestamp: "2026-05-20 09:12:18",
    claimId: "CLM-8390",
    patientName: "Olivia Henderson",
    fieldModified: "CPT Modifier Code",
    originalValue: "19301",
    correctedValue: "19301-50",
    actor: "Claim Recovery Agent",
    npiToken: "NPI-AI-RECOVERY",
    status: "SUCCESS"
  },
  {
    timestamp: "2026-05-19 14:02:51",
    claimId: "CLM-8712",
    patientName: "Robert Chen",
    fieldModified: "Documentation Attachment",
    originalValue: "None",
    correctedValue: "PET_Biopsy_Rep_0428.pdf",
    actor: "Billing Desk (Admin)",
    npiToken: "NPI-10492182",
    status: "PENDING"
  },
  {
    timestamp: "2026-05-18 10:44:30",
    claimId: "CLM-8419",
    patientName: "David Miller",
    fieldModified: "Payer Contract Exclusion",
    originalValue: "Out-of-Network Review",
    correctedValue: "No correction possible",
    actor: "CFO Forecast Agent",
    npiToken: "NPI-AI-FORECAST",
    status: "WARNING"
  }
];

export default function RevenueIntelligencePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterActor, setFilterActor] = useState('ALL');

  const filteredAudits = mockAuditTrail.filter(audit => {
    const matchesSearch = audit.claimId.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          audit.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          audit.fieldModified.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesActor = filterActor === 'ALL' || 
                         (filterActor === 'AI' && audit.actor.includes('Agent')) ||
                         (filterActor === 'USER' && !audit.actor.includes('Agent'));

    return matchesSearch && matchesActor;
  });

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b-2 border-slate-900">
        <div>
          <span className="text-[9px] font-mono text-slate-500 tracking-widest uppercase font-bold">AUDIT COMPLIANCE MODULE // AUDITS LEDGER</span>
          <h2 className="text-xl font-black text-slate-900 mt-1 uppercase tracking-tight">Revenue Leakage Ledger</h2>
        </div>

        <button 
          className="self-start sm:self-auto py-2 px-3 border-2 border-slate-900 bg-white text-xs font-mono font-bold text-slate-900 hover:bg-slate-50 flex items-center gap-2 transition-all cursor-pointer"
          title="Export CSV audit file"
        >
          <Download size={12} />
          <span>EXPORT_AUDIT_LOGS</span>
        </button>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          title="LEAKAGE RECOVERY RATIO"
          value="82.4%"
          subtext="Intercepted leakage vs net losses"
          trend={{ value: 4.8, isPositive: true }}
          icon={<ShieldCheck size={18} />}
          variant="cyan"
        />
        <MetricCard 
          title="UNRESOLVED GAPS VALUE"
          value="$184,200"
          subtext="Under active appeals process"
          trend={{ value: 12.1, isPositive: false }}
          icon={<AlertTriangle size={18} />}
          variant="yellow"
        />
        <MetricCard 
          title="AUDITED CLAIMS VOL"
          value="12,450"
          subtext="Total transaction volume YTD"
          icon={<FolderOpen size={18} />}
          variant="purple"
        />
        <MetricCard 
          title="AVERAGE CLAIM AUDIT TIME"
          value="0.32s"
          subtext="Orchestration node routing speed"
          icon={<History size={18} />}
          variant="green"
        />
      </div>

      {/* Main Ledger Table & Filter Controls */}
      <div className="border border-slate-200 bg-white p-5 md:p-6 space-y-5">
        
        {/* Filter controls */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          <div className="flex-1 max-w-sm relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Search size={14} />
            </div>
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 focus:border-slate-400 rounded py-2 pl-9 pr-4 text-xs font-mono text-slate-800 outline-none"
              placeholder="Search Claim ID, patient, or field..."
            />
          </div>

          <div className="flex gap-2 text-[10px] font-mono">
            <button 
              onClick={() => setFilterActor('ALL')}
              className={`px-3 py-1.5 transition-all font-bold cursor-pointer ${
                filterActor === 'ALL' ? 'bg-slate-900 text-white' : 'border border-slate-200 text-slate-500 bg-white hover:bg-slate-50'
              }`}
            >
              ALL_ACTORS
            </button>
            <button 
              onClick={() => setFilterActor('AI')}
              className={`px-3 py-1.5 transition-all font-bold cursor-pointer ${
                filterActor === 'AI' ? 'bg-slate-900 text-white' : 'border border-slate-200 text-slate-500 bg-white hover:bg-slate-50'
              }`}
            >
              AI_AGENTS_ONLY
            </button>
            <button 
              onClick={() => setFilterActor('USER')}
              className={`px-3 py-1.5 transition-all font-bold cursor-pointer ${
                filterActor === 'USER' ? 'bg-slate-900 text-white' : 'border border-slate-200 text-slate-500 bg-white hover:bg-slate-50'
              }`}
            >
              CRO_USERS_ONLY
            </button>
          </div>
        </div>

        {/* Audit Logs Table Ledger */}
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-[9px] select-text">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 pb-2">
                <th className="py-2.5 font-bold uppercase tracking-wider">TIMESTAMP</th>
                <th className="py-2.5 font-bold uppercase tracking-wider">CLAIM_ID</th>
                <th className="py-2.5 font-bold uppercase tracking-wider">PATIENT</th>
                <th className="py-2.5 font-bold uppercase tracking-wider">FIELD_MODIFIED</th>
                <th className="py-2.5 font-bold uppercase tracking-wider">PRE_VALUE</th>
                <th className="py-2.5 font-bold uppercase tracking-wider">POST_VALUE</th>
                <th className="py-2.5 font-bold uppercase tracking-wider">ACTOR</th>
                <th className="py-2.5 font-bold uppercase tracking-wider">NPI_TOKEN</th>
                <th className="py-2.5 font-bold uppercase tracking-wider text-center">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredAudits.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-6 text-center text-slate-400 uppercase">No audit records correspond to search vectors.</td>
                </tr>
              ) : (
                filteredAudits.map((audit, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 text-slate-400">{audit.timestamp}</td>
                    <td className="py-3.5 font-bold text-blue-600">{audit.claimId}</td>
                    <td className="py-3.5 text-slate-800">{audit.patientName}</td>
                    <td className="py-3.5 text-slate-600 font-bold">{audit.fieldModified}</td>
                    <td className="py-3.5 text-slate-400 line-through">{audit.originalValue}</td>
                    <td className="py-3.5 text-slate-900 font-black">{audit.correctedValue}</td>
                    <td className="py-3.5 text-slate-700 font-bold uppercase">{audit.actor}</td>
                    <td className="py-3.5 text-slate-400">{audit.npiToken}</td>
                    <td className="py-3.5 text-center">
                      <span className={`px-2 py-0.5 text-[8px] font-extrabold border uppercase ${
                        audit.status === 'SUCCESS' 
                          ? 'text-emerald-800 border-emerald-300 bg-emerald-50' 
                          : audit.status === 'PENDING'
                            ? 'text-blue-800 border-blue-200 bg-blue-50'
                            : 'text-amber-800 border-amber-300 bg-amber-50'
                      }`}>
                        {audit.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

