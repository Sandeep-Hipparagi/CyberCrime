import React, { useState } from 'react';
import { FileText, ArrowRight, Mic, ShieldAlert, Sparkles, Clock, AlertTriangle, CheckCircle, Info, Lock, Building2, IndianRupee, Hash, Phone, Zap, Copy, ShieldCheck } from 'lucide-react';
import { AppScreen, ComplaintData, BankTransactionInfo } from '../../types';
import { THREAT_CATEGORIES, INDIAN_BANKS } from '../../data/mockData';

interface NarrativeScreenProps {
  complaintData: ComplaintData;
  onUpdateComplaint: (updated: Partial<ComplaintData>) => void;
  onNavigate: (screen: AppScreen) => void;
}

export const NarrativeScreen: React.FC<NarrativeScreenProps> = ({
  complaintData,
  onUpdateComplaint,
  onNavigate
}) => {
  const [narrative, setNarrative] = useState(complaintData.narrative);
  const [category, setCategory] = useState(complaintData.complaintType);
  const [incidentDate, setIncidentDate] = useState(complaintData.incidentDate);
  const [severity, setSeverity] = useState(complaintData.severity);
  const [financialLoss, setFinancialLoss] = useState(complaintData.financialLoss || '₹75,000');
  
  // Bank details state
  const [bankDetails, setBankDetails] = useState<BankTransactionInfo>(complaintData.bankDetails || {
    victimBank: 'State Bank of India (SBI)',
    victimAccountNumber: 'XXXX-XXXX-8910',
    amountLost: '₹75,000',
    transactionIdOrUtr: '423189041289',
    suspectPhoneNumber: '+91 98765 43210',
    suspectUpiOrAccount: 'cyberfrauder@ybl',
    paymentApp: 'Google Pay (UPI)'
  });

  const [smsSnippet, setSmsSnippet] = useState('');
  const [smsParsedSuccess, setSmsParsedSuccess] = useState(false);

  const wordCount = narrative.trim() ? narrative.trim().split(/\s+/).length : 0;
  const charCount = narrative.length;

  const handleSmsAutoParse = (text: string) => {
    setSmsSnippet(text);
    if (!text.trim()) return;

    // Simple heuristic parser for Indian Bank SMS alerts
    const amountMatch = text.match(/(?:Rs\.?|INR|₹)\s*([\d,]+(?:\.\d+)?)/i) || text.match(/debited by\s*([\d,]+)/i);
    const utrMatch = text.match(/(?:UTR|Ref|Txn ID|Transaction ID|Ref No)[:\s]*([A-Za-z0-9]+)/i) || text.match(/([0-9]{10,12})/);
    const bankMatch = INDIAN_BANKS.find(b => text.toLowerCase().includes(b.toLowerCase().split(' ')[0]));

    setBankDetails(prev => ({
      ...prev,
      amountLost: amountMatch ? `₹${amountMatch[1]}` : prev.amountLost,
      transactionIdOrUtr: utrMatch ? utrMatch[1] : prev.transactionIdOrUtr,
      victimBank: bankMatch || prev.victimBank
    }));

    if (amountMatch) {
      setFinancialLoss(`₹${amountMatch[1]}`);
    }

    setSmsParsedSuccess(true);
    setTimeout(() => setSmsParsedSuccess(false), 4000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateComplaint({
      narrative,
      complaintType: category,
      incidentDate,
      severity,
      financialLoss: bankDetails.amountLost || financialLoss,
      bankDetails
    });
    onNavigate('evidence');
  };

  return (
    <div className="w-full max-w-[1050px] mx-auto px-4 sm:px-6 pt-2 pb-16 space-y-8">
      {/* Step Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#112240] border border-[#5ffbd6]/40 text-[#5ffbd6] text-xs font-mono tracking-widest uppercase">
          Step 1 of 4: Financial Incident & Bank Details
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
          Express Financial Fraud Form
        </h1>
        <p className="text-sm sm:text-base text-[#bacac3] max-w-2xl mx-auto font-sans leading-relaxed">
          Provide your bank and transaction reference (UTR) so our 1930 nodal network can immediately trigger lien freeze requests with beneficiary banks.
        </p>
      </div>

      {/* Smart SMS Paste Feature Banner */}
      <div className="glass-panel rounded-2xl p-5 sm:p-6 border border-[#5ffbd6]/40 bg-[#07192c] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <Zap className="w-4 h-4 text-[#5ffbd6] animate-pulse" />
            <span>Smart Autofill: Paste Bank Debit SMS Alert</span>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#5ffbd6]/15 text-[#5ffbd6] uppercase font-bold">
            Zero Effort
          </span>
        </div>
        <p className="text-xs text-[#bacac3] font-sans">
          Got an SMS from your bank when money was debited? Paste it below to automatically extract UTR, Bank, and Amount:
        </p>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={smsSnippet}
            onChange={(e) => handleSmsAutoParse(e.target.value)}
            placeholder="e.g. Your A/C XX8910 is debited by INR 75,000.00 on 24-Oct. UPI Ref 423189041289. If not done by you, call 1930..."
            className="flex-1 bg-[#071324] border border-[#233554] focus:border-[#5ffbd6] focus:outline-none rounded-xl px-4 py-2.5 text-xs font-mono text-white"
          />
          <button
            type="button"
            onClick={() => handleSmsAutoParse('Your A/C XX8910 is debited for Rs. 75,000.00 on 24-10-2026 via UPI Ref 423189041289 to cyberfrauder@ybl')}
            className="px-3.5 py-2.5 rounded-xl bg-[#112240] hover:bg-[#1b3457] border border-[#5ffbd6]/40 text-[#5ffbd6] text-xs font-mono font-semibold shrink-0 transition-colors"
          >
            Paste Sample SMS
          </button>
        </div>
        {smsParsedSuccess && (
          <div className="flex items-center gap-2 text-xs font-mono text-[#5ffbd6] bg-[#5ffbd6]/10 px-3 py-1.5 rounded-lg border border-[#5ffbd6]/30">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Successfully extracted: Bank, Amount ({bankDetails.amountLost}), and UTR ({bankDetails.transactionIdOrUtr})</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-[#233554] space-y-6">
          {/* Section 1: Financial & Transaction Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-[#233554]">
              <Building2 className="w-4 h-4 text-[#5ffbd6]" />
              <h2 className="font-mono text-sm font-bold uppercase tracking-wider text-white">
                1. Victim Bank & Transaction Information (Essential for Freeze)
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Victim Bank */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase tracking-wider text-[#bacac3] block font-medium">
                  Victim Bank / Wallet
                </label>
                <select
                  value={bankDetails.victimBank}
                  onChange={(e) => setBankDetails({ ...bankDetails, victimBank: e.target.value })}
                  className="w-full bg-[#071324] border border-[#233554] focus:border-[#5ffbd6] focus:outline-none rounded-lg px-3.5 py-2.5 text-xs font-mono text-white transition-colors"
                >
                  {INDIAN_BANKS.map((bank, idx) => (
                    <option key={idx} value={bank} className="bg-[#071324] text-white">
                      {bank}
                    </option>
                  ))}
                </select>
              </div>

              {/* Amount Lost */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase tracking-wider text-[#bacac3] block font-medium flex items-center justify-between">
                  <span>Fraud Amount (INR)</span>
                  <span className="text-[#ffb4ab] font-bold">Lien Target</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={bankDetails.amountLost}
                    onChange={(e) => {
                      setBankDetails({ ...bankDetails, amountLost: e.target.value });
                      setFinancialLoss(e.target.value);
                    }}
                    placeholder="₹75,000"
                    className="w-full bg-[#071324] border border-[#233554] focus:border-[#5ffbd6] focus:outline-none rounded-lg pl-8 pr-3.5 py-2.5 text-xs font-mono text-white font-bold transition-colors"
                  />
                  <IndianRupee className="w-3.5 h-3.5 text-[#5ffbd6] absolute left-3 top-3" />
                </div>
              </div>

              {/* UTR / Transaction ID */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase tracking-wider text-[#bacac3] block font-medium">
                  UPI Ref / UTR / Txn ID
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={bankDetails.transactionIdOrUtr}
                    onChange={(e) => setBankDetails({ ...bankDetails, transactionIdOrUtr: e.target.value })}
                    placeholder="e.g. 423189041289"
                    className="w-full bg-[#071324] border border-[#233554] focus:border-[#5ffbd6] focus:outline-none rounded-lg px-3.5 py-2.5 text-xs font-mono text-white transition-colors"
                  />
                  <Hash className="w-3.5 h-3.5 text-[#bacac3] absolute right-3 top-3" />
                </div>
              </div>
            </div>

            {/* Suspect Info Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase tracking-wider text-[#bacac3] block font-medium">
                  Suspect Phone / WhatsApp
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={bankDetails.suspectPhoneNumber}
                    onChange={(e) => setBankDetails({ ...bankDetails, suspectPhoneNumber: e.target.value })}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full bg-[#071324] border border-[#233554] focus:border-[#5ffbd6] focus:outline-none rounded-lg px-3.5 py-2.5 text-xs font-mono text-white transition-colors"
                  />
                  <Phone className="w-3.5 h-3.5 text-[#bacac3] absolute right-3 top-3" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase tracking-wider text-[#bacac3] block font-medium">
                  Suspect UPI ID / Account / Telegram
                </label>
                <input
                  type="text"
                  value={bankDetails.suspectUpiOrAccount}
                  onChange={(e) => setBankDetails({ ...bankDetails, suspectUpiOrAccount: e.target.value })}
                  placeholder="e.g. taskworker@paytm or @forex_agent"
                  className="w-full bg-[#071324] border border-[#233554] focus:border-[#5ffbd6] focus:outline-none rounded-lg px-3.5 py-2.5 text-xs font-mono text-white transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase tracking-wider text-[#bacac3] block font-medium">
                  Payment App Used
                </label>
                <select
                  value={bankDetails.paymentApp}
                  onChange={(e) => setBankDetails({ ...bankDetails, paymentApp: e.target.value })}
                  className="w-full bg-[#071324] border border-[#233554] focus:border-[#5ffbd6] focus:outline-none rounded-lg px-3.5 py-2.5 text-xs font-mono text-white transition-colors"
                >
                  <option value="Google Pay (UPI)">Google Pay (UPI)</option>
                  <option value="PhonePe (UPI)">PhonePe (UPI)</option>
                  <option value="Paytm UPI / Wallet">Paytm UPI / Wallet</option>
                  <option value="BHIM UPI">BHIM UPI</option>
                  <option value="Net Banking (IMPS/NEFT/RTGS)">Net Banking (IMPS/NEFT/RTGS)</option>
                  <option value="Credit / Debit Card">Credit / Debit Card</option>
                  <option value="Crypto / USDT Wallet">Crypto / USDT Wallet</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Incident Narrative & Category */}
          <div className="space-y-4 pt-4 border-t border-[#233554]">
            <div className="flex items-center gap-2 pb-2 border-b border-[#233554]">
              <FileText className="w-4 h-4 text-[#5ffbd6]" />
              <h2 className="font-mono text-sm font-bold uppercase tracking-wider text-white">
                2. Fraud Type & Incident Summary
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Category Dropdown */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase tracking-wider text-[#bacac3] block font-medium">
                  Financial Fraud Classification
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-[#071324] border border-[#233554] focus:border-[#5ffbd6] focus:outline-none rounded-lg px-3.5 py-2.5 text-xs font-mono text-white transition-colors"
                >
                  {THREAT_CATEGORIES.map((cat, idx) => (
                    <option key={idx} value={cat} className="bg-[#071324] text-white">
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date & Time */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase tracking-wider text-[#bacac3] block font-medium">
                  Date & Time of Fraud
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={incidentDate}
                    onChange={(e) => setIncidentDate(e.target.value)}
                    placeholder="e.g. 24 October 2026 - 14:30 IST"
                    className="w-full bg-[#071324] border border-[#233554] focus:border-[#5ffbd6] focus:outline-none rounded-lg px-3.5 py-2.5 text-xs font-mono text-white transition-colors"
                  />
                  <Clock className="w-4 h-4 text-[#bacac3] absolute right-3 top-3 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Narrative Textarea */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono uppercase tracking-wider text-[#bacac3] font-medium">
                  Short Description of How the Scam Happened
                </label>
                <div className="text-xs font-mono text-[#bacac3] flex items-center gap-2">
                  <span>{wordCount} words</span>
                  <span>&bull;</span>
                  <span>{charCount} chars</span>
                </div>
              </div>

              <textarea
                required
                rows={4}
                value={narrative}
                onChange={(e) => setNarrative(e.target.value)}
                placeholder="Briefly describe: How did they contact you? (Call, WhatsApp, Telegram, SMS)? What did they promise or threaten? What link/app did they ask you to open?"
                className="w-full bg-[#071324] border border-[#233554] focus:border-[#5ffbd6] focus:outline-none rounded-xl p-4 text-sm font-sans text-white placeholder-[#bacac3]/50 leading-relaxed transition-all shadow-inner"
              />
            </div>
          </div>

          {/* Golden Hour Guarantee Notice */}
          <div className="p-4 rounded-xl bg-[#081528] border border-[#5ffbd6]/30 flex items-start gap-3 text-xs font-sans text-[#bacac3]">
            <ShieldCheck className="w-5 h-5 text-[#5ffbd6] shrink-0 mt-0.5" />
            <div>
              <span className="font-mono font-bold text-white uppercase text-[11px] block">
                Automatic Bank Nodal API Dispatch
              </span>
              <p className="mt-0.5">
                Upon submitting this step, your complaint data will be formatted into standard I4C / 1930 digital complaint formats for swift beneficiary bank lien marking.
              </p>
            </div>
          </div>
        </div>

        {/* Action Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <button
            type="button"
            onClick={() => onNavigate('voice_input')}
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#112240] hover:bg-[#1c2a41] border border-[#233554] text-[#bacac3] hover:text-white font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
          >
            <Mic className="w-4 h-4 text-[#5ffbd6]" />
            <span>Use AI Voice Dictation Instead</span>
          </button>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => onNavigate('select_input')}
              className="w-full sm:w-auto px-4 py-3 rounded-xl text-xs font-mono text-[#bacac3] hover:text-white transition-colors"
            >
              &larr; Back
            </button>

            <button
              type="submit"
              className="w-full sm:w-auto bg-[#5ffbd6] hover:bg-[#38debb] text-[#041329] font-bold px-8 py-3.5 rounded-xl font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(95,251,214,0.3)] hover:shadow-[0_0_25px_rgba(95,251,214,0.5)] active:scale-[0.98] transition-all"
            >
              <span>Next: Attach Evidence (Screenshots/PDF)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

