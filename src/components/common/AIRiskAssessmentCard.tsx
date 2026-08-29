import React, { useState } from 'react';
import { Sparkles, Shield, ShieldAlert, AlertTriangle, CheckCircle2, ShieldCheck, ArrowUpRight, Cpu, Smartphone, Lock, PhoneOff, RefreshCw, Check } from 'lucide-react';
import { analyzeFraudRisk, FraudRiskAnalysis } from '../../utils/aiRiskAssessment';

interface AIRiskAssessmentCardProps {
  narrative: string;
  complaintType: string;
  financialLoss: string;
}

export const AIRiskAssessmentCard: React.FC<AIRiskAssessmentCardProps> = ({
  narrative,
  complaintType,
  financialLoss
}) => {
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});
  const [isRefreshing, setIsRefreshing] = useState(false);

  const analysis: FraudRiskAnalysis = analyzeFraudRisk(narrative, complaintType, financialLoss);

  const toggleStep = (index: number) => {
    setCompletedSteps(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 600);
  };

  const getUrgencyBadge = (urgency: 'Immediate' | 'Important' | 'Recommended') => {
    switch (urgency) {
      case 'Immediate':
        return 'bg-[#93000a]/40 text-[#ffb4ab] border-[#ffb4ab]/40';
      case 'Important':
        return 'bg-amber-950/40 text-amber-300 border-amber-500/40';
      case 'Recommended':
        return 'bg-[#5ffbd6]/10 text-[#5ffbd6] border-[#5ffbd6]/30';
    }
  };

  return (
    <div className="glass-panel rounded-2xl p-6 sm:p-7 border border-[#5ffbd6]/60 bg-gradient-to-br from-[#081a32] via-[#051124] to-[#030d1d] space-y-6 shadow-[0_0_35px_rgba(95,251,214,0.15)] relative overflow-hidden">
      {/* Subtle Glow Accent */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#5ffbd6]/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#233554]/90 pb-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#112240] border border-[#5ffbd6] flex items-center justify-center text-[#5ffbd6] shadow-[0_0_15px_rgba(95,251,214,0.3)] shrink-0">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs uppercase tracking-wider text-[#5ffbd6] font-bold">
                AI Fraud Pattern & Threat Assessment
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#5ffbd6]/20 border border-[#5ffbd6]/40 text-[#5ffbd6] text-[10px] font-mono font-bold">
                Live Analysis
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-white font-sans mt-0.5">
              Incident Vector & Immediate Mitigation Directives
            </h2>
          </div>
        </div>

        <button
          type="button"
          onClick={handleRefresh}
          className="self-start sm:self-auto px-3 py-1.5 rounded-xl bg-[#112240] hover:bg-[#1a2d4f] border border-[#233554] text-[#bacac3] hover:text-white font-mono text-xs flex items-center gap-1.5 transition-all"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-[#5ffbd6] ${isRefreshing ? 'animate-spin' : ''}`} />
          <span>Re-scan Narrative</span>
        </button>
      </div>

      {/* Threat Severity & Modus Operandi Breakdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
        {/* Threat Score Card */}
        <div className="p-4 rounded-xl bg-[#081528] border border-[#233554] flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono text-[#bacac3] uppercase font-semibold">Incident Threat Score</span>
            <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
              analysis.threatLevel === 'Critical' 
                ? 'bg-[#93000a] text-white border border-[#ffb4ab]/50'
                : 'bg-amber-900/60 text-amber-200 border border-amber-400/40'
            }`}>
              {analysis.threatLevel} Severity
            </span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-mono text-[#5ffbd6]">
              {analysis.threatScore}
            </span>
            <span className="text-xs font-mono text-[#bacac3]">/ 100</span>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-[#112240] h-2 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-700 ${
                analysis.threatScore >= 85 ? 'bg-gradient-to-r from-amber-400 to-[#ffb4ab]' : 'bg-[#5ffbd6]'
              }`}
              style={{ width: `${analysis.threatScore}%` }}
            />
          </div>
          <p className="text-[11px] text-[#bacac3] font-sans">
            High threat of secondary transactions if suspect channels remain open.
          </p>
        </div>

        {/* Detected Modus Operandi Vectors */}
        <div className="md:col-span-2 p-4 rounded-xl bg-[#081528] border border-[#233554] space-y-2.5">
          <span className="text-[11px] font-mono text-[#bacac3] uppercase font-semibold block">
            Identified Threat Vectors & Modus Operandi
          </span>
          <div className="flex flex-wrap gap-2">
            {analysis.detectedModusOperandi.map((mo, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-lg bg-[#112240] border border-[#5ffbd6]/40 text-[#5ffbd6] text-xs font-mono flex items-center gap-1.5"
              >
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{mo}</span>
              </span>
            ))}
          </div>

          <div className="pt-2 border-t border-[#233554]/70">
            <span className="text-[10px] font-mono text-[#bacac3] uppercase">Compromised Surface:</span>
            <ul className="text-xs text-[#d6e3ff] font-sans mt-1 space-y-1">
              {analysis.vulnerabilitiesExposed.map((v, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ffb4ab]" />
                  <span>{v}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Immediate Prevention & Mitigation Directives */}
      <div className="space-y-3 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            <h3 className="font-mono text-xs uppercase font-bold tracking-wider text-white">
              Immediate Emergency Prevention Steps (Execute Before / After Submission)
            </h3>
          </div>
          <span className="text-[11px] font-mono text-[#bacac3]">
            {Object.values(completedSteps).filter(Boolean).length} / {analysis.immediatePreventionTips.length} Acknowledged
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {analysis.immediatePreventionTips.map((tip, index) => {
            const isDone = !!completedSteps[index];
            return (
              <div
                key={index}
                onClick={() => toggleStep(index)}
                className={`p-4 rounded-xl border transition-all cursor-pointer select-none flex flex-col justify-between space-y-3 ${
                  isDone
                    ? 'bg-[#082035]/90 border-[#5ffbd6]/80 shadow-[0_0_15px_rgba(95,251,214,0.15)]'
                    : 'bg-[#071324] hover:bg-[#0c1e36] border-[#233554]'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${getUrgencyBadge(tip.urgency)}`}>
                      {tip.urgency}
                    </span>

                    <button
                      type="button"
                      className={`w-5 h-5 rounded flex items-center justify-center border transition-all ${
                        isDone ? 'bg-[#5ffbd6] border-[#5ffbd6] text-[#041329]' : 'border-[#233554] text-transparent'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </button>
                  </div>

                  <h4 className="text-xs font-bold text-white font-sans leading-snug">
                    {tip.title}
                  </h4>
                  <p className="text-[11px] text-[#bacac3] leading-relaxed font-sans">
                    {tip.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#233554]/50 flex items-center justify-between text-[10px] font-mono text-[#5ffbd6]">
                  <span>{isDone ? 'Step Completed' : 'Tap to mark done'}</span>
                  {isDone ? <CheckCircle2 className="w-3.5 h-3.5" /> : <ShieldCheck className="w-3.5 h-3.5 opacity-60" />}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Regulatory Protection Footer Note */}
      <div className="p-3 rounded-xl bg-[#040e1c] border border-[#233554] flex items-center justify-between gap-3 text-xs font-mono text-[#bacac3] relative z-10">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-[#5ffbd6] shrink-0" />
          <span className="text-[11px]">
            {analysis.regulatoryAdvice}
          </span>
        </div>
        <span className="px-2 py-0.5 rounded bg-[#112240] text-[#5ffbd6] text-[10px] font-bold shrink-0">
          Section 66D IT Act
        </span>
      </div>
    </div>
  );
};
