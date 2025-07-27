import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Brain, Zap, Users, TrendingUp, Target, Crown, Sparkles, ArrowRight, ChevronDown, Play, Star, Timer, Award, Rocket } from 'lucide-react';
import heroImage from '../assets/hero-events.jpg';

interface LandingPageProps {
  onStartGame: () => void;
}

export default function LandingPageBilheteria({ onStartGame }: LandingPageProps) {
  const [currentReveal, setCurrentReveal] = useState(0);
  const [visitorsCount, setVisitorsCount] = useState(2847);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const { scrollYProgress } = useScroll();
  const heroRef = useRef(null);

  // Contador de visitantes dinâmico
  useEffect(() => {
    const interval = setInterval(() => {
      setVisitorsCount(prev => prev + Math.floor(Math.random() * 3));
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Revelação progressiva do storytelling
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentReveal(prev => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleStartChallenge = () => {
    onStartGame();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white overflow-hidden relative">
      
      {/* Campo de força ao redor da tela */}
      <motion.div
        className="absolute inset-0 border-4 border-cyan-400/20 pointer-events-none z-50"
        animate={{
          borderColor: [
            'rgba(34, 211, 238, 0.2)',
            'rgba(251, 146, 60, 0.4)',
            'rgba(168, 85, 247, 0.3)',
            'rgba(34, 211, 238, 0.2)'
          ],
          boxShadow: [
            'inset 0 0 50px rgba(34, 211, 238, 0.1)',
            'inset 0 0 100px rgba(251, 146, 60, 0.2)',
            'inset 0 0 50px rgba(168, 85, 247, 0.1)',
            'inset 0 0 50px rgba(34, 211, 238, 0.1)'
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Cantos energéticos */}
      {[
        { top: '10px', left: '10px', rotate: '0deg' },
        { top: '10px', right: '10px', rotate: '90deg' },
        { bottom: '10px', right: '10px', rotate: '180deg' },
        { bottom: '10px', left: '10px', rotate: '270deg' }
      ].map((corner, i) => (
        <motion.div
          key={`corner-energy-${i}`}
          className="absolute w-16 h-16 pointer-events-none z-50"
          style={corner}
          animate={{
            opacity: [0.4, 0.9, 0.4],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.7,
            ease: "easeInOut"
          }}
        >
          <div 
            className="w-full h-full border-l-4 border-t-4 border-orange-400/70 rounded-tl-lg" 
            style={{ transform: `rotate(${corner.rotate})` }} 
          />
        </motion.div>
      ))}
      
      {/* Background com efeitos visuais REFINADOS E PROFISSIONAIS */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-purple-500/5" />
        
        {/* Partículas sutis e elegantes - REDUZIDAS para 30 */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-orange-400/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Raios de energia sutis - APENAS 3 */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`refined-ray-${i}`}
              className="absolute w-px h-32 bg-gradient-to-t from-transparent via-cyan-400/30 to-transparent"
              style={{
                left: '50%',
                top: '30%',
                transformOrigin: 'bottom center',
              }}
              animate={{
                rotate: [i * 120, (i * 120) + 360],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                delay: i * 2,
              }}
            />
          ))}
        </div>

        {/* Meteoros elegantes e sutis - APENAS 2 */}
        {[...Array(2)].map((_, i) => (
          <motion.div
            key={`refined-meteor-${i}`}
            className="absolute w-20 h-px bg-gradient-to-r from-transparent via-orange-400/40 to-transparent"
            style={{
              left: '-5%',
              top: `${30 + i * 40}%`,
              rotate: '20deg',
            }}
            animate={{
              x: ['0vw', '110vw'],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatDelay: 15,
              delay: i * 7,
            }}
          />
        ))}

        {/* Pulsos de energia do centro */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-4 h-4 bg-cyan-400/80 rounded-full"
          style={{ transform: 'translate(-50%, -50%)' }}
          animate={{
            scale: [1, 0],
            opacity: [1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 1,
          }}
        />
        
        {/* Campo de força visual */}
        <motion.div
          className="absolute inset-0 bg-gradient-radial from-cyan-400/5 via-transparent to-transparent"
          animate={{
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
        />
      </div>

      {/* Header com contador de visitantes */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-4 right-4 z-50 bg-black/80 backdrop-blur-sm rounded-xl px-4 py-2 border border-orange-500/30"
      >
        <div className="flex items-center gap-2 text-sm">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-green-400 font-bold">{visitorsCount.toLocaleString()}</span>
          <span className="text-gray-400">online agora</span>
        </div>
      </motion.div>

      {/* Hero Section */}
      <section ref={heroRef} className="min-h-screen flex flex-col justify-center relative">
        <div className="container mx-auto px-6 text-center relative z-10">
          
          {/* Logo/Brand */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1.5, type: "spring" }}
            className="mb-8"
          >
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mb-4">
              <Brain className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-orange-400">ANÁLISE DO PRODUTOR</h3>
          </motion.div>

          {/* Título Principal com efeitos UAU */}
          <motion.h1
            className="text-6xl md:text-8xl font-black mb-8 leading-none relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.5 }}
          >
            {/* Efeito de brilho atrás do título */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-orange-500/30 via-red-500/30 to-purple-600/30 blur-3xl -z-10"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 0.9, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <motion.span
              className="block text-white mb-4 relative"
              initial={{ rotateX: -90 }}
              animate={{ 
                rotateX: 0,
                textShadow: [
                  '0 0 20px rgba(255,255,255,0.3)',
                  '0 0 30px rgba(255,255,255,0.5)',
                  '0 0 20px rgba(255,255,255,0.3)'
                ]
              }}
              transition={{ 
                rotateX: { duration: 1, delay: 1 },
                textShadow: { duration: 4, repeat: Infinity }
              }}
            >
              ANÁLISE
            </motion.span>
            
            <motion.span
              className="block bg-gradient-to-r from-orange-400 via-red-500 to-purple-500 bg-clip-text text-transparent font-extrabold relative"
              initial={{ rotateX: -90 }}
              animate={{ 
                rotateX: 0,
                backgroundPosition: ['0%', '100%', '0%'],
              }}
              transition={{ 
                rotateX: { duration: 1, delay: 1.3 },
                backgroundPosition: { duration: 6, repeat: Infinity, ease: "linear" }
              }}
              style={{
                backgroundSize: '200% 100%',
              }}
            >
              COMPLETA
            </motion.span>
          </motion.h1>

          {/* Subtítulo dinâmico */}
          <motion.div
            className="text-2xl md:text-3xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.8 }}
          >
            {currentReveal === 0 && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <span className="text-orange-400 font-bold">Descubra em 5 minutos:</span> qual é o seu perfil único de produtor e onde você está perdendo oportunidades
              </motion.p>
            )}
            {currentReveal === 1 && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <span className="text-orange-400 font-bold">Análise baseada em dados:</span> identifique seus pontos fortes e áreas de crescimento no seu evento!
              </motion.p>
            )}
            {currentReveal === 2 && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <span className="text-orange-400 font-bold">Estratégias personalizadas:</span> receba recomendações específicas para o seu tipo de evento e perfil
              </motion.p>
            )}
            {currentReveal === 3 && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <span className="text-orange-400 font-bold">Resultados imediatos:</span> implemente mudanças que geram impacto real nos seus próximos eventos
              </motion.p>
            )}
          </motion.div>

          {/* Narrativa de Transição - Conectando o título aos problemas */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.0 }}
            className="mb-16 max-w-4xl mx-auto text-center"
          >
            <p className="text-2xl md:text-3xl text-gray-300 leading-relaxed mb-8">
              <span className="text-orange-400 font-bold">Você já se perguntou</span> por que alguns produtores conseguem 
              <span className="text-white font-bold"> vender 80% dos ingressos antecipadamente</span> enquanto outros lutam até o último dia?
            </p>
            <p className="text-xl text-gray-400 leading-relaxed">
              A diferença não está na sorte, no orçamento ou no tipo de evento...
              <span className="text-white font-bold"> está no perfil estratégico e na abordagem de marketing personalizada.</span>
            </p>
          </motion.div>

          {/* Resultados em tempo real */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto"
          >
            <div className="bg-gradient-to-br from-gray-700/20 to-gray-800/20 border border-orange-500/30 rounded-2xl p-6">
              <div className="text-3xl font-bold text-orange-400 mb-2">92%</div>
              <div className="text-gray-300">dos produtores identificam gaps críticos</div>
            </div>
            <div className="bg-gradient-to-br from-gray-700/20 to-gray-800/20 border border-orange-500/30 rounded-2xl p-6">
              <div className="text-3xl font-bold text-orange-400 mb-2">5 min</div>
              <div className="text-gray-300">para descobrir seu perfil completo</div>
            </div>
            <div className="bg-gradient-to-br from-gray-700/20 to-gray-800/20 border border-orange-500/30 rounded-2xl p-6">
              <div className="text-3xl font-bold text-orange-400 mb-2">+1.5 mil</div>
              <div className="text-gray-300">análises realizadas com sucesso</div>
            </div>
          </motion.div>

          {/* Seção adicional - Problemas que todo produtor já viveu */}
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.3 }}
            className="mb-12 max-w-5xl mx-auto"
          >
            <div className="bg-gradient-to-br from-red-900/30 to-orange-900/30 border border-red-500/30 rounded-3xl p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-black text-center mb-8">
                <span className="text-orange-400">SE VOCÊ PRODUZ EVENTOS</span><br />
                <span className="text-white">COM VENDA DE INGRESSOS:</span>
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-6xl mb-4">🎵</div>
                  <h3 className="text-xl font-bold text-white mb-3">Shows e Festivais</h3>
                  <p className="text-gray-300">Ingressos parados na bilheteria, sem aquela corrida inicial que todo show precisa</p>
                </div>
                <div className="text-center">
                  <div className="text-6xl mb-4">🎉</div>
                  <h3 className="text-xl font-bold text-white mb-3">Bares, Festas e Baladas</h3>
                  <p className="text-gray-300">Eventos noturnos, festas temáticas e experiências que dependem de ingressos vendidos antecipadamente</p>
                </div>
                <div className="text-center">
                  <div className="text-6xl mb-4">📈</div>
                  <h3 className="text-xl font-bold text-white mb-3">Eventos de Alto Potencial</h3>
                  <p className="text-gray-300">Experiências únicas e exclusivas que podem multiplicar suas vendas com as estratégias certas</p>
                </div>
              </div>

              <div className="text-center">
                <p className="text-2xl text-gray-200 mb-6">
                  <span className="text-orange-400 font-bold">Nossa análise vai revelar exatamente onde você está perdendo oportunidades.</span>
                </p>
                <p className="text-xl text-gray-300 max-w-4xl mx-auto">
                  Em apenas 5 minutos, você descobrirá seu <span className="text-orange-400 font-bold">perfil único de produtor</span>, 
                  identificará seus <span className="text-white font-bold">pontos fortes e áreas de crescimento</span>, e receberá 
                  <span className="text-white font-bold">estratégias personalizadas</span> que realmente funcionam para o seu tipo de evento.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Transição Narrativa - Preparando para a descoberta */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.4 }}
            className="mb-12 max-w-4xl mx-auto text-center"
          >
            <p className="text-2xl md:text-3xl text-gray-300 leading-relaxed mb-6">
              <span className="text-orange-400 font-bold">Pronto para descobrir</span> qual é o seu 
              <span className="text-white font-bold"> perfil estratégico de produtor</span> e receber um 
              <span className="text-white font-bold">plano personalizado de crescimento?</span>
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-purple-500 mx-auto rounded-full"></div>
          </motion.div>

          {/* CTA Principal GIGANTE */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.8 }}
            className="relative"
          >
            <motion.button
              onClick={handleStartChallenge}
              className="group relative bg-gradient-to-r from-orange-500 via-red-500 to-purple-600 hover:from-orange-600 hover:via-red-600 hover:to-purple-700 text-white px-16 py-8 rounded-3xl font-black text-3xl shadow-[0_30px_60px_rgba(251,146,60,0.4)] hover:shadow-[0_40px_80px_rgba(251,146,60,0.6)] border-4 border-orange-400/50 overflow-hidden transform transition-all duration-300"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.98 }}
              animate={{
                boxShadow: [
                  '0 30px 60px rgba(251,146,60,0.4)', 
                  '0 40px 80px rgba(251,146,60,0.8)', 
                  '0 30px 60px rgba(251,146,60,0.4)'
                ],
              }}
              transition={{
                boxShadow: { duration: 2, repeat: Infinity }
              }}
            >
              {/* Efeito de brilho animado REFINADO */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                animate={{ x: ['-200%', '200%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Partículas sutis - REDUZIDAS para 4 */}
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={`btn-particle-${i}`}
                  className="absolute w-1.5 h-1.5 bg-yellow-300 rounded-full"
                  style={{
                    left: '50%',
                    top: '50%',
                  }}
                  animate={{
                    x: [0, (Math.cos(i * 90 * Math.PI / 180) * 40)],
                    y: [0, (Math.sin(i * 90 * Math.PI / 180) * 40)],
                    opacity: [1, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3,
                    delay: i * 0.2,
                  }}
                />
              ))}
              
              <div className="relative flex items-center justify-center gap-6">
                <motion.div
                  animate={{ 
                    rotate: 360,
                  }}
                  transition={{ 
                    rotate: { duration: 3, repeat: Infinity },
                  }}
                >
                  <Brain className="w-10 h-10 text-yellow-300" />
                </motion.div>
                <div className="text-left">
                  <div className="text-3xl mb-2">🧭 FAZER MINHA ANÁLISE COMPLETA</div>
                  <div className="text-lg font-normal opacity-90">
                    Diagnóstico personalizado + estratégias + plano de ação
                  </div>
                </div>
                <motion.div
                  animate={{ 
                    x: [0, 8, 0],
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                  }}
                >
                  <ArrowRight className="w-10 h-10 group-hover:translate-x-2 transition-transform" />
                </motion.div>
              </div>
            </motion.button>

            {/* Garantias abaixo do botão */}
            <motion.div
              className="mt-6 flex items-center justify-center gap-8 text-sm text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.2 }}
            >
              <div className="flex items-center gap-2">
                <Timer className="w-4 h-4 text-green-400" />
                <span>3 minutos apenas</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-blue-400" />
                <span>Resultado personalizado</span>
              </div>
              <div className="flex items-center gap-2">
                <Crown className="w-4 h-4 text-purple-400" />
                <span>Assessoria gratuita</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Seta para scroll */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-8 h-8 text-orange-400" />
        </motion.div>
      </section>

      {/* Seção de Prova Social Rápida */}
      <motion.section 
        className="py-16 bg-gradient-to-r from-slate-800/50 to-slate-900/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-8">
            💫 Produtores que já revolucionaram seus eventos
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-slate-800/50 rounded-2xl p-6 border border-orange-500/20">
              <div className="text-2xl font-bold text-green-400 mb-2">Marina S.</div>
              <div className="text-gray-300 mb-3">"Faturamento: R$ 15k → R$ 25k/mês"</div>
              <div className="text-sm text-gray-400">Festivais</div>
            </div>
            
            <div className="bg-slate-800/50 rounded-2xl p-6 border border-purple-500/20">
              <div className="text-2xl font-bold text-purple-400 mb-2">Carlos O.</div>
              <div className="text-gray-300 mb-3">"Lista de espera: 20 → 50 clientes"</div>
              <div className="text-sm text-gray-400">Bares e Baladas</div>
            </div>
            
            <div className="bg-slate-800/50 rounded-2xl p-6 border border-blue-500/20">
              <div className="text-2xl font-bold text-blue-400 mb-2">Ana C.</div>
              <div className="text-gray-300 mb-3">"ROI: 80x em 30 dias"</div>
              <div className="text-sm text-gray-400">Feiras de negócios</div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* NOVA SEÇÃO: SOLUÇÃO COM CONTROLE GIRANDO */}
      <motion.section 
        className="py-32 px-8 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        {/* Background de energia */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-cyan-900/20" />
        
        {/* Partículas de energia na seção - REDUZIDAS */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`solution-particle-${i}`}
            className="absolute w-1 h-1 bg-cyan-400/60 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}

        <div className="max-w-7xl mx-auto text-center relative z-10">
          
          {/* Título da Solução */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-6xl md:text-7xl font-black mb-8 relative">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                A SOLUÇÃO
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-600/20 blur-3xl -z-10"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </h2>
          </motion.div>

          {/* Controle de Jogo Girando REFINADO */}
          <motion.div 
            className="relative mb-16"
            initial={{ scale: 0, rotate: -90 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            viewport={{ once: true }}
          >
            {/* Círculo de energia ao redor do controle - APENAS 1 */}
            <motion.div
              className="absolute border-2 border-cyan-400/30 rounded-full"
              style={{
                left: '50%',
                top: '50%',
                width: '140px',
                height: '140px',
                marginLeft: '-70px',
                marginTop: '-70px',
              }}
              animate={{
                rotate: [0, 360],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                rotate: { duration: 12, repeat: Infinity, ease: "linear" },
                opacity: { duration: 3, repeat: Infinity }
              }}
            />

            {/* Controle de Jogo Principal */}
            <motion.div 
              className="relative w-32 h-32 mx-auto bg-gradient-to-br from-slate-700 via-slate-600 to-slate-800 rounded-2xl shadow-2xl border-4 border-cyan-400/50"
              animate={{ 
                rotateY: [0, 360],
                boxShadow: [
                  '0 0 50px rgba(34, 211, 238, 0.3)',
                  '0 0 100px rgba(34, 211, 238, 0.6)',
                  '0 0 50px rgba(34, 211, 238, 0.3)'
                ]
              }}
              transition={{ 
                rotateY: { duration: 4, repeat: Infinity, ease: "linear" },
                boxShadow: { duration: 2, repeat: Infinity }
              }}
            >
              {/* Joystick */}
              <motion.div 
                className="absolute top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-full border-2 border-white"
                animate={{ 
                  y: [0, -3, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              
              {/* Botões */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                <motion.div 
                  className="w-3 h-3 bg-green-400 rounded-full"
                  animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                />
                <motion.div 
                  className="w-3 h-3 bg-red-400 rounded-full"
                  animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
                />
              </div>

              {/* Raios de energia saindo do controle - REDUZIDOS */}
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={`control-ray-${i}`}
                  className="absolute w-px h-8 bg-gradient-to-t from-transparent via-cyan-400/60 to-transparent"
                  style={{
                    left: '50%',
                    top: '50%',
                    transformOrigin: 'bottom',
                    transform: `translate(-50%, -50%) rotate(${i * 90}deg)`,
                  }}
                  animate={{
                    scaleY: [0, 1, 0],
                    opacity: [0, 0.7, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </motion.div>
          </motion.div>

          {/* Texto da Solução */}
          <motion.div
            className="mb-16"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-4xl md:text-5xl font-bold mb-8 text-white">
              🎮 DESAFIO INTERATIVO DO PRODUTOR MASTER
            </h3>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-gradient-to-br from-cyan-500/20 to-blue-600/20 p-8 rounded-2xl border border-cyan-400/30">
                <div className="text-5xl mb-4">
                  <motion.div 
                    className="inline-block w-16 h-16 bg-gradient-to-br from-slate-700 via-slate-600 to-slate-800 rounded-xl shadow-xl border-2 border-cyan-400/50 relative"
                    animate={{ 
                      rotateY: [0, 15, -15, 0],
                      boxShadow: [
                        '0 0 20px rgba(34, 211, 238, 0.3)',
                        '0 0 30px rgba(34, 211, 238, 0.6)',
                        '0 0 20px rgba(34, 211, 238, 0.3)'
                      ]
                    }}
                    transition={{ 
                      rotateY: { duration: 3, repeat: Infinity },
                      boxShadow: { duration: 2, repeat: Infinity }
                    }}
                  >
                    {/* Joystick esquerdo */}
                    <motion.div 
                      className="absolute top-2 left-2 w-3 h-3 bg-gradient-to-br from-orange-400 to-red-500 rounded-full border border-white"
                      animate={{ 
                        y: [0, -1, 0],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    
                    {/* Botões direita */}
                    <div className="absolute bottom-2 right-2 flex gap-1">
                      <motion.div 
                        className="w-2 h-2 bg-green-400 rounded-full"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                      />
                      <motion.div 
                        className="w-2 h-2 bg-blue-400 rounded-full"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
                      />
                    </div>
                    
                    {/* D-pad */}
                    <div className="absolute bottom-2 left-2">
                      <div className="w-3 h-1 bg-gray-400 rounded-full mb-1"></div>
                      <div className="w-1 h-3 bg-gray-400 rounded-full mx-auto"></div>
                    </div>
                  </motion.div>
                </div>
                <h4 className="text-2xl font-bold text-cyan-400 mb-4">Análise Neural</h4>
                <p className="text-gray-300">
                  Sistema avançado que identifica seu perfil de produtor único em 5 minutos
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-500/20 to-pink-600/20 p-8 rounded-2xl border border-purple-400/30">
                <div className="text-5xl mb-4">⚡</div>
                <h4 className="text-2xl font-bold text-purple-400 mb-4">Estratégias Personalizadas</h4>
                <p className="text-gray-300">
                  Receba táticas específicas para seu tipo de evento e personalidade
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-orange-500/20 to-red-600/20 p-8 rounded-2xl border border-orange-400/30">
                <div className="text-5xl mb-4">📚</div>
                <h4 className="text-2xl font-bold text-orange-400 mb-4">Guia Completo</h4>
                <p className="text-gray-300">
                  eBook exclusivo com todas as estratégias que geram resultados reais
                </p>
              </div>
            </div>
          </motion.div>

          {/* Transição Final - Call to Action Definitivo */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <p className="text-3xl md:text-4xl font-bold text-white mb-6">
              <span className="text-cyan-400">Sua jornada</span> para se tornar um 
              <span className="text-orange-400"> Produtor Master</span> começa agora.
            </p>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Clique no botão abaixo e descubra em <span className="text-white font-bold">5 minutos</span> 
              qual é seu perfil único e como aplicar as estratégias que <span className="text-cyan-400 font-bold">realmente funcionam</span>.
            </p>
          </motion.div>

          {/* Botão Extra REFINADO para o Jogo */}
          <motion.div
            initial={{ scale: 0, rotate: -45 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            viewport={{ once: true }}
          >
            <motion.button
              onClick={handleStartChallenge}
              className="group relative bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-700 hover:from-cyan-600 hover:via-blue-700 hover:to-purple-800 text-white px-16 py-8 rounded-2xl font-bold text-3xl shadow-[0_20px_40px_rgba(34,211,238,0.3)] hover:shadow-[0_25px_50px_rgba(34,211,238,0.5)] border-2 border-cyan-400/30 overflow-hidden transform transition-all duration-300"
              whileHover={{ scale: 1.03, y: -4 }}
              whileTap={{ scale: 0.99 }}
              animate={{
                boxShadow: [
                  '0 20px 40px rgba(34,211,238,0.3)', 
                  '0 25px 50px rgba(34,211,238,0.5)', 
                  '0 20px 40px rgba(34,211,238,0.3)'
                ],
              }}
              transition={{
                boxShadow: { duration: 3, repeat: Infinity }
              }}
            >
              {/* Efeito de energia correndo pelo botão - SUAVIZADO */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-12"
                animate={{ x: ['-200%', '200%'] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Partículas reduzidas - APENAS 6 */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={`btn-final-${i}`}
                  className="absolute w-1.5 h-1.5 bg-yellow-300/80 rounded-full"
                  style={{
                    left: '50%',
                    top: '50%',
                  }}
                  animate={{
                    x: [0, (Math.cos(i * 60 * Math.PI / 180) * 50)],
                    y: [0, (Math.sin(i * 60 * Math.PI / 180) * 50)],
                    opacity: [1, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    repeatDelay: 4,
                    delay: i * 0.2,
                  }}
                />
              ))}
              
              <div className="relative flex items-center justify-center gap-6">
                <motion.div
                  animate={{ 
                    rotate: [0, 360],
                  }}
                  transition={{ 
                    rotate: { duration: 4, repeat: Infinity },
                  }}
                >
                  🎮
                </motion.div>
                <div className="text-left">
                  <div className="text-3xl mb-2">🚀 COMEÇAR DESAFIO AGORA</div>
                  <div className="text-lg font-normal opacity-90">
                    Análise completa em 5 minutos
                  </div>
                </div>
                <motion.div
                  animate={{ 
                    x: [0, 8, 0],
                  }}
                  transition={{ 
                    duration: 2.5, 
                    repeat: Infinity,
                  }}
                >
                  ⚡
                </motion.div>
              </div>
            </motion.button>
          </motion.div>

        </div>
      </motion.section>
    </div>
  );
}
