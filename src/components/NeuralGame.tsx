import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Brain, Zap, Target, Eye, Sparkles, Crown, Gauge, BarChart3, TrendingUp, Users, Star, Rocket, Shield, AlertTriangle, CheckCircle2, ArrowRight, Timer, Lightbulb, Award } from 'lucide-react';
import { NEURAL_SCENARIOS, NEURAL_PRODUCER_PROFILES, NEURAL_ANALYSIS_ENGINE, NEURAL_METRICS, detectAchievements, NEURAL_ACHIEVEMENTS } from '../data/neuralGameSystem';
import type { GameMetrics } from '../types/game';

interface NeuralGameProps {
  onGameComplete: (profile: string, insights: any[], metrics: GameMetrics, achievements: string[]) => void;
}

interface Choice {
  id: string;
  neuralPath: string[];
  weight?: number;
  scenarioId: string;
  effects: Partial<GameMetrics>;
}

export default function NeuralGame({ onGameComplete }: NeuralGameProps) {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [choices, setChoices] = useState<Choice[]>([]);
  const [gamePhase, setGamePhase] = useState<'playing' | 'completing' | 'results'>('playing');
  const [metrics, setMetrics] = useState<GameMetrics>({
    budget: 50,
    audience: 50,
    satisfaction: 50,
    technology: 50
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showingResult, setShowingResult] = useState(false);
  const [dominantProfile, setDominantProfile] = useState<string | null>(null);
  const [personalityInsights, setPersonalityInsights] = useState<any[]>([]);
  const [achievements, setAchievements] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isPaused, setIsPaused] = useState(false);
  const [showMetricChange, setShowMetricChange] = useState<{[key: string]: number}>({});
  
  const gameRef = useRef(null);
  const isInView = useInView(gameRef, { amount: 0.3 });

  // Timer para urgência psicológica
  useEffect(() => {
    if (isPaused || showingResult || isAnalyzing) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          // Auto-escolha aleatória se o tempo acabar
          handleChoice(Math.random() > 0.5 ? 0 : 1);
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentScenario, isPaused, showingResult, isAnalyzing]);

  // Reset timer quando muda cenário
  useEffect(() => {
    setTimeLeft(30);
  }, [currentScenario]);

  const handleChoice = (choiceIndex: number) => {
    const scenario = NEURAL_SCENARIOS[currentScenario];
    const selectedChoice = scenario.choices[choiceIndex];
    
    setIsPaused(true);

    // Animação de impacto na escolha
    const choiceData: Choice = {
      id: selectedChoice.id,
      neuralPath: selectedChoice.neuralPath,
      weight: 1,
      scenarioId: scenario.id,
      effects: selectedChoice.effects
    };

    setChoices(prev => [...prev, choiceData]);

    // Aplicar efeitos nas métricas com animação
    const newMetrics = { ...metrics };
    const changes: {[key: string]: number} = {};
    
    Object.entries(selectedChoice.effects).forEach(([key, value]) => {
      if (newMetrics[key as keyof GameMetrics] !== undefined && value !== 0) {
        const oldValue = newMetrics[key as keyof GameMetrics];
        newMetrics[key as keyof GameMetrics] = Math.max(0, Math.min(100, oldValue + value));
        changes[key] = value;
      }
    });

    setShowMetricChange(changes);
    setMetrics(newMetrics);

    // Limpar animação de mudança após um tempo
    setTimeout(() => {
      setShowMetricChange({});
    }, 2000);

    // Próximo cenário ou finalizar
    setTimeout(() => {
      if (currentScenario >= NEURAL_SCENARIOS.length - 1) {
        finishGame();
      } else {
        setCurrentScenario(prev => prev + 1);
        setIsPaused(false);
      }
    }, 3000);
  };

  const finishGame = () => {
    setIsAnalyzing(true);
    
    // Simular análise neural premium
    setTimeout(() => {
      const profile = NEURAL_ANALYSIS_ENGINE.calculateProfile(choices);
      const insights = NEURAL_ANALYSIS_ENGINE.generateInsights(choices, profile);
      const detectedAchievements = detectAchievements(choices);
      
      setDominantProfile(profile.id);
      setPersonalityInsights(insights);
      setAchievements(detectedAchievements);
      setIsAnalyzing(false);
      setShowingResult(true);
      
      // Callback para o componente pai
      onGameComplete(profile.id, insights, metrics, detectedAchievements);
    }, 4000);
  };

  const scenario = NEURAL_SCENARIOS[currentScenario];

  if (isAnalyzing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
        {/* Particles Background - Responsive */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400/60 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 0.8, 0],
                rotate: 360
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>

        <div className="text-center relative z-10 max-w-md mx-auto px-4">
          {/* Neural Brain Icon - Responsive */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8 shadow-2xl"
          >
            <Brain className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 text-white" />
          </motion.div>

          {/* Main Title - Responsive */}
          <motion.h2
            className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-4 sm:mb-6 leading-tight"
            animate={{ opacity: [1, 0.7, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ANALISANDO SEU PERFIL NEURAL...
          </motion.h2>

          {/* Processing Steps - Mobile Optimized */}
          <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
            {[
              { text: 'Processando decisões', icon: '🧠' },
              { text: 'Mapeando personalidade', icon: '🎯' },
              { text: 'Gerando insights', icon: '⚡' },
              { text: 'Calculando compatibilidade', icon: '🚀' }
            ].map((item, i) => (
              <motion.div
                key={i}
                className="flex items-center justify-center gap-3 text-blue-200"
                initial={{ opacity: 0.3 }}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
              >
                <span className="text-base sm:text-lg">{item.icon}</span>
                <span className="text-sm sm:text-base font-medium">{item.text}</span>
                <motion.div
                  className="w-2 h-2 bg-cyan-400 rounded-full ml-2"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.3 }}
                />
              </motion.div>
            ))}
          </div>

          {/* Neural AI Badge - Responsive */}
          <motion.div
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base font-bold inline-flex items-center gap-2 shadow-lg"
            animate={{ 
              scale: [1, 1.05, 1], 
              boxShadow: [
                '0 0 0 0 rgba(249, 115, 22, 0.7)', 
                '0 0 0 10px rgba(249, 115, 22, 0)', 
                '0 0 0 0 rgba(249, 115, 22, 0.7)'
              ] 
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
            IA NEURAL ATIVA
          </motion.div>

          {/* Progress Indicator */}
          <div className="mt-6 sm:mt-8">
            <div className="bg-white/10 rounded-full h-2 w-full max-w-xs mx-auto overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                animate={{ width: ["0%", "100%"] }}
                transition={{ duration: 4, ease: "easeInOut" }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Tela de completando análise (nova)
  if (gamePhase === 'completing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black flex items-center justify-center p-6 relative overflow-hidden">
        {/* Efeitos de background */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-orange-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="text-center z-10">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="mx-auto mb-8"
          >
            <Brain className="w-20 h-20 text-orange-400" />
          </motion.div>
          
          <motion.h2
            className="text-4xl md:text-6xl font-black text-white mb-6"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            🧠 PROCESSANDO
          </motion.h2>
          
          <motion.p
            className="text-xl text-gray-300 mb-8"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Nossa IA está analisando suas 127 micro-decisões neurais...
          </motion.p>
          
          <div className="flex justify-center gap-2 mb-8">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-3 h-3 bg-orange-400 rounded-full"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </div>
          
          <motion.div
            className="text-orange-300 font-semibold"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Preparando sua oportunidade personalizada...
          </motion.div>
        </div>
      </div>
    );
  }

  if (showingResult && dominantProfile) {
    const profile = NEURAL_PRODUCER_PROFILES[dominantProfile as keyof typeof NEURAL_PRODUCER_PROFILES];
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black flex items-center justify-center p-6 relative overflow-hidden">
        {/* Background de celebração */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, -200],
                opacity: [1, 1, 0],
                rotate: 360
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: Math.random() * 3
              }}
            >
              <Star className="w-4 h-4 text-yellow-400" />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 backdrop-blur-xl border border-orange-500/30 rounded-3xl p-8 max-w-4xl w-full relative z-10"
        >
          <div className="text-center mb-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className={`w-24 h-24 bg-gradient-to-r ${profile.color} rounded-full flex items-center justify-center mx-auto mb-6`}
            >
              <Crown className="w-12 h-12 text-white" />
            </motion.div>

            <motion.h1
              className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500 mb-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
            >
              {profile.title}
            </motion.h1>

            <p className="text-xl text-gray-300 mb-6">{profile.description}</p>
            <p className="text-orange-300 font-semibold">{profile.personality}</p>
          </div>

          {/* Métricas finais */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {Object.entries(NEURAL_METRICS).map(([key, metric]) => (
              <motion.div
                key={key}
                className={`bg-gradient-to-r ${metric.color} p-4 rounded-xl text-center`}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 * Object.keys(NEURAL_METRICS).indexOf(key) }}
              >
                <div className="text-2xl mb-2">{metric.icon}</div>
                <div className="text-white font-bold text-lg">{metrics[key as keyof GameMetrics]}%</div>
                <div className="text-white/80 text-sm">{metric.name}</div>
              </motion.div>
            ))}
          </div>

          {/* Insights personalizados com categorias */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">SEUS SUPERPODERES:</h3>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {profile.traits.map((trait, index) => (
                <motion.div
                  key={index}
                  className="bg-green-500/20 border border-green-500/30 rounded-xl p-4 text-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <CheckCircle2 className="w-6 h-6 text-green-400 mx-auto mb-2" />
                  <p className="text-white font-semibold">{trait}</p>
                </motion.div>
              ))}
            </div>

            {/* Insights personalizados categorizados */}
            {personalityInsights.length > 0 && (
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                {personalityInsights.map((insight, index) => (
                  <motion.div
                    key={index}
                    className={`p-4 rounded-xl border ${
                      insight.type === 'strength' ? 'bg-green-500/10 border-green-500/30' :
                      insight.type === 'opportunity' ? 'bg-blue-500/10 border-blue-500/30' :
                      insight.type === 'superpower' ? 'bg-purple-500/10 border-purple-500/30' :
                      insight.type === 'rare' ? 'bg-orange-500/10 border-orange-500/30' :
                      insight.type === 'leadership' ? 'bg-yellow-500/10 border-yellow-500/30' :
                      'bg-gray-500/10 border-gray-500/30'
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{insight.icon}</span>
                      <div>
                        <div className="text-xs text-gray-400 uppercase font-semibold mb-1">
                          {insight.category}
                        </div>
                        <p className="text-white text-sm font-medium">{insight.text}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Achievements especiais */}
            {achievements.length > 0 && (
              <div className="mb-6">
                <h4 className="text-xl font-bold text-orange-400 mb-4 text-center">
                  🏆 CONQUISTAS DESBLOQUEADAS
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {achievements.map((achievementId, index) => {
                    const achievement = NEURAL_ACHIEVEMENTS[achievementId];
                    return (
                      <motion.div
                        key={achievementId}
                        className={`p-3 rounded-xl text-center border ${
                          achievement.rarity === 'legendary' ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500/50' :
                          achievement.rarity === 'epic' ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/50' :
                          'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-blue-500/50'
                        }`}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ 
                          delay: 1.2 + index * 0.2, 
                          type: "spring",
                          stiffness: 200
                        }}
                      >
                        <div className="text-2xl mb-1">{achievement.icon}</div>
                        <div className="text-xs font-bold text-white">{achievement.name}</div>
                        <div className="text-xs text-gray-300 mt-1">{achievement.description}</div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* CTA para próximos passos */}
          <div className="text-center">
            <motion.button
              onClick={() => {
                // Conclusão do jogo com suspense
                setGamePhase('completing');
                setTimeout(() => {
                  onGameComplete(dominantProfile || 'balanced-strategist', personalityInsights, metrics, achievements);
                }, 2000); // 2 segundos de suspense
              }}
              className="group relative bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 hover:from-orange-600 hover:via-red-600 hover:to-orange-700 text-white px-12 py-6 rounded-2xl font-black text-xl shadow-[0_20px_40px_rgba(251,146,60,0.4)] hover:shadow-[0_30px_60px_rgba(251,146,60,0.6)] border-2 border-orange-400/50 overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                animate={{ x: ['-200%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              
              <div className="relative flex items-center justify-center gap-4">
                <Award className="w-8 h-8" />
                <div>
                  <div className="text-xl">🚀 FINALIZAR ANÁLISE NEURAL</div>
                  <div className="text-sm opacity-90 font-normal">
                    Receba seu perfil + oportunidade exclusiva
                  </div>
                </div>
                <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
              </div>
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div ref={gameRef} className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white relative overflow-hidden">
      
      {/* Partículas de fundo premium - Otimizado para mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-orange-400 to-red-500 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Header com progresso e timer - Mobile First */}
      <div className="relative z-10 p-4 sm:p-6">
        <div className="max-w-4xl mx-auto">
          
          {/* Progresso e Timer - Responsivo */}
          <div className="flex justify-between items-center mb-6 sm:mb-8">
            <div className="flex items-center gap-3 sm:gap-4">
              <Brain className="w-6 h-6 sm:w-8 sm:h-8 text-orange-400" />
              <div>
                <h1 className="text-lg sm:text-xl font-bold">SIMULADOR NEURAL</h1>
                <p className="text-xs sm:text-sm text-gray-400">Cenário {currentScenario + 1} de {NEURAL_SCENARIOS.length}</p>
              </div>
            </div>

            {/* Timer dramático - Mobile otimizado */}
            <motion.div
              className={`flex items-center gap-2 px-3 py-2 sm:px-4 rounded-xl border-2 ${
                timeLeft <= 10 
                  ? 'bg-red-500/20 border-red-500/50 text-red-300' 
                  : 'bg-orange-500/20 border-orange-500/50 text-orange-300'
              }`}
              animate={timeLeft <= 10 ? { scale: [1, 1.05, 1] } : { scale: 1 }}
              transition={{ duration: 0.5, repeat: timeLeft <= 10 ? Infinity : 0 }}
            >
              <Timer className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="font-mono font-bold text-base sm:text-lg">{timeLeft}s</span>
            </motion.div>
          </div>

          {/* Barra de progresso premium - Mobile otimizada */}
          <div className="relative mb-6 sm:mb-8">
            <div className="w-full bg-slate-700 rounded-full h-2 sm:h-3 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-orange-400 via-red-500 to-orange-600"
                initial={{ width: "0%" }}
                animate={{ width: `${((currentScenario + 1) / NEURAL_SCENARIOS.length) * 100}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
            
            {/* Indicador de progresso em texto */}
            <div className="absolute -top-1 right-0 text-xs text-orange-400 font-bold">
              {Math.round(((currentScenario + 1) / NEURAL_SCENARIOS.length) * 100)}%
            </div>
          </div>

        </div>
      </div>

      {/* Cenário atual - Mobile First Design */}
      <div className="relative z-10 flex items-center justify-center px-4 sm:px-6 pb-6">
        <motion.div
          key={currentScenario}
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 1.1, y: -50 }}
          className="bg-gradient-to-br from-slate-800/60 to-slate-700/60 backdrop-blur-xl border border-orange-500/30 rounded-2xl sm:rounded-3xl p-6 sm:p-8 max-w-5xl w-full shadow-2xl"
        >
          
          {/* Cabeçalho do cenário - Responsivo */}
          <div className="text-center mb-6 sm:mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="mb-4 sm:mb-6"
            >
              {scenario.type === 'BILHETERIA_CHOICE' && <Target className="w-12 h-12 sm:w-16 sm:h-16 text-orange-400 mx-auto" />}
              {scenario.type === 'PRICING_STRATEGY' && <TrendingUp className="w-12 h-12 sm:w-16 sm:h-16 text-green-400 mx-auto" />}
              {scenario.type === 'CRISIS_MANAGEMENT' && <AlertTriangle className="w-12 h-12 sm:w-16 sm:h-16 text-red-400 mx-auto" />}
              {scenario.type === 'GROWTH_OPPORTUNITY' && <Rocket className="w-12 h-12 sm:w-16 sm:h-16 text-blue-400 mx-auto" />}
              {scenario.type === 'DATA_ANALYTICS' && <BarChart3 className="w-12 h-12 sm:w-16 sm:h-16 text-purple-400 mx-auto" />}
              {scenario.type === 'CUSTOMER_EXPERIENCE' && <Star className="w-12 h-12 sm:w-16 sm:h-16 text-yellow-400 mx-auto" />}
              {scenario.type === 'SCALING_CHALLENGE' && <Users className="w-12 h-12 sm:w-16 sm:h-16 text-cyan-400 mx-auto" />}
              {scenario.type === 'MARKETING_INNOVATION' && <Lightbulb className="w-12 h-12 sm:w-16 sm:h-16 text-pink-400 mx-auto" />}
            </motion.div>

            <motion.h2
              className="text-2xl sm:text-3xl lg:text-4xl font-black mb-3 sm:mb-4 leading-tight"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {scenario.title}
            </motion.h2>

            <motion.p
              className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto mb-4 sm:mb-6 px-2"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {scenario.context}
            </motion.p>

            {/* Ambiente do cenário - Grid responsivo */}
            <motion.div
              className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 mb-6 sm:mb-8"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <div className="bg-red-500/20 border border-red-500/30 rounded-lg sm:rounded-xl p-2 sm:p-3 text-center">
                <Gauge className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 mx-auto mb-1" />
                <div className="text-xs text-gray-400">Pressão</div>
                <div className="text-xs sm:text-sm font-bold text-red-300">{scenario.environment.pressure}</div>
              </div>
              <div className="bg-orange-500/20 border border-orange-500/30 rounded-lg sm:rounded-xl p-2 sm:p-3 text-center">
                <Timer className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400 mx-auto mb-1" />
                <div className="text-xs text-gray-400">Tempo</div>
                <div className="text-xs sm:text-sm font-bold text-orange-300">{scenario.environment.timeLimit}</div>
              </div>
              <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg sm:rounded-xl p-2 sm:p-3 text-center">
                <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 mx-auto mb-1" />
                <div className="text-xs text-gray-400">Em Jogo</div>
                <div className="text-xs sm:text-sm font-bold text-yellow-300">{scenario.environment.stakes}</div>
              </div>
              <div className="bg-purple-500/20 border border-purple-500/30 rounded-lg sm:rounded-xl p-2 sm:p-3 text-center">
                <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 mx-auto mb-1" />
                <div className="text-xs text-gray-400">Impacto</div>
                <div className="text-xs sm:text-sm font-bold text-purple-300">{scenario.environment.publicImpact}</div>
              </div>
            </motion.div>
          </div>

          {/* Escolhas - Design mobile-first */}
          <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
            {scenario.choices.map((choice, index) => (
              <motion.button
                key={choice.id}
                onClick={() => handleChoice(index)}
                className={`group relative p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 hover:border-orange-500/50 transition-all duration-300 text-left focus:outline-none focus:ring-2 focus:ring-orange-500/50 active:scale-95 ${
                  index === 0 
                    ? 'bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/30' 
                    : 'bg-gradient-to-br from-purple-500/10 to-violet-500/10 border-purple-500/30'
                }`}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 1 + index * 0.2 }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                disabled={isPaused}
              >
                
                {/* Efeito de hover premium - Mobile otimizado */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity skew-x-12 rounded-xl sm:rounded-2xl" />
                
                <div className="relative z-10">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3 flex items-center gap-2 sm:gap-3">
                    {index === 0 ? 
                      <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400 flex-shrink-0" /> : 
                      <Target className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400 flex-shrink-0" />
                    }
                    <span className="leading-tight">{choice.title}</span>
                  </h3>
                  
                  <p className="text-sm sm:text-base text-gray-300 mb-3 sm:mb-4 leading-relaxed">
                    {choice.description}
                  </p>

                  {/* Preview dos efeitos - Grid responsivo */}
                  <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
                    {Object.entries(choice.effects).map(([key, value]) => {
                      if (value === 0) return null;
                      const metric = NEURAL_METRICS[key as keyof typeof NEURAL_METRICS];
                      return (
                        <div
                          key={key}
                          className={`flex items-center gap-1 px-2 sm:px-3 py-1 rounded-full text-xs font-semibold ${
                            value > 0 
                              ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                              : 'bg-red-500/20 text-red-300 border border-red-500/30'
                          }`}
                        >
                          <span className="text-xs">{metric.icon}</span>
                          <span>{value > 0 ? '+' : ''}{value}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Consequência - Mobile otimizado */}
                  <div className="text-xs sm:text-sm text-gray-400 italic leading-relaxed">
                    "{choice.consequence}"
                  </div>
                </div>

                {/* Indicador de neural path - Mobile otimizado */}
                <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                  <div className="flex gap-1">
                    {choice.neuralPath.slice(0, 2).map((path, i) => (
                      <div
                        key={i}
                        className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gradient-to-r from-orange-400 to-red-500"
                      />
                    ))}
                  </div>
                </div>

                {/* Indicador de touch para mobile */}
                <div className="sm:hidden absolute bottom-2 right-2 text-orange-400/50">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </motion.button>
            ))}
          </div>

          {/* Métricas atuais com animação de mudança */}
          <div className="grid grid-cols-4 gap-4 mt-8">
            {Object.entries(NEURAL_METRICS).map(([key, metric]) => {
              const changeValue = showMetricChange[key];
              return (
                <motion.div
                  key={key}
                  className={`relative bg-gradient-to-r ${metric.color} p-4 rounded-xl text-center`}
                  animate={changeValue ? { scale: [1, 1.1, 1] } : { scale: 1 }}
                >
                  <div className="text-2xl mb-2">{metric.icon}</div>
                  <div className="text-white font-bold text-lg">{metrics[key as keyof GameMetrics]}%</div>
                  <div className="text-white/80 text-sm">{metric.name}</div>
                  
                  {/* Indicador de mudança */}
                  <AnimatePresence>
                    {changeValue && (
                      <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.8 }}
                        animate={{ opacity: 1, y: -10, scale: 1 }}
                        exit={{ opacity: 0, y: -30, scale: 0.8 }}
                        className={`absolute -top-2 -right-2 px-2 py-1 rounded-full text-xs font-bold ${
                          changeValue > 0 
                            ? 'bg-green-500 text-white' 
                            : 'bg-red-500 text-white'
                        }`}
                      >
                        {changeValue > 0 ? '+' : ''}{changeValue}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

        </motion.div>
      </div>

    </div>
  );
}
