import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Eye,
  EyeOff,
  Key,
  AlertTriangle,
  CheckCircle2,
  Building2,
  ScanFace,
  RefreshCw,
  XCircle,
  Zap,
  ArrowRight
} from 'lucide-react';
import { AppScreen } from '../../types';

interface AuthScreenProps {
  onLoginSuccess: (officerId: string) => void;
  onNavigate: (screen: AppScreen) => void;
  initialOfficerId?: string | null;
}

interface DemoPreset {
  id: string;
  roleTitle: string;
  officerId: string;
  password: string;
  department: string;
  badge: string;
}

const DEMO_PRESETS: DemoPreset[] = [
  {
    id: 'sbi',
    roleTitle: 'SBI Bank Nodal Officer',
    officerId: 'NODAL-SBI-0482',
    password: 'CyberFreeze#1930',
    department: 'State Bank of India â€” National Fraud Desk',
    badge: 'BANK'
  },
  {
    id: 'hdfc',
    roleTitle: 'HDFC Bank Vigilance Nodal',
    officerId: 'NODAL-HDFC-9102',
    password: 'SecureLien#HDFC26',
    department: 'HDFC Bank Financial Crime Operations',
    badge: 'BANK'
  },
  {
    id: 'police',
    roleTitle: 'Cyber Police Inspector (I4C LEA)',
    officerId: 'LEAO-I4C-7731',
    password: 'Investigate#66D!',
    department: 'State Cyber Crime Police / I4C MHA Cell',
    badge: 'POLICE'
  },
  {
    id: 'npci',
    roleTitle: 'NPCI / UPI Payment Gateway Desk',
    officerId: 'PG-NPCI-0081',
    password: 'UPIFreeze#2026!',
    department: 'NPCI Immediate Payment Service Nodal Gateway',
    badge: 'UPI'
  },
  {
    id: 'citizen',
    roleTitle: 'Verified Citizen Complainant',
    officerId: 'CITIZEN-1930-USER',
    password: 'CitizenAuth#2026',
    department: 'National Cybercrime Reporting Portal',
    badge: 'USER'
  }
];

export const AuthScreen: React.FC<AuthScreenProps> = ({
  onLoginSuccess,
  onNavigate,
  initialOfficerId
}) => {
  const [officerId, setOfficerId] = useState(initialOfficerId || 'NODAL-SBI-0482');
  const [securityKey, setSecurityKey] = useState('CyberFreeze#1930');
  const [showPassword, setShowPassword] = useState(false);
  const [authSuccess, setAuthSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Biometric Face Scanner State
  const [isFaceModalOpen, setIsFaceModalOpen] = useState(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanStage, setScanStage] = useState<'initializing' | 'detecting' | 'liveness' | 'verifying' | 'matched'>('initializing');
  const videoRef = useRef<HTMLVideoElement>(null);

  // Stop camera on unmount or modal close
  useEffect(() => {
    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [cameraStream]);

  // Select demo preset directly (clean and discreet, no large generator box)
  const handleSelectDemoPreset = (preset: DemoPreset) => {
    setOfficerId(preset.officerId);
    setSecurityKey(preset.password);
    setErrorMessage(null);
  };

  // Generate randomized credentials silently and populate
  const handleGenerateRandom = () => {
    const prefixes = ['NODAL-SBI', 'NODAL-HDFC', 'NODAL-ICICI', 'LEAO-DELHI', 'LEAO-MUMBAI', 'PG-NPCI'];
    const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newId = `${randomPrefix}-${randomNum}`;
    const passWords = ['CyberShield', 'LienFreeze', 'SecureTrace', 'AntiScam'];
    const passSpecial = ['#1930', '!2026', '@MHA', '!FraudZero'];
    const newPass = `${passWords[Math.floor(Math.random() * passWords.length)]}${passSpecial[Math.floor(Math.random() * passSpecial.length)]}`;
    
    setOfficerId(newId);
    setSecurityKey(newPass);
    setErrorMessage(null);
  };

  // Quick 1-click test login
  const handleQuickDemoLogin = (preset: DemoPreset) => {
    setOfficerId(preset.officerId);
    setSecurityKey(preset.password);
    setErrorMessage(null);
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setAuthSuccess(true);
      setTimeout(() => {
        onLoginSuccess(preset.officerId);
      }, 700);
    }, 450);
  };

  const handleStartFaceAuth = async () => {
    setIsFaceModalOpen(true);
    setScanProgress(0);
    setScanStage('initializing');
    setCameraError(null);

    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 480 } }
        });
        setCameraStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } else {
        throw new Error('Camera device API not supported in this environment.');
      }
    } catch (err: any) {
      console.warn('Camera access fallback to simulated secure scanner:', err?.message);
      setCameraError('Live hardware camera blocked. Running Aadhaar FaceRD Biometric Simulator.');
    }

    let current = 0;
    const interval = setInterval(() => {
      current += 5;
      setScanProgress(Math.min(current, 100));

      if (current === 20) setScanStage('detecting');
      if (current === 50) setScanStage('liveness');
      if (current === 80) setScanStage('verifying');
      if (current >= 100) {
        clearInterval(interval);
        setScanStage('matched');
        setTimeout(() => {
          setIsFaceModalOpen(false);
          if (cameraStream) {
            cameraStream.getTracks().forEach(track => track.stop());
          }
          setAuthSuccess(true);
          setTimeout(() => {
            onLoginSuccess(`${officerId} (Aadhaar FaceRD Verified)`);
          }, 800);
        }, 800);
      }
    }, 90);
  };

  const handleCloseFaceModal = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
    setIsFaceModalOpen(false);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!officerId.trim()) {
      setErrorMessage('Please enter an Officer ID or Case Reference.');
      return;
    }

    if (!securityKey.trim()) {
      setErrorMessage('Please enter your Digital Security Password.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setAuthSuccess(true);
      setTimeout(() => {
        onLoginSuccess(officerId);
      }, 700);
    }, 600);
  };

  return (
    <div className="w-full max-w-[560px] mx-auto px-4 sm:px-6 py-6 sm:py-10 flex flex-col items-center justify-center">
      {/* Compact Header */}
      <div className="text-center space-y-2 mb-6 w-full">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#112240] border border-[#5ffbd6]/40 text-[#5ffbd6] text-[11px] font-mono tracking-widest uppercase">
          <Building2 className="w-3.5 h-3.5" />
          <span>CFCFRMS 1930 Nodal Gateway</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Officer & Citizen Sign In
        </h1>
        <p className="text-xs text-[#bacac3] max-w-md mx-auto font-sans">
          Authorized portal for Bank Fraud Desks, Cyber Police LEAs, and Complainants.
        </p>
      </div>

      {/* Main Clean Form */}
      <div className="w-full glass-panel rounded-3xl p-6 sm:p-8 border border-[#233554] shadow-2xl space-y-5 bg-[#07172b]/95">
        {errorMessage && (
          <div className="p-3 rounded-xl bg-[#93000a]/20 border border-[#ffb4ab]/40 text-[#ffb4ab] text-xs font-mono flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {authSuccess ? (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-6 rounded-2xl bg-[#081b2b] border border-[#5ffbd6] text-center space-y-3 shadow-[0_0_30px_rgba(95,251,214,0.25)]"
          >
            <CheckCircle2 className="w-12 h-12 text-[#5ffbd6] mx-auto animate-bounce" />
            <div className="space-y-1">
              <div className="font-mono text-sm font-bold text-white uppercase tracking-wider">
                1930 Clearance Granted
              </div>
              <p className="text-xs text-[#5ffbd6] font-mono">
                Authenticated as <span className="font-bold">{officerId}</span>
              </p>
            </div>
            <p className="text-[11px] text-[#bacac3] font-mono">
              Redirecting to Live Bank Lien Telemetry...
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Officer / User ID Input */}
            <div className="space-y-1">
              <label className="text-xs font-mono uppercase tracking-wider text-[#bacac3] block font-medium">
                Officer ID / Citizen Code
              </label>
              <input
                type="text"
                required
                value={officerId}
                onChange={(e) => setOfficerId(e.target.value)}
                placeholder="e.g. NODAL-SBI-0482 or LEAO-I4C-7731"
                className="w-full bg-[#071324] border border-[#233554] focus:border-[#5ffbd6] focus:outline-none rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-mono text-white tracking-wide transition-all shadow-inner"
              />
            </div>

            {/* Password Input */}
            <div className="space-y-1">
              <div className="flex items-center justifx­tween">
                <label className="text-xs font-mono uppercase tracking-wider text-[#bacac3] block font-medium">
                  Digital Passkey / Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[10px] font-mono text-[#5ffbd6] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                  <span>{showPassword ? 'Hide' : 'Show'}</span>
                </button>
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={securityKey}
                onChange={(e) => setSecurityKey(e.target.value)}
                placeholder="Enter security key"
                className="w-full bg-[#071324] border border-[#233554] focus:border-[#5ffbd6] focus:outline-none rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-mono text-white tracking-wide transition-all shadow-inner"
              />
            </div>

            {/* Fast Demo Autofill Chips (Integrated seamlessly, no large box) */}
            <div className="pt-1 pb-1 space-y-1.5">
              <div className="flex items-center justify-between text-[12px] font-mono text-[#8892b0]">
                <span>Demo Quick-Fill Roles:</span>
                <button
                  type="button"
                  onClick={handleGenerateRandom}
                  className="text-[#5ffbd6] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Randomize</span>
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {DEMO_PRESETS.map((preset) => {
                  const isActive = officerId === preset.officerId;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => handleSelectDemoPreset(preset)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all cursor-pointer border flex items-center gap-1.5 ${{
                        isActive
                          ? 'bg-[#112a47] border-[#5ffbd6] text-[#5ffbd6] font-bold shadow-[0_0_10px_rgba(95,251,214,0.2)]'
                          : 'bg-[#081528] border-[#233554] text-[#bacac3] hover:border-[#5ffbd6]/50 hover:text-white'
                      }}`}
                    >
                      <span className="text-[9px] opacity-70">[{preset.badge}]</span>
                      <span>{preset.roleTitle.split(' ')[0]} {preset.roleTitle.split(' ')[1] || ''}</span>
                    </button>
                  });}
              </div>
            </div>

            {/* Biometric Face Verification */}
            <button
              type="button"
              onClick={handleStartFaceAuth}
              className="w-full p-2.5 rounded-xl bg-[#0a1b2e] hover:bg-[#0f2845] border border-[#5ffbd6]/30 text-white flex items-center justify-between font-mono text-xs transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-2.5">
                <ScanFace className="w-4 h-4 text-[#5ffbd6] group-hover:scale-110 transition-transform" />
                <span className="text-[#bacac3] group-hover:text-white">Aadhaar FaceRD Biometric Login</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#5ffbd6]/20 text-[#5ffbd6] font-bold">
                Live FaceRD
              </span>
            </button>

            {/* Main Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#5ffbd6] hover:bg-[#38debb] text-[#041329] font-bold py-3 rounded-xl font-mono text-xs uppercase tracking-wider flex items-center justifx­center gap-2 shadow-[0_0_20px_rgba(95,251,214,0.25)] hover:shadow-[0_0_25px_rgba(95,251,214,0.4)] active:scale-[0.99] transition-all cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <Key className="w-4 h-4" />
                  <span>Sign In & Access Live Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Direct 1-Click Instant Demo Login */}
            <button
              type="button"
              onClick={() => handleQuickDemoLogin(DEMO_PRESETS[0])}
              className="w-full py-2 rounded-xl bg-[#112240] hover:bg-[#1a335a] border border-[#5ffbd6]/40 text-[#5ffbd6] font-mono text-xs uppercase font-semibold flex items-center justifx­center gap-1.5 transition-all cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>1-Click Instant Demo Login (SBI Nodal)</span>
            </button>

            {/* Back link */}
            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => onNavigate('home')}
                className="text-xs font-mono text-[#bacac3] hover:text-[#5ffbd6] transition-colors cursor-pointer"
              >
                &larr; Return to Citizen 1930 Home
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Biometric Face Modal */}
      <AnimatePresence>
        {isFaceModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justifx­center p-4 bg-[#041329]/85 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#081b2b] border border-[#5ffbd6]/50 rounded-3xl p-6 max-w-sm w-full shadow-2xl relative space-y-4"
            >
              <div className="flex items-center justify-between border-b border-[#233554] pb-3">
                <div className="flex items-center gap-2">
                  <ScanFace className="w-5 h-5 text-[#5ffbd6]" />
                  <h3 className="text-sm font-bold text-white">Face Biometric Scanner</h3>
                </div>
                <button
                  type="button"
                  onClick={handleCloseFaceModal}
                  className="text-[#8892b0] hover:text-white p-1 cursor-pointer"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>

              <div className="relative w-full aspect-square max-w-[240px] mx-auto rounded-2xl overflow-hidden bg-[#041329] border border-[#233554] flex items-center justifx­center">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover mirror transform -scale-x-100"
                />

                {cameraError && (
                  <div className="absolute inset-0 bg-[#07192e] flex flex-col items-center justify-center p-3 text-center">
                    <ScanFace className="w-12 h-12 text-[#5ffbd6]/60 animate-pulse" />
                    <span className="text-[10px] font-mono text-[#8892b0] mt-2">
                      {cameraError}
                    </span>
                  </div>
                )}

                <motion.div
                  animate={{ top: ['10%', '90%', '10%'] }}
                  transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                  className="absolute left-3 right-3 h-[2px] bg-gradient-to-r from-transparent via-[#5ffbd6] to-transparent shadow-[0_0_10px_#5ffbd6] pointer-events-none"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justifx­center text-[11px] font-mono">
                  <span className="text-[#8892b0]">Progress  :</span>
                  <span className="text-[#5ffbd6] font-bold">
                    {scanStage === 'matched' ? 'âœ“ Verified (99.8%)' : `${scanProgress}%`}
                  </span>
                </div>
                <div className="h-1.5 w-full bg-[#112240] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#5ffbd6] to-[#00f2fe] transition-all duration-100"
                    style={{ width: `${scanProgress}%` }}
                  />
                </div>
              </div>
            </motion.div>
         </div>
        )}
      </AnimatePresence>
    </div>
  );
};
