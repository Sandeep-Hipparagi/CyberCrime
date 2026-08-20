import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, ArrowRight, FileText, CheckCircle2, RotateCcw, Sparkles, MessageSquare, AlertCircle, Radio, IndianRupee, Building2, Smartphone, Shield, Hash, Check } from 'lucide-react';
import { AppScreen, VoiceLogEntry, ComplaintData } from '../../types';

interface VoiceInputScreenProps {
  currentNarrative: string;
  onUpdateNarrative: (text: string) => void;
  onNavigate: (screen: AppScreen) => void;
  onAutoPopulateBankDetails?: (details: Partial<ComplaintData['bankDetails']>) => void;
}

export const VoiceInputScreen: React.FC<VoiceInputScreenProps> = ({
  currentNarrative,
  onUpdateNarrative,
  onNavigate,
  onAutoPopulateBankDetails
}) => {
  const [isListening, setIsListening] = useState(true);
  const [voiceLogs, setVoiceLogs] = useState<VoiceLogEntry[]>([
    {
      time: '10:45:02',
      speaker: 'agent',
      text: 'Namaste. I am your 1930 Citizen Financial Cyber Fraud AI Assistant. Please describe how the fraud occurred, which bank or UPI app was involved, and the amount lost.'
    },
    {
      time: '10:45:15',
      speaker: 'victim',
      text: 'Someone called pretending to be SBI branch manager. They told me my ATM card is blocked due to KYC. They sent an APK app link on WhatsApp and asked me to install it. Within 5 minutes, ₹75,000 was deducted from my account via UPI.'
    },
    {
      time: '10:45:25',
      speaker: 'agent',
      text: 'I have captured the incident: State Bank of India account, ₹75,000 fraud amount, and Remote APK installation scam. Do you have the transaction ID or SMS ref number from your bank alert?'
    }
  ]);

  const [extractedEntities, setExtractedEntities] = useState<{
    bank: string;
    amount: string;
    fraudType: string;
    utr: string;
    suspectPhone: string;
  }>({
    bank: 'State Bank of India (SBI)',
    amount: '₹75,000',
    fraudType: 'Bank KYC APK / Remote Access Scam',
    utr: '423189041289',
    suspectPhone: '+91 98765 43210'
  });

  const [customVoiceInput, setCustomVoiceInput] = useState('');
  const [waveformHeights, setWaveformHeights] = useState<number[]>([40, 60, 80, 50, 90, 70, 45, 65, 85, 30, 95, 60, 40, 75, 55, 35]);
  const logEndRef = useRef<HTMLDivElement>(null);

  // Dynamic waveform simulation
  useEffect(() => {
    if (!isListening) return;
    const interval = setInterval(() => {
      setWaveformHeights(prev =>
        prev.map(() => Math.floor(Math.random() * 75) + 20)
      );
    }, 120);
    return () => clearInterval(interval);
  }, [isListening]);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [voiceLogs]);

  const handleSimulateSpeech = (text: string, presetEntities?: Partial<typeof extractedEntities>) => {
    if (!text.trim()) return;
    const now = new Date().toLocaleTimeString();
    const newLogs: VoiceLogEntry[] = [
      ...voiceLogs,
      { time: now, speaker: 'victim', text: text.trim() }
    ];
    setVoiceLogs(newLogs);
    setCustomVoiceInput('');

    if (presetEntities) {
      setExtractedEntities(prev => ({
        ...prev,
        ...presetEntities
      }));
      if (onAutoPopulateBankDetails) {
        onAutoPopulateBankDetails({
          victimBank: presetEntities.bank || extractedEntities.bank,
          amountLost: presetEntities.amount || extractedEntities.amount,
          transactionIdOrUtr: presetEntities.utr || extractedEntities.utr,
          suspectPhoneNumber: presetEntities.suspectPhone || extractedEntities.suspectPhone
        });
      }
    }

    // Update parent narrative draft
    const fullSpeech = newLogs
      .filter(l => l.speaker === 'victim')
      .map(l => l.text)
      .join(' ');
    onUpdateNarrative(fullSpeech);

    // Agent response simulation
    setTimeout(() => {
      setVoiceLogs(prev => [
        ...prev,
        {
          time: new Date().toLocaleTimeString(),
          speaker: 'agent',
          text: 'Details parsed. Bank Nodal transmission queue has been pre-configured with the extracted UTR and amount.'
        }
      ]);
    }, 900);
  };

  const handleFinishVoice = () => {
    const fullSpeech = voiceLogs
      .filter(l => l.speaker === 'victim')
      .map(l => l.text)
      .join(' ');
    if (fullSpeech) {
      onUpdateNarrative(fullSpeech);
    }
    onNavigate('narrative');
  };

  return (
    <div className="w-full max-w-[1100px] mx-auto px-4 sm:px-6 pt-24 sm:pt-32 pb-16 space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#112240] border border-[#5ffbd6]/40 text-[#5ffbd6] text-xs font-mono tracking-widest uppercase">
          <Radio className="w-3.5 h-3.5 animate-pulse" />
          Step 1: Senior Citizen Voice Assistant
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Speak in Your Own Words
        </h1>
        <p className="text-sm text-[#bacac3] max-w-xl mx-auto font-sans">
          No complicated forms to fill. Speak in Hindi, English, or Hinglish. Our AI listens, transcribes, and extracts all required banking information for 1930 reporting.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Voice Radar & Live Entity Extraction (5 Cols) */}
        <div className="lg:col-span-5 glass-panel rounded-2xl p-6 border border-[#233554] space-y-5 flex flex-col items-center justify-center text-center relative overflow-hidden">
          {/* Animated Pulsing Ring container */}
          <div className="relative w-40 h-40 flex items-center justify-center my-2">
            {isListening && (
              <>
                <div className="absolute inset-0 rounded-full border border-[#5ffbd6]/20 pulse-ring" />
                <div className="absolute inset-4 rounded-full border border-[#5ffbd6]/30 pulse-ring" style={{ animationDelay: '0.8s' }} />
                <div className="absolute inset-8 rounded-full border border-[#5ffbd6]/40 pulse-ring" style={{ animationDelay: '1.6s' }} />
              </>
            )}

            {/* Central Microphone Button */}
            <button
              onClick={() => setIsListening(!isListening)}
              className={`w-24 h-24 rounded-full border-2 flex items-center justify-center transition-all z-10 ${
                isListening
                  ? 'bg-[#112240] border-[#5ffbd6] text-[#5ffbd6] shadow-[0_0_35px_rgba(95,251,214,0.5)] scale-105'
                  : 'bg-[#112240]/60 border-[#233554] text-[#bacac3] hover:border-[#5ffbd6]/40'
              }`}
              title={isListening ? 'Pause Microphone' : 'Resume Microphone'}
            >
              {isListening ? (
                <Mic className="w-10 h-10 animate-pulse text-[#5ffbd6]" />
              ) : (
                <MicOff className="w-10 h-10 text-[#bacac3]" />
              )}
            </button>
          </div>

          {/* Status Label */}
          <div className="space-y-1">
            <div className="font-mono text-xs uppercase font-bold tracking-wider text-white flex items-center justify-center gap-2">
              <span className={`w-2 h-2 rounded-full ${isListening ? 'bg-[#5ffbd6] animate-ping' : 'bg-[#bacac3]'}`} />
              <span>{isListening ? 'AI Assistant Listening (Hindi/English)...' : 'Microphone Paused'}</span>
            </div>
            <p className="text-xs text-[#bacac3] font-mono">
              {isListening ? 'Speak naturally without worrying about technical terms' : 'Click mic to resume speaking'}
            </p>
          </div>

          {/* Real-time Dynamic Waveform visualizer */}
          <div className="w-full bg-[#071324] border border-[#233554] rounded-xl p-3 flex items-center justify-center gap-1.5 h-12">
            {waveformHeights.map((h, idx) => (
              <div
                key={idx}
                className="w-1.5 rounded-full transition-all duration-100"
                style={{
                  height: isListening ? `${h}%` : '15%',
                  backgroundColor: isListening ? '#5ffbd6' : '#233554',
                  opacity: isListening ? 0.7 + (idx % 2) * 0.3 : 0.3
                }}
              />
            ))}
          </div>

          {/* Live AI Extracted Entities Box */}
          <div className="w-full text-left space-y-2.5 p-4 rounded-xl bg-[#081528] border border-[#5ffbd6]/30">
            <div className="flex items-center justify-between text-[11px] font-mono font-bold text-[#5ffbd6] uppercase">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                AI Auto-Extracted Details
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#5ffbd6]/15 text-[#5ffbd6]">Live</span>
            </div>

            <div className="space-y-1.5 text-xs font-mono">
              <div className="flex justify-between py-1 border-b border-[#233554]/60">
                <span className="text-[#bacac3] flex items-center gap-1">
                  <Building2 className="w-3 h-3 text-[#5ffbd6]" />
                  Bank:
                </span>
                <span className="text-white font-bold">{extractedEntities.bank}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-[#233554]/60">
                <span className="text-[#bacac3] flex items-center gap-1">
                  <IndianRupee className="w-3 h-3 text-[#ffb4ab]" />
                  Amount Lost:
                </span>
                <span className="text-[#ffb4ab] font-bold">{extractedEntities.amount}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-[#233554]/60">
                <span className="text-[#bacac3] flex items-center gap-1">
                  <Hash className="w-3 h-3 text-[#5ffbd6]" />
                  UTR / Ref:
                </span>
                <span className="text-white font-bold">{extractedEntities.utr}</span>
              </div>

              <div className="flex justify-between py-1">
                <span className="text-[#bacac3] flex items-center gap-1">
                  <Shield className="w-3 h-3 text-[#5ffbd6]" />
                  Fraud Type:
                </span>
                <span className="text-[#5ffbd6] font-bold truncate max-w-[180px]">{extractedEntities.fraudType}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live Transcription Stream (7 Cols) */}
        <div className="lg:col-span-7 glass-panel rounded-2xl p-6 border border-[#233554] space-y-4 flex flex-col justify-between min-h-[480px]">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#233554] pb-3">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#5ffbd6]" />
              <span className="font-mono text-xs uppercase tracking-wider text-white font-bold">
                Live Voice Transcript & AI Triage
              </span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#5ffbd6]/10 text-[#5ffbd6] border border-[#5ffbd6]/30">
              1930 Synced
            </span>
          </div>

          {/* Dialogue Log Box */}
          <div className="space-y-3.5 max-h-80 overflow-y-auto pr-1">
            {voiceLogs.map((log, index) => (
              <div
                key={index}
                className={`p-3.5 rounded-xl border text-xs font-sans leading-relaxed ${
                  log.speaker === 'agent'
                    ? 'bg-[#081528] border-[#233554] text-[#d6e3ff]'
                    : 'bg-[#112240] border-[#5ffbd6]/30 text-white ml-4 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between font-mono text-[10px] uppercase text-[#bacac3] mb-1">
                  <span className={log.speaker === 'agent' ? 'text-[#5ffbd6] font-bold' : 'text-white font-bold'}>
                    {log.speaker === 'agent' ? '1930 Cyber AI Assistant' : 'Your Dictation (Spoken)'}
                  </span>
                  <span>{log.time}</span>
                </div>
                <p className="text-sm leading-relaxed">{log.text}</p>
              </div>
            ))}
            <div ref={logEndRef} />
          </div>

          {/* Quick Voice Simulation Buttons (For testing various fraud types) */}
          <div className="space-y-2 pt-2 border-t border-[#233554]">
            <div className="flex gap-2">
              <input
                type="text"
                value={customVoiceInput}
                onChange={(e) => setCustomVoiceInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSimulateSpeech(customVoiceInput)}
                placeholder="Say or type anything about what happened..."
                className="flex-1 bg-[#071324] border border-[#233554] focus:border-[#5ffbd6] focus:outline-none rounded-lg px-3.5 py-2.5 text-xs font-mono text-white"
              />
              <button
                type="button"
                onClick={() => handleSimulateSpeech(customVoiceInput)}
                className="bg-[#112240] hover:bg-[#1c2a41] border border-[#5ffbd6]/40 text-[#5ffbd6] font-mono text-xs px-4 py-2.5 rounded-lg uppercase tracking-wider font-semibold transition-colors shrink-0"
              >
                Dictate
              </button>
            </div>

            {/* Quick Test Scenarios */}
            <div className="flex flex-wrap gap-1.5 text-[11px] font-mono text-[#bacac3]">
              <span className="text-[10px] text-[#bacac3]/70 self-center">Test voice cases:</span>
              <button
                onClick={() => handleSimulateSpeech('My father received a call from +91 9876543210 saying HDFC credit card reward points are expiring. They asked for OTP and deducted ₹42,000.', { bank: 'HDFC Bank', amount: '₹42,000', fraudType: 'Card OTP Scam', suspectPhone: '+91 98765 43210' })}
                className="px-2 py-1 rounded bg-[#112240] border border-[#233554] hover:border-[#5ffbd6]/40 hover:text-white transition-colors"
              >
                + HDFC OTP Scam (₹42k)
              </button>
              <button
                onClick={() => handleSimulateSpeech('I transferred ₹30,000 on Google Pay to UPI ID taskworker@paytm for a part-time hotel review job on Telegram.', { bank: 'ICICI Bank', amount: '₹30,000', fraudType: 'Telegram Task Scam', utr: 'ICIC99812401' })}
                className="px-2 py-1 rounded bg-[#112240] border border-[#233554] hover:border-[#5ffbd6]/40 hover:text-white transition-colors"
              >
                + Telegram Task Scam (₹30k)
              </button>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row gap-3 pt-3 border-t border-[#233554]">
            <button
              onClick={() => onNavigate('narrative')}
              className="flex-1 bg-[#112240] hover:bg-[#1c2a41] text-[#CCD6F6] hover:text-white border border-[#233554] px-4 py-3 rounded-lg font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
            >
              <FileText className="w-4 h-4 text-[#5ffbd6]" />
              <span>Review Form & Bank Details</span>
            </button>

            <button
              onClick={handleFinishVoice}
              className="flex-1 bg-[#5ffbd6] hover:bg-[#38debb] text-[#041329] font-bold px-4 py-3 rounded-lg font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(95,251,214,0.3)] transition-all"
            >
              <span>Next: Confirm Bank Details</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

