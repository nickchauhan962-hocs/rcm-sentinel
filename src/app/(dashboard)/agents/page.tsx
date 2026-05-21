'use client';

import React, { useState, useEffect } from 'react';
import { 
  Cpu, 
  Play, 
  Pause, 
  Activity, 
  FileText, 
  TrendingUp, 
  ShieldCheck, 
  MessageSquare,
  Sparkles,
  Zap,
  Terminal
} from 'lucide-react';
import { mockAIAgents, AIAgent } from '@/data/mockAgents';

export default function AIAgentsPage() {
  const [agents, setAgents] = useState<AIAgent[]>(mockAIAgents);
  const [selectedAgentId, setSelectedAgentId] = useState<string>(mockAIAgents[0].id);
  const [agentLogs, setAgentLogs] = useState<Record<string, string[]>>({});

  const activeAgent = agents.find(a => a.id === selectedAgentId) || agents[0];

  // Initialize and stream logs
  useEffect(() => {
    // Set initial logs from mock data
    const initialLogs: Record<string, string[]> = {};
    mockAIAgents.forEach(agent => {
      initialLogs[agent.id] = [...agent.logs];
    });
    setAgentLogs(initialLogs);

    // Stream random logs for active agents
    const interval = setInterval(() => {
      setAgents(prevAgents => {
        return prevAgents.map(agent => {
          if (agent.status !== 'active') return agent;
          
          // Randomly update system usage
          const usageChange = Math.floor(Math.random() * 5) - 2;
          const newUsage = Math.max(10, Math.min(95, agent.systemUsage + usageChange));
          
          // Append a new random log sometimes
          if (Math.random() > 0.4) {
            const randomLogTemplates = [
              `[INFO] Heartbeat verification status: OK.`,
              `[DB] Cache lookup completed in ${Math.floor(Math.random() * 4) + 1}ms.`,
              `[API] Gateway replication synchronizing state parameters.`,
              `[AGENT] Validating token indexes against clearinghouse schema...`,
              `[SEC] Security encryption handshake renewed (AES-256).`,
              `[INFO] Recalculating task prioritization factors.`
            ];
            const newLog = randomLogTemplates[Math.floor(Math.random() * randomLogTemplates.length)];
            const time = new Date().toLocaleTimeString();
            
            setAgentLogs(prevLogs => {
              const currentLogs = prevLogs[agent.id] || [];
              const updatedLogs = [...currentLogs, `[${time}] ${newLog}`];
              return {
                ...prevLogs,
                [agent.id]: updatedLogs.slice(-15) // Keep last 15
              };
            });
          }

          return {
            ...agent,
            systemUsage: newUsage
          };
        });
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const toggleAgentStatus = (id: string) => {
    setAgents(prev => prev.map(a => {
      if (a.id === id) {
        const isIdle = a.status === 'idle';
        return {
          ...a,
          status: isIdle ? 'active' as const : 'idle' as const,
          systemUsage: isIdle ? 40 : 0
        };
      }
      return a;
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-emerald-800 border-emerald-350 bg-emerald-50';
      case 'idle': return 'text-slate-500 border-slate-300 bg-slate-50';
      case 'error': return 'text-red-800 border-red-300 bg-red-50';
      default: return 'text-blue-800 border-blue-200 bg-blue-50';
    }
  };

  const getAgentIcon = (id: string) => {
    switch (id) {
      case 'AGT-RECOVERY': return <FileText size={18} />;
      case 'AGT-COMPLIANCE': return <ShieldCheck size={18} />;
      case 'AGT-PRIORAUTH': return <Zap size={18} />;
      case 'AGT-FORECAST': return <TrendingUp size={18} />;
      case 'AGT-PAYER': return <Activity size={18} />;
      default: return <Cpu size={18} />;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      
      {/* Left Column: List of 5 Autonomous Agents */}
      <div className="lg:col-span-4 flex flex-col gap-4">
        <div className="border border-slate-200 bg-white p-5 shrink-0">
          <h3 className="text-xs font-mono font-bold tracking-widest text-slate-800 uppercase pb-3 border-b-2 border-slate-900 mb-4">
            AGENT ORCHESTRATION LAYER
          </h3>
          
          <div className="space-y-3">
            {agents.map((agent) => {
              const isSelected = agent.id === selectedAgentId;
              
              return (
                <div 
                  key={agent.id}
                  onClick={() => setSelectedAgentId(agent.id)}
                  className={`p-3.5 border transition-all duration-200 cursor-pointer flex flex-col justify-between gap-3 ${
                    isSelected 
                      ? 'border-slate-900 bg-slate-50' 
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-9 h-9 border flex items-center justify-center shrink-0 ${
                        isSelected ? 'text-slate-900 border-slate-900 bg-white' : 'text-slate-400 border-slate-200 bg-slate-50'
                      }`}>
                        {getAgentIcon(agent.id)}
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-slate-900 truncate">{agent.name}</h4>
                        <span className="text-[8px] font-mono text-slate-500 tracking-wider uppercase block mt-0.5">{agent.role}</span>
                      </div>
                    </div>
                    <span className={`px-2 py-0.5 text-[8px] font-mono border font-extrabold uppercase shrink-0 ${getStatusColor(agent.status)}`}>
                      {agent.status}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[9px] font-mono border-t border-slate-100 pt-2 text-slate-400">
                    <span className="uppercase">COORDINATED PROCS: {agent.activeTasks.length}</span>
                    <span>CPU: {agent.systemUsage}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Global Agent Control Switch Panel */}
        <div className="border border-slate-200 bg-white p-5 text-[10px] font-mono text-slate-500 space-y-3">
          <span className="text-blue-600 font-bold block uppercase tracking-wider">GLOBAL_ORCHESTRATOR_CONFIG //</span>
          <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
            <span>Model Endpoint:</span>
            <span className="text-blue-600 font-bold uppercase">GPT-4o (Standard)</span>
          </div>
          <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
            <span>Max Parallel Agents:</span>
            <span className="text-slate-800 font-bold">8 Nodes</span>
          </div>
          <div className="flex justify-between items-center py-1.5">
            <span>Auto-Scaling Logs:</span>
            <span className="text-emerald-600 font-bold">ENABLED</span>
          </div>
        </div>
      </div>

      {/* Right Column: Detailed Agent Telemetry & Logs console */}
      <div className="lg:col-span-8 space-y-6">
        
        {/* Selected Agent Metrics card */}
        <div className="border border-slate-200 bg-white p-5 md:p-6 space-y-5">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-4">
            <div>
              <span className="text-[8px] font-mono text-slate-400 tracking-widest block uppercase font-bold">TELEMETRY DATA // NODE: {activeAgent.id}</span>
              <h3 className="text-lg font-black text-slate-900 mt-0.5 uppercase tracking-tight">{activeAgent.name}</h3>
            </div>
            
            {/* Toggle switch */}
            <button 
              onClick={() => toggleAgentStatus(activeAgent.id)}
              className={`py-2 px-4 font-mono text-xs font-bold border-2 transition-all flex items-center gap-2 cursor-pointer ${
                activeAgent.status === 'active' 
                  ? 'border-red-600 bg-white text-red-600 hover:bg-red-50' 
                  : 'border-slate-900 bg-slate-900 text-white hover:bg-slate-800'
              }`}
            >
              {activeAgent.status === 'active' ? (
                <>
                  <Pause size={12} />
                  <span>SUSPEND NODE</span>
                </>
              ) : (
                <>
                  <Play size={12} />
                  <span>INITIALIZE NODE</span>
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <div className="p-4 border border-slate-200 bg-slate-50 flex flex-col justify-between">
              <span className="text-[8px] font-mono text-slate-500 uppercase font-bold tracking-wider">SYSTEM RESOURCING</span>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-2xl font-black font-mono text-slate-900">{activeAgent.systemUsage}%</span>
                <span className="text-[9px] text-slate-400 uppercase font-bold">CPU allocation</span>
              </div>
              <div className="w-full bg-slate-200 h-1.5 overflow-hidden mt-3 border border-slate-300">
                <div 
                  className="h-full bg-blue-600 transition-all duration-500" 
                  style={{ width: `${activeAgent.systemUsage}%` }}
                ></div>
              </div>
            </div>

            <div className="p-4 border border-slate-200 bg-slate-50 flex flex-col justify-between">
              <span className="text-[8px] font-mono text-slate-500 uppercase font-bold tracking-wider">ACTIVE TASKS IN KAFKA</span>
              <span className="text-2xl font-black font-mono text-slate-900 mt-2">{activeAgent.activeTasks.length}</span>
              <span className="text-[9px] text-slate-500 mt-2 truncate font-mono">{activeAgent.activeTasks[0] || 'Idle'}</span>
            </div>

            <div className="p-4 border border-slate-200 bg-slate-50 flex flex-col justify-between">
              <span className="text-[8px] font-mono text-slate-500 uppercase font-bold tracking-wider">PREDICTIVE ANCHOR</span>
              <div className="flex items-center gap-1 text-emerald-600 mt-2 font-bold text-xs uppercase font-mono">
                <Sparkles size={14} className="shrink-0 text-emerald-600" />
                <span>AI Predictive Active</span>
              </div>
              <span className="text-[9px] text-slate-600 mt-2 line-clamp-2 leading-relaxed font-mono">{activeAgent.prediction}</span>
            </div>

          </div>

          {/* Decision Rationale */}
          <div className="p-4 border border-slate-200 bg-slate-50 space-y-2">
            <div className="flex items-center gap-2">
              <MessageSquare size={14} className="text-slate-600" />
              <span className="text-[9px] font-mono text-slate-500 uppercase font-bold tracking-wider">DECISION REASONING TREE</span>
            </div>
            <p className="text-[10px] font-mono text-slate-700 leading-relaxed bg-white p-3 border border-slate-200">
              {activeAgent.decisionExplanation}
            </p>
          </div>

        </div>

        {/* Live Logs console Terminal */}
        <div className="border border-slate-200 bg-white overflow-hidden flex flex-col h-80">
          <div className="bg-slate-50 border-b border-slate-200 px-4 py-2.5 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <Terminal size={14} className="text-slate-600" />
              <span className="text-xs font-mono font-bold text-slate-800 uppercase tracking-wider">NODE CONSOLE OUT // {activeAgent.id}</span>
            </div>
            <div className="flex gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
            </div>
          </div>

          <div className="flex-1 p-4 font-mono text-[9px] text-slate-600 overflow-y-auto space-y-1.5 select-text bg-slate-50">
            {(agentLogs[activeAgent.id] || []).length === 0 ? (
              <div className="text-slate-400 text-center py-10 uppercase">No diagnostic outputs registered for this node.</div>
            ) : (
              (agentLogs[activeAgent.id] || []).map((log, idx) => (
                <div key={idx} className="hover:bg-slate-200/50 px-1 py-0.5 transition-all">
                  <span className="text-slate-400 mr-2">[{activeAgent.id}]</span>
                  <span className={log.includes('Success') || log.includes('OK') ? 'text-emerald-700 font-bold' : log.includes('ALERT') ? 'text-amber-700 font-bold' : 'text-slate-850'}>
                    {log}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

    </div>
  );
}

