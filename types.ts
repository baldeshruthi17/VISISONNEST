
export enum UserGoal {
  TECH_JOB = 'Software Job',
  HIGHER_STUDIES = 'Higher Studies',
  GOVT_EXAMS = 'Government Jobs',
  CORE_JOBS = 'Core Jobs'
}

export type PrepStyle = 'DSA-first' | 'Project-first' | 'Theory-learner' | 'Mixed';
export type RiskTolerance = 'Conservative (Stable)' | 'Aggressive (High-Growth)' | 'Moderate';

export interface UserAnswers {
  mainGoal: UserGoal;
  branch: string;
  year: string;
  cgpa: string;
  preferredRole: string;
  interestProfile: string[]; // Stores inference answers
  tier: string;
  pathPreference?: 'Tech' | 'Core';
}

export interface RoadmapStep {
  monthLabel: string;
  title: string;
  focus: string;
  skillDepth: string;
  topics: string[];
  practice: string[];
  project?: string;
  internshipTip?: string;
  resources: { title: string; link: string; type: string; tierSpecial?: boolean }[];
}

export interface MarketTrend {
  trend: string;
  impact: string;
  demandLevel: 'High' | 'Rising' | 'Stable';
}

export interface CareerPathData {
  explanation: string;
  suggestedDomain: string;
  marketTrends: MarketTrend[];
  roadmap: RoadmapStep[];
}

export interface Mentor {
  name: string;
  role: string;
  company: string;
  expertise: string[];
  email: string;
  imageUrl: string;
}

export interface Course {
  title: string;
  platform: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  link: string;
  description: string;
  isEqualizer?: boolean;
}

export interface Internship {
  title: string;
  company: string;
  location: string;
  duration: string;
  link: string;
}

export interface DomainRecommendation {
  domain: string;
  reason: string;
}
