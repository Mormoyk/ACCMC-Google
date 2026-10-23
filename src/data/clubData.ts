export type SegmentId =
  | 'math-olympiad'
  | 'iq-solving'
  | 'case-solving'
  | 'cryptography'
  | 'rubiks-cube'
  | 'equational-arts'
  | 'chess'
  | 'sudoku';

export interface ClubSegment {
  id: SegmentId;
  index: string;
  name: string;
  subtitle: string;
  summary: string;
  detailedDescription: string;
  corePillars: string[];
  competitions: string[];
  weeklySchedule: string;
  leadCoordinator: string;
  formulaSignature: string;
  challengePrompt: string;
  challengeHint: string;
  challengeAnswer: string;
  colSpan?: 'wide' | 'normal';
}

export interface PdfResource {
  id: string;
  title: string;
  topic:
    | 'Math Olympiad'
    | 'IQ & Case Solving'
    | 'Cryptography'
    | 'Rubik’s Cube & Group Theory'
    | 'Equational Arts'
    | 'Chess & Sudoku Logic';
  segmentId: SegmentId;
  author: string;
  edition: string;
  pages: number;
  fileSize: string;
  fileName: string;
  difficulty: 'Foundation' | 'Intermediate' | 'Olympiad Advanced';
  abstract: string;
  keyTheorems: string[];
  pdfSections: {
    heading: string;
    formula: string;
    body: string;
    workedProblem: string;
    solutionSummary: string;
  }[];
}

export interface AchievementRecord {
  id: string;
  year: number;
  title: string;
  event: string;
  category: 'Olympiad' | 'Puzzle & Cube' | 'Case & Cryptanalysis' | 'Chess & Strategy';
  medalOrRank: string;
  recipients: string;
  quantifiedMetric: string;
  summary: string;
}

export interface SessionPlanItem {
  id: string;
  week: string;
  dateRange: string;
  title: string;
  segment: string;
  segmentId: SegmentId;
  level: 'Foundation' | 'Intermediate' | 'Advanced Camp';
  venue: string;
  instructor: string;
  duration: string;
  objectives: string[];
  deliverable: string;
  attachedResourceId: string;
}

export interface ExecutiveMember {
  id: string;
  name: string;
  role: string;
  wing: 'Advisory & Core' | 'Olympiad & Research Wing' | 'Logic, Cube & Strategy Wing' | 'Operations & Publications';
  batch: string;
  department: string;
  specialization: string;
  achievementHighlight: string;
  email: string;
}

export interface SocialChannel {
  id: string;
  platform: string;
  handle: string;
  url: string;
  memberCount: string;
  description: string;
  cadence: string;
}

export const GOOGLE_FORM_MEMBER_URL = 'https://forms.gle/VoHXumkNrFe8AoxcA';

export interface NavSectionItem {
  id: string;
  label: string;
  href: string;
}

export const NAV_SECTIONS: NavSectionItem[] = [
  { id: 'about', label: 'About', href: '#about' },
  { id: 'segments', label: 'Segments', href: '#segments' },
  { id: 'achievements', label: 'Achievements', href: '#achievements' },
  { id: 'resources', label: 'Resources', href: '#resources' },
  { id: 'session-plans', label: 'Session Plans', href: '#session-plans' },
  { id: 'executives', label: 'Executives', href: '#executives' },
  { id: 'socials', label: 'Socials', href: '#socials' },
];


export const CLUB_SEGMENTS: ClubSegment[] = [
  {
    id: 'math-olympiad',
    index: '01',
    name: 'Math Olympiad',
    subtitle: 'Number Theory, Combinatorics, Synthetic Geometry & Functional Equations',
    summary:
      'Rigorous proof-writing and non-routine problem solving modeled after the Bangladesh Mathematical Olympiad (BdMO), APMO, and IMO.',
    detailedDescription:
      'The flagship academic pillar of ACCMC trains students to transition from textbook computation to creative proof construction. Weekly seminars dissect Diophantine equations, extremal combinatorics, projective and inversion geometry, and Cauchy/Jensen functional equations using past BdMO National and IMO Shortlist archives.',
    corePillars: [
      'Modular Arithmetic, Quadratic Reciprocity & Lifting The Exponent (LTE)',
      'Bijective Proofs, Pigeonhole Principle, Invariants & Graph Extremals',
      'Spiral Similarity, Radical Axes, Harmonic Bundles & Barycentric Coordinates',
      'Inequalities (Cauchy-Schwarz, Holder, Jensen, Muirhead) & Functional Equations',
    ],
    competitions: ['BdMO Regional & National', 'IMO Selection Camp', 'APMO & Iranian Geometry Olympiad (IGO)'],
    weeklySchedule: 'Sundays & Tuesdays · 2:15 PM – 4:00 PM · Room 304 (Main Academic Block)',
    leadCoordinator: 'Tahmid Hasan (National Math Camp Finalist)',
    formulaSignature: 'a^φ(m) ≡ 1 (mod m),   gcd(a, m) = 1',
    challengePrompt:
      'Find the smallest positive integer x such that 7x ≡ 1 (mod 26).',
    challengeHint: 'Notice that 7 × 15 = 105 = 4 × 26 + 1.',
    challengeAnswer: '15',
    colSpan: 'wide',
  },
  {
    id: 'iq-solving',
    index: '02',
    name: 'IQ Solving',
    subtitle: 'Algorithmic Pattern Recognition, Spatial Matrices & Deductive Speed',
    summary:
      'High-velocity training in Raven’s progressive matrices, sequence invariants, logical syllogisms, and ISSB cognitive batteries.',
    detailedDescription:
      'Designed to sharpen rapid pattern synthesis under strict time constraints, the IQ Solving segment deconstructs complex visual-spatial transformations, recursive numerical sequences, knights-and-knaves truth tables, and lateral deduction challenges frequently encountered in national talent hunts and defense service assessments.',
    corePillars: [
      'Second- and Third-Order Finite Difference Sequence Analysis',
      '3D Mental Folding, Affine Matrix Rotations & XOR Visual Overlays',
      'Boolean Syllogisms, Knights & Knaves Paradoxes & Set Partitioning',
      'Rapid Estimation, Fermi Back-of-the-Envelope Bounds & Speed Drills',
    ],
    competitions: ['National Inter-Cantonment IQ Olympiad', 'ISSB Cognitive Prep League', 'ACC Mind Sprint'],
    weeklySchedule: 'Mondays · 2:15 PM – 3:30 PM · Room 305',
    leadCoordinator: 'Farhan Sadik (Inter-Cantonment IQ Gold Medalist)',
    formulaSignature: 'Δ^k a_n = Σ (-1)^j C(k, j) a_(n+k-j)',
    challengePrompt:
      'In the sequence 2, 6, 14, 30, 62, ... what is the next term?',
    challengeHint: 'Each difference doubles: +4, +8, +16, +32, +64.',
    challengeAnswer: '126',
    colSpan: 'normal',
  },
  {
    id: 'case-solving',
    index: '03',
    name: 'Case Solving',
    subtitle: 'Quantitative Modeling, Operations Research & Game-Theoretic Strategy',
    summary:
      'Applying linear programming, probability trees, and expected-value optimization to real-world STEM, policy, and actuarial cases.',
    detailedDescription:
      'Unlike purely narrative business cases, ACCMC’s Mathematical Case Solving division anchors every recommendation in rigorous quantitative modeling. Teams formulate objective functions, sensitivity matrices, Markov transition chains, and Monte Carlo risk bounds to solve logistics, urban traffic, and resource-allocation briefs.',
    corePillars: [
      'Linear Programming, Simplex Feasibility Regions & Shadow Pricing',
      'Bayesian Decision Trees, Expected Utility & Value of Perfect Information',
      'Nash Equilibria, Auction Theory & Multi-Agent Payoff Matrices',
      'Queueing Theory (M/M/1) & Sensitivity Stress-Testing in Spreadsheets',
    ],
    competitions: ['National Quantitative Case Championship', 'STEM Policy Datathon', 'ACCMC Analytical Case Cup'],
    weeklySchedule: 'Wednesdays · 2:15 PM – 3:45 PM · Seminar Hall B',
    leadCoordinator: 'Nafisa Anjum (National Case Champion)',
    formulaSignature: 'max c^T x   subject to   Ax ≤ b,  x ≥ 0',
    challengePrompt:
      'Project A yields 120 units with probability 0.5 (else 0). Project B yields a guaranteed 55 units. What is the expected value of Project A?',
    challengeHint: 'Compute E[A] = 0.5 × 120 + 0.5 × 0.',
    challengeAnswer: '60',
    colSpan: 'normal',
  },
  {
    id: 'cryptography',
    index: '04',
    name: 'Cryptography',
    subtitle: 'Prime Factorization, Modular Ciphers, Elliptic Curves & Cryptanalysis',
    summary:
      'From classical polyalphabetic ciphers and Shannon entropy to RSA public-key protocols, Diffie-Hellman key exchange, and CTF cryptanalysis.',
    detailedDescription:
      'Where pure number theory meets information security. Members explore how prime distribution, Euler’s totient theorem, and finite fields GF(2^n) secure modern communications—and practice breaking weakened ciphers through Kasiski examination, index of coincidence, and Wiener’s low-exponent RSA attacks.',
    corePillars: [
      'Affine, Vigenère & Hill Matrix Ciphers over Modular Rings Z/26Z',
      'Shannon Entropy, Index of Coincidence & Frequency Cryptanalysis',
      'Diffie-Hellman Discrete Logarithms & RSA Key Generation / Signing',
      'Cryptographic Hashing, Zero-Knowledge Proof Concepts & CTF Challenges',
    ],
    competitions: ['National Cipher Challenge', 'Bangladesh CTF Crypto Track', 'ACCMC Enigma Cup'],
    weeklySchedule: 'Thursdays · 2:30 PM – 4:00 PM · Computer Lab 2',
    leadCoordinator: 'Zahin Abrar (National Crypto CTF Winner)',
    formulaSignature: 'C ≡ M^e (mod pq),   M ≡ C^d (mod pq)',
    challengePrompt:
      'In RSA with primes p = 5 and q = 11, what is Euler’s totient φ(n) = (p - 1)(q - 1)?',
    challengeHint: 'Multiply (5 - 1) by (11 - 1).',
    challengeAnswer: '40',
    colSpan: 'wide',
  },
  {
    id: 'rubiks-cube',
    index: '05',
    name: "Rubik's Cube",
    subtitle: 'Permutation Group Theory, CFOP/Roux Speedcubing & Commutator Algebra',
    summary:
      'Mastering sub-10 second WCA speedsolving alongside the symmetric group algebra S_48 that governs twisty puzzles.',
    detailedDescription:
      'ACCMC’s Speedcubing & Permutation Lab bridges competitive WCA events (3x3, 4x4, 3x3 One-Handed, 3x3 Blindfolded) with abstract algebra. Members analyze parity constraints via permutation sign homomorphisms, construct custom 3-cycle commutators [A, B] = A B A⁻¹ B⁻¹, and drill lookahead efficiency.',
    corePillars: [
      'Full CFOP Mastery: Cross +1 Planning, Multi-Angle F2L, 57 OLL & 21 PLL',
      'Commutators [A, B] & Conjugates A B A⁻¹ for 3BLD (Pochmann / 3-Style)',
      'Cube Group Law: Corner Twist mod 3, Edge Flip mod 2 & Permutation Parity',
      'WCA Stackmat Inspection Drills, Fingertrick Ergonomics & TPS Optimization',
    ],
    competitions: ['WCA Dhaka Open', 'Inter-College Cube Clash', 'ACCMC Sub-12 Arena'],
    weeklySchedule: 'Thursdays · 1:45 PM – 3:00 PM · Club Courtyard & Room 304',
    leadCoordinator: 'Samin Yasar (9.14s Official WCA 3x3 Single)',
    formulaSignature: '|G_Cube| = (8! · 3^8 · 12! · 2^12) / 12 ≈ 4.32 × 10^19',
    challengePrompt:
      'How many total PLL (Permutation of the Last Layer) algorithms exist in standard 3x3 CFOP?',
    challengeHint: 'Standard CFOP has 57 OLLs and how many PLL cases?',
    challengeAnswer: '21',
    colSpan: 'normal',
  },
  {
    id: 'equational-arts',
    index: '06',
    name: 'Equational Arts',
    subtitle: 'Parametric Harmonics, Fourier Epicycles, Polar Roses & Desmos Graphing',
    summary:
      'Transforming piecewise algebraic functions, implicit surfaces, and parametric curves into intricate visual art and animations.',
    detailedDescription:
      'Equational Arts celebrates the visual poetry of mathematics. Using Desmos, GeoGebra, and custom SVG shaders, club artists compose architectural illustrations, portraits, and kinetic patterns purely out of implicit equations, Bézier splines, domain restrictions, and trigonometric Fourier series.',
    corePillars: [
      'Parametric Lissajous Figures, Hypotrochoids & Polar Rhodonea Curves',
      'Piecewise Domain & Range Clipping using Implicit Inequality Masks',
      'Cubic Bézier Spline Parameterization & Affine Matrix Transformations',
      'Discrete Fourier Transform (DFT) Epicycle Path Reconstruction',
    ],
    competitions: ['International Desmos Math Art Contest', 'ACCMC Equational Gallery Exhibition', 'National Math Fest Graphing Challenge'],
    weeklySchedule: 'Tuesdays · 3:00 PM – 4:15 PM · Digital Design Lab',
    leadCoordinator: 'Meherin Bushra (Global Desmos Art Shortlist)',
    formulaSignature: 'x(t) = sin(a·t + δ),   y(t) = sin(b·t)',
    challengePrompt:
      'For the polar rose r(θ) = cos(kθ) with k = 3, how many petals does the complete curve have?',
    challengeHint: 'When k is an odd integer, r = cos(kθ) has exactly k petals.',
    challengeAnswer: '3',
    colSpan: 'normal',
  },
  {
    id: 'chess',
    index: '07',
    name: 'Chess',
    subtitle: 'Combinatorial Game Trees, Minimax Evaluation & Endgame Geometry',
    summary:
      'Competitive FIDE rapid/classical training paired with Zermelo’s theorem, knight-tour Hamiltonian graphs, and opposition geometry.',
    detailedDescription:
      'In ACCMC’s Chess wing, the 64 squares are treated as a finite, zero-sum, perfect-information combinatorial game. Sessions combine opening repertoire preparation and tactical calculation with mathematical endgame studies—including corresponding squares, triangulation on planar graphs, and king-and-pawn opposition invariants.',
    corePillars: [
      'Combinatorial Game Theory, Minimax Alpha-Beta Pruning & Zugzwang Parity',
      'Endgame Geometry: Rule of the Square, Bähr’s Rule & Corresponding Squares',
      'Tactical Forcing Trees: Checks, Captures, Threats & Sacrificial Combinations',
      'Knight’s Tour Hamiltonian Paths & N-Queens Independence Domination Problems',
    ],
    competitions: ['Inter-Cantonment College Chess Championship', 'ACC Rapid Rating Ladder', 'National College Team Chess'],
    weeklySchedule: 'Saturdays & Wednesdays · 2:00 PM – 4:00 PM · Student Lounge',
    leadCoordinator: 'Rafiul Islam (FIDE Rated 1890 · ACC Chess Captain)',
    formulaSignature: 'V(s) = max_a min_b Eval(s″)   [Zero-Sum Tree]',
    challengePrompt:
      'On a standard 8×8 chessboard, what is the maximum number of non-attacking rooks that can be placed simultaneously?',
    challengeHint: 'Each row and each column can contain at most one rook.',
    challengeAnswer: '8',
    colSpan: 'normal',
  },
  {
    id: 'sudoku',
    index: '08',
    name: 'Sudoku',
    subtitle: 'Latin Square Combinatorics, Exact Cover & Advanced Constraint Propagation',
    summary:
      'High-speed logical solving of classic 9x9, Killer, Thermo, and Arrow Sudoku using X-Wing, Swordfish, and Set Equivalence Theory.',
    detailedDescription:
      'Far beyond trial-and-error guessing, ACCMC’s Sudoku & Logic Grid division studies 9×9 grids as structured Latin squares with 3×3 block constraints (totaling 6.67 × 10²¹ valid grids). Members master bifurcation-free deduction chains, Phistomefel’s ring theorem, and variant arithmetic constraints.',
    corePillars: [
      'Hidden/Naked Subsets, Pointing Pairs & Box-Line Reduction Mechanics',
      'Single-Digit Fish Patterns: X-Wing, Swordfish, Jellyfish & Skyscraper Chains',
      'Phistomefel’s Theorem & Set Equivalence Theory (SET) in Variant Grids',
      'Killer Cage Partition Combinatorics, Thermo Monotonicity & Arrow Sums',
    ],
    competitions: ['National Sudoku Championship', 'World Puzzle Federation (WPF) GP Qualifiers', 'ACCMC Grid Masters'],
    weeklySchedule: 'Mondays · 3:15 PM – 4:15 PM · Room 304',
    leadCoordinator: 'Adib Mahmud (National Logic & Sudoku Champion)',
    formulaSignature: 'Σ k = 45,   N_grids = 6.67 × 10^21',
    challengePrompt:
      'In a standard 9×9 Sudoku or Killer Sudoku, what is the exact sum of all nine digits in any single row, column, or 3×3 box?',
    challengeHint: 'Compute 1 + 2 + 3 + ... + 9 = 9 × 10 / 2.',
    challengeAnswer: '45',
    colSpan: 'normal',
  },
];

export const PDF_RESOURCES: PdfResource[] = [
  {
    id: 'res-olympiad-nt',
    title: 'Olympiad Number Theory: Modular Arithmetic, LTE & Diophantine Proofs',
    topic: 'Math Olympiad',
    segmentId: 'math-olympiad',
    author: 'ACCMC Olympiad Academic Wing',
    edition: '2026 Revised Compendium',
    pages: 48,
    fileSize: '2.4 MB',
    fileName: 'ACCMC_Olympiad_Number_Theory_Compendium_2026.pdf',
    difficulty: 'Olympiad Advanced',
    abstract:
      'Complete lecture monograph covering divisibility invariants, Bezout’s identity, Euler-Fermat theorem, Lifting the Exponent Lemma (LTE), and quadratic residues with 65 worked BdMO and IMO Shortlist solutions.',
    keyTheorems: [
      'Bézout’s Identity & Extended Euclidean Algorithm',
      'Euler’s Totient Theorem & Wilson’s Prime Criterion',
      'Lifting The Exponent Lemma (LTE) for p-adic Valuations',
      'Chinese Remainder Theorem (CRT) System Construction',
    ],
    pdfSections: [
      {
        heading: 'Section 1. Modular Congruences & Bezout Invariants',
        formula: 'a·x + b·y = gcd(a, b)  <=>  a·x ≡ gcd(a, b) (mod b)',
        body: 'Two integers a and b are coprime if and only if there exist integers x, y such that ax + by = 1. In Olympiad Diophantine problems, reducing modulo a carefully selected prime p eliminates infinite families of solutions.',
        workedProblem:
          'Problem 1.1 (BdMO National Archive): Find all positive integers n such that 2^n + 1 is divisible by n^2.',
        solutionSummary:
          'Let p be the smallest prime factor of n. By considering the multiplicative order of 2 modulo p, we deduce p = 3. Applying Lifting the Exponent Lemma v_3(2^n + 1) = v_3(n) + 1 forces n = 3 as the unique solution.',
      },
      {
        heading: 'Section 2. Lifting The Exponent Lemma (LTE)',
        formula: 'v_p(x^n - y^n) = v_p(x - y) + v_p(n)   (for odd prime p | x - y)',
        body: 'LTE provides exact control over the highest power of a prime p dividing exponential expressions x^n ± y^n, bypassing messy binomial expansions.',
        workedProblem:
          'Problem 2.1: Determine the highest power of 7 dividing 15^343 - 1.',
        solutionSummary:
          'Since 7 divides 15 - 1 = 14 and 7 is odd, v_7(15^343 - 1) = v_7(14) + v_7(343) = 1 + 3 = 4. Thus 7^4 = 2401 is the exact power.',
      },
    ],
  },
  {
    id: 'res-olympiad-comb-geo',
    title: 'Synthetic Geometry & Extremal Combinatorics Handbook',
    topic: 'Math Olympiad',
    segmentId: 'math-olympiad',
    author: 'Tahmid Hasan & Faculty Moderators',
    edition: '4th Edition · 2026',
    pages: 64,
    fileSize: '3.1 MB',
    fileName: 'ACCMC_Geometry_And_Combinatorics_Handbook.pdf',
    difficulty: 'Olympiad Advanced',
    abstract:
      'Dual-track training manual uniting power of a point, radical axes, and harmonic bundles in synthetic geometry with bijective counting, invariants, and Turán-type extremal graph theory.',
    keyTheorems: [
      'Power of a Point & Radical Axis Concurrency Theorem',
      'Miquel’s Six-Circle Configuration & Spiral Similarity',
      'Double Counting (Fubini’s Discrete Principle) & Monovariants',
      'Hall’s Marriage Theorem & Extremal Graph Bounds',
    ],
    pdfSections: [
      {
        heading: 'Section 1. Power of a Point & Radical Center',
        formula: 'Pow_ω(P) = OP² - R² = PA · PB',
        body: 'For any three circles with non-collinear centers, the three pairwise radical axes concur at a single point called the Radical Center. This converts collinearity proofs into algebraic power equalities.',
        workedProblem:
          'Problem 1.4: Prove that the three common chords of three pairwise intersecting circles are concurrent.',
        solutionSummary:
          'Each common chord lies on the radical axis of its respective pair of circles. At the intersection of two radical axes, the powers with respect to all three circles are equal, forcing the third radical axis to pass through the same point.',
      },
      {
        heading: 'Section 2. Invariants & Monovariants in Combinatorial Processes',
        formula: 'I(S_{t+1}) ≡ I(S_t) (mod k)',
        body: 'When a combinatorial game or algorithm modifies a state step-by-step, identifying a quantity that remains constant (invariant) or strictly decreases (monovariant) immediately determines reachability and termination.',
        workedProblem:
          'Problem 2.3: Numbers 1 through 2026 are written on a board. Each step replaces a, b with |a - b|. Can the final number be 0?',
        solutionSummary:
          'Notice that |a - b| ≡ a + b (mod 2). Therefore the parity of the sum of all numbers on the board is invariant. Since 1 + 2 + ... + 2026 = 2026 × 2027 / 2 is odd, the final number must be odd and cannot be 0.',
      },
    ],
  },
  {
    id: 'res-iq-case-workbook',
    title: 'IQ Matrices, Quantitative Case Modeling & Game Theory Playbook',
    topic: 'IQ & Case Solving',
    segmentId: 'case-solving',
    author: 'Nafisa Anjum & Farhan Sadik',
    edition: '2026 Tournament Edition',
    pages: 38,
    fileSize: '1.9 MB',
    fileName: 'ACCMC_IQ_And_Case_Solving_Playbook.pdf',
    difficulty: 'Intermediate',
    abstract:
      'Structured analytical frameworks for solving STEM and actuarial case competitions alongside high-speed spatial-logical matrix drills and Bayesian decision trees.',
    keyTheorems: [
      'Expected Value of Perfect Information (EVPI) & Bayesian Updating',
      'Two-Player Zero-Sum Mixed Strategy Nash Equilibrium',
      'Linear Programming Dual Shadow Price Interpretation',
      'Affine Visual-Spatial Matrix Operators (XOR, Rotation, Parity)',
    ],
    pdfSections: [
      {
        heading: 'Section 1. Quantitative Decision Trees & EVPI',
        formula: 'EVPI = E[max_a U(a, θ)] - max_a E[U(a, θ)]',
        body: 'In case competitions involving capital allocation under uncertainty, EVPI establishes the strict upper bound on how much a decision-maker should pay for market research or sensor testing.',
        workedProblem:
          'Case Study 1: Dhaka Metro Feeder Bus Allocation under Peak Demand Variance.',
        solutionSummary:
          'By modeling passenger arrivals as a Poisson process with rate λ = 42/min and imposing a 95% service-level constraint, the optimal fleet dispatch shifts 18% of idle midday capacity to the Mirpur-Cantonment corridor.',
      },
    ],
  },
  {
    id: 'res-crypto-handbook',
    title: 'Applied Number Theory in Cryptography: Ciphers, RSA & CTF Guide',
    topic: 'Cryptography',
    segmentId: 'cryptography',
    author: 'Zahin Abrar · ACCMC Crypto Lab',
    edition: '2026 Edition',
    pages: 44,
    fileSize: '2.2 MB',
    fileName: 'ACCMC_Cryptography_And_Cryptanalysis_Guide.pdf',
    difficulty: 'Intermediate',
    abstract:
      'From Vigenère Kasiski attacks and Hill cipher linear algebra over Z/26Z to RSA public-key encryption, Diffie-Hellman discrete logs, and practical CTF cipher-breaking scripts.',
    keyTheorems: [
      'Friedman’s Index of Coincidence (IoC) for Key-Length Detection',
      'Invertibility of Hill Cipher Matrices mod 26: gcd(det K, 26) = 1',
      'RSA Correctness via Euler-Fermat & Chinese Remainder Theorem',
      'Fermat Factorization & Wiener’s Low Private Exponent Attack',
    ],
    pdfSections: [
      {
        heading: 'Section 1. Index of Coincidence & Polyalphabetic Cryptanalysis',
        formula: 'IoC = Σ f_i (f_i - 1) / [N (N - 1)]',
        body: 'Whereas English plaintext exhibits an Index of Coincidence near 0.0667, a uniform random polyalphabetic cipher drops near 0.0385. Measuring IoC across stride intervals immediately reveals the secret key length.',
        workedProblem:
          'Problem 1.2: Decrypt a ciphertext intercepted with IoC spikes at period k = 5.',
        solutionSummary:
          'Partitioning the ciphertext into 5 cosets reduces the Vigenère cipher to 5 independent Caesar shifts, solved rapidly via chi-squared frequency matching against standard English letter probabilities.',
      },
    ],
  },
  {
    id: 'res-cube-group-theory',
    title: 'The Mathematics of the Rubik’s Cube: CFOP Algorithms & Group Theory',
    topic: 'Rubik’s Cube & Group Theory',
    segmentId: 'rubiks-cube',
    author: 'Samin Yasar · ACCMC Speedcubing Wing',
    edition: '2026 Speed & Algebra Edition',
    pages: 52,
    fileSize: '2.8 MB',
    fileName: 'ACCMC_Rubiks_Cube_CFOP_And_Group_Theory.pdf',
    difficulty: 'Foundation',
    abstract:
      'Complete 57 OLL and 21 PLL ergonomically fingertricked algorithm sheets paired with a rigorous algebraic proof of the Fundamental Theorem of Cubology and 3BLD commutator construction.',
    keyTheorems: [
      'Fundamental Theorem of Cubology (Solvability Invariants)',
      'Commutator [X, Y] = X Y X⁻¹ Y⁻¹ 3-Cycle Isolation',
      'Conjugate Setup Moves Z [X, Y] Z⁻¹ for Blindfolded Solving',
      '2-Look & 1-Look OLL/PLL Probability Recognition Matrices',
    ],
    pdfSections: [
      {
        heading: 'Section 1. Solvability Invariants of the 3×3×3 Cube Group',
        formula: 'sgn(σ)·sgn(τ) = 1,   Σ x_i ≡ 0 (mod 3),   Σ y_j ≡ 0 (mod 2)',
        body: 'A reassembled Rubik’s Cube state is reachable by legal face turns if and only if corner and edge permutation parities match, total corner orientation sum is divisible by 3, and total edge flip sum is even.',
        workedProblem:
          'Problem 1.1: Why is it impossible to swap a single pair of edges while leaving all other pieces solved?',
        solutionSummary:
          'Every quarter turn of a face induces a 4-cycle of corners (odd permutation) and a 4-cycle of edges (odd permutation). Thus the product of corner sign and edge sign is always +1; a single 2-cycle of edges has sign -1.',
      },
    ],
  },
  {
    id: 'res-equational-arts',
    title: 'Equational Arts Studio: Parametric Curves, Polar Roses & Fourier Drawing',
    topic: 'Equational Arts',
    segmentId: 'equational-arts',
    author: 'Meherin Bushra · ACCMC Visual Math Studio',
    edition: '2026 Exhibition Manual',
    pages: 34,
    fileSize: '2.6 MB',
    fileName: 'ACCMC_Equational_Arts_Parametric_Manual.pdf',
    difficulty: 'Foundation',
    abstract:
      'Step-by-step guide to creating award-winning mathematical art in Desmos and GeoGebra using parametric curves, implicit shading inequalities, transformations, and harmonic epicycles.',
    keyTheorems: [
      'Lissajous Phase-Frequency Symmetry & Closed Orbit Rationality',
      'Hypotrochoid & Epitrochoid Spirograph Parametric Equations',
      'Implicit Boolean Blending: max(f(x,y), g(x,y)) <= 0',
      'Complex Fourier Series Epicycle Decomposition',
    ],
    pdfSections: [
      {
        heading: 'Section 1. Parametric Curves & Domain Masking',
        formula: 'r(θ) = a·cos(kθ) + b·sin(mθ)',
        body: 'By combining polar harmonic terms with implicit inequality masks {f(x, y) <= 0}, complex organic silhouettes and architectural motifs can be rendered purely from closed-form analytic expressions.',
        workedProblem:
          'Studio Exercise 1: Construct a rotated elliptical petal ring around the origin using a single family of indexed equations.',
        solutionSummary:
          'Using the rotation matrix R(2πk/n) applied to ((x - x_0)/a)^2 + (y/b)^2 <= 1 for k = 1..n generates n symmetric petals with one parameter list.',
      },
    ],
  },
  {
    id: 'res-chess-sudoku-logic',
    title: 'Combinatorial Chess Endgames & Advanced Sudoku Constraint Logic',
    topic: 'Chess & Sudoku Logic',
    segmentId: 'sudoku',
    author: 'Rafiul Islam & Adib Mahmud',
    edition: '2026 Strategy Compendium',
    pages: 42,
    fileSize: '2.1 MB',
    fileName: 'ACCMC_Chess_And_Sudoku_Logic_Compendium.pdf',
    difficulty: 'Intermediate',
    abstract:
      'Uniting mathematical pawn endgame opposition, triangulation, and Zermelo game trees in Chess with X-Wing, Swordfish, Phistomefel’s ring theorem, and Killer cage combinatorics in Sudoku.',
    keyTheorems: [
      'Distant & Diagonal Opposition Parity on Bipartite Graphs',
      'Phistomefel’s Theorem: 16-Cell Corner Ring Equivalence in 9×9 Sudoku',
      'Single-Digit Fish (X-Wing & Swordfish) Elimination Rules',
      'Unique Sum Partitions in Killer Sudoku Cages',
    ],
    pdfSections: [
      {
        heading: 'Section 1. Phistomefel’s Theorem in 9×9 Sudoku Grids',
        formula: 'Multiset(Four 2×2 Corners) = Multiset(Central 16-Cell Box-5 Ring)',
        body: 'In any valid 9×9 Sudoku grid, the multiset of 16 digits occupying the four 2×2 corner squares is identical to the multiset of 16 digits forming the perimeter ring around the central 3×3 box.',
        workedProblem:
          'Puzzle 1.3: If the four 2×2 corners contain three 9s and no 4s, what can be deduced about the 16-cell ring surrounding Box 5?',
        solutionSummary:
          'By Phistomefel’s Theorem, the central 16-cell ring must also contain exactly three 9s and zero 4s, immediately placing all 4s inside Box 5 and the outer middle edges.',
      },
    ],
  },
];

export const ACHIEVEMENTS_DATA: AchievementRecord[] = [
  {
    id: 'ach-1',
    year: 2026,
    title: 'National Champions & 6 National Camp Invitations',
    event: '24th Bangladesh Mathematical Olympiad (BdMO) National Finale',
    category: 'Olympiad',
    medalOrRank: '4 Champions · 9 National Winners',
    recipients: 'Tahmid Hasan, Ayman Sadiq, Nabil Rahman & ACCMC Olympiad Squad',
    quantifiedMetric: '13 National Medals · Top College Contingent in Dhaka North',
    summary:
      'Adamjee Cantonment College secured the highest number of Higher Secondary category national medals among all cantonment colleges, with 6 members invited to the National Math Camp.',
  },
  {
    id: 'ach-2',
    year: 2026,
    title: 'Overall Championship Trophy — Inter-Cantonment Math & Logic Fest',
    event: 'All-Cantonment Inter-College Mathematics & IQ Carnival',
    category: 'Puzzle & Cube',
    medalOrRank: '1st Place Overall · 14 Gold Medals',
    recipients: 'ACCMC 28-Member Delegation across Olympiad, IQ, Cube & Sudoku',
    quantifiedMetric: '14 Gold · 8 Silver · 6 Bronze across 8 Segments',
    summary:
      'Swept first place in Team Math Relay, Speed IQ Matrix Sprint, 3x3 Speedcubing Relay (31.4s team average), and Variant Sudoku Masters.',
  },
  {
    id: 'ach-3',
    year: 2025,
    title: '1st Runner-Up & Best Quantitative Model Award',
    event: 'National STEM & Actuarial Case Solving Championship',
    category: 'Case & Cryptanalysis',
    medalOrRank: 'National 1st Runner-Up',
    recipients: 'Team Eigenvalue (Nafisa Anjum, Zahin Abrar, Mahir Labib)',
    quantifiedMetric: '96.4 / 100 Jury Rubric Score among 110 Teams',
    summary:
      'Constructed a stochastic Markov queueing model and linear programming dispatch schedule for Dhaka urban transit optimization.',
  },
  {
    id: 'ach-4',
    year: 2025,
    title: 'Champion — National College Cryptanalysis & Cipher CTF',
    event: 'Bangladesh Youth Cryptography & Number Theory Challenge',
    category: 'Case & Cryptanalysis',
    medalOrRank: '1st Place (Gold)',
    recipients: 'Zahin Abrar & ACCMC Cipher Division',
    quantifiedMetric: 'Solved 18 / 18 Cryptographic Challenges in 3h 12m',
    summary:
      'Successfully factored weakened RSA moduli via Wiener’s continued-fraction attack and broke polyalphabetic Hill ciphers in record time.',
  },
  {
    id: 'ach-5',
    year: 2025,
    title: 'Team Gold & Board 1 Prize — Inter-College Rapid Chess',
    event: 'Dhaka Metropolis Inter-College Chess Championship',
    category: 'Chess & Strategy',
    medalOrRank: 'Undefeated Team Champions (7.0 / 7.0 Match Points)',
    recipients: 'Rafiul Islam (Board 1), Tanvir Ahmed, Shayan Karim, Abrar Hossain',
    quantifiedMetric: '24.5 / 28 Individual Board Points',
    summary:
      'Dominated the 7-round Swiss rapid tournament with zero match losses and a clinical rook-and-pawn endgame conversion in the final round.',
  },
  {
    id: 'ach-6',
    year: 2025,
    title: 'Global Finalist Recognition — International Math Graphing Art Showcase',
    event: 'International Parametric & Desmos Equational Art Exhibition',
    category: 'Puzzle & Cube',
    medalOrRank: 'Global Top 20 Finalist (Ages 17–18)',
    recipients: 'Meherin Bushra (Head of Equational Arts)',
    quantifiedMetric: '312 Implicit & Parametric Equations Rendered at 60 FPS',
    summary:
      'Recreated the architectural facade of Curzon Hall and geometric Islamic star tessellations using purely trigonometric Fourier splines.',
  },
];

export const SESSION_PLANS: SessionPlanItem[] = [
  {
    id: 'sess-w1',
    week: 'Week 01',
    dateRange: 'Nov 01 – Nov 05, 2026',
    title: 'Modular Arithmetic, Bezout’s Identity & Diophantine Reductions',
    segment: 'Math Olympiad',
    segmentId: 'math-olympiad',
    level: 'Foundation',
    venue: 'Room 304 · Main Academic Block',
    instructor: 'Tahmid Hasan',
    duration: '105 mins',
    objectives: [
      'Construct linear combinations ax + by = gcd(a, b) via the Extended Euclidean Algorithm',
      'Apply Euler’s Totient Theorem and Fermat’s Little Theorem to Olympiad divisibility proofs',
      'Solve 8 past BdMO Regional & National modular congruence problems under timed conditions',
    ],
    deliverable: 'Problem Set 01 (12 Proof Problems + Peer Grading Rubric)',
    attachedResourceId: 'res-olympiad-nt',
  },
  {
    id: 'sess-w2',
    week: 'Week 02',
    dateRange: 'Nov 08 – Nov 12, 2026',
    title: 'Affine Matrix Rotations, Finite Differences & High-Speed IQ Batteries',
    segment: 'IQ Solving',
    segmentId: 'iq-solving',
    level: 'Foundation',
    venue: 'Room 305 · Main Academic Block',
    instructor: 'Farhan Sadik',
    duration: '75 mins',
    objectives: [
      'Deconstruct 3×3 Raven’s Progressive Matrices into XOR overlays and rotation invariants',
      'Solve recursive number series using 2nd and 3rd order difference tables in under 25 seconds',
      'Complete a 40-question simulated ISSB & Inter-Cantonment speed diagnostic',
    ],
    deliverable: 'Timed 40-Item Spatial & Numerical Diagnostic Sheet',
    attachedResourceId: 'res-iq-case-workbook',
  },
  {
    id: 'sess-w3',
    week: 'Week 03',
    dateRange: 'Nov 15 – Nov 19, 2026',
    title: 'Linear Programming, Bayesian Trees & Quantitative Case Structuring',
    segment: 'Case Solving',
    segmentId: 'case-solving',
    level: 'Intermediate',
    venue: 'Seminar Hall B',
    instructor: 'Nafisa Anjum',
    duration: '90 mins',
    objectives: [
      'Translate ambiguous real-world resource constraints into linear objective functions',
      'Calculate Expected Value of Perfect Information (EVPI) on multi-stage decision trees',
      'Present a 5-slide quantitative executive defense with sensitivity bounds',
    ],
    deliverable: 'Team Case Brief: Urban Grid Peak-Load Optimization',
    attachedResourceId: 'res-iq-case-workbook',
  },
  {
    id: 'sess-w4',
    week: 'Week 04',
    dateRange: 'Nov 22 – Nov 26, 2026',
    title: 'Polyalphabetic Cryptanalysis, Hill Ciphers & RSA Key Exchange Lab',
    segment: 'Cryptography',
    segmentId: 'cryptography',
    level: 'Intermediate',
    venue: 'Computer Lab 2',
    instructor: 'Zahin Abrar',
    duration: '90 mins',
    objectives: [
      'Compute Friedman’s Index of Coincidence to recover unknown Vigenère key lengths',
      'Invert 2×2 and 3×3 encryption matrices modulo 26 for Hill cipher decryption',
      'Generate RSA keypairs from prime pairs (p, q) and test low-exponent vulnerabilities',
    ],
    deliverable: 'Live CTF Cipher Packet (6 Progressive Decryptions)',
    attachedResourceId: 'res-crypto-handbook',
  },
  {
    id: 'sess-w5',
    week: 'Week 05',
    dateRange: 'Nov 29 – Dec 03, 2026',
    title: 'CFOP Lookahead Optimization, PLL Recognition & 3-Cycle Commutators',
    segment: "Rubik's Cube",
    segmentId: 'rubiks-cube',
    level: 'Foundation',
    venue: 'Room 304 · WCA Timer Station',
    instructor: 'Samin Yasar',
    duration: '75 mins',
    objectives: [
      'Eliminate F2L pauses through multi-slot tracking and rotationless back-slot insertions',
      'Master 2-sided PLL recognition and high-TPS fingertricks for G-perms and N-perms',
      'Derive pure 3-corner commutators [A, B] = A B A⁻¹ B⁻¹ for 3×3 Blindfolded solving',
    ],
    deliverable: 'Official WCA Stackmat Ao12 Benchmark & Algorithm Drill Sheet',
    attachedResourceId: 'res-cube-group-theory',
  },
  {
    id: 'sess-w6',
    week: 'Week 06',
    dateRange: 'Dec 06 – Dec 10, 2026',
    title: 'Parametric Harmonics, Implicit Shading & Desmos Art Composition',
    segment: 'Equational Arts',
    segmentId: 'equational-arts',
    level: 'Foundation',
    venue: 'Digital Design Lab',
    instructor: 'Meherin Bushra',
    duration: '75 mins',
    objectives: [
      'Plot Lissajous curves, hypotrochoids, and polar rhodonea roses with phase sliders',
      'Clip complex geometric regions using piecewise implicit domain masks',
      'Compose an original 50-equation architectural or botanical artwork for the club gallery',
    ],
    deliverable: 'Interactive Parametric Graph Submission',
    attachedResourceId: 'res-equational-arts',
  },
  {
    id: 'sess-w7',
    week: 'Week 07',
    dateRange: 'Dec 13 – Dec 17, 2026',
    title: 'Pawn Endgame Geometry, Opposition Parity & Tactical Tree Calculation',
    segment: 'Chess',
    segmentId: 'chess',
    level: 'Intermediate',
    venue: 'Student Lounge · Chess Arena',
    instructor: 'Rafiul Islam',
    duration: '120 mins',
    objectives: [
      'Apply the Rule of the Square, key squares, and distant opposition in King + Pawn endgames',
      'Map corresponding squares and triangulation on asymmetrical pawn structures',
      'Compete in a 5-round 10+5 Rapid Swiss club ladder with post-game engine & algebraic review',
    ],
    deliverable: 'Annotated Endgame Study Sheet & Club Ladder Rating Update',
    attachedResourceId: 'res-chess-sudoku-logic',
  },
  {
    id: 'sess-w8',
    week: 'Week 08',
    dateRange: 'Dec 20 – Dec 24, 2026',
    title: 'Single-Digit Fish (X-Wing / Swordfish), Phistomefel’s Ring & Killer Sudoku',
    segment: 'Sudoku',
    segmentId: 'sudoku',
    level: 'Advanced Camp',
    venue: 'Room 304 · Main Academic Block',
    instructor: 'Adib Mahmud',
    duration: '75 mins',
    objectives: [
      'Spot X-Wing, Swordfish, and Skyscraper candidate eliminations without guessing',
      'Apply Phistomefel’s 16-cell corner-ring equivalence theorem to break diabolical grids',
      'Master unique cage-sum partition tables in Killer and Arrow Sudoku variants',
    ],
    deliverable: 'Championship Pack: 6 Classic & Variant Grids',
    attachedResourceId: 'res-chess-sudoku-logic',
  },
];

export const EXECUTIVES_DATA: ExecutiveMember[] = [
  {
    id: 'exec-1',
    name: 'Prof. Md. Lutfor Rahman',
    role: 'Moderator',
    wing: 'Advisory & Core',
    batch: 'MN',
    department: 'Department of Mathematics, ACC',
    specialization: 'Real Analysis, Differential Equations & Olympiad Mentorship',
    achievementHighlight: 'Chief Faculty Moderator · National BdMO Mentor',
    email: 'moderator.mathclub@acc.edu.bd',
  },
  {
    id: 'exec-2',
    name: 'Tahmid Hasan',
    role: 'President',
    wing: 'Advisory & Core',
    batch: 'PN',
    department: 'HSC Batch 2026 · Science',
    specialization: 'Olympiad Number Theory & Projective Geometry',
    achievementHighlight: '2× BdMO National Champion · National Math Camp Finalist',
    email: 'president.accmc@acc.edu.bd',
  },
  {
    id: 'exec-3',
    name: 'Zahin Abrar',
    role: 'Vice President',
    wing: 'Olympiad & Research Wing',
    batch: 'VP',
    department: 'HSC Batch 2026 · Science',
    specialization: 'Algebraic Number Theory, RSA Cryptanalysis & Functional Equations',
    achievementHighlight: 'National Youth Cryptography CTF Gold Medalist',
    email: 'vp.olympiad@acc.edu.bd',
  },
  {
    id: 'exec-4',
    name: 'Nafisa Anjum',
    role: 'General Secretary',
    wing: 'Advisory & Core',
    batch: 'GS',
    department: 'HSC Batch 2026 · Science',
    specialization: 'Quantitative Case Modeling, Operations Research & Combinatorics',
    achievementHighlight: 'National STEM Case Championship 1st Runner-Up',
    email: 'gs.accmc@acc.edu.bd',
  },
  {
    id: 'exec-5',
    name: 'Farhan Sadik',
    role: 'Joint Secretary',
    wing: 'Logic, Cube & Strategy Wing',
    batch: 'JS',
    department: 'HSC Batch 2026 · Science',
    specialization: 'Algorithmic Sequence Analysis, IQ Matrices & Speed Drills',
    achievementHighlight: 'Inter-Cantonment IQ Olympiad Gold Medalist',
    email: 'js.accmc@acc.edu.bd',
  },
  {
    id: 'exec-6',
    name: 'Samin Yasar',
    role: 'Treasurer',
    wing: 'Logic, Cube & Strategy Wing',
    batch: 'TN',
    department: 'HSC Batch 2026 · Science',
    specialization: '3×3 CFOP Speedcubing, 3BLD Commutators & WCA Event Direction',
    achievementHighlight: '9.14s Official WCA 3×3 Single · Inter-College Cube Champion',
    email: 'treasurer.accmc@acc.edu.bd',
  },
  {
    id: 'exec-7',
    name: 'Rafiul Islam',
    role: 'Organizing Secretary',
    wing: 'Logic, Cube & Strategy Wing',
    batch: 'OS',
    department: 'HSC Batch 2026 · Science',
    specialization: 'Combinatorial Chess Endgames, Sudoku Logic & Fest Operations',
    achievementHighlight: 'FIDE Rapid 1890 · Dhaka Inter-College Board 1 Gold',
    email: 'organizing.accmc@acc.edu.bd',
  },
  {
    id: 'exec-8',
    name: 'Meherin Bushra',
    role: 'Publicity Secretary',
    wing: 'Operations & Publications',
    batch: 'PS',
    department: 'HSC Batch 2026 · Science',
    specialization: 'Equational Arts, Parametric Curves & Chief Editor of “The Axiom”',
    achievementHighlight: 'International Desmos Math Art Global Top 20 Finalist',
    email: 'publicity.accmc@acc.edu.bd',
  },
];

export const SOCIAL_CHANNELS: SocialChannel[] = [
  {
    id: 'soc-fb-page',
    platform: 'Facebook Page',
    handle: '@ACCMathClub.Official',
    url: 'https://www.facebook.com',
    memberCount: '18,400+ Followers',
    description: 'News, events and announcements from Adamjee Cantonment College Mathematics Club.',
    cadence: 'Daily Updates',
  },
  {
    id: 'soc-wa-group',
    platform: 'WhatsApp Group',
    handle: 'ACCMC Official Notice & Solver Hub',
    url: 'https://chat.whatsapp.com',
    memberCount: '1,200+ Active Members',
    description: 'Chat with members and get quick updates on weekly sessions, rooms, and olympiads.',
    cadence: 'Instant Notices',
  },
  {
    id: 'soc-ig-page',
    platform: 'Instagram Page',
    handle: '@accmc.official',
    url: 'https://www.instagram.com',
    memberCount: '6,800+ Followers',
    description: 'Photos and highlights from our events, ACC Math Fest, and Equational Arts showcases.',
    cadence: 'Event Reels & Visuals',
  },
  {
    id: 'soc-ig-group',
    platform: 'Instagram Group',
    handle: 'ACCMC Solvers Broadcast & Group Chat',
    url: 'https://www.instagram.com',
    memberCount: '950+ Student Solvers',
    description: 'Our members’ group chat on Instagram for daily math riddles, cube scrambles, and chess links.',
    cadence: '24/7 Community Chat',
  },
];

