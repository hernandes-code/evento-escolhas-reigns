import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Crown, 
  CheckCircle, 
  Gift, 
  Star, 
  Clock, 
  ArrowRight,
  Brain,
  TrendingUp,
  Target,
  BookOpen,
  Image,
  Users,
  Sparkles,
  Timer,
  Award
} from 'lucide-react';

interface OfertaFinalNovaProps {
  gameResult: {
    tipoJogo: string;
    respostas: any[];
    resultado: {
      nivel: string;
      categorias: {
        marketing: number;
        organizacao: number;
        vendas: number;
        digital: number;
      };
      pontuacaoTotal: number;
      categoriaDominante: string;
      pontosFortes: string[];
      areasParaMelhoria: string[];
      recomendacoes: string[];
    };
    tempoTotal: number;
    dataCompleta: string;
  };
}

const getNivelInfo = (dominantCategory: string) => {
  const categoryMap = {
    'marketing': {
      titulo: 'Estrategista de Marketing',
      emoji: '🎯',
      cor: 'from-orange-500 to-red-500',
      descricao: 'Você tem foco em divulgação e atração de público!'
    },
    'organizacao': {
      titulo: 'Organizador Master', 
      emoji: '🗂️',
      cor: 'from-blue-500 to-cyan-500',
      descricao: 'Sua força está na estruturação e planejamento!'
    },
    'vendas': {
      titulo: 'Especialista em Vendas',
      emoji: '💰', 
      cor: 'from-green-500 to-emerald-500',
      descricao: 'Você entende como converter interesse em vendas!'
    },
    'digital': {
      titulo: 'Inovador Digital',
      emoji: '💻',
      cor: 'from-purple-500 to-pink-500', 
      descricao: 'Você abraça a tecnologia para potencializar eventos!'
    }
  };

  return categoryMap[dominantCategory as keyof typeof categoryMap] || categoryMap.marketing;
};

export const OfertaFinalNova: React.FC<OfertaFinalNovaProps> = ({ gameResult }) => {
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutos
  const [visitorsWatching, setVisitorsWatching] = useState(127);
  const [unitsLeft, setUnitsLeft] = useState(23);

  const nivelInfo = getNivelInfo(gameResult.resultado.categoriaDominante);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => Math.max(0, prev - 1));
      
      // Simular mudanças dinâmicas
      if (Math.random() < 0.3) {
        setVisitorsWatching(prev => Math.max(50, prev + Math.floor(Math.random() * 10 - 5)));
      }
      if (Math.random() < 0.1) {
        setUnitsLeft(prev => Math.max(5, prev - 1));
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCheckout = () => {
    // Aqui será direcionado para o checkout/pagamento
    window.open('https://pay.kiwify.com.br/example', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-50">
        <div className="w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(156,146,172,0.05)_0%,transparent_50%)]"></div>
      </div>
      
      <div className="relative z-10 p-6">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          {/* Header com Resultado */}
          <motion.div 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-4 mb-6">
              <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${nivelInfo.cor} flex items-center justify-center text-3xl shadow-2xl`}>
                {nivelInfo.emoji}
              </div>
              <div className="text-left">
                <h1 className="text-3xl font-bold text-white">
                  Parabéns! Você é um
                </h1>
                <h2 className="text-4xl font-black bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                  {nivelInfo.titulo}
                </h2>
                <p className="text-xl text-gray-300 mt-2">
                  {nivelInfo.descricao}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Urgência e Prova Social */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center gap-8 mb-8"
          >
            <div className="bg-red-600/20 border border-red-500/50 rounded-2xl px-6 py-4 text-center">
              <Timer className="w-6 h-6 text-red-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-red-400">{formatTime(timeLeft)}</div>
              <div className="text-sm text-gray-300">Oferta expira em</div>
            </div>
            <div className="bg-orange-600/20 border border-orange-500/50 rounded-2xl px-6 py-4 text-center">
              <Users className="w-6 h-6 text-orange-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-400">{visitorsWatching}</div>
              <div className="text-sm text-gray-300">visualizando agora</div>
            </div>
            <div className="bg-yellow-600/20 border border-yellow-500/50 rounded-2xl px-6 py-4 text-center">
              <Award className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-yellow-400">{unitsLeft}</div>
              <div className="text-sm text-gray-300">vagas restantes</div>
            </div>
          </motion.div>

          {/* Oferta Principal */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-orange-500/30 rounded-3xl p-8 mb-8"
          >
            <div className="text-center mb-8">
              <h3 className="text-3xl font-black text-white mb-4">
                📚 Receba Estratégias <span className="text-orange-400">Personalizadas</span>
              </h3>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Com base no seu perfil <span className="text-orange-400 font-bold">{nivelInfo.titulo}</span>, 
                preparamos um material exclusivo com estratégias específicas para seu nível.
              </p>
            </div>

            {/* Produtos Inclusos */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {/* Ebook Principal */}
              <motion.div 
                className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-2xl p-6 text-center"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <BookOpen className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h4 className="text-xl font-bold text-white mb-3">Ebook Estratégico</h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Guia completo de marketing para eventos com estratégias específicas para o seu perfil de produtor
                </p>
                <div className="mt-4 text-blue-400 font-bold">PRODUTO PRINCIPAL</div>
              </motion.div>

              {/* Pack de Flyers */}
              <motion.div 
                className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-2xl p-6 text-center"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <Image className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <h4 className="text-xl font-bold text-white mb-3">Pack de Flyers</h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Templates editáveis para redes sociais (estáticos + animados) prontos para divulgar seus eventos
                </p>
                <div className="mt-4 text-purple-400 font-bold">BÔNUS 1</div>
              </motion.div>

              {/* Consultoria */}
              <motion.div 
                className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 border border-green-500/30 rounded-2xl p-6 text-center"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <Users className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h4 className="text-xl font-bold text-white mb-3">Consultoria 30min</h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Sessão individual com especialista em marketing de eventos para tirar dúvidas específicas
                </p>
                <div className="mt-4 text-green-400 font-bold">SUPER BÔNUS</div>
              </motion.div>
            </div>

            {/* Preço e CTA */}
            <div className="text-center">
              <div className="mb-6">
                <div className="text-gray-400 text-lg line-through mb-2">De R$ 97,00</div>
                <div className="text-5xl font-black text-white mb-2">
                  R$ <span className="text-orange-400">19</span>,99
                </div>
                <div className="text-gray-300">Pagamento único • Acesso imediato</div>
              </div>

              <motion.button
                onClick={handleCheckout}
                className="group relative bg-gradient-to-r from-orange-500 via-red-500 to-red-600 hover:from-orange-600 hover:via-red-600 hover:to-red-700 text-white px-12 py-6 rounded-2xl font-black text-2xl shadow-[0_20px_40px_rgba(251,146,60,0.4)] hover:shadow-[0_30px_60px_rgba(251,146,60,0.6)] border-2 border-orange-400/50 overflow-hidden transform transition-all duration-300 min-w-[400px]"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.98 }}
                animate={{
                  boxShadow: [
                    '0 20px 40px rgba(251,146,60,0.4)', 
                    '0 30px 60px rgba(251,146,60,0.7)', 
                    '0 20px 40px rgba(251,146,60,0.4)'
                  ]
                }}
                transition={{
                  boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  <Crown className="w-8 h-8" />
                  QUERO MEUS MATERIAIS AGORA
                  <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
                </span>
                
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-orange-400/20 to-red-400/20"
                  animate={{
                    x: ['-100%', '100%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </motion.button>

              <div className="mt-6 flex items-center justify-center gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Acesso Imediato</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Garantia 7 dias</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Suporte Incluso</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Depoimentos Rápidos */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto"
          >
            <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 flex items-center justify-center text-xl">
                  🎵
                </div>
                <div>
                  <div className="font-bold text-white">Marina S.</div>
                  <div className="text-sm text-gray-400">Produtora de Shows</div>
                </div>
              </div>
              <p className="text-gray-300 text-sm italic">
                "As estratégias do ebook me ajudaram a vender 90% dos ingressos em apenas 2 semanas!"
              </p>
              <div className="flex text-yellow-400 mt-3">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
            </div>

            <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center text-xl">
                  🎉
                </div>
                <div>
                  <div className="font-bold text-white">Carlos R.</div>
                  <div className="text-sm text-gray-400">Festa Universitária</div>
                </div>
              </div>
              <p className="text-gray-300 text-sm italic">
                "Os flyers salvaram minha vida! Design profissional sem precisar contratar designer."
              </p>
              <div className="flex text-yellow-400 mt-3">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
