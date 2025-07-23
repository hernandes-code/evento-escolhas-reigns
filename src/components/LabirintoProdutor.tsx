import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, Zap, Eye, Sparkles, Target, Cpu, 
  ChevronRight, Timer, Stars, Hexagon, Layers,
  Atom, Waves, Orbit, Scan, Activity, TrendingUp
} from 'lucide-react';
import { CENARIOS_LABIRINTO, PERFIS_PRODUTOR, TRAITS_NEURAIS, PortalCenario } from '../data/labirintoData';

interface LabirintoProps {
  isOpen: boolean;
  onComplete: (resultado: any) => void;
  playerName: string;
}

interface EstadoNeural {
  estrategico: number;
  organizador: number;
  tech_savvy: number;
  criativo: number;
  relacionamento: number;
  inclusivo: number;
  proativo: number;
  visionario: number;
}

const LabirintoProdutor: React.FC<LabirintoProps> = ({ isOpen, onComplete, playerName }) => {
  const [fase, setFase] = useState<'inicializando' | 'navegando' | 'analisando' | 'resultado'>('inicializando');
  const [cenarioAtual, setCenarioAtual] = useState(0);
  const [traitsNeurais, setTraitsNeurais] = useState<EstadoNeural>({
    estrategico: 0,
    organizador: 0,
    tech_savvy: 0,
    criativo: 0,
    relacionamento: 0,
    inclusivo: 0,
    proativo: 0,
    visionario: 0
  });
  const [particulas, setParticulas] = useState<Array<{id: number, x: number, y: number, cor: string}>>([]);
  const [tempoRestante, setTempoRestante] = useState(15);
  const [escolhasFeitas, setEscolhasFeitas] = useState<string[]>([]);

  // Inicialização das partículas e sons
  useEffect(() => {
    if (!isOpen) return;
    
    const novasParticulas = Array.from({ length: 200 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      cor: '#3B82F6'
    }));
    setParticulas(novasParticulas);

    // Sequência de inicialização épica
    const timer1 = setTimeout(() => {
      // Simular som de boot futurístico
      console.log('🔊 NEURAL BOOT SOUND');
      setFase('navegando');
    }, 4000); // Aumentado para 4s
    
    return () => clearTimeout(timer1);
  }, [isOpen]);

  // Timer de pressão para cada cenário
  useEffect(() => {
    if (fase !== 'navegando') return;
    
    setTempoRestante(15);
    const interval = setInterval(() => {
      setTempoRestante(prev => {
        if (prev <= 1) {
          // Auto-escolhe opção A se tempo esgotar
          handleChoiceTimeout();
          return 15;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [cenarioAtual, fase]);

  const handleChoiceTimeout = () => {
    const cenario = CENARIOS_LABIRINTO[cenarioAtual];
    processarEscolha(cenario, 'A');
  };

  const processarEscolha = (cenario: PortalCenario, opcao: 'A' | 'B') => {
    const escolha = opcao === 'A' ? cenario.opcaoA : cenario.opcaoB;
    
    // Atualizar traits neurais
    setTraitsNeurais(prev => {
      const novosTraits = { ...prev };
      Object.entries(escolha.traits).forEach(([trait, valor]) => {
        if (trait in novosTraits) {
          novosTraits[trait as keyof EstadoNeural] += valor;
        }
      });
      return novosTraits;
    });

    // Atualizar partículas baseado na escolha
    setParticulas(prev => prev.map(p => ({
      ...p,
      cor: cenario.cor,
      x: Math.random() * 100,
      y: Math.random() * 100
    })));

    setEscolhasFeitas(prev => [...prev, `${cenario.nome}: ${escolha.texto}`]);

    // Próximo cenário ou finalizar
    if (cenarioAtual < CENARIOS_LABIRINTO.length - 1) {
      setCenarioAtual(prev => prev + 1);
    } else {
      setFase('analisando');
      setTimeout(() => {
        setFase('resultado');
        calcularResultadoFinal();
      }, 5000);
    }
  };

  const calcularResultadoFinal = () => {
    // Encontrar trait dominante
    const traitDominante = Object.entries(traitsNeurais).reduce((a, b) => 
      traitsNeurais[a[0] as keyof EstadoNeural] > traitsNeurais[b[0] as keyof EstadoNeural] ? a : b
    );

    // Determinar perfil baseado nos traits
    let perfilKey = 'visionario_estrategico'; // padrão
    
    if (traitsNeurais.relacionamento > 60) perfilKey = 'mestre_relacionamentos';
    else if (traitsNeurais.tech_savvy > 60) perfilKey = 'inovador_tecnologico';
    else if (traitsNeurais.criativo > 60) perfilKey = 'criativo_disruptivo';
    else if (traitsNeurais.estrategico > 60) perfilKey = 'estrategista_negocios';
    else if (traitsNeurais.organizador > 50) perfilKey = 'arquiteto_experiencias';

    const perfil = PERFIS_PRODUTOR[perfilKey];
    const pontuacaoTotal = Object.values(traitsNeurais).reduce((sum, val) => sum + val, 0);

    const resultado = {
      perfil,
      traits: traitsNeurais,
      pontuacaoTotal,
      escolhas: escolhasFeitas,
      traitDominante: traitDominante[0],
      compatibilidade: Math.min(95, Math.max(78, pontuacaoTotal / 10 + Math.random() * 15))
    };

    onComplete(resultado);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black z-50 overflow-hidden">
        
        {/* Partículas neurais de fundo */}
        <div className="absolute inset-0">
          {particulas.map(p => (
            <motion.div
              key={p.id}
              className="absolute w-1 h-1 rounded-full opacity-60"
              style={{ 
                backgroundColor: p.cor,
                left: `${p.x}%`,
                top: `${p.y}%`
              }}
              animate={{
                scale: [0.5, 1.5, 0.5],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>

        {/* Fase: Inicializando - MELHORADA */}
        {fase === 'inicializando' && (
          <div className="flex items-center justify-center min-h-screen relative">
            
            {/* Efeito de escaneamento de fundo */}
            <div className="absolute inset-0">
              {[...Array(10)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-20"
                  style={{ top: `${i * 10}%` }}
                  animate={{ 
                    scaleX: [0, 1, 0],
                    opacity: [0, 0.6, 0] 
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    delay: i * 0.1 
                  }}
                />
              ))}
            </div>

            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center relative z-10"
            >
              {/* Cérebro 3D com efeitos */}
              <div className="relative mb-8">
                <motion.div
                  animate={{ 
                    rotate: 360,
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 4, repeat: Infinity },
                    scale: { duration: 2, repeat: Infinity }
                  }}
                  className="w-40 h-40 mx-auto relative"
                >
                  <Brain className="w-full h-full text-blue-400" />
                  
                  {/* Anéis orbitais */}
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute inset-0 border-2 border-purple-400/30 rounded-full"
                  />
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 5, repeat: Infinity }}
                    className="absolute inset-4 border border-orange-400/40 rounded-full"
                  />
                </motion.div>

                {/* Pulsos neurais */}
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute top-1/2 left-1/2 w-2 h-2 bg-blue-400 rounded-full"
                    style={{ 
                      marginTop: '-4px', 
                      marginLeft: '-4px' 
                    }}
                    animate={{
                      scale: [0, 4, 0],
                      opacity: [0, 0.6, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.4
                    }}
                  />
                ))}
              </div>
              
              <motion.h1
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-5xl font-bold text-white mb-4"
              >
                🧠 O LABIRINTO DO PRODUTOR
              </motion.h1>
              
              <motion.p
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-2xl text-blue-300 mb-8"
              >
                Iniciando análise neural profunda, {playerName}...
              </motion.p>

              {/* Etapas de loading épicas */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="space-y-3 max-w-md mx-auto"
              >
                {[
                  '🔍 Escaneando padrões de decisão...',
                  '🧬 Mapeando DNA neural...',
                  '⚡ Calibrando sensores...',
                  '🎯 Preparando análise personalizada...'
                ].map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 2 + i * 0.3 }}
                    className="text-left text-gray-300 flex items-center gap-3"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="w-4 h-4 border border-blue-400 border-t-transparent rounded-full"
                    />
                    {step}
                  </motion.div>
                ))}
              </motion.div>
              
              {/* Barra de progresso neural */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 2, duration: 2 }}
                className="w-80 h-3 bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 rounded-full mx-auto mt-8 relative overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </motion.div>
            </motion.div>
          </div>
        )}

        {/* Fase: Navegando pelos Portais */}
        {fase === 'navegando' && (
          <div className="flex flex-col items-center justify-center min-h-screen p-6">
            
            {/* Header com progresso */}
            <div className="w-full max-w-4xl mb-8">
              <div className="flex justify-between items-center mb-4">
                <div className="text-white">
                  <span className="text-lg">Portal {cenarioAtual + 1}/8</span>
                </div>
                <div className="flex items-center gap-2 text-orange-400">
                  <Timer className="w-5 h-5" />
                  <span className="text-xl font-bold">{tempoRestante}s</span>
                </div>
              </div>
              
              <div className="w-full bg-gray-700 rounded-full h-2">
                <motion.div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                  animate={{ width: `${((cenarioAtual + 1) / 8) * 100}%` }}
                />
              </div>
            </div>

            {/* Portal atual */}
            {CENARIOS_LABIRINTO[cenarioAtual] && (
              <motion.div
                key={cenarioAtual}
                initial={{ scale: 0.8, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                className="w-full max-w-4xl"
              >
                <div className="text-center mb-8">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="text-6xl mb-4"
                  >
                    {CENARIOS_LABIRINTO[cenarioAtual].icone}
                  </motion.div>
                  
                  <h2 className="text-3xl font-bold text-white mb-4">
                    {CENARIOS_LABIRINTO[cenarioAtual].nome}
                  </h2>
                  
                  <p className="text-xl text-gray-300 leading-relaxed">
                    {CENARIOS_LABIRINTO[cenarioAtual].situacao}
                  </p>
                </div>

                {/* Opções de escolha */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Opção A */}
                  <motion.button
                    onClick={() => processarEscolha(CENARIOS_LABIRINTO[cenarioAtual], 'A')}
                    whileHover={{ scale: 1.05, y: -10 }}
                    whileTap={{ scale: 0.95 }}
                    className="group bg-gradient-to-br from-blue-600/20 to-purple-600/20 border-2 border-blue-500/50 rounded-3xl p-8 text-left hover:border-blue-400 transition-all"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="text-4xl">
                        {CENARIOS_LABIRINTO[cenarioAtual].opcaoA.emoji}
                      </div>
                      <div className="text-blue-400 font-bold text-lg">OPÇÃO A</div>
                    </div>
                    
                    <p className="text-white text-lg leading-relaxed">
                      {CENARIOS_LABIRINTO[cenarioAtual].opcaoA.texto}
                    </p>
                    
                    <div className="mt-4 text-sm text-blue-300 opacity-80">
                      → {CENARIOS_LABIRINTO[cenarioAtual].opcaoA.resultado}
                    </div>
                    
                    <ChevronRight className="w-6 h-6 text-blue-400 mt-4 group-hover:translate-x-2 transition-transform" />
                  </motion.button>

                  {/* Opção B */}
                  <motion.button
                    onClick={() => processarEscolha(CENARIOS_LABIRINTO[cenarioAtual], 'B')}
                    whileHover={{ scale: 1.05, y: -10 }}
                    whileTap={{ scale: 0.95 }}
                    className="group bg-gradient-to-br from-purple-600/20 to-pink-600/20 border-2 border-purple-500/50 rounded-3xl p-8 text-left hover:border-purple-400 transition-all"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="text-4xl">
                        {CENARIOS_LABIRINTO[cenarioAtual].opcaoB.emoji}
                      </div>
                      <div className="text-purple-400 font-bold text-lg">OPÇÃO B</div>
                    </div>
                    
                    <p className="text-white text-lg leading-relaxed">
                      {CENARIOS_LABIRINTO[cenarioAtual].opcaoB.texto}
                    </p>
                    
                    <div className="mt-4 text-sm text-purple-300 opacity-80">
                      → {CENARIOS_LABIRINTO[cenarioAtual].opcaoB.resultado}
                    </div>
                    
                    <ChevronRight className="w-6 h-6 text-purple-400 mt-4 group-hover:translate-x-2 transition-transform" />
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>
        )}

        {/* Fase: Analisando */}
        {fase === 'analisando' && (
          <div className="flex items-center justify-center min-h-screen">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-center"
            >
              <motion.div
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  rotate: { duration: 2, repeat: Infinity },
                  scale: { duration: 1, repeat: Infinity }
                }}
                className="w-40 h-40 mx-auto mb-8"
              >
                <Cpu className="w-full h-full text-gradient bg-gradient-to-r from-blue-400 to-purple-400" />
              </motion.div>
              
              <h2 className="text-4xl font-bold text-white mb-4">
                🧠 PROCESSANDO PADRÕES NEURAIS
              </h2>
              
              <p className="text-xl text-blue-300 mb-8">
                Decodificando seu DNA de produtor...
              </p>
              
              {/* Barras de análise neural */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl">
                {Object.entries(TRAITS_NEURAIS).map(([key, trait], index) => (
                  <motion.div
                    key={key}
                    initial={{ height: 0 }}
                    animate={{ height: `${(traitsNeurais[key as keyof EstadoNeural] / 100) * 150}px` }}
                    transition={{ delay: index * 0.2 }}
                    className="bg-gradient-to-t from-blue-600 to-purple-600 rounded-t-lg relative"
                    style={{ minHeight: '20px' }}
                  >
                    <div className="absolute -top-8 left-0 right-0 text-xs text-white text-center">
                      {trait.icone}
                    </div>
                    <div className="absolute -bottom-6 left-0 right-0 text-xs text-gray-300 text-center">
                      {trait.nome}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </AnimatePresence>
  );
};

export default LabirintoProdutor;
