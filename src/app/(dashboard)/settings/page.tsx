'use client';

import React, { useState } from 'react';
import { ShieldCheck, Database, Key, CheckCircle, RefreshCw } from 'lucide-react';

export default function SettingsPage() {
  // FHIR Settings
  const [fhirEndpoint, setFhirEndpoint] = useState('https://fhir.rcm-sentinel.internal/v4');
  const [fhirPort, setFhirPort] = useState('8443');
  
  // HIPAA Compliance States
  const [hipaaAutoLogOut, setHipaaAutoLogOut] = useState(true);
  const [hipaaLogOutTime, setHipaaLogOutTime] = useState('15');
  const [aesKeyRotation, setAesKeyRotation] = useState('90');

  // AI settings
  const [openAiKey, setOpenAiKey] = useState('sk-proj-••••••••••••••••••••••••••••••••331A');
  const [vectorEndpoint, setVectorEndpoint] = useState('https://pinecone.us-east-1.gcp.pinecone.io/indexes/rcm-sentinel-v1');

  // Success indicator
  const [successMsg, setSuccessMsg] = useState('');
  const [testingConnection, setTestingConnection] = useState(false);

  const saveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg('System configuration variables synchronized with local PostgreSQL nodes.');
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  const testFhirConnection = () => {
    setTestingConnection(true);
    setTimeout(() => {
      setTestingConnection(false);
      setSuccessMsg('FHIR/HL7 V4 Gateway handshake verified successfully. Latency: 9ms.');
      setTimeout(() => setSuccessMsg(''), 4000);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div className="flex justify-between items-center pb-4 border-b border-slate-200">
        <div>
          <span className="text-[9px] font-mono text-slate-500 tracking-widest uppercase">SYSTEM CONTROL PANEL //</span>
          <h2 className="text-xl font-bold font-mono tracking-tight text-slate-900 mt-1">SETTINGS & CONFIGURATIONS</h2>
        </div>
      </div>

      {successMsg && (
        <div className="p-4 rounded bg-emerald-50 border border-emerald-200 text-emerald-800 font-mono text-xs flex items-center gap-2.5 shadow-sm">
          <CheckCircle size={16} />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Settings Grid */}
      <form onSubmit={saveSettings} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: HIPAA Compliance & FHIR Gateway */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* HIPAA Settings Card */}
          <div className="bg-white border border-slate-200 rounded p-5 md:p-6 space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-200 mb-2">
              <ShieldCheck size={16} className="text-emerald-600" />
              <h3 className="text-xs font-mono font-bold tracking-widest text-slate-500 uppercase">HIPAA AUDITING & COMPLIANCE</h3>
            </div>

            <div className="space-y-4 text-xs font-mono text-slate-700">
              
              <label className="flex items-center justify-between cursor-pointer py-1.5 border-b border-slate-100 text-slate-800">
                <span>Secure Automatic Log-out</span>
                <input 
                  type="checkbox" 
                  checked={hipaaAutoLogOut}
                  onChange={(e) => setHipaaAutoLogOut(e.target.checked)}
                  className="rounded border-slate-350 text-blue-600 focus:ring-0 w-4 h-4 cursor-pointer" 
                />
              </label>

              <div>
                <label className="block text-[9px] text-slate-400 uppercase mb-1.5 font-bold">Inactivity Session Timeout (minutes)</label>
                <input 
                  type="number" 
                  value={hipaaLogOutTime}
                  onChange={(e) => setHipaaLogOutTime(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded py-2 px-3 text-xs text-slate-800 outline-none transition-all disabled:bg-slate-150 disabled:text-slate-400 disabled:border-slate-200"
                  disabled={!hipaaAutoLogOut}
                />
              </div>

              <div>
                <label className="block text-[9px] text-slate-400 uppercase mb-1.5 font-bold">AES Encryption Key Rotation Period (days)</label>
                <select 
                  value={aesKeyRotation}
                  onChange={(e) => setAesKeyRotation(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded py-2 px-3 text-xs text-slate-800 outline-none transition-all cursor-pointer"
                >
                  <option value="30">Every 30 Days (Military-grade)</option>
                  <option value="90">Every 90 Days (Recommended)</option>
                  <option value="180">Every 180 Days</option>
                </select>
              </div>

            </div>
          </div>

          {/* FHIR Gateway Settings Card */}
          <div className="bg-white border border-slate-200 rounded p-5 md:p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-2">
              <div className="flex items-center gap-2">
                <Database size={16} className="text-blue-600" />
                <h3 className="text-xs font-mono font-bold tracking-widest text-slate-500 uppercase">FHIR & HL7 INTERFACE GATEWAY</h3>
              </div>
              <button 
                type="button"
                onClick={testFhirConnection}
                disabled={testingConnection}
                className="py-1 px-2.5 rounded bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-[8px] font-mono font-bold text-slate-700 hover:text-blue-700 transition-all flex items-center gap-1.5 disabled:opacity-40 cursor-pointer"
              >
                <RefreshCw size={8} className={testingConnection ? 'animate-spin' : ''} />
                <span>TEST_GATEWAY</span>
              </button>
            </div>

            <div className="space-y-4 text-xs font-mono text-slate-700">
              
              <div>
                <label className="block text-[9px] text-slate-400 uppercase mb-1.5 font-bold">EHR Integration Server Endpoint (HTTPS/FHIR V4)</label>
                <input 
                  type="text" 
                  value={fhirEndpoint}
                  onChange={(e) => setFhirEndpoint(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded py-2 px-3 text-xs text-slate-800 outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-[9px] text-slate-400 uppercase mb-1.5 font-bold">Gateway port</label>
                <input 
                  type="text" 
                  value={fhirPort}
                  onChange={(e) => setFhirPort(e.target.value.replace(/\D/g, ''))}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded py-2 px-3 text-xs text-slate-800 outline-none transition-all"
                  required
                />
              </div>

            </div>
          </div>

        </div>

        {/* Right Column: AI Model Credentials & Submit */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* AI Credentials Card */}
          <div className="bg-white border border-slate-200 rounded p-5 md:p-6 space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-200 mb-2">
              <Key size={16} className="text-slate-800" />
              <h3 className="text-xs font-mono font-bold tracking-widest text-slate-500 uppercase">AI ENGINE CREDENTIALS</h3>
            </div>

            <div className="space-y-4 text-xs font-mono text-slate-700">
              
              <div>
                <label className="block text-[9px] text-slate-400 uppercase mb-1.5 font-bold">OpenAI API Connection Key (RAG/NLP Appeals)</label>
                <input 
                  type="text" 
                  value={openAiKey}
                  onChange={(e) => setOpenAiKey(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded py-2 px-3 text-xs text-slate-800 outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-[9px] text-slate-400 uppercase mb-1.5 font-bold">Vector Database Cluster URI (Pinecone/PGVector)</label>
                <input 
                  type="text" 
                  value={vectorEndpoint}
                  onChange={(e) => setVectorEndpoint(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded py-2 px-3 text-xs text-slate-800 outline-none transition-all"
                  required
                />
              </div>

            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-4">
            <button 
              type="reset" 
              className="flex-1 py-3 px-4 rounded border border-slate-200 bg-slate-50 hover:bg-slate-100 font-mono text-xs font-bold text-slate-600 transition-all text-center cursor-pointer"
            >
              RESET_CHANGES
            </button>
            <button 
              type="submit"
              className="flex-1 py-3 px-4 rounded border border-blue-700 bg-blue-600 hover:bg-blue-700 font-mono text-xs font-bold text-white transition-all duration-300 cursor-pointer"
            >
              SAVE_AND_SYNC_OS
            </button>
          </div>

        </div>

      </form>

    </div>
  );
}
