import React from 'react';
import { Shield, Lock, ExternalLink, FileCheck, CheckCircle, Terminal, HelpCircle, PhoneCall, IndianRupee } from 'lucide-react';
import { AppScreen } from '../types';

interface FooterProps {
  onNavigate: (screen: AppScreen) => void;
  onOpenHelp: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenHelp }) => {
  return (
    <footer className="w-full border-t border-[#233554] bg-[#020b18]/90 backdrop-blur-md mt-auto py-8 sm:py-12 transition-all">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 pb-8 border-b border-[#233554]/60">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#112240] border border-[#5ffbd6]/40 flex items-center justify-center">
                <Shield className="w-4 h-4 text-[#5ffbd6]" />
              </div>
              <span className="font-bold text-white tracking-tight text-base font-sans">
                <span className="text-[#5ffbd6]">Cyber</span>Crime 1930
              </span>
            </div>
            <p className="text-xs text-[#bacac3] leading-relaxed font-sans">
              Citizen Financial Cyber Fraud Reporting and Management System (CFCFRMS). Rapid AI intake designed for immediate bank lien and fund recovery.
            </p>
            <div className="flex items-center gap-2 text-[11px] font-mono text-[#5ffbd6]">
              <Lock className="w-3 h-3" />
              <span>TLS 1.3 | SHA-256 Hashes | I4C MHA</span>
            </div>
          </div>

          {/* Incident Flow */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-mono uppercase tracking-widest text-white font-semibold">
              Fast-Track Reporting
            </h4>
            <ul className="space-y-1.5 text-xs font-mono text-[#bacac3]">
              <li>
                <button onClick={() => onNavigate('select_input')} className="hover:text-[#5ffbd6] transition-colors">
                  01. Voice Dictation / Screenshots
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('narrative')} className="hover:text-[#5ffbd6] transition-colors">
                  02. Bank & UTR Autofill
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('evidence')} className="hover:text-[#5ffbd6] transition-colors">
                  03. Payment Proof Upload
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('summary')} className="hover:text-[#5ffbd6] transition-colors">
                  04. 1930 Bank Lien Freeze
                </button>
              </li>
            </ul>
          </div>

          {/* Compliance & Standards */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-mono uppercase tracking-widest text-white font-semibold">
              Legal Framework
            </h4>
            <div className="space-y-1.5 text-xs font-mono text-[#bacac3]">
              <div className="flex items-center gap-1.5">
                <FileCheck className="w-3.5 h-3.5 text-[#5ffbd6]" />
                <span>IT Act 2000 (Section 66D)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-[#5ffbd6]" />
                <span>Sec 65B Indian Evidence Act</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-[#5ffbd6]" />
                <span>RBI Zero Liability Circular 2017</span>
              </div>
            </div>
          </div>

          {/* Immediate Assistance */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#ffb4ab] font-semibold flex items-center gap-1">
              National Helpline
            </h4>
            <p className="text-xs text-[#bacac3] font-sans">
              Dial immediately within Golden Hour for bank account freeze:
            </p>
            <div className="space-y-1 text-xs font-mono">
              <div className="text-white font-bold text-sm text-[#5ffbd6] flex items-center gap-1.5">
                <PhoneCall className="w-4 h-4" />
                1930 (Toll Free)
              </div>
              <div className="text-[#bacac3]">cybercrime.gov.in (I4C MHA)</div>
            </div>
            <button
              onClick={onOpenHelp}
              className="mt-2 text-xs font-mono text-[#5ffbd6] underline hover:text-[#38debb] flex items-center gap-1"
            >
              <span>View 1930 Emergency Bank Checklist</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#bacac3]/70">
          <div>
            &copy; 2026 Citizen Financial Cyber Fraud Portal. In alignment with cybercrime.gov.in & I4C Ministry of Home Affairs.
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => onNavigate('auth')} className="hover:text-white transition-colors">
              Bank Nodal Login
            </button>
            <span>&bull;</span>
            <button onClick={onOpenHelp} className="hover:text-white transition-colors">
              Help Center
            </button>
            <span>&bull;</span>
            <button onClick={() => onNavigate('case_tracker')} className="hover:text-white transition-colors">
              Track 1930 Ack
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

