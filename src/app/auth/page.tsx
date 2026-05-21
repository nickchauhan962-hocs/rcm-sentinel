'use client';

import React, { useState } from 'react';
import { ShieldAlert, KeyRound, Fingerprint, Lock, ShieldCheck, Activity } from 'lucide-react';
import { useRouter as useNextRouter } from 'next/navigation';

export default function AuthPage() {
  const router = useNextRouter();
  const [username, setUsername] = useState('admin@sentinel.ai');
  const [password, setPassword] = useState('••••••••••••');
  const [status, setStatus] = useState<'idle' | 'decrypting' | 'authorized'>('idle');
  const [securityLogs, setSecurityLogs] = useState<string[]>([]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('decrypting');
    setSecurityLogs([
      '[SEC] Querying directory service...',
      '[SEC] Verifying SSL/TLS cryptographic handshakes...',
    ]);

    setTimeout(() => {
      setSecurityLogs(prev => [
        ...prev,
        '[SEC] NPI security authorization signature matches.',
        '[SEC] Decrypting user session parameters...'
      ]);
    }, 800);

    setTimeout(() => {
      setSecurityLogs(prev => [
        ...prev,
        '[SEC] Active Session: Dr. Niket Chauhan (OK)',
        '[SEC] Redirecting to Sentinel Core...'
      ]);
      setStatus('authorized');
    }, 1800);

    setTimeout(() => {
      router.push('/dashboard');
    }, 2400);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center relative overflow-hidden swiss-grid px-6">
      
      <div className="w-full max-w-sm relative z-20">
        
        {/* Top Logo and Tag */}
        <div className="flex flex-col items-center mb-8 text-center select-none">
          <div className="w-9 h-9 rounded bg-slate-900 flex items-center justify-center mb-3">
            <span className="font-extrabold text-white text-sm">S</span>
          </div>
          <h1 className="text-sm font-bold tracking-wider font-mono text-slate-900">RCM SENTINEL AI</h1>
          <span className="text-[8px] font-mono text-slate-400 tracking-widest font-bold uppercase mt-0.5">SECURE AUTHENTICATION DESK</span>
        </div>

        {/* Login Card */}
        <div className="swiss-panel border border-slate-200 rounded-lg p-8 relative overflow-hidden bg-white shadow-sm">
          <div className="absolute top-0 left-0 w-full h-[3px] bg-slate-900"></div>

          {status === 'idle' ? (
            <form onSubmit={handleLogin} className="space-y-5">
              
              <div>
                <label className="block text-[8px] font-mono font-bold text-slate-500 tracking-widest uppercase mb-1.5">ENTERPRISE EMAIL / NPI</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Fingerprint size={14} />
                  </div>
                  <input 
                    type="text" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 rounded py-2 pl-9 pr-4 text-xs font-mono text-slate-800 outline-none transition-all placeholder-slate-400"
                    placeholder="NPI identifier or Email"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[8px] font-mono font-bold text-slate-500 tracking-widest uppercase mb-1.5">SESSION PIN / DECRYPTION KEY</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <KeyRound size={14} />
                  </div>
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 rounded py-2 pl-9 pr-4 text-xs font-mono text-slate-800 outline-none transition-all placeholder-slate-400"
                    placeholder="Enter credentials passcode"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-[9px] font-mono font-bold text-slate-500 select-none">
                <label className="flex items-center gap-1.5 cursor-pointer hover:text-slate-800">
                  <input type="checkbox" className="rounded border-slate-350 bg-slate-50 text-slate-900 focus:ring-0" defaultChecked />
                  <span>Remember Session</span>
                </label>
                <a href="#" className="hover:text-slate-900 transition-colors">Decrypter Reset</a>
              </div>

              <button 
                type="submit"
                className="w-full py-3 rounded font-mono text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <Lock size={12} />
                <span>VERIFY CREDENTIALS</span>
              </button>

            </form>
          ) : (
            // Cryptographic status logs
            <div className="space-y-6 flex flex-col justify-center min-h-[220px]">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-9 h-9 rounded bg-slate-100 border border-slate-200 flex items-center justify-center text-blue-600">
                    {status === 'authorized' ? (
                      <ShieldCheck size={18} className="text-emerald-600" />
                    ) : (
                      <Activity size={18} className="animate-spin text-blue-600" />
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-950">
                    {status === 'authorized' ? 'Access Granted' : 'Verification Running'}
                  </h3>
                  <span className="text-[8px] font-mono text-slate-400 tracking-wider font-bold">SECURITY SHIELD: ACTIVE</span>
                </div>
              </div>

              {/* Console log window */}
              <div className="bg-slate-50 border border-slate-200 rounded p-4 font-mono text-[9px] text-slate-500 space-y-1.5">
                {securityLogs.map((log, idx) => (
                  <div 
                    key={idx}
                    className={
                      log.includes('Active Session') 
                        ? 'text-emerald-700 font-bold' 
                        : log.includes('AUTHORIZED') || log.includes('signature matches')
                          ? 'text-blue-700 font-bold'
                          : 'text-slate-600'
                    }
                  >
                    {log}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Security tags */}
        <div className="mt-8 text-center text-[8px] font-mono font-bold text-slate-400 flex justify-center items-center gap-4 select-none">
          <span className="flex items-center gap-1">
            <ShieldAlert size={10} />
            <span>FIPS-140-3 COMPLIANT</span>
          </span>
          <span>•</span>
          <span>AES-256 SESSION LOCK</span>
        </div>

      </div>
    </div>
  );
}
