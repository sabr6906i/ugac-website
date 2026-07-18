const R = '/sss-resources/';

export const sessions = [
  {
    id: 'tsc-01',
    status: 'upcoming',
    course: 'MA 105',
    name: 'Calculus — Limits, Continuity & Differentiability',
    date: '2026-06-20',
    time: '18:00',
    duration: '2h',
    venue: 'Online (Zoom)',
    takers: [
      { name: 'Rahul Sharma', email: 'rahul.sharma@iitb.ac.in' },
      { name: 'Priya Patel', email: 'priya.patel@iitb.ac.in' },
    ],
    resources: [
      { label: 'Session Slides', type: 'PDF', url: `${R}ma105-limits-slides.pdf` },
      { label: 'Practice Problems', type: 'PDF', url: `${R}ma105-limits-problems.pdf` },
    ],
    tags: ['Calculus', 'MA 105', 'Revision'],
    desc: 'Comprehensive one-shot revision covering limits, continuity, differentiability, and key problem-solving techniques for MA 105 midsem.',
  },
  {
    id: 'tsc-02',
    status: 'upcoming',
    course: 'PH 107',
    name: 'Quantum Physics — Wave Functions & Operators',
    date: '2026-06-22',
    time: '18:00',
    duration: '2h',
    venue: 'Online (Zoom)',
    takers: [
      { name: 'Amit Verma', email: 'amit.verma@iitb.ac.in' },
    ],
    resources: [
      { label: 'Session Slides', type: 'PDF', url: `${R}ph107-quantum-slides.pdf` },
    ],
    tags: ['Quantum', 'PH 107', 'Wave Mechanics'],
    desc: 'One-shot on wave function interpretation, Schrödinger equation, operators, expectation values, and infinite potential well.',
  },
  {
    id: 'tsc-03',
    status: 'upcoming',
    course: 'CH 105',
    name: 'Organic Chemistry — Reaction Mechanisms',
    date: '2026-06-24',
    time: '19:00',
    duration: '1.5h',
    venue: 'Online (Zoom)',
    takers: [
      { name: 'Neha Gupta', email: 'neha.gupta@iitb.ac.in' },
      { name: 'Siddharth Nair', email: 'siddharth.nair@iitb.ac.in' },
    ],
    resources: [
      { label: 'Mechanism Cheatsheet', type: 'PDF', url: `${R}ch105-mechanisms.pdf` },
      { label: 'Problem Set', type: 'PDF', url: `${R}ch105-problems.pdf` },
    ],
    tags: ['Organic', 'CH 105', 'Mechanisms'],
    desc: 'Crash course on key organic reaction mechanisms: Sn1/Sn2, E1/E2, electrophilic addition, and problem-solving strategies.',
  },
  {
    id: 'tsc-04',
    status: 'upcoming',
    course: 'CS 101',
    name: 'Python & Data Structures',
    date: '2026-06-26',
    time: '18:00',
    duration: '2.5h',
    venue: 'Online (Zoom)',
    takers: [
      { name: 'Arjun Mehta', email: 'arjun.mehta@iitb.ac.in' },
    ],
    resources: [
      { label: 'Code Notebook', type: 'PDF', url: `${R}cs101-dsa-notebook.pdf` },
      { label: 'Practice Problems', type: 'PDF', url: `${R}cs101-problems.pdf` },
    ],
    tags: ['Python', 'CS 101', 'DSA'],
    desc: 'Intensive revision of Python fundamentals, lists, stacks, queues, trees, and common interview-style coding problems.',
  },
  {
    id: 'tsc-05',
    status: 'upcoming',
    course: 'MA 106',
    name: 'Linear Algebra — Vector Spaces & Matrices',
    date: '2026-06-28',
    time: '18:00',
    duration: '2h',
    venue: 'Online (Zoom)',
    takers: [
      { name: 'Rahul Sharma', email: 'rahul.sharma@iitb.ac.in' },
    ],
    resources: [
      { label: 'Formula Sheet', type: 'PDF', url: `${R}ma106-formula-sheet.pdf` },
      { label: 'Practice Problems', type: 'PDF', url: `${R}ma106-problems.pdf` },
    ],
    tags: ['Linear Algebra', 'MA 106', 'Matrices'],
    desc: 'One-shot covering vector spaces, linear transformations, eigenvalues, eigenvectors, diagonalisation, and key exam problems.',
  },
  {
    id: 'tsc-06',
    status: 'completed',
    course: 'MA 105',
    name: 'Calculus — Integration & Applications',
    date: '2026-05-30',
    time: '18:00',
    duration: '2h',
    venue: 'Online (Zoom)',
    takers: [
      { name: 'Priya Patel', email: 'priya.patel@iitb.ac.in' },
      { name: 'Rahul Sharma', email: 'rahul.sharma@iitb.ac.in' },
    ],
    resources: [
      { label: 'Session Slides', type: 'PDF', url: `${R}ma105-integration-slides.pdf` },
      { label: 'Practice Problems', type: 'PDF', url: `${R}ma105-integration-problems.pdf` },
      { label: 'Session Recording', type: 'Link', url: 'https://drive.google.com/...' },
    ],
    tags: ['Calculus', 'MA 105', 'Integration'],
    desc: 'Definite & indefinite integrals, substitution, integration by parts, area under curves, and differential equations intro.',
  },
  {
    id: 'tsc-07',
    status: 'completed',
    course: 'PH 107',
    name: 'Quantum Physics — Atomic Structure & Spectra',
    date: '2026-05-28',
    time: '18:00',
    duration: '2h',
    venue: 'Online (Zoom)',
    takers: [
      { name: 'Amit Verma', email: 'amit.verma@iitb.ac.in' },
    ],
    resources: [
      { label: 'Session Slides', type: 'PDF', url: `${R}ph107-atomic-slides.pdf` },
      { label: 'Problem Set', type: 'PDF', url: `${R}ph107-atomic-problems.pdf` },
    ],
    tags: ['Quantum', 'PH 107', 'Atomic'],
    desc: 'Hydrogen atom wave functions, angular momentum, spin, Pauli exclusion principle, and atomic spectra series.',
  },
  {
    id: 'tsc-08',
    status: 'completed',
    course: 'CH 105',
    name: 'Physical Chemistry — Thermodynamics',
    date: '2026-05-25',
    time: '19:00',
    duration: '1.5h',
    venue: 'Online (Zoom)',
    takers: [
      { name: 'Neha Gupta', email: 'neha.gupta@iitb.ac.in' },
    ],
    resources: [
      { label: 'Formula Sheet', type: 'PDF', url: `${R}ch105-thermo-formula.pdf` },
      { label: 'Problem Set', type: 'PDF', url: `${R}ch105-thermo-problems.pdf` },
    ],
    tags: ['Thermodynamics', 'CH 105', 'Physical'],
    desc: 'First & second laws, enthalpy, entropy, Gibbs free energy, and chemical equilibrium in one compact session.',
  },
  {
    id: 'tsc-09',
    status: 'completed',
    course: 'MA 106',
    name: 'Linear Algebra — Systems of Equations',
    date: '2026-05-22',
    time: '18:00',
    duration: '2h',
    venue: 'Online (Zoom)',
    takers: [
      { name: 'Rahul Sharma', email: 'rahul.sharma@iitb.ac.in' },
      { name: 'Siddharth Nair', email: 'siddharth.nair@iitb.ac.in' },
    ],
    resources: [
      { label: 'Session Slides', type: 'PDF', url: `${R}ma106-systems-slides.pdf` },
      { label: 'Practice Problems', type: 'PDF', url: `${R}ma106-systems-problems.pdf` },
      { label: 'Session Recording', type: 'Link', url: 'https://drive.google.com/...' },
    ],
    tags: ['Linear Algebra', 'MA 106', 'Systems'],
    desc: 'Gaussian elimination, row reduction, linear independence, basis, dimension, and rank-nullity theorem.',
  },
  {
    id: 'tsc-10',
    status: 'completed',
    course: 'CS 101',
    name: 'Intro to Python — Functions & Loops',
    date: '2026-05-20',
    time: '18:00',
    duration: '2h',
    venue: 'Online (Zoom)',
    takers: [
      { name: 'Arjun Mehta', email: 'arjun.mehta@iitb.ac.in' },
    ],
    resources: [
      { label: 'Code Notebook', type: 'PDF', url: `${R}cs101-intro-notebook.pdf` },
      { label: 'Exercises', type: 'PDF', url: `${R}cs101-exercises.pdf` },
    ],
    tags: ['Python', 'CS 101', 'Basics'],
    desc: 'Python basics — variables, conditionals, loops, functions, list comprehensions, and debugging techniques.',
  },
];

export const quickLinks = [
  { label: 'ResoBin — Academic Repository', href: 'https://resobin.gymkhana.iitb.ac.in', desc: '5000+ resources including lecture notes, past papers, and study guides.' },
  { label: 'TSC Resources — Coming Soon', href: '#', desc: 'Additional resources will be added here.' },
  { label: 'Learners\' Space', href: 'https://learnersspace.gymkhana.iitb.ac.in', desc: '44+ student-taught courses across data science, finance, consulting & design.' },
  { label: 'ExCeL Program', href: 'https://gymkhana.iitb.ac.in/ugac/excel', desc: 'Academic workshops for conceptual clarity and exam preparation.' },
  { label: 'Academic Calendar', href: 'https://www.iitb.ac.in/academic-calendar', desc: 'Official IIT Bombay academic calendar with all important dates.' },
];

export const contacts = [
  { label: 'SSS Email', value: 'isaa.sss.iitb@gmail.com', href: 'mailto:isaa.sss.iitb@gmail.com' },
  { label: 'UGAC General', value: 'gsecaaug@iitb.ac.in', href: 'mailto:gsecaaug@iitb.ac.in' },
  { label: 'Instagram', value: '@ugac.iitb', href: 'https://instagram.com/ugac.iitb' },
];

export function getSession(id) {
  return sessions.find(s => s.id === id);
}

export function getUpcoming() {
  return sessions.filter(s => s.status === 'upcoming');
}

export function getCompleted() {
  return sessions.filter(s => s.status === 'completed');
}
