import { motion, useScroll, useTransform, AnimatePresence, useInView } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Play, Star, TrendingUp, Users, Zap, Award, Target, Brain, CheckCircle, ArrowRight, Sparkles, Crown, Rocket, Gamepad2, Trophy, Gem, Eye, MousePointer, Lock, Unlock, ChevronDown, Ticket, BarChart3, Lightbulb, Shield, TrendingDown, DollarSign, Clock, AlertCircle, Gauge, PieChart, LineChart } from 'lucide-react';
import heroImage from '../assets/hero-events.jpg';
import logo from '../assets/logo.png';

interface LandingPageProps {
  onStartGame: () => void;
}

export default function LandingPagePremium({ onStartGame }: LandingPageProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [currentReveal, setCurrentReveal] = useState(0);
  
  const { scrollYProgress } = useScroll();
  const heroRef = useRef(null);
  const problemRef = useRef(null);
  const solutionRef = useRef(null);
  const gameRef = useRef(null);
  
  const heroInView = useInView(heroRef, { amount: 0.3 });
  const problemInView = useInView(problemRef, { amount: 0.3 });
  const solutionInView = useInView(solutionRef, { amount: 0.3 });
  const gameInView = useInView(gameRef, { amount: 0.3 });
  
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  // Mouse tracking premium
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Revelação progressiva do storytelling
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentReveal(prev => (prev + 1) % 3);
    }, 4000);
    
    return () => clearInterval(timer);
  }, []);

  const handleStartChallenge = () => {
    onStartGame();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white overflow-hidden relative">
      
      {/* Cursor personalizado premium */}
      <motion.div
        className="fixed w-6 h-6 border-2 border-orange-400/60 rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
          scale: isHovering ? 2 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />

      {/* Partículas de fundo premium */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(100)].map((_, i) => (
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

      {/* Grid tecnológico de fundo */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      {/* SEÇÃO 1: IMPACTO INICIAL - VOCÊ ESTÁ PERDENDO DINHEIRO */}
      <motion.section
        ref={heroRef}
        className="min-h-screen flex items-center justify-center relative"
        style={{ y, opacity, scale }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-transparent to-red-900/20" />
        
        {/* Logo flutuante premium */}
        <motion.div
          className="absolute top-8 left-8 z-20"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-xl">
              <Crown className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-black text-white">JOGO DO PRODUTOR</h1>
              <p className="text-xs text-orange-300">Bilheteria Digital Premium</p>
            </div>
          </div>
        </motion.div>

        <div className="container mx-auto px-6 text-center relative z-10">
          
          {/* Revelação dramática do título */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="mb-8"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.5, type: "spring" }}
              className="relative mb-6"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 blur-3xl opacity-30 animate-pulse" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="relative z-10"
              >
                <Sparkles className="w-16 h-16 mx-auto text-orange-400" />
              </motion.div>
            </motion.div>

            <motion.h1
              className="text-6xl md:text-8xl font-black mb-6 leading-none"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2, delay: 1 }}
            >
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-orange-600 animate-pulse">
                VOCÊ ESTÁ
              </span>
              <motion.span
                className="block text-white"
                initial={{ rotateX: 90 }}
                animate={{ rotateX: 0 }}
                transition={{ duration: 1, delay: 1.5 }}
              >
                PERDENDO
              </motion.span>
              <motion.span
                className="block text-red-500 font-extrabold"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, delay: 2 }}
              >
                R$ 50.000
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 2.5 }}
            >
              <span className="text-orange-400 font-semibold">Todo mês</span>, enquanto você produz eventos do jeito antigo...
              <br />
              <span className="text-white font-bold">Outros produtores faturam 6 dígitos</span> usando o que você vai descobrir agora.
            </motion.p>
          </motion.div>

          {/* Contador dramático de prejuízo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 3 }}
            className="bg-gradient-to-r from-red-600/20 to-orange-600/20 backdrop-blur-sm border border-red-500/30 rounded-2xl p-6 mb-8 max-w-2xl mx-auto"
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <TrendingDown className="w-8 h-8 text-red-400 animate-pulse" />
              <span className="text-2xl font-bold text-red-400">PREJUÍZO EM TEMPO REAL</span>
              <TrendingDown className="w-8 h-8 text-red-400 animate-pulse" />
            </div>
            <motion.div
              className="text-4xl font-mono font-black text-white"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              R$ 1.438,00 perdidos hoje
            </motion.div>
            <p className="text-red-300 text-sm mt-2">*Média calculada com produtores que não usam tecnologia adequada</p>
          </motion.div>

          {/* CTA Principal premium com hover effect */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 3.5 }}
            className="relative mb-16"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <motion.button
              onClick={handleStartChallenge}
              className="group relative bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 hover:from-orange-600 hover:via-red-600 hover:to-orange-700 text-white px-12 py-6 rounded-2xl font-black text-2xl shadow-[0_20px_40px_rgba(251,146,60,0.4)] hover:shadow-[0_30px_60px_rgba(251,146,60,0.6)] border-2 border-orange-400/50 overflow-hidden transform transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Efeito de brilho animado premium */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                animate={{ x: ['-200%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              
              <div className="relative flex items-center justify-center gap-4">
                <Brain className="w-8 h-8 animate-pulse" />
                <div className="text-left">
                  <div className="text-2xl">DESCOBRIR MEU PERFIL</div>
                  <div className="text-sm opacity-90 font-normal">
                    🎯 Teste gratuito • ⚡ 3 minutos • 🏆 Resultado imediato
                  </div>
                </div>
                <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
              </div>
            </motion.button>
          </motion.div>

          {/* Indicador de scroll premium */}
          <motion.div
            className="flex flex-col items-center gap-2 text-gray-400"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-sm">Descobrir mais</span>
            <ChevronDown className="w-6 h-6" />
          </motion.div>

        </div>
      </motion.section>

      {/* SEÇÃO 2: REVELAÇÃO DO PROBLEMA */}
      <motion.section
        ref={problemRef}
        className="min-h-screen flex items-center relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: problemInView ? 1 : 0.3 }}
        transition={{ duration: 1 }}
      >
        <div className="container mx-auto px-6 relative z-10">
          
          {/* Revelação do problema com impacto */}
          <motion.div
            className="text-center mb-16"
            initial={{ y: 100, opacity: 0 }}
            animate={problemInView ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.div
              className="relative mb-8"
              animate={problemInView ? { rotate: [0, 5, -5, 0] } : { rotate: 0 }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 blur-3xl opacity-30" />
              <AlertCircle className="w-20 h-20 mx-auto text-red-400 relative z-10" />
            </motion.div>

            <motion.h2
              className="text-5xl md:text-6xl font-black mb-8 leading-tight"
              initial={{ scale: 0.8 }}
              animate={problemInView ? { scale: 1 } : { scale: 0.8 }}
              transition={{ duration: 0.8 }}
            >
              <span className="block text-red-400">A DURA</span>
              <span className="block text-white">REALIDADE:</span>
            </motion.h2>

            <motion.p
              className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12"
              initial={{ opacity: 0 }}
              animate={problemInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <span className="text-red-400 font-bold">97% dos produtores</span> falham nos primeiros 2 anos.
              <br />
              <span className="text-white">Não por falta de paixão...</span>
              <br />
              <span className="text-orange-400 font-bold">Mas por falta de SISTEMA.</span>
            </motion.p>
          </motion.div>

          {/* Cards de problemas com animação stagger premium */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: TrendingDown,
                title: "EVENTOS VAZIOS",
                description: "Você promociona, gasta, mas não lota",
                color: "from-red-500 to-red-600"
              },
              {
                icon: DollarSign,
                title: "PREJUÍZOS CONSTANTES", 
                description: "Cada evento é uma aposta no escuro",
                color: "from-orange-500 to-red-500"
              },
              {
                icon: Clock,
                title: "SOBRECARGA TOTAL",
                description: "Você faz tudo e não tem tempo pra nada",
                color: "from-yellow-500 to-orange-500"
              }
            ].map((problem, index) => (
              <motion.div
                key={index}
                initial={{ y: 100, opacity: 0, rotateX: 45 }}
                animate={problemInView ? { 
                  y: 0, 
                  opacity: 1, 
                  rotateX: 0 
                } : { 
                  y: 100, 
                  opacity: 0, 
                  rotateX: 45 
                }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.2 + index * 0.2,
                  type: "spring" 
                }}
                className="group"
              >
                <div className={`bg-gradient-to-br ${problem.color} p-8 rounded-3xl border border-white/10 shadow-2xl hover:shadow-[0_30px_60px_rgba(0,0,0,0.3)] transition-all duration-500 transform hover:scale-105 hover:-translate-y-2`}>
                  <div className="text-center">
                    <problem.icon className="w-12 h-12 text-white mx-auto mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="text-2xl font-black text-white mb-4">{problem.title}</h3>
                    <p className="text-white/90 leading-relaxed">{problem.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Revelação da solução com twist */}
          <motion.div
            className="text-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={problemInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm border border-orange-500/30 rounded-2xl p-8 max-w-4xl mx-auto">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <Lightbulb className="w-8 h-8 text-white" />
              </motion.div>
              
              <h3 className="text-3xl font-bold text-white mb-4">
                MAS E SE EU TE DISSE QUE...
              </h3>
              <p className="text-xl text-orange-300 leading-relaxed">
                Existe um <span className="text-white font-bold">padrão mental específico</span> que os produtores de 6 dígitos seguem?
                <br />
                E que você pode descobrir <span className="text-orange-400 font-bold">exatamente qual é o seu</span> em apenas 3 minutos?
              </p>
            </div>
          </motion.div>

        </div>
      </motion.section>

      {/* SEÇÃO 3: A SOLUÇÃO - BILHETERIA DIGITAL */}
      <motion.section
        ref={solutionRef}
        className="min-h-screen flex items-center relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: solutionInView ? 1 : 0.3 }}
        transition={{ duration: 1 }}
      >
        <div className="container mx-auto px-6 relative z-10">
          
          <motion.div
            className="text-center mb-16"
            initial={{ y: 100, opacity: 0 }}
            animate={solutionInView ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.div
              className="relative mb-8"
              animate={solutionInView ? { scale: [1, 1.1, 1] } : { scale: 1 }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 blur-3xl opacity-30" />
              <Unlock className="w-20 h-20 mx-auto text-green-400 relative z-10" />
            </motion.div>

            <motion.h2
              className="text-5xl md:text-6xl font-black mb-8 leading-tight"
              initial={{ scale: 0.8 }}
              animate={solutionInView ? { scale: 1 } : { scale: 0.8 }}
              transition={{ duration: 0.8 }}
            >
              <span className="block text-green-400">A SOLUÇÃO</span>
              <span className="block text-white">EXISTE:</span>
            </motion.h2>

            <motion.p
              className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12"
              initial={{ opacity: 0 }}
              animate={solutionInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              Uma <span className="text-green-400 font-bold">bilheteria digital inteligente</span> que não apenas vende ingressos...
              <br />
              <span className="text-white">Ela faz o marketing SOZINHA.</span>
              <br />
              <span className="text-orange-400 font-bold">E você vai descobrir como funciona.</span>
            </motion.p>
          </motion.div>

          {/* Features premium da solução */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: Rocket,
                title: "MARKETING AUTOMÁTICO",
                description: "A plataforma promociona seu evento sozinha",
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: Gauge,
                title: "VENDAS 24/7",
                description: "Ingressos vendidos mesmo quando você dorme",
                color: "from-green-500 to-emerald-500"
              },
              {
                icon: PieChart,
                title: "DADOS INTELIGENTES",
                description: "Analytics que mostram exatamente o que fazer",
                color: "from-purple-500 to-violet-500"
              },
              {
                icon: Shield,
                title: "PAGAMENTO SEGURO",
                description: "PIX instantâneo direto na sua conta",
                color: "from-orange-500 to-red-500"
              },
              {
                icon: Users,
                title: "AUDIÊNCIA QUALIFICADA",
                description: "Apenas pessoas que realmente vão no evento",
                color: "from-pink-500 to-rose-500"
              },
              {
                icon: LineChart,
                title: "CRESCIMENTO EXPONENCIAL",
                description: "Cada evento vende mais que o anterior",
                color: "from-yellow-500 to-orange-500"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 100, opacity: 0, scale: 0.8 }}
                animate={solutionInView ? { 
                  y: 0, 
                  opacity: 1, 
                  scale: 1 
                } : { 
                  y: 100, 
                  opacity: 0, 
                  scale: 0.8 
                }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.1 + index * 0.1,
                  type: "spring" 
                }}
                className="group"
              >
                <div className={`bg-gradient-to-br ${feature.color} p-6 rounded-2xl border border-white/20 shadow-xl hover:shadow-[0_25px_50px_rgba(0,0,0,0.25)] transition-all duration-500 transform hover:scale-105`}>
                  <div className="text-center">
                    <feature.icon className="w-10 h-10 text-white mx-auto mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                    <p className="text-white/90 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </motion.section>

      {/* SEÇÃO 4: CALL TO ACTION FINAL - O JOGO */}
      <motion.section
        ref={gameRef}
        className="min-h-screen flex items-center relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: gameInView ? 1 : 0.3 }}
        transition={{ duration: 1 }}
      >
        <div className="container mx-auto px-6 relative z-10 text-center">
          
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={gameInView ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
            transition={{ duration: 1 }}
            className="mb-16"
          >
            <motion.div
              className="relative mb-8"
              animate={gameInView ? { rotateY: [0, 180, 360] } : { rotateY: 0 }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 blur-3xl opacity-50" />
              <Gamepad2 className="w-24 h-24 mx-auto text-orange-400 relative z-10" />
            </motion.div>

            <motion.h2
              className="text-5xl md:text-7xl font-black mb-8 leading-tight"
              initial={{ scale: 0.8 }}
              animate={gameInView ? { scale: 1 } : { scale: 0.8 }}
              transition={{ duration: 0.8 }}
            >
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-orange-600">
                ACEITA O
              </span>
              <span className="block text-white">DESAFIO?</span>
            </motion.h2>

            <motion.p
              className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12"
              initial={{ opacity: 0 }}
              animate={gameInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              Descubra seu <span className="text-orange-400 font-bold">perfil de produtor</span> em 3 minutos
              <br />
              E receba <span className="text-white font-bold">acesso VIP</span> à nossa bilheteria digital
              <br />
              <span className="text-green-400 font-bold">COMPLETAMENTE GRATUITO</span>
            </motion.p>
          </motion.div>

          {/* Benefícios finais */}
          <motion.div
            className="grid md:grid-cols-3 gap-6 mb-12"
            initial={{ opacity: 0, y: 50 }}
            animate={gameInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-sm border border-green-500/30 rounded-2xl p-6">
              <Trophy className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">PERFIL PERSONALIZADO</h3>
              <p className="text-gray-300 text-sm">Descubra exatamente qual tipo de produtor você é</p>
            </div>
            <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-6">
              <Gem className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">FERRAMENTAS PREMIUM</h3>
              <p className="text-gray-300 text-sm">Acesso gratuito à nossa plataforma completa</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500/20 to-violet-500/20 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-6">
              <Crown className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">COMUNIDADE VIP</h3>
              <p className="text-gray-300 text-sm">Entre no grupo exclusivo de produtores de elite</p>
            </div>
          </motion.div>

          {/* CTA Final Ultimate */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={gameInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="relative"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <motion.button
              onClick={handleStartChallenge}
              className="group relative bg-gradient-to-r from-orange-500 via-red-500 to-purple-600 hover:from-orange-600 hover:via-red-600 hover:to-purple-700 text-white px-16 py-8 rounded-3xl font-black text-3xl shadow-[0_30px_60px_rgba(251,146,60,0.5)] hover:shadow-[0_40px_80px_rgba(251,146,60,0.7)] border-2 border-orange-400/50 overflow-hidden transform transition-all duration-500"
              whileHover={{ scale: 1.05, rotateX: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Múltiplos efeitos de brilho premium */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
                animate={{ x: ['-300%', '300%'] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-l from-transparent via-orange-300/20 to-transparent"
                animate={{ x: ['300%', '-300%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1 }}
              />
              
              <div className="relative flex items-center justify-center gap-6">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Brain className="w-12 h-12" />
                </motion.div>
                <div>
                  <div className="text-3xl mb-2">INICIAR JOGO AGORA</div>
                  <div className="text-sm opacity-90 font-normal">
                    🎮 Grátis • 🚀 3 minutos • 💎 Acesso VIP
                  </div>
                </div>
                <motion.div
                  className="group-hover:translate-x-2 transition-transform"
                  animate={{ x: [0, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-12 h-12" />
                </motion.div>
              </div>
            </motion.button>

            {/* Garantias finais */}
            <div className="flex justify-center items-center gap-8 mt-8 text-gray-400 text-sm">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-400" />
                <span>100% Gratuito</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                <span>Resultado Imediato</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-blue-400" />
                <span>Dados Seguros</span>
              </div>
            </div>
          </motion.div>

        </div>
      </motion.section>

      {/* Footer minimalista */}
      <motion.footer
        className="py-8 text-center text-gray-600 text-sm border-t border-gray-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <p>© 2025 Jogo do Produtor - Transformando a indústria de eventos com tecnologia</p>
      </motion.footer>

    </div>
  );
}
