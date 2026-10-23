/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Sparkles,
  Users,
} from 'lucide-react';
import { motion } from 'motion/react';
import {
  GOOGLE_FORM_MEMBER_URL,
  NAV_SECTIONS,
  PDF_RESOURCES,
  SegmentId,
} from './data/clubData';
import { SegmentsExplorer } from './components/SegmentsExplorer';
import { ResourcesSection } from './components/ResourcesSection';
import { SessionPlansSection } from './components/SessionPlansSection';
import {
  AchievementsSection,
  ExecutivesAndSocialsSection,
} from './components/AchievementsAndExecutives';

const CLUB_LOGO_PATH = '/assets/aistudio/accmc_trans_aab6d7dc.png';

export default function App() {
  const [selectedResourceTopic, setSelectedResourceTopic] = useState<string>('All');
  const [activeSection, setActiveSection] = useState<string>('about');
  const heroSpotlightRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const sectionIds = NAV_SECTIONS.map((s) => s.id);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0 && visible[0].target.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: '-20% 0px -55% 0px',
        threshold: [0.1, 0.25, 0.5],
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavigateToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    e.preventDefault();
    if (sectionId === 'top') {
      setActiveSection('about');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.history.replaceState(null, '', '#top');
      return;
    }
    setActiveSection(sectionId);
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.replaceState(null, '', `#${sectionId}`);
    }
  };

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!heroSpotlightRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    heroSpotlightRef.current.style.background = `radial-gradient(520px circle at ${x}px ${y}px, rgba(29, 161, 242, 0.13), transparent 70%)`;
  };

  const handleJumpToSegmentResource = (segmentId: SegmentId) => {
    const matchingRes = PDF_RESOURCES.find((r) => r.segmentId === segmentId);
    if (matchingRes) {
      setSelectedResourceTopic(matchingRes.topic);
    } else {
      setSelectedResourceTopic('All');
    }
    setActiveSection('resources');
    const el = document.getElementById('resources');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#050b16] text-slate-100 flex flex-col">
      {/* STICKY TOP TAB NAVIGATION — All Sections Clearly Named & Clickable */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#050b16]/90 border-b border-sky-900/35 shadow-[0_4px_30px_rgba(0,0,0,0.45)]">
        <div className="max-w-[1160px] mx-auto flex items-center justify-between gap-4 px-4 sm:px-6 py-3">
          {/* Zone 1: Brand Logo + ACCMC Wordmark */}
          <a
            href="#top"
            onClick={(e) => handleNavigateToSection(e, 'top')}
            className="flex items-center gap-3 whitespace-nowrap shrink-0 group"
          >
            <img
              src={CLUB_LOGO_PATH}
              alt="ACCMC logo"
              referrerPolicy="no-referrer"
              className="w-10 h-10 rounded-full object-contain shadow-[0_0_16px_rgba(29,161,242,0.4)] group-hover:scale-105 transition-transform duration-200"
            />
            <span className="text-lg font-extrabold tracking-tight text-white">
              ACC<span className="text-[#1DA1F2]">MC</span>
            </span>
          </a>

          {/* Zone 2: Section Tabs on Top Bar (Desktop & Tablet) */}
          <nav
            aria-label="Primary Section Navigation"
            className="hidden md:flex items-center gap-0.5 lg:gap-1.5 text-xs lg:text-sm font-medium text-slate-300"
          >
            {NAV_SECTIONS.map((sec) => {
              const isActive = activeSection === sec.id;
              return (
                <a
                  key={sec.id}
                  href={sec.href}
                  onClick={(e) => handleNavigateToSection(e, sec.id)}
                  aria-current={isActive ? 'location' : undefined}
                  className={`relative px-2 lg:px-3 py-2 rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'text-[#1DA1F2] font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-sky-500/10'
                  }`}
                >
                  <span>{sec.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="top-tab-active-underline"
                      className="absolute left-2 right-2 -bottom-0.5 h-0.5 rounded-full bg-[#1DA1F2] shadow-[0_0_10px_#1DA1F2]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action Button -> Google Forms */}
          <div className="flex items-center shrink-0">
            <a
              href={GOOGLE_FORM_MEMBER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 sm:px-5 py-2 text-xs sm:text-sm font-bold text-slate-950 bg-[#1DA1F2] hover:bg-sky-400 hover:-translate-y-0.5 rounded-full shadow-[0_0_24px_rgba(29,161,242,0.45)] transition-all whitespace-nowrap shrink-0"
            >
              Become a Member
            </a>
          </div>
        </div>

        {/* Compact Scrollable Section Tabs for Mobile / Narrow Split Viewports */}
        <nav
          aria-label="Mobile Section Navigation"
          className="md:hidden flex items-center gap-1.5 overflow-x-auto no-scrollbar px-4 py-2 border-t border-sky-900/25 bg-[#040914]/90"
        >
          {NAV_SECTIONS.map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <a
                key={sec.id}
                href={sec.href}
                onClick={(e) => handleNavigateToSection(e, sec.id)}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-[#1DA1F2]/20 text-[#1DA1F2] border border-[#1DA1F2]/40 font-semibold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {sec.label}
              </a>
            );
          })}
        </nav>
      </header>

      <main id="top" className="flex-1">
        {/* HERO SECTION — Dynamic & Lively Match to https://accmc.lovable.app/ */}
        <section
          onMouseMove={handleHeroMouseMove}
          className="relative overflow-hidden accmc-grid-bg pt-14 pb-20 lg:pt-20 lg:pb-24"
        >
          {/* Interactive Cursor Spotlight Overlay */}
          <div
            ref={heroSpotlightRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          />

          {/* Floating Mathematical Symbols Backdrop */}
          <div
            aria-hidden="true"
            className="pointer-events-none select-none absolute inset-0 overflow-hidden font-serif text-[#1DA1F2]/18"
          >
            <span className="absolute top-12 left-[5%] text-6xl animate-float-slow">
              ∑
            </span>
            <span className="absolute top-16 left-[44%] text-5xl animate-float-reverse">
              √
            </span>
            <span className="absolute top-20 right-[15%] text-5xl animate-float-diagonal">
              Δ
            </span>
            <span className="absolute top-[42%] left-[2%] text-5xl animate-float-reverse">
              e
            </span>
            <span className="absolute top-[36%] left-[18%] text-5xl animate-float-slow">
              π
            </span>
            <span className="absolute top-[39%] left-[57%] text-4xl animate-float-diagonal">
              ∞
            </span>
            <span className="absolute bottom-[34%] left-[31%] text-6xl animate-float-slow">
              ∫
            </span>
            <span className="absolute bottom-[28%] right-[8%] text-4xl animate-float-reverse">
              θ
            </span>
            <span className="absolute top-[14%] right-[34%] text-4xl animate-float-slow">
              φ
            </span>
            <span className="absolute bottom-[18%] left-[12%] text-4xl animate-float-diagonal">
              ≡
            </span>
          </div>

          <div className="relative max-w-[1160px] mx-auto px-6">
            {/* Hero 2-Column Split: Left Typography + Right Smaller Animated Orbital ACCMC Crest */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-8 lg:gap-12 mb-20">
              {/* Left Column: Hero Typography & CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="flex-1 max-w-2xl space-y-6"
              >
                <p className="text-xs sm:text-sm font-mono tracking-[0.22em] text-[#1DA1F2] uppercase">
                  ADAMJEE CANTONMENT COLLEGE
                </p>

                <h1 className="text-5xl sm:text-6xl lg:text-[4.5rem] font-extrabold tracking-tight leading-[1.05]">
                  <span className="block text-white">Mathematics</span>
                  <span className="block text-[#1DA1F2] mt-1">Club</span>
                </h1>

                <p className="text-xl sm:text-2xl text-slate-300 font-normal pt-1">
                  Explore The{' '}
                  <strong className="font-bold text-white">Infinity</strong>{' '}
                  <span className="inline-block text-[#1DA1F2] font-mono animate-float-diagonal">
                    ∞
                  </span>
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-3">
                  <a
                    href={GOOGLE_FORM_MEMBER_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#1DA1F2] hover:bg-sky-400 hover:-translate-y-0.5 text-slate-950 font-bold text-sm shadow-[0_0_30px_rgba(29,161,242,0.5)] transition-all whitespace-nowrap shrink-0"
                  >
                    <span>Become a Member</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>

                  <a
                    href="#socials"
                    onClick={(e) => handleNavigateToSection(e, 'socials')}
                    className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-[#071124]/85 hover:bg-[#0C1D3D] hover:-translate-y-0.5 border border-sky-500/25 hover:border-[#1DA1F2]/60 text-white font-semibold text-sm transition-all whitespace-nowrap shrink-0"
                  >
                    Join our socials
                  </a>
                </div>
              </motion.div>

              {/* Right Side: Official Circular ACCMC Logo with Animated Orbital Rings */}
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="shrink-0 flex items-center justify-end sm:ml-auto lg:pr-4"
              >
                <div className="relative flex items-center justify-center">
                  {/* Breathing Ambient Cyan Halo */}
                  <div
                    aria-hidden="true"
                    className="absolute -inset-5 rounded-full bg-[#1DA1F2]/15 blur-2xl animate-halo-breath pointer-events-none"
                  />

                  {/* Outer Rotating Dashed Cyan Ring */}
                  <div
                    aria-hidden="true"
                    className="absolute -inset-4 sm:-inset-5 rounded-full border border-dashed border-[#1DA1F2]/40 animate-orbit-slow pointer-events-none"
                  />

                  {/* Inner Counter-Rotating Geometric Ring */}
                  <div
                    aria-hidden="true"
                    className="absolute -inset-2 rounded-full border border-sky-400/20 animate-orbit-reverse pointer-events-none"
                  />

                  {/* 4 Floating Mathematical Quadrant Satellites (+, −, ×, ÷) */}
                  <span
                    aria-hidden="true"
                    className="absolute -top-2.5 -left-2.5 w-8 h-8 rounded-full bg-[#071226] border border-[#F37B21]/50 text-[#F37B21] font-mono font-extrabold text-sm flex items-center justify-center shadow-[0_0_14px_rgba(243,123,33,0.35)] animate-float-slow z-10"
                  >
                    +
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute -top-2.5 -right-2.5 w-8 h-8 rounded-full bg-[#071226] border border-[#1DA1F2]/50 text-[#1DA1F2] font-mono font-extrabold text-sm flex items-center justify-center shadow-[0_0_14px_rgba(29,161,242,0.35)] animate-float-reverse z-10"
                  >
                    −
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-2.5 -left-2.5 w-8 h-8 rounded-full bg-[#071226] border border-[#C4D626]/50 text-[#C4D626] font-mono font-extrabold text-sm flex items-center justify-center shadow-[0_0_14px_rgba(196,214,38,0.35)] animate-float-diagonal z-10"
                  >
                    ×
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-2.5 -right-2.5 w-8 h-8 rounded-full bg-[#071226] border border-[#E11D48]/50 text-[#E11D48] font-mono font-extrabold text-sm flex items-center justify-center shadow-[0_0_14px_rgba(225,29,72,0.35)] animate-float-slow z-10"
                  >
                    ÷
                  </span>

                  {/* Main Circular ACCMC Crest (Right-Aligned & Balanced Size) */}
                  <div className="relative p-3 sm:p-3.5 rounded-full bg-[#061229]/90 border border-[#1DA1F2]/30 shadow-[0_0_70px_rgba(29,161,242,0.28)]">
                    <div className="w-52 h-52 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden flex items-center justify-center bg-[#061229]">
                      <img
                        src={CLUB_LOGO_PATH}
                        alt="Adamjee Cantonment College Mathematics Club logo"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* 4 Quick-Navigation Overview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <a
                href="#about"
                onClick={(e) => handleNavigateToSection(e, 'about')}
                className="group p-6 rounded-2xl bg-[#071022]/90 border border-sky-500/15 hover:border-[#1DA1F2]/60 hover:-translate-y-1.5 hover:shadow-[0_14px_34px_rgba(29,161,242,0.15)] transition-all duration-200 flex flex-col justify-between gap-5"
              >
                <div className="space-y-3">
                  <Sparkles className="w-6 h-6 text-[#1DA1F2] group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg font-bold text-white group-hover:text-[#1DA1F2] transition-colors">
                    About Us
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Who we are and why math matters.
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#1DA1F2] group-hover:translate-x-1.5 transition-transform" />
              </a>

              <a
                href="#resources"
                onClick={(e) => handleNavigateToSection(e, 'resources')}
                className="group p-6 rounded-2xl bg-[#071022]/90 border border-sky-500/15 hover:border-[#1DA1F2]/60 hover:-translate-y-1.5 hover:shadow-[0_14px_34px_rgba(29,161,242,0.15)] transition-all duration-200 flex flex-col justify-between gap-5"
              >
                <div className="space-y-3">
                  <BookOpen className="w-6 h-6 text-[#1DA1F2] group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg font-bold text-white group-hover:text-[#1DA1F2] transition-colors">
                    Resources
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Notes, problem sets &amp; books.
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#1DA1F2] group-hover:translate-x-1.5 transition-transform" />
              </a>

              <a
                href="#session-plans"
                onClick={(e) => handleNavigateToSection(e, 'session-plans')}
                className="group p-6 rounded-2xl bg-[#071022]/90 border border-sky-500/15 hover:border-[#1DA1F2]/60 hover:-translate-y-1.5 hover:shadow-[0_14px_34px_rgba(29,161,242,0.15)] transition-all duration-200 flex flex-col justify-between gap-5"
              >
                <div className="space-y-3">
                  <Calendar className="w-6 h-6 text-[#1DA1F2] group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg font-bold text-white group-hover:text-[#1DA1F2] transition-colors">
                    Session Plans
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    What&apos;s happening this session.
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#1DA1F2] group-hover:translate-x-1.5 transition-transform" />
              </a>

              <a
                href="#executives"
                onClick={(e) => handleNavigateToSection(e, 'executives')}
                className="group p-6 rounded-2xl bg-[#071022]/90 border border-sky-500/15 hover:border-[#1DA1F2]/60 hover:-translate-y-1.5 hover:shadow-[0_14px_34px_rgba(29,161,242,0.15)] transition-all duration-200 flex flex-col justify-between gap-5"
              >
                <div className="space-y-3">
                  <Users className="w-6 h-6 text-[#1DA1F2] group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg font-bold text-white group-hover:text-[#1DA1F2] transition-colors">
                    Executives
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Meet the team behind the club.
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#1DA1F2] group-hover:translate-x-1.5 transition-transform" />
              </a>
            </div>
          </div>
        </section>

        {/* 01. ABOUT US SECTION */}
        <section
          id="about"
          aria-labelledby="about-heading"
          className="scroll-mt-24 py-24 accmc-section-grid border-t border-sky-900/25"
        >
          <div className="max-w-[1160px] mx-auto px-6">
            <div className="max-w-2xl mb-14">
              <p className="text-xs font-mono tracking-[0.2em] uppercase text-[#1DA1F2] mb-3">
                ABOUT US
              </p>
              <h2
                id="about-heading"
                className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-5"
              >
                Where curiosity meets <span className="text-[#1DA1F2]">numbers</span>
              </h2>
              <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
                The Adamjee Cantonment College Mathematics Club is a community of
                students who love solving problems, asking &ldquo;why&rdquo;, and
                exploring the infinite beauty of mathematics.
              </p>
            </div>

            {/* 2x2 Quadrant Cards with the 4 Official Logo Symbols (+, −, ×, ÷) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* + Learn (Orange) */}
              <div className="group p-8 rounded-2xl bg-[#071022]/90 border border-sky-500/15 hover:border-[#F37B21]/55 hover:-translate-y-1.5 hover:shadow-[0_14px_34px_rgba(243,123,33,0.12)] transition-all duration-200 space-y-3">
                <div className="inline-block text-3xl font-extrabold text-[#F37B21] font-mono leading-none group-hover:scale-125 transition-transform">
                  +
                </div>
                <h3 className="text-xl font-bold text-white">Learn</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Weekly sessions that go beyond the textbook — number theory,
                  geometry, combinatorics, cryptography, and more.
                </p>
              </div>

              {/* − Compete (Cyan) */}
              <div className="group p-8 rounded-2xl bg-[#071022]/90 border border-sky-500/15 hover:border-[#1DA1F2]/55 hover:-translate-y-1.5 hover:shadow-[0_14px_34px_rgba(29,161,242,0.12)] transition-all duration-200 space-y-3">
                <div className="inline-block text-3xl font-extrabold text-[#1DA1F2] font-mono leading-none group-hover:scale-125 transition-transform">
                  −
                </div>
                <h3 className="text-xl font-bold text-white">Compete</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Preparation for Math Olympiads, IQ &amp; Case solving championships,
                  speedcubing, chess, and inter-college competitions.
                </p>
              </div>

              {/* × Collaborate (Lime) */}
              <div className="group p-8 rounded-2xl bg-[#071022]/90 border border-sky-500/15 hover:border-[#C4D626]/55 hover:-translate-y-1.5 hover:shadow-[0_14px_34px_rgba(196,214,38,0.12)] transition-all duration-200 space-y-3">
                <div className="inline-block text-3xl font-extrabold text-[#C4D626] font-mono leading-none group-hover:scale-125 transition-transform">
                  ×
                </div>
                <h3 className="text-xl font-bold text-white">Collaborate</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Solve problems together, share ideas, explore equational graphing
                  art, and grow as a team across eight specialized segments.
                </p>
              </div>

              {/* ÷ Share (Burgundy/Crimson) */}
              <div className="group p-8 rounded-2xl bg-[#071022]/90 border border-sky-500/15 hover:border-[#E11D48]/55 hover:-translate-y-1.5 hover:shadow-[0_14px_34px_rgba(225,29,72,0.12)] transition-all duration-200 space-y-3">
                <div className="inline-block text-3xl font-extrabold text-[#E11D48] font-mono leading-none group-hover:scale-125 transition-transform">
                  ÷
                </div>
                <h3 className="text-xl font-bold text-white">Share</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Workshops, seminars, open PDF compendiums, and fests that spread
                  the joy of mathematics across Adamjee Cantonment College.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 02. SEGMENTS SECTION (All 8 Required Segments + Interactive Workbench) */}
        <SegmentsExplorer
          onSelectResourceBySegment={handleJumpToSegmentResource}
        />

        {/* 03. ACHIEVEMENTS SECTION */}
        <AchievementsSection />

        {/* 04. RESOURCES SECTION (Topic-Filtered PDFs with Preview & Real PDF Download) */}
        <ResourcesSection
          selectedTopic={selectedResourceTopic}
          onTopicChange={setSelectedResourceTopic}
        />

        {/* 05. SESSION PLANS SECTION */}
        <SessionPlansSection />

        {/* 06, 07, 08. EXECUTIVES, SOCIALS & BECOME A MEMBER */}
        <ExecutivesAndSocialsSection />
      </main>

      {/* FOOTER */}
      <footer className="border-t border-sky-900/25 bg-[#040913] py-8 text-xs text-slate-400">
        <div className="max-w-[1160px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src={CLUB_LOGO_PATH}
              alt="ACCMC logo"
              referrerPolicy="no-referrer"
              className="w-7 h-7 rounded-full object-contain"
            />
            <span className="text-slate-400 font-medium">
              Adamjee Cantonment College Mathematics Club
            </span>
          </div>

          <a
            href={GOOGLE_FORM_MEMBER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[#1DA1F2] hover:underline"
          >
            Explore The Infinity ∞
          </a>
        </div>
      </footer>
    </div>
  );
}

