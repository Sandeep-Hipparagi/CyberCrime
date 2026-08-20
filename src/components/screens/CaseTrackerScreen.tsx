import React, { useState } from 'react';
import { Search, Activity, Shield, CheckCircle2, Clock, FileText, Lock, Plus, Eye, AlertCircle, ArrowRight, RefreshCw, ChevronRight, IndianRupee, Building2, Zap, Phone } from 'lucide-react';
import { AppScreen, ComplaintData, EvidenceItem } from '../../types';
import { EvidencePreviewModal } from '../modals/EvidencePreviewModal';

interface CaseTrackerScreenProps {
  activeCase: ComplaintData;
  onNavigate: (screen: AppScreen) => void;
}

export const CaseTrackerScreen: React.FC<CaseTrackerScreenProps> = ({ activeCase, onNavigate }) => {
  const [searchId, setSearchId] = useState(activeCase.caseId);
  const [selectedPreview, setSelectedPreview] = useState<EvidenceItem | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  const bank = activeCase.bankDetails || {
    victimBank: 'State Bank of India (SBI)',
    amountLost: activeCase.financialLoss || '₹75,000',
    transactionIdOrUtr: '423189041289',
    suspectPhoneNumber: '+91 98765 43210',
    suspectUpiOrAccount: 'cyberfrauder@ybl',
    paymentApp: 'Google Pay (UPI)'
  };

  return (
    <div className="w-full max-w-[1050px] mx-auto px-4 sm:px-6 pt-24 sm:pt-32 pb-16 space-y-8">
      {/* Evidence Modal */}
      <EvidencePreviewModal
        evidence={selectedPreview}
        onClose={() => setSelectedPreview(null)}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#112240] border border-[#5ffbd6]/40 text-[#5ffbd6] text-xs font-mono tracking-widest uppercase mb-2">
            <Activity className="w-3.5 h-3.5" />
            1930 Live Bank Lien Telemetry Hub
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Financial Fraud Case Tracker
          </h1>
        </div>

        {/* Search / Docket Query Box */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <input
              type="text"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              placeholder="Search 1930 Ack Number..."
              className="w-full bg-[#071324] border border-[#233554] focus:border-[#5ffbd6] focus:outline-none rounded-xl pl-9 pr-3 py-2.5 text-xs font-mono text-white transition-colors"
            />
            <Search className="w-4 h-4 text-[#bacac3] absolute left-3 top-3" />
          </div>
          <button
            onClick={handleRefresh}
            className="p-2.5 rounded-xl bg-[#112240] hover:bg-[#1c2a41] border border-[#233554] text-[#5ffbd6] transition-colors"
            title="Refresh 1930 Bank Feed"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Case Header Status Card */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-[#233554] space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#233554]">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-bold text-white tracking-wider">
                {activeCase.caseId}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#5ffbd6]/15 border border-[#5ffbd6]/40 text-[#5ffbd6] font-mono text-xs font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#5ffbd6] animate-ping" />
                BANK LIEN ACTIVE
              </span>
            </div>
            <p className="text-xs font-mono text-[#bacac3]">
              {activeCase.complaintType} &bull; UTR: <span className="text-[#5ffbd6]">{bank.transactionIdOrUtr}</span> &bull; {bank.victimBank}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('evidence')}
              className="px-3.5 py-2 rounded-xl bg-[#112240] hover:bg-[#1c2a41] border border-[#5ffbd6]/40 text-[#5ffbd6] font-mono text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Attach Bank Statement / Proof</span>
            </button>
          </div>
        </div>

        {/* 1930 Financial Fraud Progression Stages */}
        <div className="space-y-3">
          <span className="font-mono text-xs uppercase tracking-wider text-[#bacac3] font-semibold block">
            1930 CFCFRMS Resolution Milestones
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 font-mono text-xs">
            <div className="p-3.5 rounded-xl bg-[#081b2b] border border-[#5ffbd6]/60 space-y-1">
              <div className="flex items-center justify-between text-[#5ffbd6]">
                <span className="font-bold">01. 1930 Ingestion</span>
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <p className="text-[11px] text-[#bacac3]">Case ID assigned & cryptographic SHA-256 seal</p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#081b2b] border border-[#5ffbd6]/60 space-y-1">
              <div className="flex items-center justify-between text-[#5ffbd6]">
                <span className="font-bold">02. Nodal Bank Broadcast</span>
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <p className="text-[11px] text-[#bacac3]">Lien alert sent to ICICI / Axis recipient bank</p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#112240] border border-[#5ffbd6] space-y-1">
              <div className="flex items-center justify-between text-white">
                <span className="font-bold text-[#5ffbd6]">03. Lien & Account Freeze</span>
                <Clock className="w-4 h-4 text-[#5ffbd6] animate-spin" />
              </div>
              <p className="text-[11px] text-[#5ffbd6]">{bank.amountLost} balance placed on temporary lien</p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#071324] border border-[#233554] space-y-1 opacity-60">
              <div className="flex items-center justify-between text-[#bacac3]">
                <span className="font-bold">04. Court Order Refund</span>
                <Lock className="w-4 h-4" />
              </div>
              <p className="text-[11px] text-[#bacac3]">Sec 457 CrPC fund release queue</p>
            </div>
          </div>
        </div>
      </div>

      {/* Case Details & Evidence Log Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Col: Narrative Summary & Nodal Officer Notes (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-panel rounded-2xl p-6 border border-[#233554] space-y-4">
            <h3 className="font-mono text-xs uppercase tracking-wider text-[#5ffbd6] font-bold">
              Filed Complaint Statement
            </h3>
            <p className="text-xs sm:text-sm text-[#d6e3ff] leading-relaxed font-sans bg-[#071324] p-4 rounded-xl border border-[#233554]">
              {activeCase.narrative}
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-6 border border-[#233554] space-y-3 font-mono text-xs">
            <h3 className="font-mono text-xs uppercase tracking-wider text-white font-bold flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#5ffbd6]" />
              1930 Bank Nodal Officer & Police Feed
            </h3>
            <div className="space-y-2 text-[#d6e3ff]">
              <div className="p-3.5 rounded-xl bg-[#071324] border border-[#233554] space-y-1">
                <div className="flex items-center justify-between text-[#5ffbd6] text-[11px]">
                  <span>SBI Cyber Fraud Nodal Officer (Desk 4)</span>
                  <span>10:47 IST</span>
                </div>
                <p className="text-[11px] text-[#bacac3]">
                  "Disputed UTR {bank.transactionIdOrUtr} flagged. ₹{bank.amountLost.replace('₹', '')} transfer trail traced to destination wallet. Lien notification acknowledged by beneficiary bank."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Evidence Registry (5 Cols) */}
        <div className="lg:col-span-5 glass-panel rounded-2xl p-6 border border-[#233554] space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-mono text-xs uppercase tracking-wider text-[#5ffbd6] font-bold">
              Sealed Evidence ({activeCase.evidenceList.length})
            </h3>
            <span className="text-[10px] font-mono text-[#bacac3]">SHA-256 Validated</span>
          </div>

          <div className="space-y-2.5">
            {activeCase.evidenceList.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedPreview(item)}
                className="p-3 rounded-xl bg-[#071324] border border-[#233554] hover:border-[#5ffbd6]/40 cursor-pointer transition-all flex items-center justify-between gap-3 font-mono text-xs"
              >
                <div className="flex items-center gap-2.5 truncate">
                  <span className="w-8 h-8 rounded-lg bg-[#112240] border border-[#5ffbd6]/30 flex items-center justify-center text-[10px] font-bold text-[#5ffbd6] shrink-0">
                    {item.extension}
                  </span>
                  <div className="truncate">
                    <div className="text-white font-semibold truncate">{item.name}</div>
                    <div className="text-[10px] text-[#bacac3]">{item.size} &bull; {item.category}</div>
                  </div>
                </div>

                <button className="p-1.5 rounded bg-[#112240] text-[#5ffbd6]">
                  <Eye className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Back button */}
      <div className="text-center pt-4">
        <button
          onClick={() => onNavigate('home')}
          className="text-xs font-mono text-[#bacac3] hover:text-[#5ffbd6] transition-colors"
        >
          &larr; Return to National Portal Home
        </button>
      </div>
    </div>
  );
};

