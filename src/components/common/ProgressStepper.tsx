import React from 'react';
import { motion } from 'motion/react';
import { Check, ShieldAlert, FileText, UploadCloud, CheckCircle2, Clock } from 'lucide-react';
import { AppScreen } from '../../types';

interface ProgressStepperProps {
  currentScreen: AppScreen;
  onNavigate?: (screen: AppScreen) => void;
  isSeniorMode?: boolean;
}

interface StepItem {
  id: number;
  label: string;
  shortLabel: string;
  description: string;
  screens: AppScreen[];
  icon: React.ElementType;
}

const REPORTING_STEPS: StepItem[] = [
  {
    id: 1,
    label: 'Incident Narrative',
    shortLabel: 'Narrative',
    description: 'Fraud method & Bank UTR details',
    screens: ['select_input', 'voice_input', 'narrative'],
    icon: FileText
  },
  {
    id: 2,
    label: 'Evidence & Hashing',
    shortLabel: 'Evidence',
    description: 'Screenshots & Sec 65B Checksum',
    screens: ['evidence'],
    icon: UploadCloud
  },
  {
    id: 3,
    label: 'Legal Verification',
    shortLabel: 'Attestation',
    description: 'Golden hour freeze review',
    screens: ['summary'],
    icon: ShieldAlert
  },
  {
    id: 4,
    label: 'Bank Lien Docket',
    shortLabel: 'Case Docket',
    description: '1930 Ack & Nodal Transmission',
    screens: ['confirmation'],
    icon: CheckCircle2
  }
];

export const ProgressStepper: React.FC<ProgressStepperProps> = ({
  currentScreen,
  onNavigate,
  isSeniorMode = false
}) => {
  // Determine current active step index (1-based)
  const currentStepIndex = REPORTING_STEPS.findIndex(step =>
    step.screens.includes(currentScreen)
  );

  if (currentStepIndex === -1) {
    return null; // Not on a reporting flow screen
  }

  const activeStep = currentStepIndex + 1;
  const progressPercentage = ((activeStep - 1) / (REPORTING_STEPS.length - 1)) * 100;

  return (
    <div
      id="reporting-progress-stepper"
      className="w-full max-w-4xl mx-auto px-4 sm:px-6 pt-2 pb-6"
    >
      <div className="bg-[#081b2b]/85 backdrop-blur-xl border border-[#233554]/70 rounded-2xl p-4 sm:p-5 shadow-2xl relative overflow-hidden">
        {/* Subtle Cyber Glow Top Line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#5ffbd6]/50 to-transparent" />

        {/* Header with Step Counter & Time Estimate */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5ffbd6] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#5ffbd6]"></span>
            </span>
            <span className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-[#5ffbd6] font-semibold">
              Stage {activeStep} of 4: {REPORTING_STEPS[currentStepIndex].label}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-[#8892b0] bg-[#041329]/80 px-2.5 py-1 rounded-full border border-[#233554]/50">
            <Clock className="w-3.5 h-3.5 text-[#5ffbd6]" />
            <span className="font-mono text-[11px]">
              {activeStep === 1 && '~3 mins to freeze'}
              {activeStep === 2 && '~2 mins remaining'}
              {activeStep === 3 && '~1 min remaining'}
              {activeStep === 4 && 'Completed & Transmitted'}
            </span>
          </div>
        </div>

        {/* Progress Bar Track */}
        <div className="relative mb-6">
          {/* Background Line */}
          <div className="absolute top-1/2 left-4 right-4 -translate-y-1/2 h-1 bg-[#112240] rounded-full z-0" />
          
          {/* Active Filled Line */}
          <motion.div
            className="absolute top-1/2 left-4 -translate-y-1/2 h-1 bg-gradient-to-r from-[#5ffbd6] to-[#00f2fe] rounded-full z-0"
            initial={{ width: 0 }}
            animate={{ width: `calc(${progressPercentage}% - 8px)` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />

          {/* Stepper Nodes */}
          <div className="relative z-10 flex items-center justify-between">
            {REPORTING_STEPS.map((step, idx) => {
              const stepNumber = idx + 1;
              const isCompleted = stepNumber < activeStep;
              const isCurrent = stepNumber === activeStep;
              const isUpcoming = stepNumber > activeStep;

              return (
                <div key={step.id} className="flex flex-col items-center group">
                  <motion.button
                    type="button"
                    disabled={isUpcoming}
                    onClick={() => {
                      if (isCompleted && onNavigate) {
                        onNavigate(step.screens[0]);
                      }
                    }}
                    whileHover={isCompleted ? { scale: 1.08 } : {}}
                    whileTap={isCompleted ? { scale: 0.95 } : {}}
                    className={`relative flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-xl transition-all duration-300 font-mono text-xs sm:text-sm font-bold ${
                      isCompleted
                        ? 'bg-[#5ffbd6] text-[#041329] shadow-[0_0_15px_rgba(95,251,214,0.4)] cursor-pointer'
                        : isCurrent
                        ? 'bg-[#0d223a] text-[#5ffbd6] border-2 border-[#5ffbd6] shadow-[0_0_20px_rgba(95,251,214,0.3)] ring-4 ring-[#5ffbd6]/15'
                        : 'bg-[#0d1c32] text-[#8892b0] border border-[#233554] cursor-not-allowed opacity-60'
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="w-5 h-5 stroke-[2.5]" />
                    ) : (
                      <span>{stepNumber}</span>
                    )}

                    {/* Pulse ring on current */}
                    {isCurrent && (
                      <span className="absolute -inset-1 rounded-xl border border-[#5ffbd6]/40 animate-pulse pointer-events-none" />
                    )}
                  </motion.button>

                  {/* Step Label (Desktop & Tablet) */}
                  <div className="hidden sm:flex flex-col items-center mt-2.5 text-center">
                    <span
                      className={`text-xs font-semibold tracking-wide ${
                        isCurrent
                          ? 'text-[#5ffbd6]'
                          : isCompleted
                          ? 'text-[#ccd6f6]'
                          : 'text-[#8892b0]/70'
                      }`}
                    >
                      {step.shortLabel}
                    </span>
                    <span className="text-[10px] text-[#8892b0] max-w-[110px] truncate">
                      {step.description}
                    </span>
                  </div>

                  {/* Step Label (Mobile) */}
                  <span
                    className={`sm:hidden text-[10px] mt-1.5 font-medium ${
                      isCurrent
                        ? 'text-[#5ffbd6] font-bold'
                        : isCompleted
                        ? 'text-[#ccd6f6]'
                        : 'text-[#8892b0]/60'
                    }`}
                  >
                    {step.shortLabel}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Senior mode indicator info */}
        {isSeniorMode && (
          <div className="bg-[#041329] border border-[#5ffbd6]/30 rounded-lg p-2.5 text-center text-xs text-[#5ffbd6] font-medium">
            👴 <strong>Senior Citizen Assistance Active:</strong> You are currently at Step {activeStep} of 4 ({REPORTING_STEPS[currentStepIndex].label}). Take your time — all bank details are preserved automatically.
          </div>
        )}
      </div>
    </div>
  );
};
