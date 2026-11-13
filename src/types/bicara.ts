export type UserRole = 'siswa' | 'guru_bk' | 'admin';
export type GradeLevel = 'VII' | 'VIII' | 'IX';
export type NavTab = 'beranda' | 'materi' | 'info' | 'tanya-bk' | 'tes-minat' | 'profil' | 'admin';

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  grade: GradeLevel | 'Staff';
  school: string;
  role: UserRole;
  photoUrl?: string;
  guardianConsent: boolean;
  completedMaterialIds: string[];
  createdAt?: unknown;
  updatedAt?: unknown;
}

export interface StaffRole {
  uid: string;
  email: string;
  name: string;
  role: 'guru_bk' | 'admin';
  createdAt?: unknown;
}

export interface MaterialCategory {
  id: string;
  name: string;
  grade: GradeLevel;
  description: string;
  order: number;
  updatedAt?: unknown;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface CareerMaterial {
  id: string;
  title: string;
  grade: GradeLevel;
  categoryId: string;
  categoryName: string;
  learningObjective: string;
  imageUrl: string;
  explanation: string;
  dailyExamples: string[];
  reflectionPrompt: string;
  published: boolean;
  authorId: string;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export interface MaterialQuiz {
  id: string;
  materialId: string;
  questions: QuizQuestion[];
  published: boolean;
  updatedAt?: unknown;
}

export interface QuizResult {
  id: string;
  userId: string;
  materialId: string;
  materialTitle: string;
  grade: GradeLevel;
  score: number;
  totalQuestions: number;
  reflectionNote: string;
  completed: boolean;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export type RiasecCode = 'R' | 'I' | 'A' | 'S' | 'E' | 'C';

export interface RiasecScores {
  R: number;
  I: number;
  A: number;
  S: number;
  E: number;
  C: number;
}

export interface CareerExploration {
  id: string;
  userId: string;
  userName: string;
  grade: GradeLevel | 'Staff';
  scores: RiasecScores;
  topThree: RiasecCode[];
  answersCount: number;
  createdAt?: unknown;
  createdAtLabel?: string;
}

export interface InfoArticle {
  id: string;
  title: string;
  category: string;
  publishedDateLabel: string;
  updatedAtLabel: string;
  summary: string;
  content: string;
  sourceName: string;
  sourceUrl: string;
  imageUrl: string;
  published: boolean;
  authorId: string;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export interface Announcement {
  id: string;
  title: string;
  message: string;
  targetGrade: 'Semua' | GradeLevel;
  active: boolean;
  authorId: string;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export interface ChatSession {
  id: string;
  userId: string;
  title: string;
  topicCategory: string;
  messageCount: number;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export interface ChatMessage {
  id: string;
  sessionId: string;
  userId: string;
  role: 'user' | 'model';
  content: string;
  createdAt?: unknown;
}

export interface ChatbotUsageStat {
  id: string;
  userId: string;
  grade: GradeLevel | 'Staff';
  topicCategory: string;
  createdAt?: unknown;
}

export interface CounselingReferral {
  id: string;
  userId: string;
  userName: string;
  grade: GradeLevel | 'Staff';
  topic: string;
  studentSummary: string;
  consentGiven: boolean;
  status: 'menunggu' | 'ditindaklanjuti' | 'selesai';
  counselorNote: string;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export interface SiteSetting {
  id: string;
  heroHeadline: string;
  heroSubheadline: string;
  motivationQuote: string;
  motivationAuthor: string;
  featuredTip: string;
  updatedAt?: unknown;
}
