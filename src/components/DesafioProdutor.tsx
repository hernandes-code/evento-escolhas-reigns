import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Users, DollarSign, TrendingUp, AlertTriangle, CheckCircle, X } from 'lucide-react';

interface DesafioProductorProps {
  onComplete: (data: any) => void;
}

interface Scenario {
  id: string;
  title: string;
  description: string;
  situation: string;
  choices: {
    left: { 
      text: string; 
      type: string; 
      result: string; 
      points: Record<string, number>;
      category: string;
    };
    right: { 
      text: string; 
      type: string; 
      result: string; 
      points: Record<string, number>;
      category: string;
    };
  };
  icon: React.ReactNode;
  theme: string;
}

const realScenarios: Scenario[] = [
  {
    id: "venda_antecipada",
    title: "VENDAS ANTECIPADAS",
    description: "Seu evento está a 60 dias. Apenas 15% dos ingressos vendidos.",
    situation: "As vendas estão lentas e você precisa acelerar. O que fazer?",
    choices: {
      left: {
        text: "Criar urgência real com benefícios exclusivos para quem compra agora",
        type: "ESTRATÉGIA A", 
        result: "Vendas aceleram mantendo o valor percebido",
        points: { vendas: 8, margem: 6, posicionamento: 7 },
        category: "value_focus"
      },
      right: {
        text: "Baixar o preço dos ingressos para atrair mais pessoas",
        type: "ESTRATÉGIA B",
        result: "Vendas aumentam, mas margem diminui drasticamente",
        points: { vendas: 5, margem: -3, posicionamento: -2 },
        category: "price_focus"
      }
    },
    icon: <DollarSign className="w-8 h-8" />,
    theme: "from-green-600/20 to-emerald-600/20"
  },
  {
    id: "anuncios_facebook",
    title: "ANÚNCIOS NO FACEBOOK",
    description: "Gastou R$ 3.000 em anúncios e vendeu apenas 20 ingressos.",
    situation: "CPM está alto, conversão baixa. Seu orçamento está acabando.",
    choices: {
      left: {
        text: "Parar os anúncios e tentar venda orgânica no Instagram",
        type: "ESTRATÉGIA A",
        result: "Economia de dinheiro, mas alcance muito limitado",
        points: { digital: -5, alcance: -7, organico: 4 },
        category: "organic_focus"
      },
      right: {
        text: "Mudar o público-alvo e testar novos criativos baseados em dados",
        type: "ESTRATÉGIA B",
        result: "Conversão melhora significativamente com mesmo orçamento",
        points: { digital: 9, alcance: 8, dados: 10 },
        category: "data_driven"
      }
    },
    icon: <TrendingUp className="w-8 h-8" />,
    theme: "from-blue-600/20 to-cyan-600/20"
  },
  {
    id: "evento_concorrente",
    title: "EVENTO CONCORRENTE",
    description: "Um produtor famoso anunciou evento no mesmo dia que o seu.",
    situation: "Você descobriu que um concorrente forte marcou evento na mesma data.",
    choices: {
      left: {
        text: "Manter a data e criar uma proposta única e irresistível",
        type: "ESTRATÉGIA A",
        result: "Ganha credibilidade e atrai público que valoriza autenticidade",
        points: { competicao: 8, momentum: 7, diferenciacao: 10 },
        category: "competitive"
      },
      right: {
        text: "Mudar a data do meu evento para evitar concorrência",
        type: "ESTRATÉGIA B",
        result: "Perde momentum das vendas já feitas, mas evita competição",
        points: { competicao: -3, momentum: -6, planejamento: -4 },
        category: "risk_averse"
      }
    },
    icon: <AlertTriangle className="w-8 h-8" />,
    theme: "from-orange-600/20 to-red-600/20"
  },
  {
    id: "influencer_parceria",
    title: "PARCERIA COM INFLUENCER",
    description: "Um influencer ofereceu divulgação por R$ 5.000.",
    situation: "Um influencer de 100k seguidores quer R$ 5.000 para um post.",
    choices: {
      left: {
        text: "Pagar os R$ 5.000 esperando que compense nas vendas",
        type: "ESTRATÉGIA A",
        result: "Alcance grande, mas ROI incerto e gasto significativo",
        points: { investimento: -5, alcance: 6, risco: -4 },
        category: "high_investment"
      },
      right: {
        text: "Propor parceria por comissão + ingressos VIP",
        type: "ESTRATÉGIA B",
        result: "Influencer engajado no sucesso, custo apenas se vender",
        points: { investimento: 2, alcance: 7, inteligencia: 9 },
        category: "smart_partnership"
      }
    },
    icon: <Users className="w-8 h-8" />,
    theme: "from-purple-600/20 to-pink-600/20"
  },
  {
    id: "problema_fornecedor",
    title: "PROBLEMA COM FORNECEDOR",
    description: "A 15 dias do evento, seu principal fornecedor cancelou.",
    situation: "Som e iluminação cancelaram. Evento em 15 dias com 80% dos ingressos vendidos.",
    choices: {
      left:  {
        text: "Ativar rede de contatos e encontrar solução em 48h",
        type: "ESTRATÉGIA A",
        result: "Encontra fornecedor, evento acontece, credibilidade aumenta",
        points: { credibilidade: 9, financeiro: 8, network: 10 },
        category: "problem_solver"
      },
      right: {
        text: "Cancelar o evento e devolver o dinheiro dos ingressos",
        type: "ESTRATÉGIA B",
        result: "Evita problemas maiores, mas perde credibilidade e dinheiro",
        points: { credibilidade: -8, financeiro: -10, risco: 2 },
        category: "risk_averse"
      }
    },
    icon: <Calendar className="w-8 h-8" />,
    theme: "from-red-600/20 to-orange-600/20"
  }
];

export const DesafioProdutor: React.FC<DesafioProductorProps> = ({ onComplete }) => {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [profile, setProfile] = useState<Record<string, number>>({});
  const [choices, setChoices] = useState<string[]>([]);
  const [showingResult, setShowingResult] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState<'left' | 'right' | null>(null);

  const scenario = realScenarios[currentScenario];

  const handleChoice = (choice: 'left' | 'right') => {
    setSelectedChoice(choice);
    setShowingResult(true);
    
    const choiceData = scenario.choices[choice];
    
    // Atualizar perfil
    const newProfile = { ...profile };
    Object.entries(choiceData.points).forEach(([key, value]) => {
      newProfile[key] = (newProfile[key] || 0) + value;
    });
    setProfile(newProfile);
    
    // Adicionar categoria da escolha
    setChoices(prev => [...prev, choiceData.category]);

    setTimeout(() => {
      if (currentScenario < realScenarios.length - 1) {
        setCurrentScenario(prev => prev + 1);
        setSelectedChoice(null);
        setShowingResult(false);
      } else {
        // Calcular resultado final
        const finalResult = {
          profile: newProfile,
          choices,
          dominantCategory: choices.reduce((a, b, _, arr) => 
            arr.filter(v => v === a).length >= arr.filter(v => v === b).length ? a : b
          ),
          totalScenarios: realScenarios.length,
          gameType: 'DesafioProdutor'
        };
        onComplete(finalResult);
      }
    }, 2500);
  };

  if (showingResult && selectedChoice) {
    const choiceData = scenario.choices[selectedChoice];
    const isPositive = Object.values(choiceData.points).reduce((a, b) => a + b, 0) > 0;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black flex items-center justify-center relative overflow-hidden">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto"
          >
            <div className={`mb-8 p-4 rounded-full mx-auto w-24 h-24 flex items-center justify-center ${isPositive ? 'bg-green-500/20' : 'bg-orange-500/20'}`}>
              {isPositive ? <CheckCircle size={48} className="text-green-400" /> : <AlertTriangle size={48} className="text-orange-400" />}
            </div>
            
            <h2 className={`text-2xl font-bold mb-4 ${isPositive ? 'text-green-400' : 'text-orange-400'}`}>
              {choiceData.type}
            </h2>
            
            <p className="text-xl text-gray-200 mb-6">
              {choiceData.result}
            </p>
            
            <div className="text-gray-400">
              Analisando seu perfil de produtor...
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black relative overflow-hidden">
      {/* Progresso */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-orange-400 to-red-400"
          initial={{ width: "0%" }}
          animate={{ width: `${((currentScenario + 1) / realScenarios.length) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <div className="container mx-auto px-6 py-12 flex items-center justify-center min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScenario}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            {/* Header do cenário */}
            <div className="text-center mb-8">
              <motion.div
                className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${scenario.theme} border border-gray-600/30 mb-6`}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {scenario.icon}
              </motion.div>
              
              <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
                {scenario.title}
              </h1>
              
              <p className="text-xl text-red-400 font-bold mb-2">
                {scenario.description}
              </p>
              
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                {scenario.situation}
              </p>
            </div>

            {/* Opções */}
            <div className="grid md:grid-cols-2 gap-6 mt-12">
              {/* Opção Esquerda */}
              <motion.button
                onClick={() => handleChoice('left')}
                className="group text-left bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-2 border-gray-600/30 hover:border-red-400/50 rounded-2xl p-8 transition-all duration-300"
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center">
                    <span className="text-red-400 font-bold">A</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-3">
                      {scenario.choices.left.text}
                    </h3>
                    <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-3 py-1">
                      <span className="text-sm text-red-300">{scenario.choices.left.type}</span>
                    </div>
                  </div>
                </div>
              </motion.button>

              {/* Opção Direita */}
              <motion.button
                onClick={() => handleChoice('right')}
                className="group text-left bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-2 border-gray-600/30 hover:border-green-400/50 rounded-2xl p-8 transition-all duration-300"
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                    <span className="text-green-400 font-bold">B</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-3">
                      {scenario.choices.right.text}
                    </h3>
                    <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-3 py-1">
                      <span className="text-sm text-green-300">{scenario.choices.right.type}</span>
                    </div>
                  </div>
                </div>
              </motion.button>
            </div>

            {/* Contador */}
            <div className="text-center mt-8 text-gray-400">
              Desafio {currentScenario + 1} de {realScenarios.length}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
