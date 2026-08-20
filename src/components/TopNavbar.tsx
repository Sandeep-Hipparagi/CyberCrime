import React, { useState } from 'react';
import { Shield, Lock, PhoneCall, AlertTriangle, Menu, X, User, HelpCircle, Bell, RefreshCw, FileText, CheckCircle2, ChevronRight, Activity, Zap, Volume2, Sparkles, IndianRupee } from 'lucide-react';
import { AppScreen } from '../types';

interface TopNavbarProps {
  currentScreen: AppScreen;
  onNavigate: (screen: AppScreen) => void;
  onOpenHelp: () => void;
  caseId: string;
  isSeniorMode?: boolean;
  onToggleSeniorMode?: () => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({
  currentScreen,
  onNavigate,
  onOpenHelp,
  caseId,
  isSeniorMode = false,
  onToggleSeniorMode,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Determine current step index for the multi-step reporting flow
  const isReportingFlow = ['select_input', 'voice_input', 'narrative', 'evidence', 'summary', 'confirmation'].includes(currentScreen);

  const getStepNumber = () => {
    switch (currentScreen) {
      case 'select_input':
      case 'voice_input':
        return 1;
      case 'narrative':
        return 2;
      case 'evidence':
        return 3;
      case 'summary':
        return 4;
      case 'confirmation':
        return 5;
      default:
        return 0;
    }
  };

  const currentStep = getStepNumber();

  return (
    <header className="fixed top-2 sm:top-4 left-1/2 -translate-x-1/2 z-50 w-[96%] max-w-[1240px] transition-all duration-300">
      <div className="glass-panel rounded-2xl sm:rounded-full px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between shadow-2xl border border-[#233554]/90 bg-[#041329]/95 backdrop-blur-2xl">
        {/* Brand Logo - cybercrime.gov.in inspired */}
        <button 
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2.5 sm:gap-3 group text-left focus:outline-none shrink-0"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#0c2340] to-[#112240] border border-[#5ffbd6]/50 flex items-center justify-center group-hover:border-[#5ffbd6] transition-all shadow-[0_0_15px_rgba(95,251,214,0.25)]">
            <Shield className="w-5 h-5 text-[#5ffbd6]" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-sm sm:text-base tracking-tight text-white font-sans">
                <span className="text-[#5ffbd6]">Cyber</span>Crime
              </span>
              <span className="px-1.5 py-0.2 rounded bg-[#ffb4ab]/20 border border-[#ffb4ab]/40 text-[#ffb4ab] font-mono text-[9px] font-bold tracking-wider">
                1930
              </span>
            </div>
            <span className="text-[10px] font-mono tracking-wider text-[#bacac3] hidden sm:block uppercase opacity-85">
              Citizen Financial Fraud Portal
            </span>
          </div>
        </button>

        {/* Step Navigation for Desktop */}
        <nav className="hidden lg:flex items-center gap-5">
          <button
            onClick={() => onNavigate('select_input')}
            className={`font-mono text-xs uppercase tracking-wider transition-all duration-200 flex items-center gap-1.5 py-1 ${
              ['select_input', 'voice_input'].includes(currentScreen)
                ? 'text-[#5ffbd6] font-bold border-b-2 border-[#5ffbd6]'
                : 'text-[#bacac3] hover:text-white'
            }`}
          >
            <span className="w-4 h-4 rounded-full bg-[#112240] border border-[#233554] flex items-center justify-center text-[10px]">1</span>
            Intake
          </button>

          <span className="text-[#233554] text-xs">/</span>

          <button
            onClick={() => onNavigate('narrative')}
            className={`font-mono text-xs uppercase tracking-wider transition-all duration-200 flex items-center gap-1.5 py-1 ${
              currentScreen === 'narrative'
                ? 'text-[#5ffbd6] font-bold border-b-2 border-[#5ffbd6]'
                : 'text-[#bacac3] hover:text-white'
            }`}
          >
            <span className="w-4 h-4 rounded-full bg-[#112240] border border-[#233554] flex items-center justify-center text-[10px]">2</span>
            Bank & Fraud
          </button>

          <span className="text-[#233554] text-xs">/</span>

          <button
            onClick={() => onNavigate('evidence')}
            className={`font-mono text-xs uppercase tracking-wider transition-all duration-200 flex items-center gap-1.5 py-1 ${
              currentScreen === 'evidence'
                ? 'text-[#5ffbd6] font-bold border-b-2 border-[#5ffbd6]'
                : 'text-[#bacac3] hover:text-white'
            }`}
          >
            <span className="w-4 h-4 rounded-full bg-[#112240] border border-[#233554] flex items-center justify-center text-[10px]">3</span>
            Screenshots/Proof
          </button>

          <span className="text-[#233554] text-xs">/</span>

          <button
            onClick={() => onNavigate('summary')}
            className={`font-mono text-xs uppercase tracking-wider transition-all duration-200 flex items-center gap-1.5 py-1 ${
              currentScreen === 'summary'
                ? 'text-[#5ffbd6] font-bold border-b-2 border-[#5ffbd6]'
                : 'text-[#bacac3] hover:text-white'
            }`}
          >
            <span className="w-4 h-4 rounded-full bg-[#112240] border border-[#233554] flex items-center justify-center text-[10px]">4</span>
            Freeze Review
          </button>

          <span className="text-[#233554] text-xs">/</span>

          <button
            onClick={() => onNavigate('case_tracker')}
            className={`font-mono text-xs uppercase tracking-wider transition-all duration-200 flex items-center gap-1.5 py-1 ${
              currentScreen === 'case_tracker' || currentScreen === 'confirmation'
                ? 'text-[#5ffbd6] font-bold border-b-2 border-[#5ffbd6]'
                : 'text-[#bacac3] hover:text-white'
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-[#5ffbd6]" />
            Track 1930 Ack
          </button>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Senior Citizen / Easy Mode Toggle Button */}
          {onToggleSeniorMode && (
            <button
              onClick={onToggleSeniorMode}
              title="Toggle Senior Citizen Easy Mode (Larger Text & Voice Guide)"
              className={`px-2.5 py-1.5 rounded-full border text-[11px] font-mono flex items-center gap-1.5 transition-all ${
                isSeniorMode
                  ? 'bg-[#5ffbd6] text-[#041329] border-[#5ffbd6] font-bold shadow-[0_0_15px_rgba(95,251,214,0.4)]'
                  : 'bg-[#112240]/70 border-[#233554] text-[#bacac3] hover:border-[#5ffbd6]/50 hover:text-white'
              }`}
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isSeniorMode ? 'Easy Mode: ON' : 'Easy Mode'}</span>
              <span className="sm:hidden font-bold">Easy</span>
            </button>
          )}

          {/* Emergency 1930 Call Trigger Button */}
          <button
            onClick={onOpenHelp}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#93000a] hover:bg-[#ba1a1a] text-white border border-[#ffb4ab]/40 font-mono text-xs font-bold tracking-wider transition-all shadow-[0_0_15px_rgba(147,0,10,0.4)] animate-pulse shrink-0"
            title="Emergency National Cyber Financial Fraud Helpline 1930"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>1930 Helpline</span>
          </button>

          {/* Officer Portal Auth Link */}
          <button
            onClick={() => onNavigate('auth')}
            title="Bank Nodal Officer / LEA Login"
            className={`p-2 rounded-full border transition-all ${
              currentScreen === 'auth'
                ? 'bg-[#5ffbd6]/20 border-[#5ffbd6] text-[#5ffbd6]'
                : 'bg-[#112240]/60 border-[#233554] text-[#bacac3] hover:text-white hover:border-[#5ffbd6]/40'
            }`}
          >
            <User className="w-4 h-4" />
          </button>

          {/* Notifications / Live Bank Freeze Telemetry */}
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              title="Live 1930 & Banking Gateway Telemetry"
              className="p-2 rounded-full bg-[#112240]/60 border border-[#233554] text-[#bacac3] hover:text-[#5ffbd6] hover:border-[#5ffbd6]/40 transition-all relative"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#5ffbd6] animate-ping" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#5ffbd6]" />
            </button>

            {/* Notifications Dropdown */}
            {notificationsOpen && (
              <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-[#0d1c32] border border-[#233554] rounded-2xl p-4 shadow-2xl z-50 backdrop-blur-2xl">
                <div className="flex items-center justify-between border-b border-[#233554] pb-2 mb-3">
                  <span className="font-mono text-xs uppercase tracking-wider text-[#5ffbd6] font-semibold flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5" />
                    CFCFRMS 1930 Live Feed
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#5ffbd6]/10 text-[#5ffbd6]">ONLINE</span>
                </div>
                <div className="space-y-2.5 text-xs font-mono">
                  <div className="p-2.5 rounded-xl bg-[#112240] border border-[#233554]/70">
                    <div className="text-[#5ffbd6] flex justify-between font-bold">
                      <span>Golden Hour Auto-Lien</span>
                      <span className="text-[10px] text-[#bacac3]">Active</span>
                    </div>
                    <p className="text-[#d6e3ff] text-[11px] mt-0.5 font-sans">
                      Connected to 250+ Banks, UPI PSPs, and Payment Aggregators (SBI, HDFC, Paytm, PhonePe, ICICI).
                    </p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#112240] border border-[#ffb4ab]/30">
                    <div className="text-[#ffb4ab] flex justify-between font-bold">
                      <span>High Fraud Alert</span>
                      <span className="text-[10px] text-[#bacac3]">Today</span>
                    </div>
                    <p className="text-[#d6e3ff] text-[11px] mt-0.5 font-sans">
                      Spike in Fake KYC APKs & Part-time Telegram task scams reported across major metropolitan zones.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Abort / Exit Report button if in report flow */}
          {isReportingFlow && currentScreen !== 'confirmation' ? (
            <button
              onClick={() => onNavigate('home')}
              className="hidden sm:flex items-center gap-1 text-[#bacac3] hover:text-[#ffb4ab] font-mono text-xs transition-colors pl-1"
              title="Exit Session"
            >
              <X className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">Exit</span>
            </button>
          ) : null}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-[#112240] border border-[#233554] text-[#d6e3ff]"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 glass-panel rounded-2xl p-4 border border-[#233554] shadow-2xl backdrop-blur-2xl flex flex-col gap-3 bg-[#041329]/95">
          <div className="flex items-center justify-between pb-2 border-b border-[#233554]">
            <span className="font-mono text-xs uppercase text-[#5ffbd6] font-medium tracking-wider">
              Citizen Financial Fraud Portal
            </span>
            <span className="text-xs font-mono text-[#bacac3]">Case: {caseId}</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }}
              className={`p-3 rounded-xl border text-left font-mono text-xs flex items-center justify-between ${
                currentScreen === 'home' ? 'bg-[#5ffbd6]/10 border-[#5ffbd6] text-[#5ffbd6]' : 'bg-[#112240] border-[#233554] text-white'
              }`}
            >
              <span>Portal Home</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => { onNavigate('select_input'); setMobileMenuOpen(false); }}
              className={`p-3 rounded-xl border text-left font-mono text-xs flex items-center justify-between ${
                ['select_input', 'voice_input'].includes(currentScreen) ? 'bg-[#5ffbd6]/10 border-[#5ffbd6] text-[#5ffbd6]' : 'bg-[#112240] border-[#233554] text-white'
              }`}
            >
              <span>1. Fast AI Intake</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => { onNavigate('narrative'); setMobileMenuOpen(false); }}
              className={`p-3 rounded-xl border text-left font-mono text-xs flex items-center justify-between ${
                currentScreen === 'narrative' ? 'bg-[#5ffbd6]/10 border-[#5ffbd6] text-[#5ffbd6]' : 'bg-[#112240] border-[#233554] text-white'
              }`}
            >
              <span>2. Bank & Fraud Form</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => { onNavigate('evidence'); setMobileMenuOpen(false); }}
              className={`p-3 rounded-xl border text-left font-mono text-xs flex items-center justify-between ${
                currentScreen === 'evidence' ? 'bg-[#5ffbd6]/10 border-[#5ffbd6] text-[#5ffbd6]' : 'bg-[#112240] border-[#233554] text-white'
              }`}
            >
              <span>3. Screenshots/Proof</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => { onNavigate('summary'); setMobileMenuOpen(false); }}
              className={`p-3 rounded-xl border text-left font-mono text-xs flex items-center justify-between ${
                currentScreen === 'summary' ? 'bg-[#5ffbd6]/10 border-[#5ffbd6] text-[#5ffbd6]' : 'bg-[#112240] border-[#233554] text-white'
              }`}
            >
              <span>4. Freeze Review</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => { onNavigate('case_tracker'); setMobileMenuOpen(false); }}
              className={`p-3 rounded-xl border text-left font-mono text-xs flex items-center justify-between ${
                currentScreen === 'case_tracker' ? 'bg-[#5ffbd6]/10 border-[#5ffbd6] text-[#5ffbd6]' : 'bg-[#112240] border-[#233554] text-white'
              }`}
            >
              <span>5. Track 1930 Status</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="pt-2 border-t border-[#233554] flex gap-2">
            <button
              onClick={() => { onOpenHelp(); setMobileMenuOpen(false); }}
              className="flex-1 py-3 rounded-xl bg-[#93000a] text-white font-mono text-xs font-bold flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(147,0,10,0.4)]"
            >
              <PhoneCall className="w-4 h-4" />
              Call 1930 Helpline
            </button>

            <button
              onClick={() => { onNavigate('auth'); setMobileMenuOpen(false); }}
              className="px-3.5 py-3 rounded-xl bg-[#112240] border border-[#233554] text-white font-mono text-xs flex items-center justify-center gap-1"
            >
              <User className="w-4 h-4 text-[#5ffbd6]" />
              Bank Nodal Auth
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

