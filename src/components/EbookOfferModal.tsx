import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, Star, Crown, Zap, Award, Users, TrendingUp, 
  CheckCircle, ArrowRight, Clock, Gift, Sparkles, Eye,
  Download, Shield, Rocket, Target, Brain, Flame
} from 'lucide-react';
import TestimonialsSection from './TestimonialsSection';
import FAQSection from './FAQSection';
import ScarcityBanner from './ScarcityBanner';

interface EbookOfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  playerProfile: any;
  gameScore: number;
  achievements: string[];
  onPurchase: () => void;
}

const EbookOfferModal: React.FC<EbookOfferModalProps> = ({
  isOpen,
  onClose,
  playerProfile,
  gameScore,
  achievements,
  onPurchase
}) => {
  const [currentPhase, setCurrentPhase] = useState(0); // 0: Revelação, 1: Oferta, 2: Urgência
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutos
  const [showBonuses, setShowBonuses] = useState(false);

  // Timer de urgência
  useEffect(() => {
    if (currentPhase >= 1 && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [currentPhase, timeLeft]);

  // Progressão automática das fases
  useEffect(() => {
    if (isOpen) {
      const timer1 = setTimeout(() => setCurrentPhase(1), 3000);
      const timer2 = setTimeout(() => setShowBonuses(true), 5000);
      const timer3 = setTimeout(() => setCurrentPhase(2), 8000);
      
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    }
  }, [isOpen]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getPersonalizedMessage = () => {
    if (gameScore >= 280) return "EXTRAORDINÁRIO! Você é um MESTRE em eventos!";
    if (gameScore >= 220) return "EXCELENTE! Você tem potencial de ELITE!";
    if (gameScore >= 160) return "MUITO BOM! Você está no caminho certo!";
    return "INCRÍVEL! Você tem grande potencial!";
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        
        {/* Efeitos de fundo */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-orange-400 rounded-full opacity-60"
              animate={{
                x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
                y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
              }}
              transition={{
                duration: 10 + Math.random() * 10,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </div>

        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          className="relative max-w-4xl w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl shadow-2xl border-4 border-orange-500/30 overflow-hidden max-h-[90vh] overflow-y-auto"
        >
          
          {/* FASE 0: REVELAÇÃO DO PERFIL */}
          {currentPhase === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-8 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="mb-6"
              >
                <Crown className="w-20 h-20 text-orange-400 mx-auto mb-4" />
                <h2 className="text-4xl font-black text-white mb-2">
                  ANÁLISE COMPLETA!
                </h2>
                <div className="text-2xl font-bold text-orange-400">
                  {getPersonalizedMessage()}
                </div>
              </motion.div>

              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 }}
                className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/50 rounded-2xl p-6 mb-4"
              >
                <div className="text-6xl font-black text-orange-400 mb-2">
                  {gameScore}/400
                </div>
                <div className="text-white font-semibold">
                  Seu Potencial Neural Detectado
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="text-orange-300"
              >
                Preparando sua oportunidade exclusiva...
              </motion.div>
            </motion.div>
          )}

          {/* FASE 1: OFERTA PRINCIPAL */}
          {currentPhase >= 1 && (
            <div className="relative">
              
              {/* Header com urgência */}
              <div className="bg-gradient-to-r from-red-600 to-orange-600 p-4 text-center text-white">
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="font-black text-lg"
                >
                  🔥 OPORTUNIDADE EXCLUSIVA DETECTADA! 🔥
                </motion.div>
                {currentPhase >= 2 && (
                  <div className="text-sm mt-1">
                    ⏰ Oferta expira em: <span className="font-bold text-yellow-300">{formatTime(timeLeft)}</span>
                  </div>
                )}
              </div>

              <div className="p-8">
                
                {/* Revelação personalizada */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center mb-8"
                >
                  <h1 className="text-4xl font-black text-white mb-4">
                    🧠 BASEADO NA SUA ANÁLISE NEURAL
                  </h1>
                  <div className="text-xl text-orange-300 mb-6">
                    Detectamos que você está a <span className="text-orange-400 font-bold">1 PASSO</span> de se tornar um 
                    <span className="text-yellow-400 font-bold"> PRODUTOR DE EVENTOS MASTER!</span>
                  </div>
                </motion.div>

                {/* Produto principal */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="relative bg-gradient-to-br from-orange-500/10 to-red-500/10 border-2 border-orange-500/50 rounded-3xl p-8 mb-8 overflow-hidden"
                >
                  
                  {/* Badge de desconto */}
                  <div className="absolute -top-4 -right-4 bg-red-500 text-white px-6 py-2 rounded-full font-bold text-lg transform rotate-12">
                    90% OFF!
                  </div>

                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    
                    {/* Imagem do produto */}
                    <div className="text-center">
                      <motion.div
                        animate={{ rotateY: [0, 10, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="relative"
                      >
                        <div className="w-64 h-80 bg-gradient-to-br from-orange-400 to-red-600 rounded-2xl shadow-2xl mx-auto relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                          <div className="p-6 h-full flex flex-col justify-between text-white">
                            <div>
                              <BookOpen className="w-12 h-12 mb-4" />
                              <h3 className="font-black text-2xl mb-2">GUIA NEURAL</h3>
                              <h4 className="font-bold text-lg">PRODUTOR MASTER</h4>
                            </div>
                            <div className="text-sm opacity-90">
                              127 páginas de estratégias neurais para eventos de sucesso
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Conteúdo da oferta */}
                    <div>
                      <h2 className="text-3xl font-black text-white mb-4">
                        📚 GUIA NEURAL DO PRODUTOR MASTER
                      </h2>
                      <div className="text-gray-300 mb-6">
                        O único guia que combina <span className="text-orange-400 font-bold">inteligência artificial</span> com 
                        <span className="text-orange-400 font-bold"> estratégias práticas</span> para transformar você no 
                        produtor de eventos que sempre sonhou ser!
                      </div>

                      {/* Preços */}
                      <div className="mb-6">
                        <div className="flex items-center gap-4 mb-2">
                          <span className="text-2xl text-gray-400 line-through">R$ 99,00</span>
                          <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                            90% OFF
                          </span>
                        </div>
                        <div className="text-5xl font-black text-orange-400 mb-2">
                          R$ 9,99
                        </div>
                        <div className="text-sm text-gray-400">
                          Pagamento único • Acesso imediato • Garantia de 7 dias
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Bônus revelados progressivamente */}
                <AnimatePresence>
                  {showBonuses && (
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-8"
                    >
                      <h3 className="text-2xl font-bold text-center text-orange-400 mb-6">
                        🎁 BÔNUS EXCLUSIVOS INCLUSOS (GRÁTIS!)
                      </h3>
                      
                      <div className="grid md:grid-cols-3 gap-4">
                        
                        {/* Bônus 1 */}
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2 }}
                          className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/50 rounded-2xl p-6 text-center"
                        >
                          <Users className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                          <h4 className="font-bold text-white mb-2">COMUNIDADE VIP</h4>
                          <div className="text-sm text-gray-300">
                            Acesso à comunidade exclusiva de produtores de alto nível
                          </div>
                          <div className="text-purple-400 font-bold mt-2">VALOR: R$ 197</div>
                        </motion.div>

                        {/* Bônus 2 */}
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.4 }}
                          className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/50 rounded-2xl p-6 text-center"
                        >
                          <Brain className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                          <h4 className="font-bold text-white mb-2">TEMPLATES IA</h4>
                          <div className="text-sm text-gray-300">
                            +50 templates prontos baseados em IA para seus eventos
                          </div>
                          <div className="text-blue-400 font-bold mt-2">VALOR: R$ 297</div>
                        </motion.div>

                        {/* Bônus 3 */}
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.6 }}
                          className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/50 rounded-2xl p-6 text-center"
                        >
                          <Rocket className="w-12 h-12 text-green-400 mx-auto mb-4" />
                          <h4 className="font-bold text-white mb-2">ACESSO BETA</h4>
                          <div className="text-sm text-gray-300">
                            Primeira chance de testar nossa plataforma revolucionária
                          </div>
                          <div className="text-green-400 font-bold mt-2">VALOR: R$ 497</div>
                        </motion.div>
                      </div>

                      <div className="text-center mt-6 p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl border border-yellow-500/50">
                        <div className="text-2xl font-black text-yellow-400 mb-2">
                          VALOR TOTAL: R$ 1.090
                        </div>
                        <div className="text-white">
                          Hoje por apenas <span className="text-orange-400 font-bold text-2xl">R$ 9,99</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Testimonials Section */}
                <AnimatePresence>
                  {showBonuses && (
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                      className="mb-8"
                    >
                      <TestimonialsSection />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* FAQ Section */}
                <AnimatePresence>
                  {showBonuses && (
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.2 }}
                      className="mb-8"
                    >
                      <FAQSection />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Scarcity Banner */}
                <AnimatePresence>
                  {showBonuses && (
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.6 }}
                      className="mb-8"
                    >
                      <ScarcityBanner timeLeft={timeLeft} />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Call to Action */}
                <div className="text-center">
                  
                  {/* Timer urgente no CTA */}
                  <motion.div
                    className="bg-gradient-to-r from-red-600 to-orange-600 rounded-xl p-4 mb-6 text-white"
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <div className="text-lg font-bold">
                      ⏰ Esta oportunidade expira em: <span className="text-yellow-300 text-xl">{formatTime(timeLeft)}</span>
                    </div>
                    <div className="text-sm opacity-90">
                      Depois volta para R$ 497. Não deixe passar!
                    </div>
                  </motion.div>

                  {/* Botão principal gigante */}
                  <motion.button
                    onClick={onPurchase}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative bg-gradient-to-r from-green-500 via-emerald-600 to-green-600 hover:from-green-600 hover:via-emerald-700 hover:to-green-700 text-white font-black text-3xl px-16 py-8 rounded-3xl shadow-2xl border-4 border-green-400/50 overflow-hidden mb-6 w-full max-w-2xl mx-auto block"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                      animate={{ x: ['-200%', '200%'] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    />
                    
                    <div className="relative">
                      <div className="flex items-center justify-center gap-4 mb-2">
                        <Crown className="w-10 h-10" />
                        <div>🚀 SIM! QUERO ME TORNAR UM MASTER AGORA!</div>
                        <Crown className="w-10 h-10" />
                      </div>
                      <div className="text-xl font-normal opacity-90">
                        Garantir acesso completo por apenas R$ 9,99
                      </div>
                      <div className="text-lg mt-2 bg-yellow-400 text-black px-4 py-1 rounded-full inline-block font-bold">
                        💰 ECONOMIA DE R$ 487!
                      </div>
                    </div>
                  </motion.button>

                  {/* Botões secundários */}
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <motion.button
                      onClick={onPurchase}
                      whileHover={{ scale: 1.02 }}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 px-6 rounded-xl"
                    >
                      💜 ACESSO VIP + COMUNIDADE
                      <div className="text-sm opacity-80">Networking de alto nível</div>
                    </motion.button>
                    
                    <motion.button
                      onClick={onPurchase}
                      whileHover={{ scale: 1.02 }}
                      className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold py-4 px-6 rounded-xl"
                    >
                      🤖 TEMPLATES + IA
                      <div className="text-sm opacity-80">Automação completa</div>
                    </motion.button>
                  </div>

                  <div className="mt-4 flex items-center justify-center gap-6 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <Shield className="w-4 h-4" />
                      <span>Garantia 7 dias</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Download className="w-4 h-4" />
                      <span>Acesso imediato</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" />
                      <span>Pagamento seguro</span>
                    </div>
                  </div>
                </div>

                {/* Elementos de prova social */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="mt-8 text-center"
                >
                  <div className="text-sm text-gray-400 mb-4">
                    ⚡ <span className="text-orange-400 font-bold">2.847 produtores</span> já transformaram seus eventos com este método
                  </div>
                  
                  <div className="flex justify-center items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="text-white font-bold ml-2">4.9/5</span>
                  </div>
                  
                  <div className="text-xs text-gray-500">
                    Baseado em 1.234 avaliações verificadas
                  </div>
                </motion.div>
              </div>
            </div>
          )}

          {/* Botão de fechar (apenas após mostrar a oferta) */}
          {currentPhase >= 1 && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
            >
              ✕
            </button>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default EbookOfferModal;
