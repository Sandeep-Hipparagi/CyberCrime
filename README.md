## National CyberCrime 1930 — Citizen Financial Cyber Fraud Reporting Portal

> An intelligent, fast-track incident triage and evidence preservation system designed for emergency citizen reporting, bank lien broadcast, and regulatory cybercrime documentation under the **Citizen Financial Cyber Fraud Reporting**.

---

## 📌 Overview

The **National CyberCrime 1930 Portal** empowers citizens and victims of cyber fraud (including UPI scams, Fake APK screen takeovers, Telegram task traps, and Bank KYC phishing) to lodge complaints within the critical **"Golden Hour"** (2–4 hours post-incident). 

By structuring evidence and parsing transaction metadata instantaneously, the platform accelerates beneficiary bank account liens, freezes fraudulent fund outflows, and produces judicially admissible evidence packages compliant with **Section 65B of the Indian Evidence Act**.

---

## 🚀 Key Features

### 1. 🎙️ Multi-Modal Adaptive Intake
* **Voice Dictation Assistant**: Real-time microphone audio transcription that intelligently captures victim narratives in natural language.
* **SMS & OCR Transaction Parser**: Automatically detects and extracts 12-digit UPI UTR numbers, debit amounts, victim banks, and suspect phone numbers/UPI handles.
* **Screenshot & Chat Importer**: Rapid upload and parsing for WhatsApp/Telegram scam conversations, fake payment receipts, and APK installation traces.

### 2. ⚡ Golden Hour Rapid Response Protocol
* **Automated Lien Telemetry**: Prepares standardized transmission packets for beneficiary bank fraud nodal desks.
* **Instant Risk Stratification**: Dynamically calculates threat levels (Critical, High, Elevated) based on incident age and loss magnitude.
* **1-Click Pre-Built Test Simulations**:
  * *Senior Citizen KYC / APK Screen Share Scam (₹75,000)*
  * *Gen Z Part-Time Job / Telegram Task Scam (₹25,000)*
  * *OLX Army Buyer UPI QR Code Scam (₹30,000)*

### 3. 🔒 Forensic Evidence & Cryptographic Chain of Custody
* **SHA-256 Checksum Sealing**: Every uploaded screenshot, PDF, or log file is hashed on ingestion to guarantee tamper-proof integrity.
* **Section 65B Certificate Generation**: Standardized electronic record authentication for court proceedings and FIR registration.
* **Redaction & PII Protection**: Client-side data masking for sensitive bank credentials and PINs.

### 4. 👓 Universal Accessibility & Senior Citizen "Easy Mode"
* **Accessible Typography & Contrast**: One-click toggle for enlarged fonts, high-contrast borders, and simplified terminology.
* **Audio Playback & Prompts**: Synthesized speech verification for elderly users.
* **Minimal Friction Forms**: Fast-track single-screen entry preventing cognitive overload during crisis moments.

### 5. 📊 1930 Telemetry & Case Tracker
* **Real-Time Resolution Milestones**:
  1. *1930 Ingestion & Cryptographic Seal*
  2. *Nodal Bank Broadcast (ICICI / HDFC / Axis / SBI / Wallets)*
  3. *Lien & Account Freeze Execution*
  4. *Court Order & Section 457 CrPC Fund Refund Pipeline*
* **Export Certified Dossier**: Instantly generate and print printable legal case dockets (`.txt` / formatted summary).

---

## 🛠️ Technology Stack & Architecture

* **Frontend Framework**: React 18+ with TypeScript
* **Build Tooling**: Vite
* **Styling & Design System**: Tailwind CSS with custom deep-space palette (`#041329`, `#112240`, `#5ffbd6`)
* **Icons & Visuals**: Lucide React
* **Typography**: Clean pairing of sans-serif interfaces with monospace telemetry displays
* **State Management**: React state hooks with persistent local state caches

---

## 📁 Project Structure

```text
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── TopNavbar.tsx          # Floating Pill Navigation with 1930 status
│   │   │   └── Footer.tsx             # Compliance notices and emergency hotlines
│   │   ├── modals/
│   │   │   ├── EvidencePreviewModal.tsx # Cryptographic SHA-256 artifact inspector
│   │   │   └── ImmediateHelpModal.tsx   # 4 Golden Hour emergency actions guide
│   │   └── screens/
│   │       ├── HomeScreen.tsx         # Sentinel hero & fast-track scenario launcher
│   │       ├── SelectInputScreen.tsx  # Intake method selector (Voice / Text / Screenshots)
│   │       ├── VoiceInputScreen.tsx   # Speech recognition & live extraction engine
│   │       ├── NarrativeScreen.tsx    # Bank details, UTR inputs & narrative editor
│   │       ├── EvidenceScreen.tsx     # Section 65B proof upload & hash verification
│   │       ├── SummaryScreen.tsx      # Pre-submission verification & legal attestation
│   │       ├── ConfirmationScreen.tsx # Certified docket & download terminal
│   │       ├── CaseTrackerScreen.tsx  # Live bank lien telemetry status
│   │       └── AuthScreen.tsx         # Bank nodal officer & cyber cell login
│   ├── data/
│   │   └── mockData.ts                # Preset scenarios, bank lists & threat profiles
│   ├── types.ts                       # Core TypeScript definitions and interfaces
│   ├── App.tsx                        # Master routing, state & Senior Mode provider
│   ├── main.tsx                       # React DOM entry point
│   └── index.css                      # Tailwind styles & atmospheric animations
├── metadata.json                      # App configuration and manifest
├── package.json                       # Dependencies & build scripts
└── tsconfig.json                      # TypeScript configuration
```

---

## 🚦 Getting Started

### Prerequisites
* **Node.js** (v18.0.0 or later)
* **npm** or **bun** / **yarn**

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/sandeep-hipparagi/cybercrime.git
   cd cybercrime-portal
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   The application will be accessible at `http://localhost:3000`.

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## ⚖️ Legal & Regulatory Compliance

* **Information Technology Act, 2000**: Section 43, 66C (Identity Theft), and Section 66D (Cheating by Personation using Computer Resource).
* **Indian Evidence Act, 1872**: Section 65B for digital evidence admissibility.
* **Reserve Bank of India (RBI) Circular 2017**: Limiting liability of customers in unauthorized electronic banking transactions.
* **Ministry of Home Affairs (I4C)**: Standard operating procedures for the 1930 Citizen Financial Cyber Fraud Reporting System.

---

## 👨‍💻 Author & Developer

**Sandeep Hipparagi**  
*Lead Software Engineer & Architect*  
*Email*: [hipparagi95@gmail.com](mailto:hipparagi95@gmail.com)

---

## 📄 License

This project is licensed under the **MIT License**.
