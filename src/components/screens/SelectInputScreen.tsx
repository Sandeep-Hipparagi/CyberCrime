import React from 'react';
import { Mic, FileText, ArrowRight, Sparkles, Volume2, Edit3, ShieldCheck, ChevronRight, Smartphone, Image as ImageIcon, Building2, Zap, Clock, MessageSquare } from 'lucide-react';
import { AppScreen } from '../../types';

interface SelectInputScreenProps {
  onSelectMethod: (method: 'voice' | 'text' | 'screenshot') => void;
  onNavigate: (screen: AppScreen) => void;
}

export const SelectInputScreen: React.FC<SelectInputScreenProps> = ({ onSelectMethod, onNavigate }) => {
  return (
    <div className="w-full max-w-[1100px] mx-auto px-4 sm:px-6 pt-2 pb-16 space-y-8">
      {/* Step Indicator Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#112240] border border-[#5ffbd6]/40 text-[#5ffbd6] text-xs font-mono tracking-widest uppercase">
          Step 1 of 4: Fast-Track Intake Channel
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
          How Would You Like to Report?
        </h1>
        <p className="text-sm sm:text-base text-[#bacac3] max-w-2xl mx-auto font-sans leading-relaxed">
          Choose the easiest reporting method. No technical jargon or long multi-page forms required.
        </p>
      </div>

      {/* 3-Card Selection Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
        {/* Card 1: Voice Input (Senior Citizen Hero) */}
        <div 
          onClick={() => onSelectMethod('voice')}
          className="glass-panel rounded-2xl p-6 sm:p-7 border border-[#5ffbd6]/60 hover:border-[#5ffbd6] bg-[#071d33] transition-all cursor-pointer group hover:shadow-[0_0_35px_rgba(95,251,214,0.3)] flex flex-col justify-between relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4">
            <span className="px-2.5 py-1 rounded-full bg-[#5ffbd6]/20 border border-[#5ffbd6]/40 text-[#5ffbd6] font-mono text-[10px] uppercase font-extrabold flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Recommended for Seniors
            </span>
          </div>

          <div className="space-y-5">
            <div className="w-14 h-14 rounded-2xl bg-[#112240] border border-[#5ffbd6] flex items-center justify-center text-[#5ffbd6] group-hover:scale-105 transition-all shadow-[0_0_15px_rgba(95,251,214,0.3)]">
              <Mic className="w-7 h-7 animate-pulse" />
            </div>

            <div className="space-y-1.5">
              <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                1. AI Voice Dictation
              </h2>
              <p className="text-xs text-[#bacac3] font-sans leading-relaxed">
                Just speak your story in your own words (Hindi, English, or Hinglish). The AI extracts Bank, Fraud amount, UTR, and suspect details automatically.
              </p>
            </div>

            {/* Audio Wave Visualizer */}
            <div className="p-3.5 rounded-xl bg-[#081528] border border-[#233554] flex items-center justify-center gap-1.5 h-12">
              {[30, 60, 20, 90, 50, 80, 40, 95, 30, 70, 45, 85].map((height, i) => (
                <div
                  key={i}
                  className="w-1 rounded-full bg-[#5ffbd6] group-hover:animate-pulse transition-all"
                  style={{ height: `${height}%`, opacity: 0.6 + (i % 3) * 0.2 }}
                />
              ))}
            </div>

            <ul className="space-y-1.5 font-mono text-xs text-[#bacac3]">
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#5ffbd6]" />
                <span>Zero typing needed</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#5ffbd6]" />
                <span>Understands conversational Hindi & English</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#5ffbd6]" />
                <span>Instant auto-fill into 1930 docket</span>
              </li>
            </ul>
          </div>

          <div className="pt-5 mt-5 border-t border-[#233554]">
            <button
              type="button"
              className="w-full bg-[#5ffbd6] group-hover:bg-[#38debb] text-[#041329] font-bold px-4 py-3 rounded-xl font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(95,251,214,0.3)]"
            >
              <Mic className="w-4 h-4" />
              <span>Start Speaking Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Card 2: Screenshot & Chat Parser (Gen Z Hero) */}
        <div 
          onClick={() => onNavigate('evidence')}
          className="glass-panel rounded-2xl p-6 sm:p-7 border border-[#233554] hover:border-[#5ffbd6] bg-[#0c1f36] transition-all cursor-pointer group hover:shadow-[0_0_30px_rgba(95,251,214,0.2)] flex flex-col justify-between relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4">
            <span className="px-2.5 py-1 rounded-full bg-[#112240] border border-[#233554] text-[#5ffbd6] font-mono text-[10px] uppercase font-bold flex items-center gap-1">
              <Zap className="w-3 h-3" />
              Gen Z Quick Drop
            </span>
          </div>

          <div className="space-y-5">
            <div className="w-14 h-14 rounded-2xl bg-[#112240] border border-[#5ffbd6]/40 flex items-center justify-center text-[#5ffbd6] group-hover:scale-105 group-hover:border-[#5ffbd6] transition-all">
              <Smartphone className="w-7 h-7" />
            </div>

            <div className="space-y-1.5">
              <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                2. Screenshot / Chat Drop
              </h2>
              <p className="text-xs text-[#bacac3] font-sans leading-relaxed">
                Upload screenshots of WhatsApp fraud chats, Telegram task scam channels, fake SMS links, or UPI payment receipts. AI reads UTR and numbers.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#081528] border border-[#233554] font-mono text-[11px] text-[#5ffbd6] h-12 flex items-center justify-between">
              <span>OCR Scanner Active</span>
              <span className="text-[10px] text-[#bacac3]">PNG, JPG, PDF</span>
            </div>

            <ul className="space-y-1.5 font-mono text-xs text-[#bacac3]">
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#5ffbd6]" />
                <span>Extracts UPI UTR & Transaction IDs</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#5ffbd6]" />
                <span>Parses Telegram & WhatsApp conversations</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#5ffbd6]" />
                <span>Automatic SHA-256 evidence hashing</span>
              </li>
            </ul>
          </div>

          <div className="pt-5 mt-5 border-t border-[#233554]">
            <button
              type="button"
              className="w-full bg-[#112240] group-hover:bg-[#162b4d] text-white border border-[#233554] group-hover:border-[#5ffbd6]/60 font-bold px-4 py-3 rounded-xl font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
            >
              <ImageIcon className="w-4 h-4 text-[#5ffbd6]" />
              <span>Upload Screenshots</span>
              <ArrowRight className="w-4 h-4 text-[#5ffbd6]" />
            </button>
          </div>
        </div>

        {/* Card 3: 60-Second Express Bank Form */}
        <div 
          onClick={() => onSelectMethod('text')}
          className="glass-panel rounded-2xl p-6 sm:p-7 border border-[#233554] hover:border-[#5ffbd6] bg-[#0c1f36] transition-all cursor-pointer group hover:shadow-[0_0_30px_rgba(95,251,214,0.2)] flex flex-col justify-between relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4">
            <span className="px-2.5 py-1 rounded-full bg-[#112240] border border-[#233554] text-[#bacac3] font-mono text-[10px] uppercase font-semibold">
              Fast Freeze
            </span>
          </div>

          <div className="space-y-5">
            <div className="w-14 h-14 rounded-2xl bg-[#112240] border border-[#233554] flex items-center justify-center text-[#5ffbd6] group-hover:scale-105 group-hover:border-[#5ffbd6] transition-all">
              <Building2 className="w-7 h-7" />
            </div>

            <div className="space-y-1.5">
              <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                3. Express Form & Bank Details
              </h2>
              <p className="text-xs text-[#bacac3] font-sans leading-relaxed">
                Directly enter the victim bank, debit reference / UTR number, and lost amount to generate a fast bank freeze notice.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#081528] border border-[#233554] font-mono text-[11px] text-[#5ffbd6]/80 h-12 flex items-center justify-between">
              <span>SBI, HDFC, ICICI, UPI</span>
              <span className="text-[10px] text-[#5ffbd6]">3 Key Fields</span>
            </div>

            <ul className="space-y-1.5 font-mono text-xs text-[#bacac3]">
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#5ffbd6]" />
                <span>Instant Nodal Bank API Dispatch</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#5ffbd6]" />
                <span>Smart Paste SMS / Bank Alert feature</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#5ffbd6]" />
                <span>1930 Acknowledgment receipt generation</span>
              </li>
            </ul>
          </div>

          <div className="pt-5 mt-5 border-t border-[#233554]">
            <button
              type="button"
              className="w-full bg-[#112240] group-hover:bg-[#162b4d] text-white border border-[#233554] group-hover:border-[#5ffbd6]/60 font-bold px-4 py-3 rounded-xl font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
            >
              <Edit3 className="w-4 h-4 text-[#5ffbd6]" />
              <span>Fill Express Form</span>
              <ChevronRight className="w-4 h-4 text-[#5ffbd6]" />
            </button>
          </div>
        </div>
      </div>

      {/* Back button */}
      <div className="pt-4 text-center">
        <button
          onClick={() => onNavigate('home')}
          className="text-xs font-mono text-[#bacac3] hover:text-white transition-colors"
        >
          &larr; Back to Portal Home
        </button>
      </div>
    </div>
  );
};

