import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, CheckCircle2, Trash2, Eye, Plus, ArrowRight, ShieldCheck, Hash, AlertCircle, Sparkles, Database, FileCheck, Smartphone, Image as ImageIcon, IndianRupee } from 'lucide-react';
import { AppScreen, ComplaintData, EvidenceItem } from '../../types';
import { EvidencePreviewModal } from '../modals/EvidencePreviewModal';
import { SAMPLE_FINANCIAL_EVIDENCE } from '../../data/mockData';

interface EvidenceScreenProps {
  complaintData: ComplaintData;
  onUpdateEvidence: (list: EvidenceItem[], isSyntheticConfirmed: boolean) => void;
  onNavigate: (screen: AppScreen) => void;
}

const FINANCIAL_EVIDENCE_CATEGORIES = [
  'UPI / Banking Payment Screenshot',
  'WhatsApp / Telegram Scam Chat Export',
  'Bank Account Statement (.PDF)',
  'Phishing SMS / Fake KYC Link Screenshot',
  'Malicious APK / Remote Screen App Proof',
  'Fake Investment Dashboard / Crypto Wallet',
  'Audio Recording / Call Log of Fraudster'
];

export const EvidenceScreen: React.FC<EvidenceScreenProps> = ({
  complaintData,
  onUpdateEvidence,
  onNavigate
}) => {
  const [evidenceList, setEvidenceList] = useState<EvidenceItem[]>(complaintData.evidenceList);
  const [category, setCategory] = useState(FINANCIAL_EVIDENCE_CATEGORIES[0]);
  const [isSynthetic, setIsSynthetic] = useState(complaintData.isSyntheticConfirmed);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedPreview, setSelectedPreview] = useState<EvidenceItem | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const generateMockHash = () => {
    const chars = '0123456789abcdef';
    let result = 'sha256:';
    for (let i = 0; i < 64; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const handleFileUpload = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setIsUploading(true);
    const file = files[0];

    setTimeout(() => {
      const ext = file.name.split('.').pop()?.toUpperCase() || 'PNG';
      const sizeStr = file.size > 1024 * 1024
        ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
        : `${Math.max(1, Math.round(file.size / 1024))} KB`;

      const newItem: EvidenceItem = {
        id: `ev-${Date.now()}`,
        name: file.name,
        category: category,
        size: sizeStr,
        extension: ext,
        status: 'Validated',
        hash: generateMockHash(),
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' IST',
        rawText: `Verified 1930 Artifact: ${file.name} | Integrity verification passed. OCR extraction found valid timestamp & transaction reference.`
      };

      const updated = [newItem, ...evidenceList];
      setEvidenceList(updated);
      onUpdateEvidence(updated, isSynthetic);
      setIsUploading(false);
    }, 1100);
  };

  const handleDeleteItem = (id: string) => {
    const updated = evidenceList.filter(item => item.id !== id);
    setEvidenceList(updated);
    onUpdateEvidence(updated, isSynthetic);
  };

  const handleAddSample = (sample: typeof SAMPLE_FINANCIAL_EVIDENCE[0]) => {
    const newItem: EvidenceItem = {
      ...sample,
      id: `ev-${Date.now()}-${Math.floor(Math.random()*1000)}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' IST',
      hash: generateMockHash()
    };
    const updated = [newItem, ...evidenceList];
    setEvidenceList(updated);
    onUpdateEvidence(updated, isSynthetic);
  };

  const handleContinue = () => {
    onUpdateEvidence(evidenceList, isSynthetic);
    onNavigate('summary');
  };

  return (
    <div className="w-full max-w-[1050px] mx-auto px-4 sm:px-6 pt-24 sm:pt-32 pb-16 space-y-8">
      {/* Evidence Modal Inspector */}
      <EvidencePreviewModal
        evidence={selectedPreview}
        onClose={() => setSelectedPreview(null)}
      />

      {/* Step Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#112240] border border-[#5ffbd6]/40 text-[#5ffbd6] text-xs font-mono tracking-widest uppercase">
          Step 2 of 4: Evidence & Screenshots
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
          Attach Fraud Screenshots & Receipts
        </h1>
        <p className="text-sm sm:text-base text-[#bacac3] max-w-2xl mx-auto font-sans leading-relaxed">
          Upload UPI payment receipts, WhatsApp chats with fraudster, or bank statement PDFs. Our engine hashes every file with cryptographic SHA-256 signatures for legal bank investigations.
        </p>
      </div>

      {/* Main Upload Zone */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-[#233554] space-y-6">
        {/* Category selector row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1 w-full sm:w-80">
            <label className="text-xs font-mono uppercase tracking-wider text-[#bacac3] block font-medium">
              Evidence Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-[#071324] border border-[#233554] focus:border-[#5ffbd6] focus:outline-none rounded-xl px-3.5 py-2.5 text-xs font-mono text-white transition-colors"
            >
              {FINANCIAL_EVIDENCE_CATEGORIES.map((cat, i) => (
                <option key={i} value={cat} className="bg-[#071324] text-white">
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Quick sample chips */}
          <div className="sm:self-end flex flex-wrap gap-2">
            <span className="text-[11px] font-mono text-[#bacac3] self-center">Quick add samples:</span>
            {SAMPLE_FINANCIAL_EVIDENCE.slice(0, 2).map((s, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleAddSample(s)}
                className="px-3 py-1.5 rounded-lg bg-[#112240] hover:bg-[#1c2a41] border border-[#5ffbd6]/40 text-[#5ffbd6] font-mono text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{s.name.split('.')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Drag and Drop Zone with animated scan line */}
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            handleFileUpload(e.dataTransfer.files);
          }}
          className="border-2 border-dashed border-[#233554] hover:border-[#5ffbd6] rounded-2xl p-8 sm:p-12 text-center cursor-pointer bg-[#071324]/60 hover:bg-[#071324] transition-all relative overflow-hidden group"
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => handleFileUpload(e.target.files)}
            className="hidden"
          />

          {isUploading && <div className="scan-line" />}

          <div className="space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-[#112240] border border-[#5ffbd6]/40 flex items-center justify-center mx-auto text-[#5ffbd6] group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(95,251,214,0.2)]">
              <UploadCloud className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <div className="font-mono text-sm uppercase tracking-wider text-white font-bold">
                {isUploading ? 'Hashing Artifact Payload & Extracting Metadata...' : 'Drop Screenshots / PDF / Audio Files Here or Click to Browse'}
              </div>
              <p className="text-xs text-[#bacac3] font-sans">
                Supports PNG, JPG, PDF, MP3, MP4, TXT, DOCX (Max 50 MB per file)
              </p>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#112240] border border-[#233554] text-[11px] font-mono text-[#5ffbd6]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Cryptographic SHA-256 Hash Pre-verification</span>
            </div>
          </div>
        </div>

        {/* Synthetic Demo Mode Checkbox */}
        <div className="p-4 rounded-xl bg-[#081528] border border-[#233554] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="syntheticCheck"
              checked={isSynthetic}
              onChange={(e) => setIsSynthetic(e.target.checked)}
              className="w-4 h-4 rounded bg-[#071324] border-[#233554] text-[#5ffbd6] focus:ring-0 focus:ring-offset-0 cursor-pointer"
            />
            <label htmlFor="syntheticCheck" className="text-xs font-mono text-white cursor-pointer select-none">
              <span className="font-bold text-[#5ffbd6]">Demo Simulation:</span> Confirm this is for testing and prototype evaluation
            </label>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#112240] border border-[#233554] text-[#bacac3] hidden sm:block">
            Section 65B Indian Evidence Act Compliant
          </span>
        </div>
      </div>

      {/* Ingested Evidence Registry Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Database className="w-5 h-5 text-[#5ffbd6]" />
            Evidence Artifact Registry ({evidenceList.length})
          </h2>
          <span className="text-xs font-mono text-[#bacac3]">
            {evidenceList.length} verified artifacts in chain of custody
          </span>
        </div>

        {evidenceList.length === 0 ? (
          <div className="glass-card rounded-2xl p-8 text-center text-xs font-mono text-[#bacac3] border border-[#233554]">
            No artifacts added yet. Upload screenshots above or click quick sample buttons.
          </div>
        ) : (
          <div className="space-y-3">
            {evidenceList.map((item) => (
              <div
                key={item.id}
                className="glass-card rounded-2xl p-4 sm:p-5 border border-[#233554] hover:border-[#5ffbd6]/40 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                {/* File info */}
                <div className="flex items-start sm:items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-[#112240] border border-[#5ffbd6]/30 flex items-center justify-center font-mono text-xs font-bold text-[#5ffbd6] shrink-0">
                    {item.extension}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-semibold text-white break-all">
                        {item.name}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-[#5ffbd6]/15 border border-[#5ffbd6]/30 text-[#5ffbd6] font-mono text-[10px] font-bold">
                        {item.status}
                      </span>
                    </div>
                    <div className="text-xs font-mono text-[#bacac3] flex flex-wrap items-center gap-2">
                      <span>{item.category}</span>
                      <span>&bull;</span>
                      <span>{item.size}</span>
                      <span>&bull;</span>
                      <span className="text-[#5ffbd6]">{item.timestamp}</span>
                    </div>
                    <div className="text-[11px] font-mono text-[#bacac3]/80 truncate max-w-md">
                      {item.hash}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 w-full sm:w-auto justify-end border-t sm:border-t-0 border-[#233554] pt-2 sm:pt-0">
                  <button
                    onClick={() => setSelectedPreview(item)}
                    className="px-3 py-2 rounded-xl bg-[#112240] hover:bg-[#1c2a41] text-[#5ffbd6] border border-[#233554] font-mono text-xs flex items-center gap-1.5 transition-colors"
                    title="Inspect Artifact & Hash"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View</span>
                  </button>
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="p-2 rounded-xl bg-[#112240] hover:bg-[#93000a]/40 text-[#ffb4ab] border border-[#233554] transition-colors"
                    title="Delete Artifact"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Navigation Footer Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#233554]">
        <button
          type="button"
          onClick={() => onNavigate('narrative')}
          className="w-full sm:w-auto px-5 py-3 rounded-xl text-xs font-mono text-[#bacac3] hover:text-white transition-colors"
        >
          &larr; Back to Bank Form
        </button>

        <button
          type="button"
          onClick={handleContinue}
          className="w-full sm:w-auto bg-[#5ffbd6] hover:bg-[#38debb] text-[#041329] font-bold px-8 py-3.5 rounded-xl font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(95,251,214,0.3)] hover:shadow-[0_0_25px_rgba(95,251,214,0.5)] active:scale-[0.98] transition-all"
        >
          <span>Continue to Step 3: 1930 Docket Summary</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

