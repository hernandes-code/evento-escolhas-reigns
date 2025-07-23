import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  Star, 
  Zap, 
  Target, 
  TrendingUp, 
  Gift, 
  Clock, 
  CheckCircle, 
  ArrowRight,
  Sparkles,
  Crown,
  Diamond,
  Rocket
} from 'lucide-react';

interface OfertaFinalProps {
  gameResult: {
    userName: string;
    profile?: Record<string, number>;
    neuralProfile?: Record<string, number>;
    choices?: string[];
    visionTypes?: string[];
    dominantCategory?: string;
    dominantVision?: string;
    totalScenarios: number;
    gameType: string;
  };
}

interface PersonalityInsight {
  title: string;
  description: string;
  percentage: number;
  color: string;
  icon: React.ReactNode;
}

const getPersonalityInsights = (profile: Record<string, number>, visionTypes: string[]): PersonalityInsight[] => {
  const insights: PersonalityInsight[] = [];
  const maxScore = Math.max(...Object.values(profile));
  
  // Calcular insights baseados no perfil do produtor
  Object.entries(profile).forEach(([key, value]) => {
    const percentage = Math.round((value / maxScore) * 100);
    
    const insightMap: Record<string, PersonalityInsight> = {
      vendas: {
        title: "Especialista em Vendas",
        description: "Você domina técnicas de conversão e aceleração de vendas",
        percentage,
        color: "from-green-400 to-emerald-400",
        icon: <TrendingUp className="w-6 h-6" />
      },
      digital: {
        title: "Master Digital",
        description: "Você entende como usar a tecnologia para maximizar resultados",
        percentage,
        color: "from-blue-400 to-cyan-400",
        icon: <Zap className="w-6 h-6" />
      },
      diferenciacao: {
        title: "Criador de Experiências",
        description: "Você sabe como se destacar em meio à concorrência",
        percentage,
        color: "from-purple-400 to-pink-400",
        icon: <Sparkles className="w-6 h-6" />
      },
      competicao: {
        title: "Estrategista Competitivo",
        description: "Você transforma desafios em oportunidades de crescimento",
        percentage,
        color: "from-orange-400 to-red-400",
        icon: <Target className="w-6 h-6" />
      },
      network: {
        title: "Construtor de Relacionamentos",
        description: "Você sabe ativar sua rede para resolver problemas complexos",
        percentage,
        color: "from-pink-400 to-rose-400",
        icon: <Star className="w-6 h-6" />
      },
      dados: {
        title: "Analista de Performance",
        description: "Você usa dados para otimizar cada campanha e resultado",
        percentage,
        color: "from-violet-400 to-purple-400",
        icon: <Brain className="w-6 h-6" />
      }
    };
    
    if (insightMap[key] && percentage > 60) {
      insights.push(insightMap[key]);
    }
  });
  
  return insights.slice(0, 3); // Top 3 insights
};

const getDominantPersonality = (dominantVision: string) => {
  const personalityMap: Record<string, { title: string; description: string; level: string }> = {
    "value_focus": {
      title: "PRODUTOR ESTRATÉGICO NÍVEL MASTER",
      description: "Você entende que valor percebido é mais importante que preço baixo",
      level: "MASTER"
    },
    "data_driven": {
      title: "PRODUTOR ANALÍTICO NÍVEL EXPERT",
      description: "Você usa dados para otimizar cada campanha e maximizar resultados",
      level: "EXPERT"
    },
    "competitive": {
      title: "PRODUTOR COMPETITIVO NÍVEL LEGEND",
      description: "Você transforma concorrência em oportunidade de diferenciação",
      level: "LEGEND"
    },
    "smart_partnership": {
      title: "PRODUTOR RELACIONADOR NÍVEL PRO",
      description: "Você sabe criar parcerias que beneficiam todos os envolvidos",
      level: "PRO"
    },
    "problem_solver": {
      title: "PRODUTOR SOLUCIONADOR NÍVEL GENIUS",
      description: "Você encontra saídas criativas para os maiores desafios",
      level: "GENIUS"
    }
  };
  
  return personalityMap[dominantVision] || {
    title: "PRODUTOR COMPLETO NÍVEL SUPREME",
    description: "Seu perfil equilibrado permite adaptar-se a qualquer situação",
    level: "SUPREME"
  };
};

export const OfertaFinal: React.FC<OfertaFinalProps> = ({ gameResult }) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [visitorsWatching, setVisitorsWatching] = useState(847);
  const [unitsLeft, setUnitsLeft] = useState(23);
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutos
  
  // Compatibilidade com diferentes tipos de resultado
  const profile = gameResult.profile || gameResult.neuralProfile || {};
  const types = gameResult.choices || gameResult.visionTypes || [];
  const dominantType = gameResult.dominantCategory || gameResult.dominantVision || '';
  
  const insights = getPersonalityInsights(profile, types);
  const dominantPersonality = getDominantPersonality(dominantType);
  
  // Contador de visitantes
  useEffect(() => {
    const interval = setInterval(() => {
      setVisitorsWatching(prev => prev + Math.floor(Math.random() * 3) - 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  
  // Contador de unidades
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.3) {
        setUnitsLeft(prev => Math.max(1, prev - 1));
      }
    }, 8000);
    return () => clearInterval(interval);
  }, []);
  
  // Timer countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  
  // Auto-scroll através das seções
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSection(prev => (prev + 1) % 4);
    }, 8000);
    return () => clearTimeout(timer);
  }, []);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black relative overflow-hidden">
      {/* Partículas de fundo */}
      {[...Array(100)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400/20 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Header com urgência */}
      <div className="fixed top-0 left-0 w-full bg-black/90 backdrop-blur-sm border-b border-red-500/30 z-50">
        <div className="container mx-auto px-6 py-3">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-green-400 font-bold">{visitorsWatching}</span>
                <span className="text-gray-400">pessoas vendo esta oferta agora</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-red-400" />
                <span className="text-red-400 font-bold">Resta apenas {formatTime(timeLeft)}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-orange-400 font-bold">Apenas {unitsLeft} unidades restantes!</span>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-20 pb-12">
        <div className="container mx-auto px-6">
          
          {/* Seção 1: Resultado Neural */}
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <div className="text-center mb-12">
              <motion.div
                className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 border border-purple-400/30 rounded-full px-8 py-3 mb-6"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Brain className="w-6 h-6 text-cyan-400" />
                <span className="text-cyan-400 font-bold">ANÁLISE COMPLETA DO SEU PERFIL</span>
              </motion.div>
              
              <h1 className="text-4xl md:text-6xl font-black mb-4">
                <span className="text-white">Parabéns, </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                  {gameResult.userName}!
                </span>
              </h1>
              
              <div className="bg-gradient-to-br from-purple-800/30 to-blue-800/30 border border-cyan-400/50 rounded-3xl p-8 max-w-4xl mx-auto">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <Crown className="w-12 h-12 text-yellow-400" />
                  <div className="text-center">
                    <h2 className="text-3xl font-black text-yellow-400 mb-2">
                      {dominantPersonality.title}
                    </h2>
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-600/20 to-orange-600/20 border border-yellow-400/30 rounded-full px-4 py-2">
                      <Diamond className="w-4 h-4 text-yellow-400" />
                      <span className="text-yellow-400 font-bold">NÍVEL {dominantPersonality.level}</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-xl text-gray-200 mb-8">
                  {dominantPersonality.description}
                </p>
                
                {/* Insights do perfil */}
                <div className="grid md:grid-cols-3 gap-6">
                  {insights.map((insight, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.2 }}
                      className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-600/30 rounded-2xl p-6 text-center"
                    >
                      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r ${insight.color} mb-4`}>
                        {insight.icon}
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">{insight.title}</h3>
                      <p className="text-gray-300 text-sm mb-3">{insight.description}</p>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <motion.div
                          className={`h-2 rounded-full bg-gradient-to-r ${insight.color}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${insight.percentage}%` }}
                          transition={{ duration: 1, delay: index * 0.3 }}
                        />
                      </div>
                      <span className="text-sm text-gray-400 mt-2 block">{insight.percentage}% desenvolvido</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>

          {/* Seção 2: Oferta Principal */}
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-16"
          >
            <div className="bg-gradient-to-br from-red-600/20 to-orange-600/20 border-2 border-red-500/50 rounded-3xl p-8 md:p-12 max-w-5xl mx-auto relative overflow-hidden">
              {/* Selo de urgência */}
              <div className="absolute -top-3 -right-3 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-full text-sm font-bold transform rotate-12 shadow-lg">
                OFERTA RELÂMPAGO!
              </div>
              
              <div className="text-center">
                <motion.h2
                  className="text-4xl md:text-6xl font-black mb-6"
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="text-white">GUIA DEFINITIVO</span><br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">
                    PRODUTOR MASTER
                  </span>
                </motion.h2>
                
                <p className="text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
                  O único eBook que revela as <span className="text-orange-400 font-bold">estratégias práticas</span> dos 
                  produtores que faturam <span className="text-green-400 font-bold">6 dígitos por mês</span> com eventos
                </p>

                {/* Benefícios principais */}
                <div className="grid md:grid-cols-2 gap-6 mb-12">
                  {[
                    {
                      icon: <Brain className="w-8 h-8 text-cyan-400" />,
                      title: "Estratégias Personalizadas",
                      description: "Na consultoria bônus você vai conversar com quem sabe de marketing e trará insights valiosos em relação a marketing orgânico e pago"
                    },
                    {
                      icon: <TrendingUp className="w-8 h-8 text-green-400" />,
                      title: "Fórmulas de Alto Resultado",
                      description: "Análise das redes sociais e sistema de vendas atual"
                    },
                    {
                      icon: <Target className="w-8 h-8 text-purple-400" />,
                      title: "Seu Plano de Ação",
                      description: "Estratégias personalizadas baseadas no seu evento"
                    },
                    {
                      icon: <Crown className="w-8 h-8 text-yellow-400" />,
                      title: "Método dos Top Produtores",
                      description: "Recomendação de ações simples que fazem a diferença rapidamente"
                    }
                  ].map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="flex items-start gap-4 text-left"
                    >
                      <div className="flex-shrink-0 p-3 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl border border-gray-600/30">
                        {benefit.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
                        <p className="text-gray-300">{benefit.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Preço e bônus */}
                <div className="bg-gradient-to-br from-black/50 to-gray-900/50 border border-yellow-400/30 rounded-2xl p-8 mb-8">
                  <div className="flex items-center justify-center gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-gray-400 line-through text-2xl mb-2">De R$ 397,00</div>
                      <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
                        R$ 9,99
                      </div>
                      <div className="text-green-400 font-bold">97% de desconto!</div>
                    </div>
                  </div>
                  
                  {/* Bônus exclusivos */}
                  <div className="space-y-3 mb-8">
                    <div className="flex items-center gap-3 text-left">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-gray-200"><strong>BÔNUS 1:</strong> PACK gigante e editável de Templates de flyers estáticos e animados (Valor: R$ 127)</span>
                    </div>
                    <div className="flex items-center gap-3 text-left">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-gray-200"><strong>BÔNUS 2:</strong> EM BREVE, grupo exclusivo de produtores (Valor: R$ 97)</span>
                    </div>
                    <div className="flex items-center gap-3 text-left">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-gray-200"><strong>BÔNUS 3:</strong> Acesso ao grupo VIP de produtores (Valor: R$ 197)</span>
                    </div>
                    <div className="flex items-center gap-3 text-left bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-400/30 rounded-xl p-4">
                      <Gift className="w-6 h-6 text-purple-400 flex-shrink-0" />
                      <span className="text-purple-300 font-bold">🎯 BÔNUS ESPECIAL: Consultoria 1-a-1 de 30min EXCLUSIVA onde você conversa diretamente com especialista em marketing para eventos e recebe estratégias personalizadas para SEU evento específico (VALOR REAL: R$ 300)</span>
                    </div>
                  </div>
                </div>

                {/* Botão de compra gigante */}
                <motion.button
                  onClick={() => {
                    // Aqui será implementado o checkout
                    console.log('Redirecionando para checkout...');
                  }}
                  className="group relative w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white font-black py-8 px-12 rounded-2xl text-2xl md:text-3xl shadow-2xl transform transition-all duration-300 hover:scale-105 overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative z-10 flex items-center justify-center gap-4">
                    <span>QUERO O GUIA MASTER POR R$ 9,99</span>
                    <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                  
                  {/* Efeito de brilho */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  />
                </motion.button>

                <div className="mt-6 flex items-center justify-center gap-6 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>Acesso imediato</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>Garantia de 7 dias</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>Suporte 24h</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Seção 3: Prova Social */}
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mb-16"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
                Veja o que outros produtores estão dizendo:
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    name: "Carlos Mendes",
                    role: "Produtor de Festivais",
                    text: "Meu faturamento saltou de R$ 50k para R$ 380k em 4 meses aplicando essas estratégias!",
                    rating: 5
                  },
                  {
                    name: "Ana Paula",
                    role: "Eventos Corporativos",
                    text: "O guia revelou segredos que eu levaria anos para descobrir sozinha. Valeu cada centavo!",
                    rating: 5
                  },
                  {
                    name: "Ricardo Santos",
                    role: "Shows e Concerts",
                    text: "As técnicas neurais funcionam mesmo. Meus eventos agora lotam em 24h!",
                    rating: 5
                  }
                ].map((testimonial, index) => (
                  <div key={index} className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-600/30 rounded-2xl p-6">
                    <div className="flex items-center justify-center gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-200 italic mb-4">"{testimonial.text}"</p>
                    <div className="text-center">
                      <div className="font-bold text-white">{testimonial.name}</div>
                      <div className="text-sm text-gray-400">{testimonial.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Call-to-action final */}
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="text-center"
          >
            <div className="bg-gradient-to-br from-purple-600/20 to-red-600/20 border-2 border-red-500/50 rounded-3xl p-8 max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
                Não perca esta oportunidade única!
              </h2>
              <p className="text-xl text-gray-200 mb-8">
                Esta oferta especial expira em <span className="text-red-400 font-bold">{formatTime(timeLeft)}</span> e 
                só restam <span className="text-orange-400 font-bold">{unitsLeft} unidades</span> disponíveis.
              </p>
              
              <motion.button
                onClick={() => {
                  // Checkout
                  console.log('Checkout final...');
                }}
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 text-white font-black py-6 px-12 rounded-2xl text-xl md:text-2xl shadow-2xl transform transition-all duration-300 hover:scale-105"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                GARANTIR MINHA VAGA AGORA - R$ 9,99
              </motion.button>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
};
