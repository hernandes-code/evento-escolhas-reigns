import { useState, useEffect } from 'react';
import { gameCards, INITIAL_METRICS } from '../data/gameCards';
import type { GameState, GameMetrics as GameMetricsType, LeadData } from '../types/game';
import GameCard from './GameCard';
import GameMetrics from './GameMetrics';
import heroImage from '../assets/hero-events.jpg';
import ConsequenceModal from './ConsequenceModal';
import GameOverModal from './GameOverModal';
import LeadForm from './LeadForm';
import SuccessModal from './SuccessModal';

export default function ReignsGame() {
  const [gameState, setGameState] = useState<GameState>({
    currentCard: 0,
    metrics: { ...INITIAL_METRICS },
    isGameOver: false,
    gameOverReason: '',
    completedCards: [],
    showingConsequence: false,
    lastChoice: null,
    lastConsequence: ''
  });

  const [showLeadForm, setShowLeadForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Check for game over conditions
  useEffect(() => {
    const { metrics } = gameState;
    
    if (metrics.budget <= 0) {
      setGameState(prev => ({ 
        ...prev, 
        isGameOver: true, 
        gameOverReason: 'Seu orçamento acabou! Sem dinheiro, o evento não pode continuar.' 
      }));
    } else if (metrics.audience <= 0) {
      setGameState(prev => ({ 
        ...prev, 
        isGameOver: true, 
        gameOverReason: 'Ninguém quer ir ao seu evento! Você precisa de mais estratégias de marketing.' 
      }));
    } else if (metrics.satisfaction <= 0) {
      setGameState(prev => ({ 
        ...prev, 
        isGameOver: true, 
        gameOverReason: 'Seu público está insatisfeito! A experiência do evento foi muito ruim.' 
      }));
    } else if (gameState.currentCard >= gameCards.length) {
      setGameState(prev => ({ 
        ...prev, 
        isGameOver: true, 
        gameOverReason: 'Você completou todos os desafios! O evento foi um sucesso.' 
      }));
    }
  }, [gameState.metrics, gameState.currentCard]);

  const applyMetricsEffects = (effects: Partial<GameMetricsType>) => {
    setGameState(prev => ({
      ...prev,
      metrics: {
        budget: Math.max(0, Math.min(100, prev.metrics.budget + (effects.budget || 0))),
        audience: Math.max(0, Math.min(100, prev.metrics.audience + (effects.audience || 0))),
        satisfaction: Math.max(0, Math.min(100, prev.metrics.satisfaction + (effects.satisfaction || 0))),
        technology: Math.max(0, Math.min(100, prev.metrics.technology + (effects.technology || 0)))
      }
    }));
  };

  const handleChoice = (choice: 'left' | 'right', effects: Partial<GameMetricsType>, consequence: string) => {
    const currentCardId = gameCards[gameState.currentCard].id;
    
    setGameState(prev => ({
      ...prev,
      lastChoice: choice,
      lastConsequence: consequence,
      showingConsequence: true,
      completedCards: [...prev.completedCards, currentCardId]
    }));

    applyMetricsEffects(effects);
  };

  const handleConsequenceContinue = () => {
    setGameState(prev => ({
      ...prev,
      showingConsequence: false,
      currentCard: prev.currentCard + 1,
      lastChoice: null,
      lastConsequence: ''
    }));
  };

  const handleRestart = () => {
    setGameState({
      currentCard: 0,
      metrics: { ...INITIAL_METRICS },
      isGameOver: false,
      gameOverReason: '',
      completedCards: [],
      showingConsequence: false,
      lastChoice: null,
      lastConsequence: ''
    });
    setShowLeadForm(false);
    setShowSuccess(false);
  };

  const handleContinueToForm = () => {
    setShowLeadForm(true);
  };

  const handleFormSubmit = (data: LeadData) => {
    console.log('Lead data submitted:', data);
    // Here you would typically send the data to your backend
    setShowLeadForm(false);
    setShowSuccess(true);
  };

  const getCurrentCard = () => {
    if (gameState.currentCard >= gameCards.length) return null;
    return gameCards[gameState.currentCard];
  };

  const currentCard = getCurrentCard();
  const totalScore = gameState.metrics.budget + gameState.metrics.audience + gameState.metrics.satisfaction + gameState.metrics.technology;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-md mx-auto">
        
        {/* Hero Section */}
        <div className="relative h-48 mb-6 overflow-hidden">
          <img 
            src={heroImage} 
            alt="Event Production" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 text-center">
            <h1 className="text-2xl font-bold text-foreground mb-1">
              🎉 Produtor de Eventos
            </h1>
            <p className="text-xs text-muted-foreground">
              Tome decisões inteligentes e veja seu evento crescer!
            </p>
          </div>
        </div>

        <div className="px-4 pb-4">

        {/* Game Metrics */}
        <GameMetrics metrics={gameState.metrics} />

        {/* Progress Indicator */}
        <div className="mt-4 mb-6">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
            <span>Progresso</span>
            <span>{gameState.currentCard + 1} / {gameCards.length}</span>
          </div>
          <div className="w-full bg-secondary/30 rounded-full h-2">
            <div 
              className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${((gameState.currentCard + 1) / gameCards.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Game Card */}
        {currentCard && !gameState.isGameOver && (
          <GameCard 
            card={currentCard} 
            onChoice={handleChoice}
            className="mb-8"
          />
        )}

        {/* Consequence Modal */}
        <ConsequenceModal
          consequence={gameState.lastConsequence}
          choice={gameState.lastChoice || 'left'}
          onContinue={handleConsequenceContinue}
          isVisible={gameState.showingConsequence}
        />

        {/* Game Over Modal */}
        <GameOverModal
          metrics={gameState.metrics}
          reason={gameState.gameOverReason}
          onRestart={handleRestart}
          onContinueToForm={handleContinueToForm}
          isVisible={gameState.isGameOver && !showLeadForm && !showSuccess}
        />

        {/* Lead Form */}
        <LeadForm
          onSubmit={handleFormSubmit}
          isVisible={showLeadForm}
          finalScore={totalScore}
        />

        {/* Success Modal */}
        <SuccessModal
          onRestart={handleRestart}
          isVisible={showSuccess}
        />
        </div>
      </div>
    </div>
  );
}