import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Certificate } from '../data/certificates';
import {
  Award,
  ExternalLink,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Download,
  Printer,
  Maximize2,
  CheckCircle2,
  Share2,
  Calendar,
  Building,
  Tag,
} from 'lucide-react';

export interface CertificateModalProps {
  certificate?: Certificate | null;
  selectedCert?: Certificate | null;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  currentIndex?: number;
  totalCount?: number;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  certificate,
  selectedCert: propSelectedCert,
  onClose,
  onPrev,
  onNext,
  currentIndex,
  totalCount,
}) => {
  // Support either selectedCert or certificate prop seamlessly
  const selectedCert = propSelectedCert ?? certificate ?? null;

  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [panPosition, setPanPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isPrinting, setIsPrinting] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Reset zoom & pan when certificate changes or modal opens
  useEffect(() => {
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
    setIsDragging(false);
  }, [selectedCert]);

  // Keyboard navigation & Esc to close
  useEffect(() => {
    if (!selectedCert) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
      if (e.key === 'ArrowRight' && onNext) onNext();
      if (e.key === '+' || e.key === '=') handleZoomIn();
      if (e.key === '-' || e.key === '_') handleZoomOut();
      if (e.key === '0') resetZoom();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedCert, onPrev, onNext, onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedCert) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedCert]);

  const resetZoom = () => {
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(Number((prev + 0.35).toFixed(2)), 3));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => {
      const next = Math.max(Number((prev - 0.35).toFixed(2)), 0.7);
      if (next <= 1) setPanPosition({ x: 0, y: 0 });
      return next;
    });
  };

  // High-resolution image download handler
  const handleDownload = async () => {
    if (!selectedCert) return;
    try {
      const response = await fetch(selectedCert.image);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      const cleanFileName = `${selectedCert.id || 'certificate'}.png`;
      link.download = cleanFileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
    } catch {
      // Fallback
      const link = document.createElement('a');
      link.href = selectedCert.image;
      link.download = `${selectedCert.id || 'certificate'}.png`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Print certificate with clean landscape view
  const handlePrint = () => {
    if (!selectedCert) return;
    setIsPrinting(true);
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>${selectedCert.title} - ${selectedCert.issuer}</title>
            <style>
              @page {
                size: landscape;
                margin: 0;
              }
              body {
                margin: 0;
                padding: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                min-height: 100vh;
                background-color: #030610;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
              }
              img {
                max-width: 98vw;
                max-height: 98vh;
                object-fit: contain;
                display: block;
              }
            </style>
          </head>
          <body>
            <img src="${window.location.origin}${selectedCert.image}" onload="window.focus(); window.print(); window.close();" />
          </body>
        </html>
      `);
      printWindow.document.close();
    } else {
      window.print();
    }
    setTimeout(() => setIsPrinting(false), 800);
  };

  // Copy direct link to clipboard
  const handleShare = async () => {
    if (!selectedCert) return;
    const shareUrl = `${window.location.origin}${window.location.pathname}#cert-${selectedCert.id}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch {
      // ignore
    }
  };

  const getCategoryBadgeLabel = (cat: Certificate['category']) => {
    switch (cat) {
      case 'internship':
        return 'Enterprise Internship';
      case 'committee':
        return 'Executive Committee';
      case 'seminar':
        return 'Technical Seminar';
      default:
        return 'Certification';
    }
  };

  if (!selectedCert) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="cert-modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          key="cert-modal-dialog"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-5xl max-h-[92vh] flex flex-col rounded-2xl bg-zinc-950 border border-zinc-800 shadow-2xl overflow-hidden text-zinc-100"
        >
          {/* Top Control Bar */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-zinc-800/80 bg-zinc-900/60 backdrop-blur">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
              <Award className="w-4 h-4 text-cyan-400 shrink-0" />
              <span className="text-cyan-400 font-semibold uppercase truncate max-w-[140px] sm:max-w-none">
                {getCategoryBadgeLabel(selectedCert.category)}
              </span>
              <span className="text-zinc-600 hidden sm:inline">·</span>
              <span className="text-zinc-300 hidden sm:inline">{selectedCert.date}</span>
            </div>

            {/* Actions Toolbar */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Zoom Controls */}
              <div className="flex items-center rounded-lg bg-zinc-800/70 p-0.5 border border-zinc-700/60">
                <button
                  type="button"
                  onClick={handleZoomOut}
                  disabled={zoomLevel <= 0.7}
                  className="p-1.5 rounded-md text-zinc-300 hover:text-white hover:bg-zinc-700 disabled:opacity-35 disabled:hover:bg-transparent transition-colors"
                  title="Zoom Out (-)"
                  aria-label="Zoom out"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={resetZoom}
                  className="px-2 py-0.5 text-[11px] font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
                  title="Reset Zoom (0)"
                >
                  {Math.round(zoomLevel * 100)}%
                </button>
                <button
                  type="button"
                  onClick={handleZoomIn}
                  disabled={zoomLevel >= 3}
                  className="p-1.5 rounded-md text-zinc-300 hover:text-white hover:bg-zinc-700 disabled:opacity-35 disabled:hover:bg-transparent transition-colors"
                  title="Zoom In (+)"
                  aria-label="Zoom in"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Download Action */}
              <button
                type="button"
                onClick={handleDownload}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-cyan-950/60 hover:bg-cyan-900/80 border border-cyan-800/60 text-cyan-300 hover:text-cyan-100 transition-all shadow-sm"
                title="Download full-resolution certificate image"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Download</span>
              </button>

              {/* Print Action */}
              <button
                type="button"
                onClick={handlePrint}
                disabled={isPrinting}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-zinc-800/80 hover:bg-zinc-700/90 border border-zinc-700/60 text-zinc-200 hover:text-white transition-all shadow-sm"
                title="Print certificate (clean layout)"
              >
                <Printer className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Print</span>
              </button>

              {/* Share / Copy link */}
              <button
                type="button"
                onClick={handleShare}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-cyan-400 hover:bg-zinc-800 transition-colors hidden sm:flex items-center"
                title={copiedLink ? 'Link copied!' : 'Copy direct link'}
                aria-label="Share certificate"
              >
                <Share2 className="w-4 h-4" />
              </button>

              {/* Open in full tab */}
              <a
                href={selectedCert.image}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg text-zinc-400 hover:text-cyan-400 hover:bg-zinc-800 transition-colors"
                title="Open original PNG in new tab"
              >
                <ExternalLink className="w-4 h-4" />
              </a>

              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors ml-1"
                title="Close modal (Esc)"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Content: Split High-Res Interactive Canvas & Detail Panel */}
          <div className="flex-1 overflow-hidden flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-zinc-800/80">
            {/* Left/Top: High-Resolution Interactive Image Canvas */}
            <div
              className="relative flex-1 min-h-[340px] lg:min-h-[500px] bg-[#030610] flex items-center justify-center p-4 sm:p-6 overflow-hidden select-none"
              onMouseDown={(e) => {
                if (zoomLevel > 1) {
                  setIsDragging(true);
                  setDragStart({ x: e.clientX - panPosition.x, y: e.clientY - panPosition.y });
                }
              }}
              onMouseMove={(e) => {
                if (isDragging && zoomLevel > 1) {
                  setPanPosition({
                    x: e.clientX - dragStart.x,
                    y: e.clientY - dragStart.y,
                  });
                }
              }}
              onMouseUp={() => setIsDragging(false)}
              onMouseLeave={() => setIsDragging(false)}
              onWheel={(e) => {
                e.preventDefault();
                if (e.deltaY < 0) {
                  handleZoomIn();
                } else {
                  handleZoomOut();
                }
              }}
            >
              {/* Subtle Blueprint Mesh Backdrop */}
              <div
                className="absolute inset-0 opacity-[0.04] pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(circle at 1px 1px, #38bdf8 1px, transparent 0)',
                  backgroundSize: '24px 24px',
                }}
              />

              {/* Interaction Hint Badge */}
              <div className="absolute bottom-3 left-3 z-10 flex items-center gap-2 pointer-events-none text-[11px] font-mono text-zinc-500 bg-zinc-950/70 backdrop-blur px-2.5 py-1 rounded-md border border-zinc-800/70">
                <Maximize2 className="w-3 h-3 text-cyan-400" />
                <span>Scroll or click to zoom · Drag to pan</span>
              </div>

              {/* High-Resolution Certificate Image */}
              <div
                className="transition-transform duration-100 ease-out flex items-center justify-center"
                style={{
                  transform: `translate(${panPosition.x}px, ${panPosition.y}px) scale(${zoomLevel})`,
                  cursor: zoomLevel > 1 ? (isDragging ? 'grabbing' : 'grab') : 'zoom-in',
                }}
              >
                <img
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  referrerPolicy="no-referrer"
                  draggable={false}
                  className="max-h-[62vh] max-w-full object-contain rounded-lg shadow-2xl ring-1 ring-zinc-700/50"
                  onClick={() => {
                    if (zoomLevel === 1) {
                      setZoomLevel(1.75);
                    } else {
                      resetZoom();
                    }
                  }}
                />
              </div>
            </div>

            {/* Right/Bottom: Credential Inspection Metadata */}
            <div className="w-full lg:w-96 p-6 flex flex-col justify-between bg-zinc-900/30 overflow-y-auto">
              <div className="space-y-4">
                <div>
                  <span className="text-[11px] font-mono text-cyan-400 tracking-wider uppercase">
                    {selectedCert.issuer}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-1 leading-snug">
                    {selectedCert.title}
                  </h3>
                </div>

                <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800/80 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-400 flex items-center gap-1.5">
                      <Building className="w-3.5 h-3.5 text-zinc-500" />
                      Role:
                    </span>
                    <span className="text-zinc-200 font-medium text-right truncate max-w-[180px]">
                      {selectedCert.role}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-400 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                      Issued Date:
                    </span>
                    <span className="text-zinc-200 font-mono">{selectedCert.date}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-400 flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-zinc-500" />
                      Category:
                    </span>
                    <span className="text-cyan-400 font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {getCategoryBadgeLabel(selectedCert.category)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs pt-1 border-t border-zinc-800/60">
                    <span className="text-zinc-500">Authentication:</span>
                    <span className="text-emerald-400 font-mono text-[11px] flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      VERIFIED OFFICIAL
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                    Domain & Focus Area
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {selectedCert.theme}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                    Core Competencies
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {(selectedCert.tags || []).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md bg-zinc-800/80 text-zinc-300 text-[11px] font-mono border border-zinc-700/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Navigation Footer */}
              <div className="mt-6 pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                <button
                  type="button"
                  onClick={onPrev}
                  disabled={!onPrev}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-300 hover:text-white hover:bg-zinc-800 disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>

                {typeof currentIndex === 'number' && typeof totalCount === 'number' && (
                  <span className="text-xs font-mono text-zinc-500">
                    {currentIndex + 1} of {totalCount}
                  </span>
                )}

                <button
                  type="button"
                  onClick={onNext}
                  disabled={!onNext}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-300 hover:text-white hover:bg-zinc-800 disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
