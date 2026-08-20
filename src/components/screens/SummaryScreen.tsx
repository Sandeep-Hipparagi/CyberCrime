import React, { useState } from 'react';
import { FileCheck, Shield, CheckCircle2, AlertTriangle, ArrowRight, Eye, Edit, Printer, Clock, Database, Lock, Hash, Building2, IndianRupee, Phone, Zap, ShieldCheck } from 'lucide-react';
import { AppScreen, ComplaintData, EvidenceItem } from '../../types';
import { EvidencePreviewModal } from '../modals/EvidencePreviewModal';

interface SummaryScreenProps {
  complaintData: ComplaintData;
  onFinalizeSubmission: () => void;
  onNavigate: (screen: AppScreen) => void;
}

export const SummaryScreen: React.FC<SummaryScreenProps> = ({
  complaintData,
  onFinalizeSubmission,
  onNavigate
}) => {
  const [selectedPreview, setSelectedPreview] = useState<EvidenceItem | null>(null);
  const [agreedToOath, setAgreedToOath] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFinalSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onFinalizeSubmission();
    }, 1200);
  };

  const handlePrint = () => {
    window.print();
  };

  const bank = complaintData.bankDetails || {
    victimBank: 'State Bank of India (SBI)',
    amountLost: complaintData.financialLoss || '₹75,000',
    transactionIdOrUtr: '423189041289',
    suspectPhoneNumber: '+91 98765 43210',
    suspectUpiOrAccount: 'cyberfrauder@ybl',
    paymentApp: 'Google Pay (UPI)'
  };

  return (
    <div className="w-full max-w-[1050px] mx-auto px-4 sm:px-6 pt-24 sm:pt-32 pb-16 space-y-8">
      {/* Evidence modal */}
      <EvidencePreviewModal
        evidence={selectedPreview}
        onClose={() => setSelectedPreview(null)}
      />

      {/* 1930 Golden Hour Emergency Banner */}
      <div className="glass-panel rounded-2xl p-5 border border-[#5ffbd6]/50 bg-[#082035] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-[0_0_30px_rgba(95,251,214,0.2)]">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[#112240] border border-[#5ffbd6] flex items-center justify-center shrink-0 text-[#5ffbd6] shadow-[0_0_15px_rgba(95,251,214,0.3)]">
            <Zap className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs uppercase font-extrabold tracking-wider text-[#5ffbd6] block">
                1930 Bank Lien Freeze Ready
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#ffb4ab]/20 text-[#ffb4ab] text-[10px] font-mono font-bold">
                Golden Hour Priority
              </span>
            </div>
            <p className="text-xs sm:text-sm text-white font-sans mt-0.5">
              Review your 1930 financial cybercrime docket. Submitting will broadcast immediate freeze alerts to beneficiary banks and I4C nodal officers.
            </p>
          </div>
        </div>

        <button
          onClick={handlePrint}
          className="px-4 py-2.5 rounded-xl bg-[#112240] hover:bg-[#1c2a41] border border-[#233554] text-white font-mono text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors shrink-0"
        >
          <Printer className="w-4 h-4 text-[#5ffbd6]" />
          <span>Print Summary</span>
        </button>
      </div>

      {/* Main Review Container */}
      <div className="space-y-6">
        {/* Case & Banking Key Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 font-mono text-xs">
          <div className="glass-card rounded-2xl p-4 border border-[#233554] space-y-1">
            <span className="text-[10px] text-[#bacac3] uppercase block font-semibold">1930 DOCKET ID</span>
            <span className="text-sm font-bold text-[#5ffbd6] tracking-wide truncate block">{complaintData.caseId}</span>
          </div>

          <div className="glass-card rounded-2xl p-4 border border-[#233554] space-y-1">
            <span className="text-[10px] text-[#bacac3] uppercase block font-semibold">AMOUNT TO FREEZE</span>
            <span className="text-sm font-bold text-[#ffb4ab] tracking-wide flex items-center gap-0.5">
              <IndianRupee className="w-3.5 h-3.5" />
              {bank.amountLost.replace('₹', '')}
            </span>
          </div>

          <div className="glass-card rounded-2xl p-4 border border-[#233554] space-y-1">
            <span className="text-[10px] text-[#bacac3] uppercase block font-semibold">VICTIM BANK</span>
            <span className="text-xs font-bold text-white truncate block">{bank.victimBank}</span>
          </div>

          <div className="glass-card rounded-2xl p-4 border border-[#233554] space-y-1">
            <span className="text-[10px] text-[#bacac3] uppercase block font-semibold">INCIDENT TIMESTAMP</span>
            <span className="text-xs text-white truncate block">{complaintData.incidentDate}</span>
          </div>
        </div>

        {/* Bank & Suspect Details Box */}
        <div className="glass-panel rounded-2xl p-6 sm:p-7 border border-[#233554] space-y-4">
          <div className="flex items-center justify-between border-b border-[#233554] pb-3">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#5ffbd6]" />
              <h2 className="font-mono text-sm font-bold uppercase tracking-wider text-white">
                Section 1: Financial & Suspect Transmission Packet
              </h2>
            </div>
            <button
              onClick={() => onNavigate('narrative')}
              className="px-3 py-1.5 rounded-xl bg-[#112240] hover:bg-[#1c2a41] border border-[#233554] text-[#5ffbd6] hover:text-white font-mono text-xs flex items-center gap-1.5 transition-colors"
            >
              <Edit className="w-3.5 h-3.5" />
              <span>Edit Details</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-3 rounded-xl bg-[#071324] border border-[#233554] space-y-1">
              <span className="text-[10px] text-[#bacac3] uppercase block">UPI UTR / REF NUMBER</span>
              <span className="text-sm font-bold text-white break-all">{bank.transactionIdOrUtr || '423189041289'}</span>
            </div>

            <div className="p-3 rounded-xl bg-[#071324] border border-[#233554] space-y-1">
              <span className="text-[10px] text-[#bacac3] uppercase block">SUSPECT PHONE / WHATSAPP</span>
              <span className="text-sm font-bold text-[#ffb4ab] break-all">{bank.suspectPhoneNumber || '+91 98765 43210'}</span>
            </div>

            <div className="p-3 rounded-xl bg-[#071324] border border-[#233554] space-y-1">
              <span className="text-[10px] text-[#bacac3] uppercase block">SUSPECT UPI / ACCOUNT</span>
              <span className="text-sm font-bold text-[#5ffbd6] break-all">{bank.suspectUpiOrAccount || 'cyberfrauder@ybl'}</span>
            </div>
          </div>
        </div>

        {/* Narrative Card */}
        <div className="glass-panel rounded-2xl p-6 sm:p-7 border border-[#233554] space-y-4">
          <div className="flex items-center justify-between border-b border-[#233554] pb-3">
            <div className="space-y-0.5">
              <span className="font-mono text-xs uppercase tracking-wider text-[#5ffbd6] font-semibold">
                Section 2: Modus Operandi & Complaint Statement
              </span>
              <h2 className="text-base font-bold text-white">
                {complaintData.complaintType}
              </h2>
            </div>
            <button
              onClick={() => onNavigate('narrative')}
              className="px-3 py-1.5 rounded-xl bg-[#112240] hover:bg-[#1c2a41] border border-[#233554] text-[#5ffbd6] hover:text-white font-mono text-xs flex items-center gap-1.5 transition-colors"
            >
              <Edit className="w-3.5 h-3.5" />
              <span>Edit Statement</span>
            </button>
          </div>

          <p className="text-sm text-[#d6e3ff] leading-relaxed font-sans bg-[#071324] p-4 rounded-xl border border-[#233554]/70 whitespace-pre-wrap">
            {complaintData.narrative}
          </p>
        </div>

        {/* Evidence Logs Review Card */}
        <div className="glass-panel rounded-2xl p-6 sm:p-7 border border-[#233554] space-y-4">
          <div className="flex items-center justify-between border-b border-[#233554] pb-3">
            <div className="space-y-0.5">
              <span className="font-mono text-xs uppercase tracking-wider text-[#5ffbd6] font-semibold">
                Section 3: Cryptographic Evidence Chain ({complaintData.evidenceList.length} items)
              </span>
              <h2 className="text-base font-bold text-white">
                Section 65B Electronic Evidence Verification
              </h2>
            </div>
            <button
              onClick={() => onNavigate('evidence')}
              className="px-3 py-1.5 rounded-xl bg-[#112240] hover:bg-[#1c2a41] border border-[#233554] text-[#5ffbd6] hover:text-white font-mono text-xs flex items-center gap-1.5 transition-colors"
            >
              <Edit className="w-3.5 h-3.5" />
              <span>Edit Evidence</span>
            </button>
          </div>

          <div className="space-y-2.5">
            {complaintData.evidenceList.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-xl bg-[#071324] border border-[#233554] flex items-center justify-between gap-4 font-mono text-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-lg bg-[#112240] border border-[#5ffbd6]/30 flex items-center justify-center text-[10px] font-bold text-[#5ffbd6]">
                    {item.extension}
                  </span>
                  <div>
                    <div className="text-white font-semibold flex items-center gap-2">
                      <span>{item.name}</span>
                      <span className="text-[10px] text-[#5ffbd6] font-normal">({item.size})</span>
                    </div>
                    <div className="text-[10px] text-[#bacac3] truncate max-w-sm sm:max-w-md">
                      {item.hash}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedPreview(item)}
                  className="p-2 rounded-lg bg-[#112240] hover:bg-[#1c2a41] text-[#5ffbd6] transition-colors"
                  title="Inspect Artifact"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Legal Attestation Checkbox */}
        <div className="p-4 rounded-xl bg-[#081528] border border-[#233554] flex items-start gap-3">
          <input
            type="checkbox"
            id="oathCheck"
            checked={agreedToOath}
            onChange={(e) => setAgreedToOath(e.target.checked)}
            className="w-4 h-4 rounded bg-[#071324] border-[#233554] text-[#5ffbd6] focus:ring-0 focus:ring-offset-0 cursor-pointer mt-0.5"
          />
          <label htmlFor="oathCheck" className="text-xs text-[#bacac3] font-sans cursor-pointer select-none">
            I hereby certify under the Information Technology Act 2000 (Section 66D) that the financial fraud details, UTR numbers, and narrative statements provided are true and accurate to the best of my knowledge for immediate 1930 bank lien processing.
          </label>
        </div>
      </div>

      {/* Final Submission Action Row */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#233554]">
        <button
          type="button"
          onClick={() => onNavigate('evidence')}
          className="w-full sm:w-auto px-5 py-3 rounded-xl text-xs font-mono text-[#bacac3] hover:text-white transition-colors"
        >
          &larr; Back to Evidence Uploads
        </button>

        <button
          type="button"
          disabled={!agreedToOath || isSubmitting}
          onClick={handleFinalSubmit}
          className={`w-full sm:w-auto bg-[#5ffbd6] hover:bg-[#38debb] text-[#041329] font-bold px-8 py-4 rounded-xl font-mono text-sm uppercase tracking-wider flex items-center justify-center gap-3 transition-all ${
            !agreedToOath || isSubmitting
              ? 'opacity-50 cursor-not-allowed'
              : 'shadow-[0_0_25px_rgba(95,251,214,0.4)] hover:shadow-[0_0_35px_rgba(95,251,214,0.6)] active:scale-[0.98]'
          }`}
        >
          <Lock className="w-4 h-4" />
          <span>{isSubmitting ? 'Transmitting to 1930 Bank Network...' : 'Submit 1930 Financial Fraud Complaint'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

