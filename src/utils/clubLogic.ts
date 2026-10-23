import {
  AchievementRecord,
  ClubSegment,
  ExecutiveMember,
  PdfResource,
  SessionPlanItem,
} from '../data/clubData';

/**
 * Extended Euclidean Algorithm: returns [gcd, x, y] such that a*x + b*y = gcd(a, b)
 */
export function extendedGcd(a: number, b: number): [number, number, number] {
  let oldR = Math.abs(Math.trunc(a));
  let r = Math.abs(Math.trunc(b));
  let oldS = a < 0 ? -1 : 1;
  let s = 0;
  let oldT = 0;
  let t = b < 0 ? -1 : 1;

  while (r !== 0) {
    const quotient = Math.floor(oldR / r);
    const tempR = oldR - quotient * r;
    oldR = r;
    r = tempR;

    const tempS = oldS - quotient * s;
    oldS = s;
    s = tempS;

    const tempT = oldT - quotient * t;
    oldT = t;
    t = tempT;
  }

  return [oldR, oldS, oldT];
}

export interface ModularSolution {
  hasSolution: boolean;
  gcd: number;
  smallestPositiveX: number | null;
  modulusStep: number | null;
  explanation: string;
}

/**
 * Solves a * x ≡ b (mod m) for integer x in [0, m-1]
 */
export function solveModularCongruence(a: number, b: number, m: number): ModularSolution {
  const cleanM = Math.max(2, Math.min(10000, Math.trunc(m)));
  const cleanA = ((Math.trunc(a) % cleanM) + cleanM) % cleanM;
  const cleanB = ((Math.trunc(b) % cleanM) + cleanM) % cleanM;

  const [g, xCoeff] = extendedGcd(cleanA, cleanM);

  if (cleanB % g !== 0) {
    return {
      hasSolution: false,
      gcd: g,
      smallestPositiveX: null,
      modulusStep: null,
      explanation: `No integer solution exists because gcd(${cleanA}, ${cleanM}) = ${g} does not divide ${cleanB}.`,
    };
  }

  const reducedM = cleanM / g;
  const reducedB = cleanB / g;
  const baseInverse = ((xCoeff % reducedM) + reducedM) % reducedM;
  const x0 = (baseInverse * reducedB) % reducedM;

  return {
    hasSolution: true,
    gcd: g,
    smallestPositiveX: x0,
    modulusStep: reducedM,
    explanation: `Since gcd(${cleanA}, ${cleanM}) = ${g} divides ${cleanB}, the unique minimal non-negative solution is x ≡ ${x0} (mod ${reducedM}).`,
  };
}

/**
 * Caesar / Affine shift cipher for the Cryptography interactive lab
 */
export function transformCipherText(
  input: string,
  shift: number,
  mode: 'encrypt' | 'decrypt'
): { output: string; alphaCount: number; entropyEstimate: number } {
  const normalizedShift = ((((mode === 'decrypt' ? -shift : shift) % 26) + 26) % 26);
  let alphaCount = 0;
  const freq: Record<string, number> = {};

  const output = input
    .split('')
    .map((ch) => {
      const code = ch.charCodeAt(0);
      if (code >= 65 && code <= 90) {
        alphaCount++;
        const mapped = String.fromCharCode(((code - 65 + normalizedShift) % 26) + 65);
        freq[mapped] = (freq[mapped] || 0) + 1;
        return mapped;
      }
      if (code >= 97 && code <= 122) {
        alphaCount++;
        const mapped = String.fromCharCode(((code - 97 + normalizedShift) % 26) + 97);
        const upper = mapped.toUpperCase();
        freq[upper] = (freq[upper] || 0) + 1;
        return mapped;
      }
      return ch;
    })
    .join('');

  let entropy = 0;
  if (alphaCount > 0) {
    for (const count of Object.values(freq)) {
      const p = count / alphaCount;
      entropy -= p * Math.log2(p);
    }
  }

  return {
    output,
    alphaCount,
    entropyEstimate: Number(entropy.toFixed(2)),
  };
}

/**
 * Generates normalized SVG coordinates [0..240, 0..240] for the Equational Arts interactive plotter
 */
export function sampleParametricCurve(
  freqA: number,
  freqB: number,
  phaseDeg: number,
  samples = 240
): string {
  const safeA = Math.max(1, Math.min(12, Math.round(freqA)));
  const safeB = Math.max(1, Math.min(12, Math.round(freqB)));
  const delta = (phaseDeg * Math.PI) / 180;
  const coords: string[] = [];

  for (let i = 0; i <= samples; i++) {
    const t = (i / samples) * Math.PI * 2;
    const x = 120 + 92 * Math.sin(safeA * t + delta);
    const y = 120 + 92 * Math.sin(safeB * t);
    coords.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }

  return coords.join(' ');
}

/**
 * Evaluates a user's answer to a segment micro-challenge
 */
export function verifySegmentChallenge(segment: ClubSegment, rawAnswer: string): boolean {
  const cleaned = rawAnswer.trim().toLowerCase();
  const target = segment.challengeAnswer.trim().toLowerCase();
  return cleaned !== '' && cleaned === target;
}

/**
 * Filters PDF resources by topic and search query
 */
export function filterPdfResources(
  resources: PdfResource[],
  topicFilter: string,
  searchQuery: string
): PdfResource[] {
  const normalizedTopic = topicFilter.trim();
  const q = searchQuery.trim().toLowerCase();

  return resources.filter((res) => {
    const matchesTopic =
      normalizedTopic === 'All' ||
      normalizedTopic === '' ||
      res.topic === normalizedTopic;

    if (!matchesTopic) return false;
    if (!q) return true;

    return (
      res.title.toLowerCase().includes(q) ||
      res.topic.toLowerCase().includes(q) ||
      res.abstract.toLowerCase().includes(q) ||
      res.author.toLowerCase().includes(q) ||
      res.keyTheorems.some((t) => t.toLowerCase().includes(q))
    );
  });
}

/**
 * Filters session plans by segment ID and difficulty level
 */
export function filterSessionPlans(
  sessions: SessionPlanItem[],
  segmentFilter: string,
  levelFilter: string
): SessionPlanItem[] {
  return sessions.filter((s) => {
    const matchesSegment =
      segmentFilter === 'all' || segmentFilter === '' || s.segmentId === segmentFilter;
    const matchesLevel =
      levelFilter === 'All' || levelFilter === '' || s.level === levelFilter;
    return matchesSegment && matchesLevel;
  });
}

/**
 * Filters achievements by category
 */
export function filterAchievements(
  achievements: AchievementRecord[],
  category: string
): AchievementRecord[] {
  if (!category || category === 'All') return achievements;
  return achievements.filter((a) => a.category === category);
}

/**
 * Filters executives by wing
 */
export function filterExecutives(
  executives: ExecutiveMember[],
  wing: string
): ExecutiveMember[] {
  if (!wing || wing === 'All') return executives;
  return executives.filter((e) => e.wing === wing);
}

/**
 * Escapes text for PDF literal strings (...) and replaces non-ASCII characters with readable ASCII
 */
function sanitizePdfString(str: string): string {
  return str
    .replace(/≡/g, '=')
    .replace(/≈/g, '~=')
    .replace(/≤/g, '<=')
    .replace(/≥/g, '>=')
    .replace(/×/g, 'x')
    .replace(/÷/g, '/')
    .replace(/±/g, '+/-')
    .replace(/φ/g, 'phi')
    .replace(/θ/g, 'theta')
    .replace(/λ/g, 'lambda')
    .replace(/π/g, 'pi')
    .replace(/Δ/g, 'Delta')
    .replace(/∑/g, 'Sum')
    .replace(/√/g, 'sqrt')
    .replace(/∞/g, 'inf')
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/[–—·]/g, '-')
    .replace(/[^\x20-\x7E]/g, '')
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)');
}

/**
 * Wraps long text into lines of at most maxChars characters
 */
function wrapTextLines(text: string, maxChars = 78): string[] {
  const clean = sanitizePdfString(text);
  const words = clean.split(/\s+/);
  const lines: string[] = [];
  let current = '';

  for (const w of words) {
    if (!current) {
      current = w;
    } else if (current.length + 1 + w.length <= maxChars) {
      current += ' ' + w;
    } else {
      lines.push(current);
      current = w;
    }
  }
  if (current) lines.push(current);
  return lines;
}

/**
 * Generates a 100% standards-compliant PDF-1.4 document (with valid byte offsets in xref)
 * for any PdfResource so clicking "Download PDF" produces a genuine, multi-section viewable PDF.
 */
export function generateResourcePdfContent(resource: PdfResource): string {
  const lines: { text: string; size: number; bold?: boolean; indent?: number }[] = [];

  lines.push({
    text: 'ADAMJEE CANTONMENT COLLEGE MATHEMATICS CLUB (ACCMC)',
    size: 10,
    bold: true,
  });
  lines.push({
    text: `OFFICIAL STUDY MONOGRAPH - ${resource.topic.toUpperCase()}`,
    size: 9,
  });
  lines.push({ text: '', size: 8 });
  for (const tLine of wrapTextLines(resource.title, 62)) {
    lines.push({ text: tLine, size: 15, bold: true });
  }
  lines.push({
    text: `Author: ${resource.author}  |  Edition: ${resource.edition}  |  Tier: ${resource.difficulty}`,
    size: 9,
  });
  lines.push({
    text: '--------------------------------------------------------------------------------',
    size: 9,
  });

  lines.push({ text: 'ABSTRACT & SYLLABUS OVERVIEW', size: 11, bold: true });
  for (const aLine of wrapTextLines(resource.abstract, 80)) {
    lines.push({ text: aLine, size: 10 });
  }
  lines.push({ text: '', size: 8 });

  lines.push({ text: 'KEY THEOREMS & CORE FRAMEWORKS', size: 11, bold: true });
  resource.keyTheorems.forEach((thm, idx) => {
    for (const kLine of wrapTextLines(`${idx + 1}. ${thm}`, 78)) {
      lines.push({ text: kLine, size: 10, indent: 12 });
    }
  });
  lines.push({ text: '', size: 8 });

  resource.pdfSections.forEach((sec) => {
    lines.push({ text: sec.heading, size: 12, bold: true });
    lines.push({ text: `Core Formula: ${sec.formula}`, size: 9, indent: 10 });
    for (const bLine of wrapTextLines(sec.body, 78)) {
      lines.push({ text: bLine, size: 10 });
    }
    for (const pLine of wrapTextLines(sec.workedProblem, 76)) {
      lines.push({ text: pLine, size: 10, bold: true, indent: 8 });
    }
    for (const sLine of wrapTextLines(`Solution Proof: ${sec.solutionSummary}`, 76)) {
      lines.push({ text: sLine, size: 9, indent: 8 });
    }
    lines.push({ text: '', size: 8 });
  });

  lines.push({
    text: '--------------------------------------------------------------------------------',
    size: 9,
  });
  lines.push({
    text: 'Adamjee Cantonment College, Dhaka Cantonment, Dhaka-1206 | Membership: https://forms.gle/VoHXumkNrFe8AoxcA',
    size: 8,
  });

  let streamOps = 'BT\n';
  let y = 745;

  for (const item of lines) {
    if (y < 52) break;
    if (item.text === '') {
      y -= item.size;
      continue;
    }
    const fontKey = item.bold ? '/F2' : '/F1';
    const x = 48 + (item.indent || 0);
    streamOps += `${fontKey} ${item.size} Tf\n`;
    streamOps += `1 0 0 1 ${x} ${y} Tm\n`;
    streamOps += `(${item.text}) Tj\n`;
    y -= Math.round(item.size * 1.42);
  }
  streamOps += 'ET\n';

  const objects: string[] = [];
  objects.push('1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n');
  objects.push('2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n');
  objects.push(
    '3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> >>\nendobj\n'
  );
  objects.push(
    `4 0 obj\n<< /Length ${streamOps.length} >>\nstream\n${streamOps}endstream\nendobj\n`
  );
  objects.push(
    '5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n'
  );
  objects.push(
    '6 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj\n'
  );

  let pdf = '%PDF-1.4\n';
  const offsets: number[] = [0];

  for (const obj of objects) {
    offsets.push(pdf.length);
    pdf += obj;
  }

  const xrefStart = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += '0000000000 65535 f \n';
  for (let i = 1; i <= objects.length; i++) {
    const padded = String(offsets[i]).padStart(10, '0');
    pdf += `${padded} 00000 n \n`;
  }

  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF\n`;
  return pdf;
}
