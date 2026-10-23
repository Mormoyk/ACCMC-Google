import React, { useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  CheckCircle2,
  Facebook,
  Instagram,
  MessageCircle,
  Send,
  Users,
} from 'lucide-react';
import {
  ACHIEVEMENTS_DATA,
  EXECUTIVES_DATA,
  GOOGLE_FORM_MEMBER_URL,
  SOCIAL_CHANNELS,
} from '../data/clubData';
import { filterAchievements } from '../utils/clubLogic';

export const AchievementsSection: React.FC = () => {
  const [achievementCategory, setAchievementCategory] = useState<string>('All');
  const visibleAchievements = filterAchievements(
    ACHIEVEMENTS_DATA,
    achievementCategory
  );

  return (
    <section
      id="achievements"
      aria-labelledby="achievements-heading"
      className="scroll-mt-24 py-24 accmc-section-grid border-t border-sky-900/25"
    >
      <div className="max-w-[1160px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <p className="text-xs font-mono tracking-[0.2em] uppercase text-[#1DA1F2] mb-3">
              ACHIEVEMENTS
            </p>
            <h2
              id="achievements-heading"
              className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-3"
            >
              Hall of <span className="text-[#1DA1F2]">honors</span>
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              National Math Olympiad medals, inter-cantonment championship trophies, and
              global competition distinctions earned by ACCMC members.
            </p>
          </div>

          <div
            className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#071022] border border-sky-500/15 rounded-2xl"
            role="group"
            aria-label="Filter achievements by category"
          >
            {[
              'All',
              'Olympiad',
              'Puzzle & Cube',
              'Case & Cryptanalysis',
              'Chess & Strategy',
            ].map((cat) => {
              const active = achievementCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setAchievementCategory(cat)}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-[#1DA1F2] text-slate-950'
                      : 'text-slate-300 hover:text-white hover:bg-[#0B1B38]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleAchievements.map((item) => (
            <article
              key={item.id}
              className="group p-7 rounded-2xl bg-[#071022]/90 border border-sky-500/15 hover:border-[#1DA1F2]/55 hover:-translate-y-1.5 hover:shadow-[0_14px_34px_rgba(29,161,242,0.14)] transition-all duration-200 flex flex-col justify-between gap-5"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono text-[#1DA1F2] tabular-nums">
                  <span>{item.year}</span>
                  <span aria-hidden="true">·</span>
                  <span>{item.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{item.medalOrRank}</span>
                </div>

                <h3 className="text-xl font-bold text-white leading-snug group-hover:text-[#1DA1F2] transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs font-medium text-sky-300">
                  {item.event}
                </p>

                <p className="text-sm text-slate-400 leading-relaxed">
                  {item.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-sky-900/30 space-y-1.5 text-xs">
                <div className="font-mono text-[#1DA1F2] font-semibold tabular-nums flex items-center gap-1.5">
                  <Award className="w-4 h-4 shrink-0 group-hover:scale-110 transition-transform" />
                  <span>{item.quantifiedMetric}</span>
                </div>
                <div className="text-slate-400">
                  Honorees: <span className="text-slate-200">{item.recipients}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export const ExecutivesAndSocialsSection: React.FC = () => {
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquirySegment, setInquirySegment] = useState('Math Olympiad');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [inquiryError, setInquiryError] = useState('');
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName.trim() || !inquiryEmail.trim() || !inquiryMessage.trim()) {
      setInquiryError('Please fill in your name, college email, and inquiry details.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inquiryEmail.trim())) {
      setInquiryError('Please enter a valid email address.');
      return;
    }
    setInquiryError('');
    setInquirySubmitted(true);
  };

  const getSocialIcon = (platform: string) => {
    if (platform.includes('Facebook')) return Facebook;
    if (platform.includes('WhatsApp')) return MessageCircle;
    if (platform.includes('Group')) return Users;
    return Instagram;
  };

  return (
    <>
      {/* 06. EXECUTIVES SECTION (Exact Reference Match to ref-execs.png) */}
      <section
        id="executives"
        aria-labelledby="executives-heading"
        className="scroll-mt-24 py-24 accmc-section-grid border-t border-sky-900/25"
      >
        <div className="max-w-[1160px] mx-auto px-6">
          <div className="max-w-2xl mb-14">
            <p className="text-xs font-mono tracking-[0.2em] uppercase text-[#1DA1F2] mb-3">
              EXECUTIVES
            </p>
            <h2
              id="executives-heading"
              className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-3"
            >
              Meet the <span className="text-[#1DA1F2]">team</span>
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              The people who keep the club running.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {EXECUTIVES_DATA.map((exec) => (
              <article
                key={exec.id}
                className="group p-8 rounded-2xl bg-[#071022]/90 border border-sky-500/15 hover:border-[#1DA1F2]/55 hover:-translate-y-1.5 hover:shadow-[0_14px_34px_rgba(29,161,242,0.14)] transition-all duration-200 text-center flex flex-col items-center justify-between gap-4"
              >
                <div className="w-20 h-20 rounded-full bg-[#1DA1F2] text-slate-950 font-extrabold text-xl flex items-center justify-center shadow-[0_0_25px_rgba(29,161,242,0.35)] group-hover:scale-105 transition-transform">
                  {exec.batch}
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-white group-hover:text-[#1DA1F2] transition-colors">
                    {exec.name}
                  </h3>
                  <p className="text-xs font-mono text-[#1DA1F2] font-semibold">
                    {exec.role}
                  </p>
                  <p className="text-xs text-slate-400 pt-1">
                    {exec.department}
                  </p>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed border-t border-sky-900/30 pt-3 w-full">
                  {exec.specialization}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 07. SOCIALS SECTION (Exact Reference Match to ref-socials.png) */}
      <section
        id="socials"
        aria-labelledby="socials-heading"
        className="scroll-mt-24 py-24 accmc-section-grid border-t border-sky-900/25"
      >
        <div className="max-w-[1160px] mx-auto px-6">
          <div className="max-w-2xl mb-14">
            <p className="text-xs font-mono tracking-[0.2em] uppercase text-[#1DA1F2] mb-3">
              SOCIALS
            </p>
            <h2
              id="socials-heading"
              className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-3"
            >
              Stay <span className="text-[#1DA1F2]">connected</span>
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              Follow us and join the conversation.
            </p>
          </div>

          {/* 2x2 Social Cards matching ref-socials.png */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-20">
            {SOCIAL_CHANNELS.map((soc) => {
              const IconComp = getSocialIcon(soc.platform);
              return (
                <a
                  key={soc.id}
                  href={soc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-6 sm:p-7 rounded-2xl bg-[#071022]/90 border border-sky-500/15 hover:border-[#1DA1F2]/55 hover:-translate-y-1.5 hover:shadow-[0_14px_34px_rgba(29,161,242,0.14)] transition-all duration-200 flex items-center justify-between gap-5"
                >
                  <div className="flex items-center gap-5 min-w-0">
                    <div className="w-14 h-14 rounded-2xl bg-[#1DA1F2] text-slate-950 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(29,161,242,0.3)] group-hover:scale-105 transition-transform">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-lg font-bold text-white group-hover:text-[#1DA1F2] transition-colors">
                        {soc.platform}
                      </h3>
                      <p className="text-sm text-slate-400 leading-snug mt-0.5">
                        {soc.description}
                      </p>
                    </div>
                  </div>

                  <ArrowUpRight className="w-5 h-5 text-[#1DA1F2] shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              );
            })}
          </div>

          {/* Contact & Inquiry Desk */}
          <div
            id="contact"
            className="max-w-3xl mx-auto p-8 rounded-2xl bg-[#071022]/90 border border-sky-500/15"
          >
            <div className="mb-6">
              <p className="text-xs font-mono tracking-[0.2em] uppercase text-[#1DA1F2] mb-2">
                CONTACT US
              </p>
              <h3 className="text-2xl font-bold text-white">
                Send a message to the ACCMC Executive Desk
              </h3>
              <p className="text-sm text-slate-400 mt-1">
                Room 304, Adamjee Cantonment College, Dhaka Cantonment · Questions on
                workshops, Olympiad registration, or club activities.
              </p>
            </div>

            {inquirySubmitted ? (
              <div
                role="status"
                className="p-6 rounded-xl bg-emerald-950/40 border border-emerald-700/50 space-y-3 text-sm text-emerald-200"
              >
                <div className="flex items-center gap-2 font-semibold text-white">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>Message Received by ACCMC Executive Desk</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Thank you, <span className="text-white font-medium">{inquiryName}</span>.
                  Our {inquirySegment} coordinator will respond to{' '}
                  <span className="font-mono text-[#1DA1F2]">{inquiryEmail}</span> shortly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setInquirySubmitted(false);
                    setInquiryMessage('');
                  }}
                  className="px-4 py-2 rounded-full bg-slate-800 hover:bg-slate-700 text-xs text-white font-medium transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-4" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="inquiry-name"
                      className="block text-xs font-medium text-slate-300 mb-1"
                    >
                      Full Name & College Roll
                    </label>
                    <input
                      id="inquiry-name"
                      type="text"
                      value={inquiryName}
                      onChange={(e) => setInquiryName(e.target.value)}
                      placeholder="e.g. Abrar Fahim (Roll 1088)"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#050B16] border border-sky-500/20 text-sm text-white focus:outline-none focus:border-[#1DA1F2]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="inquiry-email"
                      className="block text-xs font-medium text-slate-300 mb-1"
                    >
                      Email Address
                    </label>
                    <input
                      id="inquiry-email"
                      type="email"
                      value={inquiryEmail}
                      onChange={(e) => setInquiryEmail(e.target.value)}
                      placeholder="student@acc.edu.bd"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#050B16] border border-sky-500/20 text-sm text-white focus:outline-none focus:border-[#1DA1F2]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="inquiry-segment"
                      className="block text-xs font-medium text-slate-300 mb-1"
                    >
                      Segment of Interest
                    </label>
                    <select
                      id="inquiry-segment"
                      value={inquirySegment}
                      onChange={(e) => setInquirySegment(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#050B16] border border-sky-500/20 text-sm text-white focus:outline-none focus:border-[#1DA1F2]"
                    >
                      <option value="Math Olympiad">Math Olympiad</option>
                      <option value="IQ Solving">IQ Solving</option>
                      <option value="Case Solving">Case Solving</option>
                      <option value="Cryptography">Cryptography</option>
                      <option value="Rubik's Cube">Rubik&apos;s Cube</option>
                      <option value="Equational Arts">Equational Arts</option>
                      <option value="Chess">Chess</option>
                      <option value="Sudoku">Sudoku</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="inquiry-message"
                      className="block text-xs font-medium text-slate-300 mb-1"
                    >
                      Message
                    </label>
                    <input
                      id="inquiry-message"
                      type="text"
                      value={inquiryMessage}
                      onChange={(e) => setInquiryMessage(e.target.value)}
                      placeholder="Your question about sessions, olympiads, or resources..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#050B16] border border-sky-500/20 text-sm text-white focus:outline-none focus:border-[#1DA1F2]"
                    />
                  </div>
                </div>

                {inquiryError && (
                  <p role="alert" className="text-xs text-rose-300">
                    {inquiryError}
                  </p>
                )}

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#1DA1F2] hover:bg-sky-400 text-slate-950 text-xs font-bold shadow-[0_0_20px_rgba(29,161,242,0.35)] transition-all cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 08. BECOME A MEMBER (GOOGLE FORMS REDIRECT CTA) */}
      <section
        id="become-a-member"
        aria-labelledby="member-cta-heading"
        className="py-24 accmc-section-grid border-t border-sky-900/25"
      >
        <div className="max-w-[1160px] mx-auto px-6">
          <div className="p-8 sm:p-12 lg:p-14 rounded-3xl bg-gradient-to-r from-[#07132B] via-[#0A1D42] to-[#071022] border border-[#1DA1F2]/35 shadow-[0_0_50px_rgba(29,161,242,0.12)] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-2xl space-y-4">
              <p className="text-xs font-mono tracking-[0.2em] uppercase text-[#1DA1F2]">
                JOIN ACCMC · BECOME A MEMBER
              </p>

              <h2
                id="member-cta-heading"
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white"
              >
                Explore The <span className="text-[#1DA1F2]">Infinity ∞</span>
              </h2>

              <p className="text-slate-300 text-base leading-relaxed">
                Ready to join the Adamjee Cantonment College Mathematics Club across Math
                Olympiad, IQ Solving, Case Solving, Cryptography, Rubik&apos;s Cube,
                Equational Arts, Chess, and Sudoku? Click below to fill out our official
                Google Form membership registration.
              </p>
            </div>

            <div className="flex flex-col items-stretch sm:items-center gap-3 shrink-0 w-full lg:w-auto">
              <a
                href={GOOGLE_FORM_MEMBER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#1DA1F2] hover:bg-sky-400 text-slate-950 font-bold text-sm shadow-[0_0_30px_rgba(29,161,242,0.45)] transition-all whitespace-nowrap shrink-0"
              >
                <span>Become a Member</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <span className="text-[11px] font-mono text-slate-400 text-center">
                Redirects to forms.gle/VoHXumkNrFe8AoxcA
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
