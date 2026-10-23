import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Download } from 'lucide-react';
import {
  CLUB_SEGMENTS,
  PDF_RESOURCES,
  SESSION_PLANS,
} from '../data/clubData';
import {
  filterSessionPlans,
  generateResourcePdfContent,
} from '../utils/clubLogic';

const ANNUAL_ROADMAP = [
  {
    month: 'January',
    title: 'Orientation & Member Recruitment',
    description: 'Welcome new members across all 8 segments and introduce the club.',
  },
  {
    month: 'March',
    title: 'Problem Solving Workshop',
    description: 'Techniques for tackling olympiad-style proofs, IQ matrices, and case modeling.',
  },
  {
    month: 'May',
    title: 'Intra-College Math Olympiad & Cipher Challenge',
    description: 'Our in-house competition for all students covering Olympiad, Cryptography & Sudoku.',
  },
  {
    month: 'July',
    title: 'Seminar: Beauty of Mathematics & Equational Arts',
    description: 'Guest talks from mathematicians, alumni, and live parametric graphing exhibitions.',
  },
  {
    month: 'September',
    title: 'Olympiad Prep Camp & Speedcubing / Chess Arena',
    description: 'Intensive training ahead of national olympiads, WCA cube relays, and rapid chess.',
  },
  {
    month: 'November',
    title: 'ACC Math Fest',
    description: 'Our flagship festival with quizzes, puzzles, Olympiad finals, and championship prizes.',
  },
];

export const SessionPlansSection: React.FC = () => {
  const [segmentFilter, setSegmentFilter] = useState<string>('all');
  const [levelFilter, setLevelFilter] = useState<string>('All');
  const [expandedId, setExpandedId] = useState<string>('sess-w1');

  const filteredSessions = filterSessionPlans(
    SESSION_PLANS,
    segmentFilter,
    levelFilter
  );

  const handleDownloadAttachedPdf = (resourceId: string) => {
    const res =
      PDF_RESOURCES.find((r) => r.id === resourceId) || PDF_RESOURCES[0];
    const rawPdf = generateResourcePdfContent(res);
    const blob = new Blob([rawPdf], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = res.fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 3000);
  };

  return (
    <section
      id="session-plans"
      aria-labelledby="session-plans-heading"
      className="scroll-mt-24 py-24 accmc-section-grid border-t border-sky-900/25"
    >
      <div className="max-w-[1160px] mx-auto px-6">
        {/* Exact Reference Header: SESSION PLAN / The year ahead */}
        <div className="max-w-2xl mb-14">
          <p className="text-xs font-mono tracking-[0.2em] uppercase text-[#1DA1F2] mb-3">
            SESSION PLANS
          </p>
          <h2
            id="session-plans-heading"
            className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4"
          >
            The year <span className="text-[#1DA1F2]">ahead</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            A roadmap of what we&apos;re planning this session — from annual flagship
            milestones to weekly segment training syllabi.
          </p>
        </div>

        {/* Exact Reference Vertical Timeline (Matching ref-session.png) */}
        <div className="max-w-3xl mx-auto mb-20">
          <ol className="relative border-l border-[#1DA1F2]/30 ml-4 space-y-6">
            {ANNUAL_ROADMAP.map((item) => (
              <li key={item.month} className="group pl-8 relative">
                <span
                  aria-hidden="true"
                  className="absolute -left-[7px] top-6 w-3.5 h-3.5 rounded-full bg-[#1DA1F2] shadow-[0_0_12px_#1DA1F2] group-hover:scale-125 transition-transform"
                />
                <div className="p-6 sm:p-7 rounded-2xl bg-[#071022]/90 border border-sky-500/15 hover:border-[#1DA1F2]/50 hover:translate-x-1.5 hover:shadow-[0_12px_30px_rgba(29,161,242,0.12)] transition-all duration-200">
                  <p className="text-xs font-mono text-[#1DA1F2] mb-1.5">
                    {item.month}
                  </p>
                  <h3 className="text-xl font-bold text-white mb-1.5 group-hover:text-[#1DA1F2] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Interactive Weekly Segment Syllabus Filter */}
        <div className="pt-12 border-t border-sky-900/25">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
            <div>
              <h3 className="text-2xl font-bold text-white">
                Weekly Segment Workshop Schedule
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Filter weekly campus workshops by segment track or training tier.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <label
                htmlFor="session-segment-select"
                className="text-xs font-mono text-slate-300 whitespace-nowrap"
              >
                Segment:
              </label>
              <select
                id="session-segment-select"
                value={segmentFilter}
                onChange={(e) => setSegmentFilter(e.target.value)}
                className="px-3.5 py-2 rounded-xl bg-[#071022] border border-sky-500/20 text-xs text-white font-medium focus:outline-none focus:border-[#1DA1F2]"
              >
                <option value="all">All 8 Segments</option>
                {CLUB_SEGMENTS.map((seg) => (
                  <option key={seg.id} value={seg.id}>
                    {seg.name}
                  </option>
                ))}
              </select>

              <div
                className="flex flex-wrap items-center gap-1 p-1 bg-[#071022] border border-sky-500/15 rounded-xl"
                role="group"
                aria-label="Filter sessions by difficulty tier"
              >
                {['All', 'Foundation', 'Intermediate', 'Advanced Camp'].map((lvl) => {
                  const active = levelFilter === lvl;
                  return (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setLevelFilter(lvl)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        active
                          ? 'bg-[#1DA1F2] text-slate-950'
                          : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      {lvl}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {filteredSessions.length === 0 ? (
            <div className="p-10 rounded-2xl bg-[#071022] border border-sky-500/15 text-center space-y-3">
              <p className="text-sm text-slate-300">
                No sessions match the selected segment and tier combination.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSegmentFilter('all');
                  setLevelFilter('All');
                }}
                className="px-5 py-2 rounded-full bg-[#1DA1F2] text-slate-950 text-xs font-bold hover:bg-sky-400 transition-colors cursor-pointer"
              >
                Show All 8 Weekly Sessions
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredSessions.map((sess) => {
                const isExpanded = expandedId === sess.id;
                return (
                  <div
                    key={sess.id}
                    className="rounded-2xl bg-[#071022]/90 border border-sky-500/15 hover:border-[#1DA1F2]/40 transition-colors overflow-hidden"
                  >
                    <button
                      type="button"
                      aria-expanded={isExpanded}
                      onClick={() => setExpandedId(isExpanded ? '' : sess.id)}
                      className="w-full p-6 text-left flex flex-col lg:flex-row lg:items-center justify-between gap-4 cursor-pointer"
                    >
                      <div className="space-y-1.5">
                        <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#1DA1F2] tabular-nums">
                          <span>{sess.week}</span>
                          <span aria-hidden="true">·</span>
                          <span>{sess.dateRange}</span>
                          <span aria-hidden="true">·</span>
                          <span>{sess.segment}</span>
                          <span aria-hidden="true">·</span>
                          <span>{sess.level}</span>
                        </div>
                        <h4 className="text-lg font-bold text-white">
                          {sess.title}
                        </h4>
                      </div>

                      <div className="flex items-center justify-between lg:justify-end gap-5 text-xs text-slate-400 shrink-0">
                        <span className="font-mono tabular-nums">
                          {sess.venue} · {sess.duration}
                        </span>
                        <span className="p-1.5 rounded-lg bg-[#0C2142] text-[#1DA1F2]">
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </span>
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="px-6 pb-6 pt-2 border-t border-sky-900/30 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                        <div className="lg:col-span-8 space-y-2.5">
                          <p className="text-xs font-mono uppercase tracking-wider text-[#1DA1F2]">
                            Session Learning Objectives
                          </p>
                          <ul className="space-y-2 text-sm text-slate-300">
                            {sess.objectives.map((obj, i) => (
                              <li key={i} className="flex items-start gap-2.5">
                                <span className="font-mono text-xs text-[#1DA1F2] tabular-nums mt-0.5">
                                  0{i + 1}.
                                </span>
                                <span>{obj}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="lg:col-span-4 p-4 rounded-xl bg-[#050B16] border border-sky-500/15 space-y-2.5 text-xs">
                          <p className="text-slate-300">
                            <span className="text-slate-400">Instructor: </span>
                            <span className="text-white font-semibold">
                              {sess.instructor}
                            </span>
                          </p>
                          <p className="text-slate-300">
                            <span className="text-slate-400">Deliverable: </span>
                            {sess.deliverable}
                          </p>
                          <button
                            type="button"
                            onClick={() =>
                              handleDownloadAttachedPdf(sess.attachedResourceId)
                            }
                            className="w-full mt-2 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-[#1DA1F2]/15 hover:bg-[#1DA1F2] text-[#1DA1F2] hover:text-slate-950 border border-[#1DA1F2]/40 font-bold transition-colors whitespace-nowrap cursor-pointer"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Download Session PDF</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
