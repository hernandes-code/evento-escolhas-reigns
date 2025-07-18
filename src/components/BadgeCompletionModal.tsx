import { useState } from 'react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Share2, Download, Check } from 'lucide-react';
import logo from '../assets/logo.png';
// Imagens 3D dos personagens customizados
import badgeMaoDeVaca from '../assets/badges/mao-de-vaca.png';
import badgeArrastaMultidao from '../assets/badges/arrasta-multidao.png';
import badgeMestreDoSorriso from '../assets/badges/mestre-do-sorriso.png';
import badgeTechnoGuru from '../assets/badges/techno-guru.png';
import badgeImprovisador from '../assets/badges/improvisador.png';
import badgePixzeiro from '../assets/badges/pixzeiro.png';
import badgeInfluencer from '../assets/badges/influencer.png';
import badgeRaiz from '../assets/badges/raiz.png';
import badgeAventureiro from '../assets/badges/aventureiro.png';

interface BadgeCompletionModalProps {
  isVisible: boolean;
  badges: string[];
  totalPoints: number;
  onClose: () => void;
  onEbookClick: () => void;
}

export default function BadgeCompletionModal({ 
  isVisible, 
  badges, 
  totalPoints, 
  onClose,
  onEbookClick
}: BadgeCompletionModalProps) {
  const [copied, setCopied] = useState(false);

  const badgeDetails = {
    'mao-de-vaca': {
      name: 'Mão de Vaca',
      description: 'Economizou até no cafezinho!',
      icon: '�',
      message: 'Você é o mestre da economia!'
      , image: badgeMaoDeVaca
    },
    'arrasta-multidao': {
      name: 'Arrasta Multidão',
      description: 'Trouxe até o vizinho pro evento!',
      icon: '🎉',
      message: 'Seu evento foi um sucesso de público!',
      image: badgeArrastaMultidao
    },
    'mestre-do-sorriso': {
      name: 'Mestre do Sorriso',
      description: 'Todo mundo saiu feliz e relaxado!',
      icon: '�',
      message: 'Você garantiu a felicidade geral!',
      image: badgeMestreDoSorriso
    },
    'techno-guru': {
      name: 'Techno Guru',
      description: 'Usou até drone pra servir salgadinho!',
      icon: '🤖',
      message: 'Você é o rei da tecnologia!',
      image: badgeTechnoGuru
    },
    'improvisador': {
      name: 'Improvisador',
      description: 'Resolve tudo no improviso!',
      icon: '�',
      message: 'Você faz milagre com pouco!',
      image: badgeImprovisador
    },
    'pixzeiro': {
      name: 'Pixzeiro',
      description: 'Só aceita Pix, sem conversa!',
      icon: '💳',
      message: 'Pix é vida!'
      , image: badgePixzeiro
    },
    'influencer': {
      name: 'Influencer',
      description: 'Virou trend no TikTok!',
      icon: '📱',
      message: 'Você é o rei das redes sociais!',
      image: badgeInfluencer
    },
    'raiz': {
      name: 'Raiz',
      description: 'Não abre mão do papel e caneta!',
      icon: '�',
      message: 'Old school é o seu estilo!',
      image: badgeRaiz
    },
    'aventureiro': {
      name: 'Aventureiro',
      description: 'Vive no limite, sem medo de errar!',
      icon: '�️',
      message: 'Você é destemido e ousado!',
      image: badgeAventureiro
    },
  };

  const shareText = `🎉 Acabei de completar o desafio do Produtor de Eventos!

${badges.length > 0 ? `Recebi a badge: ${badgeDetails[badges[0]]?.icon} ${badgeDetails[badges[0]]?.name} - ${badgeDetails[badges[0]]?.description}
` : ''}
💯 Pontuação final: ${totalPoints}

Descubra seu estilo de produtor e compartilhe também: [LINK_DO_JOGO]

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
        
        <div className="space-y-6">
          {/* Badge principal */}
          {badges.length > 0 && (
            <div className="text-center">
              <div className="mb-4">
                <img 
                  src={badgeDetails[badges[0]]?.image} 
                  alt={badgeDetails[badges[0]]?.name}
                  className="w-32 h-32 mx-auto object-contain"
                />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                {badgeDetails[badges[0]]?.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-1">
                {badgeDetails[badges[0]]?.description}
              </p>
              <p className="text-sm text-muted-foreground mb-3">
                {badgeDetails[badges[0]]?.message}
              </p>
              <div className="text-center">
                <p className="text-lg font-semibold text-primary mb-2">
                  {totalPoints} pontos
                </p>
                <p className="text-sm text-muted-foreground">
                  Compartilhe seu estilo de produtor!
                </p>
              </div>
            </div>
          )}

          {/* Botões */}
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
              onClick={onEbookClick}
              variant="outline"
              className="flex-1"
            >
              Receber ebook
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}