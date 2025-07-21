import { useState, useRef } from 'react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Download, Image as ImageIcon, Trophy, Star, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import logo from '../assets/logo.png';
import badgeTechMaster from '../assets/badge-tech-master.png';
import badgeBudgetWizard from '../assets/badge-budget-wizard.png';
import badgeSatisfactionGuru from '../assets/badge-satisfaction-guru.png';
import badgeRiskTaker from '../assets/badge-risk-taker.png';
import badgeStrategicMind from '../assets/badge-strategic-mind.png';
import badgeCrisisManager from '../assets/badge-crisis-manager.png';
import badgeDigitalNative from '../assets/badge-digital-native.png';

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
  const [generatingImage, setGeneratingImage] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const badgeDetails = {
    PLATFORM_ADOPTER: {
      name: 'Nativo Digital',
      description: 'Reconheceu o valor de usar plataformas completas',
      icon: '🚀',
      message: 'Você entendeu que plataformas integradas multiplicam resultados!',
      image: badgeDigitalNative,
      style: 'Tech-Savvy Innovator',
      phrase: 'Abraça a tecnologia como aliada estratégica'
    },
    STRATEGIC_MIND: {
      name: 'Mente Estratégica',
      description: 'Priorizou decisões estratégicas ao invés de soluções improvisadas',
      icon: '🧠',
      message: 'Sua visão estratégica se destacou! Produtores organizados criam eventos mais lucrativos.',
      image: badgeStrategicMind,
      style: 'Visionário Estratégico',
      phrase: 'Pensa três passos à frente, sempre'
    },
    DATA_MASTER: {
      name: 'Mestre da Tecnologia',
      description: 'Valorizou coleta e análise de dados',
      icon: '📊',
      message: 'Dados são o combustível do sucesso! Continue usando analytics para otimizar.',
      image: badgeTechMaster,
      style: 'Analista de Performance',
      phrase: 'Transforma números em insights valiosos'
    },
    RELATIONSHIP_BUILDER: {
      name: 'Agrada Multidões',
      description: 'Priorizou relacionamentos duradouros',
      icon: '🤝',
      message: 'Relacionamentos sólidos são a base do sucesso! Ferramentas de CRM ajudam a escalar.',
      image: badgeSatisfactionGuru,
      style: 'Construtor de Conexões',
      phrase: 'Cultiva relacionamentos que duram além dos eventos'
    },
    PROBLEM_SOLVER: {
      name: 'Gestor de Crises',
      description: 'Transformou crises em oportunidades',
      icon: '💡',
      message: 'Sua criatividade impressiona! Sistemas de gestão dão mais tempo para focar na criatividade.',
      image: badgeCrisisManager,
      style: 'Solucionador Criativo',
      phrase: 'Transforma desafios em oportunidades brilhantes'
    },
    TECH_ENTHUSIAST: {
      name: 'Arriscado Estratégico',
      description: 'Abraçou soluções tecnológicas',
      icon: '💻',
      message: 'Tecnologia é sua aliada! Continue explorando ferramentas que automatizam processos.',
      image: badgeRiskTaker,
      style: 'Pioneiro Digital',
      phrase: 'Sempre um passo à frente na inovação'
    },
    BUDGET_CONSCIOUS: {
      name: 'Mago do Orçamento',
      description: 'Manteve equilíbrio financeiro',
      icon: '💰',
      message: 'Controle financeiro é essencial! Plataformas com dashboard financeiro facilitam essa gestão.',
      image: badgeBudgetWizard,
      style: 'Maestro Financeiro',
      phrase: 'Maximiza resultados com precisão cirúrgica no orçamento'
    }
  };

  const mainBadge = badges.length > 0 ? badgeDetails[badges[0] as keyof typeof badgeDetails] : null;

  const shareText = `🎉 Acabei de completar o Desafio do Produtor de Eventos!

🏆 Conquista: ${mainBadge?.name || ''}
⭐ Estilo: ${mainBadge?.style || ''}
🎯 Pontuação: ${totalPoints} pontos

${mainBadge?.phrase || ''}

🚀 Aceita o desafio? Teste agora: [LINK_DO_JOGO]

#EventosDigitais #ProducaoEventos #Desafio #TopPerformance`;

  const generateBadgeImage = async () => {
    if (!badges.length || !canvasRef.current) return null;
    
    setGeneratingImage(true);
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    
    // Definir tamanho do canvas para story/post Instagram
    canvas.width = 1080;
    canvas.height = 1080;
    
    // Gradiente de fundo luxuoso - estilo placa dourada
    const bgGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    bgGradient.addColorStop(0, '#0f172a'); // slate-900
    bgGradient.addColorStop(0.3, '#1e293b'); // slate-800  
    bgGradient.addColorStop(0.7, '#334155'); // slate-700
    bgGradient.addColorStop(1, '#475569'); // slate-600
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Padrão de estrelas douradas sutis no fundo
    ctx.fillStyle = 'rgba(251, 191, 36, 0.15)';
    for (let i = 0; i < 40; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const size = Math.random() * 4 + 2;
      
      // Desenhar estrela
      ctx.beginPath();
      for (let j = 0; j < 5; j++) {
        const angle = (j * Math.PI * 2) / 5;
        const xStar = x + Math.cos(angle) * size;
        const yStar = y + Math.sin(angle) * size;
        if (j === 0) ctx.moveTo(xStar, yStar);
        else ctx.lineTo(xStar, yStar);
      }
      ctx.closePath();
      ctx.fill();
    }
    
    // Moldura dourada ornamentada - estilo premium
    const frameMargin = 50;
    const frameThickness = 12;
    const cornerRadius = 30;
    
    // Sombra externa da moldura
    ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
    ctx.shadowBlur = 25;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 15;
    
    // Gradiente dourado para a moldura
    const frameGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    frameGradient.addColorStop(0, '#fbbf24'); // amber-400
    frameGradient.addColorStop(0.2, '#f59e0b'); // amber-500
    frameGradient.addColorStop(0.5, '#d97706'); // amber-600
    frameGradient.addColorStop(0.8, '#b45309'); // amber-700
    frameGradient.addColorStop(1, '#92400e'); // amber-800
    
    ctx.strokeStyle = frameGradient;
    ctx.lineWidth = frameThickness;
    ctx.beginPath();
    ctx.roundRect(frameMargin, frameMargin, canvas.width - frameMargin * 2, canvas.height - frameMargin * 2, cornerRadius);
    ctx.stroke();
    
    // Moldura interna decorativa
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#fde047'; // yellow-300
    ctx.beginPath();
    ctx.roundRect(frameMargin + 20, frameMargin + 20, canvas.width - (frameMargin + 20) * 2, canvas.height - (frameMargin + 20) * 2, cornerRadius - 8);
    ctx.stroke();
    
    // Reset shadow
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    
    return new Promise<string>((resolve) => {
      const badgeImg = new Image();
      badgeImg.onload = () => {
        ctx.textAlign = 'center';
        
        // Título "PARABÉNS!" com efeito dourado brilhante
        ctx.font = 'bold 72px Arial';
        const titleGradient = ctx.createLinearGradient(0, 120, 0, 200);
        titleGradient.addColorStop(0, '#fde047'); // yellow-300
        titleGradient.addColorStop(0.5, '#fbbf24'); // amber-400
        titleGradient.addColorStop(1, '#f59e0b'); // amber-500
        ctx.fillStyle = titleGradient;
        
        // Sombra no texto do título
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        ctx.shadowBlur = 8;
        ctx.shadowOffsetY = 4;
        ctx.fillText('🎉 PARABÉNS! 🎉', canvas.width / 2, 200);
        
        // Reset shadow para próximos elementos
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        ctx.shadowOffsetY = 0;
        
        // Badge principal com halo dourado
        const badgeSize = 220;
        const badgeX = (canvas.width - badgeSize) / 2;
        const badgeY = 240;
        
        // Halo brilhante atrás da badge
        const haloGradient = ctx.createRadialGradient(
          badgeX + badgeSize/2, badgeY + badgeSize/2, 0,
          badgeX + badgeSize/2, badgeY + badgeSize/2, badgeSize/2 + 40
        );
        haloGradient.addColorStop(0, 'rgba(251, 191, 36, 0.4)');
        haloGradient.addColorStop(0.7, 'rgba(251, 191, 36, 0.2)');
        haloGradient.addColorStop(1, 'rgba(251, 191, 36, 0)');
        ctx.fillStyle = haloGradient;
        ctx.fillRect(badgeX - 40, badgeY - 40, badgeSize + 80, badgeSize + 80);
        
        // Círculo dourado atrás da badge
        ctx.fillStyle = 'rgba(251, 191, 36, 0.2)';
        ctx.beginPath();
        ctx.arc(badgeX + badgeSize/2, badgeY + badgeSize/2, badgeSize/2 + 15, 0, Math.PI * 2);
        ctx.fill();
        
        // Badge principal
        ctx.drawImage(badgeImg, badgeX, badgeY, badgeSize, badgeSize);
        
        // Nome da conquista com destaque luxuoso
        ctx.font = 'bold 54px Arial';
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
        ctx.shadowBlur = 6;
        ctx.shadowOffsetY = 3;
        ctx.fillText(mainBadge?.name || '', canvas.width / 2, badgeY + badgeSize + 90);
        
        // Estilo do produtor com destaque especial dourado
        ctx.font = 'italic bold 42px Arial';
        ctx.fillStyle = titleGradient;
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        ctx.shadowBlur = 4;
        ctx.fillText(`"${mainBadge?.style || ''}"`, canvas.width / 2, badgeY + badgeSize + 145);
        
        // Frase de personalidade elegante
        ctx.font = 'italic 32px Arial';
        ctx.fillStyle = '#e2e8f0'; // slate-200
        ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
        ctx.shadowBlur = 3;
        const phrase = mainBadge?.phrase || '';
        ctx.fillText(phrase, canvas.width / 2, badgeY + badgeSize + 185);
        
        // Reset shadow
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        ctx.shadowOffsetY = 0;
        
        // Pontuação com destaque dourado e brilho
        ctx.font = 'bold 58px Arial';
        ctx.fillStyle = titleGradient;
        ctx.shadowColor = 'rgba(251, 191, 36, 0.6)';
        ctx.shadowBlur = 10;
        ctx.fillText(`${totalPoints} PONTOS`, canvas.width / 2, badgeY + badgeSize + 250);
        
        // Reset shadow
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        
        // Separador ornamental com diamantes
        const separatorY = badgeY + badgeSize + 285;
        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2 - 150, separatorY);
        ctx.lineTo(canvas.width / 2 + 150, separatorY);
        ctx.stroke();
        
        // Diamantes decorativos dourados
        const diamondPositions = [-80, -40, 0, 40, 80];
        diamondPositions.forEach(offset => {
          const diamondX = canvas.width / 2 + offset;
          const diamondY = separatorY;
          ctx.fillStyle = '#fde047';
          ctx.beginPath();
          ctx.moveTo(diamondX, diamondY - 12);
          ctx.lineTo(diamondX + 12, diamondY);
          ctx.lineTo(diamondX, diamondY + 12);
          ctx.lineTo(diamondX - 12, diamondY);
          ctx.closePath();
          ctx.fill();
        });
        
        // Call to action provocativo e elegante
        ctx.font = 'bold 45px Arial';
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        ctx.shadowBlur = 5;
        ctx.fillText('Você trabalha com eventos?', canvas.width / 2, separatorY + 80);
        
        ctx.font = 'bold 50px Arial';
        const challengeGradient = ctx.createLinearGradient(0, separatorY + 110, 0, separatorY + 140);
        challengeGradient.addColorStop(0, '#ef4444'); // red-500
        challengeGradient.addColorStop(1, '#dc2626'); // red-600
        ctx.fillStyle = challengeGradient;
        ctx.shadowColor = 'rgba(220, 38, 38, 0.5)';
        ctx.shadowBlur = 8;
        ctx.fillText('DUVIDO FAZER MAIS PONTOS!', canvas.width / 2, separatorY + 140);
        
        // Subtítulo do desafio
        ctx.font = '36px Arial';
        ctx.fillStyle = '#cbd5e1'; // slate-300
        ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
        ctx.shadowBlur = 3;
        ctx.fillText('Aceita o desafio? Teste agora!', canvas.width / 2, separatorY + 190);
        
        // Footer com branding elegante
        ctx.font = 'bold 32px Arial';
        ctx.fillStyle = titleGradient;
        ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
        ctx.shadowBlur = 4;
        ctx.fillText('✨ Desafio do Produtor de Eventos ✨', canvas.width / 2, separatorY + 250);
        
        setGeneratingImage(false);
        resolve(canvas.toDataURL('image/png'));
      };
      
      badgeImg.onerror = () => {
        console.error('Erro ao carregar imagem da badge');
        setGeneratingImage(false);
        resolve('');
      };
      
      badgeImg.src = mainBadge?.image || '';
    });
  };

  const handleShareImage = async () => {
    try {
      const imageDataUrl = await generateBadgeImage();
      if (!imageDataUrl) return;
      
      // Convert data URL to blob
      const response = await fetch(imageDataUrl);
      const blob = await response.blob();
      
      if (navigator.share && navigator.canShare({ files: [new File([blob], 'badge.png', { type: 'image/png' })] })) {
        await navigator.share({
          title: 'Minha Badge do Desafio do Produtor de Eventos',
          text: shareText,
          files: [new File([blob], 'badge.png', { type: 'image/png' })]
        });
      } else {
        // Fallback: download da imagem
        const link = document.createElement('a');
        link.download = 'badge-produtor-eventos.png';
        link.href = imageDataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error('Erro ao compartilhar:', error);
      // Fallback para download caso o share falhe
      const imageDataUrl = await generateBadgeImage();
      if (imageDataUrl) {
        const link = document.createElement('a');
        link.download = 'badge-produtor-eventos.png';
        link.href = imageDataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  };

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      // Poderia adicionar um toast de sucesso aqui
    } catch (error) {
      console.error('Erro ao copiar texto:', error);
    }
  };

  if (!mainBadge) return null;

  return (
    <Dialog open={isVisible} onOpenChange={onClose}>
      <DialogContent className="max-w-sm w-[calc(100vw-2rem)] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-center space-y-2">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", duration: 0.8 }}
            className="flex justify-center"
          >
            <Trophy className="w-8 h-8 text-amber-500" />
          </motion.div>
          <DialogTitle className="text-lg font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
            🎉 PARABÉNS! 🎉
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Badge principal com design luxuoso */}
          <motion.div 
            className="relative text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {/* Halo dourado atrás da badge */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 bg-gradient-to-r from-amber-400/20 to-yellow-300/20 rounded-full blur-xl"></div>
            </div>
            
            {/* Container da badge com borda dourada */}
            <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border-2 border-amber-400/50 shadow-2xl">
              {/* Estrelas decorativas */}
              <div className="absolute top-2 left-2">
                <Star className="w-4 h-4 text-amber-400 fill-current" />
              </div>
              <div className="absolute top-2 right-2">
                <Star className="w-4 h-4 text-amber-400 fill-current" />
              </div>
              <div className="absolute bottom-2 left-2">
                <Zap className="w-4 h-4 text-amber-400 fill-current" />
              </div>
              <div className="absolute bottom-2 right-2">
                <Zap className="w-4 h-4 text-amber-400 fill-current" />
              </div>
              
              {/* Badge principal */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="mb-4"
              >
                <img 
                  src={mainBadge.image} 
                  alt={mainBadge.name}
                  className="w-24 h-24 mx-auto object-contain filter drop-shadow-lg"
                />
              </motion.div>
              
              {/* Nome da conquista */}
              <h3 className="text-lg font-bold text-white mb-2">
                {mainBadge.name}
              </h3>
              
              {/* Estilo do produtor */}
              <div className="bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent font-bold text-sm mb-2">
                "{mainBadge.style}"
              </div>
              
              {/* Frase de personalidade */}
              <p className="text-xs text-slate-300 italic mb-3">
                {mainBadge.phrase}
              </p>
              
              {/* Pontuação destacada */}
              <div className="bg-gradient-to-r from-amber-400 to-amber-600 rounded-lg p-3">
                <div className="text-xl font-bold text-slate-900">
                  {totalPoints} PONTOS
                </div>
                <div className="text-[10px] text-slate-700 font-medium">
                  Que performance fantástica!
                </div>
              </div>
            </div>
          </motion.div>

          {/* Call to action provocativo */}
          <motion.div 
            className="bg-gradient-to-r from-purple-600 to-red-600 rounded-xl p-4 text-center text-white"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="font-bold text-sm mb-1">
              Você trabalha com eventos?
            </div>
            <div className="font-black text-base text-yellow-300 mb-2">
              DUVIDO FAZER MAIS PONTOS!
            </div>
            <div className="text-xs opacity-90">
              Aceita o desafio? Teste agora! 🔥
            </div>
          </motion.div>

          {/* Mensagem educacional para o eBook - redesenhada */}
          <motion.div 
            className="bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-orange-200 rounded-xl p-3 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <h4 className="font-bold text-orange-800 mb-2 text-sm flex items-center justify-center gap-1">
              🚀 Quer multiplicar seus resultados?
            </h4>
            <p className="text-xs text-orange-700 mb-2">
              Durante o jogo, você viu como <strong>organização, ferramentas de bilheteria e marketing integrado</strong> fazem a diferença. 
              Nosso eBook ensina como implementar essas estratégias na prática!
            </p>
            <div className="flex items-center justify-center gap-2 text-[10px] text-orange-600">
              <span>✓ Checklists</span>
              <span>✓ Ferramentas</span>
              <span>✓ Casos de sucesso</span>
            </div>
          </motion.div>

          {/* Botões redesenhados */}
          <div className="flex gap-2 pt-2">
            <Button
              onClick={handleShareImage}
              disabled={generatingImage}
              className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white text-xs py-3 shadow-lg"
            >
              {generatingImage ? (
                <>
                  <div className="w-3 h-3 mr-1 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Gerando...
                </>
              ) : (
                <>
                  <ImageIcon className="w-3 h-3 mr-1" />
                  Compartilhar Badge
                </>
              )}
            </Button>
            
            <Button
              onClick={onEbookClick}
              variant="outline"
              className="flex-1 border-2 border-amber-400 text-amber-600 hover:bg-amber-50 text-xs py-3 font-semibold shadow-lg"
            >
              <Download className="w-3 h-3 mr-1" />
              eBook Grátis
            </Button>
          </div>
          
          {/* Canvas hidden para gerar a imagem */}
          <canvas ref={canvasRef} style={{ display: 'none' }} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
