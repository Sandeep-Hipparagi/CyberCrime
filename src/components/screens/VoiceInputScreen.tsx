import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  CheckCircle2,
  Sparkles,
  MessageSquare,
  Radio,
  IndianRupee,
  Building2,
  Shield,
  Hash,
  Languages,
  User,
  ArrowRight,
  FileText,
  Loader2
} from 'lucide-react';
import { AppScreen, VoiceLogEntry, ComplaintData } from '../../types';
import {
  SARVAM_LANGUAGES,
  SARVAM_SPEAKERS,
  speakSarvamVoice,
  stopSarvamAudio,
  parseIncidentWithSarvam
} from '../../utils/sarvamService';

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
  const [isListening, setIsListening] = useState(false);
  const [selectedLang, setSelectedLang] = useState('hi-IN');
  const [selectedSpeaker, setSelectedSpeaker] = useState('meera');
  const [isSpeakingTts, setIsSpeakingTts] = useState<number | null>(null);
  const [isProcessingAudio, setIsProcessingAudio] = useState(false);
  const [recognitionActive, setRecognitionActive] = useState(false);

  const [voiceLogs, setVoiceLogs] = useState<VoiceLogEntry[]>([
    {
      time: '10:45:02',
      speaker: 'agent',
      text: 'नमस्ते। मैं आपका 1930 साइबर वित्तीय धोखाधड़ी AI सहायक हूँ। कृपया बताइए आपके साथ क्या हुआ, किस बैंक या UPI ऐप से पैसे कटे, और कुल कितनी राशि का फ्रॉड हुआ?'
    },
    {
      time: '10:45:15',
      speaker: 'victim',
      text: 'Someone called claiming to be SBI KYC manager. They sent an APK app link on WhatsApp. When I installed it, ₹75,000 was debited via UPI Ref 423189041289 to cyberfrauder@ybl.'
    },
    {
      time: '10:45:28',
      speaker: 'agent',
      text: 'विवरण दर्ज कर लिया गया है: SBI बैंक खाता, ₹75,000 राशि, तथा UTR संदर्भ 423189041289। बैंक नोडल लीन फ़्रीज़ कतार सक्रिय कर दी गई है।'
    }
  ]);

  const [extractedEntities, setExtractedEntities] = useState<{
    bank: string;
    amount: string;
    fraudType: string;
    utr: string;
    suspectPhone: string;
    suspectUpiOrAccount?: string;
  }>({
    bank: 'State Bank of India (SBI)',
    amount: '₹75,000',
    fraudType: 'Bank KYC APK / Remote Access Scam',
    utr: '423189041289',
    suspectPhone: '+91 98765 43210',
    suspectUpiOrAccount: 'cyberfrauder@ybl'
  });

  const [customVoiceInput, setCustomVoiceInput] = useState('');
  const [waveformHeights, setWaveformHeights] = useState<number[]>([35, 55, 75, 45, 90, 65, 40, 60, 80, 25, 95, 50, 35, 70, 50, 30]);
  const logEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Dynamic waveform simulation when active
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

  // Clean up audio & speech recognition on unmount
  useEffect(() => {
    return () => {
      stopSarvamAudio();
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {}
      }
    };
  }, []);

  // Web Speech Recognition for live microphone input
  const startLiveDictation = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn('SpeechRecognition not supported, using simulated speech flow.');
      setIsListening(true);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = selectedLang;

      recognition.onstart = () => {
        setIsListening(true);
        setRecognitionActive(true);
      };

      recognition.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }

        if (finalTranscript) {
          handleIncomingVoiceText(finalTranscript);
        } else if (interimTranscript) {
          setCustomVoiceInput(interimTranscript);
        }
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        setRecognitionActive(false);
      };

      recognition.onend = () => {
        setRecognitionActive(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (e) {
      console.warn('Failed to start SpeechRecognition:', e);
      setIsListening(true);
    }
  };

  const stopLiveDictation = () => {
    setIsListening(false);
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
    }
  };

  const toggleListening = () => {
    if (isListening) {
      stopLiveDictation();
    } else {
      startLiveDictation();
    }
  };

  const handleIncomingVoiceText = async (spokenText: string) => {
    if (!spokenText.trim()) return;
    const now = new Date().toLocaleTimeString();

    const victimEntry: VoiceLogEntry = { time: now, speaker: 'victim', text: spokenText.trim() };

    // Use functional update to avoid stale closure over voiceLogs
    setVoiceLogs(prevLogs => {
      const newLogs = [...prevLogs, victimEntry];

      // Update parent narrative draft from the latest logs
      const fullSpeech = newLogs
        .filter(l => l.speaker === 'victim')
        .map(l => l.text)
        .join(' ');
      onUpdateNarrative(fullSpeech);

      return newLogs;
    });
    setCustomVoiceInput('');

    // Extract financial entities using Sarvam backend parser
    setIsProcessingAudio(true);
    const parsed = await parseIncidentWithSarvam(spokenText);
    setIsProcessingAudio(false);

    setExtractedEntities(prev => ({
      ...prev,
      ...parsed
    }));

    if (onAutoPopulateBankDetails) {
      onAutoPopulateBankDetails({
        victimBank: parsed.bank || undefined,
        amountLost: parsed.amount || undefined,
        transactionIdOrUtr: parsed.utr || undefined,
        suspectPhoneNumber: parsed.suspectPhone || undefined,
        suspectUpiOrAccount: parsed.suspectUpiOrAccount || undefined
      });
    }

    // Agent response in selected Sarvam language
    setTimeout(() => {
      const isHindi = selectedLang.startsWith('hi');
      const ackText = isHindi
        ? `विवरण अपडेट हुआ: ${parsed.bank || 'बैंक'}, राशि ${parsed.amount || '₹75,000'}, UTR ${parsed.utr || 'प्राप्त'}। नोडल कतार तैयार है।`
        : `Details registered: ${parsed.bank || 'Bank'}, Amount ${parsed.amount || '₹75,000'}, UTR ${parsed.utr || 'Received'}. Bank lien transmission queue updated.`;

      setVoiceLogs(prev => [
        ...prev,
        {
          time: new Date().toLocaleTimeString(),
          speaker: 'agent',
          text: ackText
        }
      ]);
    }, 700);
  };

  const handlePlayMessageVoice = (text: string, index: number) => {
    if (isSpeakingTts === index) {
      stopSarvamAudio();
      setIsSpeakingTts(null);
      return;
    }

    setIsSpeakingTts(index);
    speakSarvamVoice(
      text,
      selectedLang,
      selectedSpeaker,
      () => setIsSpeakingTts(index),
      () => setIsSpeakingTts(null)
    );
  };

  const handleFinishVoice = () => {
    stopSarvamAudio();
    stopLiveDictation();

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
    <div className="w-full max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-16 space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#112240] border border-[#5ffbd6]/40 text-[#5ffbd6] text-xs font-mono tracking-widest uppercase shadow-[0_0_15px_rgba(95,251,214,0.15)]">
          <Radio className="w-3.5 h-3.5 animate-pulse text-[#5ffbd6]" />
          <span>Sarvam AI Indian Voice Intake (11 Languages)</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
          Speak in Your Native Language
        </h1>
        <p className="text-xs sm:text-sm text-[#bacac3] max-w-2xl mx-auto font-sans leading-relaxed">
          Powered by Sarvam AI speech models. Speak naturally in Hindi, English, Tamil, Telugu, Bengali, Kannada, Marathi, or any Indian regional language.
        </p>
      </div>

      {/* Sarvam Language & Voice Selector Control Bar */}
      <div className="glass-panel rounded-2xl p-4 sm:p-5 border border-[#233554] bg-[#071324]/90 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shadow-md">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
          {/* Language picker */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Languages className="w-4 h-4 text-[#5ffbd6] shrink-0" />
            <span className="text-xs font-mono text-[#bacac3] whitespace-nowrap hidden sm:inline">Language:</span>
            <select
              value={selectedLang}
              onChange={(e) => setSelectedLang(e.target.value)}
              className="bg-[#0b1b2f] border border-[#233554] focus:border-[#5ffbd6] focus:outline-none rounded-xl px-3 py-2 text-xs font-mono text-white w-full sm:w-auto cursor-pointer"
            >
              {SARVAM_LANGUAGES.map(lang => (
                <option key={lang.code} value={lang.code}>
                  {lang.name} ({lang.nativeName})
                </option>
              ))}
            </select>
          </div>

          {/* Speaker Voice Picker */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <User className="w-4 h-4 text-[#5ffbd6] shrink-0" />
            <span className="text-xs font-mono text-[#bacac3] whitespace-nowrap hidden sm:inline">Voice:</span>
            <select
              value={selectedSpeaker}
              onChange={(e) => setSelectedSpeaker(e.target.value)}
              className="bg-[#0b1b2f] border border-[#233554] focus:border-[#5ffbd6] focus:outline-none rounded-xl px-3 py-2 text-xs font-mono text-white w-full sm:w-auto cursor-pointer"
            >
              {SARVAM_SPEAKERS.map(spk => (
                <option key={spk.id} value={spk.id}>
                  {spk.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Status Indicator */}
        <div className="flex items-center justify-between sm:justify-end gap-2 text-xs font-mono text-[#5ffbd6] bg-[#112240] px-3 py-1.5 rounded-xl border border-[#5ffbd6]/30 shrink-0">
          <span className="w-2 h-2 rounded-full bg-[#5ffbd6] animate-ping" />
          <span className="font-bold">Sarvam AI Bulbul & Saaras Active</span>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Voice Radar & Live Entity Extraction */}
        <div className="lg:col-span-5 glass-panel rounded-2xl p-5 sm:p-6 border border-[#233554] space-y-5 flex flex-col items-center justify-center text-center relative overflow-hidden">
          {/* Animated Pulsing Ring container */}
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center my-2">
            {isListening && (
              <>
                <div className="absolute inset-0 rounded-full border border-[#5ffbd6]/20 pulse-ring" />
                <div className="absolute inset-3 sm:inset-4 rounded-full border border-[#5ffbd6]/30 pulse-ring" style={{ animationDelay: '0.8s' }} />
                <div className="absolute inset-6 sm:inset-8 rounded-full border border-[#5ffbd6]/40 pulse-ring" style={{ animationDelay: '1.6s' }} />
              </>
            )}

            {/* Central Microphone Button */}
            <button
              onClick={toggleListening}
              className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 flex items-center justify-center transition-all z-10 cursor-pointer ${
                isListening
                  ? 'bg-[#112240] border-[#5ffbd6] text-[#5ffbd6] shadow-[0_0_35px_rgba(95,251,214,0.5)] scale-105'
                  : 'bg-[#112240]/80 border-[#233554] text-[#bacac3] hover:border-[#5ffbd6]/50 hover:text-white'
              }`}
              title={isListening ? 'Stop Speaking' : 'Start Speaking'}
            >
              {isListening ? (
                <Mic className="w-8 h-8 sm:w-10 sm:h-10 animate-pulse text-[#5ffbd6]" />
              ) : (
                <MicOff className="w-8 h-8 sm:w-10 sm:h-10 text-[#bacac3]" />
              )}
            </button>
          </div>

          {/* Status Label */}
          <div className="space-y-1 w-full">
            <div className="font-mono text-xs uppercase font-bold tracking-wider text-white flex items-center justify-center gap-2">
              <span className={`w-2 h-2 rounded-full ${isListening ? 'bg-[#5ffbd6] animate-ping' : 'bg-[#bacac3]'}`} />
              <span>{isListening ? 'Listening via Microphone...' : 'Microphone Paused (Click to Speak)'}</span>
            </div>
            <p className="text-xs text-[#bacac3] font-sans">
              {isListening
                ? 'Speak about the bank, amount lost, UPI app, or SMS details'
                : 'Click the central microphone to speak or type in any language'}
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
          <div className="w-full text-left space-y-2.5 p-4 rounded-xl bg-[#081528] border border-[#5ffbd6]/30 shadow-inner">
            <div className="flex items-center justify-between text-[11px] font-mono font-bold text-[#5ffbd6] uppercase">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Sarvam AI Parsed Incident
              </span>
              {isProcessingAudio ? (
                <span className="flex items-center gap-1 text-[10px] text-[#ffb4ab]">
                  <Loader2 className="w-3 h-3 animate-spin" /> Parsing
                </span>
              ) : (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#5ffbd6]/15 text-[#5ffbd6]">Live</span>
              )}
            </div>

            <div className="space-y-1.5 text-xs font-mono">
              <div className="flex justify-between py-1 border-b border-[#233554]/60">
                <span className="text-[#bacac3] flex items-center gap-1">
                  <Building2 className="w-3 h-3 text-[#5ffbd6]" />
                  Bank:
                </span>
                <span className="text-white font-bold truncate max-w-[180px]">{extractedEntities.bank}</span>
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
                  Modus Operandi:
                </span>
                <span className="text-[#5ffbd6] font-bold truncate max-w-[170px]">{extractedEntities.fraudType}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live Transcription Stream */}
        <div className="lg:col-span-7 glass-panel rounded-2xl p-5 sm:p-6 border border-[#233554] space-y-4 flex flex-col justify-between min-h-[480px]">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#233554] pb-3">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#5ffbd6]" />
              <span className="font-mono text-xs uppercase tracking-wider text-white font-bold">
                Live Speech Dialogue & Sarvam Voice Playback
              </span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#5ffbd6]/10 text-[#5ffbd6] border border-[#5ffbd6]/30">
              1930 Synced
            </span>
          </div>

          {/* Dialogue Log Box */}
          <div className="space-y-3.5 max-h-[300px] sm:max-h-[340px] overflow-y-auto pr-1">
            {voiceLogs.map((log, index) => (
              <div
                key={index}
                className={`p-3.5 rounded-xl border text-xs font-sans leading-relaxed ${
                  log.speaker === 'agent'
                    ? 'bg-[#081528] border-[#233554] text-[#d6e3ff]'
                    : 'bg-[#112240] border-[#5ffbd6]/30 text-white ml-2 sm:ml-4 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between font-mono text-[10px] uppercase text-[#bacac3] mb-1.5">
                  <span className={log.speaker === 'agent' ? 'text-[#5ffbd6] font-bold' : 'text-white font-bold'}>
                    {log.speaker === 'agent' ? '1930 Cyber AI Assistant' : 'Citizen Spoken Statement'}
                  </span>
                  <div className="flex items-center gap-2">
                    <span>{log.time}</span>
                    <button
                      type="button"
                      onClick={() => handlePlayMessageVoice(log.text, index)}
                      className="p-1 rounded bg-[#071324] hover:bg-[#1a2f4c] text-[#5ffbd6] border border-[#5ffbd6]/30 flex items-center gap-1 transition-colors cursor-pointer"
                      title="Play with Sarvam Voice"
                    >
                      {isSpeakingTts === index ? (
                        <>
                          <VolumeX className="w-3 h-3 text-[#ffb4ab] animate-pulse" />
                          <span className="text-[9px] text-[#ffb4ab]">Stop</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3 h-3" />
                          <span className="text-[9px]">Listen</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
                <p className="text-sm leading-relaxed">{log.text}</p>
              </div>
            ))}
            <div ref={logEndRef} />
          </div>

          {/* Dictation Input & Quick Preset Chips */}
          <div className="space-y-2.5 pt-2 border-t border-[#233554]">
            <div className="flex gap-2">
              <input
                type="text"
                value={customVoiceInput}
                onChange={(e) => setCustomVoiceInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleIncomingVoiceText(customVoiceInput)}
                placeholder="Type or dictate what happened in your words..."
                className="flex-1 bg-[#071324] border border-[#233554] focus:border-[#5ffbd6] focus:outline-none rounded-xl px-3.5 py-2.5 text-xs font-mono text-white"
              />
              <button
                type="button"
                onClick={() => handleIncomingVoiceText(customVoiceInput)}
                className="bg-[#112240] hover:bg-[#1c2a41] border border-[#5ffbd6]/40 text-[#5ffbd6] font-mono text-xs px-4 py-2.5 rounded-xl uppercase tracking-wider font-semibold transition-colors shrink-0 cursor-pointer"
              >
                Submit
              </button>
            </div>

            {/* Quick Test Voice Scenarios */}
            <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-mono text-[#bacac3]">
              <span className="text-[10px] text-[#bacac3]/70 self-center">Test voice cases:</span>
              <button
                type="button"
                onClick={() => handleIncomingVoiceText('Call from +91 98765 43210 claiming HDFC credit card reward points are expiring. They asked for OTP and debited ₹42,000 via UTR HDFC9812401.')}
                className="px-2.5 py-1 rounded-lg bg-[#112240] border border-[#233554] hover:border-[#5ffbd6]/40 hover:text-white transition-colors cursor-pointer"
              >
                + HDFC Card OTP (₹42k)
              </button>
              <button
                type="button"
                onClick={() => handleIncomingVoiceText('Paid ₹30,000 on Google Pay to taskworker@paytm for a part-time hotel review job on Telegram with Ref ICIC99812401.')}
                className="px-2.5 py-1 rounded-lg bg-[#112240] border border-[#233554] hover:border-[#5ffbd6]/40 hover:text-white transition-colors cursor-pointer"
              >
                + Telegram Task Scam (₹30k)
              </button>
              <button
                type="button"
                onClick={() => handleIncomingVoiceText('मुझे एसबीआई से फोन आया कि बिजली बिल नहीं भरा तो बिजली कट जाएगी। ऐप डाउनलोड कराया और 85000 कट गए।')}
                className="px-2.5 py-1 rounded-lg bg-[#112240] border border-[#233554] hover:border-[#5ffbd6]/40 hover:text-[#5ffbd6] transition-colors cursor-pointer"
              >
                + Hindi Electricity Scam (₹85k)
              </button>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row gap-3 pt-3 border-t border-[#233554]">
            <button
              onClick={() => onNavigate('narrative')}
              className="flex-1 bg-[#112240] hover:bg-[#1c2a41] text-[#CCD6F6] hover:text-white border border-[#233554] px-4 py-3 rounded-xl font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <FileText className="w-4 h-4 text-[#5ffbd6]" />
              <span>Review Form & Bank Details</span>
            </button>

            <button
              onClick={handleFinishVoice}
              className="flex-1 bg-[#5ffbd6] hover:bg-[#38debb] text-[#041329] font-bold px-4 py-3 rounded-xl font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(95,251,214,0.3)] hover:shadow-[0_0_25px_rgba(95,251,214,0.5)] transition-all cursor-pointer"
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
