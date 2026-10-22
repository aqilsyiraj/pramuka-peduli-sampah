export type BinColor = 'green' | 'yellow' | 'blue' | 'red' | 'gray';

export interface TrashBinCategory {
  id: string;
  name: string;
  colorName: string;
  colorKey: BinColor;
  bgClass: string;
  borderClass: string;
  badgeClass: string;
  textClass: string;
  emoji: string;
  iconName: string;
  description: string;
  kidsExplanation: string;
  benefits: string;
  processedInto: string[];
  tips: string;
}

export interface WasteItem {
  id: string;
  name: string;
  category: string; // matches TrashBinCategory.id
  emoji: string;
  origin: string; // e.g. "Bekas sarapan regu di kantin", "Taman sekolah"
  hint: string;
  funFact: string;
  decompositionTime: string; // e.g. "2-5 minggu", "450 tahun"
  difficulty: 'mudah' | 'sedang' | 'sulit';
  level: 1 | 2 | 3; // 1: Penggalang Ramu, 2: Penggalang Rakit, 3: Penggalang Terap
}

export interface QuizQuestion {
  id: number;
  question: string;
  scenario: string;
  options: {
    id: string;
    text: string;
    categoryTarget?: string;
  }[];
  correctAnswer: string;
  explanation: string;
  pramukaValue: string;
}

export interface CraftIdea {
  id: string;
  title: string;
  material: string;
  difficulty: 'Sangat Mudah' | 'Mudah' | 'Kreatif';
  duration: string;
  badge: string;
  materials: string[];
  steps: string[];
  benefit: string;
  icon: string;
}

export interface StudentProfile {
  name: string;
  school: string;
  scoutTroop: string; // e.g. "Regu Rajawali" / "Regu Melati"
  score: number;
  quizScore: number;
  unlockedBadges: string[];
  completionDate?: string;
}
