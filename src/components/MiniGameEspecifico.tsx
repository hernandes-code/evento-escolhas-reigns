import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, Users, DollarSign, Clock, 
  Zap, Target, Heart, Sparkles,
  Music, Coffee, Briefcase, PartyPopper
} from 'lucide-react';

interface MiniGameProps {
  miniGame: {
    id: string;
    tipo: 'estrategia' | 'timing' | 'criatividade' | 'analise';
    titulo: string;
    descricao: string;
    impacto: any;
  };
  onComplete: (miniGame: any, resultado: any) => void;
  onCancel: () => void;
}

export const MiniGameEspecifico: React.FC<MiniGameProps> = ({ miniGame, onComplete, onCancel }) => {
  
  // Renderiza o mini-jogo específico baseado no ID
  const renderMiniGame = () => {
    switch (miniGame.id) {
      case 'tipo-evento':
        return <TipoEventoGame miniGame={miniGame} onComplete={onComplete} />;
      case 'definir-publico':
        return <PublicoAlvoGame miniGame={miniGame} onComplete={onComplete} />;
      case 'estrutura-preco':
        return <EstruturaPrecosGame miniGame={miniGame} onComplete={onComplete} />;
      case 'conteudo-viral':
        return <ConteudoViralGame miniGame={miniGame} onComplete={onComplete} />;
      case 'timing-posts':
        return <TimingPostsGame miniGame={miniGame} onComplete={onComplete} />;
      case 'influencers':
        return <InfluencersGame miniGame={miniGame} onComplete={onComplete} />;
      case 'experiencia-cliente':
        return <ExperienciaClienteGame miniGame={miniGame} onComplete={onComplete} />;
      case 'gestao-crise':
        return <GestaoCriseGame miniGame={miniGame} onComplete={onComplete} />;
      case 'feedback-analise':
        return <FeedbackAnaliseGame miniGame={miniGame} onComplete={onComplete} />;
      case 'fidelizacao':
        return <FidelizacaoGame miniGame={miniGame} onComplete={onComplete} />;
      default:
        return <DefaultGame miniGame={miniGame} onComplete={onComplete} />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="bg-slate-800/90 rounded-2xl p-8 border border-orange-500/30 backdrop-blur-sm"
    >
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">{miniGame.titulo}</h3>
          <p className="text-gray-300">{miniGame.descricao}</p>
        </div>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-slate-700/50 transition-all"
        >
          ✕
        </button>
      </div>
      
      {renderMiniGame()}
    </motion.div>
  );
};

// Mini-jogo: Escolha do Tipo de Evento
const TipoEventoGame: React.FC<{ miniGame: any; onComplete: any }> = ({ miniGame, onComplete }) => {
  const [selectedTipo, setSelectedTipo] = useState('');
  
  const tiposEvento = [
    { 
      id: 'festival', 
      nome: 'Festival de Música', 
      icon: Music, 
      description: 'Grande público, múltiplos artistas',
      publico: 'Jovens 18-35 anos',
      complexidade: 'Alta'
    },
    { 
      id: 'bar', 
      nome: 'Evento de Bar/Balada', 
      icon: Coffee, 
      description: 'Ambiente íntimo, música ambiente',
      publico: 'Adultos 25-45 anos',
      complexidade: 'Média'
    },
    { 
      id: 'corporativo', 
      nome: 'Evento Corporativo', 
      icon: Briefcase, 
      description: 'Networking profissional',
      publico: 'Profissionais 30-50 anos',
      complexidade: 'Alta'
    },
    { 
      id: 'festa-privada', 
      nome: 'Festa Privada', 
      icon: PartyPopper, 
      description: 'Celebração exclusiva',
      publico: 'Convidados específicos',
      complexidade: 'Baixa'
    }
  ];

  const handleSelect = (tipo: any) => {
    setSelectedTipo(tipo.id);
    setTimeout(() => {
      onComplete(miniGame, { 
        tipoEvento: tipo.id,
        nomeEvento: tipo.nome,
        publicoAlvo: tipo.publico,
        complexidade: tipo.complexidade
      });
    }, 500);
  };

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h4 className="text-lg font-semibold text-orange-400 mb-2">
          Qual tipo de evento você quer criar?
        </h4>
        <p className="text-gray-400">Essa escolha definirá sua estratégia</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tiposEvento.map((tipo) => {
          const IconComponent = tipo.icon;
          return (
            <motion.div
              key={tipo.id}
              onClick={() => handleSelect(tipo)}
              className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                selectedTipo === tipo.id 
                  ? 'border-orange-500 bg-orange-500/10' 
                  : 'border-slate-600 hover:border-orange-400/50 bg-slate-700/30'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-center">
                <IconComponent className="w-12 h-12 mx-auto mb-3 text-orange-400" />
                <h5 className="font-bold text-white mb-2">{tipo.nome}</h5>
                <p className="text-sm text-gray-300 mb-2">{tipo.description}</p>
                <div className="text-xs space-y-1">
                  <div className="text-blue-400">👥 {tipo.publico}</div>
                  <div className="text-purple-400">⚡ {tipo.complexidade}</div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

// Mini-jogo: Definir Público-Alvo
const PublicoAlvoGame: React.FC<{ miniGame: any; onComplete: any }> = ({ miniGame, onComplete }) => {
  const [selectedPersonas, setSelectedPersonas] = useState<string[]>([]);
  
  const personas = [
    { id: 'jovens-festeiros', nome: 'Jovens Festeiros', idade: '18-25', comportamento: 'Ativo nas redes sociais', interesse: 'Música, diversão' },
    { id: 'profissionais-jovens', nome: 'Profissionais Jovens', idade: '26-35', comportamento: 'Buscam networking', interesse: 'Carreira, experiências' },
    { id: 'executivos', nome: 'Executivos', idade: '36-50', comportamento: 'Focados em qualidade', interesse: 'Status, exclusividade' },
    { id: 'familias', nome: 'Famílias', idade: '30-45', comportamento: 'Buscam segurança', interesse: 'Entretenimento familiar' }
  ];

  const togglePersona = (personaId: string) => {
    setSelectedPersonas(prev => 
      prev.includes(personaId) 
        ? prev.filter(id => id !== personaId)
        : [...prev, personaId]
    );
  };

  const handleContinue = () => {
    if (selectedPersonas.length > 0) {
      onComplete(miniGame, { 
        personasSelecionadas: selectedPersonas,
        focoPublico: selectedPersonas.length === 1 ? 'Específico' : 'Diversificado'
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h4 className="text-lg font-semibold text-orange-400 mb-2">
          Quem é seu público-alvo?
        </h4>
        <p className="text-gray-400">Selecione as personas que você quer atingir</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {personas.map((persona) => (
          <motion.div
            key={persona.id}
            onClick={() => togglePersona(persona.id)}
            className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
              selectedPersonas.includes(persona.id)
                ? 'border-orange-500 bg-orange-500/10' 
                : 'border-slate-600 hover:border-orange-400/50 bg-slate-700/30'
            }`}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-start space-x-3">
              <div className={`w-4 h-4 rounded-full border-2 mt-1 ${
                selectedPersonas.includes(persona.id) ? 'bg-orange-500 border-orange-500' : 'border-gray-400'
              }`} />
              <div className="flex-1">
                <h5 className="font-bold text-white">{persona.nome}</h5>
                <p className="text-sm text-blue-400">{persona.idade} anos</p>
                <p className="text-sm text-gray-300">{persona.comportamento}</p>
                <p className="text-xs text-purple-400">{persona.interesse}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {selectedPersonas.length > 0 && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={handleContinue}
          className="w-full bg-gradient-to-r from-orange-500 to-purple-600 text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all"
        >
          Continuar com {selectedPersonas.length} persona(s) selecionada(s)
        </motion.button>
      )}
    </div>
  );
};

// Mini-jogo: Estrutura de Preços
const EstruturaPrecosGame: React.FC<{ miniGame: any; onComplete: any }> = ({ miniGame, onComplete }) => {
  const [selectedStrategy, setSelectedStrategy] = useState('');
  
  const estrategias = [
    {
      id: 'promocional',
      nome: 'Estratégia Promocional',
      preco: 'R$ 30-50',
      descricao: 'Preços baixos para atrair grande volume',
      vantagens: ['Alto volume de vendas', 'Alcance amplo', 'Fácil adesão'],
      desvantagens: ['Menor margem', 'Público menos qualificado']
    },
    {
      id: 'premium',
      nome: 'Estratégia Premium',
      preco: 'R$ 150-300',
      descricao: 'Preços altos para público seleto',
      vantagens: ['Alta margem', 'Público qualificado', 'Exclusividade'],
      desvantagens: ['Menor volume', 'Marketing mais exigente']
    },
    {
      id: 'escalonada',
      nome: 'Estratégia Escalonada',
      preco: 'R$ 60-120',
      descricao: 'Preços que sobem conforme a data se aproxima',
      vantagens: ['Vendas antecipadas', 'Senso de urgência', 'Flexibilidade'],
      desvantagens: ['Gestão complexa', 'Comunicação desafiante']
    }
  ];

  const handleSelect = (estrategia: any) => {
    setSelectedStrategy(estrategia.id);
    setTimeout(() => {
      onComplete(miniGame, { 
        estrategiaPreco: estrategia.id,
        faixaPreco: estrategia.preco,
        focoComercial: estrategia.nome
      });
    }, 500);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h4 className="text-lg font-semibold text-orange-400 mb-2">
          Qual sua estratégia de preços?
        </h4>
        <p className="text-gray-400">Define como você vai posicionar seu evento no mercado</p>
      </div>
      
      <div className="space-y-4">
        {estrategias.map((estrategia) => (
          <motion.div
            key={estrategia.id}
            onClick={() => handleSelect(estrategia)}
            className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
              selectedStrategy === estrategia.id 
                ? 'border-orange-500 bg-orange-500/10' 
                : 'border-slate-600 hover:border-orange-400/50 bg-slate-700/30'
            }`}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h5 className="font-bold text-white text-lg">{estrategia.nome}</h5>
                <p className="text-2xl font-bold text-orange-400">{estrategia.preco}</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-400" />
            </div>
            
            <p className="text-gray-300 mb-4">{estrategia.descricao}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h6 className="text-green-400 font-semibold mb-2">✅ Vantagens</h6>
                <ul className="text-sm space-y-1">
                  {estrategia.vantagens.map((vantagem, idx) => (
                    <li key={idx} className="text-gray-300">• {vantagem}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h6 className="text-red-400 font-semibold mb-2">⚠️ Desafios</h6>
                <ul className="text-sm space-y-1">
                  {estrategia.desvantagens.map((desvantagem, idx) => (
                    <li key={idx} className="text-gray-300">• {desvantagem}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Mini-jogo padrão para outros casos
const DefaultGame: React.FC<{ miniGame: any; onComplete: any }> = ({ miniGame, onComplete }) => {
  return (
    <div className="text-center space-y-6">
      <div className="text-6xl">🎯</div>
      <p className="text-gray-300">Mini-jogo em desenvolvimento...</p>
      <button
        onClick={() => onComplete(miniGame, { completed: true })}
        className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-bold"
      >
        Completar
      </button>
    </div>
  );
};

// Placeholder para os outros mini-jogos
const ConteudoViralGame: React.FC<{ miniGame: any; onComplete: any }> = ({ miniGame, onComplete }) => {
  const [selectedElements, setSelectedElements] = useState<string[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(10);
  
  const elementos = [
    { id: 'hashtag-trending', nome: '#EventoImperdível', tipo: 'hashtag', impacto: 15 },
    { id: 'imagem-atrativa', nome: 'Imagem de alta qualidade', tipo: 'visual', impacto: 20 },
    { id: 'call-to-action', nome: 'Call-to-Action claro', tipo: 'texto', impacto: 18 },
    { id: 'depoimento', nome: 'Depoimento de cliente', tipo: 'social', impacto: 22 },
    { id: 'urgencia', nome: 'Senso de urgência', tipo: 'psicologico', impacto: 16 },
    { id: 'promo-limitada', nome: 'Promoção por tempo limitado', tipo: 'comercial', impacto: 25 },
    { id: 'story-behind', nome: 'História por trás do evento', tipo: 'emocional', impacto: 19 },
    { id: 'preview-lineup', nome: 'Preview do line-up', tipo: 'conteudo', impacto: 17 }
  ];

  useEffect(() => {
    if (timeRemaining > 0) {
      const timer = setTimeout(() => setTimeRemaining(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      finalizarJogo();
    }
  }, [timeRemaining]);

  const toggleElement = (elementId: string) => {
    if (timeRemaining > 0) {
      setSelectedElements(prev => 
        prev.includes(elementId) 
          ? prev.filter(id => id !== elementId)
          : [...prev, elementId]
      );
    }
  };

  const finalizarJogo = () => {
    const impactoTotal = selectedElements.reduce((total, id) => {
      const elemento = elementos.find(e => e.id === id);
      return total + (elemento?.impacto || 0);
    }, 0);

    onComplete(miniGame, { 
      elementosSelecionados: selectedElements,
      impactoViral: impactoTotal,
      estrategiaConteudo: impactoTotal > 60 ? 'Viral' : impactoTotal > 30 ? 'Eficaz' : 'Básica'
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h4 className="text-lg font-semibold text-orange-400 mb-2">
          Crie o Post Viral Perfeito!
        </h4>
        <p className="text-gray-400">Selecione os elementos mais impactantes</p>
        <div className="text-2xl font-bold text-red-400 mt-2">
          ⏰ {timeRemaining}s
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {elementos.map((elemento) => (
          <motion.div
            key={elemento.id}
            onClick={() => toggleElement(elemento.id)}
            className={`p-3 rounded-xl border-2 cursor-pointer transition-all text-center ${
              selectedElements.includes(elemento.id)
                ? 'border-orange-500 bg-orange-500/20' 
                : 'border-slate-600 hover:border-orange-400/50 bg-slate-700/30'
            }`}
            whileHover={{ scale: timeRemaining > 0 ? 1.05 : 1 }}
            whileTap={{ scale: timeRemaining > 0 ? 0.95 : 1 }}
          >
            <div className="text-2xl mb-2">
              {elemento.tipo === 'hashtag' && '🔥'}
              {elemento.tipo === 'visual' && '🎨'}
              {elemento.tipo === 'texto' && '📝'}
              {elemento.tipo === 'social' && '💬'}
              {elemento.tipo === 'psicologico' && '⚡'}
              {elemento.tipo === 'comercial' && '💰'}
              {elemento.tipo === 'emocional' && '❤️'}
              {elemento.tipo === 'conteudo' && '🎵'}
            </div>
            <h6 className="text-sm font-semibold text-white mb-1">{elemento.nome}</h6>
            <div className="text-xs text-orange-400">+{elemento.impacto} viral</div>
          </motion.div>
        ))}
      </div>
      
      {timeRemaining === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-4 bg-slate-800/50 rounded-xl"
        >
          <h5 className="text-lg font-bold text-white mb-2">Tempo Esgotado!</h5>
          <p className="text-gray-300">
            Você selecionou {selectedElements.length} elementos
          </p>
        </motion.div>
      )}
    </div>
  );
};

const TimingPostsGame: React.FC<{ miniGame: any; onComplete: any }> = ({ miniGame, onComplete }) => {
  const [selectedHorarios, setSelectedHorarios] = useState<string[]>([]);
  const [fase, setFase] = useState(0); // 0: manhã, 1: tarde, 2: noite
  
  const horarios = {
    manha: [
      { hora: '07:00', publico: 'Baixo', engajamento: 'Médio', ideal: false },
      { hora: '08:30', publico: 'Médio', engajamento: 'Alto', ideal: true },
      { hora: '10:00', publico: 'Alto', engajamento: 'Médio', ideal: false },
      { hora: '11:30', publico: 'Médio', engajamento: 'Baixo', ideal: false }
    ],
    tarde: [
      { hora: '12:00', publico: 'Alto', engajamento: 'Alto', ideal: true },
      { hora: '14:00', publico: 'Médio', engajamento: 'Médio', ideal: false },
      { hora: '16:00', publico: 'Alto', engajamento: 'Baixo', ideal: false },
      { hora: '17:30', publico: 'Alto', engajamento: 'Alto', ideal: true }
    ],
    noite: [
      { hora: '19:00', publico: 'Alto', engajamento: 'Alto', ideal: true },
      { hora: '21:00', publico: 'Médio', engajamento: 'Alto', ideal: true },
      { hora: '23:00', publico: 'Baixo', engajamento: 'Médio', ideal: false },
      { hora: '00:30', publico: 'Baixo', engajamento: 'Baixo', ideal: false }
    ]
  };

  const faseNomes = ['Manhã', 'Tarde', 'Noite'];
  const horariosAtual = Object.values(horarios)[fase];

  const selecionarHorario = (hora: string) => {
    const horarioObj = horariosAtual.find(h => h.hora === hora);
    if (horarioObj) {
      setSelectedHorarios(prev => [...prev, hora]);
      
      if (fase < 2) {
        setTimeout(() => setFase(prev => prev + 1), 1000);
      } else {
        // Finalizar
        setTimeout(() => {
          const horariosIdeais = selectedHorarios.filter(h => {
            return Object.values(horarios).flat().find(ho => ho.hora === h)?.ideal;
          });
          
          onComplete(miniGame, {
            horariosEscolhidos: selectedHorarios,
            eficiencia: horariosIdeais.length / 3,
            estrategiaTiming: horariosIdeais.length >= 2 ? 'Otimizada' : 'Padrão'
          });
        }, 1000);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h4 className="text-lg font-semibold text-orange-400 mb-2">
          Timing Perfeito - {faseNomes[fase]}
        </h4>
        <p className="text-gray-400">Escolha o melhor horário para postar</p>
        <div className="flex justify-center mt-3">
          {faseNomes.map((nome, idx) => (
            <div key={nome} className={`w-8 h-8 rounded-full mx-1 flex items-center justify-center text-sm ${
              idx === fase ? 'bg-orange-500 text-white' : 
              idx < fase ? 'bg-green-500 text-white' : 'bg-gray-600 text-gray-300'
            }`}>
              {idx < fase ? '✓' : idx + 1}
            </div>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {horariosAtual.map((horario) => (
          <motion.div
            key={horario.hora}
            onClick={() => selecionarHorario(horario.hora)}
            className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
              horario.ideal 
                ? 'border-green-500/50 bg-green-500/10 hover:border-green-400' 
                : 'border-slate-600 bg-slate-700/30 hover:border-orange-400/50'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-2">{horario.hora}</div>
              <div className="space-y-1 text-sm">
                <div>👥 Público: <span className={
                  horario.publico === 'Alto' ? 'text-green-400' : 
                  horario.publico === 'Médio' ? 'text-yellow-400' : 'text-red-400'
                }>{horario.publico}</span></div>
                <div>💖 Engajamento: <span className={
                  horario.engajamento === 'Alto' ? 'text-green-400' : 
                  horario.engajamento === 'Médio' ? 'text-yellow-400' : 'text-red-400'
                }>{horario.engajamento}</span></div>
              </div>
              {horario.ideal && (
                <div className="text-xs text-green-400 mt-2">⭐ Horário Ideal</div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const InfluencersGame: React.FC<{ miniGame: any; onComplete: any }> = ({ miniGame, onComplete }) => {
  const [selectedInfluencers, setSelectedInfluencers] = useState<string[]>([]);
  const [budget, setBudget] = useState(100);
  
  const influencers = [
    { id: 'micro-1', nome: '@eventoslove', seguidores: '15K', custo: 20, niche: 'Eventos', engajamento: '8%', alcance: 15 },
    { id: 'micro-2', nome: '@festafinder', seguidores: '22K', custo: 30, niche: 'Vida Noturna', engajamento: '6%', alcance: 20 },
    { id: 'medio-1', nome: '@partyvibes', seguidores: '85K', custo: 60, niche: 'Entretenimento', engajamento: '4%', alcance: 50 },
    { id: 'macro-1', nome: '@megaeventos', seguidores: '300K', custo: 120, niche: 'Eventos', engajamento: '2%', alcance: 80 },
    { id: 'local-1', nome: '@cidadeaqui', seguidores: '45K', custo: 40, niche: 'Local', engajamento: '7%', alcance: 35 },
    { id: 'celebrity', nome: '@famoso', seguidores: '1M', custo: 200, niche: 'Celebrity', engajamento: '1%', alcance: 100 }
  ];

  const toggleInfluencer = (influencerId: string) => {
    const influencer = influencers.find(i => i.id === influencerId);
    if (!influencer) return;
    
    if (selectedInfluencers.includes(influencerId)) {
      setSelectedInfluencers(prev => prev.filter(id => id !== influencerId));
      setBudget(prev => prev + influencer.custo);
    } else if (budget >= influencer.custo) {
      setSelectedInfluencers(prev => [...prev, influencerId]);
      setBudget(prev => prev - influencer.custo);
    }
  };

  const finalizarEscolha = () => {
    const alcanceTotal = selectedInfluencers.reduce((total, id) => {
      const influencer = influencers.find(i => i.id === id);
      return total + (influencer?.alcance || 0);
    }, 0);

    const custoTotal = selectedInfluencers.reduce((total, id) => {
      const influencer = influencers.find(i => i.id === id);
      return total + (influencer?.custo || 0);
    }, 0);

    onComplete(miniGame, {
      influencersSelecionados: selectedInfluencers,
      alcanceTotal,
      custoTotal,
      eficiencia: alcanceTotal / (custoTotal || 1),
      estrategia: selectedInfluencers.length > 3 ? 'Diversificada' : selectedInfluencers.length > 1 ? 'Focada' : 'Minimalista'
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h4 className="text-lg font-semibold text-orange-400 mb-2">
          Parcerias Estratégicas
        </h4>
        <p className="text-gray-400">Escolha influenciadores dentro do seu budget</p>
        <div className="text-xl font-bold text-green-400 mt-2">
          💰 Budget: R$ {budget}
        </div>
      </div>
      
      <div className="grid gap-4">
        {influencers.map((influencer) => {
          const isSelected = selectedInfluencers.includes(influencer.id);
          const canAfford = budget >= influencer.custo;
          
          return (
            <motion.div
              key={influencer.id}
              onClick={() => toggleInfluencer(influencer.id)}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                isSelected 
                  ? 'border-orange-500 bg-orange-500/20' 
                  : canAfford 
                    ? 'border-slate-600 hover:border-orange-400/50 bg-slate-700/30'
                    : 'border-red-500/50 bg-red-500/10 cursor-not-allowed'
              }`}
              whileHover={{ scale: canAfford || isSelected ? 1.02 : 1 }}
              animate={isSelected ? { borderColor: ['rgba(251,146,60,0.5)', 'rgba(251,146,60,1)', 'rgba(251,146,60,0.5)'] } : {}}
              transition={{ duration: 1, repeat: isSelected ? Infinity : 0 }}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h5 className="font-bold text-white">{influencer.nome}</h5>
                  <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
                    <div>
                      <span className="text-blue-400">👥 {influencer.seguidores}</span>
                      <br />
                      <span className="text-purple-400">📊 {influencer.engajamento}</span>
                    </div>
                    <div>
                      <span className="text-green-400">💰 R$ {influencer.custo}</span>
                      <br />
                      <span className="text-orange-400">📈 +{influencer.alcance} alcance</span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className="text-xs bg-slate-600 px-2 py-1 rounded">{influencer.niche}</span>
                  </div>
                </div>
                <div className="ml-4">
                  {isSelected ? (
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">✓</span>
                    </div>
                  ) : canAfford ? (
                    <div className="w-8 h-8 border-2 border-gray-400 rounded-full"></div>
                  ) : (
                    <div className="w-8 h-8 bg-red-500/20 border border-red-500 rounded-full flex items-center justify-center">
                      <span className="text-red-400 text-sm">✗</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
      
      {selectedInfluencers.length > 0 && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={finalizarEscolha}
          className="w-full bg-gradient-to-r from-orange-500 to-purple-600 text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all"
        >
          Confirmar Parcerias ({selectedInfluencers.length} selecionados)
        </motion.button>
      )}
    </div>
  );
};

const ExperienciaClienteGame = DefaultGame;
const GestaoCriseGame = DefaultGame;
const FeedbackAnaliseGame = DefaultGame;
const FidelizacaoGame = DefaultGame;

export default MiniGameEspecifico;
