import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Award, TrendingUp, Target, Zap, Brain,
  CheckCircle, AlertCircle, ArrowRight, 
  BarChart3, Users, DollarSign, Smartphone,
  Star, Trophy, Rocket, Clock
} from 'lucide-react';

interface ResultadosQuizProps {
  resultado: {
    pontuacaoTotal: number;
    categorias: {
      marketing: number;
      organizacao: number;
      vendas: number;
      digital: number;
    };
    nivel: 'iniciante' | 'intermediario' | 'avancado';
    pontosFortes: string[];
    areasParaMelhoria: string[];
    recomendacoes: string[];
  };
  tempoTotal: number;
  onContinue: () => void;
}

export const ResultadosQuiz: React.FC<ResultadosQuizProps> = ({ 
  resultado, 
  tempoTotal, 
  onContinue 
}) => {
  const [etapaAtual, setEtapaAtual] = useState(0);
  
  const nivelInfo = {
    iniciante: {
      titulo: 'Produtor Iniciante',
      cor: 'from-blue-500 to-cyan-500',
      icon: Rocket,
      descricao: 'Você tem uma base sólida e muito potencial para crescer!',
      badge: '🌱'
    },
    intermediario: {
      titulo: 'Produtor em Crescimento',
      cor: 'from-orange-500 to-yellow-500',
      icon: TrendingUp,
      descricao: 'Você já entende o negócio e está pronto para o próximo nível!',
      badge: '📈'
    },
    avancado: {
      titulo: 'Produtor Estratégico',
      cor: 'from-purple-500 to-pink-500',
      icon: Trophy,
      descricao: 'Você tem visão avançada e pode maximizar ainda mais seus resultados!',
      badge: '🏆'
    }
  };

  const categoriaInfo = {
    marketing: { nome: 'Marketing Digital', icon: Target, cor: 'text-orange-400' },
    organizacao: { nome: 'Organização', icon: BarChart3, cor: 'text-blue-400' },
    vendas: { nome: 'Estratégia de Vendas', icon: DollarSign, cor: 'text-green-400' },
    digital: { nome: 'Habilidades Digitais', icon: Smartphone, cor: 'text-purple-400' }
  };

  const info = nivelInfo[resultado.nivel];
  const IconNivel = info.icon;

  useEffect(() => {
    // Auto-avançar etapas
    const timer = setTimeout(() => {
      if (etapaAtual < 3) {
        setEtapaAtual(prev => prev + 1);
      }
    }, etapaAtual === 0 ? 2000 : 3000);
    
    return () => clearTimeout(timer);
  }, [etapaAtual]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white p-6">
      <div className="max-w-4xl mx-auto">
        
        <AnimatePresence mode="wait">
          {/* Etapa 0: Revelação do Nível */}
          {etapaAtual === 0 && (
            <motion.div
              key="nivel"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              className="text-center min-h-screen flex flex-col justify-center"
            >
              <motion.div
                initial={{ y: 30 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.5 }}
                className="mb-8"
              >
                <div className="text-8xl mb-4">{info.badge}</div>
                <h1 className={`text-4xl md:text-6xl font-bold bg-gradient-to-r ${info.cor} bg-clip-text text-transparent mb-4`}>
                  {info.titulo}
                </h1>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">{info.descricao}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="text-center"
              >
                <div className="inline-flex items-center gap-3 bg-slate-800/50 px-6 py-3 rounded-full">
                  <IconNivel className="w-6 h-6 text-orange-400" />
                  <span className="text-lg font-semibold">
                    {resultado.pontuacaoTotal} de {7 * 4} pontos
                  </span>
                  <Clock className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-400">{Math.floor(tempoTotal / 60)}:{(tempoTotal % 60).toString().padStart(2, '0')}</span>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Etapa 1: Análise por Categoria */}
          {etapaAtual === 1 && (
            <motion.div
              key="categorias"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="min-h-screen flex flex-col justify-center"
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-white mb-4">Sua Análise Detalhada</h2>
                <p className="text-gray-400">Veja como você se saiu em cada área</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(resultado.categorias).map(([categoria, pontos], index) => {
                  const catInfo = categoriaInfo[categoria as keyof typeof categoriaInfo];
                  const IconCat = catInfo.icon;
                  const porcentagem = (pontos / 8) * 100; // Máximo 8 pontos por categoria (2 perguntas x 4 pontos)
                  
                  return (
                    <motion.div
                      key={categoria}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2 }}
                      className="bg-slate-800/50 rounded-xl p-6 border border-slate-600"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <IconCat className={`w-6 h-6 ${catInfo.cor}`} />
                        <h3 className="text-lg font-semibold text-white">{catInfo.nome}</h3>
                      </div>
                      
                      <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-400">{pontos}/8 pontos</span>
                          <span className={`font-bold ${catInfo.cor}`}>{Math.round(porcentagem)}%</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-3">
                          <motion.div
                            className={`bg-gradient-to-r ${info.cor} h-3 rounded-full`}
                            initial={{ width: 0 }}
                            animate={{ width: `${porcentagem}%` }}
                            transition={{ duration: 1, delay: index * 0.2 + 0.5 }}
                          />
                        </div>
                      </div>

                      <div className="text-sm text-gray-300">
                        {porcentagem >= 75 ? (
                          <div className="flex items-center gap-2 text-green-400">
                            <CheckCircle className="w-4 h-4" />
                            Ponto forte identificado!
                          </div>
                        ) : porcentagem >= 50 ? (
                          <div className="flex items-center gap-2 text-yellow-400">
                            <Star className="w-4 h-4" />
                            Boa base, pode melhorar
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-orange-400">
                            <AlertCircle className="w-4 h-4" />
                            Área com potencial de crescimento
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Etapa 2: Pontos Fortes e Áreas de Melhoria */}
          {etapaAtual === 2 && (
            <motion.div
              key="analise"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="min-h-screen flex flex-col justify-center"
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-white mb-4">Insights Personalizados</h2>
                <p className="text-gray-400">Com base no seu perfil único</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Pontos Fortes */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-green-500/10 rounded-xl p-6 border border-green-500/30"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-green-500/20 p-3 rounded-lg">
                      <CheckCircle className="w-6 h-6 text-green-400" />
                    </div>
                    <h3 className="text-xl font-bold text-green-400">Seus Pontos Fortes</h3>
                  </div>
                  
                  {resultado.pontosFortes.length > 0 ? (
                    <div className="space-y-3">
                      {resultado.pontosFortes.map((ponto, index) => (
                        <motion.div
                          key={ponto}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                          className="flex items-center gap-3"
                        >
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span className="text-gray-300 capitalize">
                            {categoriaInfo[ponto as keyof typeof categoriaInfo]?.nome || ponto}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-400">Você tem potencial em todas as áreas!</p>
                  )}
                </motion.div>

                {/* Áreas de Melhoria */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-orange-500/10 rounded-xl p-6 border border-orange-500/30"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-orange-500/20 p-3 rounded-lg">
                      <Target className="w-6 h-6 text-orange-400" />
                    </div>
                    <h3 className="text-xl font-bold text-orange-400">Oportunidades de Crescimento</h3>
                  </div>
                  
                  {resultado.areasParaMelhoria.length > 0 ? (
                    <div className="space-y-3">
                      {resultado.areasParaMelhoria.map((area, index) => (
                        <motion.div
                          key={area}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                          className="flex items-center gap-3"
                        >
                          <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                          <span className="text-gray-300 capitalize">
                            {categoriaInfo[area as keyof typeof categoriaInfo]?.nome || area}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-400">Excelente! Você domina todas as áreas essenciais.</p>
                  )}
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* Etapa 3: Recomendações e CTA */}
          {etapaAtual >= 3 && (
            <motion.div
              key="recomendacoes"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="min-h-screen flex flex-col justify-center"
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-white mb-4">Seu Plano de Crescimento</h2>
                <p className="text-gray-400">Recomendações personalizadas para você</p>
              </div>

              <div className="bg-slate-800/50 rounded-xl p-8 border border-orange-500/30 mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <Brain className="w-8 h-8 text-orange-400" />
                  <h3 className="text-2xl font-bold text-white">Próximos Passos Recomendados</h3>
                </div>
                
                <div className="grid gap-4">
                  {resultado.recomendacoes.map((recomendacao, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 }}
                      className="flex items-start gap-3 p-4 bg-slate-700/30 rounded-lg"
                    >
                      <div className="bg-orange-500/20 p-2 rounded-lg mt-1">
                        <ArrowRight className="w-4 h-4 text-orange-400" />
                      </div>
                      <p className="text-gray-300 flex-1">{recomendacao}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.button
                onClick={onContinue}
                className="w-full bg-gradient-to-r from-orange-500 via-red-500 to-purple-600 hover:from-orange-600 hover:via-red-600 hover:to-purple-700 text-white px-8 py-6 rounded-2xl font-bold text-xl shadow-[0_20px_40px_rgba(251,146,60,0.4)] hover:shadow-[0_25px_50px_rgba(251,146,60,0.6)] transition-all"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                🎯 Descobrir Como Implementar Essas Estratégias
              </motion.button>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="text-center text-gray-400 mt-4"
              >
                Receba um guia personalizado baseado no seu perfil
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ResultadosQuiz;
