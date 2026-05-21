'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Play, Pause } from 'lucide-react';

interface StreamLog {
  timestamp: string;
  topic: 'ingestion' | 'compliance' | 'recovery' | 'gateway';
  message: string;
  meta: string;
}

const SAMPLE_LOGS: Omit<StreamLog, 'timestamp'>[] = [
  { topic: 'ingestion', message: 'Ingesting claim batch CLM-B22-09', meta: 'Source: EMR_EPIC_v14' },
  { topic: 'compliance', message: 'Validating CPT 99214 for Marcus Vance', meta: 'Ruleset: NCCI_EDITS_Q2' },
  { topic: 'ingestion', message: 'Received claim CLM-9082: UnitedHealthcare', meta: 'Charge: $1,845.00' },
  { topic: 'compliance', message: 'Rule check: No billing exclusions violated', meta: 'Status: PASS' },
  { topic: 'recovery', message: 'Triggered OCR scan on diagnostic PDF', meta: 'Patient: Elena Rostova' },
  { topic: 'compliance', message: 'Mismatch: CPT 93000 linked to ICD-10 J45.909', meta: 'Error Code: CPT-ERR-11' },
  { topic: 'recovery', message: 'Retro-authorization token found: AUTH-UHC-88192A', meta: 'Confidence: 94.6%' },
  { topic: 'gateway', message: 'Transmission scheduled: EDI-837 gateway', meta: 'Target: UnitedHealthcare' },
  { topic: 'recovery', message: 'Appeal auto-drafted using Denial Template V3', meta: 'Agent: AGT-RECOVERY' },
  { topic: 'gateway', message: 'EDI-835 received: payment update CLM-8552', meta: 'Status: PAID ($1,450.00)' },
  { topic: 'compliance', message: 'Audit completed on Patient Robert Chen', meta: 'Passed Compliance Check' },
  { topic: 'ingestion', message: 'Received claim CLM-8390: UnitedHealthcare', meta: 'Charge: $3,980.00' },
  { topic: 'recovery', message: 'Bilateral modifier -50 suggested for 19301', meta: 'Action Required' },
  { topic: 'gateway', message: 'Appeal submitted: EDI-275 documentation gateway', meta: 'Payer: Medicare' }
];

export default function LiveKafkaStream() {
  const [logs, setLogs] = useState<StreamLog[]>([]);
  const [isLive, setIsLive] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initialLogs: StreamLog[] = [];
    const now = new Date();
    for (let i = 0; i < 8; i++) {
      const logTime = new Date(now.getTime() - (8 - i) * 6000);
      const sample = SAMPLE_LOGS[i % SAMPLE_LOGS.length];
      initialLogs.push({
        timestamp: logTime.toLocaleTimeString(),
        ...sample
      });
    }
    setLogs(initialLogs);
  }, []);

  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      const now = new Date();
      const randomSample = SAMPLE_LOGS[Math.floor(Math.random() * SAMPLE_LOGS.length)];
      
      setLogs(prev => {
        const newLogs = [...prev, {
          timestamp: now.toLocaleTimeString(),
          ...randomSample
        }];
        return newLogs.slice(-15);
      });
    }, 4500);

    return () => clearInterval(interval);
  }, [isLive]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [logs]);

  const getTopicStyle = (topic: StreamLog['topic']) => {
    switch (topic) {
      case 'ingestion': return 'text-blue-700 bg-blue-50 border-blue-100';
      case 'compliance': return 'text-slate-700 bg-slate-150 bg-slate-100 border-slate-200';
      case 'recovery': return 'text-amber-700 bg-amber-50 border-amber-100';
      case 'gateway': return 'text-emerald-700 bg-emerald-50 border-emerald-100';
      default: return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  return (
    <div className="swiss-panel border border-slate-200 bg-white rounded-lg overflow-hidden flex flex-col h-80">
      {/* Stream Header */}
      <div className="bg-slate-50 border-b border-slate-200 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal size={14} className="text-slate-500" />
          <span className="text-xs font-mono font-bold text-slate-800">KAFKA_STREAM_MONITOR [node-01]</span>
          <span className="flex h-2 w-2 relative">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isLive ? 'bg-blue-400' : 'bg-slate-400'}`}></span>
            <span className={`relative inline-flex rounded-full h-2 w-2 ${isLive ? 'bg-blue-600' : 'bg-slate-400'}`}></span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsLive(!isLive)}
            className="px-2 py-1 rounded bg-white hover:bg-slate-50 border border-slate-200 text-[10px] font-mono font-bold text-slate-700 flex items-center gap-1.5 transition-all cursor-pointer"
          >
            {isLive ? (
              <>
                <Pause size={10} />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play size={10} />
                <span>Resume</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Stream Logs */}
      <div 
        ref={containerRef}
        className="flex-1 p-4 font-mono text-[10px] overflow-y-auto space-y-2 select-text text-slate-800 bg-white"
      >
        {logs.length === 0 ? (
          <div className="flex items-center justify-center h-full text-slate-400">
            Awaiting broker initialization...
          </div>
        ) : (
          logs.map((log, index) => (
            <div 
              key={index}
              className="flex flex-col sm:flex-row sm:items-center justify-between py-1.5 border-b border-slate-100 hover:bg-slate-50 px-1 rounded transition-colors"
            >
              <div className="flex items-start sm:items-center gap-2">
                <span className="text-slate-400 font-bold text-[9px]">{log.timestamp}</span>
                <span className={`px-1.5 py-0.5 rounded border uppercase text-[8px] font-bold tracking-wider ${getTopicStyle(log.topic)}`}>
                  {log.topic}
                </span>
                <span className="text-slate-800 font-medium">{log.message}</span>
              </div>
              <div className="text-slate-500 text-[9px] mt-0.5 sm:mt-0 font-mono text-right">
                {log.meta}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Stream Footer */}
      <div className="bg-slate-50 border-t border-slate-200 px-4 py-2 flex items-center justify-between text-[9px] font-mono font-bold text-slate-500">
        <span>Partitions: 4</span>
        <span>Lag: 0 ms</span>
        <span>Throughput: ~18 events/sec</span>
      </div>
    </div>
  );
}
