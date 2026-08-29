/**
 * AI-powered Fraud Risk & Pattern Analysis Engine
 * Evaluates incident narrative, keywords, transaction vectors, and suspect behaviors
 */

export interface FraudRiskAnalysis {
  threatScore: number; // 0 - 100
  threatLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  detectedModusOperandi: string[];
  vulnerabilitiesExposed: string[];
  immediatePreventionTips: {
    title: string;
    description: string;
    urgency: 'Immediate' | 'Important' | 'Recommended';
    actionType: 'device' | 'banking' | 'telecom' | 'legal';
  }[];
  regulatoryAdvice: string;
  goldenHourEligibility: boolean;
}

export function analyzeFraudRisk(narrative: string, complaintType: string, amount: string): FraudRiskAnalysis {
  const text = (narrative + ' ' + complaintType).toLowerCase();
  
  const detectedVectors: string[] = [];
  const vulnerabilities: string[] = [];
  const tips: FraudRiskAnalysis['immediatePreventionTips'] = [];

  let threatScore = 70; // Base baseline for reported financial crimes

  // 1. Remote Access / APK / Screen Sharing Detection
  if (
    text.includes('apk') ||
    text.includes('anydesk') ||
    text.includes('teamviewer') ||
    text.includes('quicksupport') ||
    text.includes('screen share') ||
    text.includes('rustdesk') ||
    text.includes('download app') ||
    text.includes('install link')
  ) {
    threatScore += 20;
    detectedVectors.push('Malicious Remote Access Tool (RAT) / Rogue APK Sideload');
    vulnerabilities.push('Full device remote control & SMS OTP auto-interception');
    tips.push({
      title: 'Uninstall Remote Tools & Disconnect Device',
      description: 'Turn on Airplane mode immediately. Uninstall AnyDesk, TeamViewer, or unknown .apk files from Android settings, or reset network settings.',
      urgency: 'Immediate',
      actionType: 'device'
    });
  }

  // 2. Fake Bank KYC / Electricity Bill / Sim Block Scams
  if (
    text.includes('kyc') ||
    text.includes('electricity') ||
    text.includes('sim block') ||
    text.includes('pan card') ||
    text.includes('account suspended') ||
    text.includes('update document')
  ) {
    threatScore += 12;
    detectedVectors.push('Social Engineering / Impersonation of Utility / Bank KYC Desk');
    vulnerabilities.push('Phishing harvest of banking credentials & Netbanking credentials');
    tips.push({
      title: 'Change NetBanking & UPI Passwords',
      description: 'Log into your authentic banking app from a different device and change your login password and transaction PIN.',
      urgency: 'Immediate',
      actionType: 'banking'
    });
  }

  // 3. Telegram / Part-Time Job / Task / Crypto Scams
  if (
    text.includes('telegram') ||
    text.includes('part-time') ||
    text.includes('like youtube') ||
    text.includes('task') ||
    text.includes('rating') ||
    text.includes('crypto') ||
    text.includes('investment') ||
    text.includes('high returns') ||
    text.includes('group')
  ) {
    threatScore += 15;
    detectedVectors.push('Multi-Stage Pig Butchering / Prepaid Task Investment Scheme');
    vulnerabilities.push('Repeated extortion & psychological sunk-cost trap');
    tips.push({
      title: 'Cease All Communication & Avoid "Withdrawal Fees"',
      description: 'Do NOT transfer additional money under the pretext of "tax fees", "account unfreezing", or "VIP release". The entire investment dashboard is fake.',
      urgency: 'Immediate',
      actionType: 'legal'
    });
  }

  // 4. Digital Arrest / Sextortion / CBI / Police Impersonation
  if (
    text.includes('police') ||
    text.includes('cbi') ||
    text.includes('customs') ||
    text.includes('digital arrest') ||
    text.includes('fedex') ||
    text.includes('parcel') ||
    text.includes('narcotics') ||
    text.includes('video call')
  ) {
    threatScore += 25;
    detectedVectors.push('Psychological Coercion / Impersonation of Law Enforcement (Digital Arrest)');
    vulnerabilities.push('Unlawful extortion through staged uniform video calls');
    tips.push({
      title: 'Indian Law Enforcement Never Conducts "Digital Arrests"',
      description: 'CBI, ED, Police, and Customs NEVER demand money transfers or hold Skype/WhatsApp video interrogations. Block all numbers immediately.',
      urgency: 'Immediate',
      actionType: 'legal'
    });
  }

  // 5. UPI QR Code / Reverse Charge Scam
  if (
    text.includes('qr') ||
    text.includes('scan to receive') ||
    text.includes('olx') ||
    text.includes('marketplace') ||
    text.includes('send pin')
  ) {
    threatScore += 10;
    detectedVectors.push('Reverse UPI Payment QR Trap (Entering PIN Deducts Money)');
    vulnerabilities.push('Misunderstanding of UPI protocol ("Scan/PIN is only for paying, never for receiving")');
    tips.push({
      title: 'Flag Suspect VPA on PhonePe / Google Pay / Paytm',
      description: 'Open your UPI app transaction history, tap the transaction, and select "Report Fraud / Scam VPA" to trigger automated UPI switch blacklisting.',
      urgency: 'Important',
      actionType: 'banking'
    });
  }

  // General fallback if few vectors caught
  if (detectedVectors.length === 0) {
    detectedVectors.push('Unauthorized Electronic Fund Transfer (UEFT)');
    vulnerabilities.push('Compromised session or unauthorized beneficiary addition');
  }

  if (tips.length < 3) {
    tips.push({
      title: 'Report Suspect Number on Chakshu (Sanchar Saathi)',
      description: 'Visit sancharsaathi.gov.in/chakshu to trigger mandatory telecom carrier suspension of the fraudster’s mobile number and IMEI.',
      urgency: 'Important',
      actionType: 'telecom'
    });
    tips.push({
      title: 'Request Bank Lien Confirmation (1930 Nodal)',
      description: 'Visit your home bank branch within 24 hours with your 1930 Acknowledgment ID and request an immediate dispute chargeback ticket under RBI Circular DPSS.CO.PD.No.144/02.14.008/2017-18.',
      urgency: 'Recommended',
      actionType: 'banking'
    });
  }

  // Cap threat score between 50 and 99
  threatScore = Math.min(98, Math.max(65, threatScore));

  let threatLevel: FraudRiskAnalysis['threatLevel'] = 'Medium';
  if (threatScore >= 88) threatLevel = 'Critical';
  else if (threatScore >= 75) threatLevel = 'High';

  return {
    threatScore,
    threatLevel,
    detectedModusOperandi: detectedVectors,
    vulnerabilitiesExposed: vulnerabilities,
    immediatePreventionTips: tips,
    regulatoryAdvice: 'Protected under RBI Zero Liability Framework (Circular DBR.No.Leg.BC.78/09.07.005/2017-18) when reported promptly.',
    goldenHourEligibility: true
  };
}
