'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { 
  Upload, 
  Sparkles, 
  Check, 
  FileText, 
  HelpCircle, 
  AlertTriangle, 
  Send,
  RefreshCw,
  Search,
  CheckCircle,
  FileSpreadsheet
} from 'lucide-react';
import { mockClaims, Claim } from '@/data/claimsData';

function DeniedClaimsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const claimIdParam = searchParams.get('id');

  // Page States
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null);
  const [claimsList, setClaimsList] = useState<Claim[]>(mockClaims);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [ocrScanning, setOcrScanning] = useState(false);
  const [generatingAppeal, setGeneratingAppeal] = useState(false);
  const [appealText, setAppealText] = useState('');
  const [appealStreamed, setAppealStreamed] = useState(false);
  const [sendingAppeal, setSendingAppeal] = useState(false);
  const [actionSuccess, setActionSuccess] = useState('');
  
  // Interactive modification
  const [acceptedCorrections, setAcceptedCorrections] = useState<Record<string, boolean>>({});

  // File Input Ref
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load claim if URL parameter is present
  useEffect(() => {
    if (claimIdParam) {
      const found = claimsList.find(c => c.id === claimIdParam);
      if (found) {
        setSelectedClaim(found);
        setAppealText('');
        setAppealStreamed(false);
        setAcceptedCorrections({});
      }
    }
  }, [claimIdParam, claimsList]);

  // Simulate File Upload & OCR Extraction
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setUploadProgress(10);

    const uploadInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(uploadInterval);
          setIsUploading(false);
          triggerOcrScan();
          return 100;
        }
        return prev + 30;
      });
    }, 400);
  };

  const triggerOcrScan = () => {
    setOcrScanning(true);
    setTimeout(() => {
      // Create a newly scanned mock claim
      const newClaim: Claim = {
        id: `CLM-${Math.floor(1000 + Math.random() * 9000)}`,
        patientName: "Sophia Martinez",
        patientId: "PT-4821",
        date: new Date().toISOString().split('T')[0],
        payer: "Aetna",
        denialReason: "Lack of Prior Authorization (Code 197)",
        cptCode: "70450", // CT Scan Head
        icdCode: "G44.1", // Vascular headache
        chargeAmount: 1150.00,
        recoveryProbability: 76,
        status: "Denied",
        suggestedCorrections: [
          {
            field: "Prior Authorization Code",
            original: "None",
            corrected: "AUTH-AET-99081B",
            rationale: "Found pre-authorization approval matching CPT 70450 in neurology notes dated 05/10/2026."
          }
        ],
        appealLetterTemplate: `Dear Aetna Appeals,

We are appealing the denial of Claim ID: Sophia Martinez (Member: AET-8812) for services on ${new Date().toISOString().split('T')[0]}. The claim for CPT 70450 was denied for lack of prior auth.

We have located the valid pre-authorization code: AUTH-AET-99081B issued on 05/10/2026. Please reprocess this claim for full payment.

Sincerely,
Revenue Cycle Compliance Team`
      };

      setClaimsList(prev => [newClaim, ...prev]);
      setSelectedClaim(newClaim);
      setOcrScanning(false);
    }, 2000);
  };

  // Simulate appeal stream text typewriter effect
  const handleGenerateAppeal = () => {
    if (!selectedClaim) return;
    setGeneratingAppeal(true);
    setAppealText('');
    
    let index = 0;
    const fullText = selectedClaim.appealLetterTemplate;
    
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setAppealText(prev => prev + fullText.charAt(index));
        index += 2; // Stream double speed for fast UI demo
      } else {
        clearInterval(interval);
        setGeneratingAppeal(false);
        setAppealStreamed(true);
      }
    }, 15);
  };

  // Simulate sending appeal
  const handleTransmitAppeal = () => {
    if (!selectedClaim) return;
    setSendingAppeal(true);
    
    setTimeout(() => {
      setSendingAppeal(false);
      
      // Update local state database of claims
      setClaimsList(prev => 
        prev.map(c => 
          c.id === selectedClaim.id 
            ? { ...c, status: 'Appealing' as const } 
            : c
        )
      );
      setSelectedClaim(prev => prev ? { ...prev, status: 'Appealing' } : null);
      setActionSuccess(`Appeal transmitted successfully. EDI-275 reference ID: TX-${Math.floor(10000 + Math.random() * 90000)}`);
      
      // Clear notification after 4 seconds
      setTimeout(() => setActionSuccess(''), 4000);
    }, 1500);
  };

  const acceptCorrection = (idx: number) => {
    setAcceptedCorrections(prev => ({
      ...prev,
      [idx]: true
    }));
    
    // Dynamically update recovery probability to simulate AI learning
    if (selectedClaim && !acceptedCorrections[idx]) {
      setSelectedClaim(prev => {
        if (!prev) return null;
        return {
          ...prev,
          recoveryProbability: Math.min(99, prev.recoveryProbability + 10)
        };
      });
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Title Section */}
      <div className="flex justify-between items-center pb-4 border-b-2 border-slate-900">
        <div>
          <span className="text-[9px] font-mono text-slate-500 tracking-widest uppercase font-bold">MVP MODULE // CLAIMS INGESTION</span>
          <h2 className="text-xl font-black text-slate-900 mt-1 uppercase tracking-tight">Denied Claims Recovery</h2>
        </div>
        {selectedClaim && (
          <button 
            onClick={() => { setSelectedClaim(null); router.push('/claims'); }}
            className="py-1.5 px-3 border-2 border-slate-900 bg-white text-xs font-mono font-bold text-slate-900 hover:bg-slate-100 transition-all cursor-pointer"
          >
            ← BACK_TO_QUEUE
          </button>
        )}
      </div>

      {actionSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-800 font-mono text-xs flex items-center gap-2.5">
          <CheckCircle size={16} className="text-emerald-600" />
          <span>{actionSuccess}</span>
        </div>
      )}

      {/* Main Layout Toggle */}
      {!selectedClaim ? (
        // LIST & UPLOAD STATE
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left: Drag and Drop OCR Uploader */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="border border-slate-200 bg-slate-50 p-6 flex flex-col justify-center items-center text-center min-h-[300px] relative group">
              
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileUpload} 
                className="hidden" 
                accept=".pdf,.png,.jpg,.jpeg"
              />

              {isUploading ? (
                <div className="space-y-4 w-full">
                  <RefreshCw size={36} className="text-blue-600 animate-spin mx-auto" />
                  <div>
                    <h3 className="text-xs font-bold font-mono text-slate-900">UPLOADING CLAIM FILE</h3>
                    <span className="text-[10px] text-slate-500 font-mono">{uploadProgress}% COMPLETE</span>
                  </div>
                  <div className="w-48 bg-slate-200 h-1.5 overflow-hidden mx-auto border border-slate-300">
                    <div className="h-full bg-blue-600 transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
                  </div>
                </div>
              ) : ocrScanning ? (
                <div className="space-y-4 w-full relative px-4">
                  {/* Glowing Laser Scan Bar */}
                  <div className="absolute left-0 top-[20%] w-full h-[2px] bg-blue-600 animate-bounce"></div>
                  
                  <FileText size={36} className="text-slate-800 mx-auto animate-pulse" />
                  <div>
                    <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-blue-600">OCR DOCUMENT EXTRACTION</h3>
                    <span className="text-[9px] text-slate-500 font-mono block mt-1">ALIGNING CPT/ICD DICTIONARIES...</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-none border border-slate-300 bg-white flex items-center justify-center text-slate-400 group-hover:text-blue-600 group-hover:border-blue-600 transition-all duration-200 mx-auto">
                    <Upload size={20} />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold font-mono text-slate-800 uppercase tracking-wider">Upload Claim Document</h3>
                    <p className="text-[10px] text-slate-500 max-w-xs mt-1.5 leading-normal">
                      Ingest 837 claim structures, EOB sheets, or PDF medical records for vision scanning.
                    </p>
                  </div>
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="py-2 px-4 font-mono text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 border-2 border-slate-900 transition-all cursor-pointer"
                  >
                    SELECT_FILE
                  </button>
                  <span className="text-[9px] font-mono text-slate-400 block">PDF, JPG, PNG (Max 15MB)</span>
                </div>
              )}
            </div>

            {/* Platform instructions helper */}
            <div className="border border-slate-200 bg-white p-5 text-[10px] font-mono text-slate-500 space-y-2">
              <span className="text-blue-600 font-bold block uppercase tracking-wider">PLATFORM_CAPABILITY //</span>
              <p>1. Ingest document via OCR scanner.</p>
              <p>2. Review CPT modifiers & NCCI rule alignments.</p>
              <p>3. Apply AI coding correction suggestions.</p>
              <p>4. Dynamic appeal generation stream & submit.</p>
            </div>
          </div>

          {/* Right: Claims Table Queue */}
          <div className="lg:col-span-8 border border-slate-200 bg-white p-5 md:p-6">
            <div className="flex justify-between items-center pb-4 border-b border-slate-200 mb-4">
              <h3 className="text-xs font-mono font-bold tracking-widest text-slate-800 uppercase">AUDIT QUEUE</h3>
              <span className="text-[9px] font-mono text-slate-500">AWAITING REVIEW: {claimsList.filter(c => c.status === 'Denied').length}</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-[10px]">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 pb-2">
                    <th className="py-2.5 font-bold uppercase tracking-wider">CLAIM_ID</th>
                    <th className="py-2.5 font-bold uppercase tracking-wider">PATIENT</th>
                    <th className="py-2.5 font-bold uppercase tracking-wider">PAYER</th>
                    <th className="py-2.5 font-bold uppercase tracking-wider">DENIAL_REASON</th>
                    <th className="py-2.5 font-bold uppercase tracking-wider text-right">CHARGE</th>
                    <th className="py-2.5 font-bold uppercase tracking-wider text-center">AI_WIN%</th>
                    <th className="py-2.5 font-bold uppercase tracking-wider text-center">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {claimsList.map((claim) => (
                    <tr key={claim.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 font-bold text-slate-900">{claim.id}</td>
                      <td className="py-3 text-slate-700">{claim.patientName}</td>
                      <td className="py-3 text-slate-600">{claim.payer}</td>
                      <td className="py-3 text-slate-500 truncate max-w-[180px]" title={claim.denialReason}>{claim.denialReason}</td>
                      <td className="py-3 text-right text-slate-700 font-bold">${claim.chargeAmount.toFixed(2)}</td>
                      <td className="py-3 text-center">
                        <span className={`font-bold ${
                          claim.recoveryProbability >= 85 ? 'text-emerald-600' : 'text-blue-600'
                        }`}>{claim.recoveryProbability}%</span>
                      </td>
                      <td className="py-3 text-center">
                        <button 
                          onClick={() => setSelectedClaim(claim)}
                          className="py-1 px-2.5 border border-slate-200 bg-white hover:bg-slate-900 hover:text-white transition-all text-[9px] font-bold text-slate-700 flex items-center gap-1 mx-auto cursor-pointer"
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

        </div>
      ) : (
        // CLAIM DETAILS & APPEAL GENERATOR ACTIVE STATE
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Claim Analytics & ICD Code Fixes */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Header summary panel */}
            <div className="border border-slate-200 bg-white p-5 space-y-4">
              <div className="flex justify-between items-start pb-3 border-b border-slate-200">
                <div>
                  <span className="text-[8px] font-mono text-slate-400 uppercase tracking-widest">CLAIM ID: {selectedClaim.id}</span>
                  <h3 className="text-base font-extrabold text-slate-900 mt-0.5">{selectedClaim.patientName}</h3>
                </div>
                <div className="text-right">
                  <span className="text-[8px] font-mono text-slate-400 block tracking-widest uppercase">RECOVERY ESTIMATE</span>
                  <span className="text-md font-bold text-blue-600 font-mono">
                    ${(selectedClaim.chargeAmount * (selectedClaim.recoveryProbability / 100)).toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-[10px] font-mono">
                <div>
                  <span className="text-slate-400 block uppercase">PAYER</span>
                  <span className="text-slate-800 font-bold">{selectedClaim.payer}</span>
                </div>
                <div>
                  <span className="text-slate-400 block uppercase">CPT / ICD CODES</span>
                  <span className="text-slate-800 font-bold">{selectedClaim.cptCode} / {selectedClaim.icdCode}</span>
                </div>
                <div>
                  <span className="text-slate-400 block uppercase">CHARGE TOTAL</span>
                  <span className="text-slate-800 font-bold">${selectedClaim.chargeAmount.toFixed(2)}</span>
                </div>
              </div>

              <div className="p-3.5 bg-red-50 border border-red-200 flex items-start gap-2.5">
                <AlertTriangle className="text-red-600 shrink-0 mt-0.5" size={14} />
                <div className="text-[10px] font-mono">
                  <span className="text-red-700 font-bold block uppercase tracking-wider">DENIAL REASON DETECTED:</span>
                  <p className="text-slate-650 mt-1">{selectedClaim.denialReason}</p>
                </div>
              </div>
            </div>

            {/* AI Suggested Corrections panel */}
            <div className="border border-slate-200 bg-white p-5">
              <div className="flex justify-between items-center pb-3 border-b border-slate-200 mb-4">
                <div className="flex items-center gap-2">
                  <Sparkles size={14} className="text-blue-600" />
                  <h3 className="text-xs font-mono font-bold tracking-widest text-slate-800 uppercase">AI RECODING SUGGESTIONS</h3>
                </div>
                <span className="text-[9px] font-mono text-blue-600 font-bold">ACCURACY GAIN: +10% WIN PROB</span>
              </div>

              <div className="space-y-4">
                {selectedClaim.suggestedCorrections.length === 0 ? (
                  <p className="text-[10px] font-mono text-slate-400 text-center py-4">No recoding adjustments necessary. Generate appeal draft directly.</p>
                ) : (
                  selectedClaim.suggestedCorrections.map((corr, idx) => {
                    const isAccepted = acceptedCorrections[idx];
                    return (
                      <div 
                        key={idx} 
                        className={`p-4 border transition-all duration-300 ${
                          isAccepted 
                            ? 'border-emerald-250 bg-emerald-50/50' 
                            : 'border-slate-200 bg-slate-50'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <span className="text-[9px] font-mono font-bold text-slate-400 uppercase">{corr.field}</span>
                          {isAccepted ? (
                            <span className="px-2 py-0.5 bg-emerald-100 border border-emerald-200 text-[8px] font-mono text-emerald-800 font-bold uppercase tracking-wider">
                              RE-MAPPED
                            </span>
                          ) : (
                            <button 
                              onClick={() => acceptCorrection(idx)}
                              className="py-1 px-2.5 border border-slate-350 bg-white hover:bg-slate-900 hover:text-white hover:border-slate-900 text-[8px] font-mono text-slate-700 transition-all font-bold cursor-pointer"
                            >
                              ACCEPT SUGGESTION
                            </button>
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-4 my-3 text-[10px] font-mono">
                          <div className="p-2 bg-white border border-slate-200">
                            <span className="text-slate-400 block text-[8px] uppercase font-bold">ORIGINAL DATA</span>
                            <span className="text-slate-500 line-through mt-0.5 block">{corr.original}</span>
                          </div>
                          <div className="p-2 bg-white border border-slate-200">
                            <span className="text-blue-600 block text-[8px] uppercase font-bold">CORRECTED VALUE</span>
                            <span className="text-slate-800 mt-0.5 block font-bold">{corr.corrected}</span>
                          </div>
                        </div>

                        <p className="text-[10px] font-mono text-slate-650 leading-normal bg-white p-2 border border-slate-200">
                          <span className="text-slate-500 font-bold block mb-1">RATIONALE //</span>
                          {corr.rationale}
                        </p>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

          </div>

          {/* Right Column: AI Appeal Letter Generator Stream */}
          <div className="lg:col-span-6">
            <div className="border border-slate-200 bg-white p-5 md:p-6 flex flex-col h-full min-h-[480px]">
              
              <div className="flex justify-between items-center pb-4 border-b border-slate-200 mb-4 shrink-0">
                <div className="flex items-center gap-2">
                  <FileText size={14} className="text-slate-700" />
                  <h3 className="text-xs font-mono font-bold tracking-widest text-slate-800 uppercase">APPEAL PACK COMPILER</h3>
                </div>
                <div className="flex items-center gap-2 text-[9px] font-mono">
                  <span className="text-slate-400 uppercase font-bold">PROBABILITY SCORE:</span>
                  <span className="font-bold text-emerald-600">{selectedClaim.recoveryProbability}%</span>
                </div>
              </div>

              {/* Appeal Draft Workspace Area */}
              <div className="flex-1 border border-slate-200 bg-slate-50 p-4 font-mono text-[10px] text-slate-750 overflow-y-auto leading-relaxed select-text min-h-[280px]">
                {generatingAppeal ? (
                  <div className="whitespace-pre-wrap text-slate-800">
                    {appealText}
                    <span className="w-1.5 h-3 inline-block bg-slate-900 animate-pulse ml-0.5"></span>
                  </div>
                ) : appealText ? (
                  <div className="whitespace-pre-wrap text-slate-800">{appealText}</div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 gap-3 px-6 select-none">
                    <Sparkles size={24} className="text-slate-300" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-700 uppercase">Awaiting Draft Compilation</h4>
                      <p className="text-[10px] text-slate-550 mt-1 max-w-xs leading-normal">
                        Review suggested recoding mappings on the left, then trigger the AI compiler to write a formal LCD-aligned appeal draft.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Dynamic Action Buttons */}
              <div className="mt-4 pt-4 border-t border-slate-200 flex gap-3 shrink-0">
                {!appealStreamed ? (
                  <button 
                    onClick={handleGenerateAppeal}
                    disabled={generatingAppeal}
                    className="flex-1 py-3 px-4 font-mono text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 border border-slate-900 transition-all flex items-center justify-center gap-2 disabled:opacity-40 cursor-pointer"
                  >
                    <Sparkles size={14} className={generatingAppeal ? 'animate-spin' : ''} />
                    <span>{generatingAppeal ? 'COMPILING LEGAL ARGUMENTS...' : 'COMPILE APPEAL DRAFT'}</span>
                  </button>
                ) : (
                  <>
                    <button 
                      onClick={handleGenerateAppeal}
                      className="py-3 px-4 border border-slate-200 bg-white hover:bg-slate-50 font-mono text-xs text-slate-655 transition-all flex items-center gap-2 cursor-pointer"
                      title="Re-compile Draft"
                    >
                      <RefreshCw size={14} />
                    </button>
                    <button 
                      onClick={handleTransmitAppeal}
                      disabled={sendingAppeal || selectedClaim.status === 'Appealing'}
                      className="flex-1 py-3 px-4 font-mono text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 border border-blue-600 transition-all flex items-center justify-center gap-2 disabled:opacity-40 cursor-pointer"
                    >
                      <Send size={14} className={sendingAppeal ? 'animate-ping' : ''} />
                      <span>{sendingAppeal ? 'TRANSMITTING VIA EDI-275...' : selectedClaim.status === 'Appealing' ? 'APPEAL SUBMITTED' : 'TRANSMIT TO PAYER GATEWAY'}</span>
                    </button>
                  </>
                )}
              </div>

            </div>
          </div>

        </div>
      )}

    </div>
  );
}

export default function DeniedClaimsPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="font-mono text-[10px] text-slate-550 uppercase tracking-widest">Loading claims engine workspace...</p>
        </div>
      </div>
    }>
      <DeniedClaimsContent />
    </Suspense>
  );
}

