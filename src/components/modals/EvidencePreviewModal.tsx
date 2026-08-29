import React from 'react';
import { X, FileText, CheckCircle2, Copy, Download, ShieldCheck, Hash, Database, Clock } from 'lucide-react';
import { EvidenceItem } from '../../types';

interface EvidencePreviewModalProps {
  evidence: EvidenceItem | null;
  onClose: () => void;
}

export const EvidencePreviewModal: React.FC<EvidencePreviewModalProps> = ({ evidence, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  if (!evidence) return null;

  const handleCopyHash = () => {
    navigator.clipboard.writeText(evidence.hash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadProof = () => {
    const payload = JSON.stringify(evidence, null, 2);
    const blob = new Blob([payload], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `forensic_hash_${evidence.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div 
        className="glass-panel w-full max-w-2xl rounded-2xl border border-[#233554] bg-[#0d1c32] p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-[#112240] text-[#bacac3] hover:text-white border border-[#233554] transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-xl bg-[#5ffbd6]/10 border border-[#5ffbd6]/40 flex items-center justify-center text-[#5ffbd6]">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs uppercase tracking-wider text-[#5ffbd6] font-semibold">
                Forensic Artifact Inspection
              </span>
              <span className="px-2 py-0.5 rounded bg-[#5ffbd6]/20 border border-[#5ffbd6]/40 text-[#5ffbd6] font-mono text-[10px] font-bold">
                {evidence.status}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white font-mono break-all">
              {evidence.name}
            </h2>
          </div>
        </div>

        {/* Forensic Metadata Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 font-mono text-xs">
          <div className="p-3 rounded-lg bg-[#112240] border border-[#233554]">
            <div className="text-[#bacac3] text-[10px] uppercase">Artifact Category</div>
            <div className="text-white font-semibold mt-0.5">{evidence.category}</div>
          </div>

          <div className="p-3 rounded-lg bg-[#112240] border border-[#233554]">
            <div className="text-[#bacac3] text-[10px] uppercase">File Size / Type</div>
            <div className="text-white font-semibold mt-0.5">{evidence.size} ({evidence.extension})</div>
          </div>

          <div className="p-3 rounded-lg bg-[#112240] border border-[#233554]">
            <div className="text-[#bacac3] text-[10px] uppercase">Capture Timestamp</div>
            <div className="text-white font-semibold mt-0.5">{evidence.timestamp}</div>
          </div>

          <div className="p-3 rounded-lg bg-[#112240] border border-[#233554]">
            <div className="text-[#bacac3] text-[10px] uppercase">Custody Node</div>
            <div className="text-[#5ffbd6] font-semibold mt-0.5">LOCAL_FORENSIC_ENCLAVE_1</div>
          </div>
        </div>

        {/* SHA-256 Hash Verification Box */}
        <div className="p-4 rounded-xl bg-[#071324] border border-[#5ffbd6]/30 mb-6 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-wider text-[#5ffbd6] flex items-center gap-1.5 font-bold">
              <Hash className="w-3.5 h-3.5" />
              Cryptographic Integrity Hash (SHA-256)
            </span>
            <button
              onClick={handleCopyHash}
              className="text-xs font-mono text-[#5ffbd6] hover:text-white flex items-center gap-1 transition-colors"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copied ? 'Copied!' : 'Copy Hash'}</span>
            </button>
          </div>
          <div className="font-mono text-xs text-[#d6e3ff] bg-[#020b18] p-2.5 rounded border border-[#233554] break-all select-all">
            {evidence.hash}
          </div>
        </div>

        {/* Raw text / Log Sample View */}
        {evidence.rawText && (
          <div className="mb-6 space-y-2">
            <span className="font-mono text-xs uppercase tracking-wider text-[#bacac3]">
              Decrypted Artifact Payload / Summary
            </span>
            <pre className="font-mono text-xs text-[#5ffbd6] bg-[#040f1f] p-3 rounded-xl border border-[#233554] overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-48">
              {evidence.rawText}
            </pre>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-[#233554]">
          <button
            onClick={handleDownloadProof}
            className="flex-1 bg-[#112240] hover:bg-[#1c2a41] text-white border border-[#233554] px-4 py-2.5 rounded-lg font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
          >
            <Download className="w-4 h-4 text-[#5ffbd6]" />
            Export Cryptographic Proof Certificate
          </button>
          <button
            onClick={onClose}
            className="bg-[#5ffbd6] hover:bg-[#38debb] text-[#041329] font-bold px-6 py-2.5 rounded-lg font-mono text-xs uppercase tracking-wider transition-all"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
