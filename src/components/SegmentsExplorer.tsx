import React, { useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Compass,
  HelpCircle,
  Sliders,
} from 'lucide-react';
import { motion } from 'motion/react';
import { CLUB_SEGMENTS, ClubSegment, SegmentId } from '../data/clubData';
import {
  sampleParametricCurve,
  solveModularCongruence,
  transformCipherText,
  verifySegmentChallenge,
} from '../utils/clubLogic';

interface SegmentsExplorerProps {
  onSelectResourceBySegment: (segmentId: SegmentId) => void;
}

const SEGMENT_BADGE_THEMES: Record<
  SegmentId,
  { symbol: string; colorClass: string; bgClass: string }
> = {
  'math-olympiad': {
    symbol: '∑',
    colorClass: 'text-[#F37B21]',
    bgClass: 'bg-[#F37B21]/15 border-[#F37B21]/30',
  },
  'iq-solving': {
    symbol: 'Δ',
    colorClass: 'text-[#1DA1F2]',
    bgClass: 'bg-[#1DA1F2]/15 border-[#1DA1F2]/30',
  },
  'case-solving': {
    symbol: '∫',
    colorClass: 'text-[#C4D626]',
    bgClass: 'bg-[#C4D626]/15 border-[#C4D626]/30',
  },
  cryptography: {
    symbol: '≡',
    colorClass: 'text-[#E11D48]',
    bgClass: 'bg-[#E11D48]/15 border-[#E11D48]/30',
  },
  'rubiks-cube': {
    symbol: '×',
    colorClass: 'text-[#F37B21]',
    bgClass: 'bg-[#F37B21]/15 border-[#F37B21]/30',
  },
  'equational-arts': {
    symbol: '∞',
    colorClass: 'text-[#1DA1F2]',
    bgClass: 'bg-[#1DA1F2]/15 border-[#1DA1F2]/30',
  },
  chess: {
    symbol: '+',
    colorClass: 'text-[#C4D626]',
    bgClass: 'bg-[#C4D626]/15 border-[#C4D626]/30',
  },
  sudoku: {
    symbol: '÷',
    colorClass: 'text-[#E11D48]',
    bgClass: 'bg-[#E11D48]/15 border-[#E11D48]/30',
  },
};

export const SegmentsExplorer: React.FC<SegmentsExplorerProps> = ({
  onSelectResourceBySegment,
}) => {
  const [activeSegmentId, setActiveSegmentId] = useState<SegmentId>('math-olympiad');
  const [challengeInputs, setChallengeInputs] = useState<Record<string, string>>({});
  const [challengeStatus, setChallengeStatus] = useState<
    Record<string, 'idle' | 'correct' | 'incorrect'>
  >({});
  const [showHint, setShowHint] = useState<Record<string, boolean>>({});

  // Interactive Lab states
  const [modA, setModA] = useState<number>(7);
  const [modB, setModB] = useState<number>(1);
  const [modM, setModM] = useState<number>(26);

  const [cipherInput, setCipherInput] = useState<string>('ADAMJEE CANTONMENT COLLEGE');
  const [cipherShift, setCipherShift] = useState<number>(7);
  const [cipherMode, setCipherMode] = useState<'encrypt' | 'decrypt'>('encrypt');

  const [freqA, setFreqA] = useState<number>(3);
  const [freqB, setFreqB] = useState<number>(4);
  const [phaseDeg, setPhaseDeg] = useState<number>(45);

  const activeSegment: ClubSegment =
    CLUB_SEGMENTS.find((s) => s.id === activeSegmentId) || CLUB_SEGMENTS[0];

  const modResult = solveModularCongruence(modA, modB, modM);
  const cipherResult = transformCipherText(cipherInput, cipherShift, cipherMode);
  const parametricPoints = sampleParametricCurve(freqA, freqB, phaseDeg, 240);

  const handleVerifyChallenge = (e: React.FormEvent) => {
    e.preventDefault();
    const raw = challengeInputs[activeSegment.id] || '';
    const isOk = verifySegmentChallenge(activeSegment, raw);
    setChallengeStatus((prev) => ({
      ...prev,
      [activeSegment.id]: isOk ? 'correct' : 'incorrect',
    }));
  };

  return (
    <section
      id="segments"
      aria-labelledby="segments-heading"
      className="scroll-mt-24 py-24 accmc-section-grid border-t border-sky-900/25"
    >
      <div className="max-w-[1160px] mx-auto px-6">
        {/* Reference-Matched Header */}
        <div className="max-w-2xl mb-14">
          <p className="text-xs font-mono tracking-[0.2em] uppercase text-[#1DA1F2] mb-3">
            SEGMENTS
          </p>
          <h2
            id="segments-heading"
            className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4"
          >
            Eight arenas of <span className="text-[#1DA1F2]">mastery</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            From Olympiad proof-writing and cryptanalysis to speedcubing, equational
            graphing art, chess, and logic grids — explore every specialized wing of
            ACCMC.
          </p>
        </div>

        {/* 8-Segment Cards Grid in accmc.lovable.app Aesthetic */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12"
          role="tablist"
          aria-label="Club Segments"
        >
          {CLUB_SEGMENTS.map((seg) => {
            const isSelected = seg.id === activeSegmentId;
            const theme = SEGMENT_BADGE_THEMES[seg.id];

            return (
              <button
                key={seg.id}
                role="tab"
                aria-selected={isSelected}
                aria-controls={`segment-panel-${seg.id}`}
                onClick={() => setActiveSegmentId(seg.id)}
                className={`group text-left p-6 rounded-2xl border transition-all duration-200 flex flex-col justify-between cursor-pointer hover:-translate-y-1.5 ${
                  isSelected
                    ? 'bg-[#091936]/95 border-[#1DA1F2] shadow-[0_0_32px_rgba(29,161,242,0.22)] -translate-y-1'
                    : 'bg-[#071022]/85 border-sky-500/15 hover:border-[#1DA1F2]/50 hover:bg-[#09152E] hover:shadow-[0_12px_30px_rgba(29,161,242,0.12)]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div
                      className={`w-11 h-11 rounded-xl border flex items-center justify-center font-mono text-xl font-bold group-hover:scale-110 transition-transform ${theme.bgClass} ${theme.colorClass}`}
                    >
                      {theme.symbol}
                    </div>
                    <span className="font-mono text-xs text-slate-400 tabular-nums">
                      {seg.index}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#1DA1F2] transition-colors">
                    {seg.name}
                  </h3>
                  <p className="text-xs text-[#1DA1F2] font-medium mb-3 leading-snug">
                    {seg.subtitle}
                  </p>
                  <p className="text-sm text-slate-400 leading-relaxed mb-5">
                    {seg.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-sky-900/30 flex items-center justify-between text-xs font-medium text-[#1DA1F2]">
                  <span>{isSelected ? 'Active Wing' : 'Explore segment'}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Segment Deep-Dive & Interactive Sandbox */}
        <motion.div
          key={activeSegment.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          id={`segment-panel-${activeSegment.id}`}
          role="tabpanel"
          className="rounded-2xl border border-[#1DA1F2]/30 bg-[#071022]/95 p-6 sm:p-8 lg:p-10 shadow-[0_0_45px_rgba(29,161,242,0.08)]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Detailed Description & Pillars (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#1DA1F2] font-mono">
                <span>SEGMENT {activeSegment.index}</span>
                <span aria-hidden="true">·</span>
                <span>{activeSegment.weeklySchedule}</span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                  {activeSegment.name}{' '}
                  <span className="text-[#1DA1F2]">Overview</span>
                </h3>
                <p className="text-sm text-sky-300 font-medium">
                  {activeSegment.subtitle}
                </p>
              </div>

              <p className="text-slate-300 leading-relaxed text-base">
                {activeSegment.detailedDescription}
              </p>

              {/* Core Syllabus Pillars */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#1DA1F2] mb-3">
                  Core Training Modules & Mathematical Foundations
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeSegment.corePillars.map((pillar, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl bg-[#050B16] border border-sky-500/15 text-sm text-slate-200 leading-snug"
                    >
                      <span className="font-mono text-xs text-[#1DA1F2] mr-2 tabular-nums">
                        0{i + 1}.
                      </span>
                      {pillar}
                    </div>
                  ))}
                </div>
              </div>

              {/* Metadata Footer: Competitions & Coordinator */}
              <div className="pt-4 border-t border-sky-900/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-xs text-slate-300 space-y-1">
                  <div>
                    <span className="text-slate-400">Target Competitions: </span>
                    {activeSegment.competitions.join(' · ')}
                  </div>
                  <div>
                    <span className="text-slate-400">Segment Coordinator: </span>
                    <span className="text-white font-medium">
                      {activeSegment.leadCoordinator}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectResourceBySegment(activeSegment.id)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1DA1F2]/15 border border-[#1DA1F2]/40 text-[#1DA1F2] hover:bg-[#1DA1F2] hover:text-slate-950 text-xs font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Open {activeSegment.name} PDFs</span>
                </button>
              </div>
            </div>

            {/* Right Column: Interactive Segment Micro-Workbench & Challenge (5 cols) */}
            <div className="lg:col-span-5 space-y-6 bg-[#050B16] border border-sky-500/20 rounded-2xl p-6">
              {activeSegment.id === 'math-olympiad' && (
                <div className="pb-6 border-b border-sky-900/30 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Sliders className="w-4 h-4 text-[#1DA1F2]" />
                      <span>Linear Congruence Solver</span>
                    </h4>
                    <span className="text-xs font-mono text-[#1DA1F2]">
                      ax ≡ b (mod m)
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <label className="block text-xs text-slate-400">
                      Coeff a
                      <input
                        type="number"
                        value={modA}
                        onChange={(e) => setModA(Number(e.target.value) || 1)}
                        className="mt-1 w-full px-2.5 py-1.5 rounded-lg bg-[#09152E] border border-sky-500/25 text-white font-mono text-sm tabular-nums"
                      />
                    </label>
                    <label className="block text-xs text-slate-400">
                      Residue b
                      <input
                        type="number"
                        value={modB}
                        onChange={(e) => setModB(Number(e.target.value) || 0)}
                        className="mt-1 w-full px-2.5 py-1.5 rounded-lg bg-[#09152E] border border-sky-500/25 text-white font-mono text-sm tabular-nums"
                      />
                    </label>
                    <label className="block text-xs text-slate-400">
                      Modulus m
                      <input
                        type="number"
                        min={2}
                        value={modM}
                        onChange={(e) => setModM(Math.max(2, Number(e.target.value) || 2))}
                        className="mt-1 w-full px-2.5 py-1.5 rounded-lg bg-[#09152E] border border-sky-500/25 text-white font-mono text-sm tabular-nums"
                      />
                    </label>
                  </div>
                  <div className="p-3 rounded-xl bg-[#08152E] border border-[#1DA1F2]/25 text-xs font-mono text-sky-200 leading-relaxed">
                    {modResult.explanation}
                  </div>
                </div>
              )}

              {activeSegment.id === 'cryptography' && (
                <div className="pb-6 border-b border-sky-900/30 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Sliders className="w-4 h-4 text-[#1DA1F2]" />
                      <span>Shift Cipher & Entropy Lab</span>
                    </h4>
                    <div className="flex items-center gap-1 bg-[#09152E] p-0.5 rounded-lg border border-sky-500/20">
                      <button
                        type="button"
                        onClick={() => setCipherMode('encrypt')}
                        className={`px-2.5 py-1 text-xs rounded-md transition-colors ${
                          cipherMode === 'encrypt'
                            ? 'bg-[#1DA1F2] text-slate-950 font-bold'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        Encrypt
                      </button>
                      <button
                        type="button"
                        onClick={() => setCipherMode('decrypt')}
                        className={`px-2.5 py-1 text-xs rounded-md transition-colors ${
                          cipherMode === 'decrypt'
                            ? 'bg-[#1DA1F2] text-slate-950 font-bold'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        Decrypt
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <label className="sm:col-span-2 block text-xs text-slate-400">
                      Input Message
                      <input
                        type="text"
                        value={cipherInput}
                        onChange={(e) => setCipherInput(e.target.value)}
                        className="mt-1 w-full px-2.5 py-1.5 rounded-lg bg-[#09152E] border border-sky-500/25 text-white font-mono text-xs"
                      />
                    </label>
                    <label className="block text-xs text-slate-400">
                      Shift (mod 26)
                      <input
                        type="number"
                        value={cipherShift}
                        onChange={(e) => setCipherShift(Number(e.target.value) || 0)}
                        className="mt-1 w-full px-2.5 py-1.5 rounded-lg bg-[#09152E] border border-sky-500/25 text-white font-mono text-xs tabular-nums"
                      />
                    </label>
                  </div>
                  <div className="p-3 rounded-xl bg-[#08152E] border border-[#1DA1F2]/25 space-y-1 font-mono text-xs">
                    <div className="text-slate-400">
                      Output:{' '}
                      <span className="text-[#1DA1F2] font-semibold break-all">
                        {cipherResult.output}
                      </span>
                    </div>
                    <div className="text-slate-400 tabular-nums">
                      Entropy: {cipherResult.entropyEstimate} bits/symbol ·{' '}
                      {cipherResult.alphaCount} chars
                    </div>
                  </div>
                </div>
              )}

              {activeSegment.id === 'equational-arts' && (
                <div className="pb-6 border-b border-sky-900/30 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Compass className="w-4 h-4 text-[#1DA1F2]" />
                      <span>Lissajous Parametric Studio</span>
                    </h4>
                    <span className="text-xs font-mono text-[#1DA1F2] tabular-nums">
                      ({freqA}:{freqB}, δ={phaseDeg}°)
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <svg
                      viewBox="0 0 240 240"
                      className="w-28 h-28 shrink-0 rounded-xl bg-[#040914] border border-sky-500/25 p-1"
                      aria-label="Parametric Lissajous curve preview"
                    >
                      <line
                        x1="120"
                        y1="0"
                        x2="120"
                        y2="240"
                        stroke="#0f2547"
                        strokeWidth="1"
                      />
                      <line
                        x1="0"
                        y1="120"
                        x2="240"
                        y2="120"
                        stroke="#0f2547"
                        strokeWidth="1"
                      />
                      <polyline
                        fill="none"
                        stroke="#1DA1F2"
                        strokeWidth="2.4"
                        points={parametricPoints}
                      />
                    </svg>
                    <div className="flex-1 space-y-2 text-xs">
                      <label className="block text-slate-300">
                        Frequency a: <span className="font-mono">{freqA}</span>
                        <input
                          type="range"
                          min={1}
                          max={9}
                          value={freqA}
                          onChange={(e) => setFreqA(Number(e.target.value))}
                          className="w-full accent-[#1DA1F2]"
                        />
                      </label>
                      <label className="block text-slate-300">
                        Frequency b: <span className="font-mono">{freqB}</span>
                        <input
                          type="range"
                          min={1}
                          max={9}
                          value={freqB}
                          onChange={(e) => setFreqB(Number(e.target.value))}
                          className="w-full accent-[#1DA1F2]"
                        />
                      </label>
                      <label className="block text-slate-300">
                        Phase δ: <span className="font-mono">{phaseDeg}°</span>
                        <input
                          type="range"
                          min={0}
                          max={180}
                          step={15}
                          value={phaseDeg}
                          onChange={(e) => setPhaseDeg(Number(e.target.value))}
                          className="w-full accent-[#1DA1F2]"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Segment Practice Challenge */}
              <form onSubmit={handleVerifyChallenge} className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-mono text-[#1DA1F2] uppercase tracking-wider">
                    {activeSegment.name} Quick Challenge
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setShowHint((prev) => ({
                        ...prev,
                        [activeSegment.id]: !prev[activeSegment.id],
                      }))
                    }
                    className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-[#1DA1F2] transition-colors cursor-pointer"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>{showHint[activeSegment.id] ? 'Hide Hint' : 'Show Hint'}</span>
                  </button>
                </div>

                <p className="text-sm text-white font-medium leading-relaxed">
                  {activeSegment.challengePrompt}
                </p>

                {showHint[activeSegment.id] && (
                  <p className="text-xs text-sky-200 bg-[#091936] border border-[#1DA1F2]/30 rounded-xl p-3">
                    Hint: {activeSegment.challengeHint}
                  </p>
                )}

                <div className="flex items-center gap-2">
                  <label htmlFor="segment-challenge-input" className="sr-only">
                    Your numeric answer for {activeSegment.name}
                  </label>
                  <input
                    id="segment-challenge-input"
                    type="text"
                    placeholder="Enter answer..."
                    value={challengeInputs[activeSegment.id] || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      setChallengeInputs((prev) => ({
                        ...prev,
                        [activeSegment.id]: val,
                      }));
                      setChallengeStatus((prev) => ({
                        ...prev,
                        [activeSegment.id]: 'idle',
                      }));
                    }}
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#09152E] border border-sky-500/25 text-sm text-white font-mono focus:outline-none focus:border-[#1DA1F2]"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-full bg-[#1DA1F2] hover:bg-sky-400 text-slate-950 text-xs font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Verify Answer
                  </button>
                </div>

                {challengeStatus[activeSegment.id] === 'correct' && (
                  <div
                    role="status"
                    className="flex items-center gap-2 text-xs text-emerald-300 bg-emerald-950/50 border border-emerald-700/50 rounded-xl p-3"
                  >
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                    <span>
                      Correct! {activeSegment.challengeAnswer} is the verified solution.
                    </span>
                  </div>
                )}

                {challengeStatus[activeSegment.id] === 'incorrect' && (
                  <div
                    role="status"
                    className="text-xs text-amber-300 bg-amber-950/50 border border-amber-700/50 rounded-xl p-3"
                  >
                    Not quite — check the hint above and try again.
                  </div>
                )}
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
