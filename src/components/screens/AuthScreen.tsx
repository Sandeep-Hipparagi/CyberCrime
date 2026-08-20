import React, { useState } from 'react';
import { Shield, Lock, Eye, EyeOff, Fingerprint, Key, AlertTriangle, ArrowRight, UserCheck, CheckCircle2, Building2, Zap } from 'lucide-react';
import { AppScreen } from '../../types';

interface AuthScreenProps {
  onLoginSuccess: (officerId: string) => void;
  onNavigate: (screen: AppScreen) => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onLoginSuccess, onNavigate }) => {
  const [officerId, setOfficerId] = useState('NODAL-SBI-0482');
  const [securityKey, setSecurityKey] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [isScanningBiometric, setIsScanningBiometric] = useState(false);
  const [authSuccess, setAuthSuccess] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthSuccess(true);
    setTimeout(() => {
      onLoginSuccess(officerId);
    }, 1200);
  };

  const handleBiometricScan = () => {
    setIsScanningBiometric(true);
    setTimeout(() => {
      setIsScanningBiometric(false);
      setAuthSuccess(true);
      setTimeout(() => {
        onLoginSuccess('NODAL-SBI-0482 (Aadhaar FIDO2 Verified)');
      }, 1000);
    }, 1800);
  };

  const handleDemoFill = () => {
    setOfficerId('NODAL-HDFC-9102');
    setSecurityKey('CyberFreeze#1930');
  };

  return (
    <div className="w-full max-w-[700px] mx-auto px-4 sm:px-6 pt-24 sm:pt-32 pb-16">
      <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-[#233554] shadow-2xl relative space-y-8">
        {/* Top Header */}
        <div className="text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#112240] border border-[#5ffbd6]/40 flex items-center justify-center mx-auto text-[#5ffbd6] shadow-[0_0_15px_rgba(95,251,214,0.25)]">
            <Lock className="w-6 h-6" />
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#112240] border border-[#5ffbd6]/40 text-[#5ffbd6] text-xs font-mono tracking-widest uppercase">
            <Building2 className="w-3.5 h-3.5" />
            1930 CFCFRMS Portal
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Bank Nodal Officer & Police Login
          </h1>

          <p className="text-xs sm:text-sm text-[#bacac3] max-w-md mx-auto font-sans leading-relaxed">
            Restricted administrative gateway for designated bank fraud nodal officers, payment gateway coordinators, and State Cyber Crime Police stations.
          </p>
        </div>

        {/* Security Warning Callout */}
        <div className="p-3.5 rounded-2xl bg-[#93000a]/15 border border-[#ffb4ab]/30 flex items-start gap-3 text-xs font-sans text-[#d6e3ff]">
          <AlertTriangle className="w-4 h-4 text-[#ffb4ab] shrink-0 mt-0.5" />
          <p>
            Secured under Section 43 & Section 66 of IT Act 2000. All IP addresses, hardware tokens, and session actions are immutably logged for audit by I4C MHA.
          </p>
        </div>

        {authSuccess ? (
          <div className="p-8 rounded-2xl bg-[#081b2b] border border-[#5ffbd6] text-center space-y-3 animate-fade-in">
            <CheckCircle2 className="w-12 h-12 text-[#5ffbd6] mx-auto animate-bounce" />
            <div className="font-mono text-sm font-bold text-white uppercase tracking-wider">
              1930 Bank Clearance Approved
            </div>
            <p className="text-xs text-[#bacac3] font-mono">
              Redirecting to Live Bank Lien & Freeze Terminal...
            </p>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Officer ID Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase tracking-wider text-[#bacac3] block font-medium">
                Bank Nodal / LEA Officer Code
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={officerId}
                  onChange={(e) => setOfficerId(e.target.value)}
                  placeholder="e.g. NODAL-SBI-0482"
                  className="w-full bg-[#071324] border border-[#233554] focus:border-[#5ffbd6] focus:outline-none rounded-xl px-4 py-3 text-sm font-mono text-white tracking-wide transition-all shadow-inner"
                />
              </div>
            </div>

            {/* Security Key Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono uppercase tracking-wider text-[#bacac3] block font-medium">
                  Digital Signature / Passkey
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-xs font-mono text-[#5ffbd6] hover:underline flex items-center gap-1"
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  <span>{showPassword ? 'Hide' : 'Show'}</span>
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={securityKey}
                  onChange={(e) => setSecurityKey(e.target.value)}
                  placeholder="Enter security key"
                  className="w-full bg-[#071324] border border-[#233554] focus:border-[#5ffbd6] focus:outline-none rounded-xl px-4 py-3 text-sm font-mono text-white tracking-wide transition-all shadow-inner"
                />
              </div>
            </div>

            {/* Biometric Scanning Option */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleBiometricScan}
                disabled={isScanningBiometric}
                className="w-full p-3.5 rounded-xl bg-[#112240] hover:bg-[#162b4d] border border-[#233554] text-white flex items-center justify-center gap-3 font-mono text-xs uppercase tracking-wider transition-all relative overflow-hidden group"
              >
                {isScanningBiometric ? (
                  <>
                    <div className="scan-line" />
                    <Fingerprint className="w-5 h-5 text-[#5ffbd6] animate-pulse" />
                    <span className="text-[#5ffbd6] font-bold">Scanning Aadhaar FIDO2 Token...</span>
                  </>
                ) : (
                  <>
                    <Fingerprint className="w-5 h-5 text-[#5ffbd6] group-hover:scale-110 transition-transform" />
                    <span>Aadhaar / Hardware FIDO2 Authenticator</span>
                  </>
                )}
              </button>
            </div>

            {/* Standardized Primary Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-[#5ffbd6] hover:bg-[#38debb] text-[#041329] font-bold px-6 py-3.5 rounded-xl font-mono text-sm uppercase tracking-wide flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(95,251,214,0.3)] hover:shadow-[0_0_25px_rgba(95,251,214,0.5)] active:scale-[0.98] transition-all"
              >
                <Key className="w-4 h-4" />
                <span>Authorize & Open Bank Freeze Workspace</span>
              </button>
            </div>

            {/* Demo Helper & Back link */}
            <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-[#233554] text-xs font-mono text-[#bacac3] gap-2">
              <button
                type="button"
                onClick={handleDemoFill}
                className="text-[#5ffbd6] hover:underline flex items-center gap-1"
              >
                <span>[Auto-fill Demo Bank Nodal Credentials]</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigate('home')}
                className="hover:text-white transition-colors"
              >
                &larr; Return to Citizen Portal
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

