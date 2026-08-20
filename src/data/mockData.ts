import { ComplaintData, EvidenceItem } from '../types';

export const INITIAL_EVIDENCE: EvidenceItem[] = [
  {
    id: 'ev-1',
    name: 'upi_payment_debit_screenshot.png',
    category: 'UPI / Payment Gateway Receipt',
    size: '1.2 MB',
    extension: 'PNG',
    status: 'Validated',
    hash: 'sha256:4f8e7d2a8b9c1e0f3d5a7b9c2d4e6f8a0b1c3d5e7f9a1b3c5d7e9f1a3b5c7d9e',
    timestamp: '2026-08-20 10:42:15 IST',
    extractedUtr: '423189041289',
    extractedAmount: '₹48,500',
    rawText: 'Payment of ₹48,500 to merchant_paytm@paytm. UTR / Ref No: 423189041289. Date: 20 Aug 2026, 09:30 AM.'
  },
  {
    id: 'ev-2',
    name: 'fake_sbi_kyc_sms_alert.txt',
    category: 'Phishing SMS / WhatsApp Chat',
    size: '14 KB',
    extension: 'TXT',
    status: 'Validated',
    hash: 'sha256:9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b',
    timestamp: '2026-08-20 10:43:22 IST',
    rawText: 'SMS from "VM-SBIBNK": Dear Customer, Your SBI YONO account will be blocked today. Update your PAN immediately at https://sbi-kyc-verify-portal.online or call 9876543210.'
  },
  {
    id: 'ev-3',
    name: 'telegram_task_crypto_fraud_chat.pdf',
    category: 'Work-from-Home / Telegram Scam Chat',
    size: '640 KB',
    extension: 'PDF',
    status: 'Validated',
    hash: 'sha256:1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c',
    timestamp: '2026-08-20 10:44:00 IST',
    rawText: 'Chat Log with "HR Priya": Deposit ₹5,000 to get ₹7,500 daily commission for Google Maps reviews task. Transfer to UPI ID: taskmerchant@okaxis.'
  }
];

export const DEFAULT_COMPLAINT: ComplaintData = {
  caseId: '1930-2026-8374-KA',
  acknowledgementNo: 'ACK-CFCFRMS-2026-991204',
  incidentDate: 'August 20, 2026 - 09:30 AM IST',
  complaintType: 'UPI QR Code / Payment Gateway Fraud',
  severity: 'Critical',
  narrative: 'Received a call from a suspect claiming to be an SBI representative for KYC verification. Suspect guided me to approve a collect request on Google Pay believing it was a cashback verification of ₹10, but ₹48,500 was immediately deducted from my account.',
  financialLoss: '₹48,500',
  victimName: 'Ramesh Kumar',
  victimPhone: '+91 98450 12345',
  victimState: 'Karnataka',
  victimCity: 'Bengaluru',
  bankDetails: {
    victimBank: 'State Bank of India (SBI)',
    victimAccountNumber: '•••• •••• 4891',
    victimUpiId: 'ramesh.kumar@oksbi',
    transactionIdOrUtr: '423189041289',
    amountLost: '₹48,500',
    transactionDate: '2026-08-20',
    transactionTime: '09:30 AM',
    paymentMode: 'UPI',
    suspectBankOrWallet: 'Paytm Payments Bank / Axis Bank',
    suspectUpiId: 'fraudster.quickpay@paytm',
    suspectAccountNumber: '919876543210',
    suspectPhoneNumber: '+91 98765 43210'
  },
  evidenceList: INITIAL_EVIDENCE,
  isSyntheticConfirmed: false,
  isGoldenHour: true,
  status: 'Lien Placed on Suspect Account',
  createdAt: '2026-08-20T10:45:00Z',
  officerId: 'NODAL-1930-I4C',
  contactEmail: 'citizen.helpdesk@cybercrime.gov.in'
};

export const FINANCIAL_FRAUD_CATEGORIES = [
  'UPI / QR Code / Payment App Scam (GPay, PhonePe, Paytm)',
  'Bank KYC Update / APK Remote Access (AnyDesk/TeamViewer)',
  'Part-Time Job / Telegram Task / YouTube Like Scam',
  'Credit / Debit Card Online Fraud & OTP Scam',
  'Fake Investment / Crypto Trading / Ponzi Scheme',
  'Digital Arrest / Fake Police / CBI / FedEx Parcel Extortion',
  'Loan App Blackmail & Contact List Harassment',
  'Matrimonial / Dating / Romance Financial Scam',
  'Aadhaar Enabled Payment System (AEPS) Biometric Fraud',
  'SIM Swap / Net Banking Unauthorized Transfer'
];

export const MAJOR_INDIAN_BANKS = [
  'State Bank of India (SBI)',
  'HDFC Bank',
  'ICICI Bank',
  'Punjab National Bank (PNB)',
  'Bank of Baroda',
  'Axis Bank',
  'Kotak Mahindra Bank',
  'Canara Bank',
  'Union Bank of India',
  'IndusInd Bank',
  'Paytm Payments Bank',
  'Airtel Payments Bank',
  'Google Pay / NPCI UPI',
  'PhonePe Wallet / UPI',
  'Other / Regional Bank'
];

export const QUICK_SAMPLE_FRAUD_CASES = [
  {
    title: 'Senior Citizen KYC Scam (₹75,000)',
    type: 'Bank KYC Update / APK Remote Access (AnyDesk/TeamViewer)',
    bank: 'State Bank of India (SBI)',
    amount: '₹75,000',
    utr: '423189041289',
    suspectPhone: '+91 98765 43210',
    text: 'A person called me pretending to be from SBI head office saying my bank account was blocked due to pending KYC. They sent an SMS with a link and asked me to install a quick verification app (AnyDesk). Within 5 minutes, ₹75,000 was deducted in two transactions.'
  },
  {
    title: 'Gen Z Telegram Task Scam (₹25,000)',
    type: 'Part-Time Job / Telegram Task / YouTube Like Scam',
    bank: 'HDFC Bank',
    amount: '₹25,000',
    utr: 'HDFC9821045129',
    suspectPhone: '+91 87654 32109',
    text: 'Got a WhatsApp message offering work-from-home ₹3,000/day for reviewing hotels on Google Maps. First they paid ₹150 for 3 reviews to build trust, then asked me to invest ₹25,000 in a crypto trading portal on Telegram. Now they are asking ₹50,000 more to withdraw.'
  },
  {
    title: 'UPI QR Code OLX Scam (₹30,000)',
    type: 'UPI / QR Code / Payment App Scam (GPay, PhonePe, Paytm)',
    bank: 'ICICI Bank',
    amount: '₹30,000',
    utr: '423019842105',
    suspectPhone: '+91 91234 56780',
    text: 'I listed a sofa on OLX. Buyer claimed to be an Army officer and said he would pay advance via Google Pay QR code. He sent a QR code and said "Scan and enter your UPI PIN to receive ₹30,000". When I entered PIN, money was debited from my account instead of credited.'
  }
];

export const SAMPLE_FINANCIAL_EVIDENCE = INITIAL_EVIDENCE;
export const THREAT_CATEGORIES = FINANCIAL_FRAUD_CATEGORIES;
export const INDIAN_BANKS = MAJOR_INDIAN_BANKS;

