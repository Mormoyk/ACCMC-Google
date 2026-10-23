import test from 'node:test';
import assert from 'node:assert/strict';
import {
  CLUB_SEGMENTS,
  GOOGLE_FORM_MEMBER_URL,
  NAV_SECTIONS,
  PDF_RESOURCES,
  SESSION_PLANS,
} from '../data/clubData';
import {
  extendedGcd,
  filterPdfResources,
  filterSessionPlans,
  generateResourcePdfContent,
  sampleParametricCurve,
  solveModularCongruence,
  transformCipherText,
  verifySegmentChallenge,
} from './clubLogic';

test('top tab navigation sections include all required club sections with valid anchor targets', () => {
  assert.deepEqual(
    NAV_SECTIONS.map((s) => s.label),
    [
      'About',
      'Segments',
      'Achievements',
      'Resources',
      'Session Plans',
      'Executives',
      'Socials',
    ]
  );
  assert.ok(NAV_SECTIONS.every((s) => s.href === `#${s.id}`));
});

test('all 8 required segments are present and configured', () => {
  assert.equal(CLUB_SEGMENTS.length, 8);
  const names = CLUB_SEGMENTS.map((s) => s.name);
  assert.deepEqual(names, [
    'Math Olympiad',
    'IQ Solving',
    'Case Solving',
    'Cryptography',
    "Rubik's Cube",
    'Equational Arts',
    'Chess',
    'Sudoku',
  ]);
});

test('Google Form membership link matches exact URL requirement', () => {
  assert.equal(GOOGLE_FORM_MEMBER_URL, 'https://forms.gle/VoHXumkNrFe8AoxcA');
});

test('extendedGcd and solveModularCongruence solve Olympiad congruences accurately', () => {
  const [g, x, y] = extendedGcd(7, 26);
  assert.equal(g, 1);
  assert.equal(7 * x + 26 * y, 1);

  const sol = solveModularCongruence(7, 1, 26);
  assert.equal(sol.hasSolution, true);
  assert.equal(sol.smallestPositiveX, 15);

  const noSol = solveModularCongruence(6, 5, 9);
  assert.equal(noSol.hasSolution, false);
  assert.equal(noSol.gcd, 3);
});

test('transformCipherText encrypts and decrypts reversibly', () => {
  const plain = 'ADAMJEE MATH OLYMPIAD 2026';
  const encrypted = transformCipherText(plain, 7, 'encrypt');
  assert.notEqual(encrypted.output, plain);
  const decrypted = transformCipherText(encrypted.output, 7, 'decrypt');
  assert.equal(decrypted.output, plain);
  assert.ok(encrypted.entropyEstimate > 0);
});

test('sampleParametricCurve produces valid normalized SVG coordinates', () => {
  const pts = sampleParametricCurve(3, 4, 45, 60);
  const pairs = pts.split(' ');
  assert.equal(pairs.length, 61);
  assert.ok(pairs[0].includes(','));
});

test('verifySegmentChallenge validates segment challenge answers', () => {
  const olympiad = CLUB_SEGMENTS[0];
  assert.equal(verifySegmentChallenge(olympiad, '15'), true);
  assert.equal(verifySegmentChallenge(olympiad, ' 15 '), true);
  assert.equal(verifySegmentChallenge(olympiad, '14'), false);
});

test('filterPdfResources and filterSessionPlans filter accurately', () => {
  const cryptoRes = filterPdfResources(PDF_RESOURCES, 'Cryptography', '');
  assert.equal(cryptoRes.length, 1);
  assert.equal(cryptoRes[0].segmentId, 'cryptography');

  const searchRes = filterPdfResources(PDF_RESOURCES, 'All', 'Phistomefel');
  assert.equal(searchRes.length, 1);
  assert.equal(searchRes[0].id, 'res-chess-sudoku-logic');

  const sudokuSessions = filterSessionPlans(SESSION_PLANS, 'sudoku', 'All');
  assert.equal(sudokuSessions.length, 1);
});

test('generateResourcePdfContent produces a valid %PDF-1.4 document with xref and EOF', () => {
  const pdfText = generateResourcePdfContent(PDF_RESOURCES[0]);
  assert.ok(pdfText.startsWith('%PDF-1.4'));
  assert.ok(pdfText.includes('ADAMJEE CANTONMENT COLLEGE MATHEMATICS CLUB'));
  assert.ok(pdfText.includes('xref'));
  assert.ok(pdfText.trim().endsWith('%%EOF'));
});
