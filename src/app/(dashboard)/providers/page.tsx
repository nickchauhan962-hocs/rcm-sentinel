'use client';

import React, { useState } from 'react';
import { Users, Search, Plus, Activity, Award } from 'lucide-react';

interface Provider {
  npi: string;
  name: string;
  specialty: string;
  department: string;
  denialRate: number;
  recoveryVolume: number;
  connectedEhr: string;
  status: 'ACTIVE' | 'AUDIT_SUSPENDED' | 'DISCONNECTED';
}

const mockProviders: Provider[] = [
  {
    npi: "1882199245",
    name: "Dr. Elena Rostova",
    specialty: "Emergency Medicine",
    department: "Emergency Care Unit",
    denialRate: 11.2,
    recoveryVolume: 240500,
    connectedEhr: "Epic Systems v14",
    status: "ACTIVE"
  },
  {
    npi: "1049218204",
    name: "Dr. Robert Chen",
    specialty: "Oncology & Hematology",
    department: "Cancer Research Center",
    denialRate: 6.8,
    recoveryVolume: 495000,
    connectedEhr: "Cerner Millennium",
    status: "ACTIVE"
  },
  {
    npi: "1282190822",
    name: "Dr. Sarah Jenkins",
    specialty: "Cardiology",
    department: "Cardiovascular Desk",
    denialRate: 14.5,
    recoveryVolume: 182000,
    connectedEhr: "Epic Systems v14",
    status: "ACTIVE"
  },
  {
    npi: "1192809180",
    name: "Dr. Marcus Vance",
    specialty: "Orthopedic Surgery",
    department: "Orthopedic Clinic",
    denialRate: 9.2,
    recoveryVolume: 820000,
    connectedEhr: "Allscripts TouchWorks",
    status: "ACTIVE"
  },
  {
    npi: "1482098199",
    name: "Dr. Sophia Martinez",
    specialty: "Neurology",
    department: "Neuroscience Lab",
    denialRate: 15.8,
    recoveryVolume: 94000,
    connectedEhr: "Practice Fusion",
    status: "ACTIVE"
  }
];

export default function ProviderManagementPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [providersList, setProvidersList] = useState<Provider[]>(mockProviders);

  // Form states
  const [newName, setNewName] = useState('');
  const [newNpi, setNewNpi] = useState('');
  const [newSpecialty, setNewSpecialty] = useState('Cardiology');

  const filteredProviders = providersList.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.npi.includes(searchTerm) ||
    p.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProvider = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newNpi) return;

    const newProvider: Provider = {
      npi: newNpi,
      name: newName,
      specialty: newSpecialty,
      department: `${newSpecialty} Specialty Unit`,
      denialRate: 0.0,
      recoveryVolume: 0,
      connectedEhr: "Epic Systems v14",
      status: "ACTIVE"
    };

    setProvidersList(prev => [...prev, newProvider]);
    setNewName('');
    setNewNpi('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex justify-between items-center pb-4 border-b border-slate-200">
        <div>
          <span className="text-[9px] font-mono text-slate-500 tracking-widest uppercase">REGISTRY DATABASE //</span>
          <h2 className="text-xl font-bold font-mono tracking-tight text-slate-900 mt-1">PROVIDER DIRECTORY & NPI</h2>
        </div>

        <button 
          onClick={() => setShowAddModal(true)}
          className="py-2 px-3 rounded border border-blue-700 bg-blue-600 hover:bg-blue-700 text-white font-mono text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-sm"
        >
          <Plus size={14} />
          <span>CONNECT_NEW_PROVIDER</span>
        </button>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <div className="bg-white border border-slate-200 rounded p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
            <Users size={18} />
          </div>
          <div>
            <span className="text-[9px] font-mono text-slate-400 block uppercase font-bold">Connected Providers</span>
            <span className="text-lg font-bold font-mono text-slate-900">{providersList.length} Active Physicians</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
            <Activity size={18} />
          </div>
          <div>
            <span className="text-[9px] font-mono text-slate-400 block uppercase font-bold">NPI Registry State</span>
            <span className="text-lg font-bold font-mono text-emerald-600">100% Verified</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-700">
            <Award size={18} />
          </div>
          <div>
            <span className="text-[9px] font-mono text-slate-400 block uppercase font-bold">Total Intercepted Cash</span>
            <span className="text-lg font-bold font-mono text-blue-600">
              ${providersList.reduce((acc, curr) => acc + curr.recoveryVolume, 0).toLocaleString()}
            </span>
          </div>
        </div>

      </div>

      {/* Main Registry Ledger Card */}
      <div className="bg-white border border-slate-200 rounded p-5 md:p-6 space-y-5">
        
        {/* Search */}
        <div className="max-w-sm relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Search size={14} />
          </div>
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded py-2 pl-9 pr-4 text-xs font-mono text-slate-800 outline-none transition-all"
            placeholder="Search provider name, NPI, or specialty..."
          />
        </div>

        {/* Ledger Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-[10px]">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 pb-2">
                <th className="py-2.5 font-bold">NPI_NUMBER</th>
                <th className="py-2.5 font-bold">PHYSICIAN_NAME</th>
                <th className="py-2.5 font-bold">SPECIALTY</th>
                <th className="py-2.5 font-bold">DEPARTMENT</th>
                <th className="py-2.5 font-bold text-center">AVG_DENIAL_RATE</th>
                <th className="py-2.5 font-bold text-right">RECOVERY_CREDIT</th>
                <th className="py-2.5 font-bold">CONNECTED_EMR</th>
                <th className="py-2.5 font-bold text-center">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredProviders.map((p, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition-colors duration-150">
                  <td className="py-3.5 text-slate-500 font-bold">{p.npi}</td>
                  <td className="py-3.5 text-slate-900 font-extrabold">{p.name}</td>
                  <td className="py-3.5 text-slate-600">{p.specialty}</td>
                  <td className="py-3.5 text-slate-600">{p.department}</td>
                  <td className="py-3.5 text-center text-blue-600 font-bold">{p.denialRate}%</td>
                  <td className="py-3.5 text-right text-slate-900 font-extrabold">${p.recoveryVolume.toLocaleString()}</td>
                  <td className="py-3.5 text-slate-500">{p.connectedEhr}</td>
                  <td className="py-3.5 text-center">
                    <span className="px-2 py-0.5 rounded text-[8px] font-extrabold border text-emerald-700 bg-emerald-50 border-emerald-200">
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {/* Add Provider Modal Overlay */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="w-full max-w-md bg-white border border-slate-200 rounded p-6 relative shadow-lg border-t-4 border-t-blue-600 animate-in fade-in zoom-in duration-200">
            
            <h3 className="text-xs font-bold font-mono text-slate-900 uppercase tracking-wider mb-4 border-b border-slate-200 pb-2">
              CONNECT NEW PROVIDER NPI
            </h3>

            <form onSubmit={handleAddProvider} className="space-y-4">
              <div>
                <label className="block text-[9px] font-mono text-slate-400 uppercase mb-1 font-bold">Physician Full Name</label>
                <input 
                  type="text" 
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded py-2 px-3 text-xs font-mono text-slate-800 outline-none transition-all"
                  placeholder="e.g. Dr. Arthur Pendelton"
                  required
                />
              </div>

              <div>
                <label className="block text-[9px] font-mono text-slate-400 uppercase mb-1 font-bold">10-Digit Federal NPI Number</label>
                <input 
                  type="text" 
                  value={newNpi}
                  onChange={(e) => setNewNpi(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded py-2 px-3 text-xs font-mono text-slate-800 outline-none transition-all"
                  placeholder="e.g. 1092801988"
                  required
                />
              </div>

              <div>
                <label className="block text-[9px] font-mono text-slate-400 uppercase mb-1 font-bold">Specialty Department</label>
                <select 
                  value={newSpecialty}
                  onChange={(e) => setNewSpecialty(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded py-2 px-3 text-xs font-mono text-slate-800 outline-none transition-all"
                >
                  <option value="Cardiology">Cardiology</option>
                  <option value="Orthopedic Surgery">Orthopedic Surgery</option>
                  <option value="Neurology">Neurology</option>
                  <option value="Emergency Medicine">Emergency Medicine</option>
                  <option value="Internal Medicine">Internal Medicine</option>
                </select>
              </div>

              <div className="flex gap-3 pt-3">
                <button 
                  type="button" 
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2 rounded border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-mono font-bold text-slate-600 transition-all cursor-pointer"
                >
                  CANCEL
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-2 rounded border border-blue-700 bg-blue-600 hover:bg-blue-700 text-xs font-mono font-bold text-white transition-all cursor-pointer"
                >
                  CONNECT
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
