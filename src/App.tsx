/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RotateCcw, ShieldCheck } from 'lucide-react';
import { AppScreen, ComplaintData, EvidenceItem } from './types';
import { DEFAULT_COMPLAINT } from './data/mockData';
import { TopNavbar } from './components/TopNavbar';
import { Footer } from './components/Footer';
import { ProgressStepper } from './components/common/ProgressStepper';
import { ImmediateHelpModal } from './components/modals/ImmediateHelpModal';
import { HomeScreen } from './components/screens/HomeScreen';
import { AuthScreen } from './components/screens/AuthScreen';
import { SelectInputScreen } from './components/screens/SelectInputScreen';
import { VoiceInputScreen } from './components/screens/VoiceInputScreen';
import { NarrativeScreen } from './components/screens/NarrativeScreen';
import { EvidenceScreen } from './components/screens/EvidenceScreen';
import { SummaryScreen } from './components/screens/SummaryScreen';
import { ConfirmationScreen } from './components/screens/ConfirmationScreen';
import { CaseTrackerScreen } from './components/screens/CaseTrackerScreen';
import { triggerCaseCreatedNotification, triggerBankLienUpdateNotification } from './utils/notificationService';

const REPORTING_FLOW_SCREENS: AppScreen[] = [
  'select_input',
  'voice_input',
  'narrative',
  'evidence',
  'summary',
  'confirmation'
];

const STORAGE_KEYS = {
  COMPLAINT: '1930_cfcfrms_complaint_data',
  SCREEN: '1930_cfcfrms_current_screen',
  CONTRAST: '1930_cfcfrms_high_contrast',
  SENIOR: '1930_cfcfrms_senior_mode'
};

export default function App() {
  const [complaintData, setComplaintData] = useState<ComplaintData>(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEYS.COMPLAINT);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Error reading complaint from sessionStorage:', e);
    }
    return DEFAULT_COMPLAINT;
  });

  const [currentScreen, setCurrentScreen] = useState<AppScreen>(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEYS.SCREEN) as AppScreen;
      if (saved && ['home', 'auth', 'select_input', 'voice_input', 'narrative', 'evidence', 'summary', 'confirmation', 'case_tracker'].includes(saved)) {
        return saved;
      }
    } catch (e) {
      console.warn('Error reading screen from sessionStorage:', e);
    }
    return 'home';
  });

  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [authenticatedOfficer, setAuthenticatedOfficer] = useState<string | null>(null);

  const [isHighContrast, setIsHighContrast] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(STORAGE_KEYS.CONTRAST) === 'true';
    } catch (e) {
      return false;
    }
  });

  const [isSeniorMode, setIsSeniorMode] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(STORAGE_KEYS.SENIOR) === 'true';
    } catch (e) {
      return false;
    }
  });

  const [showRestoredBanner, setShowRestoredBanner] = useState<boolean>(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEYS.COMPLAINT);
      if (!saved) return false;
      // Only show banner if saved data differs from the default complaint
      const parsed = JSON.parse(saved);
      return parsed && parsed.narrative !== DEFAULT_COMPLAINT.narrative;
    } catch (e) {
      return false;
    }
  });

  // Sync state to sessionStorage whenever it updates
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEYS.COMPLAINT, JSON.stringify(complaintData));
    } catch (e) {
      console.warn('Failed to persist complaint to sessionStorage', e);
    }
  }, [complaintData]);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEYS.SCREEN, currentScreen);
    } catch (e) {}
    // Scroll to top of the page immediately whenever screen changes
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [currentScreen]);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEYS.CONTRAST, String(isHighContrast));
    } catch (e) {}
    if (isHighContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  }, [isHighContrast]);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEYS.SENIOR, String(isSeniorMode));
    } catch (e) {}
  }, [isSeniorMode]);

  const handleNavigate = (screen: AppScreen) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleSeniorMode = () => {
    setIsSeniorMode(prev => !prev);
  };

  const handleToggleHighContrast = () => {
    setIsHighContrast(prev => !prev);
  };

  const handleResetSession = () => {
    sessionStorage.removeItem(STORAGE_KEYS.COMPLAINT);
    sessionStorage.removeItem(STORAGE_KEYS.SCREEN);
    setComplaintData(DEFAULT_COMPLAINT);
    setCurrentScreen('home');
    setShowRestoredBanner(false);
  };

  const handleUpdateComplaint = (updated: Partial<ComplaintData>) => {
    setComplaintData(prev => ({
      ...prev,
      ...updated
    }));
  };

  const handleUpdateEvidence = (list: EvidenceItem[], isSyntheticConfirmed: boolean) => {
    setComplaintData(prev => ({
      ...prev,
      evidenceList: list,
      isSyntheticConfirmed
    }));
  };

  const handleSelectIntakeMethod = (method: 'voice' | 'text') => {
    if (method === 'voice') {
      setCurrentScreen('voice_input');
    } else {
      setCurrentScreen('narrative');
    }
  };

  const handleUpdateBankDetails = (details: Partial<ComplaintData['bankDetails']>) => {
    setComplaintData(prev => ({
      ...prev,
      bankDetails: {
        ...prev.bankDetails,
        ...details
      }
    }));
  };

  const handleFinalizeSubmission = () => {
    const states = ['DL', 'MH', 'KA', 'UP', 'TN', 'GJ', 'WB', 'TS'];
    const randomState = states[Math.floor(Math.random() * states.length)];
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newCaseId = `1930-2026-${randomNum}-${randomState}`;
    
    setComplaintData(prev => ({
      ...prev,
      caseId: newCaseId,
      acknowledgementNo: `ACK-CFCFRMS-2026-${Math.floor(100000 + Math.random() * 900000)}`,
      status: 'Lien Transmitted to Recipient Bank',
      createdAt: new Date().toISOString()
    }));

    // Trigger Native HTML5 Desktop Browser Notification
    triggerCaseCreatedNotification(newCaseId, complaintData.financialLoss || '₹75,000');

    // Simulate automated bank response alert after 4.5 seconds
    setTimeout(() => {
      triggerBankLienUpdateNotification(newCaseId, complaintData.bankDetails?.victimBank || 'State Bank of India (SBI)');
    }, 4500);

    setCurrentScreen('confirmation');
  };

  const handleLoginSuccess = (officerId: string) => {
    setAuthenticatedOfficer(officerId);
    setComplaintData(prev => ({
      ...prev,
      officerId
    }));
    setCurrentScreen('case_tracker');
  };

  const isReportingFlow = REPORTING_FLOW_SCREENS.includes(currentScreen);

  return (
    <div className={`min-h-screen bg-[#041329] text-[#d6e3ff] flex flex-col relative overflow-x-hidden cyber-grid font-sans selection:bg-[#5ffbd6] selection:text-[#041329] ${isHighContrast ? 'high-contrast' : ''} ${isSeniorMode ? 'text-base sm:text-lg leading-relaxed' : ''}`}>
      {/* Background Ambience Glow */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-[#5ffbd6]/5 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-1/4 w-[600px] h-[600px] bg-[#112240]/40 rounded-full blur-[160px] pointer-events-none -z-10" />

      {/* Emergency Crisis Guide Modal */}
      <ImmediateHelpModal
        isOpen={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)}
      />

      {/* Unified Top Navigation Header */}
      <TopNavbar
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        onOpenHelp={() => setIsHelpModalOpen(true)}
        caseId={complaintData.caseId}
        isSeniorMode={isSeniorMode}
        onToggleSeniorMode={handleToggleSeniorMode}
        isHighContrast={isHighContrast}
        onToggleHighContrast={handleToggleHighContrast}
        authenticatedOfficer={authenticatedOfficer}
        onLogout={() => {
          setAuthenticatedOfficer(null);
          handleNavigate('home');
        }}
      />

      {/* Session Restored Auto-Recovery Toast / Banner (Discreet) */}
      {showRestoredBanner && currentScreen !== 'confirmation' && (
        <div className="fixed bottom-4 left-4 z-40 max-w-sm glass-panel rounded-xl p-3 border border-[#5ffbd6]/40 bg-[#041329]/95 shadow-2xl flex items-center justify-between gap-3 text-xs font-mono backdrop-blur-xl">
          <div className="flex items-center gap-2 text-white">
            <ShieldCheck className="w-4 h-4 text-[#5ffbd6] shrink-0" />
            <span className="text-[11px] text-[#bacac3]">Draft auto-saved & restored from session.</span>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={handleResetSession}
              title="Clear sessionStorage and reset form"
              className="px-2 py-1 rounded bg-[#112240] hover:bg-[#93000a] text-[#ffb4ab] text-[10px] flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
            <button
              onClick={() => setShowRestoredBanner(false)}
              className="px-2 py-1 rounded text-[#bacac3] hover:text-white text-[10px]"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Persistent Visual Progress Stepper for Reporting Flow */}
      {isReportingFlow && (
        <div className="pt-24 sm:pt-28 w-full">
          <ProgressStepper
            currentScreen={currentScreen}
            onNavigate={handleNavigate}
            isSeniorMode={isSeniorMode}
          />
        </div>
      )}

      {/* Main Screen Content View with Framer Motion transitions */}
      <main className={`flex-1 flex flex-col items-center w-full ${!isReportingFlow ? 'pt-20 sm:pt-28' : 'pt-0'}`}>
        <AnimatePresence mode="wait">
          {currentScreen === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              className="w-full flex flex-col items-center"
            >
              <HomeScreen
                onNavigate={handleNavigate}
                onOpenHelp={() => setIsHelpModalOpen(true)}
                caseCount={1482}
              />
            </motion.div>
          )}

          {currentScreen === 'auth' && (
            <motion.div
              key="auth"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              className="w-full flex flex-col items-center"
            >
              <AuthScreen
                onLoginSuccess={handleLoginSuccess}
                onNavigate={handleNavigate}
                initialOfficerId={authenticatedOfficer}
              />
            </motion.div>
          )}

          {currentScreen === 'select_input' && (
            <motion.div
              key="select_input"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              className="w-full flex flex-col items-center"
            >
              <SelectInputScreen
                onSelectMethod={handleSelectIntakeMethod}
                onNavigate={handleNavigate}
              />
            </motion.div>
          )}

          {currentScreen === 'voice_input' && (
            <motion.div
              key="voice_input"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              className="w-full flex flex-col items-center"
            >
              <VoiceInputScreen
                currentNarrative={complaintData.narrative}
                onUpdateNarrative={(text) => handleUpdateComplaint({ narrative: text })}
                onNavigate={handleNavigate}
                onAutoPopulateBankDetails={handleUpdateBankDetails}
              />
            </motion.div>
          )}

          {currentScreen === 'narrative' && (
            <motion.div
              key="narrative"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              className="w-full flex flex-col items-center"
            >
              <NarrativeScreen
                complaintData={complaintData}
                onUpdateComplaint={handleUpdateComplaint}
                onNavigate={handleNavigate}
              />
            </motion.div>
          )}

          {currentScreen === 'evidence' && (
            <motion.div
              key="evidence"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              className="w-full flex flex-col items-center"
            >
              <EvidenceScreen
                complaintData={complaintData}
                onUpdateEvidence={handleUpdateEvidence}
                onNavigate={handleNavigate}
              />
            </motion.div>
          )}

          {currentScreen === 'summary' && (
            <motion.div
              key="summary"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              className="w-full flex flex-col items-center"
            >
              <SummaryScreen
                complaintData={complaintData}
                onFinalizeSubmission={handleFinalizeSubmission}
                onNavigate={handleNavigate}
              />
            </motion.div>
          )}

          {currentScreen === 'confirmation' && (
            <motion.div
              key="confirmation"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              className="w-full flex flex-col items-center"
            >
              <ConfirmationScreen
                complaintData={complaintData}
                onNavigate={handleNavigate}
              />
            </motion.div>
          )}

          {currentScreen === 'case_tracker' && (
            <motion.div
              key="case_tracker"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              className="w-full flex flex-col items-center"
            >
              <CaseTrackerScreen
                activeCase={complaintData}
                onNavigate={handleNavigate}
                authenticatedOfficer={authenticatedOfficer}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Unified Standardized Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenHelp={() => setIsHelpModalOpen(true)}
      />
    </div>
  );
}
