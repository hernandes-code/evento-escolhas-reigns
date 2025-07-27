import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clock, Users, DollarSign, TrendingUp, 
  Target, Zap, Award, ArrowRight, 
  CheckCircle, AlertTriangle, Brain,
  Smartphone, Share2, BarChart3, Heart
} from 'lucide-react';
import ResultadosQuiz from './ResultadosQuiz';

interface QuizDiagnosticoProps {
  onComplete: (data: any) => void;
}

interface Pergunta {
  id: string;
  titulo: string;
  categoria: 'marketing' | 'organizacao' | 'vendas' | 'digital';
  opcoes: {
    id: string;
    texto: string;
    pontos: number;
    dica: string;
    icon: any;
  }[];
  tempoLimite?: number;
}

interface ResultadoQuiz {
  pontuacaoTotal: number;
  categorias: {
    marketing: number;
    organizacao: number;
    vendas: number;
    digital: number;
  };
  nivel: 'classico' | 'intermediario' | 'avancado';
  pontosFortes: string[];
  areasParaMelhoria: string[];
  recomendacoes: string[];
  categoriaDominante: string;
}

const QuizDiagnostico: React.FC<QuizDiagnosticoProps> = ({ onComplete }) => {
  const [perguntaAtual, setPerguntaAtual] = useState(0);
  const [respostas, setRespostas] = useState<any[]>([]);
  const [tempoRestante, setTempoRestante] = useState(45);
  const [mostrandoDica, setMostrandoDica] = useState(false);
  const [dicaAtual, setDicaAtual] = useState('');
  const [progresso, setProgresso] = useState(0);
  const [mostrandoResultados, setMostrandoResultados] = useState(false);
  const [resultadoFinal, setResultadoFinal] = useState<any>(null);

  const perguntas: Pergunta[] = [
    {
      id: 'q1',
      titulo: 'Como você promove seus eventos atualmente?',
      categoria: 'marketing',
      opcoes: [
        { 
          id: 'a1', 
          texto: 'Redes sociais básicas (Facebook, Instagram)', 
          pontos: 2, 
          dica: 'Boa base! Mas há muito mais potencial nas redes sociais.',
          icon: Share2
        },
        { 
          id: 'a2', 
          texto: 'WhatsApp e boca a boca', 
          pontos: 1, 
          dica: 'Método tradicional. Marketing digital pode amplificar muito seus resultados!',
          icon: Smartphone
        },
        { 
          id: 'a3', 
          texto: 'Estratégia multi-canal com anúncios pagos', 
          pontos: 4, 
          dica: 'Excelente! Você já entende o poder do marketing digital.',
          icon: Target
        },
        { 
          id: 'a4', 
          texto: 'Não tenho estratégia definida', 
          pontos: 0, 
          dica: 'Oportunidade de ouro! Uma estratégia clara pode transformar seus resultados.',
          icon: AlertTriangle
        }
      ]
    },
    {
      id: 'q2',
      titulo: 'Qual seu maior desafio na venda de ingressos?',
      categoria: 'vendas',
      opcoes: [
        { 
          id: 'b1', 
          texto: 'Alcançar o público certo', 
          pontos: 3, 
          dica: 'Segmentação é chave! Marketing digital resolve isso.',
          icon: Users
        },
        { 
          id: 'b2', 
          texto: 'Controle de vendas e organização', 
          pontos: 2, 
          dica: 'Ferramentas digitais podem automatizar isso para você.',
          icon: BarChart3
        },
        { 
          id: 'b3', 
          texto: 'Convencer pessoas a comprar antecipado', 
          pontos: 3, 
          dica: 'Urgência e valor percebido são fundamentais!',
          icon: Clock
        },
        { 
          id: 'b4', 
          texto: 'Todos os acima', 
          pontos: 1, 
          dica: 'Muitos desafios, mas uma boa estratégia resolve tudo junto!',
          icon: AlertTriangle
        }
      ]
    },
    {
      id: 'q3',
      titulo: 'Como você acompanha o desempenho dos seus eventos?',
      categoria: 'organizacao',
      opcoes: [
        { 
          id: 'c1', 
          texto: 'Planilhas Excel ou controle manual', 
          pontos: 2, 
          dica: 'Funciona, mas ferramentas digitais são muito mais eficientes.',
          icon: BarChart3
        },
        { 
          id: 'c2', 
          texto: 'Plataforma digital com relatórios', 
          pontos: 4, 
          dica: 'Perfeito! Dados em tempo real fazem toda diferença.',
          icon: TrendingUp
        },
        { 
          id: 'c3', 
          texto: 'Só conto o dinheiro no final', 
          pontos: 0, 
          dica: 'Você está perdendo insights valiosos! Métricas guiam o sucesso.',
          icon: DollarSign
        },
        { 
          id: 'c4', 
          texto: 'Acompanho vendas, mas não analiso dados', 
          pontos: 1, 
          dica: 'Primeiro passo dado! Análise de dados revela oportunidades.',
          icon: Brain
        }
      ]
    },
    {
      id: 'q4',
      titulo: 'Qual seu nível de conforto com tecnologia?',
      categoria: 'digital',
      opcoes: [
        { 
          id: 'd1', 
          texto: 'Uso o básico (WhatsApp, Facebook)', 
          pontos: 1, 
          dica: 'Ótimo início! Há ferramentas simples que podem revolucionar seu negócio.',
          icon: Smartphone
        },
        { 
          id: 'd2', 
          texto: 'Confortável com apps e plataformas', 
          pontos: 3, 
          dica: 'Excelente! Você tem potencial para dominar o marketing digital.',
          icon: Target
        },
        { 
          id: 'd3', 
          texto: 'Experiente em ferramentas digitais', 
          pontos: 4, 
          dica: 'Fantástico! Você pode maximizar todas as oportunidades digitais.',
          icon: Zap
        },
        { 
          id: 'd4', 
          texto: 'Prefiro métodos tradicionais', 
          pontos: 0, 
          dica: 'Entendemos! Mas pequenos passos digitais trazem grandes resultados.',
          icon: Heart
        }
      ]
    },
    {
      id: 'q5',
      titulo: 'Como você define o sucesso de um evento?',
      categoria: 'vendas',
      opcoes: [
        { 
          id: 'e1', 
          texto: 'Lotação total', 
          pontos: 2, 
          dica: 'Importante! Mas há outras métricas valiosas para acompanhar.',
          icon: Users
        },
        { 
          id: 'e2', 
          texto: 'Lucro planejado atingido', 
          pontos: 3, 
          dica: 'Visão comercial sólida! ROI é fundamental no negócio.',
          icon: DollarSign
        },
        { 
          id: 'e3', 
          texto: 'Feedback positivo dos participantes', 
          pontos: 3, 
          dica: 'Excelente! Satisfação gera fidelização e indicações.',
          icon: Heart
        },
        { 
          id: 'e4', 
          texto: 'Combinação de vendas, satisfação e crescimento', 
          pontos: 4, 
          dica: 'Visão holística perfeita! Você pensa como um verdadeiro empresário.',
          icon: Award
        }
      ]
    },
    {
      id: 'q6',
      titulo: 'Qual sua maior aspiração para seus eventos?',
      categoria: 'marketing',
      opcoes: [
        { 
          id: 'f1', 
          texto: 'Aumentar a frequência de eventos', 
          pontos: 2, 
          dica: 'Ambição ótima! Organização digital facilita múltiplos eventos.',
          icon: TrendingUp
        },
        { 
          id: 'f2', 
          texto: 'Atingir públicos maiores', 
          pontos: 3, 
          dica: 'Marketing digital é seu melhor aliado para crescer!',
          icon: Users
        },
        { 
          id: 'f3', 
          texto: 'Ter eventos mais rentáveis', 
          pontos: 3, 
          dica: 'Estratégia e eficiência são chaves para maior rentabilidade.',
          icon: DollarSign
        },
        { 
          id: 'f4', 
          texto: 'Criar uma marca reconhecida', 
          pontos: 4, 
          dica: 'Visão de longo prazo! Branding + marketing digital = sucesso.',
          icon: Award
        }
      ]
    },
    {
      id: 'q7',
      titulo: 'O que mais te frustra no processo atual?',
      categoria: 'organizacao',
      opcoes: [
        { 
          id: 'g1', 
          texto: 'Muito trabalho manual e repetitivo', 
          pontos: 3, 
          dica: 'Automação vai libertar seu tempo para focar no que importa!',
          icon: Clock
        },
        { 
          id: 'g2', 
          texto: 'Dificuldade para medir resultados', 
          pontos: 3, 
          dica: 'Métricas claras transformam intuição em estratégia vencedora.',
          icon: BarChart3
        },
        { 
          id: 'g3', 
          texto: 'Vendas abaixo do esperado', 
          pontos: 2, 
          dica: 'Marketing direcionado pode multiplicar suas conversões!',
          icon: TrendingUp
        },
        { 
          id: 'g4', 
          texto: 'Falta de tempo para tudo', 
          pontos: 1, 
          dica: 'Eficiência é tudo! Ferramentas certas economizam horas.',
          icon: AlertTriangle
        }
      ]
    }
  ];

  // Timer da pergunta
  useEffect(() => {
    if (tempoRestante > 0 && perguntaAtual < perguntas.length) {
      const timer = setTimeout(() => setTempoRestante(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (tempoRestante === 0 && perguntaAtual < perguntas.length) {
      // Auto-avançar se tempo esgotar
      proximaPergunta({ id: 'timeout', texto: 'Tempo esgotado', pontos: 0, dica: '', icon: Clock });
    }
  }, [tempoRestante, perguntaAtual]);

  // Atualizar progresso
  useEffect(() => {
    setProgresso((perguntaAtual / perguntas.length) * 100);
  }, [perguntaAtual]);

  const selecionarResposta = (opcao: any) => {
    // Mostrar dica rapidamente
    setDicaAtual(opcao.dica);
    setMostrandoDica(true);
    
    setTimeout(() => {
      setMostrandoDica(false);
      proximaPergunta(opcao);
    }, 1500);
  };

  const proximaPergunta = (opcao: any) => {
    const novaResposta = {
      pergunta: perguntas[perguntaAtual].id,
      categoria: perguntas[perguntaAtual].categoria,
      resposta: opcao.id,
      pontos: opcao.pontos,
      tempo: 45 - tempoRestante
    };
    
    setRespostas(prev => [...prev, novaResposta]);
    
    if (perguntaAtual < perguntas.length - 1) {
      setPerguntaAtual(prev => prev + 1);
      setTempoRestante(45);
    } else {
      finalizarQuiz([...respostas, novaResposta]);
    }
  };

  const finalizarQuiz = (todasRespostas: any[]) => {
    const resultado = calcularResultado(todasRespostas);
    const dadosCompletos = {
      tipoJogo: 'QuizDiagnostico',
      respostas: todasRespostas,
      resultado,
      tempoTotal: todasRespostas.reduce((acc, r) => acc + r.tempo, 0),
      dataCompleta: new Date().toISOString()
    };
    
    setResultadoFinal(dadosCompletos);
    setMostrandoResultados(true);
  };

  const handleContinueFromResults = () => {
    onComplete(resultadoFinal);
  };

  const calcularResultado = (todasRespostas: any[]): ResultadoQuiz => {
    const pontuacaoTotal = todasRespostas.reduce((acc, r) => acc + r.pontos, 0);
    const maxPossivel = perguntas.length * 4; // 4 pontos máximo por pergunta
    
    // Calcular por categoria
    const categorias = {
      marketing: 0,
      organizacao: 0,
      vendas: 0,
      digital: 0
    };
    
    todasRespostas.forEach(resposta => {
      categorias[resposta.categoria as keyof typeof categorias] += resposta.pontos;
    });

    // Determinar nível
    const porcentagem = (pontuacaoTotal / maxPossivel) * 100;
    let nivel: 'classico' | 'intermediario' | 'avancado';
    
    if (porcentagem >= 75) nivel = 'avancado';
    else if (porcentagem >= 45) nivel = 'intermediario';
    else nivel = 'classico';

    // Identificar pontos fortes e fracos
    const pontosFortes = Object.entries(categorias)
      .filter(([_, pontos]) => pontos >= 6)
      .map(([categoria, _]) => categoria);
    
    const areasParaMelhoria = Object.entries(categorias)
      .filter(([_, pontos]) => pontos < 4)
      .map(([categoria, _]) => categoria);

    // Determinar categoria dominante
    const categoriaDominante = Object.entries(categorias)
      .reduce((a, b) => categorias[a[0] as keyof typeof categorias] > categorias[b[0] as keyof typeof categorias] ? a : b)[0];

    // Gerar recomendações personalizadas
    const recomendacoes = gerarRecomendacoes(nivel, categorias, areasParaMelhoria);

    return {
      pontuacaoTotal,
      categorias,
      nivel,
      pontosFortes,
      areasParaMelhoria,
      recomendacoes,
      categoriaDominante
    };
  };

  const gerarRecomendacoes = (nivel: string, categorias: any, areas: string[]) => {
    const recomendacoes = [];
    
    if (areas.includes('marketing')) {
      recomendacoes.push('Aprenda estratégias simples de marketing digital para eventos');
    }
    if (areas.includes('organizacao')) {
      recomendacoes.push('Implemente ferramentas de organização e controle');
    }
    if (areas.includes('vendas')) {
      recomendacoes.push('Desenvolva técnicas de conversão e vendas antecipadas');
    }
    if (areas.includes('digital')) {
      recomendacoes.push('Familiarize-se com tecnologias que facilitam a gestão');
    }

    if (nivel === 'avancado') {
      recomendacoes.push('Explore estratégias avançadas de crescimento e automação');
    }

    return recomendacoes;
  };

  if (mostrandoResultados && resultadoFinal) {
    return (
      <ResultadosQuiz
        resultado={resultadoFinal.resultado}
        tempoTotal={resultadoFinal.tempoTotal}
        onContinue={handleContinueFromResults}
      />
    );
  }

  if (mostrandoDica) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center max-w-lg mx-auto p-8"
        >
          <div className="text-6xl mb-4">💡</div>
          <h3 className="text-2xl font-bold text-orange-400 mb-4">Insight Rápido</h3>
          <p className="text-xl text-gray-300">{dicaAtual}</p>
        </motion.div>
      </div>
    );
  }

  const pergunta = perguntas[perguntaAtual];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white p-6">
      
      {/* Header com progresso */}
      <motion.div 
        className="max-w-4xl mx-auto mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">
              Pergunta {perguntaAtual + 1} de {perguntas.length}
            </span>
            <span className="text-sm text-orange-400 flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {tempoRestante}s
            </span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-3">
            <motion.div
              className="bg-gradient-to-r from-orange-500 to-purple-600 h-3 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progresso}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Título da pergunta */}
        <motion.div
          key={perguntaAtual}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-center"
        >
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-400 to-purple-500 bg-clip-text text-transparent mb-4">
            {pergunta.titulo}
          </h1>
          <p className="text-gray-400">Escolha a opção que mais se identifica com você</p>
        </motion.div>
      </motion.div>

      {/* Opções de resposta */}
      <motion.div 
        className="max-w-4xl mx-auto"
        key={perguntaAtual}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pergunta.opcoes.map((opcao, index) => {
            const IconComponent = opcao.icon;
            return (
              <motion.div
                key={opcao.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => selecionarResposta(opcao)}
                className="bg-slate-800/50 rounded-xl p-6 border-2 border-orange-500/20 hover:border-orange-500/60 transition-all cursor-pointer group"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-orange-500/20 p-3 rounded-lg group-hover:bg-orange-500/30 transition-colors">
                    <IconComponent className="w-6 h-6 text-orange-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-orange-400 transition-colors">
                      {opcao.texto}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Toque para selecionar</span>
                      <ArrowRight className="w-5 h-5 text-orange-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Indicador de tempo crítico */}
      {tempoRestante <= 10 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-red-500/20 border border-red-500 rounded-xl px-4 py-2"
        >
          <span className="text-red-400 font-bold">⏰ Tempo se esgotando!</span>
        </motion.div>
      )}
    </div>
  );
};

export default QuizDiagnostico;
