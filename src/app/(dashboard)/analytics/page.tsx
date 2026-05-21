'use client';

import React, { useState, useEffect } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import { 
  TrendingUp, 
  DollarSign, 
  AlertOctagon, 
  Building2
} from 'lucide-react';
import { mockForecastingData, mockPayerHeatmap, mockPayerMetrics } from '@/data/claimsData';
import MetricCard from '@/components/MetricCard';



export default function AnalyticsPage() {
  const [mounted, setMounted] = useState(false);
  const [timeframe, setTimeframe] = useState<'30d' | '90d' | 'ytd'>('ytd');

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b-2 border-slate-900">
        <div>
          <span className="text-[9px] font-mono text-slate-500 tracking-widest uppercase font-bold">FINANCIAL INTELLIGENCE // ANALYTICS & FORECASTS</span>
          <h2 className="text-xl font-black text-slate-900 mt-1 uppercase tracking-tight">Analytics & Forecasting</h2>
        </div>

        {/* Timeframe Selector */}
        <div className="inline-flex items-center gap-1.5 p-1 bg-white border border-slate-200 self-start sm:self-auto text-[10px] font-mono">
          <button 
            onClick={() => setTimeframe('30d')}
            className={`px-3 py-1.5 transition-all font-bold cursor-pointer ${
              timeframe === '30d' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            30_DAYS
          </button>
          <button 
            onClick={() => setTimeframe('90d')}
            className={`px-3 py-1.5 transition-all font-bold cursor-pointer ${
              timeframe === '90d' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            90_DAYS
          </button>
          <button 
            onClick={() => setTimeframe('ytd')}
            className={`px-3 py-1.5 transition-all font-bold cursor-pointer ${
              timeframe === 'ytd' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            YEAR_TO_DATE
          </button>
        </div>
      </div>

      {/* Mini top cards row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          title="UNDERPAYMENT VALUE FLAGGED"
          value="$342,800"
          subtext="Unbilled modifiers / NCCI adjustments"
          trend={{ value: 8.4, isPositive: true }}
          icon={<DollarSign size={18} />}
          variant="cyan"
        />
        <MetricCard 
          title="DENIAL LEAKAGE INTERCEPTED"
          value="$1.45M"
          subtext="Net recovered after appeals cost"
          trend={{ value: 16.1, isPositive: true }}
          icon={<TrendingUp size={18} />}
          variant="green"
        />
        <MetricCard 
          title="RISK VARIANCE INDEX"
          value="Medium (42)"
          subtext="Weighted risk score distribution"
          trend={{ value: 2.1, isPositive: false }}
          icon={<AlertOctagon size={18} />}
          variant="purple"
        />
        <MetricCard 
          title="MULTI-FACILITY CORRELATION"
          value="99.4%"
          subtext="Entity audit consistency rating"
          icon={<Building2 size={18} />}
          variant="yellow"
        />
      </div>

      {/* Graphs row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Cash Flow Forecast (Line Chart) */}
        <div className="lg:col-span-7 border border-slate-200 bg-white p-5 md:p-6 flex flex-col justify-between min-h-[340px]">
          <div className="flex justify-between items-center pb-4 border-b border-slate-200 mb-4 shrink-0">
            <div>
              <h3 className="text-xs font-mono font-bold tracking-widest text-slate-800 uppercase">RECOVERY CASH FLOW FORECAST</h3>
              <span className="text-[10px] text-slate-500 font-mono">Actual recovery trends mapped against CFO Agent projections</span>
            </div>
          </div>

          <div className="w-full h-[220px]">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockForecastingData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="name" stroke="#475569" fontSize={9} fontFamily="monospace" />
                  <YAxis stroke="#475569" fontSize={9} fontFamily="monospace" tickFormatter={(v) => `$${v / 1000}k`} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: '9px', fontFamily: 'monospace', paddingTop: '10px' }} />
                  <Line type="monotone" dataKey="ActualRecovery" name="Actual Recovered" stroke="#2563eb" strokeWidth={3} activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="PredictedRecovery" name="AI Projected" stroke="#64748b" strokeWidth={2} strokeDasharray="5 5" />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-xs font-mono text-slate-400 uppercase">
                Syncing projection vectors...
              </div>
            )}
          </div>
        </div>

        {/* Denial Stacked Bar Chart */}
        <div className="lg:col-span-5 border border-slate-200 bg-white p-5 md:p-6 flex flex-col justify-between min-h-[340px]">
          <div className="flex justify-between items-center pb-4 border-b border-slate-200 mb-4 shrink-0">
            <div>
              <h3 className="text-xs font-mono font-bold tracking-widest text-slate-800 uppercase">DENIAL CATEGORIES BY PAYER</h3>
              <span className="text-[10px] text-slate-500 font-mono">Normalized distribution index of coding vs auth issues</span>
            </div>
          </div>

          <div className="w-full h-[220px]">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockPayerHeatmap} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="category" stroke="#475569" fontSize={8} fontFamily="monospace" />
                  <YAxis stroke="#475569" fontSize={8} fontFamily="monospace" />
                  <Tooltip />
                  <Bar dataKey="BCBS" name="BCBS" stackId="a" fill="#2563eb" />
                  <Bar dataKey="UHC" name="UHC" stackId="a" fill="#3b82f6" />
                  <Bar dataKey="Medicare" name="Medicare" stackId="a" fill="#0f172a" />
                  <Bar dataKey="Aetna" name="Aetna" stackId="a" fill="#64748b" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-xs font-mono text-slate-400 uppercase">
                Formulating stacked distributions...
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Multi-Hospital Comparison Section */}
      <div className="border border-slate-200 bg-white p-5 md:p-6">
        <div className="flex justify-between items-center pb-4 border-b border-slate-200 mb-4">
          <div>
            <h3 className="text-xs font-mono font-bold tracking-widest text-slate-800 uppercase">PAYER BEHAVIOR ANALYSIS</h3>
            <span className="text-[10px] text-slate-500 font-mono">Comparative statistics on denial velocity and cycle recovery timeframes</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-[10px]">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 pb-2.5">
                <th className="py-2 font-bold uppercase tracking-wider">PAYER_NAME</th>
                <th className="py-2 font-bold uppercase tracking-wider text-center">DENIAL_RATE</th>
                <th className="py-2 font-bold uppercase tracking-wider text-center">APPEALS_WIN%</th>
                <th className="py-2 font-bold uppercase tracking-wider text-center">RECOVERY_VELOCITY</th>
                <th className="py-2 font-bold uppercase tracking-wider text-right">TOTAL_VOLUME_AUDITED</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {mockPayerMetrics.map((p, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 font-bold text-slate-900">{p.name}</td>
                  <td className="py-3 text-center text-blue-600 font-bold">{p.denialRate}%</td>
                  <td className="py-3 text-center text-emerald-600 font-bold">{p.appealWinRate}%</td>
                  <td className="py-3 text-center text-slate-800 font-bold">{p.recoveryDays} DAYS AVG</td>
                  <td className="py-3 text-right text-slate-900 font-bold">${p.totalVolume.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

