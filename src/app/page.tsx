'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  Activity, 
  Cpu, 
  ChevronRight, 
  FileCheck,
  Search,
  Check,
  Lock,
  ArrowRight
} from 'lucide-react';

export default function LandingPage() {
  const router = useRouter();
  const [recoveredCounter, setRecoveredCounter] = useState(4258190);
  const [activeWorkflowStep, setActiveWorkflowStep] = useState(0);
  const [billingInterval, setBillingInterval] = useState<'monthly' | 'annual'>('annual');

  // Rolling counter increment
  useEffect(() => {
    const interval = setInterval(() => {
      setRecoveredCounter(prev => prev + Math.floor(Math.random() * 180) + 20);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  const trustLogos = [
    { name: "Apex Health Network", text: "APEX HEALTH" },
    { name: "Trinity Medical Group", text: "TRINITY MEDIC" },
    { name: "Ascent Care", text: "ASCENT CARE" },
    { name: "Vanguard Health", text: "VANGUARD OS" },
    { name: "Mercy Alliance", text: "MERCY ALLIANCE" }
  ];

  const roiMetrics = [
    { label: "DSO REDUCTION", value: "28.4%", sub: "Days Sales Outstanding drop" },
    { label: "APPEALS WIN PROBABILITY", value: "84.2%", sub: "First-attempt appeal success" },
    { label: "RECOVERY RATIO", value: "+32%", sub: "Net recovered cash increase" },
    { label: "AUDIT RATE SPEED", value: "0.4s", sub: "NCCI audit check per claim" }
  ];

  const workflowSteps = [
    {
      title: "Autonomic Ingestion",
      desc: "Sentinel integrates via HL7/FHIR or directly scrapes clearinghouse interfaces to ingest denied claims in micro-seconds.",
      icon: <Activity className="text-blue-600" size={20} />,
      badge: "KAFKA INGEST"
    },
    {
      title: "OCR & Document Parsing",
      desc: "Our vision-language models run laser OCR scans on clinical document attachments, extracting clinical justification arguments automatically.",
      icon: <Search className="text-slate-800" size={20} />,
      badge: "VLM OCR"
    },
    {
      title: "CPT & ICD Code Validation",
      desc: "Compliance agents audit medical codes against 5,000+ national insurance exclusion databases to pinpoint code mismatches and edit omissions.",
      icon: <FileCheck className="text-emerald-600" size={20} />,
      badge: "NCCI ENGINE"
    },
    {
      title: "Appeal Generation & Submit",
      desc: "The Recovery Agent writes dynamic appeal letters citing Local Coverage Determinations (LCDs) and files them directly to payer portals.",
      icon: <Cpu className="text-amber-600" size={20} />,
      badge: "AGENT OUTBOX"
    }
  ];

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 relative overflow-hidden swiss-grid">
      
      {/* Navigation Header */}
      <header className="relative z-30 max-w-7xl mx-auto px-6 h-20 flex items-center justify-between border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded bg-slate-900 flex items-center justify-center">
            <span className="font-extrabold text-white text-sm">S</span>
          </div>
          <div className="flex flex-col">
            <span className="font-black text-xs tracking-wider text-slate-900">RCM SENTINEL</span>
            <span className="text-[8px] font-mono text-blue-600 tracking-widest font-extrabold">SYSTEM DESK</span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-[10px] font-mono font-bold text-slate-500">
          <a href="#roi" className="hover:text-blue-600 transition-colors">ROI_METRICS</a>
          <a href="#workflow" className="hover:text-blue-600 transition-colors">AI_WORKFLOW</a>
          <a href="#pricing" className="hover:text-blue-600 transition-colors">PRICING_PLANS</a>
          <div className="h-4 w-px bg-slate-200"></div>
          <div className="flex items-center gap-1.5 text-emerald-600">
            <ShieldCheck size={14} />
            <span>HIPAA_READY</span>
          </div>
        </nav>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.push('/auth')}
            className="text-[10px] font-mono font-bold text-slate-500 hover:text-slate-900 px-3 py-2 transition-colors cursor-pointer"
          >
            SYS_LOGIN
          </button>
          <button 
            onClick={() => router.push('/auth')}
            className="text-xs font-mono font-bold text-white bg-slate-900 hover:bg-slate-800 px-4 py-2 rounded transition-all flex items-center gap-2 group cursor-pointer"
          >
            <span>LAUNCH_TERMINAL</span>
            <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-20 max-w-7xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 flex flex-col items-center text-center">
        
        {/* Top Mini Tag */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-blue-200 bg-blue-50 text-[9px] font-mono font-bold tracking-wider text-blue-700 mb-8"
        >
          <span>AUTONOMOUS HEALTHCARE REVENUE SYSTEM</span>
        </motion.div>

        {/* Hero Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight max-w-5xl leading-[1.05] mb-6 text-slate-950 font-sans"
        >
          Autonomous Recovery for <br className="hidden sm:inline" />
          <span className="text-blue-600">Denied Healthcare Claims</span>
        </motion.h1>

        {/* Hero Description */}
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-slate-500 text-sm sm:text-base md:text-lg max-w-2xl font-medium leading-relaxed mb-10"
        >
          Stop revenue leakage automatically. RCM Sentinel AI deploys coordinated autonomous agents to ingest claims, parse patient medical files, rectify billing errors, and transmit winning appeals.
        </motion.p>

        {/* Recovered Revenue Live Counter */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="swiss-panel border border-slate-200 rounded-lg p-6 md:p-8 max-w-xl w-full mb-12 shadow-sm relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-[3px] bg-blue-600"></div>
          <span className="text-[9px] font-mono font-bold text-slate-400 tracking-widest uppercase block mb-2">RECOVERED REVENUE IN PRODUCTION (LIVE)</span>
          <h2 className="text-3xl sm:text-5xl font-black font-mono text-slate-950 tracking-tight">
            {formatCurrency(recoveredCounter)}
          </h2>
          <div className="flex items-center justify-center gap-2 mt-4 text-[10px] text-slate-500 font-mono font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Auditing 24/7/365 across 12 EHR hospital integrations</span>
          </div>
        </motion.div>

        {/* CTA Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md"
        >
          <button 
            onClick={() => router.push('/auth')}
            className="w-full sm:w-auto px-8 py-3 rounded font-mono text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>LAUNCH SENTINEL OS</span>
            <ChevronRight size={14} />
          </button>
          <a 
            href="#workflow"
            className="w-full sm:w-auto px-8 py-3 rounded font-mono text-xs font-bold border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 transition-all text-center cursor-pointer"
          >
            SEE_HOW_IT_WORKS
          </a>
        </motion.div>
      </section>

      {/* Dashboard Graphic Mockup */}
      <section className="relative z-20 max-w-6xl mx-auto px-6 mb-24 md:mb-28">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="swiss-panel border border-slate-200 rounded-lg p-3 bg-white shadow-sm relative overflow-hidden"
        >
          {/* Top bezel controls */}
          <div className="flex items-center gap-2 px-3 pb-3 border-b border-slate-100 mb-3 select-none">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-200"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-slate-200"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-slate-200"></span>
            <span className="text-[9px] font-mono font-bold text-slate-400 ml-4">SENTINEL_INTERFACE_TERMINAL_V2.0</span>
          </div>
          
          {/* Mockup layout */}
          <div className="aspect-[16/9] w-full rounded bg-slate-50 overflow-hidden relative border border-slate-200 flex flex-col justify-between p-4">
            
            {/* Top row */}
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <div className="w-24 h-5 rounded bg-slate-200/60 border border-slate-200"></div>
                <div className="w-16 h-5 rounded bg-slate-200/60 border border-slate-200"></div>
              </div>
              <div className="w-28 h-5 rounded bg-slate-200/60 border border-slate-200"></div>
            </div>

            {/* Middle complex grid */}
            <div className="grid grid-cols-12 gap-3 my-2 flex-1">
              {/* Left chart card */}
              <div className="col-span-8 rounded border border-slate-200 bg-white p-3 flex flex-col justify-between">
                <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                  <span className="text-[8px] font-mono font-bold text-slate-400">REVENUE_RECOVERY_FORECAST</span>
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-600"></div>
                </div>
                <div className="flex-1 flex items-end gap-2 pt-4">
                  {[35, 45, 60, 48, 70, 85, 95, 110, 130].map((h, i) => (
                    <div 
                      key={i} 
                      className={`flex-1 rounded-t transition-all duration-500 ${
                        i > 5 ? 'bg-slate-900' : 'bg-blue-600'
                      }`}
                      style={{ height: `${h}%` }}
                    ></div>
                  ))}
                </div>
              </div>

              {/* Right agent cards */}
              <div className="col-span-4 flex flex-col gap-2">
                {[
                  { name: "Recovery Agent", usage: 78, col: "text-blue-600 border-blue-100" },
                  { name: "Compliance Agent", usage: 54, col: "text-slate-800 border-slate-200" },
                  { name: "Forecast Agent", usage: 12, col: "text-slate-400 border-slate-100" },
                ].map((a, i) => (
                  <div key={i} className={`flex-1 rounded border bg-white p-3 flex flex-col justify-between ${a.col}`}>
                    <div className="flex justify-between items-center text-[8px] font-mono font-bold">
                      <span>{a.name}</span>
                      <span>{a.usage}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded overflow-hidden mt-1.5 border border-slate-200/50">
                      <div 
                        className={`h-full ${i === 0 ? 'bg-blue-600' : 'bg-slate-900'}`}
                        style={{ width: `${a.usage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom logs stream */}
            <div className="h-14 rounded border border-slate-200 bg-white p-2 font-mono text-[7px] text-slate-400 flex flex-col justify-between select-none">
              <div>[08:12:44] INGESTION: Read 12 claims files from EPIC API gateway (OK)</div>
              <div>[08:12:45] COMPLIANCE: Mismatch corrected on CLM-8841 CPT mapping (SUCCESS)</div>
              <div className="text-blue-600 font-bold">[08:12:46] RECOVERY: Generated appeal draft for UnitedHealthcare ($1,845.00)</div>
            </div>

          </div>
        </motion.div>
      </section>

      {/* Enterprise Trust Section */}
      <section className="relative z-20 max-w-7xl mx-auto px-6 pb-20 border-b border-slate-200">
        <p className="text-center text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-8">INTEGRATES WITH ENTERPRISE MEDICAL SYSTEM GATEWAYS</p>
        <div className="flex flex-wrap justify-center items-center gap-12 sm:gap-20 opacity-60">
          {trustLogos.map((l, i) => (
            <span key={i} className="text-xs font-mono font-bold tracking-widest text-slate-800">{l.text}</span>
          ))}
        </div>
      </section>

      {/* ROI Metrics Section */}
      <section id="roi" className="relative z-20 max-w-7xl mx-auto px-6 py-20 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center mb-16">
          <div className="lg:col-span-1">
            <span className="text-[9px] font-mono font-bold text-blue-600 tracking-wider uppercase">CAPITAL RECOUPMENT PIPELINE</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-3 mb-6 text-slate-950 font-sans">
              Typographic precision that drives visual audit clarity.
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-medium">
              We audit historical trends and deploy continuous agent loops that identify underpaid claims, solve complex codings, and recover revenue with clinical-grade accuracy.
            </p>
          </div>
          <div className="lg:col-span-2 grid grid-cols-2 gap-4 sm:gap-6">
            {roiMetrics.map((m, i) => (
              <div key={i} className="swiss-panel border border-slate-200 rounded-lg p-6 hover:border-slate-300 transition-colors">
                <span className="text-[9px] font-mono font-bold text-slate-450 text-slate-400 tracking-wider block">{m.label}</span>
                <h3 className="text-2xl sm:text-4xl font-black font-mono text-slate-900 mt-2 mb-1">{m.value}</h3>
                <span className="text-xs text-slate-500 font-semibold">{m.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Workflow section */}
      <section id="workflow" className="relative z-20 max-w-7xl mx-auto px-6 py-20 border-t border-slate-200 bg-slate-50/50">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[9px] font-mono font-bold text-slate-900 tracking-wider uppercase">HOW THE SYSTEM MONITOR WORKS</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-3 text-slate-950 font-sans">
            Autonomous claim auditing pipeline.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Navigation vertical list */}
          <div className="lg:col-span-4 flex flex-col gap-3 justify-center">
            {workflowSteps.map((step, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveWorkflowStep(idx)}
                className={`text-left p-4 rounded border transition-all duration-200 flex items-center gap-4 cursor-pointer ${
                  activeWorkflowStep === idx 
                    ? 'border-slate-350 bg-white text-slate-900 font-bold shadow-sm' 
                    : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                }`}
              >
                <div className={`p-2 rounded bg-slate-100 border border-slate-200 ${activeWorkflowStep === idx ? 'text-blue-600' : 'text-slate-500'}`}>
                  {step.icon}
                </div>
                <div>
                  <span className="text-[9px] font-mono font-bold text-slate-450 text-slate-400 block">{step.badge}</span>
                  <span className="text-xs font-mono uppercase tracking-wider">{step.title}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Detailed step panel display */}
          <div className="lg:col-span-8 swiss-panel border border-slate-200 rounded-lg p-8 flex flex-col justify-between bg-white relative overflow-hidden">
            <div>
              <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-[8px] font-mono font-bold text-slate-800">
                PIPELINE STAGE 0{activeWorkflowStep + 1}
              </span>
              <h3 className="text-xl font-bold font-mono text-slate-950 mt-4 mb-4 uppercase">
                {workflowSteps[activeWorkflowStep].title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed max-w-xl font-medium">
                {workflowSteps[activeWorkflowStep].desc}
              </p>
            </div>

            <div className="mt-8 pt-8 border-t border-slate-100 flex justify-between items-center">
              <span className="text-[9px] font-mono font-bold text-slate-400">Autonomous loop latency: &lt; 0.5s</span>
              <button 
                onClick={() => router.push('/auth')} 
                className="text-xs font-mono font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span>View Compliance Logs</span>
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative z-20 max-w-7xl mx-auto px-6 py-20 md:py-24 bg-white">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[9px] font-mono font-bold text-blue-600 tracking-wider uppercase">FLEXIBLE PLANS</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-3 mb-6 text-slate-950 font-sans">
            Transparent scaling for medical centers.
          </h2>

          {/* Toggle */}
          <div className="inline-flex items-center gap-1.5 p-1 rounded bg-slate-100 border border-slate-200 select-none">
            <button 
              onClick={() => setBillingInterval('monthly')}
              className={`px-3 py-1.5 rounded text-[10px] font-mono font-bold transition-all cursor-pointer ${
                billingInterval === 'monthly' ? 'bg-white text-slate-950 shadow-sm' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              MONTHLY
            </button>
            <button 
              onClick={() => setBillingInterval('annual')}
              className={`px-3 py-1.5 rounded text-[10px] font-mono font-bold transition-all cursor-pointer ${
                billingInterval === 'annual' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              ANNUAL (SAVE 15%)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Plan 1 */}
          <div className="swiss-panel border border-slate-200 rounded-lg p-8 flex flex-col justify-between bg-white">
            <div>
              <span className="text-[9px] font-mono font-bold text-slate-400 tracking-wider block">PLAN_BASE</span>
              <h3 className="text-base font-bold font-mono text-slate-900 mt-1">Regional Clinic</h3>
              <p className="text-xs text-slate-500 mt-2">Perfect for single outpatient facilities.</p>
              
              <div className="mt-6 mb-6">
                <span className="text-3xl font-black font-mono text-slate-950">
                  {billingInterval === 'annual' ? '$1,450' : '$1,700'}
                </span>
                <span className="text-xs text-slate-450 font-mono"> / month</span>
              </div>

              <ul className="space-y-3 text-xs text-slate-650 text-slate-600 border-t border-slate-100 pt-6 font-medium">
                <li className="flex items-center gap-2.5">
                  <Check size={12} className="text-blue-600" />
                  <span>Up to 1,500 claims audited/month</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={12} className="text-blue-600" />
                  <span>Prior Auth automation</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={12} className="text-blue-600" />
                  <span>Standard appeal templates</span>
                </li>
                <li className="flex items-center gap-2.5 text-slate-350">
                  <Lock size={10} />
                  <span>Dedicated compliance officer</span>
                </li>
              </ul>
            </div>
            <button 
              onClick={() => router.push('/auth')}
              className="w-full py-2.5 rounded border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-mono font-bold text-slate-700 transition-all mt-8 cursor-pointer"
            >
              PROCEED_REGISTRATION
            </button>
          </div>

          {/* Plan 2 - Recommended */}
          <div className="swiss-panel border-2 border-slate-900 rounded-lg p-8 flex flex-col justify-between bg-white relative shadow-sm">
            <div className="absolute top-[-10px] right-6 px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[8px] font-mono text-white font-bold tracking-widest uppercase">
              RECOMMENDED
            </div>
            <div>
              <span className="text-[9px] font-mono font-bold text-blue-600 tracking-wider block">PLAN_GROWTH</span>
              <h3 className="text-base font-bold font-mono text-slate-900 mt-1">Multi-Hospital Enterprise</h3>
              <p className="text-xs text-slate-500 mt-2">Complete autonomous cycle for health groups.</p>
              
              <div className="mt-6 mb-6">
                <span className="text-3xl font-black font-mono text-blue-600">
                  {billingInterval === 'annual' ? '$4,200' : '$4,950'}
                </span>
                <span className="text-xs text-slate-450 font-mono"> / month</span>
              </div>

              <ul className="space-y-3 text-xs text-slate-600 border-t border-slate-100 pt-6 font-medium">
                <li className="flex items-center gap-2.5">
                  <Check size={12} className="text-blue-600" />
                  <span>Up to 10,000 claims audited/month</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={12} className="text-blue-600" />
                  <span>All 5 AI Autonomous Agents active</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={12} className="text-blue-600" />
                  <span>Continuous RAG-based OCR parser</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={12} className="text-blue-600" />
                  <span>HL7/FHIR secure live connection</span>
                </li>
              </ul>
            </div>
            <button 
              onClick={() => router.push('/auth')}
              className="w-full py-2.5 rounded font-mono text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all mt-8 cursor-pointer"
            >
              PROCEED_REGISTRATION
            </button>
          </div>

          {/* Plan 3 */}
          <div className="swiss-panel border border-slate-200 rounded-lg p-8 flex flex-col justify-between bg-white">
            <div>
              <span className="text-[9px] font-mono font-bold text-slate-400 tracking-wider block">PLAN_CUSTOM</span>
              <h3 className="text-base font-bold font-mono text-slate-900 mt-1">Sovereign System</h3>
              <p className="text-xs text-slate-500 mt-2">Bespoke local integrations and private LLM nodes.</p>
              
              <div className="mt-6 mb-6">
                <span className="text-2xl font-black font-mono text-slate-950">Custom Tier</span>
                <span className="text-xs text-slate-450 font-mono"> (Contact Sales)</span>
              </div>

              <ul className="space-y-3 text-xs text-slate-650 text-slate-600 border-t border-slate-100 pt-6 font-medium">
                <li className="flex items-center gap-2.5">
                  <Check size={12} className="text-blue-600" />
                  <span>Unlimited claims auditing</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={12} className="text-blue-600" />
                  <span>On-prem / private cloud deployment</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={12} className="text-blue-600" />
                  <span>Custom fine-tuned coding models</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check size={12} className="text-blue-600" />
                  <span>SLA: 99.99% network availability</span>
                </li>
              </ul>
            </div>
            <button 
              onClick={() => router.push('/auth')}
              className="w-full py-2.5 rounded border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-mono font-bold text-slate-700 transition-all mt-8 cursor-pointer"
            >
              CONTACT_INTEGRATIONS
            </button>
          </div>

        </div>
      </section>

      {/* CTA Footer Section */}
      <section className="relative z-20 max-w-5xl mx-auto px-6 py-20 text-center border-t border-slate-200 mb-20 bg-white">
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-4 text-slate-950 font-sans">
          Ready to reclaim lost capital?
        </h2>
        <p className="text-slate-500 text-xs sm:text-sm max-w-xl mx-auto mb-8 font-mono font-bold">
          Boot Sentinel OS in audit mode to scan historical records for retro-authorization possibilities.
        </p>
        <button 
          onClick={() => router.push('/auth')}
          className="px-8 py-3 rounded font-mono text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 transition-all flex items-center gap-2 mx-auto cursor-pointer"
        >
          <span>SYS_BOOT_INITIALIZATION</span>
          <ChevronRight size={14} />
        </button>
      </section>

      {/* Standard Footer */}
      <footer className="relative z-10 max-w-7xl mx-auto px-6 py-8 border-t border-slate-200 text-center text-[9px] font-mono font-bold text-slate-400 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 bg-white">
        <span>© 2026 RCM SENTINEL INC. SOVEREIGN HEALTH SYSTEM.</span>
        <span>HIPAA COMPLIANT | HL7 & FHIR V4 GATEWAY READY</span>
      </footer>
    </div>
  );
}
