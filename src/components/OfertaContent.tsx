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
  Target
} from 'lucide-react';

interface OfertaContentProps {
  formData: {
    nome: string;
    email: string;
    whatsapp: string;
    experiencia: string;
    interesse: string;
  };
  nivelInfo: {
    titulo: string;
    emoji: string;
    cor: string;
    descricao: string;
  };
  insights: any[];
  pontuacao: number;
  onCompleted: () => void;
}

export const OfertaContent: React.FC<OfertaContentProps> = ({
  formData,
  nivelInfo,
  insights,
  pontuacao,
  onCompleted
}) => {
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutos
  const [visitorsWatching, setVisitorsWatching] = useState(123);
  const [unitsLeft, setUnitsLeft] = useState(17);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisitorsWatching(prev => prev + Math.floor(Math.random() * 3) - 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.3) {
        setUnitsLeft(prev => Math.max(1, prev - 1));
      }
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getRecomendacaoPorNivel = () => {
    switch (nivelInfo.titulo) {
      case 'Produtor Iniciante':
        return {
          foco: 'estruturação e primeiros eventos',
          estrategia: 'fundamentos sólidos de marketing e organização',
          valor: 'R$ 297'
        };
      case 'Produtor em Crescimento':
        return {
          foco: 'escalabilidade e otimização',
          estrategia: 'técnicas avançadas de vendas e automação',
          valor: 'R$ 497'
        };
      case 'Produtor Estratégico':
        return {
          foco: 'maximização de resultados',
          estrategia: 'estratégias de alto impacto e diversificação',
          valor: 'R$ 897'
        };
      default:
        return {
          foco: 'desenvolvimento completo',
          estrategia: 'metodologia adaptada ao seu perfil',
          valor: 'R$ 497'
        };
    }
  };

  const recomendacao = getRecomendacaoPorNivel();

  const handleCheckout = () => {
    // Aqui seria implementada a integração com o sistema de pagamento
    console.log('Dados para checkout:', {
      formData,
      nivel: nivelInfo.titulo,
      pontuacao,
      insights: insights.map(i => ({ title: i.title, percentage: i.percentage }))
    });
    
    // Simular redirecionamento para página de pagamento
    window.open('https://pay.kiwify.com.br/exemplo-link', '_blank');
    onCompleted();
  };

  return (
    <div className="space-y-12">
      {/* Header com Urgência */}
      <div className="fixed top-0 left-0 w-full bg-black/90 backdrop-blur-sm border-b border-red-500/30 z-50">
        <div className="max-w-6xl mx-auto px-6 py-3">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-green-400 font-bold">{visitorsWatching}</span>
                <span className="text-gray-400">pessoas vendo esta oferta agora</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-red-400" />
                <span className="text-red-400 font-bold">Oferta expira em {formatTime(timeLeft)}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-orange-400 font-bold">Apenas {unitsLeft} vagas restantes!</span>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-20">
        {/* Resultado Personalizado */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 border border-purple-400/30 rounded-full px-8 py-3 mb-6">
            <Brain className="w-6 h-6 text-cyan-400" />
            <span className="text-cyan-400 font-bold">SUA ANÁLISE ESTÁ PRONTA!</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black mb-4">
            <span className="text-white">Olá, </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
              {formData.nome}!
            </span>
          </h1>
          
          <div className="bg-gradient-to-br from-purple-800/30 to-blue-800/30 border border-cyan-400/50 rounded-3xl p-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${nivelInfo.cor} flex items-center justify-center text-3xl shadow-2xl`}>
                {nivelInfo.emoji}
              </div>
              <div className="text-center">
                <h2 className="text-3xl font-black text-white mb-2">
                  {nivelInfo.titulo}
                </h2>
                <p className="text-slate-300">
                  {nivelInfo.descricao}
                </p>
              </div>
            </div>
            
            <p className="text-xl text-gray-200 mb-8">
              Pontuação: <span className="text-orange-400 font-bold">{pontuacao}/32 pontos</span> • 
              Foco recomendado: <span className="text-cyan-400 font-bold">{recomendacao.foco}</span>
            </p>
            
            {/* Mini resumo dos insights */}
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {insights.slice(0, 2).map((insight, index) => (
                <div key={index} className="bg-slate-800/50 rounded-xl p-4 text-left">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`${insight.color}`}>
                      {insight.icon}
                    </div>
                    <h3 className="font-semibold text-white">{insight.title}</h3>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full bg-gradient-to-r ${insight.color.replace('text-', 'from-').replace('-400', '-400')} to-white`}
                      style={{ width: `${insight.percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-slate-300 mt-1 block">{insight.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Oferta Principal */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-red-600/20 to-orange-600/20 border-2 border-red-500/50 rounded-3xl p-8 md:p-12 max-w-5xl mx-auto relative overflow-hidden mb-12"
        >
          <div className="absolute -top-3 -right-3 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-full text-sm font-bold transform rotate-12 shadow-lg">
            OFERTA ESPECIAL!
          </div>
          
          <div className="text-center">
            <h2 className="text-4xl md:text-6xl font-black mb-6">
              <span className="text-white">GUIA ESTRATÉGICO</span><br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">
                PRODUTOR DE SUCESSO
              </span>
            </h2>
            
            <p className="text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
              Material exclusivo com <span className="text-orange-400 font-bold">estratégias personalizadas</span> para 
              o seu perfil <span className="text-cyan-400 font-bold">{nivelInfo.titulo}</span>
            </p>

            {/* Benefícios Personalizados */}
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {[
                {
                  icon: <Brain className="w-8 h-8 text-cyan-400" />,
                  title: "Estratégias para seu Nível",
                  description: `Conteúdo específico para ${nivelInfo.titulo.toLowerCase()} com foco em ${recomendacao.foco}`
                },
                {
                  icon: <TrendingUp className="w-8 h-8 text-green-400" />,
                  title: "Plano de Ação Personalizado",
                  description: `Baseado na sua análise de ${pontuacao} pontos, você receberá ${recomendacao.estrategia}`
                },
                {
                  icon: <Target className="w-8 h-8 text-purple-400" />,
                  title: "Consultoria Exclusiva",
                  description: "30 minutos de consultoria personalizada para discutir sua estratégia específica"
                },
                {
                  icon: <Crown className="w-8 h-8 text-yellow-400" />,
                  title: "Acesso VIP",
                  description: "Grupo exclusivo de produtores do seu nível para networking e troca de experiências"
                }
              ].map((benefit, index) => (
                <div key={index} className="flex items-start gap-4 text-left">
                  <div className="flex-shrink-0 p-3 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl border border-gray-600/30">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
                    <p className="text-gray-300">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Preço */}
            <div className="bg-gradient-to-br from-black/50 to-gray-900/50 border border-yellow-400/30 rounded-2xl p-8 mb-8">
              <div className="text-center mb-6">
                <div className="text-gray-400 line-through text-2xl mb-2">De {recomendacao.valor}</div>
                <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
                  R$ 47,00
                </div>
                <div className="text-green-400 font-bold">Desconto especial para quem fez a análise!</div>
              </div>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-left">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-gray-200"><strong>BÔNUS 1:</strong> Templates personalizados para seu tipo de evento</span>
                </div>
                <div className="flex items-center gap-3 text-left">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-gray-200"><strong>BÔNUS 2:</strong> Checklist de lançamento para eventos</span>
                </div>
                <div className="flex items-center gap-3 text-left bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-400/30 rounded-xl p-4">
                  <Gift className="w-6 h-6 text-purple-400 flex-shrink-0" />
                  <span className="text-purple-300 font-bold">🎯 BÔNUS ESPECIAL: Consultoria 1-a-1 de 30min onde discutiremos especificamente os resultados da sua análise</span>
                </div>
              </div>
            </div>

            <motion.button
              onClick={handleCheckout}
              className="group relative w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white font-black py-8 px-12 rounded-2xl text-2xl md:text-3xl shadow-2xl transform transition-all duration-300 hover:scale-105 overflow-hidden"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative z-10 flex items-center justify-center gap-4">
                <span>QUERO MEU GUIA PERSONALIZADO - R$ 47</span>
                <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform duration-300" />
              </div>
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
                <span>Suporte personalizado</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Testimonial Rápido */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-600/30 rounded-2xl p-8 max-w-3xl mx-auto text-center"
        >
          <div className="flex items-center justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
            ))}
          </div>
          <p className="text-gray-200 italic mb-4 text-lg">
            "Fiz a análise e em 2 semanas já estava aplicando as estratégias. 
            Meu próximo evento vendeu 40% mais rápido que o anterior!"
          </p>
          <div className="text-center">
            <div className="font-bold text-white">Marina Silva</div>
            <div className="text-sm text-gray-400">Produtora de Eventos Corporativos</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
