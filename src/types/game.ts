export interface GameMetrics {
  budget: number;
  audience: number;
  satisfaction: number;
  technology: number;
}

export interface GameCard {
  id: string;
  title: string;
  description: string;
  leftChoice: {
    text: string;
    effects: Partial<GameMetrics>;
    consequence: string;
  };
  rightChoice: {
    text: string;
    effects: Partial<GameMetrics>;
    consequence: string;
  };
  icon: string;
}

export interface GameState {
  currentCard: number;
  metrics: GameMetrics;
  isGameOver: boolean;
  gameOverReason: string;
  completedCards: string[];
  showingConsequence: boolean;
  lastChoice: 'left' | 'right' | null;
  lastConsequence: string;
}

export interface LeadData {
  name: string;
  whatsapp: string;
  instagram: string;
  eventType: string;
}

export type SwipeDirection = 'left' | 'right' | null;