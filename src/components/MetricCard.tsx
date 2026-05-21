import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtext: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  icon: React.ReactNode;
  variant?: 'cyan' | 'purple' | 'green' | 'yellow';
}

export default function MetricCard({ 
  title, 
  value, 
  subtext, 
  trend, 
  icon, 
  variant = 'cyan' 
}: MetricCardProps) {
  
  const borderClass = {
    cyan: 'border-blue-200 bg-blue-50/20 hover:border-blue-300',
    purple: 'border-slate-300 bg-slate-50/50 hover:border-slate-400',
    green: 'border-emerald-200 bg-emerald-50/20 hover:border-emerald-300',
    yellow: 'border-amber-200 bg-amber-50/20 hover:border-amber-300',
  }[variant];

  const valueColor = {
    cyan: 'text-blue-600',
    purple: 'text-slate-900',
    green: 'text-emerald-600',
    yellow: 'text-amber-600',
  }[variant];

  const barColor = {
    cyan: 'bg-blue-500',
    purple: 'bg-slate-800',
    green: 'bg-emerald-500',
    yellow: 'bg-amber-500',
  }[variant];

  return (
    <div className={`swiss-panel border rounded-lg p-5 transition-all duration-300 group flex flex-col justify-between h-full relative overflow-hidden ${borderClass}`}>
      {/* Top Swiss layout bar indicator */}
      <div className={`absolute top-0 left-0 w-full h-[3px] ${barColor}`}></div>

      <div className="flex items-start justify-between">
        <div>
          <span className="text-[10px] font-mono font-bold text-slate-500 tracking-wider uppercase">{title}</span>
          <h3 className={`text-2xl md:text-3xl font-extrabold font-mono tracking-tight mt-2 ${valueColor}`}>
            {value}
          </h3>
        </div>
        <div className={`p-2 rounded bg-slate-50 border border-slate-200 text-slate-700 transition-transform duration-300 group-hover:scale-105`}>
          {icon}
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
        <span className="text-[11px] text-slate-500 font-medium leading-none">{subtext}</span>
        {trend && (
          <div className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-mono font-bold ${
            trend.isPositive 
              ? 'text-emerald-700 bg-emerald-50 border border-emerald-100' 
              : 'text-red-700 bg-red-50 border border-red-100'
          }`}>
            {trend.isPositive ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
            <span>{trend.isPositive ? '+' : ''}{trend.value}%</span>
          </div>
        )}
      </div>
    </div>
  );
}
