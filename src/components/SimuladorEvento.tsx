import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, DollarSign, TrendingUp, Calendar, 
  Target, Zap, Award, ArrowRight, Clock,
  Heart, Share2, Camera, Music, Smartphone
} from 'lucide-react';
import { MiniGameEspecifico } from './MiniGameEspecifico';

interface SimuladorEventoProps {
  onComplete: (data: any) => void;
}

interface GameState {
  fase: 'planejamento' | 'divulgacao' | 'evento' | 'pos-evento';
  recursos: {
    budget: number;
    audiencia: number;
    engajamento: number;
    vendas: number;
  };
  decisoes: any[];
  pontuacao: number;
  tipoEvento: string;
  nomeEvento: string;
  miniJogosCompletados: string[];
}

interface MiniGame {
  id: string;
  tipo: 'estrategia' | 'timing' | 'criatividade' | 'analise';
  titulo: string;
  descricao: string;
  impacto: {
    budget?: number;
    audiencia?: number;
    engajamento?: number;
    vendas?: number;
    pontuacao?: number;
  };
}

export const SimuladorEvento: React.FC<SimuladorEventoProps> = ({ onComplete }) => {
  const [gameState, setGameState] = useState<GameState>({
    fase: 'planejamento',
    recursos: {
      budget: 100,
      audiencia: 0,
      engajamento: 0,
      vendas: 0
    },
    decisoes: [],
    pontuacao: 0,
    tipoEvento: '',
    nomeEvento: '',
    miniJogosCompletados: []
  });

  const [currentMiniGame, setCurrentMiniGame] = useState<MiniGame | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [animatingMetrics, setAnimatingMetrics] = useState(false);

  // Mini-jogos por fase
  const miniGamesPlanejamento: MiniGame[] = [
    {
      id: 'tipo-evento',
      tipo: 'estrategia',
      titulo: 'Escolha o Tipo de Evento',
      descricao: 'Defina o DNA do seu evento para atrair o público certo',
      impacto: { audiencia: 20, engajamento: 10 }
    },
    {
      id: 'definir-publico',
      tipo: 'analise',
      titulo: 'Análise de Público-Alvo',
      descricao: 'Identifique quem são seus clientes ideais',
      impacto: { audiencia: 30, engajamento: 15 }
    },
    {
      id: 'estrutura-preco',
      tipo: 'estrategia',
      titulo: 'Estratégia de Preços',
      descricao: 'Defina valores que maximizem vendas e satisfação',
      impacto: { vendas: 25, budget: 20 }
    }
  ];

  const miniGamesDivulgacao: MiniGame[] = [
    {
      id: 'conteudo-viral',
      tipo: 'criatividade',
      titulo: 'Criar Conteúdo Viral',
      descricao: 'Desenvolva posts que engajem e convertam',
      impacto: { audiencia: 40, engajamento: 35 }
    },
    {
      id: 'timing-posts',
      tipo: 'timing',
      titulo: 'Timing Perfeito',
      descricao: 'Publique no momento certo para máximo alcance',
      impacto: { audiencia: 25, engajamento: 20 }
    },
    {
      id: 'influencers',
      tipo: 'estrategia',
      titulo: 'Parcerias Estratégicas',
      descricao: 'Conecte-se com influenciadores locais',
      impacto: { audiencia: 60, vendas: 30, budget: -15 }
    }
  ];

  const miniGamesEvento: MiniGame[] = [
    {
      id: 'experiencia-cliente',
      tipo: 'analise',
      titulo: 'Experiência do Cliente',
      descricao: 'Garanta que cada momento seja memorável',
      impacto: { engajamento: 40, vendas: 20 }
    },
    {
      id: 'gestao-crise',
      tipo: 'timing',
      titulo: 'Gestão de Imprevistos',
      descricao: 'Resolva problemas mantendo a qualidade',
      impacto: { engajamento: 25 }
    }
  ];

  const miniGamesPosEvento: MiniGame[] = [
    {
      id: 'feedback-analise',
      tipo: 'analise',
      titulo: 'Análise de Resultados',
      descricao: 'Extraia insights para o próximo evento',
      impacto: { pontuacao: 50 }
    },
    {
      id: 'fidelizacao',
      tipo: 'estrategia',
      titulo: 'Fidelização de Clientes',
      descricao: 'Transforme participantes em fãs',
      impacto: { audiencia: 30, vendas: 35 }
    }
  ];

  const getCurrentMiniGames = () => {
    switch (gameState.fase) {
      case 'planejamento': return miniGamesPlanejamento;
      case 'divulgacao': return miniGamesDivulgacao;
      case 'evento': return miniGamesEvento;
      case 'pos-evento': return miniGamesPosEvento;
      default: return [];
    }
  };

  const executeMiniGame = (miniGame: MiniGame, escolha: any) => {
    setAnimatingMetrics(true);
    
    // Aplicar impactos
    setGameState(prev => ({
      ...prev,
      recursos: {
        budget: Math.max(0, prev.recursos.budget + (miniGame.impacto.budget || 0)),
        audiencia: prev.recursos.audiencia + (miniGame.impacto.audiencia || 0),
        engajamento: prev.recursos.engajamento + (miniGame.impacto.engajamento || 0),
        vendas: prev.recursos.vendas + (miniGame.impacto.vendas || 0)
      },
      decisoes: [...prev.decisoes, { miniGame: miniGame.id, escolha }],
      pontuacao: prev.pontuacao + (miniGame.impacto.pontuacao || 10),
      miniJogosCompletados: [...prev.miniJogosCompletados, miniGame.id],
      // Atualizar dados do evento se necessário
      tipoEvento: escolha.tipoEvento || prev.tipoEvento,
      nomeEvento: escolha.nomeEvento || prev.nomeEvento
    }));

    setTimeout(() => {
      setAnimatingMetrics(false);
      setCurrentMiniGame(null);
    }, 1500);
  };

  const nextFase = () => {
    const fases = ['planejamento', 'divulgacao', 'evento', 'pos-evento'];
    const currentIndex = fases.indexOf(gameState.fase);
    
    if (currentIndex < fases.length - 1) {
      setGameState(prev => ({
        ...prev,
        fase: fases[currentIndex + 1] as any
      }));
    } else {
      // Finalizar jogo
      finalizarJogo();
    }
  };

  const finalizarJogo = () => {
    const resultado = {
      tipoJogo: 'SimuladorEvento',
      fase: gameState.fase,
      recursos: gameState.recursos,
      pontuacaoTotal: gameState.pontuacao,
      decisoes: gameState.decisoes,
      nivelSucesso: calcularNivelSucesso(),
      insights: gerarInsights()
    };
    
    onComplete(resultado);
  };

  const calcularNivelSucesso = () => {
    const { audiencia, engajamento, vendas } = gameState.recursos;
    const total = audiencia + engajamento + vendas;
    
    if (total >= 300) return 'Extraordinário';
    if (total >= 200) return 'Excelente';
    if (total >= 120) return 'Bom';
    return 'Iniciante';
  };

  const gerarInsights = () => {
    const insights: string[] = [];
    const { audiencia, engajamento, vendas } = gameState.recursos;
    
    if (audiencia > engajamento) {
      insights.push('Você tem boa visibilidade, mas pode melhorar o engajamento');
    }
    if (vendas > audiencia) {
      insights.push('Excelente conversão! Seu público é altamente qualificado');
    }
    if (engajamento > 80) {
      insights.push('Seu conteúdo cria conexão genuína com o público');
    }
    
    return insights;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white p-6">
      
      {/* Header com métricas */}
      <motion.div 
        className="max-w-6xl mx-auto mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-purple-500 bg-clip-text text-transparent mb-2">
            Simulador de Evento
          </h1>
          <p className="text-xl text-gray-300">
            Fase: <span className="text-orange-400 font-bold capitalize">{gameState.fase}</span>
          </p>
        </div>

        {/* Métricas Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {Object.entries(gameState.recursos).map(([key, value]) => (
            <motion.div
              key={key}
              className="bg-slate-800/50 rounded-xl p-4 border border-orange-500/20"
              animate={animatingMetrics ? { scale: [1, 1.05, 1], borderColor: ['rgba(251,146,60,0.2)', 'rgba(251,146,60,0.8)', 'rgba(251,146,60,0.2)'] } : {}}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400 capitalize">{key}</span>
                {key === 'budget' && <DollarSign className="w-5 h-5 text-green-400" />}
                {key === 'audiencia' && <Users className="w-5 h-5 text-blue-400" />}
                {key === 'engajamento' && <Heart className="w-5 h-5 text-pink-400" />}
                {key === 'vendas' && <TrendingUp className="w-5 h-5 text-orange-400" />}
              </div>
              <div className="text-2xl font-bold text-white mt-1">{value}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Conteúdo Principal */}
      <div className="max-w-4xl mx-auto">
        {!currentMiniGame ? (
          <FaseOverview 
            fase={gameState.fase}
            miniGames={getCurrentMiniGames()}
            onSelectMiniGame={setCurrentMiniGame}
            onNextFase={nextFase}
            gameState={gameState}
            miniJogosCompletados={gameState.miniJogosCompletados}
          />
        ) : (
          <MiniGameEspecifico
            miniGame={currentMiniGame}
            onComplete={executeMiniGame}
            onCancel={() => setCurrentMiniGame(null)}
          />
        )}
      </div>
    </div>
  );
};

// Componente para overview da fase
const FaseOverview: React.FC<{
  fase: string;
  miniGames: MiniGame[];
  onSelectMiniGame: (game: MiniGame) => void;
  onNextFase: () => void;
  gameState: GameState;
  miniJogosCompletados: string[];
}> = ({ fase, miniGames, onSelectMiniGame, onNextFase, gameState, miniJogosCompletados }) => {
  
  const faseInfo = {
    planejamento: {
      titulo: 'Planejamento Estratégico',
      descricao: 'Defina as bases do seu evento para garantir o sucesso',
      icon: Target,
      cor: 'from-blue-500 to-cyan-500'
    },
    divulgacao: {
      titulo: 'Divulgação e Marketing',
      descricao: 'Atraia e engaje seu público-alvo',
      icon: Share2,
      cor: 'from-orange-500 to-red-500'
    },
    evento: {
      titulo: 'Execução do Evento',
      descricao: 'Garanta uma experiência memorável',
      icon: Music,
      cor: 'from-purple-500 to-pink-500'
    },
    'pos-evento': {
      titulo: 'Pós-Evento',
      descricao: 'Analise resultados e fidelize clientes',
      icon: Award,
      cor: 'from-green-500 to-emerald-500'
    }
  };

  const info = faseInfo[fase as keyof typeof faseInfo];
  const IconComponent = info.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-8"
    >
      {/* Header da Fase */}
      <div className={`bg-gradient-to-r ${info.cor} rounded-2xl p-8 text-center`}>
        <IconComponent className="w-16 h-16 mx-auto mb-4 text-white" />
        <h2 className="text-3xl font-bold text-white mb-2">{info.titulo}</h2>
        <p className="text-xl text-white/90">{info.descricao}</p>
      </div>

      {/* Mini-jogos disponíveis */}
      <div className="grid gap-6">
        {miniGames.map((miniGame, index) => {
          const isCompleted = miniJogosCompletados.includes(miniGame.id);
          return (
            <motion.div
              key={miniGame.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`rounded-xl p-6 border-2 transition-all cursor-pointer group ${
                isCompleted 
                  ? 'bg-green-500/10 border-green-500/50' 
                  : 'bg-slate-800/50 border-orange-500/20 hover:border-orange-500/50'
              }`}
              onClick={() => !isCompleted && onSelectMiniGame(miniGame)}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className={`text-xl font-bold transition-colors ${
                      isCompleted 
                        ? 'text-green-400' 
                        : 'text-white group-hover:text-orange-400'
                    }`}>
                      {miniGame.titulo}
                    </h3>
                    {isCompleted && (
                      <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                        ✓ Concluído
                      </span>
                    )}
                  </div>
                  <p className="text-gray-300">{miniGame.descricao}</p>
                  
                  {/* Preview do impacto */}
                  <div className="flex gap-4 mt-4">
                    {Object.entries(miniGame.impacto).map(([key, value]) => (
                      <div key={key} className="flex items-center gap-1 text-sm">
                        {key === 'budget' && <DollarSign className="w-4 h-4 text-green-400" />}
                        {key === 'audiencia' && <Users className="w-4 h-4 text-blue-400" />}
                        {key === 'engajamento' && <Heart className="w-4 h-4 text-pink-400" />}
                        {key === 'vendas' && <TrendingUp className="w-4 h-4 text-orange-400" />}
                        <span className={value! > 0 ? 'text-green-400' : 'text-red-400'}>
                          {value! > 0 ? '+' : ''}{value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                {isCompleted ? (
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                ) : (
                  <ArrowRight className="w-6 h-6 text-orange-400 group-hover:translate-x-1 transition-transform" />
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Botão para próxima fase */}
      {miniGames.every(mg => miniJogosCompletados.includes(mg.id)) && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={onNextFase}
          className="w-full bg-gradient-to-r from-orange-500 to-purple-600 text-white py-4 rounded-xl font-bold text-xl hover:shadow-lg transition-all"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {fase === 'pos-evento' ? 'Finalizar Simulação' : 'Próxima Fase'}
        </motion.button>
      )}
    </motion.div>
  );
};

export default SimuladorEvento;
