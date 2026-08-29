import React from 'react';
import { X, AlertTriangle, Phone, ShieldAlert, WifiOff, Camera, CreditCard, Lock, CheckCircle, PhoneCall, Zap, Smartphone, IndianRupee } from 'lucide-react';

interface ImmediateHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ImmediateHelpModal: React.FC<ImmediateHelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div 
        className="glass-panel w-full max-w-2xl rounded-3xl border border-[#ffb4ab]/40 bg-[#0a1829] p-6 sm:p-8 shadow-[0_0_50px_rgba(255,180,171,0.15)] relative max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-[#112240] text-[#bacac3] hover:text-white border border-[#233554] transition-colors"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#93000a]/30 border border-[#ffb4ab] flex items-center justify-center shrink-0 text-[#ffb4ab] shadow-[0_0_15px_rgba(147,0,10,0.3)]">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-[#ffb4ab] font-bold">
              Golden Hour Emergency Guide
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              1930 Financial Fraud Emergency Actions
            </h2>
            <p className="text-sm text-[#bacac3] mt-1 font-sans">
              If your money was debited via UPI, NetBanking, or Fake APK within the last 2-4 hours, act immediately to stop cash out.
            </p>
          </div>
        </div>

        {/* Emergency Hotline Numbers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          <div className="p-4 rounded-2xl bg-[#112240] border border-[#ffb4ab]/40 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#93000a]/30 text-[#ffb4ab]">
              <PhoneCall className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase text-[#bacac3]">24x7 Citizen Cyber Helpline</div>
              <div className="font-mono font-extrabold text-[#ffb4ab] text-xl tracking-wider">1930 (Toll Free)</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#112240] border border-[#5ffbd6]/40 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#5ffbd6]/20 text-[#5ffbd6]">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase text-[#bacac3]">Official MHA Portal</div>
              <div className="font-mono font-bold text-[#5ffbd6] text-base">cybercrime.gov.in</div>
            </div>
          </div>
        </div>

        {/* Action Steps */}
        <div className="space-y-3 mb-6">
          <h3 className="font-mono text-xs uppercase tracking-wider text-[#5ffbd6] font-semibold">
            4 Golden Hour Actions for Maximum Recovery
          </h3>

          <div className="p-4 rounded-2xl bg-[#081528] border border-[#233554] flex items-start gap-3">
            <CreditCard className="w-5 h-5 text-[#5ffbd6] shrink-0 mt-0.5" />
            <div>
              <div className="font-mono text-sm font-semibold text-white">1. Note 12-Digit UTR / Transaction ID</div>
              <p className="text-xs text-[#bacac3] mt-0.5 font-sans leading-relaxed">
                Open your bank SMS alert or GPay/PhonePe history and locate the 12-digit UPI reference number. This is required for the recipient bank to trace and freeze the wallet.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#081528] border border-[#233554] flex items-start gap-3">
            <Smartphone className="w-5 h-5 text-[#5ffbd6] shrink-0 mt-0.5" />
            <div>
              <div className="font-mono text-sm font-semibold text-white">2. Uninstall Remote Screen Sharing Apps</div>
              <p className="text-xs text-[#bacac3] mt-0.5 font-sans leading-relaxed">
                If the fraudster instructed you to install <strong className="text-white">AnyDesk, RustDesk, TeamViewer QuickSupport, or custom APKs</strong>, immediately disconnect Wi-Fi/Mobile Data and uninstall them.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#081528] border border-[#233554] flex items-start gap-3">
            <Camera className="w-5 h-5 text-[#5ffbd6] shrink-0 mt-0.5" />
            <div>
              <div className="font-mono text-sm font-semibold text-white">3. Screenshot Chats, QR Codes & Debit SMS</div>
              <p className="text-xs text-[#bacac3] mt-0.5 font-sans leading-relaxed">
                Save WhatsApp chats, Telegram investment channels, and debit messages before the fraudster deletes them.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#081528] border border-[#233554] flex items-start gap-3">
            <Lock className="w-5 h-5 text-[#5ffbd6] shrink-0 mt-0.5" />
            <div>
              <div className="font-mono text-sm font-semibold text-white">4. Lodge Docket on Portal for Automated Lien</div>
              <p className="text-xs text-[#bacac3] mt-0.5 font-sans leading-relaxed">
                Use this AI-assisted portal to generate your 1930 docket in under 60 seconds to lock beneficiary accounts before money is cashed out.
              </p>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-[#233554]">
          <button
            onClick={onClose}
            className="flex-1 bg-[#5ffbd6] hover:bg-[#38debb] text-[#041329] font-bold px-6 py-3.5 rounded-xl font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(95,251,214,0.3)] active:scale-[0.98]"
          >
            <CheckCircle className="w-4 h-4" />
            <span>I Understand &mdash; Continue to Fast-Track Form</span>
          </button>
        </div>
      </div>
    </div>
  );
};

