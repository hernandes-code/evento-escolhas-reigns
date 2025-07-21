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
      message: 'Dados são seus aliados! Você entende que métricas orientam decisões vencedoras.',
      image: badgeTechMaster,
      style: 'Data-Driven Genius',
      phrase: 'Transforma números em estratégias certeiras'
    },
    BUDGET_MASTER: {
      name: 'Mago do Orçamento',
      description: 'Demonstrou controle financeiro excepcional',
      icon: '💰',
      message: 'ROI é sua especialidade! Você sabe maximizar resultados com recursos limitados.',
      image: badgeBudgetWizard,
      style: 'Financial Strategist',
      phrase: 'Cada real investido tem propósito claro'
    },
    CLIENT_GURU: {
      name: 'Guru da Satisfação',
      description: 'Priorizou experiência do cliente acima de tudo',
      icon: '⭐',
      message: 'Clientes felizes são seu maior patrimônio! Você cria experiências inesquecíveis.',
      image: badgeSatisfactionGuru,
      style: 'Experience Architect',
      phrase: 'Transforma eventos em memórias preciosas'
    },
    RISK_MASTER: {
      name: 'Tomador de Riscos',
      description: 'Ousou em decisões críticas e colheu frutos',
      icon: '🎲',
      message: 'Coragem calculada te diferencia! Grandes resultados exigem grandes apostas.',
      image: badgeRiskTaker,
      style: 'Bold Innovator',
      phrase: 'Transforma incertezas em oportunidades'
    },
    CRISIS_HERO: {
      name: 'Herói das Crises',
      description: 'Transformou obstáculos em trampolins',
      icon: '🚨',
      message: 'Pressão te fortalece! Você prospera onde outros desistem.',
      image: badgeCrisisManager,
      style: 'Crisis Navigator',
      phrase: 'Encontra soluções onde outros veem problemas'
    }
  };

  const shareText = `🏆 ACABEI DE CONQUISTAR A BADGE ${badges.length > 0 ? badgeDetails[badges[0] as keyof typeof badgeDetails]?.name.toUpperCase() : 'NO DESAFIO DO PRODUTOR DE EVENTOS'}!

💪 Perfil: ${badgeDetails[badges[0] as keyof typeof badgeDetails]?.style}
✨ ${badgeDetails[badges[0] as keyof typeof badgeDetails]?.phrase}

🎯 PONTUAÇÃO: ${totalPoints} pontos

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
    
    const badgeImg = new Image();
    const mainBadge = badgeDetails[badges[0] as keyof typeof badgeDetails];
    
    return new Promise<string>((resolve) => {
      badgeImg.onload = () => {
        // Background gradient metálico com paleta do site
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, '#0f172a'); // slate-900
        gradient.addColorStop(0.3, '#1e293b'); // slate-800
        gradient.addColorStop(0.7, '#ea580c'); // orange-600 do site
        gradient.addColorStop(1, '#0f172a'); // slate-900
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Efeitos de partículas douradas SUBINDO com movimento
        ctx.fillStyle = '#fb923c'; // orange-400
        for (let i = 0; i < 80; i++) {
          const x = Math.random() * canvas.width;
          const baseY = Math.random() * canvas.height;
          // Partículas subindo - distribuição vertical com movimento ascendente
          const y = baseY - (i * 8) % (canvas.height * 0.3);
          const size = Math.random() * 5 + 2;
          
          // Efeito de brilho nas partículas
          ctx.shadowColor = '#fb923c';
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }
        
        // Estrelas menores SUBINDO para efeito metálico épico
        ctx.fillStyle = '#fbbf24'; // amber-400
        ctx.shadowColor = '#fbbf24';
        ctx.shadowBlur = 12;
        for (let i = 0; i < 40; i++) {
          const x = Math.random() * canvas.width;
          const baseY = Math.random() * canvas.height;
          // Movimento ascendente mais pronunciado
          const y = baseY - (i * 12) % (canvas.height * 0.4);
          const size = Math.random() * 3 + 1;
          
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }
        
        // Reset shadow após partículas
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        
        // Texto "CARD LENDÁRIO" épico no topo - posição ajustada
        ctx.textAlign = 'center';
        ctx.font = 'bold 70px Arial'; // Reduzido um pouco para dar mais espaço
        ctx.fillStyle = '#fb923c'; // orange-400
        ctx.strokeStyle = '#ea580c'; // orange-600
        ctx.lineWidth = 4;
        ctx.strokeText('⭐ CARD LENDÁRIO ⭐', canvas.width / 2, 180); // Movido mais para cima
        ctx.fillText('⭐ CARD LENDÁRIO ⭐', canvas.width / 2, 180);
        
        // Badge centralizada SEM distorção - MUITO MAIOR para ser o ponto focal
        const maxBadgeSize = 1200; // Dobrado de 600 para 1200 para maior destaque
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
        const badgeY = (canvas.height - badgeHeight) / 2 - 150; // Ajustado para acomodar a carta maior
        
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
        
        // Subtitle "CONQUISTADA!"
        ctx.font = 'bold 44px Arial'; // Ligeiramente menor
        ctx.fillStyle = '#fbbf24'; // amber-400
        ctx.fillText('CONQUISTADA!', canvas.width / 2, badgeY + badgeHeight + 130); // Ajustado
        
        // Pontos em destaque
        ctx.font = 'bold 60px Arial'; // Ligeiramente menor
        ctx.fillStyle = '#ffffff';
        ctx.strokeStyle = '#ea580c'; // orange-600
        ctx.lineWidth = 2;
        ctx.strokeText(`${totalPoints} PONTOS`, canvas.width / 2, badgeY + badgeHeight + 190); // Ajustado
        ctx.fillText(`${totalPoints} PONTOS`, canvas.width / 2, badgeY + badgeHeight + 190);
        
        // Separador metálico - posição ajustada
        const lineY = badgeY + badgeHeight + 220; // Ajustado
        const lineGradient = ctx.createLinearGradient(canvas.width / 2 - 200, lineY, canvas.width / 2 + 200, lineY);
        lineGradient.addColorStop(0, 'transparent');
        lineGradient.addColorStop(0.2, '#fb923c');
        lineGradient.addColorStop(0.5, '#fbbf24');
        lineGradient.addColorStop(0.8, '#fb923c');
        lineGradient.addColorStop(1, 'transparent');
        ctx.fillStyle = lineGradient;
        ctx.fillRect(canvas.width / 2 - 200, lineY, 400, 8);
        
        // Frase de desafio épica - posição ajustada
        ctx.font = 'bold 50px Arial'; // Ligeiramente menor
        ctx.fillStyle = '#fb923c'; // orange-400
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 2;
        ctx.strokeText('Você, produtor,', canvas.width / 2, lineY + 70); // Ajustado
        ctx.fillText('Você, produtor,', canvas.width / 2, lineY + 70);
        
        ctx.strokeText('consegue mais pontos?', canvas.width / 2, lineY + 130); // Ajustado
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
          title: 'Desafio do Produtor de Eventos',
          text: shareText,
          files: [new File([blob], 'badge.png', { type: 'image/png' })]
        });
      } else {
        // Fallback: Download da imagem
        const link = document.createElement('a');
        link.download = 'minha-badge.png';
        link.href = imageDataUrl;
        link.click();
      }
    } catch (error) {
      console.log('Erro ao compartilhar imagem:', error);
    }
  };

  const mainBadge = badges.length > 0 ? badgeDetails[badges[0] as keyof typeof badgeDetails] : null;

  if (!isVisible || !mainBadge) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-slate-950/90 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-sm sm:max-w-md bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 border border-emerald-400/30 rounded-2xl p-4 sm:p-6 shadow-2xl overflow-hidden my-4 max-h-[95vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Partículas flutuando para cima - efeito carta lendária */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(25)].map((_, i) => (
                <motion.div
                  key={`particle-${i}`}
                  className="absolute w-2 h-2 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full shadow-lg"
                  initial={{ 
                    x: Math.random() * 400 - 50,
                    y: 600,
                    opacity: 0,
                    scale: Math.random() * 0.8 + 0.4
                  }}
                  animate={{ 
                    y: -100,
                    opacity: [0, 1, 1, 0],
                    scale: [0.4, 1, 0.8, 0]
                  }}
                  transition={{ 
                    duration: Math.random() * 3 + 2,
                    delay: Math.random() * 4,
                    repeat: Infinity,
                    ease: "easeOut"
                  }}
                />
              ))}
              
              {/* Partículas maiores mais esparsas */}
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={`large-particle-${i}`}
                  className="absolute w-1 h-1 bg-yellow-300 rounded-full opacity-80"
                  initial={{ 
                    x: Math.random() * 350,
                    y: 500,
                    opacity: 0
                  }}
                  animate={{ 
                    y: -80,
                    x: Math.random() * 350,
                    opacity: [0, 0.8, 0.8, 0]
                  }}
                  transition={{ 
                    duration: Math.random() * 4 + 3,
                    delay: Math.random() * 5,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              ))}
              
              {/* Estrelas cintilantes */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={`star-${i}`}
                  className="absolute text-yellow-300 text-xs"
                  style={{ 
                    left: `${Math.random() * 90}%`,
                    top: `${Math.random() * 80 + 10}%`
                  }}
                  animate={{ 
                    scale: [1, 1.3, 1],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{ 
                    duration: 1.5,
                    delay: Math.random() * 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  ✨
                </motion.div>
              ))}
            </div>

            {/* Efeitos de fundo com cores do site */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-0 w-32 h-32 bg-emerald-400 rounded-full blur-3xl"></div>
              <div className="absolute top-1/2 right-0 w-24 h-24 bg-amber-400 rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 left-1/3 w-28 h-28 bg-orange-500 rounded-full blur-3xl"></div>
            </div>

            {/* Botão fechar elegante */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 bg-slate-700/50 hover:bg-slate-600/50 rounded-full flex items-center justify-center text-orange-100 hover:text-white transition-all z-20"
            >
              ✕
            </button>

            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="relative z-10 text-center mb-4"
            >
              {/* Título com efeito de aparição dramático */}
              <motion.h1 
                initial={{ scale: 0, y: -30 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ delay: 1.8, type: "spring", damping: 10 }}
                className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 mb-1"
              >
                🏆 BADGE CONQUISTADA!
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.0 }}
                className="text-orange-200/80 text-xs sm:text-sm"
              >
                Parabéns! Você demonstrou excelência em produção de eventos!
              </motion.p>
            </motion.div>

            {/* Badge principal com animação ÉPICA estilo Pokémon */}
            <motion.div
              initial={{ scale: 0, y: -200, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              transition={{ 
                delay: 0.4, 
                type: "spring", 
                damping: 12,
                stiffness: 200,
                duration: 1.2
              }}
              className="relative z-10 flex flex-col items-center mb-4"
            >
              {/* Explosão de luz de fundo - efeito Pokémon */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 2, 1.5], opacity: [0, 0.8, 0.3] }}
                transition={{ delay: 0.8, duration: 1.5, ease: "easeOut" }}
                className="absolute inset-0 bg-gradient-radial from-yellow-200/60 via-orange-300/40 to-transparent rounded-full blur-3xl scale-[300%]"
              ></motion.div>
              
              {/* Glow effect mais intenso */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.0, duration: 0.8 }}
                className="absolute inset-0 bg-gradient-to-r from-emerald-400/40 to-cyan-400/40 rounded-full blur-2xl scale-150"
              ></motion.div>
              
              {/* Badge com efeito RESPIRAR ao invés de girar */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ 
                  scale: [0, 1.3, 1],
                }}
                transition={{ 
                  delay: 1.2,
                  duration: 0.8,
                  ease: "backOut"
                }}
                className="relative mb-2"
              >
                <motion.img 
                  src={mainBadge.image}
                  alt={mainBadge.name}
                  className="w-32 h-32 sm:w-36 sm:h-36 object-contain relative z-10 drop-shadow-2xl"
                  animate={{ 
                    scale: [1, 1.05, 1],
                    filter: ["brightness(1)", "brightness(1.1)", "brightness(1)"]
                  }}
                  transition={{ 
                    duration: 2.5, 
                    repeat: Infinity, 
                    ease: "easeInOut"
                  }}
                />
                
                {/* Anel pulsante ao invés de rotativo */}
                <motion.div 
                  className="absolute inset-0 border-4 border-emerald-400 rounded-full opacity-60"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.6, 0.9, 0.6]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    ease: "easeInOut"
                  }}
                ></motion.div>
                
                {/* Anel externo com pulso diferente */}
                <motion.div 
                  className="absolute inset-0 border-2 border-amber-300 rounded-full opacity-40 scale-110"
                  animate={{ 
                    scale: [1.1, 1.2, 1.1],
                    opacity: [0.4, 0.7, 0.4]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                ></motion.div>
              </motion.div>
            </motion.div>

            {/* Informações da badge com entrada sequencial */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 2.2 }}
              className="relative z-10 text-center mb-4"
            >
              <motion.h2 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 2.4 }}
                className="text-lg sm:text-xl font-bold text-orange-100 mb-1"
              >
                {mainBadge.name}
              </motion.h2>
              
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 2.6 }}
                className="text-orange-200/80 text-xs sm:text-sm mb-2"
              >
                {mainBadge.message}
              </motion.p>
              
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 2.8 }}
                className="bg-slate-700/30 rounded-lg p-2 border border-emerald-400/20"
              >
                <p className="text-orange-300 font-semibold text-base sm:text-lg">
                  {totalPoints} pontos conquistados
                </p>
                <p className="text-orange-200/60 text-xs mt-1">
                  Estilo: {mainBadge.style}
                </p>
              </motion.div>
            </motion.div>

            {/* Frase motivacional com entrada elegante */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 3.0 }}
              className="relative z-10 text-center mb-4"
            >
              <motion.p 
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ delay: 3.2, type: "spring" }}
                className="text-amber-300 font-medium text-xs sm:text-sm italic mb-2"
              >
                "{mainBadge.phrase}"
              </motion.p>
              
              {/* Lição educativa com CTA */}
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 3.4 }}
                className="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-400/30 rounded-lg p-3 mb-2"
              >
                <div className="flex items-start gap-2">
                  <span className="text-lg">💡</span>
                  <div className="text-left">
                    <h3 className="text-orange-200 font-bold text-xs sm:text-sm mb-1">
                      Lição do Produtor Experiente:
                    </h3>
                    <p className="text-orange-100/90 text-xs leading-relaxed">
                      Produtores que <strong>saem da estrada tradicional</strong> e usam plataformas completas <strong>vendem 3x mais ingressos</strong> e economizam <strong>15 horas por semana</strong>. Hora de abrir seu próprio caminho!
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Botões de ação com entrada final */}
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 3.6 }}
              className="relative z-10 text-center"
            >
              <div className="flex flex-col gap-3 justify-center">
                {/* Botão principal - eBook (destaque) */}
                <motion.button
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 3.8 }}
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={onEbookClick}
                  className="relative w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-4 py-3 rounded-xl font-bold transition-all shadow-xl text-sm border-2 border-green-400/50 overflow-hidden"
                >
                  {/* Efeito de brilho animado */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                  <div className="relative flex items-center justify-center gap-2">
                    <span className="text-lg">🚀</span>
                    <div className="text-center">
                      <div className="font-black text-sm sm:text-base">RECEBA O EBOOK GRATUITO</div>
                      <div className="text-xs opacity-90">+ Acesso à Comunidade Exclusiva</div>
                    </div>
                  </div>
                </motion.button>
                
                {/* Botão secundário - Compartilhar */}
                <motion.button
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 4.0 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleShareImage}
                  disabled={generatingImage}
                  className="w-full bg-gradient-to-r from-emerald-500/80 to-cyan-600/80 hover:from-emerald-600/90 hover:to-cyan-700/90 text-white px-4 py-3 rounded-lg font-semibold transition-all shadow-md text-sm border border-emerald-400/30"
                >
                  {generatingImage ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Gerando...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <span>📱</span>
                      <span>Compartilhar e desafiar amigos</span>
                    </div>
                  )}
                </motion.button>
              </div>
            </motion.div>

            {/* Badge do canto com entrada espetacular */}
            <motion.div
              initial={{ scale: 0, rotate: -180, x: 50, y: -50 }}
              animate={{ scale: 1, rotate: 0, x: 0, y: 0 }}
              transition={{ delay: 4.2, type: "spring", damping: 15 }}
              className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-900 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold shadow-lg border border-emerald-300 z-30"
            >
              LENDÁRIO ✨
            </motion.div>

            {/* Canvas invisível para geração da imagem */}
            <canvas ref={canvasRef} className="hidden" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
