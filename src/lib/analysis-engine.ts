/* ============================================================
 * Skill Extraction & Analysis Engine
 * Pure heuristic — no external APIs, no scraping.
 * ============================================================ */

// --------------- Skill Keywords by Category ---------------

export const SKILL_CATEGORIES: Record<string, string[]> = {
  'Core CS': ['DSA', 'OOP', 'DBMS', 'OS', 'Networks'],
  'Languages': ['Java', 'Python', 'JavaScript', 'TypeScript', 'C', 'C++', 'C#', 'Go'],
  'Web': ['React', 'Next.js', 'Node.js', 'Express', 'REST', 'GraphQL'],
  'Data': ['SQL', 'MongoDB', 'PostgreSQL', 'MySQL', 'Redis'],
  'Cloud/DevOps': ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'CI/CD', 'Linux'],
  'Testing': ['Selenium', 'Cypress', 'Playwright', 'JUnit', 'PyTest'],
};

export interface ExtractedSkills {
  [category: string]: string[];
}

/**
 * Extract skills from JD text using case-insensitive keyword matching.
 * Uses word-boundary detection to avoid partial matches.
 */
export function extractSkills(jdText: string): ExtractedSkills {
  const text = jdText.toLowerCase();
  const result: ExtractedSkills = {};

  for (const [category, keywords] of Object.entries(SKILL_CATEGORIES)) {
    const matched: string[] = [];
    for (const keyword of keywords) {
      // Escape special regex chars in keyword
      const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      // Word-boundary match, case-insensitive
      const regex = new RegExp(`\\b${escaped}\\b`, 'i');
      if (regex.test(text)) {
        matched.push(keyword);
      }
    }
    if (matched.length > 0) {
      result[category] = matched;
    }
  }

  return result;
}

export function hasAnySkills(skills: ExtractedSkills): boolean {
  return Object.keys(skills).length > 0;
}

// --------------- Readiness Score ---------------

export function computeReadinessScore(
  skills: ExtractedSkills,
  company: string,
  role: string,
  jdText: string,
): number {
  let score = 35;
  const categoriesPresent = Object.keys(skills).length;
  score += Math.min(categoriesPresent * 5, 30);
  if (company.trim().length > 0) score += 10;
  if (role.trim().length > 0) score += 10;
  if (jdText.length > 800) score += 10;
  return Math.min(score, 100);
}

// --------------- Round-wise Checklist ---------------

export interface ChecklistRound {
  round: string;
  title: string;
  items: string[];
}

export function generateChecklist(skills: ExtractedSkills): ChecklistRound[] {
  const allSkills = Object.values(skills).flat();
  const has = (k: string) => allSkills.some((s) => s.toLowerCase() === k.toLowerCase());
  const hasCategory = (c: string) => !!skills[c];

  const round1: string[] = [
    'Practice quantitative aptitude (percentages, probability, permutations)',
    'Revise logical reasoning patterns',
    'Review verbal ability and reading comprehension',
    'Practice time management for aptitude rounds',
    'Solve 2 full-length aptitude mock tests',
  ];
  if (hasCategory('Core CS')) {
    round1.push('Revise OS basics: process scheduling, deadlocks, memory management');
    round1.push('Revise DBMS: normalization, ACID properties, SQL queries');
    round1.push('Review networking fundamentals: TCP/IP, HTTP, DNS');
  }

  const round2: string[] = [
    'Solve 50+ problems on arrays, strings, and hashing',
    'Practice linked lists, stacks, and queues',
    'Study tree and graph traversals (BFS, DFS)',
    'Practice dynamic programming (top-down and bottom-up)',
    'Review sorting algorithms and their complexities',
  ];
  if (has('DSA')) {
    round2.push('Practice advanced DSA: segment trees, tries, union-find');
    round2.push('Solve 10 medium/hard problems on a coding platform');
  }
  if (has('OOP')) {
    round2.push('Revise OOP principles: SOLID, design patterns, inheritance vs composition');
  }

  const round3: string[] = [
    'Prepare to explain 2 projects in depth (architecture, trade-offs)',
    'Be ready to discuss tech choices and alternatives',
    'Practice live coding with clear communication',
  ];
  if (hasCategory('Web')) {
    round3.push('Review frontend concepts: virtual DOM, state management, component lifecycle');
    if (has('React')) round3.push('Prepare React-specific: hooks, context, performance optimization');
    if (has('Node.js')) round3.push('Review Node.js event loop, middleware patterns, error handling');
    if (has('REST') || has('GraphQL')) round3.push('Explain REST vs GraphQL trade-offs with examples');
  }
  if (hasCategory('Data')) {
    round3.push('Review database design: indexing, query optimization, joins');
    if (has('SQL')) round3.push('Practice writing complex SQL queries (joins, subqueries, window functions)');
    if (has('MongoDB')) round3.push('Explain MongoDB schema design and aggregation pipeline');
  }
  if (hasCategory('Cloud/DevOps')) {
    round3.push('Explain your deployment pipeline and CI/CD setup');
    if (has('Docker')) round3.push('Be ready to explain Docker containers vs VMs, Dockerfile basics');
    if (has('AWS') || has('Azure') || has('GCP')) round3.push('Know core cloud services you have used and why');
  }
  if (hasCategory('Languages')) {
    const langs = skills['Languages'] || [];
    if (langs.length > 0) {
      round3.push(`Deep-dive into ${langs.join(', ')}: language-specific idioms and best practices`);
    }
  }
  if (hasCategory('Testing')) {
    round3.push('Explain your testing strategy: unit, integration, e2e');
  }

  const round4: string[] = [
    'Prepare your "Tell me about yourself" pitch (90 seconds)',
    'Practice behavioral questions using STAR method',
    'Prepare answers for: strengths, weaknesses, conflict resolution',
    'Research the company: products, culture, recent news',
    'Prepare 3 thoughtful questions to ask the interviewer',
    'Practice salary negotiation basics',
    'Review your resume for consistency and talking points',
  ];

  return [
    { round: 'Round 1', title: 'Aptitude & Basics', items: round1 },
    { round: 'Round 2', title: 'DSA & Core CS', items: round2 },
    { round: 'Round 3', title: 'Technical Interview (Projects + Stack)', items: round3 },
    { round: 'Round 4', title: 'Managerial / HR', items: round4 },
  ];
}

// --------------- 7-Day Plan ---------------

export interface DayPlan {
  day: string;
  label: string;
  tasks: string[];
}

export function generatePlan(skills: ExtractedSkills): DayPlan[] {
  const hasCategory = (c: string) => !!skills[c];
  const has = (k: string) => Object.values(skills).flat().some((s) => s.toLowerCase() === k.toLowerCase());

  const day1: string[] = [
    'Revise number systems, percentages, profit & loss',
    'Practice 20 aptitude questions',
    'Review basic data types and control structures',
  ];
  if (hasCategory('Core CS')) {
    day1.push('Revise OS: process management, threading, scheduling');
    day1.push('Review DBMS: ER diagrams, normalization, keys');
  }

  const day2: string[] = [
    'Revise networking: OSI model, TCP vs UDP, HTTP methods',
    'Practice logical reasoning (seating, puzzles, blood relations)',
    'Review OOP concepts: abstraction, encapsulation, polymorphism',
  ];
  if (hasCategory('Languages')) {
    const langs = (skills['Languages'] || []).slice(0, 2);
    day2.push(`Brush up on ${langs.join(' and ')} syntax and standard library`);
  }

  const day3: string[] = [
    'Solve 10 easy array and string problems',
    'Practice stack and queue problems',
    'Study time complexity analysis (Big-O)',
  ];
  if (has('DSA')) {
    day3.push('Solve 5 medium problems on hashing and two-pointers');
  }

  const day4: string[] = [
    'Practice tree problems: traversals, BST, LCA',
    'Solve 5 graph problems: BFS, DFS, shortest path',
    'Practice 3 dynamic programming problems',
  ];
  if (has('SQL')) {
    day4.push('Write 10 SQL queries: joins, group by, subqueries');
  }

  const day5: string[] = [
    'Prepare project walkthroughs (2 projects, 5 min each)',
    'Align resume bullet points with JD keywords',
    'Review system design basics: load balancing, caching, databases',
  ];
  if (has('React')) {
    day5.push('Revise React: hooks, state management, rendering optimization');
  }
  if (has('Node.js')) {
    day5.push('Revise Node.js: event loop, streams, middleware patterns');
  }
  if (hasCategory('Cloud/DevOps')) {
    day5.push('Review your deployment setup and explain it clearly');
  }

  const day6: string[] = [
    'Do 1 full mock interview (45 min, timed)',
    'Practice behavioral questions (STAR format)',
    'Prepare "Why this company?" and "Why this role?" answers',
  ];
  if (hasCategory('Testing')) {
    day6.push('Review testing concepts: unit vs integration vs e2e');
  }
  if (has('Docker') || has('Kubernetes')) {
    day6.push('Be ready to explain containerization and orchestration');
  }

  const day7: string[] = [
    'Revise weak areas identified during the week',
    'Do a quick aptitude mock (30 min)',
    'Re-read your resume and project notes',
    'Ensure all documents (resume, ID, certificates) are ready',
    'Get proper rest before the interview',
  ];

  return [
    { day: 'Day 1', label: 'Basics + Core CS (Part 1)', tasks: day1 },
    { day: 'Day 2', label: 'Basics + Core CS (Part 2)', tasks: day2 },
    { day: 'Day 3', label: 'DSA + Coding (Part 1)', tasks: day3 },
    { day: 'Day 4', label: 'DSA + Coding (Part 2)', tasks: day4 },
    { day: 'Day 5', label: 'Project + Resume Alignment', tasks: day5 },
    { day: 'Day 6', label: 'Mock Interview + Behavioral', tasks: day6 },
    { day: 'Day 7', label: 'Revision + Final Prep', tasks: day7 },
  ];
}

// --------------- Interview Questions ---------------

const QUESTION_BANK: Record<string, string[]> = {
  DSA: [
    'How would you optimize search in sorted data?',
    'Explain the difference between BFS and DFS with use cases.',
    'How do you detect a cycle in a linked list?',
    'What is the time complexity of merge sort and why?',
  ],
  OOP: [
    'Explain SOLID principles with real examples.',
    'What is the difference between composition and inheritance?',
    'How does polymorphism work at runtime?',
  ],
  DBMS: [
    'What is normalization? Explain up to 3NF.',
    'Explain ACID properties with a transaction example.',
  ],
  OS: [
    'Explain process vs thread and when to use each.',
    'What are deadlocks and how can they be prevented?',
  ],
  Networks: [
    'Explain the difference between TCP and UDP.',
    'What happens when you type a URL in a browser?',
  ],
  Java: [
    'Explain the Java memory model (heap vs stack).',
    'What are the differences between HashMap and ConcurrentHashMap?',
  ],
  Python: [
    'Explain Python\'s GIL and its impact on multithreading.',
    'What are decorators and how do you use them?',
  ],
  JavaScript: [
    'Explain closures with a practical example.',
    'What is the event loop in JavaScript?',
  ],
  TypeScript: [
    'What are generics in TypeScript and when would you use them?',
    'Explain the difference between interface and type.',
  ],
  React: [
    'Explain state management options in React.',
    'How does the virtual DOM work and why is it efficient?',
    'What are React hooks? Explain useEffect cleanup.',
  ],
  'Next.js': [
    'What is the difference between SSR, SSG, and ISR in Next.js?',
    'How does file-based routing work in Next.js?',
  ],
  'Node.js': [
    'Explain the Node.js event loop and non-blocking I/O.',
    'How do you handle errors in Express middleware?',
  ],
  SQL: [
    'Explain indexing and when it helps performance.',
    'Write a query to find the second highest salary.',
    'What are window functions? Give an example.',
  ],
  MongoDB: [
    'When would you choose MongoDB over a relational database?',
    'Explain the aggregation pipeline with an example.',
  ],
  PostgreSQL: [
    'What are the advantages of PostgreSQL over MySQL?',
    'Explain JSONB in PostgreSQL and when to use it.',
  ],
  Docker: [
    'What is the difference between a container and a VM?',
    'Explain multi-stage builds in Docker.',
  ],
  Kubernetes: [
    'What is a Pod in Kubernetes?',
    'Explain the difference between Deployment and StatefulSet.',
  ],
  AWS: [
    'Explain the difference between EC2, Lambda, and ECS.',
    'How would you design a scalable architecture on AWS?',
  ],
  REST: [
    'What are the key constraints of RESTful design?',
    'Explain idempotency in REST APIs.',
  ],
  GraphQL: [
    'What are the advantages of GraphQL over REST?',
    'Explain resolvers and schema stitching.',
  ],
  'CI/CD': [
    'Describe your ideal CI/CD pipeline.',
    'How do you handle rollbacks in a deployment?',
  ],
  Linux: [
    'Explain file permissions in Linux.',
    'How would you troubleshoot a high-CPU process?',
  ],
  Selenium: ['How do you handle dynamic elements in Selenium?'],
  Cypress: ['How does Cypress differ from Selenium in architecture?'],
  Playwright: ['What are the advantages of Playwright over Cypress?'],
  JUnit: ['How do you write parameterized tests in JUnit?'],
  PyTest: ['Explain fixtures in PyTest and how they help.'],
};

// Fallback generic questions
const GENERIC_QUESTIONS = [
  'Tell me about a challenging project you worked on.',
  'How do you approach debugging a complex issue?',
  'Explain a technical concept to a non-technical person.',
  'How do you prioritize tasks when working on multiple features?',
  'What is your approach to learning a new technology?',
];

export function generateQuestions(skills: ExtractedSkills): string[] {
  const allSkills = Object.values(skills).flat();
  const questions: string[] = [];

  for (const skill of allSkills) {
    const pool = QUESTION_BANK[skill];
    if (pool) {
      for (const q of pool) {
        if (!questions.includes(q)) {
          questions.push(q);
        }
        if (questions.length >= 10) return questions;
      }
    }
  }

  // Fill remaining with generic
  for (const q of GENERIC_QUESTIONS) {
    if (questions.length >= 10) break;
    if (!questions.includes(q)) {
      questions.push(q);
    }
  }

  return questions.slice(0, 10);
}

// --------------- Full Analysis Entry ---------------

export interface AnalysisEntry {
  id: string;
  createdAt: string;
  company: string;
  role: string;
  jdText: string;
  extractedSkills: ExtractedSkills;
  plan: DayPlan[];
  checklist: ChecklistRound[];
  questions: string[];
  readinessScore: number;
  skillConfidenceMap?: Record<string, 'know' | 'practice'>;
}

export function runAnalysis(company: string, role: string, jdText: string): AnalysisEntry {
  const extractedSkills = extractSkills(jdText);
  const readinessScore = computeReadinessScore(extractedSkills, company, role, jdText);
  const checklist = generateChecklist(extractedSkills);
  const plan = generatePlan(extractedSkills);
  const questions = generateQuestions(extractedSkills);
  
  // Initialize all skills to 'practice' by default
  const skillConfidenceMap: Record<string, 'know' | 'practice'> = {};
  Object.values(extractedSkills).flat().forEach(skill => {
    skillConfidenceMap[skill] = 'practice';
  });

  return {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    company,
    role,
    jdText,
    extractedSkills,
    plan,
    checklist,
    questions,
    readinessScore,
    skillConfidenceMap,
  };
}
