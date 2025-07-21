import { motion } from 'framer-motion';
import { useState } from 'react';

interface LandingPageProps {
  onStartGame: () => void;
}

export default function LandingPage({ onStartGame }: LandingPageProps) {
  const [email, setEmail] = useState('');

  const handleStartChallenge = () => {
    onStartGame();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-orange-900 text-white overflow-hidden relative">
      {/* Partículas de fundo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-orange-400 rounded-full opacity-30"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0
            }}
            animate={{ 
              y: [null, -100, Math.random() * window.innerHeight],
              opacity: [0, 0.6, 0]
            }}
            transition={{ 
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header com logo */}
        <motion.header 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-4xl">🎯</span>
            <h1 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">
              JOGO DO PRODUTOR
            </h1>
          </div>
          <p className="text-orange-200/80 text-sm">
            O desafio que todo produtor de eventos precisa aceitar
          </p>
        </motion.header>

        {/* Hero Section */}
        <motion.section 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-4xl sm:text-6xl font-black mb-6 leading-tight"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
              ANTI-IMPROVISO
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
              ANTI-AMADORISMO
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">
              PRO-RESULTADOS
            </span>
          </motion.h2>

          <motion.p 
            className="text-xl sm:text-2xl text-orange-100/90 mb-8 max-w-3xl mx-auto leading-relaxed"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            Você está cansado de ver eventos fracassarem por falta de estratégia? 
            <br />
            <strong className="text-amber-300">Hora de abrir seu próprio caminho.</strong>
          </motion.p>
        </motion.section>

        {/* Problema Section */}
        <motion.section 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="bg-slate-800/50 border border-red-500/30 rounded-2xl p-6 sm:p-8 mb-12 backdrop-blur-sm"
        >
          <div className="flex items-start gap-4">
            <span className="text-3xl">⚠️</span>
            <div>
              <h3 className="text-2xl font-bold text-red-400 mb-4">
                O PROBLEMA QUE TODO PRODUTOR ENFRENTA:
              </h3>
              <div className="grid sm:grid-cols-2 gap-4 text-red-100">
                <div className="flex items-center gap-2">
                  <span className="text-red-400">❌</span>
                  <span>Eventos que não vendem ingressos</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-red-400">❌</span>
                  <span>Orçamento estourado sem retorno</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-red-400">❌</span>
                  <span>Público insatisfeito e sem engajamento</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-red-400">❌</span>
                  <span>Decisões tomadas no "achismo"</span>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Solução Section */}
        <motion.section 
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="text-center mb-16"
        >
          <h3 className="text-3xl sm:text-4xl font-black mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">
              A SOLUÇÃO ESTÁ EM SUAS MÃOS
            </span>
          </h3>
          
          <p className="text-xl text-orange-100/90 mb-8 max-w-2xl mx-auto">
            Um jogo de decisões que simula os <strong className="text-amber-300">10 maiores desafios</strong> 
            que todo produtor de eventos enfrenta na vida real.
          </p>

          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            <motion.div 
              className="bg-gradient-to-br from-orange-500/20 to-amber-500/20 border border-orange-400/30 rounded-xl p-6"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-4xl mb-4 block">🎯</span>
              <h4 className="text-lg font-bold text-orange-100 mb-2">10 DECISÕES CRÍTICAS</h4>
              <p className="text-orange-200/80 text-sm">
                Cada escolha impacta diretamente no sucesso do seu evento
              </p>
            </motion.div>

            <motion.div 
              className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-400/30 rounded-xl p-6"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-4xl mb-4 block">📊</span>
              <h4 className="text-lg font-bold text-green-100 mb-2">MÉTRICAS REAIS</h4>
              <p className="text-green-200/80 text-sm">
                Orçamento, audiência, satisfação e tecnologia em tempo real
              </p>
            </motion.div>

            <motion.div 
              className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-400/30 rounded-xl p-6"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-4xl mb-4 block">🏆</span>
              <h4 className="text-lg font-bold text-purple-100 mb-2">SEU PERFIL DE PRODUTOR</h4>
              <p className="text-purple-200/80 text-sm">
                Descubra suas forças e receba estratégias personalizadas
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Benefícios Section */}
        <motion.section 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-400/30 rounded-2xl p-6 sm:p-8 mb-12"
        >
          <div className="text-center mb-8">
            <h3 className="text-3xl font-black text-green-400 mb-4">
              O QUE VOCÊ GANHA AO COMPLETAR O DESAFIO:
            </h3>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-8">
            <div className="flex items-start gap-4">
              <div className="bg-green-500 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h4 className="text-xl font-bold text-green-300 mb-2">
                  EBOOK EXCLUSIVO GRATUITO
                </h4>
                <p className="text-green-100/90 text-sm leading-relaxed">
                  <strong>"Guia Definitivo do Produtor Digital"</strong> - Estratégias comprovadas que aumentam vendas em 300% e economizam 15 horas por semana
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-emerald-500 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h4 className="text-xl font-bold text-emerald-300 mb-2">
                  COMUNIDADE EXCLUSIVA
                </h4>
                <p className="text-emerald-100/90 text-sm leading-relaxed">
                  Acesso à comunidade privada de produtores de alto nível. Networking, dicas diárias e suporte de quem já vende 6 dígitos em eventos
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 px-4 py-2 rounded-full border border-amber-400/30">
              <span className="text-lg">⚡</span>
              <span className="font-bold text-sm">VALOR TOTAL: R$ 497 - GRÁTIS HOJE</span>
            </div>
          </div>
        </motion.section>

        {/* Social Proof */}
        <motion.section 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="text-center mb-12"
        >
          <h3 className="text-2xl font-bold text-orange-300 mb-6">
            JUNTE-SE A MAIS DE 5.000 PRODUTORES QUE JÁ TRANSFORMARAM SEUS EVENTOS
          </h3>
          
          <div className="flex justify-center items-center gap-4 mb-6">
            <div className="flex -space-x-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-10 h-10 bg-gradient-to-r from-orange-400 to-red-500 rounded-full border-2 border-white flex items-center justify-center text-sm">
                  👤
                </div>
              ))}
            </div>
            <div className="text-left">
              <div className="flex text-yellow-400 text-sm">
                {'⭐'.repeat(5)}
              </div>
              <p className="text-orange-200/80 text-xs">Avaliação média dos usuários</p>
            </div>
          </div>
        </motion.section>

        {/* CTA Principal */}
        <motion.section 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.7 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-400/50 rounded-2xl p-8 backdrop-blur-sm">
            <h3 className="text-3xl sm:text-4xl font-black mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
                ACEITA O DESAFIO?
              </span>
            </h3>
            
            <p className="text-xl text-orange-100/90 mb-8">
              Descubra seu perfil de produtor em apenas <strong className="text-amber-300">5 minutos</strong> 
              e receba as ferramentas para criar eventos de 6 dígitos.
            </p>

            <motion.button
              onClick={handleStartChallenge}
              className="relative bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-8 py-4 rounded-xl font-black text-xl shadow-2xl border-2 border-orange-400/50 overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Efeito de brilho animado */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              
              <div className="relative flex items-center justify-center gap-3">
                <span className="text-2xl">🚀</span>
                <div>
                  <div className="text-xl">INICIAR DESAFIO AGORA</div>
                  <div className="text-xs opacity-90 font-normal">
                    100% Gratuito • Sem Cadastro • Resultado Imediato
                  </div>
                </div>
              </div>
            </motion.button>

            <div className="flex justify-center items-center gap-6 mt-6 text-orange-200/60 text-xs">
              <div className="flex items-center gap-1">
                <span>🔒</span>
                <span>Seus dados estão seguros</span>
              </div>
              <div className="flex items-center gap-1">
                <span>⚡</span>
                <span>Resultado em 5 minutos</span>
              </div>
              <div className="flex items-center gap-1">
                <span>🎯</span>
                <span>100% Focado em Resultados</span>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Footer */}
        <motion.footer 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2 }}
          className="text-center mt-16 text-orange-200/60 text-xs"
        >
          <p>
            © 2025 Jogo do Produtor - Transformando produtores amadores em profissionais de elite
          </p>
        </motion.footer>
      </div>
    </div>
  );
}
