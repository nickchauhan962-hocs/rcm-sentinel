'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  FileText, 
  Cpu, 
  BarChart3, 
  TrendingUp, 
  Users, 
  Bell, 
  Settings, 
  LogOut, 
  ShieldCheck, 
  Activity, 
  Database,
  Menu,
  X
} from 'lucide-react';

interface SidebarLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ href, icon, label, isActive }) => {
  return (
    <Link 
      href={href}
      className={`flex items-center gap-3 px-4 py-3 rounded border transition-all duration-200 group ${
        isActive 
          ? 'bg-blue-50/50 text-blue-700 border-blue-200/60 font-bold' 
          : 'text-slate-600 border-transparent hover:text-slate-900 hover:bg-slate-50 hover:border-slate-100'
      }`}
    >
      <span className={`transition-transform duration-200 ${
        isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-700'
      }`}>
        {icon}
      </span>
      <span className="text-xs font-mono uppercase tracking-wider">{label}</span>
      {isActive && (
        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600"></span>
      )}
    </Link>
  );
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [latency, setLatency] = useState(9);
  const [aiLoad, setAiLoad] = useState(28);

  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(prev => Math.max(6, Math.min(15, prev + (Math.random() > 0.5 ? 1 : -1))));
      setAiLoad(prev => Math.max(20, Math.min(45, prev + Math.floor(Math.random() * 5) - 2)));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { href: '/dashboard', icon: <LayoutDashboard size={16} />, label: 'Command Center' },
    { href: '/claims', icon: <FileText size={16} />, label: 'Claims Engine' },
    { href: '/agents', icon: <Cpu size={16} />, label: 'AI Agent Room' },
    { href: '/analytics', icon: <BarChart3 size={16} />, label: 'Analytics' },
    { href: '/revenue', icon: <TrendingUp size={16} />, label: 'Audits Desk' },
    { href: '/providers', icon: <Users size={16} />, label: 'Provider Hub' },
    { href: '/notifications', icon: <Bell size={16} />, label: 'Alert Boards' },
    { href: '/settings', icon: <Settings size={16} />, label: 'System Desk' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex relative overflow-hidden">
      {/* Background Swiss Grid */}
      <div className="absolute inset-0 swiss-grid pointer-events-none z-0"></div>

      {/* Mobile Sidebar Toggle */}
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 right-4 z-50 p-2 rounded bg-white border border-slate-200 text-slate-700 md:hidden hover:bg-slate-50 cursor-pointer"
      >
        {isSidebarOpen ? <X size={18} /> : <Menu size={18} />}
      </button>

      {/* Left Sidebar */}
      <aside 
        className={`w-64 border-r border-slate-200 bg-white flex flex-col z-40 transition-all duration-300 fixed md:static h-screen shrink-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0 md:w-20'
        }`}
      >
        {/* Brand Logo */}
        <div className="h-16 border-b border-slate-200 flex items-center px-6 gap-3 shrink-0">
          <div className="relative">
            <div className="w-8 h-8 rounded bg-slate-900 flex items-center justify-center">
              <span className="font-extrabold text-white text-xs">S</span>
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white"></span>
          </div>
          {isSidebarOpen && (
            <div className="flex flex-col">
              <span className="font-black text-xs tracking-wider text-slate-900">RCM SENTINEL</span>
              <span className="text-[8px] font-mono text-blue-600 tracking-widest font-extrabold">SYSTEM DESK</span>
            </div>
          )}
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3 py-6 flex flex-col gap-1 overflow-y-auto">
          {navLinks.map((link) => (
            <SidebarLink 
              key={link.href}
              href={link.href}
              icon={link.icon}
              label={isSidebarOpen ? link.label : ''}
              isActive={pathname === link.href}
            />
          ))}
        </nav>

        {/* User Profile Panel & Log Out */}
        <div className="p-4 border-t border-slate-200 bg-white shrink-0">
          {isSidebarOpen ? (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-800 text-sm">
                  NC
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold text-slate-900 truncate">Dr. Niket Chauhan</span>
                  <span className="text-[8px] text-slate-500 font-mono tracking-wider">CHIEF REVENUE OFFICER</span>
                </div>
              </div>
              <button 
                onClick={() => router.push('/')}
                className="w-full py-2 px-3 flex items-center justify-center gap-2 rounded border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-mono font-bold text-red-600 transition-all cursor-pointer"
              >
                <LogOut size={12} />
                <span>TERMINATE SESSION</span>
              </button>
            </div>
          ) : (
            <button 
              onClick={() => router.push('/')}
              className="w-12 h-12 flex items-center justify-center rounded border border-slate-200 bg-slate-50 text-red-600 hover:bg-slate-100 transition-all cursor-pointer"
              title="Terminate Session"
            >
              <LogOut size={14} />
            </button>
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 z-10 relative overflow-y-auto h-screen">
        {/* Top Header Widget Bar */}
        <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-6 shrink-0 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <h1 className="text-xs font-bold tracking-wider font-mono flex items-center gap-2">
              <span className="text-slate-400">SENTINEL_SYS//</span>
              <span className="text-blue-600 uppercase">
                {navLinks.find(l => l.href === pathname)?.label || 'System Desk'}
              </span>
            </h1>
          </div>

          {/* Diagnostic Stats */}
          <div className="hidden lg:flex items-center gap-3 text-[9px] font-mono font-bold text-slate-600">
            {/* HIPAA Ready */}
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded border border-emerald-100 bg-emerald-50/50 text-emerald-700">
              <ShieldCheck size={11} />
              <span>HIPAA: SECURED</span>
            </div>

            {/* FHIR Gateway */}
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded border border-blue-100 bg-blue-50/50 text-blue-700">
              <Activity size={11} />
              <span>FHIR: {latency}ms</span>
            </div>

            {/* Kafka Nodes */}
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded border border-slate-200 bg-slate-50 text-slate-800">
              <Database size={11} />
              <span>KAFKA: 3/3</span>
            </div>

            {/* AI Load */}
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded border border-slate-200 bg-slate-50">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
              <span>ORCHESTRATOR: {aiLoad}%</span>
            </div>
          </div>

          {/* Session status indicator */}
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-mono font-bold text-slate-400 hidden sm:inline">SYS_VER: v2.8.1</span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 p-6 md:p-8 bg-white relative">
          {children}
        </main>
      </div>
    </div>
  );
}
