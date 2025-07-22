import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, Award, ChevronRight, Sparkles, Crown, Zap, Target, Users, TrendingUp, Clock, Gift, Mail, Shield, Eye, Brain, CheckCircle, Flame } from 'lucide-react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowLeadForm: () => void;
  profile: any;
  insights: any[];
  finalScore: number;
  achievements: string[];
}

const SuccessModal: React.FC<SuccessModalProps> = ({ 
  isOpen, 
  onClose, 
  onShowLeadForm, 
  profile, 
  insights, 
  finalScore, 
  achievements 
}) => {
  const [currentPhase, setCurrentPhase] = useState(0); // 0: Revelação, 1: Carta, 2: Oferta
  const [showElements, setShowElements] = useState({
    profile: false,
    insights: false,
    achievements: false,
    carta: false,
    oferta: false
  });
  const [typewriterText, setTypewriterText] = useState('');
  const [urgencyTimer, setUrgencyTimer] = useState(300); // 5 minutos
  
  // Debug logs
  useEffect(() => {
    console.log('🎉 SuccessModal Props:', {
      profile: profile,
      insights: insights,
      finalScore: finalScore,
      achievements: achievements
    });
  }, [profile, insights, finalScore, achievements]);

  // Timer de urgência
  useEffect(() => {
    if (isOpen && urgencyTimer > 0) {
      const timer = setInterval(() => {
        setUrgencyTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isOpen, urgencyTimer]);

  // Sequência de revelação otimizada para conversão
  useEffect(() => {
    if (isOpen) {
      const sequence = [
        { delay: 1000, element: 'profile' },
        { delay: 3000, element: 'insights' },
        { delay: 5000, element: 'achievements' },
        { delay: 7000, element: 'carta', phase: 1 },
        { delay: 10000, element: 'oferta', phase: 2 }
      ];

      sequence.forEach(({ delay, element, phase }) => {
        setTimeout(() => {
          setShowElements(prev => ({ ...prev, [element]: true }));
          if (phase) setCurrentPhase(phase);
        }, delay);
      });
    }
  }, [isOpen]);

  // Efeito typewriter para a carta
  useEffect(() => {
    if (showElements.carta && profile?.title) {
      const cartaText = `Prezado(a) ${profile.title || 'Producer Neural'},

Nossa IA analisou seu perfil de produtor e identificou algo extraordinário...

Você possui as características neurais de um ${profile.personality || 'líder estratégico'}, com score de ${finalScore} pontos - isso coloca você no TOP 15% dos produtores mais qualificados.

Mas aqui está o que nossa análise revelou que pode REVOLUCIONAR seus eventos:

${insights?.[0]?.text || 'Você tem potencial para 3x seus resultados com as estratégias certas.'}

A questão é: você está pronto para desbloquear seu potencial COMPLETO?`;

      let index = 0;
      const timer = setInterval(() => {
        if (index < cartaText.length) {
          setTypewriterText(cartaText.slice(0, index + 1));
          index++;
        } else {
          clearInterval(timer);
        }
      }, 30);

      return () => clearInterval(timer);
    }
  }, [showElements.carta, profile, insights, finalScore]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900/95 via-black/90 to-slate-900/95 backdrop-blur-xl z-50 flex items-center justify-center p-4">
        
        {/* Partículas neurais de fundo */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-gradient-to-r from-orange-400 to-red-500 rounded-full opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-gradient-to-br from-slate-800/90 via-slate-900/95 to-black/90 border-2 border-orange-500/30 rounded-3xl p-8 max-w-4xl w-full max-h-[95vh] overflow-y-auto shadow-[0_50px_100px_rgba(251,146,60,0.3)] backdrop-blur-sm relative"
        >
          
          {/* Timer de urgência no topo direito */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-6 right-6 bg-gradient-to-r from-red-500/90 to-orange-500/90 text-white px-4 py-2 rounded-full shadow-lg border border-red-400/30 backdrop-blur-sm"
          >
            <div className="flex items-center gap-2 text-sm font-bold">
              <Clock className="w-4 h-4 animate-pulse" />
              <span className="font-mono">{formatTime(urgencyTimer)}</span>
            </div>
          </motion.div>

          {/* FASE 0: REVELAÇÃO INICIAL */}
          {currentPhase === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center"
            >
              {/* Cabeçalho dramático */}
              <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="mb-8"
              >
                <motion.div
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                    scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                  }}
                  className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-orange-400 via-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-[0_30px_60px_rgba(251,146,60,0.4)] relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-full"></div>
                  <Brain className="w-16 h-16 text-white relative z-10" />
                </motion.div>
                
                <h1 className="text-5xl font-black text-white mb-4 leading-tight">
                  🧠 ANÁLISE NEURAL
                  <br />
                  <span className="bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent">
                    FINALIZADA
                  </span>
                </h1>
                
                <p className="text-2xl text-gray-300 font-light">
                  Sua personalidade de produtor foi <strong className="text-orange-400">decodificada</strong>
                </p>
              </motion.div>

              {/* Profile Reveal */}
              <AnimatePresence>
                {showElements.profile && profile && (
                  <motion.div
                    initial={{ scale: 0, rotateY: 180 }}
                    animate={{ scale: 1, rotateY: 0 }}
                    transition={{ duration: 1, ease: "backOut" }}
                    className={`p-8 rounded-3xl mb-8 relative overflow-hidden ${profile.color || 'bg-gradient-to-r from-blue-600 to-purple-600'}`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl"></div>
                    <div className="relative z-10 flex items-center gap-6">
                      <div className="text-6xl">{profile.icon || '🎯'}</div>
                      <div className="text-left">
                        <h2 className="text-4xl font-black text-white mb-2">{profile.title || 'Neural Producer'}</h2>
                        <p className="text-xl text-white/90 mb-3">{profile.description || 'Perfil neural identificado'}</p>
                        <p className="text-lg text-white/80">
                          <strong>Personalidade:</strong> {profile.personality || 'Estratégico e analítico'}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Insights Impact */}
              <AnimatePresence>
                {showElements.insights && insights && insights.length > 0 && (
                  <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
                  >
                    {insights.slice(0, 4).map((insight, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.2, duration: 0.6 }}
                        className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 border border-orange-500/20 rounded-2xl p-6 backdrop-blur-sm relative overflow-hidden"
                      >
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-red-400 rounded-t-2xl"></div>
                        <div className="flex items-start gap-4">
                          <div className="text-3xl">{insight.icon || '💡'}</div>
                          <div>
                            <h4 className="font-bold text-orange-400 text-lg mb-2">{insight.category || 'INSIGHT'}</h4>
                            <p className="text-white leading-relaxed">{insight.text}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Achievements Showcase */}
              <AnimatePresence>
                {showElements.achievements && achievements && achievements.length > 0 && (
                  <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="mb-8"
                  >
                    <h3 className="text-3xl font-bold text-yellow-400 mb-6 flex items-center justify-center gap-3">
                      <Trophy className="w-8 h-8" />
                      CONQUISTAS DESBLOQUEADAS
                      <Trophy className="w-8 h-8" />
                    </h3>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {achievements.map((achievement, index) => (
                        <motion.div
                          key={index}
                          initial={{ scale: 0, rotate: 180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: index * 0.15, duration: 0.6, ease: "backOut" }}
                          className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-2 border-yellow-500/30 rounded-xl p-4 text-center relative overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-transparent rounded-xl"></div>
                          <div className="relative z-10">
                            <div className="text-4xl mb-3">🏆</div>
                            <div className="text-sm font-bold text-yellow-400">{achievement}</div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* FASE 1: CARTA NEURAL PERSONALIZADA */}
          {currentPhase === 1 && (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="max-w-3xl mx-auto"
              >
                <motion.div
                  initial={{ y: -30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-center mb-8"
                >
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <Mail className="w-8 h-8 text-orange-400" />
                    <h2 className="text-4xl font-black text-white">CARTA NEURAL EXCLUSIVA</h2>
                    <Mail className="w-8 h-8 text-orange-400" />
                  </div>
                  <p className="text-xl text-gray-300">Personalizada pela nossa IA para você</p>
                </motion.div>

                {/* Carta com efeito typewriter */}
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-gradient-to-br from-white/95 to-gray-100/95 rounded-3xl p-8 shadow-[0_30px_60px_rgba(0,0,0,0.3)] relative overflow-hidden text-black"
                >
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 rounded-t-3xl"></div>
                  
                  <div className="mb-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Crown className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">ANÁLISE NEURAL CONFIDENCIAL</h3>
                    <p className="text-sm text-gray-600">Documento Personalizado #NN{Math.random().toString(36).substr(2, 6).toUpperCase()}</p>
                  </div>

                  <div className="text-lg leading-relaxed text-gray-800 font-mono whitespace-pre-line">
                    {typewriterText}
                    <motion.span
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="text-orange-500"
                    >
                      |
                    </motion.span>
                  </div>

                  {typewriterText.length > 200 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-8 p-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-200"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <Zap className="w-6 h-6 text-orange-500" />
                        <h4 className="font-bold text-orange-700">OPORTUNIDADE NEURAL DETECTADA</h4>
                      </div>
                      <p className="text-gray-700">
                        Nossa IA identificou que você está a <strong>apenas 1 passo</strong> de desbloquear 
                        estratégias que podem <strong className="text-orange-600">triplicar</strong> seus resultados.
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>
            </AnimatePresence>
          )}

          {/* FASE 2: OFERTA IRRESISTÍVEL */}
          {currentPhase === 2 && (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                className="text-center"
              >
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8, ease: "backOut" }}
                  className="mb-8"
                >
                  <div className="flex items-center justify-center gap-4 mb-6">
                    <Gift className="w-10 h-10 text-orange-400" />
                    <h2 className="text-4xl font-black text-white">OFERTA NEURAL EXCLUSIVA</h2>
                    <Gift className="w-10 h-10 text-orange-400" />
                  </div>
                  <p className="text-xl text-gray-300 mb-2">Baseada na sua análise neural única</p>
                  <p className="text-lg text-orange-400 font-bold">
                    Disponível apenas para os próximos {formatTime(urgencyTimer)}
                  </p>
                </motion.div>

                {/* Oferta Premium */}
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 border-2 border-orange-500/40 rounded-3xl p-8 mb-8 shadow-[0_30px_60px_rgba(251,146,60,0.2)] relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-red-500/10 rounded-3xl"></div>
                  
                  <div className="relative z-10">
                    <h3 className="text-3xl font-bold text-white mb-6">
                      🎁 PACOTE NEURAL PREMIUM
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      {/* E-book Personalizado */}
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-400/30 rounded-2xl p-6 backdrop-blur-sm"
                      >
                        <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl mx-auto mb-4 flex items-center justify-center">
                          <Target className="w-8 h-8 text-white" />
                        </div>
                        <h4 className="font-bold text-white text-lg mb-2">E-book Neural</h4>
                        <p className="text-gray-300 text-sm mb-3">
                          "Bilheteria Digital Master" - Personalizado para {profile?.name || 'seu perfil'}
                        </p>
                        <div className="text-orange-400 font-bold">R$ 497,00</div>
                        <div className="text-green-400 font-bold text-lg">GRÁTIS</div>
                      </motion.div>

                      {/* Comunidade VIP */}
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-400/30 rounded-2xl p-6 backdrop-blur-sm"
                      >
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl mx-auto mb-4 flex items-center justify-center">
                          <Users className="w-8 h-8 text-white" />
                        </div>
                        <h4 className="font-bold text-white text-lg mb-2">Comunidade VIP</h4>
                        <p className="text-gray-300 text-sm mb-3">
                          Acesso exclusivo + 500 produtores conectados
                        </p>
                        <div className="text-orange-400 font-bold">R$ 297,00/mês</div>
                        <div className="text-green-400 font-bold text-lg">30 DIAS GRÁTIS</div>
                      </motion.div>

                      {/* Assessoria Gratuita */}
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-400/30 rounded-2xl p-6 backdrop-blur-sm"
                      >
                        <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-xl mx-auto mb-4 flex items-center justify-center">
                          <Shield className="w-8 h-8 text-white" />
                        </div>
                        <h4 className="font-bold text-white text-lg mb-2">Assessoria Neural</h4>
                        <p className="text-gray-300 text-sm mb-3">
                          Consultoria 1:1 personalizada para seu perfil
                        </p>
                        <div className="text-orange-400 font-bold">R$ 997,00</div>
                        <div className="text-green-400 font-bold text-lg">INCLUSO</div>
                      </motion.div>
                    </div>

                    {/* Valor Total */}
                    <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-400/30 rounded-2xl p-6 mb-8">
                      <div className="text-center">
                        <p className="text-gray-300 text-lg mb-2">Valor total do pacote:</p>
                        <div className="text-4xl font-black text-white mb-2">
                          <span className="line-through text-gray-500 text-2xl">R$ 1.791,00</span>
                        </div>
                        <div className="text-5xl font-black bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                          100% GRATUITO
                        </div>
                        <p className="text-green-400 text-lg font-bold mt-2">
                          ✨ Apenas para análises neurais qualificadas
                        </p>
                      </div>
                    </div>

                    {/* Urgência e Social Proof */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                      <div className="bg-red-500/20 border border-red-400/30 rounded-xl p-4">
                        <div className="flex items-center gap-2 text-red-400 font-bold mb-2">
                          <Clock className="w-5 h-5" />
                          OFERTA EXPIRA EM:
                        </div>
                        <div className="text-3xl font-mono font-black text-white">
                          {formatTime(urgencyTimer)}
                        </div>
                      </div>
                      <div className="bg-green-500/20 border border-green-400/30 rounded-xl p-4">
                        <div className="flex items-center gap-2 text-green-400 font-bold mb-2">
                          <TrendingUp className="w-5 h-5" />
                          RESULTADOS COMPROVADOS:
                        </div>
                        <div className="text-2xl font-black text-white">+347%</div>
                        <div className="text-sm text-gray-300">média de aumento nas vendas</div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* CTA Irresistível */}
                <motion.button
                  onClick={onShowLeadForm}
                  whileHover={{ scale: 1.05, boxShadow: "0 25px 50px rgba(251,146,60,0.5)" }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 hover:from-orange-600 hover:via-red-600 hover:to-pink-600 text-white px-12 py-6 rounded-2xl font-black text-2xl shadow-[0_20px_40px_rgba(251,146,60,0.4)] border-2 border-orange-400/50 overflow-hidden transition-all duration-300"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/30 via-transparent to-white/30 skew-x-12"
                    animate={{ x: ['-200%', '200%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                  
                  <div className="relative flex items-center justify-center gap-4">
                    <Flame className="w-8 h-8 group-hover:scale-110 transition-transform" />
                    <div>
                      <div className="text-xl">GARANTIR MEU ACESSO GRATUITO</div>
                      <div className="text-sm opacity-90 font-normal">
                        Receber agora o Pacote Neural Premium
                      </div>
                    </div>
                    <ChevronRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
                  </div>
                </motion.button>

                <p className="text-gray-400 text-sm mt-4">
                  🔒 Seus dados estão seguros | ⚡ Acesso instantâneo | 💯 Sem compromisso
                </p>
              </motion.div>
            </AnimatePresence>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default SuccessModal;
