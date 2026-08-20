/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppScreen, ComplaintData, EvidenceItem } from './types';
import { DEFAULT_COMPLAINT } from './data/mockData';
import { TopNavbar } from './components/TopNavbar';
import { Footer } from './components/Footer';
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

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('home');
  const [complaintData, setComplaintData] = useState<ComplaintData>(DEFAULT_COMPLAINT);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [authenticatedOfficer, setAuthenticatedOfficer] = useState<string | null>(null);
  const [isSeniorMode, setIsSeniorMode] = useState(false);

  const handleNavigate = (screen: AppScreen) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleSeniorMode = () => {
    setIsSeniorMode(prev => !prev);
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

  return (
    <div className={`min-h-screen bg-[#041329] text-[#d6e3ff] flex flex-col relative overflow-x-hidden cyber-grid font-sans selection:bg-[#5ffbd6] selection:text-[#041329] ${isSeniorMode ? 'text-base sm:text-lg leading-relaxed' : ''}`}>
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
      />

      {/* Main Screen Content View */}
      <main className="flex-1 flex flex-col items-center w-full">
        {currentScreen === 'home' && (
          <HomeScreen
            onNavigate={handleNavigate}
            onOpenHelp={() => setIsHelpModalOpen(true)}
            caseCount={1482}
          />
        )}

        {currentScreen === 'auth' && (
          <AuthScreen
            onLoginSuccess={handleLoginSuccess}
            onNavigate={handleNavigate}
          />
        )}

        {currentScreen === 'select_input' && (
          <SelectInputScreen
            onSelectMethod={handleSelectIntakeMethod}
            onNavigate={handleNavigate}
          />
        )}

        {currentScreen === 'voice_input' && (
          <VoiceInputScreen
            currentNarrative={complaintData.narrative}
            onUpdateNarrative={(text) => handleUpdateComplaint({ narrative: text })}
            onNavigate={handleNavigate}
          />
        )}

        {currentScreen === 'narrative' && (
          <NarrativeScreen
            complaintData={complaintData}
            onUpdateComplaint={handleUpdateComplaint}
            onNavigate={handleNavigate}
          />
        )}

        {currentScreen === 'evidence' && (
          <EvidenceScreen
            complaintData={complaintData}
            onUpdateEvidence={handleUpdateEvidence}
            onNavigate={handleNavigate}
          />
        )}

        {currentScreen === 'summary' && (
          <SummaryScreen
            complaintData={complaintData}
            onFinalizeSubmission={handleFinalizeSubmission}
            onNavigate={handleNavigate}
          />
        )}

        {currentScreen === 'confirmation' && (
          <ConfirmationScreen
            complaintData={complaintData}
            onNavigate={handleNavigate}
          />
        )}

        {currentScreen === 'case_tracker' && (
          <CaseTrackerScreen
            activeCase={complaintData}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Unified Standardized Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenHelp={() => setIsHelpModalOpen(true)}
      />
    </div>
  );
}
