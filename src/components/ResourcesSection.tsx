import React, { useState } from 'react';
import {
  BookMarked,
  BookOpen,
  Calculator,
  Check,
  Download,
  FileText,
  Search,
  Trophy,
  X,
} from 'lucide-react';
import { PDF_RESOURCES, PdfResource } from '../data/clubData';
import { filterPdfResources, generateResourcePdfContent } from '../utils/clubLogic';

interface ResourcesSectionProps {
  selectedTopic: string;
  onTopicChange: (topic: string) => void;
}

const TOPICS = [
  'All',
  'Math Olympiad',
  'IQ & Case Solving',
  'Cryptography',
  'Rubik’s Cube & Group Theory',
  'Equational Arts',
  'Chess & Sudoku Logic',
];

const FEATURED_BUCKETS = [
  {
    title: 'Session Notes',
    subtitle: 'Slides and notes from every club session.',
    icon: FileText,
    resourceId: 'res-olympiad-nt',
  },
  {
    title: 'Olympiad Problems',
    subtitle: 'Past BdMO and international olympiad problems.',
    icon: Trophy,
    resourceId: 'res-olympiad-comb-geo',
  },
  {
    title: 'Practice Sets',
    subtitle: 'Weekly problem sets with solutions.',
    icon: Calculator,
    resourceId: 'res-iq-case-workbook',
  },
  {
    title: 'Recommended Books',
    subtitle: 'Our favourite books & compendiums for every level.',
    icon: BookMarked,
    resourceId: 'res-crypto-handbook',
  },
];

export const ResourcesSection: React.FC<ResourcesSectionProps> = ({
  selectedTopic,
  onTopicChange,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [previewResource, setPreviewResource] = useState<PdfResource | null>(null);
  const [downloadedIds, setDownloadedIds] = useState<Record<string, boolean>>({});

  const filteredResources = filterPdfResources(
    PDF_RESOURCES,
    selectedTopic,
    searchQuery
  );

  const handleDownloadPdf = (resource: PdfResource) => {
    const rawPdf = generateResourcePdfContent(resource);
    const blob = new Blob([rawPdf], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = resource.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 3000);

    setDownloadedIds((prev) => ({ ...prev, [resource.id]: true }));
  };

  return (
    <section
      id="resources"
      aria-labelledby="resources-heading"
      className="scroll-mt-24 py-24 accmc-section-grid border-t border-sky-900/25"
    >
      <div className="max-w-[1160px] mx-auto px-6">
        {/* Exact Reference Header: RESOURCES / Fuel for your mind */}
        <div className="max-w-2xl mb-12">
          <p className="text-xs font-mono tracking-[0.2em] uppercase text-[#1DA1F2] mb-3">
            RESOURCES
          </p>
          <h2
            id="resources-heading"
            className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4"
          >
            Fuel for your <span className="text-[#1DA1F2]">mind</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            Curated material to help you learn, practise and compete — with downloadable
            PDF monographs attached to every club topic.
          </p>
        </div>

        {/* 2x2 Featured Resource Buckets (Matching ref-resources.png layout, wired to real PDFs) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-14">
          {FEATURED_BUCKETS.map((bucket) => {
            const IconComponent = bucket.icon;
            const linkedPdf =
              PDF_RESOURCES.find((r) => r.id === bucket.resourceId) ||
              PDF_RESOURCES[0];
            return (
              <div
                key={bucket.title}
                className="group p-7 rounded-2xl bg-[#071022]/90 border border-sky-500/15 hover:border-[#1DA1F2]/55 hover:-translate-y-1.5 hover:shadow-[0_14px_34px_rgba(29,161,242,0.14)] transition-all duration-200 flex items-start gap-5"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#0C2142] border border-[#1DA1F2]/25 flex items-center justify-center text-[#1DA1F2] shrink-0 group-hover:scale-110 transition-transform">
                  <IconComponent className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#1DA1F2] transition-colors">
                    {bucket.title}
                  </h3>
                  <p className="text-sm text-slate-400 mb-3">
                    {bucket.subtitle}
                  </p>
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setPreviewResource(linkedPdf)}
                      className="text-xs font-mono text-[#1DA1F2] hover:underline cursor-pointer"
                    >
                      Preview attached PDF →
                    </button>
                    <span className="text-slate-600" aria-hidden="true">
                      ·
                    </span>
                    <button
                      type="button"
                      onClick={() => handleDownloadPdf(linkedPdf)}
                      className="text-xs font-mono text-slate-300 hover:text-white cursor-pointer"
                    >
                      Download ({linkedPdf.fileSize})
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Filter & Search Bar for Topic-Specific PDFs */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-8">
          <div
            className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#071022] border border-sky-500/15 rounded-2xl"
            role="group"
            aria-label="Filter PDF resources by topic"
          >
            {TOPICS.map((topic) => {
              const active = selectedTopic === topic;
              return (
                <button
                  key={topic}
                  type="button"
                  onClick={() => onTopicChange(topic)}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-[#1DA1F2] text-slate-950 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-[#0B1B38]'
                  }`}
                >
                  {topic}
                </button>
              );
            })}
          </div>

          <div className="relative min-w-[260px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <label htmlFor="resource-search-input" className="sr-only">
              Search PDF resources by theorem, topic, or author
            </label>
            <input
              id="resource-search-input"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search theorems, LTE, RSA, CFOP..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#071022] border border-sky-500/15 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#1DA1F2]"
            />
          </div>
        </div>

        {/* Attached Topic PDF Cards Grid */}
        {filteredResources.length === 0 ? (
          <div className="p-12 rounded-2xl bg-[#071022] border border-sky-500/15 text-center space-y-3">
            <p className="text-base font-medium text-white">
              No PDF monographs match “{searchQuery}” in {selectedTopic}.
            </p>
            <button
              type="button"
              onClick={() => {
                onTopicChange('All');
                setSearchQuery('');
              }}
              className="px-5 py-2.5 rounded-full bg-[#1DA1F2] text-slate-950 text-xs font-bold hover:bg-sky-400 transition-colors cursor-pointer"
            >
              Reset Resource Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredResources.map((res) => {
              const isDownloaded = Boolean(downloadedIds[res.id]);
              return (
                <article
                  key={res.id}
                  className="p-7 rounded-2xl bg-[#071022]/90 border border-sky-500/15 hover:border-[#1DA1F2]/55 hover:-translate-y-1.5 hover:shadow-[0_14px_34px_rgba(29,161,242,0.14)] transition-all duration-200 flex flex-col justify-between gap-6"
                >
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-[#1DA1F2] font-mono tabular-nums">
                      <span>{res.topic}</span>
                      <span aria-hidden="true">·</span>
                      <span>{res.difficulty}</span>
                      <span aria-hidden="true">·</span>
                      <span>{res.pages} Pages</span>
                      <span aria-hidden="true">·</span>
                      <span>PDF ({res.fileSize})</span>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-white mb-1.5 leading-snug">
                        {res.title}
                      </h3>
                      <p className="text-xs text-slate-400">
                        Compiled by {res.author} · {res.edition}
                      </p>
                    </div>

                    <p className="text-sm text-slate-300 leading-relaxed">
                      {res.abstract}
                    </p>

                    <div className="pt-1">
                      <p className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                        Attached Topics Inside PDF:
                      </p>
                      <ul className="space-y-1.5 text-xs text-slate-300">
                        {res.keyTheorems.map((thm, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="font-mono text-[#1DA1F2] tabular-nums">
                              0{i + 1}.
                            </span>
                            <span>{thm}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Attachment Action Bar */}
                  <div className="pt-4 border-t border-sky-900/30 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-400 truncate max-w-[220px]">
                      <FileText className="w-3.5 h-3.5 text-[#1DA1F2] shrink-0" />
                      <span className="truncate">{res.fileName}</span>
                    </div>

                    <div className="flex items-center gap-2.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => setPreviewResource(res)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0C2142] hover:bg-[#122E59] border border-[#1DA1F2]/30 text-[#1DA1F2] text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Preview PDF</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDownloadPdf(res)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1DA1F2] hover:bg-sky-400 text-slate-950 text-xs font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        {isDownloaded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Downloaded PDF</span>
                          </>
                        ) : (
                          <>
                            <Download className="w-3.5 h-3.5" />
                            <span>Download PDF</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* Interactive PDF Reader Modal */}
      {previewResource && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="pdf-reader-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm"
        >
          <div className="relative w-full max-w-3xl max-h-[88vh] flex flex-col rounded-2xl bg-[#071022] border border-[#1DA1F2]/40 shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between gap-4 px-6 py-4 bg-[#0A1833] border-b border-sky-900/40">
              <div className="min-w-0">
                <p className="text-xs font-mono text-[#1DA1F2] truncate">
                  {previewResource.fileName} · {previewResource.pages} Pages
                </p>
                <h3
                  id="pdf-reader-title"
                  className="text-base sm:text-lg font-bold text-white truncate"
                >
                  {previewResource.title}
                </h3>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => handleDownloadPdf(previewResource)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1DA1F2] hover:bg-sky-400 text-slate-950 text-xs font-bold transition-colors whitespace-nowrap cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Full PDF</span>
                </button>
                <button
                  type="button"
                  aria-label="Close PDF preview"
                  onClick={() => setPreviewResource(null)}
                  className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-200">
              <div className="p-4 rounded-xl bg-[#050B16] border border-sky-500/20 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-300 font-mono">
                <span>Author: {previewResource.author}</span>
                <span>Edition: {previewResource.edition}</span>
                <span>Difficulty: {previewResource.difficulty}</span>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#1DA1F2]">
                  Document Abstract
                </h4>
                <p className="text-sm leading-relaxed text-slate-300">
                  {previewResource.abstract}
                </p>
              </div>

              {previewResource.pdfSections.map((sec, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-[#050B16] border border-sky-500/15 space-y-3"
                >
                  <h4 className="text-base font-bold text-white">{sec.heading}</h4>
                  <div className="p-3 rounded-lg bg-[#09152E] border border-[#1DA1F2]/25 font-mono text-xs text-[#1DA1F2] overflow-x-auto">
                    {sec.formula}
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">{sec.body}</p>
                  <div className="pt-3 border-t border-sky-900/30 space-y-1.5">
                    <p className="text-xs font-semibold text-white">
                      {sec.workedProblem}
                    </p>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      <span className="text-[#1DA1F2] font-semibold">Proof Outline: </span>
                      {sec.solutionSummary}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
