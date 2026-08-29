import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Activity,
  Shield,
  CheckCircle2,
  Clock,
  FileText,
  Lock,
  Plus,
  Eye,
  AlertCircle,
  ArrowRight,
  RefreshCw,
  ChevronRight,
  IndianRupee,
  Building2,
  Zap,
  Phone,
  BarChart3,
  PieChart as PieIcon,
  TrendingUp,
  ShieldAlert,
  Globe2,
  Layers,
  Sparkles
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid
} from 'recharts';
import { AppScreen, ComplaintData, EvidenceItem } from '../../types';
import { EvidencePreviewModal } from '../modals/EvidencePreviewModal';

interface CaseTrackerScreenProps {
  activeCase: ComplaintData;
  onNavigate: (screen: AppScreen) => void;
  authenticatedOfficer?: string | null;
}

// Analytics Mock Data for I4C & 1930 Cyber Dashboard
const FRAUD_DISTRIBUTION_DATA = [
  { name: 'UPI / QR Code Scam', value: 42, color: '#5ffbd6', cases: '10,155' },
  { name: 'Telegram Task & Job Scam', value: 26, color: '#00b4d8', cases: '6,286' },
  { name: 'Bank KYC & AnyDesk APK', value: 18, color: '#f59e0b', cases: '4,352' },
  { name: 'Digital Arrest / Sextortion', value: 9, color: '#ffb4ab', cases: '2,176' },
  { name: 'Fake Crypto / Stock Pool', value: 5, color: '#a855f7', cases: '1,209' }
];

const HOURLY_TELEMETRY_DATA = [
  { hour: '00:00', reportedLoss: 1.2, frozenAmount: 0.9, incidents: 410 },
  { hour: '04:00', reportedLoss: 0.6, frozenAmount: 0.5, incidents: 180 },
  { hour: '08:00', reportedLoss: 3.4, frozenAmount: 2.8, incidents: 1220 },
  { hour: '11:00', reportedLoss: 8.9, frozenAmount: 7.2, incidents: 3450 },
  { hour: '14:00', reportedLoss: 12.5, frozenAmount: 9.8, incidents: 4890 },
  { hour: '17:00', reportedLoss: 14.8, frozenAmount: 11.6, incidents: 5600 },
  { hour: '20:00', reportedLoss: 9.6, frozenAmount: 7.9, incidents: 3890 },
  { hour: '23:00', reportedLoss: 4.1, frozenAmount: 3.2, incidents: 1620 }
];

const REGIONAL_STATE_DATA = [
  { state: 'Maharashtra', complaints: 4890, recoveredCr: 12.4, efficiency: '82%' },
  { state: 'Delhi NCR', complaints: 4120, recoveredCr: 10.8, efficiency: '79%' },
  { state: 'Karnataka', complaints: 3650, recoveredCr: 9.5, efficiency: '84%' },
  { state: 'Uttar Pradesh', complaints: 3410, recoveredCr: 7.2, efficiency: '71%' },
  { state: 'Telangana', complaints: 2890, recoveredCr: 7.9, efficiency: '86%' },
  { state: 'Tamil Nadu', complaints: 2450, recoveredCr: 6.1, efficiency: '78%' }
];

const BANK_SPEED_DATA = [
  { bank: 'SBI', responseMin: 3.8, fill: '#5ffbd6' },
  { bank: 'HDFC', responseMin: 4.1, fill: '#00b4d8' },
  { bank: 'ICICI', responseMin: 4.4, fill: '#38bdf8' },
  { bank: 'Axis', responseMin: 5.2, fill: '#818cf8' },
  { bank: 'PNB', responseMin: 6.8, fill: '#f59e0b' }
];

export const CaseTrackerScreen: React.FC<CaseTrackerScreenProps> = ({
  activeCase,
  onNavigate,
  authenticatedOfficer
}) => {
  const [searchId, setSearchId] = useState(activeCase.caseId);
  const [selectedPreview, setSelectedPreview] = useState<EvidenceItem | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<'case_status' | 'analytics_dashboard'>('case_status');

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  const bank = activeCase.bankDetails || {
    victimBank: 'State Bank of India (SBI)',
    amountLost: activeCase.financialLoss || '₹75,000',
    transactionIdOrUtr: '423189041289',
    suspectPhoneNumber: '+91 98765 43210',
    suspectUpiOrAccount: 'cyberfrauder@ybl',
    paymentApp: 'Google Pay (UPI)'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-[1100px] mx-auto px-4 sm:px-6 pt-4 pb-16 space-y-8"
    >
      {/* Evidence Modal */}
      <EvidencePreviewModal
        evidence={selectedPreview}
        onClose={() => setSelectedPreview(null)}
      />

      {/* Header with Switcher Tabs */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#112240] border border-[#5ffbd6]/40 text-[#5ffbd6] text-xs font-mono tracking-widest uppercase mb-2">
            <Activity className="w-3.5 h-3.5" />
            1930 Live Bank Lien Telemetry Hub
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Financial Fraud Case & Nodal Telemetry
          </h1>
        </div>

        {/* View Toggle Tabs */}
        <div className="flex items-center bg-[#071324] border border-[#233554] p-1 rounded-2xl">
          <button
            onClick={() => setActiveTab('case_status')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'case_status'
                ? 'bg-[#5ffbd6] text-[#041329] shadow-[0_0_15px_rgba(95,251,214,0.3)]'
                : 'text-[#bacac3] hover:text-white'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Active Case Status</span>
          </button>

          <button
            onClick={() => setActiveTab('analytics_dashboard')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'analytics_dashboard'
                ? 'bg-[#5ffbd6] text-[#041329] shadow-[0_0_15px_rgba(95,251,214,0.3)]'
                : 'text-[#bacac3] hover:text-white'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>I4C Threat Analytics</span>
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'case_status' ? (
          <motion.div
            key="case_view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-8"
          >
            {/* Search / Docket Query Box */}
            <div className="flex items-center justify-between gap-3 bg-[#081b2b] border border-[#233554] p-3 rounded-2xl">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  placeholder="Search 1930 Ack Number..."
                  className="w-full bg-[#071324] border border-[#233554] focus:border-[#5ffbd6] focus:outline-none rounded-xl pl-9 pr-3 py-2.5 text-xs font-mono text-white transition-colors"
                />
                <Search className="w-4 h-4 text-[#bacac3] absolute left-3 top-3" />
              </div>
              <button
                onClick={handleRefresh}
                className="p-2.5 rounded-xl bg-[#112240] hover:bg-[#1c2a41] border border-[#233554] text-[#5ffbd6] transition-colors cursor-pointer"
                title="Refresh 1930 Bank Feed"
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              </button>
            </div>

            {/* Authenticated Officer Command Strip (if logged in) */}
            {authenticatedOfficer && (
              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#0d233e] to-[#07182c] border-2 border-[#5ffbd6]/50 shadow-[0_0_25px_rgba(95,251,214,0.15)] flex flex-col md:flex-row items-start md:items-center justify-between gap-3 font-mono text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#5ffbd6]/15 border border-[#5ffbd6] flex items-center justify-center text-[#5ffbd6]">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white uppercase text-xs">
                        Bank Nodal Control Desk Active
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-[#5ffbd6]/20 text-[#5ffbd6] font-bold border border-[#5ffbd6]/30">
                        {authenticatedOfficer}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#bacac3] font-sans">
                      Authorized to issue inter-bank freeze tokens, execute beneficiary lien, and forward suspect VPA to Telecom Chakshu.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
                  <button
                    type="button"
                    onClick={() => alert(`[Nodal Action Executed]\nOfficial Lien Freeze re-confirmed for UTR: ${bank.transactionIdOrUtr}\nTransmitted to Recipient Bank via SFMS/CFCFRMS.`)}
                    className="px-3 py-1.5 rounded-xl bg-[#5ffbd6] hover:bg-[#38debb] text-[#041329] font-bold uppercase transition-all shadow-[0_0_12px_rgba(95,251,214,0.3)] cursor-pointer"
                  >
                    Execute SFMS Lien
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigate('auth')}
                    className="px-3 py-1.5 rounded-xl bg-[#112240] hover:bg-[#1a335a] border border-[#233554] text-[#bacac3] hover:text-white transition-colors cursor-pointer"
                  >
                    Switch Officer
                  </button>
                </div>
              </div>
            )}

            {/* Case Header Status Card */}
            <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-[#233554] space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#233554]">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-bold text-white tracking-wider">
                      {activeCase.caseId}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#5ffbd6]/15 border border-[#5ffbd6]/40 text-[#5ffbd6] font-mono text-xs font-bold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-[#5ffbd6] animate-ping" />
                      BANK LIEN ACTIVE
                    </span>
                  </div>
                  <p className="text-xs font-mono text-[#bacac3]">
                    {activeCase.complaintType} &bull; UTR: <span className="text-[#5ffbd6]">{bank.transactionIdOrUtr}</span> &bull; {bank.victimBank}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onNavigate('evidence')}
                    className="px-3.5 py-2 rounded-xl bg-[#112240] hover:bg-[#1c2a41] border border-[#5ffbd6]/40 text-[#5ffbd6] font-mono text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Attach Bank Statement / Proof</span>
                  </button>
                </div>
              </div>

              {/* 1930 Financial Fraud Progression Stages */}
              <div className="space-y-3">
                <span className="font-mono text-xs uppercase tracking-wider text-[#bacac3] font-semibold block">
                  1930 CFCFRMS Resolution Milestones
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 font-mono text-xs">
                  <div className="p-3.5 rounded-xl bg-[#081b2b] border border-[#5ffbd6]/60 space-y-1">
                    <div className="flex items-center justify-between text-[#5ffbd6]">
                      <span className="font-bold">01. 1930 Ingestion</span>
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <p className="text-[11px] text-[#bacac3]">Case ID assigned & cryptographic SHA-256 seal</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#081b2b] border border-[#5ffbd6]/60 space-y-1">
                    <div className="flex items-center justify-between text-[#5ffbd6]">
                      <span className="font-bold">02. Nodal Bank Broadcast</span>
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <p className="text-[11px] text-[#bacac3]">Lien alert sent to ICICI / Axis recipient bank</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#112240] border border-[#5ffbd6] space-y-1">
                    <div className="flex items-center justify-between text-white">
                      <span className="font-bold text-[#5ffbd6]">03. Lien & Account Freeze</span>
                      <Clock className="w-4 h-4 text-[#5ffbd6] animate-spin" />
                    </div>
                    <p className="text-[11px] text-[#5ffbd6]">{bank.amountLost} balance placed on temporary lien</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#071324] border border-[#233554] space-y-1 opacity-60">
                    <div className="flex items-center justify-between text-[#bacac3]">
                      <span className="font-bold">04. Court Order Refund</span>
                      <Lock className="w-4 h-4" />
                    </div>
                    <p className="text-[11px] text-[#bacac3]">Sec 457 CrPC fund release queue</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Case Details & Evidence Log Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Col: Narrative Summary & Nodal Officer Notes (7 Cols) */}
              <div className="lg:col-span-7 space-y-6">
                <div className="glass-panel rounded-2xl p-6 border border-[#233554] space-y-4">
                  <h3 className="font-mono text-xs uppercase tracking-wider text-[#5ffbd6] font-bold">
                    Filed Complaint Statement
                  </h3>
                  <p className="text-xs sm:text-sm text-[#d6e3ff] leading-relaxed font-sans bg-[#071324] p-4 rounded-xl border border-[#233554]">
                    {activeCase.narrative}
                  </p>
                </div>

                <div className="glass-panel rounded-2xl p-6 border border-[#233554] space-y-3 font-mono text-xs">
                  <h3 className="font-mono text-xs uppercase tracking-wider text-white font-bold flex items-center gap-2">
                    <Shield className="w-4 h-4 text-[#5ffbd6]" />
                    1930 Bank Nodal Officer & Police Feed
                  </h3>
                  <div className="space-y-2 text-[#d6e3ff]">
                    <div className="p-3.5 rounded-xl bg-[#071324] border border-[#233554] space-y-1">
                      <div className="flex items-center justify-between text-[#5ffbd6] text-[11px]">
                        <span>SBI Cyber Fraud Nodal Officer (Desk 4)</span>
                        <span>10:47 IST</span>
                      </div>
                      <p className="text-[11px] text-[#bacac3]">
                        "Disputed UTR {bank.transactionIdOrUtr} flagged. ₹{bank.amountLost.replace('₹', '')} transfer trail traced to destination wallet. Lien notification acknowledged by beneficiary bank."
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Col: Evidence Registry (5 Cols) */}
              <div className="lg:col-span-5 glass-panel rounded-2xl p-6 border border-[#233554] space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-mono text-xs uppercase tracking-wider text-[#5ffbd6] font-bold">
                    Sealed Evidence ({activeCase.evidenceList.length})
                  </h3>
                  <span className="text-[10px] font-mono text-[#bacac3]">SHA-256 Validated</span>
                </div>

                <div className="space-y-2.5">
                  {activeCase.evidenceList.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setSelectedPreview(item)}
                      className="p-3 rounded-xl bg-[#071324] border border-[#233554] hover:border-[#5ffbd6]/40 cursor-pointer transition-all flex items-center justify-between gap-3 font-mono text-xs"
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <span className="w-8 h-8 rounded-lg bg-[#112240] border border-[#5ffbd6]/30 flex items-center justify-center text-[10px] font-bold text-[#5ffbd6] shrink-0">
                          {item.extension}
                        </span>
                        <div className="truncate">
                          <div className="text-white font-semibold truncate">{item.name}</div>
                          <div className="text-[10px] text-[#bacac3]">{item.size} &bull; {item.category}</div>
                        </div>
                      </div>

                      <button className="p-1.5 rounded bg-[#112240] text-[#5ffbd6] cursor-pointer">
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="analytics_view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-8"
          >
            {/* Top KPI Metrics Banner */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="glass-panel p-5 rounded-2xl border border-[#233554] space-y-1">
                <div className="flex items-center justify-between text-xs font-mono text-[#8892b0]">
                  <span>Today's Reports</span>
                  <Activity className="w-4 h-4 text-[#5ffbd6]" />
                </div>
                <div className="text-2xl font-bold font-mono text-white">24,180</div>
                <div className="text-[11px] text-[#5ffbd6] font-mono">↑ 12.4% vs last week</div>
              </div>

              <div className="glass-panel p-5 rounded-2xl border border-[#5ffbd6]/30 space-y-1 bg-[#5ffbd6]/5">
                <div className="flex items-center justify-between text-xs font-mono text-[#8892b0]">
                  <span>Frozen in Golden Hour</span>
                  <ShieldAlert className="w-4 h-4 text-[#5ffbd6]" />
                </div>
                <div className="text-2xl font-bold font-mono text-[#5ffbd6]">₹18.42 Cr</div>
                <div className="text-[11px] text-[#ccd6f6] font-mono">78.4% Intercept Efficiency</div>
              </div>

              <div className="glass-panel p-5 rounded-2xl border border-[#233554] space-y-1">
                <div className="flex items-center justify-between text-xs font-mono text-[#8892b0]">
                  <span>Avg Lien Response</span>
                  <Clock className="w-4 h-4 text-[#00b4d8]" />
                </div>
                <div className="text-2xl font-bold font-mono text-white">4.2 Min</div>
                <div className="text-[11px] text-[#00b4d8] font-mono">Target: &lt; 5.0 Min</div>
              </div>

              <div className="glass-panel p-5 rounded-2xl border border-[#233554] space-y-1">
                <div className="flex items-center justify-between text-xs font-mono text-[#8892b0]">
                  <span>Active Nodal Desks</span>
                  <Building2 className="w-4 h-4 text-[#f59e0b]" />
                </div>
                <div className="text-2xl font-bold font-mono text-white">86 Nodes</div>
                <div className="text-[11px] text-[#bacac3] font-mono">74 Banks &bull; 12 Wallets</div>
              </div>
            </div>

            {/* Recharts Grid 1: Hourly Telemetry & Fraud Category Donut */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Hourly Area Chart (7 Cols) */}
              <div className="lg:col-span-7 glass-panel rounded-2xl p-6 border border-[#233554] space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-[#5ffbd6]" />
                      Reported vs. Frozen Funds (24H Telemetry)
                    </h3>
                    <p className="text-xs text-[#8892b0]">Values in ₹ Crores across 1930 intake timeline</p>
                  </div>
                  <span className="px-2 py-1 rounded bg-[#112240] text-[10px] font-mono text-[#5ffbd6] border border-[#233554]">
                    LIVE STREAM
                  </span>
                </div>

                <div className="h-[280px] w-full pt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={HOURLY_TELEMETRY_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorReported" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#ffb4ab" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#ffb4ab" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorFrozen" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#5ffbd6" stopOpacity={0.5} />
                          <stop offset="95%" stopColor="#5ffbd6" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#233554" vertical={false} />
                      <XAxis dataKey="hour" stroke="#8892b0" fontSize={11} tickLine={false} />
                      <YAxis stroke="#8892b0" fontSize={11} tickLine={false} tickFormatter={(v) => `₹${v}Cr`} />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#081b2b', borderColor: '#233554', borderRadius: '12px', fontSize: '12px' }}
                        itemStyle={{ color: '#d6e3ff' }}
                      />
                      <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                      <Area
                        type="monotone"
                        dataKey="reportedLoss"
                        name="Reported Fraud Loss (₹Cr)"
                        stroke="#ffb4ab"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorReported)"
                      />
                      <Area
                        type="monotone"
                        dataKey="frozenAmount"
                        name="Frozen in Golden Hour (₹Cr)"
                        stroke="#5ffbd6"
                        strokeWidth={2.5}
                        fillOpacity={1}
                        fill="url(#colorFrozen)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Fraud Category Donut Chart (5 Cols) */}
              <div className="lg:col-span-5 glass-panel rounded-2xl p-6 border border-[#233554] space-y-4">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <PieIcon className="w-4 h-4 text-[#5ffbd6]" />
                    Modus Operandi Breakdown
                  </h3>
                  <p className="text-xs text-[#8892b0]">Distribution of financial cyber fraud vectors</p>
                </div>

                <div className="h-[210px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={FRAUD_DISTRIBUTION_DATA}
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={85}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {FRAUD_DISTRIBUTION_DATA.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{ backgroundColor: '#081b2b', borderColor: '#233554', borderRadius: '12px', fontSize: '12px' }}
                        formatter={(val: any, name: any) => [`${val}% (${FRAUD_DISTRIBUTION_DATA.find(d => d.name === name)?.cases} cases)`, name]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Donut Legend */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {FRAUD_DISTRIBUTION_DATA.map((item) => (
                    <div key={item.name} className="flex items-center gap-2 text-xs">
                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                      <span className="text-[#8892b0] truncate">{item.name}</span>
                      <span className="font-mono text-white font-bold ml-auto">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recharts Grid 2: Regional State Trends & Bank Response Times */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Regional Trends (7 Cols) */}
              <div className="lg:col-span-7 glass-panel rounded-2xl p-6 border border-[#233554] space-y-4">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Globe2 className="w-4 h-4 text-[#5ffbd6]" />
                    Top Impacted State Cyber Command Centers
                  </h3>
                  <p className="text-xs text-[#8892b0]">Volume of 1930 incident reports & recovery amount</p>
                </div>

                <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={REGIONAL_STATE_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#233554" vertical={false} />
                      <XAxis dataKey="state" stroke="#8892b0" fontSize={11} tickLine={false} />
                      <YAxis stroke="#8892b0" fontSize={11} tickLine={false} />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#081b2b', borderColor: '#233554', borderRadius: '12px', fontSize: '12px' }}
                        formatter={(val: any, name: any) => [name === 'complaints' ? `${val} Cases` : `₹${val} Cr`, name]}
                      />
                      <Bar dataKey="complaints" name="Complaints" fill="#00b4d8" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Bank Nodal Response Velocity (5 Cols) */}
              <div className="lg:col-span-5 glass-panel rounded-2xl p-6 border border-[#233554] space-y-4">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Zap className="w-4 h-4 text-[#5ffbd6]" />
                    Bank Nodal Lien Freeze Velocity
                  </h3>
                  <p className="text-xs text-[#8892b0]">Average minutes to freeze recipient accounts</p>
                </div>

                <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={BANK_SPEED_DATA} layout="vertical" margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#233554" horizontal={false} />
                      <XAxis type="number" stroke="#8892b0" fontSize={11} tickFormatter={(v) => `${v}m`} />
                      <YAxis type="category" dataKey="bank" stroke="#8892b0" fontSize={11} tickLine={false} />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#081b2b', borderColor: '#233554', borderRadius: '12px', fontSize: '12px' }}
                        formatter={(val: any) => [`${val} Minutes`, 'Freeze Latency']}
                      />
                      <Bar dataKey="responseMin" name="Minutes" fill="#5ffbd6" radius={[0, 6, 6, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back button */}
      <div className="text-center pt-4">
        <button
          onClick={() => onNavigate('home')}
          className="text-xs font-mono text-[#bacac3] hover:text-[#5ffbd6] transition-colors cursor-pointer"
        >
          &larr; Return to National Portal Home
        </button>
      </div>
    </motion.div>
  );
};
