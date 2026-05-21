'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { 
  TrendingUp, 
  AlertTriangle, 
  Cpu, 
  Layers,
  ArrowRight,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import MetricCard from '@/components/MetricCard';
import LiveKafkaStream from '@/components/LiveKafkaStream';
import { mockClaims, mockRecoveryHistory, systemSummaryStats } from '@/data/claimsData';
import { mockAIAgents } from '@/data/mockAgents';

// Load Recharts dynamically to prevent hydration/SSR mismatches
const ResponsiveContainer = dynamic(
  () => import('recharts').then(mod => mod.ResponsiveContainer),
  { ssr: false }
);
const AreaChart = dynamic(
  () => import('recharts').then(mod => mod.AreaChart),
  { ssr: false }
);
const Area = dynamic(
  () => import('recharts').then(mod => mod.Area),
  { ssr: false }
);
const XAxis = dynamic(
  () => import('recharts').then(mod => mod.XAxis),
  { ssr: false }
);
const YAxis = dynamic(
  () => import('recharts').then(mod => mod.YAxis),
  { ssr: false }
);
const Tooltip = dynamic(
  () => import('recharts').then(mod => mod.Tooltip),
  { ssr: false }
);
const CartesianGrid = dynamic(
  () => import('recharts').then(mod => mod.CartesianGrid),
  { ssr: false }
);

export default function DashboardPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const triggerDataFetch = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Denied':
        return 'text-red-700 bg-red-50 border-red-100';
      case 'Appealing':
        return 'text-amber-700 bg-amber-50 border-amber-100';
      case 'Recovered':
        return 'text-emerald-700 bg-emerald-50 border-emerald-100';
      case 'Under Review':
        return 'text-blue-700 bg-blue-50 border-blue-100';
      default:
        return 'text-slate-500 bg-slate-50 border-slate-200';
    }
  };

  const getAgentStatusDot = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-600';
      case 'idle': return 'bg-slate-400';
      case 'success': return 'bg-emerald-600';
      default: return 'bg-blue-600';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Welcome Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <span className="text-[9px] font-mono font-bold text-slate-400 tracking-widest uppercase">CRO SESSION DESK: DR. NIKET CHAUHAN</span>
          <h2 className="text-xl font-bold font-mono tracking-tight text-slate-900 flex items-center gap-2 mt-1">
            <span>COMMAND CENTER</span>
            <span className="text-[9px] px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-700 font-mono font-bold">SYS_DESK_01</span>
          </h2>
        </div>

        {/* Refresh Sync */}
        <button 
          onClick={triggerDataFetch}
          className="self-start sm:self-auto py-2 px-3 rounded border border-slate-200 bg-white hover:bg-slate-50 text-xs font-mono font-bold text-slate-7550 text-slate-700 flex items-center gap-2 transition-all cursor-pointer shadow-sm"
        >
          <RefreshCw size={12} className={refreshing ? 'animate-spin text-blue-600' : ''} />
          <span>{refreshing ? 'SYNCHRONIZING...' : 'SYNC_METRICS'}</span>
        </button>
      </div>

      {/* Grid of 4 High-Density KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        <MetricCard 
          title="TOTAL RECOVERED REVENUE"
          value={`$${(systemSummaryStats.totalRecovered / 1000000).toFixed(2)}M`}
          subtext="Net capital losses intercepted"
          trend={{ value: 14.2, isPositive: true }}
          icon={<TrendingUp size={16} />}
          variant="green"
        />
        <MetricCard 
          title="ACTIVE DENIAL RATE"
          value={`${systemSummaryStats.denialRate}%`}
          subtext="Industry average benchmark: 12.4%"
          trend={{ value: 1.8, isPositive: false }}
          icon={<AlertTriangle size={16} />}
          variant="purple"
        />
        <MetricCard 
          title="CLAIMS UNDER RISK POOL"
          value={systemSummaryStats.claimsAtRisk}
          subtext="Flagged by prior auth agents"
          trend={{ value: 3.5, isPositive: true }}
          icon={<Layers size={16} />}
          variant="yellow"
        />
        <MetricCard 
          title="AI AUDIT CONFIDENCE"
          value={`${systemSummaryStats.aiConfidenceScore}%`}
          subtext="Weighted compliance validation"
          trend={{ value: 0.8, isPositive: true }}
          icon={<Cpu size={16} />}
          variant="cyan"
        />
      </div>

      {/* Section Row 1: Area Chart & Live Kafka Event Monitor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6">
        
        {/* Denial / Recovery Area Chart */}
        <div className="lg:col-span-7 swiss-panel border border-slate-200 bg-white rounded-lg p-5 md:p-6 flex flex-col justify-between min-h-[320px]">
          <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-4 shrink-0">
            <div>
              <h3 className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase">REVENUE FLOW INDEX</h3>
              <span className="text-[10px] text-slate-500 font-medium">Denied vs Recovered hospital funds (Q1/Q2 YTD)</span>
            </div>
            <div className="flex gap-4 text-[9px] font-mono font-bold">
              <span className="flex items-center gap-1.5 text-slate-650">
                <span className="w-2.5 h-1.5 rounded-sm bg-blue-600"></span>
                <span>DENIED</span>
              </span>
              <span className="flex items-center gap-1.5 text-slate-650">
                <span className="w-2.5 h-1.5 rounded-sm bg-slate-800"></span>
                <span>RECOVERED</span>
              </span>
            </div>
          </div>

          <div className="w-full h-[220px]">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockRecoveryHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorDenied" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorRecovered" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0f172a" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#0f172a" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    stroke="#94a3b8" 
                    fontSize={9} 
                    fontFamily="monospace"
                  />
                  <YAxis 
                    stroke="#94a3b8" 
                    fontSize={9} 
                    fontFamily="monospace"
                    tickFormatter={(v) => `$${v / 1000}k`}
                  />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="Denied" 
                    stroke="#2563eb" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorDenied)" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="Recovered" 
                    stroke="#0f172a" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorRecovered)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-xs font-mono text-slate-400">
                Initializing visual telemetry index...
              </div>
            )}
          </div>
        </div>

        {/* Live Kafka Stream Widget */}
        <div className="lg:col-span-5">
          <LiveKafkaStream />
        </div>
      </div>

      {/* Section Row 2: High Value Claims Table & AI Agents Center */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6">
        
        {/* High-Value Claims List */}
        <div className="lg:col-span-7 swiss-panel border border-slate-200 bg-white rounded-lg p-5 md:p-6 flex flex-col justify-between">
          <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-4">
            <div>
              <h3 className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase">HIGH-VALUE RECOVERABLE QUEUE</h3>
              <span className="text-[10px] text-slate-500 font-medium">Claims ordered by recovery probability and revenue volume</span>
            </div>
            <button 
              onClick={() => router.push('/claims')}
              className="text-[10px] font-mono font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>MANAGE_QUEUE</span>
              <ArrowRight size={12} />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-[10px] select-text">
              <thead>
                <tr className="border-b border-slate-150 text-slate-500 pb-2">
                  <th className="py-2.5 font-bold">CLAIM_ID</th>
                  <th className="py-2.5 font-bold">PATIENT</th>
                  <th className="py-2.5 font-bold">PAYER</th>
                  <th className="py-2.5 font-bold text-right">CHARGE</th>
                  <th className="py-2.5 font-bold text-center">AI_PROB</th>
                  <th className="py-2.5 font-bold text-center">STATUS</th>
                  <th className="py-2.5 font-bold text-center">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {mockClaims.slice(0, 4).map((claim) => (
                  <tr key={claim.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 font-bold text-slate-900">{claim.id}</td>
                    <td className="py-3 text-slate-700">{claim.patientName}</td>
                    <td className="py-3 text-slate-500">{claim.payer}</td>
                    <td className="py-3 text-right text-slate-900 font-bold">
                      ${claim.chargeAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-3 text-center">
                      <span className={`font-black ${
                        claim.recoveryProbability >= 85 
                          ? 'text-emerald-600' 
                          : claim.recoveryProbability >= 70 
                            ? 'text-blue-600' 
                            : 'text-amber-600'
                      }`}>
                        {claim.recoveryProbability}%
                      </span>
                    </td>
                    <td className="py-3 text-center">
                      <span className={`px-2 py-0.5 rounded border text-[8px] font-bold tracking-wider ${getStatusBadge(claim.status)}`}>
                        {claim.status}
                      </span>
                    </td>
                    <td className="py-3 text-center">
                      <button 
                        onClick={() => router.push(`/claims?id=${claim.id}`)}
                        className="py-1 px-2.5 rounded bg-slate-50 hover:bg-blue-600 hover:text-white border border-slate-200 hover:border-blue-600 transition-all text-[8px] font-bold text-slate-750 text-slate-700 flex items-center gap-1 mx-auto cursor-pointer"
                      >
                        <Sparkles size={8} />
                        <span>ANALYZE</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Agent Registry */}
        <div className="lg:col-span-5 swiss-panel border border-slate-200 bg-white rounded-lg p-5 md:p-6 flex flex-col justify-between">
          <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-4">
            <div>
              <h3 className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase">AI AGENTS ORCHESTRATOR</h3>
              <span className="text-[10px] text-slate-500 font-medium">Active autonomous processes in production</span>
            </div>
            <button 
              onClick={() => router.push('/agents')}
              className="text-[10px] font-mono font-bold text-slate-800 hover:text-slate-900 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>CONTROL_ROOM</span>
              <ArrowRight size={12} />
            </button>
          </div>

          {/* List of Agents */}
          <div className="space-y-3.5">
            {mockAIAgents.slice(0, 3).map((agent) => (
              <div 
                key={agent.id}
                className="p-3 rounded border border-slate-200 bg-slate-50 flex items-center justify-between gap-4 hover:border-slate-300 transition-all group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded border border-slate-200 bg-white flex items-center justify-center text-slate-500 shrink-0">
                    <Cpu size={16} className="text-slate-650 group-hover:text-blue-600 transition-colors" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 truncate">{agent.name}</h4>
                    <p className="text-[9px] font-mono text-slate-500 truncate mt-0.5 font-medium">{agent.activeTasks[0]}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="flex flex-col items-end">
                    <span className="text-[8px] font-mono text-slate-500 uppercase font-bold">{agent.status}</span>
                    <span className="text-[8px] font-mono text-slate-400 font-bold">{agent.systemUsage}% CPU</span>
                  </div>
                  <div className={`w-1.5 h-1.5 rounded-full ${getAgentStatusDot(agent.status)}`}></div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
}
