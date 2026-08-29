import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  ShieldCheck,
  CheckCircle2,
  Download,
  Copy,
  ArrowRight,
  Activity,
  FileText,
  FileDown,
  Printer,
  Key,
  Shield,
  IndianRupee,
  Building2,
  PhoneCall,
  Zap,
  Lock,
  QrCode,
  Bell,
  BellRing,
  Check
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import { AppScreen, ComplaintData } from '../../types';
import { requestNotificationPermission, sendBrowserNotification } from '../../utils/notificationService';

interface ConfirmationScreenProps {
  complaintData: ComplaintData;
  onNavigate: (screen: AppScreen) => void;
}

export const ConfirmationScreen: React.FC<ConfirmationScreenProps> = ({
  complaintData,
  onNavigate
}) => {
  const [copied, setCopied] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [notifState, setNotifState] = useState<NotificationPermission>('default');

  useEffect(() => {
    if ('Notification' in window) {
      setNotifState(Notification.permission);
    }
  }, []);

  const handleTestNotification = async () => {
    const perm = await requestNotificationPermission();
    setNotifState(perm);
    if (perm === 'granted') {
      sendBrowserNotification(`🛡️ 1930 Case Registered: ${complaintData.caseId}`, {
        body: `Emergency Bank Lien initiated. Beneficiary accounts alerted for immediate fund hold.`,
        icon: 'https://cdn-icons-png.flaticon.com/512/9438/9438515.png'
      });
    }
  };

  const handleCopyId = () => {
    navigator.clipboard.writeText(complaintData.caseId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGeneratePDFReceipt = () => {
    setIsGeneratingPdf(true);

    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const bank = complaintData.bankDetails || {
        victimBank: 'State Bank of India (SBI)',
        amountLost: complaintData.financialLoss || '₹75,000',
        transactionIdOrUtr: '423189041289',
        suspectPhoneNumber: '+91 98765 43210',
        suspectUpiOrAccount: 'cyberfrauder@ybl',
        paymentApp: 'Google Pay (UPI)'
      };

      const dateStr = new Date().toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        dateStyle: 'full',
        timeStyle: 'medium'
      });

      // Background Header styling
      doc.setFillColor(4, 19, 41); // #041329
      doc.rect(0, 0, 210, 38, 'F');

      // Header Text
      doc.setTextColor(95, 251, 214); // Cyan
      doc.setFontSize(15);
      doc.setFont('helvetica', 'bold');
      doc.text('NATIONAL CYBERCRIME REPORTING PORTAL (1930)', 14, 15);

      doc.setTextColor(214, 227, 255);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.text('Citizen Financial Cyber Fraud Reporting & Management System (CFCFRMS)', 14, 21);
      doc.text('Ministry of Home Affairs (I4C) | Government of India', 14, 26);

      // Gold/Cyan Badge for Priority
      doc.setFillColor(17, 34, 64);
      doc.roundedRect(140, 8, 56, 18, 2, 2, 'F');
      doc.setTextColor(95, 251, 214);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'bold');
      doc.text('GOLDEN HOUR LIEN', 144, 15);
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(7);
      doc.text('Direct Nodal Broadcast Active', 144, 21);

      // Case Metadata Summary Box
      doc.setFillColor(245, 247, 250);
      doc.roundedRect(14, 44, 182, 34, 2, 2, 'F');
      doc.setDrawColor(200, 210, 225);
      doc.roundedRect(14, 44, 182, 34, 2, 2, 'D');

      doc.setTextColor(50, 60, 80);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.text('1930 ACKNOWLEDGEMENT NO:', 18, 52);
      doc.setTextColor(0, 102, 204);
      doc.setFontSize(11);
      doc.text(complaintData.caseId, 75, 52);

      doc.setTextColor(50, 60, 80);
      doc.setFontSize(9);
      doc.text('STATUS:', 18, 59);
      doc.setTextColor(0, 150, 100);
      doc.text(complaintData.status || 'Lien Transmitted to Recipient Bank', 75, 59);

      doc.setTextColor(50, 60, 80);
      doc.text('FILING TIMESTAMP:', 18, 66);
      doc.setTextColor(30, 40, 60);
      doc.text(`${dateStr} IST`, 75, 66);

      doc.setTextColor(50, 60, 80);
      doc.text('CATEGORY:', 18, 73);
      doc.setTextColor(30, 40, 60);
      doc.text(complaintData.complaintType, 75, 73);

      // Financial Details Table Section
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(4, 19, 41);
      doc.text('1. FINANCIAL FRAUD & TRANSACTION METADATA', 14, 88);

      doc.setFillColor(235, 240, 248);
      doc.rect(14, 92, 182, 8, 'F');
      doc.setFontSize(8);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(50, 60, 80);
      doc.text('DISPUTED AMOUNT', 18, 97);
      doc.text('VICTIM BANK', 65, 97);
      doc.text('BANK UTR / TXN ID', 115, 97);
      doc.text('SUSPECT VPA / NO.', 160, 97);

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(20, 30, 40);
      doc.text(bank.amountLost, 18, 106);
      doc.text(bank.victimBank, 65, 106);
      doc.text(bank.transactionIdOrUtr, 115, 106);
      doc.text(`${bank.suspectUpiOrAccount}`, 160, 106);

      // Incident Narrative Box
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(4, 19, 41);
      doc.text('2. INCIDENT STATEMENT & MODUS OPERANDI', 14, 120);

      doc.setFillColor(250, 252, 255);
      doc.rect(14, 124, 182, 38, 'F');
      doc.setDrawColor(220, 225, 235);
      doc.rect(14, 124, 182, 38, 'D');

      doc.setFontSize(8.5);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(40, 50, 60);
      const splitNarrative = doc.splitTextToSize(
        complaintData.narrative ||
          'A fraudulent transaction was reported under the Golden Hour protocol with verified bank SMS and UPI UTR records.',
        174
      );
      doc.text(splitNarrative.slice(0, 5), 18, 131);

      // Section 65B Electronic Evidence Table
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(4, 19, 41);
      doc.text('3. ELECTRONIC EVIDENCE & SHA-256 HASH VERIFICATION (SEC 65B)', 14, 172);

      let evidenceY = 178;
      doc.setFillColor(235, 240, 248);
      doc.rect(14, evidenceY, 182, 7, 'F');
      doc.setFontSize(8);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(50, 60, 80);
      doc.text('FILE NAME', 18, evidenceY + 5);
      doc.text('CATEGORY', 65, evidenceY + 5);
      doc.text('SHA-256 CHECKSUM (CHAIN OF CUSTODY)', 105, evidenceY + 5);

      evidenceY += 12;
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(30, 40, 50);

      const displayEvidence = complaintData.evidenceList.length > 0
        ? complaintData.evidenceList.slice(0, 3)
        : [
            {
              id: '1',
              name: 'UPI_Debit_Screenshot.png',
              category: 'Payment Screenshot',
              size: '1.2 MB',
              hash: '8f432190ab78...ce91',
              timestamp: '2026-08-25 09:12'
            }
          ];

      displayEvidence.forEach((item) => {
        doc.text(item.name.substring(0, 24), 18, evidenceY);
        doc.text(item.category, 65, evidenceY);
        doc.setFont('courier', 'normal');
        doc.text(item.hash || 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', 105, evidenceY);
        doc.setFont('helvetica', 'normal');
        evidenceY += 8;
      });

      // Statutory Warning and Footer
      doc.setFillColor(4, 19, 41);
      doc.rect(14, 238, 182, 40, 'F');

      doc.setTextColor(95, 251, 214);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.text('LEGAL NOTICE & STATUTORY DECLARATION', 18, 246);

      doc.setTextColor(214, 227, 255);
      doc.setFontSize(7.5);
      doc.setFont('helvetica', 'normal');
      doc.text(
        'Generated under Citizen Financial Cyber Fraud Reporting & Management System (1930 CFCFRMS).',
        18,
        252
      );
      doc.text(
        'The recipient bank nodal desk has been notified under Section 66D of Information Technology Act 2000.',
        18,
        257
      );
      doc.text(
        'To track or submit further court orders for refund (Sec 457 CrPC), quote the Acknowledgment ID above.',
        18,
        262
      );
      doc.text(
        'National Cybercrime Helpline: 1930 | Official Portal: cybercrime.gov.in',
        18,
        268
      );

      // Save PDF directly to user download
      doc.save(`CyberCrime_1930_Docket_${complaintData.caseId}.pdf`);
    } catch (error) {
      console.error('Failed to generate PDF:', error);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handleDownloadReport = () => {
    const bank = complaintData.bankDetails || {
      victimBank: 'State Bank of India (SBI)',
      amountLost: complaintData.financialLoss || '₹75,000',
      transactionIdOrUtr: '423189041289',
      suspectPhoneNumber: '+91 98765 43210',
      suspectUpiOrAccount: 'cyberfrauder@ybl',
      paymentApp: 'Google Pay (UPI)'
    };

    const reportText = `================================================================================
NATIONAL CYBERCRIME REPORTING PORTAL (1930) | CITIZEN FINANCIAL FRAUD DOCKET
Government of India - Ministry of Home Affairs (I4C)
================================================================================
1930 ACKNOWLEDGMENT NO: ${complaintData.caseId}
STATUS:                 TRANSMITTED TO BENEFICIARY BANK NODAL NETWORK (GOLDEN HOUR)
FILING TIMESTAMP:       ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
INCIDENT CATEGORY:      ${complaintData.complaintType}
AMOUNT REPORTED:        ${bank.amountLost}
VICTIM BANK:            ${bank.victimBank}
UTR / TRANSACTION ID:   ${bank.transactionIdOrUtr}
SUSPECT IDENTIFIER:     ${bank.suspectUpiOrAccount} (${bank.suspectPhoneNumber})
PAYMENT METHOD:         ${bank.paymentApp}

--------------------------------------------------------------------------------
1. COMPLAINT NARRATIVE & MODUS OPERANDI
--------------------------------------------------------------------------------
${complaintData.narrative}

--------------------------------------------------------------------------------
2. ELECTRONIC EVIDENCE & SCREENSHOTS (${complaintData.evidenceList.length} FILES)
--------------------------------------------------------------------------------
${complaintData.evidenceList.map((e, i) => `[${i + 1}] ${e.name}
    Type:      ${e.category}
    Size:      ${e.size}
    Hash:      ${e.hash}
    Timestamp: ${e.timestamp}
`).join('\n')}

--------------------------------------------------------------------------------
3. STATUTORY NOTICE UNDER IT ACT 2000 & 1930 CFCFRMS
--------------------------------------------------------------------------------
This acknowledgment is generated by the Citizen Financial Cyber Fraud Reporting
and Management System (1930 CFCFRMS). An automated freeze broadcast is issued to
all destination banks/wallets to place a temporary lien on suspect balances.
================================================================================`;

    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CyberCrime_1930_Docket_${complaintData.caseId}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.35 }}
      className="w-full max-w-[950px] mx-auto px-4 sm:px-6 pt-4 pb-16 space-y-8"
    >
      {/* Confirmation Top Box */}
      <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-[#5ffbd6]/40 text-center space-y-6 shadow-[0_0_50px_rgba(95,251,214,0.15)] relative overflow-hidden">
        <div className="w-20 h-20 rounded-3xl bg-[#112240] border-2 border-[#5ffbd6] flex items-center justify-center mx-auto text-[#5ffbd6] shadow-[0_0_30px_rgba(95,251,214,0.4)]">
          <ShieldCheck className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#112240] border border-[#5ffbd6]/40 text-[#5ffbd6] text-xs font-mono tracking-widest uppercase">
            <Zap className="w-3.5 h-3.5 text-[#5ffbd6]" />
            1930 Direct Bank Nodal Broadcast Active
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Complaint Successfully Lodged
          </h1>
          <p className="text-sm sm:text-base text-[#bacac3] max-w-xl mx-auto font-sans leading-relaxed">
            Your complaint has been registered with the 1930 National Cybercrime Portal. An emergency lien request has been dispatched to beneficiary banks.
          </p>
        </div>

        {/* Case ID Callout Card */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#071324] border border-[#5ffbd6]/40 max-w-md mx-auto flex items-center justify-between gap-4">
          <div className="text-left font-mono">
            <span className="text-[10px] text-[#bacac3] uppercase block font-semibold">1930 Acknowledgment Number</span>
            <span className="text-lg sm:text-xl font-bold text-white tracking-wider">{complaintData.caseId}</span>
          </div>

          <button
            onClick={handleCopyId}
            className="px-3.5 py-2 rounded-xl bg-[#112240] hover:bg-[#1c2a41] border border-[#233554] text-[#5ffbd6] font-mono text-xs uppercase flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>{copied ? 'Copied!' : 'Copy ID'}</span>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={handleGeneratePDFReceipt}
            disabled={isGeneratingPdf}
            className="w-full sm:w-auto bg-[#5ffbd6] hover:bg-[#38debb] text-[#041329] font-bold px-7 py-3.5 rounded-xl font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(95,251,214,0.3)] hover:shadow-[0_0_25px_rgba(95,251,214,0.5)] active:scale-[0.98] transition-all cursor-pointer"
          >
            <FileDown className="w-4 h-4 text-[#041329]" />
            <span>{isGeneratingPdf ? 'Generating PDF Docket...' : 'Download Official PDF Receipt'}</span>
          </button>

          <button
            onClick={handleDownloadReport}
            className="w-full sm:w-auto bg-[#112240] hover:bg-[#1c2a41] border border-[#233554] text-white px-7 py-3.5 rounded-xl font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4 text-[#5ffbd6]" />
            <span>Text Docket (.txt)</span>
          </button>

          <button
            onClick={() => onNavigate('case_tracker')}
            className="w-full sm:w-auto bg-[#0d223a] hover:bg-[#16304f] border border-[#5ffbd6]/40 text-[#5ffbd6] px-7 py-3.5 rounded-xl font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Activity className="w-4 h-4 text-[#5ffbd6]" />
            <span>Track Bank Lien Status</span>
          </button>
        </div>

        {/* Browser Push Notification Quick Setup */}
        <div className="max-w-md mx-auto p-4 rounded-2xl bg-[#09182d] border border-[#233554] flex items-center justify-between gap-3 text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#112240] border border-[#5ffbd6]/40 flex items-center justify-center text-[#5ffbd6] shrink-0">
              <BellRing className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <span className="font-mono text-xs font-bold text-white block">
                Live Bank Freeze Notifications
              </span>
              <p className="text-[11px] text-[#bacac3] font-sans">
                {notifState === 'granted'
                  ? 'Desktop alerts active for all 1930 nodal hold responses'
                  : 'Receive real-time desktop popups when recipient bank freezes funds'}
              </p>
            </div>
          </div>

          <button
            onClick={handleTestNotification}
            className={`px-3.5 py-2 rounded-xl font-mono text-xs font-bold uppercase transition-all shrink-0 cursor-pointer ${
              notifState === 'granted'
                ? 'bg-[#5ffbd6]/20 text-[#5ffbd6] border border-[#5ffbd6]/50'
                : 'bg-[#5ffbd6] hover:bg-[#38debb] text-[#041329] shadow-[0_0_15px_rgba(95,251,214,0.3)]'
            }`}
          >
            {notifState === 'granted' ? 'Send Test' : 'Enable'}
          </button>
        </div>
      </div>

      {/* What Happens Next 3-Step Interactive Timeline */}
      <div className="space-y-4">
        <div className="text-center space-y-1">
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            What Happens in the Next 24 Hours
          </h2>
          <p className="text-xs sm:text-sm text-[#bacac3] font-sans">
            Standard Citizen Financial Cyber Fraud Response & Recovery Pipeline
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="glass-card rounded-2xl p-6 border border-[#233554] space-y-3 relative">
            <div className="w-8 h-8 rounded-full bg-[#5ffbd6]/15 border border-[#5ffbd6]/40 flex items-center justify-center font-mono text-xs font-bold text-[#5ffbd6]">
              1
            </div>
            <h3 className="font-semibold text-white text-sm">Instant Bank Lien Freeze</h3>
            <p className="text-xs text-[#bacac3] leading-relaxed font-sans">
              The 1930 CFCFRMS engine alerts the recipient bank nodal officer to immediately put on hold the disputed amount in suspect accounts.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 border border-[#233554] space-y-3 relative">
            <div className="w-8 h-8 rounded-full bg-[#5ffbd6]/15 border border-[#5ffbd6]/40 flex items-center justify-center font-mono text-xs font-bold text-[#5ffbd6]">
              2
            </div>
            <h3 className="font-semibold text-white text-sm">Cyber Cell Verification</h3>
            <p className="text-xs text-[#bacac3] leading-relaxed font-sans">
              Your local district Cyber Crime Police Station reviews the evidence docket and registers the formal First Information Report (FIR).
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 border border-[#233554] space-y-3 relative">
            <div className="w-8 h-8 rounded-full bg-[#5ffbd6]/15 border border-[#5ffbd6]/40 flex items-center justify-center font-mono text-xs font-bold text-[#5ffbd6]">
              3
            </div>
            <h3 className="font-semibold text-white text-sm">Court Order & Refund</h3>
            <p className="text-xs text-[#bacac3] leading-relaxed font-sans">
              Under Section 457 CrPC, the frozen funds are processed for refund back into your source bank account with minimal hassle.
            </p>
          </div>
        </div>
      </div>

      {/* Return to Home link */}
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
