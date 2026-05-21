'use client';

import React, { useState } from 'react';
import { Bell, AlertTriangle, CheckCircle } from 'lucide-react';

interface SystemNotification {
  id: string;
  timestamp: string;
  severity: 'CRITICAL' | 'WARNING' | 'INFO';
  module: string;
  message: string;
  isRead: boolean;
}

const mockNotifications: SystemNotification[] = [
  {
    id: "NTF-901",
    timestamp: "2026-05-21 17:01:45",
    severity: "CRITICAL",
    module: "PAYER_GATEWAY",
    message: "UnitedHealthcare API response latency rose above 3,200ms. Queued claims delaying transmission.",
    isRead: false
  },
  {
    id: "NTF-902",
    timestamp: "2026-05-21 16:45:11",
    severity: "INFO",
    module: "CLAIM_RECOVERY",
    message: "Coordinated Claim Recovery Agent compiled appeal package CLM-9082. Transmitted to UnitedHealthcare.",
    isRead: false
  },
  {
    id: "NTF-903",
    timestamp: "2026-05-21 15:32:04",
    severity: "WARNING",
    module: "COMPLIANCE_NCCI",
    message: "CPT 93000 mapping mismatch detected on Claim CLM-8841. Code modification recommended.",
    isRead: false
  },
  {
    id: "NTF-904",
    timestamp: "2026-05-20 11:22:45",
    severity: "INFO",
    module: "COMPLIANCE_NCCI",
    message: "Claim CLM-8552 updated with CPT modifier -27. Claim status updated to RECOVERED ($1,450.00).",
    isRead: true
  },
  {
    id: "NTF-905",
    timestamp: "2026-05-20 09:12:18",
    severity: "WARNING",
    module: "PRIOR_AUTH",
    message: "Aetna prior auth request latency exceeds average benchmark by 1.8 days for scheduled CPT 27447.",
    isRead: true
  }
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<SystemNotification[]>(mockNotifications);
  const [activeTab, setActiveTab] = useState<'ALL' | 'CRITICAL' | 'WARNING' | 'INFO'>('ALL');

  const filteredNotifications = notifications.filter(n => {
    if (activeTab === 'ALL') return true;
    return n.severity === activeTab;
  });

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const getSeverityBadge = (sev: SystemNotification['severity']) => {
    switch (sev) {
      case 'CRITICAL':
        return 'text-red-700 bg-red-50 border-red-200 font-bold';
      case 'WARNING':
        return 'text-amber-700 bg-amber-50 border-amber-200 font-bold';
      case 'INFO':
        return 'text-blue-700 bg-blue-50 border-blue-200 font-bold';
      default:
        return 'text-slate-650 bg-slate-50 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <span className="text-[9px] font-mono text-slate-500 tracking-widest uppercase">REAL-TIME TELEMETRY ALERTS //</span>
          <h2 className="text-xl font-bold font-mono tracking-tight text-slate-900 mt-1">CRITICAL ALERTS DESK</h2>
        </div>

        <button 
          onClick={markAllRead}
          className="self-start sm:self-auto py-2 px-3 rounded border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-mono font-bold text-slate-700 flex items-center gap-2 transition-all cursor-pointer"
        >
          <CheckCircle size={12} />
          <span>MARK_ALL_READ</span>
        </button>
      </div>

      {/* Main Alerts Center */}
      <div className="bg-white border border-slate-200 rounded p-5 md:p-6 space-y-5">
        
        {/* Navigation Tabs */}
        <div className="flex gap-2 text-[10px] font-mono border-b border-slate-200 pb-4 flex-wrap">
          <button 
            onClick={() => setActiveTab('ALL')}
            className={`px-3 py-1.5 rounded border transition-all cursor-pointer ${
              activeTab === 'ALL' ? 'border-blue-200 text-blue-700 bg-blue-50/50 font-bold' : 'border-slate-200 text-slate-500 bg-slate-50 hover:bg-slate-100/50'
            }`}
          >
            ALL_ALERTS ({notifications.length})
          </button>
          <button 
            onClick={() => setActiveTab('CRITICAL')}
            className={`px-3 py-1.5 rounded border transition-all cursor-pointer ${
              activeTab === 'CRITICAL' ? 'border-red-200 text-red-700 bg-red-50/50 font-bold' : 'border-slate-200 text-slate-500 bg-slate-50 hover:bg-slate-100/50'
            }`}
          >
            CRITICAL ({notifications.filter(n => n.severity === 'CRITICAL').length})
          </button>
          <button 
            onClick={() => setActiveTab('WARNING')}
            className={`px-3 py-1.5 rounded border transition-all cursor-pointer ${
              activeTab === 'WARNING' ? 'border-amber-200 text-amber-700 bg-amber-50/50 font-bold' : 'border-slate-200 text-slate-500 bg-slate-50 hover:bg-slate-100/50'
            }`}
          >
            WARNINGS ({notifications.filter(n => n.severity === 'WARNING').length})
          </button>
          <button 
            onClick={() => setActiveTab('INFO')}
            className={`px-3 py-1.5 rounded border transition-all cursor-pointer ${
              activeTab === 'INFO' ? 'border-blue-200 text-blue-700 bg-blue-50/50 font-bold' : 'border-slate-200 text-slate-500 bg-slate-50 hover:bg-slate-100/50'
            }`}
          >
            INFRASTRUCTURE ({notifications.filter(n => n.severity === 'INFO').length})
          </button>
        </div>

        {/* Alerts Stack */}
        <div className="space-y-3">
          {filteredNotifications.length === 0 ? (
            <div className="py-12 text-center text-slate-400 font-mono text-[10px]">No active telemetry alerts recorded. System health nominal.</div>
          ) : (
            filteredNotifications.map((notif) => (
              <div 
                key={notif.id}
                className={`p-4 rounded border transition-all duration-150 flex items-start gap-4 ${
                  notif.isRead 
                    ? 'border-slate-200/60 bg-slate-50/30 opacity-60' 
                    : 'border-slate-200 bg-white'
                }`}
              >
                <div className={`p-2 rounded bg-slate-50 border border-slate-200 ${
                  notif.severity === 'CRITICAL' ? 'text-red-600' : notif.severity === 'WARNING' ? 'text-amber-600' : 'text-blue-600'
                }`}>
                  {notif.severity === 'CRITICAL' ? <AlertTriangle size={16} /> : <Bell size={16} />}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-mono text-slate-400">{notif.timestamp}</span>
                      <span className="text-[9px] font-mono text-slate-300">•</span>
                      <span className="text-[9px] font-mono text-slate-500 font-bold">{notif.module}</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[8px] font-extrabold border uppercase ${getSeverityBadge(notif.severity)}`}>
                      {notif.severity}
                    </span>
                  </div>
                  <p className="text-xs font-mono text-slate-700 mt-2 leading-relaxed select-text">{notif.message}</p>
                </div>
              </div>
            ))
          )}
        </div>

      </div>

    </div>
  );
}
