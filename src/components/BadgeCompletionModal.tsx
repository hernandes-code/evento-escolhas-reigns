import { useState } from 'react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Badge } from './ui/badge';
import { Share2, Copy, Check } from 'lucide-react';

interface BadgeCompletionModalProps {
  isVisible: boolean;
  badges: string[];
  totalPoints: number;
  onClose: () => void;
}

export default function BadgeCompletionModal({ 
  isVisible, 
  badges, 
  totalPoints, 
  onClose 
}: BadgeCompletionModalProps) {
  const [copied, setCopied] = useState(false);

  const badgeDetails = {
    TECH_MASTER: {
      name: 'Mestre da Tecnologia',
      description: 'Você priorizou soluções tecnológicas em suas decisões',
      icon: '🔧',
      message: 'Parabéns! Você demonstrou visão estratégica para tecnologia em eventos.'
    },
    BUDGET_WIZARD: {
      name: 'Mago do Orçamento',
      description: 'Terminou o jogo com excelente controle financeiro',
      icon: '💰',
      message: 'Impressionante! Você tem talento natural para gestão financeira.'
    },
    CROWD_PLEASER: {
      name: 'Conquistador de Multidões',
      description: 'Manteve alta audiência durante todo o evento',
      icon: '👥',
      message: 'Fantástico! Você sabe como atrair e manter seu público.'
    },
    SATISFACTION_GURU: {
      name: 'Guru da Satisfação',
      description: 'Priorizou sempre a experiência do cliente',
      icon: '⭐',
      message: 'Excelente! Você entende o que faz um evento memorável.'
    },
    RISK_TAKER: {
      name: 'Tomador de Riscos',
      description: 'Ousou em momentos decisivos e deu certo',
      icon: '🎲',
      message: 'Corajoso! Você tem o perfil empreendedor ideal.'
    },
    STRATEGIC_MIND: {
      name: 'Mente Estratégica',
      description: 'Demonstrou pensamento estratégico excepcional',
      icon: '🧠',
      message: 'Brilhante! Você tem potencial para grandes eventos.'
    },
    CRISIS_MANAGER: {
      name: 'Gestor de Crises',
      description: 'Transformou problemas em oportunidades',
      icon: '🚨',
      message: 'Impressionante! Você tem sangue frio para situações difíceis.'
    },
    DIGITAL_NATIVE: {
      name: 'Nativo Digital',
      description: 'Abraçou soluções digitais modernas',
      icon: '📱',
      message: 'Perfeito! Você entende o futuro dos eventos.'
    }
  };

  const shareText = `🎉 Acabei de completar o desafio do Produtor de Eventos!

${badges.length > 0 ? `Conquistei ${badges.length} badge${badges.length > 1 ? 's' : ''}:
${badges.map(badge => `${badgeDetails[badge as keyof typeof badgeDetails]?.icon} ${badgeDetails[badge as keyof typeof badgeDetails]?.name}`).join('\n')}

` : ''}💯 Pontuação final: ${totalPoints}

Você também produz eventos? Teste suas habilidades: [LINK_DO_JOGO]

#EventosDigitais #ProducaoEventos #Gamificacao`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Desafio do Produtor de Eventos',
          text: shareText,
        });
      } catch (error) {
        console.log('Erro ao compartilhar:', error);
      }
    } else {
      // Fallback para desktop
      navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Dialog open={isVisible} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto bg-background border-border">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold text-foreground">
            🎉 Parabéns!
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">
              Você completou o desafio com <strong>{totalPoints} pontos</strong>!
            </p>
          </div>

          {badges.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">
                Suas Conquistas:
              </h3>
              <div className="space-y-2">
                {badges.map((badgeId) => {
                  const badge = badgeDetails[badgeId as keyof typeof badgeDetails];
                  if (!badge) return null;
                  
                  return (
                    <div key={badgeId} className="bg-secondary/30 p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg">{badge.icon}</span>
                        <span className="font-medium text-foreground">{badge.name}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">
                        {badge.description}
                      </p>
                      <p className="text-xs text-primary font-medium">
                        {badge.message}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="bg-primary/10 p-4 rounded-lg text-center">
            <p className="text-sm text-foreground mb-2">
              🎁 <strong>Quer levar seu evento para o próximo nível?</strong>
            </p>
            <p className="text-xs text-muted-foreground">
              Baixe nosso e-book gratuito com estratégias avançadas de produção de eventos no próximo passo!
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleShare}
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {copied ? (
                <Check className="w-4 h-4 mr-2" />
              ) : (
                <Share2 className="w-4 h-4 mr-2" />
              )}
              {copied ? 'Copiado!' : 'Compartilhar'}
            </Button>
            
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1"
            >
              Continuar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}