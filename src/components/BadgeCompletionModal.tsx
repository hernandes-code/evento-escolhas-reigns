import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
      phrase: 'Abraça a tecnologia como aliada estratégica',
      colors: {
        primary: '#3B82F6', // blue-500
        secondary: '#1D4ED8', // blue-700
        accent: '#60A5FA', // blue-400
        glow: '#3B82F6'
      }
    },
    STRATEGIC_MIND: {
      name: 'Mente Estratégica',
      description: 'Priorizou decisões estratégicas ao invés de soluções improvisadas',
      icon: '🧠',
      message: 'Sua visão estratégica se destacou! Produtores organizados criam eventos mais lucrativos.',
      image: badgeStrategicMind,
      style: 'Visionário Estratégico',
      phrase: 'Pensa três passos à frente, sempre',
      colors: {
        primary: '#8B5CF6', // violet-500
        secondary: '#7C3AED', // violet-600
        accent: '#A78BFA', // violet-400
        glow: '#8B5CF6'
      }
    },
    DATA_MASTER: {
      name: 'Mestre da Tecnologia',
      description: 'Valorizou coleta e análise de dados',
      icon: '📊',
      message: 'Dados são o combustível do sucesso! Continue usando analytics para otimizar.',
      image: badgeTechMaster,
      style: 'Analista de Performance',
      phrase: 'Transforma números em insights valiosos',
      colors: {
        primary: '#10B981', // emerald-500
        secondary: '#059669', // emerald-600
        accent: '#34D399', // emerald-400
        glow: '#10B981'
      }
    },
    RELATIONSHIP_BUILDER: {
      name: 'Agrada Multidões',
      description: 'Priorizou relacionamentos duradouros',
      icon: '🤝',
      message: 'Relacionamentos sólidos são a base do sucesso! Ferramentas de CRM ajudam a escalar.',
      image: badgeSatisfactionGuru,
      style: 'Construtor de Conexões',
      phrase: 'Cultiva relacionamentos que duram além dos eventos',
      colors: {
        primary: '#F59E0B', // amber-500
        secondary: '#D97706', // amber-600
        accent: '#FCD34D', // amber-300
        glow: '#F59E0B'
      }
    },
    PROBLEM_SOLVER: {
      name: 'Gestor de Crises',
      description: 'Transformou crises em oportunidades',
      icon: '💡',
      message: 'Sua criatividade impressiona! Sistemas de gestão dão mais tempo para focar na criatividade.',
      image: badgeCrisisManager,
      style: 'Solucionador Criativo',
      phrase: 'Transforma desafios em oportunidades brilhantes',
      colors: {
        primary: '#EF4444', // red-500
        secondary: '#DC2626', // red-600
        accent: '#F87171', // red-400
        glow: '#EF4444'
      }
    },
    TECH_ENTHUSIAST: {
      name: 'Arriscado Estratégico',
      description: 'Abraçou soluções tecnológicas',
      icon: '💻',
      message: 'Tecnologia é sua aliada! Continue explorando ferramentas que automatizam processos.',
      image: badgeRiskTaker,
      style: 'Pioneiro Digital',
      phrase: 'Sempre um passo à frente na inovação',
      colors: {
        primary: '#06B6D4', // cyan-500
        secondary: '#0891B2', // cyan-600
        accent: '#22D3EE', // cyan-400
        glow: '#06B6D4'
      }
    },
    BUDGET_CONSCIOUS: {
      name: 'Mago do Orçamento',
      description: 'Manteve equilíbrio financeiro',
      icon: '💰',
      message: 'Controle financeiro é essencial! Plataformas com dashboard financeiro facilitam essa gestão.',
      image: badgeBudgetWizard,
      style: 'Maestro Financeiro',
      phrase: 'Maximiza resultados com precisão cirúrgica no orçamento',
      colors: {
        primary: '#FB7185', // rose-400 (logo color)
        secondary: '#F43F5E', // rose-500
        accent: '#FBBF24', // amber-400
        glow: '#FB7185'
      }
    }
  };

  const shareText = `🏆 ACABEI DE CONQUISTAR A BADGE ${badges.length > 0 ? badgeDetails[badges[0] as keyof typeof badgeDetails]?.name.toUpperCase() : 'NO DESAFIO DO PRODUTOR DE EVENTOS'}!

🔥 ${totalPoints} PONTOS - Que performance incrível!

💪 Você trabalha com eventos? DUVIDO fazer mais pontos que eu!

🚀 Aceita o desafio? Teste agora: [LINK_DO_JOGO]

#EventosDigitais #ProducaoEventos #Desafio #TopPerformance`;

  const generateBadgeImage = async () => {
    if (!badges.length || !canvasRef.current) return null;
    
    setGeneratingImage(true);
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    
    // Formato Instagram Story (9:16)
    canvas.width = 1080;
    canvas.height = 1920;
    
    // Background gradient épico
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#1e1b4b');
    gradient.addColorStop(0.3, '#312e81');
    gradient.addColorStop(0.7, '#7c3aed');
    gradient.addColorStop(1, '#1e1b4b');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Efeitos de partículas douradas
    ctx.fillStyle = '#fbbf24';
    for (let i = 0; i < 80; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const size = Math.random() * 6 + 2;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Estrelas brilhantes
    ctx.fillStyle = '#ffffff';
    for (let i = 0; i < 30; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const size = Math.random() * 3 + 1;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }
    
    const badgeImg = new Image();
    const mainBadge = badgeDetails[badges[0] as keyof typeof badgeDetails];
    const badgeColors = mainBadge?.colors;
    
    return new Promise<string>((resolve) => {
      badgeImg.onload = () => {
        // Background gradient metálico com cores específicas da badge
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, '#1e293b'); // slate-800
        gradient.addColorStop(0.3, '#374151'); // gray-700
        gradient.addColorStop(0.7, badgeColors?.secondary || '#94a3b8'); // cor secundária da badge
        gradient.addColorStop(1, '#1e293b'); // slate-800
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Efeitos de partículas com cores da badge
        ctx.fillStyle = badgeColors?.primary || '#f97316'; // cor primária da badge
        for (let i = 0; i < 60; i++) {
          const x = Math.random() * canvas.width;
          const y = Math.random() * canvas.height;
          const size = Math.random() * 4 + 1;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }
        
        // Estrelas menores para efeito metálico com cor de destaque da badge
        ctx.fillStyle = badgeColors?.accent || '#fb923c';
        for (let i = 0; i < 20; i++) {
          const x = Math.random() * canvas.width;
          const y = Math.random() * canvas.height;
          const size = Math.random() * 2 + 1;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }
        
        // Texto "CARD LENDÁRIO" épico no topo com cores da badge
        ctx.textAlign = 'center';
        ctx.font = 'bold 70px Arial';
        ctx.fillStyle = badgeColors?.primary || '#f97316';
        ctx.strokeStyle = badgeColors?.secondary || '#ea580c';
        ctx.lineWidth = 4;
        ctx.strokeText('⭐ CARD LENDÁRIO ⭐', canvas.width / 2, 180);
        ctx.fillText('⭐ CARD LENDÁRIO ⭐', canvas.width / 2, 180);
        
        // Badge centralizada SEM distorção - MUITO MAIOR para ser o ponto focal
        const maxBadgeSize = 600; // Aumentado de 400 para 600
        const badgeRatio = badgeImg.width / badgeImg.height;
        let badgeWidth, badgeHeight;
        
        if (badgeRatio > 1) {
          // Imagem mais larga que alta
          badgeWidth = maxBadgeSize;
          badgeHeight = maxBadgeSize / badgeRatio;
        } else {
          // Imagem mais alta que larga
          badgeHeight = maxBadgeSize;
          badgeWidth = maxBadgeSize * badgeRatio;
        }
        
        const badgeX = (canvas.width - badgeWidth) / 2;
        const badgeY = (canvas.height - badgeHeight) / 2 - 50; // Menos offset para centralizar melhor
        
        // Múltiplos glows para efeito metálico MAIS INTENSO
        for (let i = 0; i < 5; i++) {
          ctx.shadowColor = '#fb923c'; // orange-400
          ctx.shadowBlur = 120 - (i * 20); // Aumentado o blur
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 0;
          ctx.drawImage(badgeImg, badgeX, badgeY, badgeWidth, badgeHeight);
        }
        
        // Reset shadow
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        
        // Nome da badge com efeito metálico - posição ajustada
        ctx.font = 'bold 68px Arial'; // Ligeiramente menor
        ctx.fillStyle = '#ffffff';
        ctx.strokeStyle = '#0f172a'; // slate-900
        ctx.lineWidth = 3;
        ctx.strokeText(mainBadge?.name || '', canvas.width / 2, badgeY + badgeHeight + 80); // Ajustado
        ctx.fillText(mainBadge?.name || '', canvas.width / 2, badgeY + badgeHeight + 80);
        
        // Subtitle "CONQUISTADA!" com cores da badge
        ctx.font = 'bold 44px Arial';
        ctx.fillStyle = badgeColors?.accent || '#fb923c';
        ctx.fillText('CONQUISTADA!', canvas.width / 2, badgeY + badgeHeight + 130);
        
        // Pontos em destaque com cores da badge
        ctx.font = 'bold 60px Arial';
        ctx.fillStyle = '#ffffff';
        ctx.strokeStyle = badgeColors?.primary || '#f97316';
        ctx.lineWidth = 2;
        ctx.strokeText(`${totalPoints} PONTOS`, canvas.width / 2, badgeY + badgeHeight + 190);
        ctx.fillText(`${totalPoints} PONTOS`, canvas.width / 2, badgeY + badgeHeight + 190);
        
        // Separador metálico com cores da badge
        const lineY = badgeY + badgeHeight + 220;
        const lineGradient = ctx.createLinearGradient(canvas.width / 2 - 200, lineY, canvas.width / 2 + 200, lineY);
        lineGradient.addColorStop(0, 'transparent');
        lineGradient.addColorStop(0.2, badgeColors?.primary || '#f97316');
        lineGradient.addColorStop(0.5, badgeColors?.accent || '#fb923c');
        lineGradient.addColorStop(0.8, badgeColors?.primary || '#f97316');
        lineGradient.addColorStop(1, 'transparent');
        ctx.fillStyle = lineGradient;
        ctx.fillRect(canvas.width / 2 - 200, lineY, 400, 8);
        
        // Frase de desafio épica com cores da badge
        ctx.font = 'bold 50px Arial';
        ctx.fillStyle = badgeColors?.primary || '#f97316';
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 2;
        ctx.strokeText('Você, produtor,', canvas.width / 2, lineY + 70);
        ctx.fillText('Você, produtor,', canvas.width / 2, lineY + 70);
        
        ctx.strokeText('consegue mais pontos?', canvas.width / 2, lineY + 130);
        ctx.fillText('consegue mais pontos?', canvas.width / 2, lineY + 130);
        
        // Footer elegante - posição ajustada
        ctx.font = 'bold 32px Arial'; // Ligeiramente menor
        ctx.fillStyle = '#e2e8f0'; // slate-200
        ctx.fillText('Desafio do Produtor de Eventos', canvas.width / 2, canvas.height - 80); // Movido mais para cima
        
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
        link.download = 'minha-badge-eventos.png';
        link.href = imageDataUrl;
        link.click();
      }
    } catch (error) {
      console.log('Erro ao compartilhar imagem:', error);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-slate-100/90 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto"
          onClick={() => onClose()}
        >
          <motion.div
            initial={{ scale: 0.3, rotateY: 180, opacity: 0 }}
            animate={{ scale: 1, rotateY: 0, opacity: 1 }}
            exit={{ scale: 0.3, rotateY: -180, opacity: 0 }}
            transition={{ 
              type: "spring", 
              damping: 15, 
              stiffness: 100,
              duration: 0.8 
            }}
            className="relative w-full max-w-sm sm:max-w-md mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Card épico com gradiente metálico e paleta do site */}
            <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-center shadow-2xl border-4 border-orange-400 overflow-hidden">
              {/* Efeito de brilho metálico animado */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-200/30 to-transparent -skew-x-12 animate-pulse"></div>
              
              {/* Textura metálica sutil */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400/10 via-transparent to-orange-600/10 opacity-50"></div>
              
              {/* Partículas douradas flutuantes */}
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(15)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 sm:w-2 sm:h-2 bg-orange-400 rounded-full"
                    initial={{ 
                      x: Math.random() * (window.innerWidth < 640 ? 250 : 350),
                      y: Math.random() * (window.innerWidth < 640 ? 400 : 500),
                      opacity: 0
                    }}
                    animate={{ 
                      y: [Math.random() * (window.innerWidth < 640 ? 400 : 500), -50],
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0]
                    }}
                    transition={{ 
                      duration: 3 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 2
                    }}
                  />
                ))}
              </div>
              
              {/* Header épico */}
              <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="relative z-10"
              >
                <h2 className="text-2xl sm:text-4xl font-bold text-orange-400 mb-2 drop-shadow-lg">
                  ⭐ CARD LENDÁRIO ⭐
                </h2>
                <div className="text-lg sm:text-xl text-orange-200 font-semibold">
                  CONQUISTADO!
                </div>
              </motion.div>

              {/* Badge com efeito holográfico metálico */}
              <motion.div
                initial={{ scale: 0, rotateZ: 360 }}
                animate={{ scale: 1, rotateZ: 0 }}
                transition={{ delay: 0.5, type: "spring", damping: 10 }}
                className="my-6 sm:my-8 relative"
              >
                <div className="relative w-32 h-32 sm:w-48 sm:h-48 mx-auto">
                  {/* Múltiplos glows para efeito metálico */}
                  <div className="absolute inset-0 bg-orange-400 rounded-full blur-xl opacity-40 animate-pulse"></div>
                  <div className="absolute inset-1 sm:inset-2 bg-orange-500 rounded-full blur-lg opacity-25 animate-pulse" style={{animationDelay: '0.5s'}}></div>
                  <div className="absolute inset-2 sm:inset-4 bg-yellow-400 rounded-full blur-md opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
                  
                  <img 
                    src={badgeDetails[badges[0] as keyof typeof badgeDetails]?.image} 
                    alt="Badge"
                    className="relative z-10 w-full h-full object-contain drop-shadow-2xl"
                  />
                </div>
              </motion.div>

              {/* Nome da badge */}
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="relative z-10"
              >
                <h3 className="text-lg sm:text-2xl font-bold text-white mb-2 drop-shadow-lg">
                  {badgeDetails[badges[0] as keyof typeof badgeDetails]?.name}
                </h3>
                <p className="text-orange-300 font-semibold text-base sm:text-lg">
                  {totalPoints} PONTOS
                </p>
              </motion.div>

              {/* Separador épico metálico */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.9 }}
                className="w-24 sm:w-32 h-1 bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-400 mx-auto my-4 sm:my-6 rounded-full shadow-lg"
              ></motion.div>

              {/* Call to action épico */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.1 }}
                className="relative z-10 text-center"
              >
                <p className="text-orange-100 font-bold mb-4 text-sm sm:text-base">
                  Compartilhe seu card épico!
                </p>
                
                <div className="flex flex-col gap-3 justify-center">
                  <button
                    onClick={handleShareImage}
                    disabled={generatingImage}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-4 py-3 rounded-xl font-bold transition-all transform hover:scale-105 disabled:opacity-50 shadow-lg text-sm"
                  >
                    {generatingImage ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Gerando...
                      </div>
                    ) : (
                      '� Compartilhe e desafie um produtor!'
                    )}
                  </button>
                  
                  <button
                    onClick={onEbookClick}
                    className="w-full bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white px-4 py-3 rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg text-sm border border-orange-400/30"
                  >
                    📖 Receba o eBook e acesso à comunidade!
                  </button>
                </div>
              </motion.div>

              {/* Badge do canto com design metálico - posicionamento ajustado */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 1.3, type: "spring" }}
                className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-gradient-to-r from-orange-400 to-yellow-400 text-slate-900 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold shadow-lg border border-orange-300 z-30"
              >
                LENDÁRIO ✨
              </motion.div>
            </div>
            
            {/* Canvas invisível para geração da imagem */}
            <canvas ref={canvasRef} className="hidden" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}