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
    
    return new Promise<string>((resolve) => {
      badgeImg.onload = () => {
        // Texto "CARD RARO" épico no topo
        ctx.textAlign = 'center';
        ctx.font = 'bold 80px Arial';
        ctx.fillStyle = '#fbbf24';
        ctx.strokeStyle = '#92400e';
        ctx.lineWidth = 4;
        ctx.strokeText('⭐ CARD RARO ⭐', canvas.width / 2, 200);
        ctx.fillText('⭐ CARD RARO ⭐', canvas.width / 2, 200);
        
        // Badge centralizada com glow effect
        const badgeSize = 500;
        const badgeX = (canvas.width - badgeSize) / 2;
        const badgeY = (canvas.height - badgeSize) / 2 - 150;
        
        // Múltiplos glows para efeito holográfico
        for (let i = 0; i < 3; i++) {
          ctx.shadowColor = '#fbbf24';
          ctx.shadowBlur = 80 - (i * 20);
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 0;
          ctx.drawImage(badgeImg, badgeX, badgeY, badgeSize, badgeSize);
        }
        
        // Reset shadow
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        
        // Nome da badge com efeito épico
        ctx.font = 'bold 72px Arial';
        ctx.fillStyle = '#ffffff';
        ctx.strokeStyle = '#1e1b4b';
        ctx.lineWidth = 3;
        ctx.strokeText(mainBadge?.name || '', canvas.width / 2, badgeY + badgeSize + 100);
        ctx.fillText(mainBadge?.name || '', canvas.width / 2, badgeY + badgeSize + 100);
        
        // Subtitle épico
        ctx.font = 'bold 48px Arial';
        ctx.fillStyle = '#fbbf24';
        ctx.fillText('CONQUISTADA!', canvas.width / 2, badgeY + badgeSize + 160);
        
        // Pontos em destaque
        ctx.font = 'bold 64px Arial';
        ctx.fillStyle = '#ffffff';
        ctx.strokeStyle = '#7c3aed';
        ctx.lineWidth = 2;
        ctx.strokeText(`${totalPoints} PONTOS`, canvas.width / 2, badgeY + badgeSize + 240);
        ctx.fillText(`${totalPoints} PONTOS`, canvas.width / 2, badgeY + badgeSize + 240);
        
        // Footer minimalista
        ctx.font = 'bold 42px Arial';
        ctx.fillStyle = '#e5e7eb';
        ctx.fillText('Desafio do Produtor de Eventos', canvas.width / 2, canvas.height - 150);
        
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
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
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
            className="relative w-full max-w-md mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Card épico com gradiente holográfico */}
            <div className="relative bg-gradient-to-br from-purple-900 via-blue-900 to-purple-900 rounded-3xl p-8 text-center shadow-2xl border-4 border-yellow-400 overflow-hidden">
              {/* Efeito de brilho animado */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-pulse"></div>
              
              {/* Partículas douradas flutuantes */}
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                    initial={{ 
                      x: Math.random() * 400,
                      y: Math.random() * 600,
                      opacity: 0
                    }}
                    animate={{ 
                      y: [Math.random() * 600, -50],
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
                <h2 className="text-4xl font-bold text-yellow-400 mb-2 drop-shadow-lg">
                  ⭐ CARD RARO ⭐
                </h2>
                <div className="text-xl text-yellow-200 font-semibold">
                  CONQUISTADO!
                </div>
              </motion.div>

              {/* Badge com efeito holográfico */}
              <motion.div
                initial={{ scale: 0, rotateZ: 360 }}
                animate={{ scale: 1, rotateZ: 0 }}
                transition={{ delay: 0.5, type: "spring", damping: 10 }}
                className="my-8 relative"
              >
                <div className="relative w-48 h-48 mx-auto">
                  {/* Múltiplos glows para efeito holográfico */}
                  <div className="absolute inset-0 bg-yellow-400 rounded-full blur-xl opacity-30 animate-pulse"></div>
                  <div className="absolute inset-2 bg-purple-400 rounded-full blur-lg opacity-20 animate-pulse" style={{animationDelay: '0.5s'}}></div>
                  <div className="absolute inset-4 bg-blue-400 rounded-full blur-md opacity-15 animate-pulse" style={{animationDelay: '1s'}}></div>
                  
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
                <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
                  {badgeDetails[badges[0] as keyof typeof badgeDetails]?.name}
                </h3>
                <p className="text-yellow-200 font-semibold text-lg">
                  {totalPoints} PONTOS
                </p>
              </motion.div>

              {/* Separador épico */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.9 }}
                className="w-32 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto my-6 rounded-full"
              ></motion.div>

              {/* Call to action épico */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.1 }}
                className="relative z-10 text-center"
              >
                <p className="text-yellow-100 font-bold mb-4">
                  Compartilhe seu card épico!
                </p>
                
                <div className="flex gap-2 justify-center">
                  <button
                    onClick={handleShareImage}
                    disabled={generatingImage}
                    className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-bold transition-all transform hover:scale-105 disabled:opacity-50 shadow-lg"
                  >
                    {generatingImage ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Gerando...
                      </div>
                    ) : (
                      '📸 Stories'
                    )}
                  </button>
                  
                  <button
                    onClick={onEbookClick}
                    className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-6 py-3 rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg"
                  >
                    📖 eBook
                  </button>
                </div>
              </motion.div>

              {/* Badge do canto */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 1.3, type: "spring" }}
                className="absolute top-4 right-4 bg-yellow-400 text-purple-900 px-3 py-1 rounded-full text-sm font-bold"
              >
                RARO ✨
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