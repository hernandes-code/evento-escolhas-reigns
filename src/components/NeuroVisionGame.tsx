import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Zap, Eye, Sparkles } from 'lucide-react';

interface NeuroVisionProps {
  userName: string;
  onComplete: (data: any) => void;
}

interface VisionScenario {
  id: string;
  title: string;
  description: string;
  scene: string;
  choices: {
    left: { text: string; vision: string; neural: string; points: Record<string, number> };
    right: { text: string; vision: string; neural: string; points: Record<string, number> };
  };
  deepAnalysis: string;
}

const visionScenarios: VisionScenario[] = [
  {
    id: "vision_future",
    title: "VISÃO DO FUTURO",
    description: "Você está organizando um evento para 2026. O que você vê?",
    scene: "Um holograma futurístico se materializa à sua frente...",
    choices: {
      left: {
        text: "Realidade virtual total - eventos 100% imersivos",
        vision: "VISIONÁRIO TECNOLÓGICO",
        neural: "Cérebro orientado para inovação radical",
        points: { tech: 10, innovation: 8, risk: 6, future: 10 }
      },
      right: {
        text: "Experiências híbridas com conexão humana real",
        vision: "HUMANISTA DIGITAL",
        neural: "Cérebro equilibrado entre tech e humanidade",
        points: { balance: 10, connection: 8, empathy: 9, wisdom: 7 }
      }
    },
    deepAnalysis: "Esta escolha revela sua orientação fundamental entre revolução tecnológica e evolução humanizada."
  },
  {
    id: "quantum_decision",
    title: "DECISÃO QUÂNTICA",
    description: "Múltiplas realidades se abrem. Qual universo você escolhe?",
    scene: "O tecido do espaço-tempo se divide em possibilidades infinitas...",
    choices: {
      left: {
        text: "Universo onde eventos mudam comportamentos globais",
        vision: "ARQUITETO SOCIAL",
        neural: "Cérebro focado em impacto transformacional",
        points: { impact: 10, vision: 9, leadership: 8, change: 10 }
      },
      right: {
        text: "Universo onde cada evento é uma obra de arte única",
        vision: "ARTISTA EXPERIENCIAL",
        neural: "Cérebro orientado para criação e beleza",
        points: { creativity: 10, art: 9, uniqueness: 8, beauty: 7 }
      }
    },
    deepAnalysis: "Sua escolha define se você é um transformador de sociedades ou um criador de experiências únicas."
  },
  {
    id: "neural_matrix",
    title: "MATRIZ NEURAL",
    description: "Você pode acessar a mente coletiva dos participantes. Como usa esse poder?",
    scene: "Milhões de sinapses se conectam formando uma rede de consciência...",
    choices: {
      left: {
        text: "Criar experiências que curam traumas coletivos",
        vision: "CURADOR DE ALMAS",
        neural: "Cérebro com alta inteligência emocional",
        points: { healing: 10, empathy: 10, depth: 9, purpose: 8 }
      },
      right: {
        text: "Despertar potenciais ocultos em cada pessoa",
        vision: "ATIVADOR DE POTENCIAL",
        neural: "Cérebro orientado para desenvolvimento humano",
        points: { development: 10, potential: 9, growth: 8, empowerment: 10 }
      }
    },
    deepAnalysis: "Esta escolha revela se você é um curador de feridas coletivas ou um liberador de potenciais."
  },
  {
    id: "cosmic_frequency",
    title: "FREQUÊNCIA CÓSMICA",
    description: "Você descobriu a frequência que conecta todas as consciências. O que faz?",
    scene: "Ondas de energia pura atravessam dimensões conectando todos os seres...",
    choices: {
      left: {
        text: "Usar para criar eventos que elevam a humanidade",
        vision: "ELEVADOR CÓSMICO",
        neural: "Cérebro sintonizado com propósito universal",
        points: { elevation: 10, purpose: 10, cosmic: 9, transcendence: 8 }
      },
      right: {
        text: "Criar experiências que despertam poderes latentes",
        vision: "DESPERTAR EVOLUTIVO",
        neural: "Cérebro focado em evolução acelerada",
        points: { evolution: 10, awakening: 9, power: 8, acceleration: 10 }
      }
    },
    deepAnalysis: "Sua escolha define se você é um elevador espiritual ou um acelerador evolutivo."
  },
  {
    id: "time_architect",
    title: "ARQUITETO DO TEMPO",
    description: "Você pode manipular a percepção temporal nos eventos. Como procede?",
    scene: "O tempo se torna fluido, passado e futuro se misturam no presente...",
    choices: {
      left: {
        text: "Criar momentos eternos que ficam na memória para sempre",
        vision: "ESCULTOR DE MEMÓRIAS",
        neural: "Cérebro especializado em experiências atemporais",
        points: { memory: 10, eternity: 9, impact: 8, legacy: 10 }
      },
      right: {
        text: "Acelerar transformações que levariam anos em horas",
        vision: "CATALISADOR TEMPORAL",
        neural: "Cérebro focado em aceleração de resultados",
        points: { acceleration: 10, transformation: 9, efficiency: 8, catalyst: 10 }
      }
    },
    deepAnalysis: "Esta escolha revela se você é um criador de legados eternos ou um acelerador de transformações."
  }
];

export const NeuroVisionGame: React.FC<NeuroVisionProps> = ({ userName, onComplete }) => {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [neuralProfile, setNeuralProfile] = useState<Record<string, number>>({});
  const [visionTypes, setVisionTypes] = useState<string[]>([]);
  const [isInitializing, setIsInitializing] = useState(true);
  const [showingChoice, setShowingChoice] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState<'left' | 'right' | null>(null);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const gameRef = useRef<HTMLDivElement>(null);

  // Inicialização épica de 6 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitializing(false);
      setShowingChoice(true);
    }, 6000);

    // Criar partículas neurais
    const particleArray = Array.from({ length: 300 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }));
    setParticles(particleArray);

    return () => clearTimeout(timer);
  }, []);

  const handleChoice = (choice: 'left' | 'right') => {
    setSelectedChoice(choice);
    setShowingChoice(false);
    
    const scenario = visionScenarios[currentScenario];
    const choiceData = scenario.choices[choice];
    
    // Atualizar perfil neural
    const newProfile = { ...neuralProfile };
    Object.entries(choiceData.points).forEach(([key, value]) => {
      newProfile[key] = (newProfile[key] || 0) + value;
    });
    setNeuralProfile(newProfile);
    
    // Adicionar tipo de visão
    setVisionTypes(prev => [...prev, choiceData.vision]);

    setTimeout(() => {
      if (currentScenario < visionScenarios.length - 1) {
        setCurrentScenario(prev => prev + 1);
        setSelectedChoice(null);
        setShowingChoice(true);
      } else {
        // Game completo - calcular resultado final
        const finalResult = {
          userName,
          neuralProfile: newProfile,
          visionTypes,
          dominantVision: visionTypes.reduce((a, b, _, arr) => 
            arr.filter(v => v === a).length >= arr.filter(v => v === b).length ? a : b
          ),
          totalScenarios: visionScenarios.length,
          gameType: 'NeuroVision'
        };
        onComplete(finalResult);
      }
    }, 3000);
  };

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black flex items-center justify-center relative overflow-hidden">
        {/* Partículas neurais de fundo */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-cyan-400/40 rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 4,
            }}
          />
        ))}

        <div className="text-center z-10">
          {/* Cérebro 3D Central */}
          <motion.div
            className="mb-12 relative"
            initial={{ scale: 0, rotateY: -180 }}
            animate={{ scale: 1, rotateY: 0 }}
            transition={{ duration: 2, type: "spring" }}
          >
            <motion.div
              className="w-32 h-32 mx-auto relative"
              animate={{
                rotateY: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                rotateY: { duration: 8, repeat: Infinity },
                scale: { duration: 3, repeat: Infinity }
              }}
            >
              <Brain size={128} className="text-cyan-400" />
              
              {/* Anéis orbitais */}
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 border-2 border-purple-400/30 rounded-full"
                  style={{
                    width: `${100 + i * 30}%`,
                    height: `${100 + i * 30}%`,
                    left: `${-i * 15}%`,
                    top: `${-i * 15}%`,
                  }}
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    rotate: { duration: 4 + i, repeat: Infinity },
                    scale: { duration: 2, repeat: Infinity, delay: i * 0.5 }
                  }}
                />
              ))}
            </motion.div>
          </motion.div>

          {/* Textos de inicialização */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="space-y-4"
          >
            <motion.h1
              className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              NEUROVISION™
            </motion.h1>
            
            <motion.p
              className="text-xl text-gray-300 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
            >
              Preparando interface neural para {userName}...
            </motion.p>

            {/* Sequência de loading épica */}
            <motion.div
              className="mt-8 space-y-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
            >
              {[
                "Conectando com matriz cósmica...",
                "Calibrando frequências neurais...",
                "Acessando dimensões paralelas...",
                "Sincronizando com consciência universal...",
                "Ativando visão multidimensional..."
              ].map((text, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 3 + i * 0.5 }}
                  className="flex items-center justify-center gap-3"
                >
                  <Zap className="text-yellow-400" size={16} />
                  <span className="text-gray-400">{text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    );
  }

  const scenario = visionScenarios[currentScenario];

  return (
    <div ref={gameRef} className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black relative overflow-hidden">
      {/* Partículas de fundo */}
      {particles.slice(0, 100).map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-cyan-400/20 rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}

      {/* Progress bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-400 to-purple-400"
          initial={{ width: "0%" }}
          animate={{ width: `${((currentScenario + 1) / visionScenarios.length) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <div className="container mx-auto px-6 py-12 flex items-center justify-center min-h-screen">
        <AnimatePresence mode="wait">
          {showingChoice && (
            <motion.div
              key={currentScenario}
              initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotateY: 90 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="max-w-4xl mx-auto text-center"
            >
              {/* Título do cenário */}
              <motion.h2
                className="text-5xl md:text-7xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400"
                animate={{ scale: [1, 1.02, 1], textShadow: ["0 0 20px rgba(0,255,255,0.5)", "0 0 40px rgba(0,255,255,0.8)", "0 0 20px rgba(0,255,255,0.5)"] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {scenario.title}
              </motion.h2>

              {/* Descrição */}
              <motion.p
                className="text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {scenario.description}
              </motion.p>

              {/* Cena */}
              <motion.div
                className="bg-gradient-to-br from-purple-800/30 to-blue-800/30 border border-cyan-400/30 rounded-3xl p-8 mb-12 backdrop-blur-sm"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Eye className="text-cyan-400 mx-auto mb-4" size={48} />
                <p className="text-xl text-gray-200 italic">{scenario.scene}</p>
              </motion.div>

              {/* Escolhas */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* Escolha Esquerda */}
                <motion.button
                  onClick={() => handleChoice('left')}
                  className="group relative bg-gradient-to-br from-purple-600/20 to-pink-600/20 border-2 border-purple-400/50 rounded-2xl p-8 hover:border-purple-400 transition-all duration-300 overflow-hidden"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative z-10">
                    <div className="text-purple-400 mb-4">
                      <Sparkles size={32} className="mx-auto" />
                    </div>
                    <h3 className="text-lg font-bold text-purple-300 mb-3">{scenario.choices.left.vision}</h3>
                    <p className="text-gray-300 mb-4">{scenario.choices.left.text}</p>
                    <div className="text-sm text-purple-400 italic">
                      {scenario.choices.left.neural}
                    </div>
                  </div>
                </motion.button>

                {/* Escolha Direita */}
                <motion.button
                  onClick={() => handleChoice('right')}
                  className="group relative bg-gradient-to-br from-cyan-600/20 to-blue-600/20 border-2 border-cyan-400/50 rounded-2xl p-8 hover:border-cyan-400 transition-all duration-300 overflow-hidden"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                  whileHover={{ scale: 1.05, rotateY: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative z-10">
                    <div className="text-cyan-400 mb-4">
                      <Sparkles size={32} className="mx-auto" />
                    </div>
                    <h3 className="text-lg font-bold text-cyan-300 mb-3">{scenario.choices.right.vision}</h3>
                    <p className="text-gray-300 mb-4">{scenario.choices.right.text}</p>
                    <div className="text-sm text-cyan-400 italic">
                      {scenario.choices.right.neural}
                    </div>
                  </div>
                </motion.button>
              </div>

              {/* Contador de cenário */}
              <motion.div
                className="mt-8 text-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                Visão {currentScenario + 1} de {visionScenarios.length}
              </motion.div>
            </motion.div>
          )}

          {selectedChoice && !showingChoice && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <motion.div
                className="w-24 h-24 mx-auto mb-6"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  rotate: { duration: 2, repeat: Infinity },
                  scale: { duration: 1, repeat: Infinity }
                }}
              >
                <Brain size={96} className="text-cyan-400" />
              </motion.div>
              <p className="text-2xl text-gray-300">Processando sua visão neural...</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
