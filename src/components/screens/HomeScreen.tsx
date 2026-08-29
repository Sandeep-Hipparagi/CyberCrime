import React from 'react';
import { Shield, ArrowRight, PhoneCall, Lock, AlertCircle, FileCheck, Database, Eye, Terminal, CheckCircle2, Activity, Zap, Server, Mic, MessageSquare, IndianRupee, Clock, Sparkles, Smartphone, Building2, UploadCloud, Users, ArrowUpRight } from 'lucide-react';
import { AppScreen } from '../../types';
import { QUICK_SAMPLE_FRAUD_CASES } from '../../data/mockData';

interface HomeScreenProps {
  onNavigate: (screen: AppScreen) => void;
  onOpenHelp: () => void;
  caseCount: number;
  isSeniorMode?: boolean;
  onSelectQuickCase?: (sampleCase: typeof QUICK_SAMPLE_FRAUD_CASES[0]) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ 
  onNavigate, 
  onOpenHelp, 
  caseCount,
  isSeniorMode = false,
  onSelectQuickCase
}) => {
  return (
    <div className="w-full max-w-[1150px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-8 pb-16 space-y-8 sm:space-y-12">
      {/* 1930 Golden Hour Emergency Banner */}
      <div className="glass-panel rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-[#ffb4ab]/40 bg-[#93000a]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-[0_0_35px_rgba(147,0,10,0.25)]">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[#93000a] border border-[#ffb4ab]/60 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(255,180,171,0.3)]">
            <Clock className="w-6 h-6 text-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-extrabold uppercase tracking-wider text-[#ffb4ab]">
                Golden Hour Financial Alert &bull; Call 1930
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#ffb4ab]/20 text-[#ffb4ab] text-[10px] font-mono font-bold">
                HIGH PRIORITY
              </span>
            </div>
            <p className="text-sm sm:text-base text-white font-sans font-medium mt-0.5">
              Lost money to a UPI, OTP, Fake Job, or Bank KYC scam? <strong className="text-[#5ffbd6]">Reporting in the first 2-3 hours</strong> allows banks to freeze funds in transit!
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
          <button
            onClick={onOpenHelp}
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#93000a] hover:bg-[#ba1a1a] text-white font-mono text-xs uppercase tracking-wider font-extrabold flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(147,0,10,0.5)] active:scale-95"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Call Helpline 1930</span>
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="text-center space-y-6 max-w-4xl mx-auto pt-2">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#112240] border border-[#5ffbd6]/40 text-[#5ffbd6] text-xs font-mono tracking-widest uppercase shadow-[0_0_20px_rgba(95,251,214,0.15)]">
          <Shield className="w-4 h-4" />
          National Cyber Crime Reporting Portal (cybercrime.gov.in) &bull; Helpline 1930
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
          Report Financial Cyber Fraud <br />
          <span className="text-[#5ffbd6] underline decoration-[#5ffbd6]/30 underline-offset-8">In Under 60 Seconds</span>
        </h1>

        <p className="text-base sm:text-xl text-[#bacac3] leading-relaxed max-w-3xl mx-auto font-sans">
          Built for <span className="text-white font-semibold">Senior Citizens</span> and <span className="text-white font-semibold">Gen Z</span> who can't spend hours filling complex government forms. Just speak or drop a screenshot — AI extracts UTR, Bank details & immediately initiates bank lien holds.
        </p>

        {/* 3 Fast-Track Primary Cards (Voice, Screenshot/Chat, Express Form) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 text-left">
          {/* Card 1: Senior Citizen Voice Mode */}
          <div 
            onClick={() => onNavigate('voice_input')}
            className="glass-panel rounded-2xl p-6 border border-[#5ffbd6]/50 bg-[#071d33] hover:border-[#5ffbd6] transition-all cursor-pointer group shadow-[0_0_25px_rgba(95,251,214,0.15)] hover:shadow-[0_0_35px_rgba(95,251,214,0.3)] flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-[#112240] border border-[#5ffbd6] text-[#5ffbd6] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mic className="w-6 h-6 animate-pulse" />
                </div>
                <span className="px-2.5 py-1 rounded-full bg-[#5ffbd6]/15 border border-[#5ffbd6]/40 text-[#5ffbd6] font-mono text-[10px] uppercase font-bold">
                  Senior Citizen Friendly
                </span>
              </div>

              <div>
                <h2 className="text-lg font-bold text-white group-hover:text-[#5ffbd6] transition-colors flex items-center gap-1.5">
                  AI Voice Assistant
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h2>
                <p className="text-xs text-[#bacac3] mt-1 font-sans leading-relaxed">
                  Simply speak in plain Hindi, English, or Hinglish: "SBI se ₹50,000 deduct ho gaya". AI fills the form automatically.
                </p>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-[#233554]/80 flex items-center justify-between font-mono text-xs text-[#5ffbd6]">
              <span>Speak & Auto-File</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: Gen Z Screenshot / OCR Drop */}
          <div 
            onClick={() => onNavigate('select_input')}
            className="glass-panel rounded-2xl p-6 border border-[#233554] bg-[#0c1f36] hover:border-[#5ffbd6] transition-all cursor-pointer group hover:shadow-[0_0_25px_rgba(95,251,214,0.2)] flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-[#112240] border border-[#5ffbd6]/40 text-[#5ffbd6] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Smartphone className="w-6 h-6" />
                </div>
                <span className="px-2.5 py-1 rounded-full bg-[#112240] border border-[#233554] text-[#bacac3] font-mono text-[10px] uppercase font-semibold">
                  Gen Z Quick Drop
                </span>
              </div>

              <div>
                <h2 className="text-lg font-bold text-white group-hover:text-[#5ffbd6] transition-colors flex items-center gap-1.5">
                  Screenshot & Chat Parser
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h2>
                <p className="text-xs text-[#bacac3] mt-1 font-sans leading-relaxed">
                  Drop a screenshot of WhatsApp chat, Telegram crypto task, or UPI payment debit slip. AI reads UTR & amounts.
                </p>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-[#233554]/80 flex items-center justify-between font-mono text-xs text-[#5ffbd6]">
              <span>Extract & Review</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: 60-Second Express Bank Freeze */}
          <div 
            onClick={() => onNavigate('narrative')}
            className="glass-panel rounded-2xl p-6 border border-[#233554] bg-[#0c1f36] hover:border-[#5ffbd6] transition-all cursor-pointer group hover:shadow-[0_0_25px_rgba(95,251,214,0.2)] flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-[#112240] border border-[#5ffbd6]/40 text-[#5ffbd6] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Building2 className="w-6 h-6" />
                </div>
                <span className="px-2.5 py-1 rounded-full bg-[#112240] border border-[#233554] text-[#bacac3] font-mono text-[10px] uppercase font-semibold">
                  Express 3-Fields
                </span>
              </div>

              <div>
                <h2 className="text-lg font-bold text-white group-hover:text-[#5ffbd6] transition-colors flex items-center gap-1.5">
                  Express Bank Freeze
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h2>
                <p className="text-xs text-[#bacac3] mt-1 font-sans leading-relaxed">
                  Enter Victim Bank, Transaction UTR / Ref No, and Amount Lost to trigger automated lien alerts to nodal banks.
                </p>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-[#233554]/80 flex items-center justify-between font-mono text-xs text-[#5ffbd6]">
              <span>Direct Freeze Form</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>

        {/* Secondary Track & Status Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            onClick={() => onNavigate('case_tracker')}
            className="w-full sm:w-auto border border-[#5ffbd6]/40 hover:border-[#5ffbd6] text-[#5ffbd6] hover:bg-[#5ffbd6]/10 px-6 py-3.5 rounded-xl font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
          >
            <Activity className="w-4 h-4" />
            <span>Track Existing 1930 Acknowledgement Status</span>
          </button>
        </div>
      </div>

      {/* Live CFCFRMS Telemetry Banner */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card rounded-2xl p-4 border border-[#233554] space-y-1">
          <div className="text-[11px] font-mono text-[#bacac3] uppercase flex items-center gap-1.5">
            <IndianRupee className="w-3.5 h-3.5 text-[#5ffbd6]" />
            Funds Frozen in 2026
          </div>
          <div className="text-xl font-bold font-mono text-white">₹2,480+ Cr</div>
          <div className="text-[10px] font-mono text-[#5ffbd6]">Saved by Golden Hour auto-lien</div>
        </div>

        <div className="glass-card rounded-2xl p-4 border border-[#233554] space-y-1">
          <div className="text-[11px] font-mono text-[#bacac3] uppercase flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-[#5ffbd6]" />
            Connected Banks & PSPs
          </div>
          <div className="text-xl font-bold font-mono text-white">250+ Entities</div>
          <div className="text-[10px] font-mono text-[#5ffbd6]">SBI, HDFC, Paytm, GPay, ICICI</div>
        </div>

        <div className="glass-card rounded-2xl p-4 border border-[#233554] space-y-1">
          <div className="text-[11px] font-mono text-[#bacac3] uppercase flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-[#5ffbd6]" />
            Avg AI Triage Time
          </div>
          <div className="text-xl font-bold font-mono text-white">&lt; 45 Seconds</div>
          <div className="text-[10px] font-mono text-[#5ffbd6]">Zero manual paperwork</div>
        </div>

        <div className="glass-card rounded-2xl p-4 border border-[#233554] space-y-1">
          <div className="text-[11px] font-mono text-[#bacac3] uppercase flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-[#5ffbd6]" />
            I4C Compliance
          </div>
          <div className="text-xl font-bold font-mono text-white">MHA Certified</div>
          <div className="text-[10px] font-mono text-[#5ffbd6]">Direct CFCFRMS 1930 link</div>
        </div>
      </div>

      {/* Common Fraud Types Quick Load Samples */}
      <div className="space-y-4 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#5ffbd6]" />
              Frequent Financial Scam Scenarios
            </h2>
            <p className="text-xs sm:text-sm text-[#bacac3] font-sans">
              Click any scenario to auto-populate the report with standard templates and test the AI freeze pipeline.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {QUICK_SAMPLE_FRAUD_CASES.map((sample, idx) => (
            <div
              key={idx}
              onClick={() => {
                if (onSelectQuickCase) {
                  onSelectQuickCase(sample);
                } else {
                  onNavigate('narrative');
                }
              }}
              className="glass-card rounded-2xl p-5 border border-[#233554] hover:border-[#5ffbd6] transition-all cursor-pointer group bg-[#091b2e] hover:bg-[#0d2238] flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-[#5ffbd6] font-bold">{sample.amount}</span>
                  <span className="text-[#bacac3]">{sample.bank}</span>
                </div>
                <h3 className="font-bold text-white text-sm group-hover:text-[#5ffbd6] transition-colors">
                  {sample.title}
                </h3>
                <p className="text-xs text-[#bacac3] line-clamp-3 font-sans leading-relaxed">
                  "{sample.text}"
                </p>
              </div>

              <div className="pt-2 border-t border-[#233554] flex items-center justify-between text-[11px] font-mono text-[#5ffbd6]">
                <span>Load Template</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4-Step Process Section */}
      <div className="space-y-6 pt-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            How The 1930 Financial Fraud System Protects You
          </h2>
          <p className="text-sm text-[#bacac3] max-w-xl mx-auto font-sans">
            Automated cybercrime triage synchronizing victim complaints with 250+ banking APIs in real time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="glass-card rounded-2xl p-6 border border-[#233554] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#112240] border border-[#5ffbd6]/30 flex items-center justify-center font-mono text-sm font-bold text-[#5ffbd6]">
              01
            </div>
            <h3 className="font-semibold text-white text-base">Instant AI Intake</h3>
            <p className="text-xs text-[#bacac3] leading-relaxed font-sans">
              Speak naturally or upload payment screenshots. AI automatically extracts Bank Name, Amount, and UTR number.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 border border-[#233554] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#112240] border border-[#5ffbd6]/30 flex items-center justify-center font-mono text-sm font-bold text-[#5ffbd6]">
              02
            </div>
            <h3 className="font-semibold text-white text-base">Bank API Routing</h3>
            <p className="text-xs text-[#bacac3] leading-relaxed font-sans">
              Transaction details are instantly transmitted to the Nodal Officers of both Victim Bank and Suspect's Receiving Bank.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 border border-[#233554] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#112240] border border-[#5ffbd6]/30 flex items-center justify-center font-mono text-sm font-bold text-[#5ffbd6]">
              03
            </div>
            <h3 className="font-semibold text-white text-base">Lien / Account Freeze</h3>
            <p className="text-xs text-[#bacac3] leading-relaxed font-sans">
              The recipient account or wallet is flagged with an immediate debit lien, preventing scammers from withdrawing cash.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 border border-[#233554] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#112240] border border-[#5ffbd6]/30 flex items-center justify-center font-mono text-sm font-bold text-[#5ffbd6]">
              04
            </div>
            <h3 className="font-semibold text-white text-base">1930 Ack Docket</h3>
            <p className="text-xs text-[#bacac3] leading-relaxed font-sans">
              Receive official Citizen Cyber Fraud Acknowledgement Number for court orders and bank refund reversal processing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

