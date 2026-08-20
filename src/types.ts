export type AppScreen = 
  | 'home'
  | 'auth'
  | 'select_input'
  | 'voice_input'
  | 'narrative'
  | 'evidence'
  | 'summary'
  | 'confirmation'
  | 'case_tracker';

export interface EvidenceItem {
  id: string;
  name: string;
  category: string;
  size: string;
  extension: string;
  status: 'Validated' | 'Processing' | 'Encrypted';
  hash: string;
  timestamp: string;
  previewUrl?: string;
  rawText?: string;
  extractedUtr?: string;
  extractedAmount?: string;
}

export interface BankTransactionInfo {
  victimBank: string;
  victimAccountNumber?: string;
  victimUpiId?: string;
  transactionIdOrUtr: string;
  amountLost: string;
  transactionDate: string;
  transactionTime: string;
  paymentMode: 'UPI' | 'Net Banking' | 'Debit/Credit Card' | 'Wallet' | 'AEPS/ATM' | 'Other';
  suspectBankOrWallet?: string;
  suspectUpiId?: string;
  suspectAccountNumber?: string;
  suspectPhoneNumber?: string;
}

export interface ComplaintData {
  caseId: string; // e.g. 1930-2026-8921-KA
  acknowledgementNo: string;
  incidentDate: string;
  complaintType: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  narrative: string;
  financialLoss: string;
  victimName: string;
  victimPhone: string;
  victimState: string;
  victimCity: string;
  bankDetails: BankTransactionInfo;
  evidenceList: EvidenceItem[];
  isSyntheticConfirmed: boolean;
  isGoldenHour: boolean; // True if within 2-4 hours of fraud
  status: 'Draft' | 'Submitted' | 'Lien Placed on Suspect Account' | 'Bank Nodal Investigation' | 'Fund Recovered' | 'Closed';
  createdAt: string;
  officerId?: string;
  contactEmail?: string;
}

export interface VoiceLogEntry {
  time: string;
  speaker: 'agent' | 'victim';
  text: string;
  extractedDetails?: {
    bank?: string;
    amount?: string;
    fraudType?: string;
    utr?: string;
    suspectPhone?: string;
  };
  isProcessing?: boolean;
}

