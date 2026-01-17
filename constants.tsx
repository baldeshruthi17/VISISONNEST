
import { UserGoal } from './types';

export const BRANCHES = ["CSE/IT", "ECE/EEE", "Mechanical/Civil", "Others"];
export const YEARS = ["1st", "2nd", "3rd", "4th/Passed"];
export const TIERS = ["Tier 1 (IIT/NIT/IIIT/BITS)", "Tier 2 (Reputed State/Private)", "Tier 3 (Local/Affiliated)"];

export const TECH_DOMAINS = [
  "Web Development",
  "Data Science",
  "Android Development",
  "DevOps & Cloud",
  "Cyber Security",
  "AI / ML",
  "Blockchain",
  "Product Management"
];

export const GOVT_JOBS_INFERENCE_QUESTIONS = [
  {
    id: "sector",
    question: "Which government sector interests you the most?",
    options: [
      "Civil Services (IAS/IPS - UPSC)",
      "Technical Services (IES/ESE - Engineering Services)",
      "Public Sector Units (PSUs via GATE)",
      "Banking & Insurance (IBPS/SBI)",
      "Defense & Paramilitary (CDS/AFCAT)"
    ]
  },
  {
    id: "role_type",
    question: "What kind of role are you aiming for?",
    options: [
      "Administrative & Policy Making",
      "Core Technical Engineering",
      "Public Sector Management",
      "Financial & Operations",
      "Strategic & Security"
    ]
  },
  {
    id: "preparation",
    question: "How do you plan to manage your preparation?",
    options: [
      "Full-time coaching after B.Tech",
      "Self-study along with final year",
      "Online courses and test series",
      "Looking for a job first, then preparing"
    ]
  },
  {
    id: "backup",
    question: "What is your backup plan if the exam takes multiple attempts?",
    options: [
      "Private sector job in my branch",
      "Higher Studies (M.Tech/MBA)",
      "State-level government exams",
      "Teaching / Academia"
    ]
  }
];

export const HIGHER_STUDIES_INFERENCE_QUESTIONS = [
  {
    id: "focus",
    question: "What is your primary interest for higher studies?",
    options: [
      "Technical Specialization (M.Tech/M.S.)",
      "Management & Business (MBA/PGDM)",
      "Research & Academia (PhD Focus)",
      "Interdisciplinary (Design, Public Policy, etc.)",
      "Not sure yet"
    ]
  },
  {
    id: "location",
    question: "Where do you prefer to pursue your higher education?",
    options: [
      "India (IITs, IIMs, IISc, etc.)",
      "Abroad (USA, UK, Europe, etc.)",
      "Flexible - Based on Scholarships",
      "Flexible - Based on College Ranking"
    ]
  },
  {
    id: "exam",
    question: "Which competitive exams are you targeting?",
    options: [
      "GATE (Technical)",
      "CAT / GMAT (Management)",
      "GRE / TOEFL / IELTS (Study Abroad)",
      "UPSC / ESE (Combined study)",
      "None / Exploring"
    ]
  },
  {
    id: "timing",
    question: "When do you plan to start?",
    options: [
      "Immediately after B.Tech",
      "After 1-2 years of Work Experience",
      "After 3+ years of Work Experience",
      "Undecided"
    ]
  }
];

export const CSE_INFERENCE_QUESTIONS = [
  {
    id: "excitement",
    question: "What type of activity sounds MOST exciting to you?",
    options: [
      "Building websites or apps", 
      "Working with data, reports, or patterns", 
      "Automating systems or cloud tools", 
      "Finding bugs or security issues", 
      "Solving logical or coding problems", 
      "Not sure yet"
    ]
  },
  {
    id: "subject",
    question: "Which subject did you enjoy the MOST during your CSE studies?",
    options: [
      "Programming / OOPS", 
      "Data Structures / Algorithms", 
      "DBMS / SQL / Data-related subjects", 
      "OS / Networks / System subjects", 
      "None clearly"
    ]
  },
  {
    id: "preference",
    question: "When learning something new, you prefer:",
    options: [
      "Seeing quick visual results", 
      "Understanding logic step-by-step", 
      "Working with real datasets", 
      "Exploring tools, servers, or systems", 
      "Guided structured learning"
    ]
  },
  {
    id: "frustration",
    question: "What frustrates you the MOST?",
    options: [
      "Writing and debugging code", 
      "Math or statistics", 
      "Complex setups and tools", 
      "Too much theory without practice", 
      "I'm not sure yet"
    ]
  },
  {
    id: "goal",
    question: "What is your MAIN goal after graduation?",
    options: [
      "Software developer role", 
      "Data / analytics role", 
      "Security or system-related role", 
      "Cloud / DevOps / infrastructure role", 
      "Still exploring"
    ]
  }
];

export const NON_CSE_INFERENCE_QUESTIONS = [
  {
    id: "excitement",
    question: "What type of activity sounds MOST exciting to you?",
    options: [
      "Building websites or apps", 
      "Working with data, Excel, or reports", 
      "Automating systems or cloud tools", 
      "Finding bugs or security issues", 
      "Solving logical or aptitude problems", 
      "Not sure yet"
    ]
  },
  {
    id: "tried",
    question: "Have you ever tried any of these before?",
    options: [
      "Written basic code (C/Python/Java/JS)", 
      "Used Excel formulas or Google Sheets", 
      "Built a small website or app", 
      "Tried cybersecurity or ethical hacking", 
      "None of the above"
    ]
  },
  {
    id: "preference",
    question: "When learning something new, you prefer:",
    options: [
      "Seeing quick visual results", 
      "Understanding logic step-by-step", 
      "Working with real data or examples", 
      "Exploring tools and systems", 
      "Guided structured learning"
    ]
  },
  {
    id: "frustration",
    question: "What frustrates you the MOST while learning?",
    options: [
      "Writing code errors", 
      "Math and numbers", 
      "Too many tools or setups", 
      "Theory without practice", 
      "I'm not sure yet"
    ]
  },
  {
    id: "goal",
    question: "What is your goal in the next 1 year?",
    options: [
      "Get a tech internship", 
      "Move into a tech/software role", 
      "Build strong skills before placements", 
      "Just exploring possibilities"
    ]
  }
];

export const STATIC_MENTORS = [
  {
    name: "Sushma Gantagari",
    role: "Senior Software Engineer",
    company: "Microsoft",
    expertise: ["Web Development", "React", "Frontend Architecture"],
    email: "sushma.gantagari@visionnest.ai",
    imageUrl: "https://i.pravatar.cc/150?u=sushma",
    domainMatch: ["Web Development", "Android Development"]
  },
  {
    name: "Vijay Kumar",
    role: "Principal Data Scientist",
    company: "Google",
    expertise: ["Machine Learning", "Big Data", "AI Strategy"],
    email: "vijay.kumar@visionnest.ai",
    imageUrl: "https://i.pravatar.cc/150?u=vijay",
    domainMatch: ["Data Science", "AI / ML"]
  },
  {
    name: "Sharath",
    role: "Cloud Infrastructure Architect",
    company: "Amazon Web Services",
    expertise: ["DevOps", "Kubernetes", "Cloud Security"],
    email: "sharath@visionnest.ai",
    imageUrl: "https://i.pravatar.cc/150?u=sharath",
    domainMatch: ["DevOps & Cloud", "Cyber Security"]
  },
  {
    name: "Aga Pranathi",
    role: "Senior Design Engineer",
    company: "Tesla",
    expertise: ["Core Engineering", "VLSI", "System Design"],
    email: "aga.pranathi@visionnest.ai",
    imageUrl: "https://i.pravatar.cc/150?u=aga",
    domainMatch: ["Core", "Others", "Mechanical/Civil", "ECE/EEE Core"]
  }
];
