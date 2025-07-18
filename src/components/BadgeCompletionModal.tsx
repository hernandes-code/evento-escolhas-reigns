import { useState } from 'react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Share2, Download } from 'lucide-react';
import logo from '@/assets/logo.png';

// Imagens dos badges
import badgeMaoDeVaca from '@/assets/badges/badge-budget-wizard.png';
import badgeArrastaMultidao from '@/assets/badges/badge-crowd-pleaser.png';
import badgeMestreDoSorriso from '@/assets/badges/badge-satisfaction-guru.png';
import badgeTechnoGuru from '@/assets/badges/badge-tech-master.png';
import badgeImprovisador from '@/assets/badges/badge-crisis-manager.png';
import badgeNativoCriativo from '@/assets/badges/badge-digital-native.png';
import badgeInfluencer from '@/assets/badges/badge-strategic-mind.png';
import badgeInovador from '@/assets/badges/badge-risk-taker.png';

interface BadgeCompletionModalProps {
  isVisible: boolean;
  badges: string[];
  totalPoints: number;
  onClose: () => void;
  onEbookClick: () => void;
}

interface BadgeDetails {
  name: string;
  description: string;
  icon: string;
  message: string;
  image: string;
}

interface BadgeDictionary {
  [key: string]: BadgeDetails;
}

export default function BadgeCompletionModal({
  isVisible,
  badges,
  totalPoints,
  onClose,
  onEbookClick
}: BadgeCompletionModalProps) {
  const [copied, setCopied] = useState(false);

  const badgeDetails: BadgeDictionary = {
    'budget-wizard': {
      name: 'Mestre do Orçamento',
      description: 'Economizou sem comprometer a qualidade!',
      icon: '💰',
      message: 'Você é o mestre da gestão financeira!',
      image: badgeMaoDeVaca
    },
    'crowd-pleaser': {
      name: 'Atrai Multidões',
      description: 'Seu evento foi um sucesso de público!',
      icon: '🎉',
      message: 'Você sabe como engajar o público!',
      image: badgeArrastaMultidao
    },
    'satisfaction-guru': {
      name: 'Guru da Satisfação',
      description: 'Todos saíram felizes e satisfeitos!',
      icon: '😁',
      message: 'Você é expert em satisfação do cliente!',
      image: badgeMestreDoSorriso
    },
    'tech-master': {
      name: 'Mestre da Tecnologia',
      description: 'Inovou com soluções tecnológicas!',
      icon: '🤖',
      message: 'Você domina a tecnologia!',
      image: badgeTechnoGuru
    },
    'crisis-manager': {
      name: 'Gestor de Crises',
      description: 'Resolve qualquer imprevisto!',
      icon: '🛠️',
      message: 'Você é expert em gestão de crises!',
      image: badgeImprovisador
    },
    'digital-native': {
      name: 'Nativo Digital',
      description: 'Domina as ferramentas digitais!',
      icon: '💻',
      message: 'Você é um verdadeiro nativo digital!',
      image: badgeNativoCriativo
    },
    'strategic-mind': {
      name: 'Mente Estratégica',
      description: 'Planeja cada detalhe com precisão!',
      icon: '🎯',
      message: 'Você é um estrategista nato!',
      image: badgeInfluencer
    },
    'risk-taker': {
      name: 'Tomador de Riscos',
      description: 'Ousa inovar e se destaca!',
      icon: '🚀',
      message: 'Você é um verdadeiro inovador!',
      image: badgeInovador
    }
  };

  const badge = badges[0] ? badgeDetails[badges[0]] : undefined;

  const shareText = `🎉 Acabei de completar o Evento Escolhas!

${badge ? `Conquistei a insignia: ${badge.icon} ${badge.name} - ${badge.description}` : ''}

Descubra seu estilo de gestor e compartilhe também: ${window.location.href}
#GestãoEventos #EventosCorporativos #InovaçãoEmEventos`;

  const handleShareBadge = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Minha Badge do Evento Escolhas',
          text: shareText
        });
      } catch (err) {
        console.error('Erro ao compartilhar:', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Erro ao copiar para clipboard:', err);
      }
    }
  };

  return (
    <Dialog open={isVisible} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] text-center p-6">
        <DialogHeader>
          <img src={logo} alt="Logo" className="w-32 mx-auto mb-4" />
          <DialogTitle className="text-2xl font-bold text-center mb-4">
            Parabéns! 🎉
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          {badge && (
            <div className="mb-6">
              <div className="mb-4">
                <img 
                  src={badge.image}
                  alt={badge.name}
                  className="w-32 h-32 mx-auto object-contain drop-shadow-lg rounded-full border-4 border-primary"
                />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                {badge.icon} {badge.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-1">
                {badge.description}
              </p>
              <p className="text-base font-semibold text-primary mb-3">
                {badge.message}
              </p>
              <div className="text-center">
                <p className="text-lg font-semibold text-primary mb-2">
                  {totalPoints} pontos
                </p>
                <p className="text-sm text-muted-foreground">
                  Compartilhe seu estilo de gestor!
                </p>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-3 mt-4">
            <Button
              onClick={handleShareBadge}
              className="w-full py-4 text-lg font-bold flex items-center justify-center bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg shadow-lg"
              style={{ fontSize: '1.2rem' }}
            >
              <Share2 className="w-6 h-6 mr-3" />
              {copied ? 'Copiado!' : 'Compartilhar minha badge'}
            </Button>
            <Button
              onClick={onEbookClick}
              variant="outline"
              className="w-full py-4 text-lg font-bold rounded-lg"
            >
              <Download className="w-6 h-6 mr-3" />
              Baixar material complementar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
