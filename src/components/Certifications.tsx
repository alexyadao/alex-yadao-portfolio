import React, { useState, useMemo } from 'react';
import { motion, type Variants } from 'framer-motion';
import { CERTIFICATES, Certificate } from '../data/certificates';
import { CertificateModal } from './CertificateModal';
import {
  Award,
  Search,
  ExternalLink,
  Sparkles,
  Briefcase,
  Users,
  GraduationCap,
  Calendar,
  Building,
  CheckCircle2,
  ZoomIn,
  X,
} from 'lucide-react';

const cardContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const cardItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 22,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const Certifications: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'internship' | 'committee' | 'seminar'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyFeatured, setOnlyFeatured] = useState(false);
  const [activeCert, setActiveCert] = useState<Certificate | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  // Filtered certificates
  const filteredCertificates = useMemo(() => {
    return CERTIFICATES.filter((cert) => {
      const matchesCategory = selectedCategory === 'all' || cert.category === selectedCategory;
      const matchesFeatured = !onlyFeatured || cert.featured;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        cert.title.toLowerCase().includes(q) ||
        cert.issuer.toLowerCase().includes(q) ||
        cert.theme.toLowerCase().includes(q) ||
        (cert.tags && cert.tags.some((t) => t.toLowerCase().includes(q)));

      return matchesCategory && matchesFeatured && matchesSearch;
    });
  }, [selectedCategory, searchQuery, onlyFeatured]);

  // Modal navigation (Next / Prev)
  const handlePrevCert = () => {
    if (!activeCert) return;
    const currentIndex = filteredCertificates.findIndex((c) => c.id === activeCert.id);
    if (currentIndex > 0) {
      setActiveCert(filteredCertificates[currentIndex - 1]);
    } else {
      setActiveCert(filteredCertificates[filteredCertificates.length - 1]);
    }
  };

  const handleNextCert = () => {
    if (!activeCert) return;
    const currentIndex = filteredCertificates.findIndex((c) => c.id === activeCert.id);
    if (currentIndex < filteredCertificates.length - 1) {
      setActiveCert(filteredCertificates[currentIndex + 1]);
    } else {
      setActiveCert(filteredCertificates[0]);
    }
  };

  const handleImageError = (id: string) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
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

  const getCategoryIcon = (cat: Certificate['category']) => {
    switch (cat) {
      case 'internship':
        return Briefcase;
      case 'committee':
        return Users;
      case 'seminar':
        return GraduationCap;
      default:
        return Award;
    }
  };

  return (
    <section id="certifications" className="relative py-24 px-4 sm:px-6 max-w-6xl mx-auto scroll-mt-20">
      {/* Editorial Header */}
      <div className="flex flex-col items-center text-center mb-12">
        <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-cyan-600 dark:text-cyan-400 uppercase mb-3">
          <Award className="w-4 h-4" />
          <span>Accreditations & Professional Milestones</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 max-w-3xl">
          Certifications & Industry Milestones
        </h2>
        <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400 max-w-2xl text-balance">
          13 verified accreditations spanning junior system administration, enterprise IT operations, academic leadership committees, and emerging cloud engineering symposiums.
        </p>

        {/* High-Level Milestone Telemetry KPI Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8 w-full max-w-3xl">
          <div className="p-3.5 rounded-xl bg-zinc-100/80 dark:bg-zinc-900/50 border border-zinc-200/80 dark:border-zinc-800/80 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold font-mono text-cyan-600 dark:text-cyan-400 tabular-nums">13</span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Verified Credentials</span>
          </div>
          <div className="p-3.5 rounded-xl bg-zinc-100/80 dark:bg-zinc-900/50 border border-zinc-200/80 dark:border-zinc-800/80 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold font-mono text-indigo-600 dark:text-indigo-400 tabular-nums">2</span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Enterprise Internships</span>
          </div>
          <div className="p-3.5 rounded-xl bg-zinc-100/80 dark:bg-zinc-900/50 border border-zinc-200/80 dark:border-zinc-800/80 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400 tabular-nums">5</span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Committee Delegations</span>
          </div>
          <div className="p-3.5 rounded-xl bg-zinc-100/80 dark:bg-zinc-900/50 border border-zinc-200/80 dark:border-zinc-800/80 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold font-mono text-violet-600 dark:text-violet-400 tabular-nums">6</span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Masterclass Seminars</span>
          </div>
        </div>
      </div>

      {/* Interactive Filter Toolbar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8 p-3 rounded-2xl bg-zinc-100/90 dark:bg-zinc-900/60 border border-zinc-200/90 dark:border-zinc-800/80 backdrop-blur-md">
        {/* Segmented Category Buttons */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
              selectedCategory === 'all'
                ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-xs font-semibold'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
            }`}
          >
            All Accreditations ({CERTIFICATES.length})
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('internship')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
              selectedCategory === 'internship'
                ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-xs font-semibold'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
            }`}
          >
            Internships ({CERTIFICATES.filter((c) => c.category === 'internship').length})
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('committee')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
              selectedCategory === 'committee'
                ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-xs font-semibold'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
            }`}
          >
            Committees ({CERTIFICATES.filter((c) => c.category === 'committee').length})
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('seminar')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
              selectedCategory === 'seminar'
                ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-xs font-semibold'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
            }`}
          >
            Seminars ({CERTIFICATES.filter((c) => c.category === 'seminar').length})
          </button>
        </div>

        {/* Right Search & Featured Filter */}
        <div className="flex items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by skill, tech, or issuer..."
              className="w-full pl-8 pr-7 py-1.5 text-xs rounded-lg bg-white dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/80 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Featured Only Toggle */}
          <button
            type="button"
            onClick={() => setOnlyFeatured(!onlyFeatured)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg transition-colors border ${
              onlyFeatured
                ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-600 dark:text-cyan-400'
                : 'bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
            }`}
            title="Toggle featured credentials"
          >
            <Sparkles className="w-3 h-3 text-cyan-500" />
            <span className="whitespace-nowrap">Featured</span>
          </button>
        </div>
      </div>

      {/* Grid of Certificates */}
      {filteredCertificates.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center py-16 px-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800"
        >
          <Award className="w-10 h-10 mx-auto text-zinc-400 mb-3 opacity-60" />
          <h3 className="text-base font-semibold text-zinc-800 dark:text-zinc-200">No credentials found</h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 max-w-md mx-auto">
            No certificates match &ldquo;{searchQuery}&rdquo;. Try clearing your search query or switching categories.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setOnlyFeatured(false);
            }}
            className="mt-4 px-4 py-2 text-xs font-medium text-cyan-600 dark:text-cyan-400 hover:underline"
          >
            Reset Filters
          </button>
        </motion.div>
      ) : (
        <motion.div
          key={`${selectedCategory}-${searchQuery}-${onlyFeatured}`}
          variants={cardContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredCertificates.map((cert) => {
            const CategoryIcon = getCategoryIcon(cert.category);
            const hasError = imageErrors[cert.id];

            return (
              <motion.div
                key={cert.id}
                variants={cardItemVariants}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                onClick={() => setActiveCert(cert)}
                className="group relative flex flex-col rounded-2xl bg-white dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800/90 hover:border-cyan-500/50 dark:hover:border-cyan-500/50 transition-[border-color,box-shadow] duration-200 shadow-xs hover:shadow-lg dark:hover:shadow-cyan-950/20 overflow-hidden cursor-pointer"
              >
                {/* Certificate Preview Surface */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-950 flex items-center justify-center">
                  {!hasError ? (
                    <img
                      src={cert.image}
                      alt={cert.title}
                      referrerPolicy="no-referrer"
                      onError={() => handleImageError(cert.id)}
                      className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-300"
                    />
                  ) : (
                    /* High-Aesthetic Cybernetic Fallback Blueprint */
                    <div className="relative w-full h-full p-4 flex flex-col justify-between bg-gradient-to-br from-zinc-900 via-slate-900 to-zinc-950 border border-cyan-500/20 text-zinc-300">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CategoryIcon className="w-4 h-4 text-cyan-400" />
                          <span className="text-[11px] font-mono tracking-wider text-cyan-400 uppercase">
                            {cert.issuer}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-zinc-500">{cert.date}</span>
                      </div>
                      <div className="my-auto py-2">
                        <p className="text-xs font-semibold text-white line-clamp-2">{cert.title}</p>
                        <p className="text-[11px] text-zinc-400 mt-1 line-clamp-1">{cert.theme}</p>
                      </div>
                      <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 border-t border-zinc-800/80 pt-2">
                        <span>{cert.role}</span>
                        <span className="text-cyan-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                          VERIFIED
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Gradient Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent pointer-events-none" />

                  {/* Hover Inspect Overlay */}
                  <div className="absolute inset-0 bg-zinc-950/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2 pointer-events-none">
                    <span className="px-3 py-1.5 rounded-lg bg-cyan-500/90 text-zinc-950 text-xs font-semibold flex items-center gap-1.5 shadow-md">
                      <ZoomIn className="w-3.5 h-3.5" />
                      Inspect Credential
                    </span>
                  </div>

                  {/* Featured Marker if applicable */}
                  {cert.featured && (
                    <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-cyan-500/90 text-zinc-950 text-[10px] font-bold tracking-wider uppercase shadow-sm">
                      Featured
                    </div>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Unboxed Metadata (Zero-Pill discipline) */}
                    <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 mb-2 font-mono">
                      <span className="text-cyan-600 dark:text-cyan-400 font-medium">
                        {getCategoryBadgeLabel(cert.category)}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{cert.date}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors line-clamp-2">
                      {cert.title}
                    </h3>

                    {/* Issuer & Role */}
                    <p className="text-xs font-medium text-zinc-700 dark:text-zinc-300 mt-1 flex items-center gap-1.5">
                      <Building className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                      <span className="truncate">{cert.issuer}</span>
                    </p>

                    {/* Theme / Description */}
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-2.5 line-clamp-2 leading-relaxed">
                      {cert.theme}
                    </p>
                  </div>

                  {/* Card Footer: Unboxed Technology Tags */}
                  <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
                    <div className="truncate text-[11px] font-mono">
                      {(cert.tags || []).slice(0, 3).join(' · ')}
                    </div>
                    <span className="shrink-0 ml-2 text-cyan-600 dark:text-cyan-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-1 font-medium text-xs">
                      View
                      <ExternalLink className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {/* Full-Screen Credential Inspection Modal */}
      <CertificateModal
        certificate={activeCert}
        selectedCert={activeCert}
        onClose={() => setActiveCert(null)}
        onPrev={handlePrevCert}
        onNext={handleNextCert}
        currentIndex={activeCert ? filteredCertificates.findIndex((c) => c.id === activeCert.id) : undefined}
        totalCount={filteredCertificates.length}
      />
    </section>
  );
};
