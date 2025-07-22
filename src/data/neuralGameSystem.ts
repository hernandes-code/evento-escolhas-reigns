import { GameCard } from '../types/game';

// ========== NOVO SISTEMA: SIMULADOR DE PRODUTOR NEURAL ==========

// Perfis de Produtor Neural (8 arquétipos para donos de bar/balada/eventos)
export const NEURAL_PRODUCER_PROFILES = {
  TECH_ADOPTER: {
    id: 'tech-adopter',
    name: 'Tech Adopter',
    title: 'INOVADOR DIGITAL',
    description: 'Você abraça a tecnologia para crescer. Apps, sistemas, redes sociais - tudo é ferramenta.',
    color: 'from-blue-500 to-cyan-600',
    personality: 'Inovador, eficiente, conectado',
    traits: ['Sistemas automatizados', 'Redes sociais ativas', 'Dados e métricas'],
    weakness: 'Pode se perder em tantas ferramentas'
  },
  CUSTOMER_FOCUSED: {
    id: 'customer-focused',
    name: 'Customer Focused',
    title: 'MESTRE DA EXPERIÊNCIA',
    description: 'Seu cliente é rei. Cada detalhe é pensado para criar a melhor experiência possível.',
    color: 'from-green-500 to-emerald-600',
    personality: 'Empático, detalhista, hospitaleiro',
    traits: ['Atendimento premium', 'Ambiente acolhedor', 'Fidelização natural'],
    weakness: 'Pode gastar demais para agradar'
  },
  BUDGET_WIZARD: {
    id: 'budget-wizard',
    name: 'Budget Wizard',
    title: 'NINJA DAS FINANÇAS',
    description: 'Cada centavo conta. Você transforma pouco dinheiro em eventos incríveis.',
    color: 'from-yellow-500 to-orange-600',
    personality: 'Esperto, econômico, estratégico',
    traits: ['Custo-benefício máximo', 'Parcerias inteligentes', 'Margem otimizada'],
    weakness: 'Pode economizar onde não deveria'
  },
  GROWTH_HACKER: {
    id: 'growth-hacker',
    name: 'Growth Hacker',
    title: 'CONQUISTADOR DE AUDIÊNCIA',
    description: 'Seus eventos sempre lotam. Marketing, boca a boca, influência - você domina tudo.',
    color: 'from-purple-500 to-pink-600',
    personality: 'Carismático, estratégico, influente',
    traits: ['Viral marketing', 'Networking poderoso', 'Buzz natural'],
    weakness: 'Pode prometer mais do que consegue entregar'
  },
  CRISIS_MANAGER: {
    id: 'crisis-manager',
    name: 'Crisis Manager',
    title: 'SOLUCIONADOR NATO',
    description: 'Quando tudo dá errado, você brilha. Problemas viram oportunidades nas suas mãos.',
    color: 'from-red-500 to-orange-600',
    personality: 'Resiliente, criativo, corajoso',
    traits: ['Jogo de cintura', 'Soluções rápidas', 'Calma na pressão'],
    weakness: 'Pode se acostumar demais com o caos'
  },
  TRADITIONAL_PRODUCER: {
    id: 'traditional-producer',
    name: 'Traditional Producer',
    title: 'RAIZ CONFIÁVEL',
    description: 'O que sempre funcionou, funciona. Você constrói com base sólida e relacionamentos duradouros.',
    color: 'from-amber-500 to-yellow-600',
    personality: 'Confiável, experiente, relacionável',
    traits: ['Base sólida de clientes', 'Reputação limpa', 'Métodos testados'],
    weakness: 'Pode resistir a mudanças necessárias'
  },
  PREMIUM_FOCUSED: {
    id: 'premium-focused',
    name: 'Premium Focused',
    title: 'CRIADOR DE EXCLUSIVIDADE',
    description: 'Qualidade sobre quantidade. Seus eventos são experiências únicas que marcam.',
    color: 'from-indigo-500 to-purple-600',
    personality: 'Refinado, perfeccionista, diferenciado',
    traits: ['Experiências premium', 'Público seleto', 'Atenção aos detalhes'],
    weakness: 'Pode limitar muito o alcance'
  },
  COLLABORATIVE: {
    id: 'collaborative',
    name: 'Collaborative',
    title: 'ARTICULADOR NATURAL',
    description: 'Parceria é poder. Você conecta pessoas e cria uma rede que todos ganham.',
    color: 'from-teal-500 to-green-600',
    personality: 'Conectivo, generoso, visionário',
    traits: ['Parcerias estratégicas', 'Networking ativo', 'Crescimento conjunto'],
    weakness: 'Pode depender demais dos outros'
  }
};

// Sistema de Cenários Neural (focado em produtores de eventos)
export const NEURAL_SCENARIOS = [
  {
    id: 'scenario-001',
    type: 'BILHETERIA_CHOICE',
    title: '🎫 DECISÃO: Sistema de Bilheteria',
    context: 'Você produz eventos mensais e sempre vende na porta. Hoje 120 pessoas perguntaram sobre ingressos online. Seu próximo evento tem capacidade para 300 pessoas.',
    environment: {
      pressure: 'MODERADA',
      timeLimit: '48h',
      stakes: 'Evento lotado vs meio vazio',
      publicImpact: 'Experiência e conversão'
    },
    choices: [
      {
        id: 'keep-traditional',
        title: '🚪 MANTER PORTA',
        description: 'Continuar vendendo só na entrada',
        neuralPath: ['traditional-producer', 'control-focused'],
        effects: {
          budget: +5,
          satisfaction: -15,
          audience: -25,
          technology: -15
        },
        consequence: 'Fila gigante na porta, muita gente desiste. Capacidade desperdiçada.',
        insights: 'Prefere controle total mas sacrifica escalabilidade'
      },
      {
        id: 'implement-system',
        title: '� BILHETERIA DIGITAL',
        description: 'Implementar venda online profissional',
        neuralPath: ['tech-adopter', 'growth-hacker'],
        effects: {
          budget: -15,
          satisfaction: +30,
          audience: +35,
          technology: +25
        },
        consequence: 'Venda antecipada explode. Evento esgota com 3 dias de antecedência.',
        insights: 'Abraça tecnologia para maximizar resultados'
      }
    ],
    neuralAnalysis: {
      measures: ['Visão Digital', 'Escalabilidade', 'Experiência do Cliente', 'Gestão de Risco'],
      personality_indicators: ['Inovação', 'Crescimento', 'Controle', 'Adaptação']
    }
  },
  
  {
    id: 'scenario-002', 
    type: 'PRICING_STRATEGY',
    title: '💰 DILEMA: Preço dos Ingressos',
    context: 'Seu evento no bar normalmente cobra R$ 25 na porta. Com bilheteria digital, pode fazer promoção antecipada por R$ 18 ou manter R$ 25 e dar benefícios extras.',
    environment: {
      pressure: 'BAIXA',
      timeLimit: '3 dias',
      stakes: 'Estratégia de preços',
      publicImpact: 'Percepção de valor'
    },
    choices: [
      {
        id: 'discount-price',
        title: '🏷️ PREÇO PROMOCIONAL',
        description: 'R$ 18 antecipado vs R$ 25 na porta',
        neuralPath: ['volume-focused', 'budget-conscious'],
        effects: {
          budget: -5,
          satisfaction: +10,
          audience: +25,
          technology: +5
        },
        consequence: 'Casa lota, mas margem menor. Clientes adoram economizar.',
        insights: 'Foca em volume e acessibilidade'
      },
      {
        id: 'value-added',
        title: '🎁 VALOR AGREGADO',
        description: 'R$ 25 com drink grátis e mesa garantida',
        neuralPath: ['premium-focused', 'experience-creator'],
        effects: {
          budget: +10,
          satisfaction: +20,
          audience: +10,
          technology: +10
        },
        consequence: 'Clientes percebem mais valor. Margem melhor e experiência premium.',
        insights: 'Entende que valor não é só preço baixo'
      }
    ],
    neuralAnalysis: {
      measures: ['Estratégia Comercial', 'Percepção de Valor', 'Margem vs Volume', 'Experiência'],
      personality_indicators: ['Visão Comercial', 'Criatividade', 'Foco em Lucro', 'Relacionamento']
    }
  },

  {
    id: 'scenario-003',
    type: 'CRISIS_MANAGEMENT',
    title: '⚡ URGENTE: Artista Cancelou',
    context: 'O DJ principal do sábado cancelou 3h antes. Já tem 150 pessoas com ingresso. WhatsApp bombando com reclamações. O que faz AGORA?',
    environment: {
      pressure: 'EXTREMA',
      timeLimit: '3h',
      stakes: 'Reputação e reembolsos',
      publicImpact: 'Crise nas redes sociais'
    },
    choices: [
      {
        id: 'full-refund',
        title: '💸 REEMBOLSO TOTAL',
        description: 'Cancelar evento e devolver todo mundo',
        neuralPath: ['conservative', 'reputation-focused'],
        effects: {
          budget: -30,
          satisfaction: +5,
          audience: -10,
          technology: 0
        },
        consequence: 'Prejuízo grande, mas mantém confiança. Pessoal entende.',
        insights: 'Prioriza relacionamento de longo prazo sobre lucro imediato'
      },
      {
        id: 'pivot-event',
        title: '🎵 SALVAR O EVENTO',
        description: 'Chamar DJ local + transformar em open bar',
        neuralPath: ['crisis-manager', 'creative-solver'],
        effects: {
          budget: -10,
          satisfaction: +15,
          audience: +20,
          technology: +5
        },
        consequence: 'Evento diferente mas divertido. Pessoal elogia a atitude.',
        insights: 'Transforma problemas em oportunidades criativas'
      }
    ],
    neuralAnalysis: {
      measures: ['Gestão de Crise', 'Criatividade', 'Pressão Temporal', 'Liderança'],
      personality_indicators: ['Resiliência', 'Inovação', 'Relacionamento', 'Coragem']
    }
  },

  {
    id: 'scenario-004',
    type: 'GROWTH_OPPORTUNITY',
    title: '🚀 OPORTUNIDADE: Parceria',
    context: 'Uma plataforma de eventos quer parceria. Oferece marketing grátis e sistema completo, mas fica com 15% da bilheteria. Seu evento pode crescer 3x.',
    environment: {
      pressure: 'MÉDIA',
      timeLimit: '1 semana',
      stakes: 'Crescimento vs Independência',
      publicImpact: 'Alcance de público'
    },
    choices: [
      {
        id: 'accept-partnership',
        title: '🤝 ACEITAR PARCERIA',
        description: 'Crescer com ajuda profissional',
        neuralPath: ['growth-focused', 'collaborative'],
        effects: {
          budget: +15,
          satisfaction: +20,
          audience: +30,
          technology: +25
        },
        consequence: 'Eventos explodem. Mais trabalho, mas muito mais resultado.',
        insights: 'Entende que crescer junto é melhor que lutar sozinho'
      },
      {
        id: 'stay-independent',
        title: '🏠 MANTER INDEPENDÊNCIA',
        description: 'Continuar do seu jeito, sem divisão',
        neuralPath: ['independent', 'control-focused'],
        effects: {
          budget: +5,
          satisfaction: +5,
          audience: -5,
          technology: -5
        },
        consequence: 'Mantém controle total, mas crescimento limitado.',
        insights: 'Valoriza autonomia e controle sobre crescimento'
      }
    ],
    neuralAnalysis: {
      measures: ['Ambição', 'Colaboração', 'Controle', 'Visão de Futuro'],
      personality_indicators: ['Liderança', 'Parceria', 'Independência', 'Estratégia']
    }
  },

  {
    id: 'scenario-005',
    type: 'DATA_ANALYTICS',
    title: '📊 OPORTUNIDADE: Analytics Avançado',
    context: 'Uma ferramenta mostra que 60% do seu público vem do Instagram, mas você investe igual em Facebook e Google Ads. Os dados sugerem realocar o budget.',
    environment: {
      pressure: 'BAIXA',
      timeLimit: '1 semana',
      stakes: 'ROI de marketing',
      publicImpact: 'Alcance e conversão'
    },
    choices: [
      {
        id: 'ignore-data',
        title: '🤷 IGNORAR DADOS',
        description: 'Manter estratégia atual por intuição',
        neuralPath: ['traditional-producer', 'intuition-based'],
        effects: {
          budget: -5,
          satisfaction: 0,
          audience: -10,
          technology: -15
        },
        consequence: 'Desperdiça budget em canais ineficientes. Crescimento estagnado.',
        insights: 'Confia mais na intuição que em dados objetivos'
      },
      {
        id: 'follow-data',
        title: '🎯 SEGUIR OS DADOS',
        description: 'Realocar 70% do budget para Instagram',
        neuralPath: ['data-driven', 'growth-hacker'],
        effects: {
          budget: +20,
          satisfaction: +15,
          audience: +30,
          technology: +20
        },
        consequence: 'ROI triplica. Eventos vendem mais rápido com público mais qualificado.',
        insights: 'Toma decisões baseadas em evidências, não achismo'
      }
    ],
    neuralAnalysis: {
      measures: ['Análise de Dados', 'ROI Marketing', 'Adaptação Estratégica', 'Performance'],
      personality_indicators: ['Racionalidade', 'Otimização', 'Flexibilidade', 'Resultado']
    }
  },

  {
    id: 'scenario-006',
    type: 'CUSTOMER_EXPERIENCE',
    title: '⭐ DESAFIO: Experiência Premium',
    context: 'Seus eventos são bons, mas não memoráveis. Um concorrente oferece experiências instagramáveis e cobra 40% mais. Você pode evoluir ou manter o básico.',
    environment: {
      pressure: 'MÉDIA',
      timeLimit: '2 semanas',
      stakes: 'Posicionamento de marca',
      publicImpact: 'Percepção de valor'
    },
    choices: [
      {
        id: 'basic-event',
        title: '🏷️ MANTER BÁSICO',
        description: 'Focar em preço baixo e operação simples',
        neuralPath: ['budget-wizard', 'volume-focused'],
        effects: {
          budget: +15,
          satisfaction: -5,
          audience: +5,
          technology: -5
        },
        consequence: 'Margem preservada mas commodity. Concorrência premium ganha mercado.',
        insights: 'Prioriza eficiência operacional sobre diferenciação'
      },
      {
        id: 'premium-experience',
        title: '✨ EXPERIÊNCIA PREMIUM',
        description: 'Investir em cenografia, foto, interação',
        neuralPath: ['premium-focused', 'experience-creator'],
        effects: {
          budget: -20,
          satisfaction: +35,
          audience: +25,
          technology: +15
        },
        consequence: 'Eventos viram case nas redes. Público paga mais por experiências únicas.',
        insights: 'Entende que experiência diferenciada justifica premium'
      }
    ],
    neuralAnalysis: {
      measures: ['Diferenciação', 'Value Proposition', 'Brand Building', 'Customer Journey'],
      personality_indicators: ['Criatividade', 'Visão', 'Qualidade', 'Inovação']
    }
  },

  {
    id: 'scenario-007',
    type: 'SCALING_CHALLENGE',
    title: '🚀 DILEMA: Escalar Operação',
    context: 'Seus eventos lotam sempre, mas você está no limite pessoal. Pode automatizar processos e delegar OU manter controle total e crescimento limitado.',
    environment: {
      pressure: 'ALTA',
      timeLimit: '1 mês',
      stakes: 'Crescimento vs controle',
      publicImpact: 'Capacidade de expansão'
    },
    choices: [
      {
        id: 'keep-control',
        title: '👑 MANTER CONTROLE',
        description: 'Fazer tudo pessoalmente, crescer devagar',
        neuralPath: ['control-focused', 'perfectionist'],
        effects: {
          budget: +5,
          satisfaction: +10,
          audience: -5,
          technology: -10
        },
        consequence: 'Qualidade alta mas crescimento limitado. Burnout crescente.',
        insights: 'Prioriza qualidade e controle sobre escalabilidade'
      },
      {
        id: 'automate-scale',
        title: '⚡ AUTOMATIZAR E ESCALAR',
        description: 'Sistemas, equipe, processos padronizados',
        neuralPath: ['growth-hacker', 'systems-builder'],
        effects: {
          budget: +25,
          satisfaction: +20,
          audience: +40,
          technology: +30
        },
        consequence: 'Operação profissional. Múltiplos eventos simultâneos com qualidade.',
        insights: 'Constrói sistemas para crescimento sustentável'
      }
    ],
    neuralAnalysis: {
      measures: ['Sistematização', 'Delegação', 'Crescimento', 'Eficiência'],
      personality_indicators: ['Liderança', 'Visão', 'Organização', 'Ambição']
    }
  },

  {
    id: 'scenario-008',
    type: 'MARKETING_INNOVATION',
    title: '📱 TENDÊNCIA: Marketing Viral',
    context: 'Uma nova trend no TikTok está bombando. Você pode adaptar para seus eventos e viralizar OU manter estratégia conservadora de marketing tradicional.',
    environment: {
      pressure: 'BAIXA',
      timeLimit: '5 dias',
      stakes: 'Alcance orgânico',
      publicImpact: 'Viralização potencial'
    },
    choices: [
      {
        id: 'traditional-marketing',
        title: '📻 MARKETING TRADICIONAL',
        description: 'Posts normais, impulsionamento pago',
        neuralPath: ['traditional-producer', 'safe-choice'],
        effects: {
          budget: -10,
          satisfaction: +5,
          audience: +10,
          technology: +5
        },
        consequence: 'Resultado previsível e limitado. Oportunidade viral perdida.',
        insights: 'Prefere estratégias testadas e seguras'
      },
      {
        id: 'viral-content',
        title: '🔥 CONTEÚDO VIRAL',
        description: 'Criar challenge único para seus eventos',
        neuralPath: ['digital-native', 'trend-setter'],
        effects: {
          budget: +30,
          satisfaction: +25,
          audience: +50,
          technology: +25
        },
        consequence: 'Vídeo explode com 2M views. Ingressos esgotam em horas.',
        insights: 'Sabe surfar trends e criar buzz orgânico'
      }
    ],
    neuralAnalysis: {
      measures: ['Marketing Digital', 'Criação de Conteúdo', 'Timing', 'Viralização'],
      personality_indicators: ['Ousadia', 'Creativity', 'Trends', 'Digital']
    }
  }
];

// Sistema de Análise Neural
export const NEURAL_ANALYSIS_ENGINE = {
  calculateProfile: (choices: any[]) => {
    // Contadores para cada perfil
    const profileScores = {
      'tech-adopter': 0,
      'customer-focused': 0,
      'budget-wizard': 0,
      'growth-hacker': 0,
      'crisis-manager': 0,
      'traditional-producer': 0,
      'premium-focused': 0,
      'collaborative': 0
    };

    // Analisar escolhas
    choices.forEach(choice => {
      if (choice.neuralPath) {
        choice.neuralPath.forEach((path: string) => {
          if (profileScores[path] !== undefined) {
            profileScores[path]++;
          }
        });
      }
    });

    // Encontrar o perfil dominante
    let dominantProfile = 'tech-adopter';
    let maxScore = 0;

    Object.entries(profileScores).forEach(([profile, score]) => {
      if (score > maxScore) {
        maxScore = score;
        dominantProfile = profile;
      }
    });

    // Mapear para o perfil real
    const profileMap = {
      'tech-adopter': 'TECH_ADOPTER',
      'customer-focused': 'CUSTOMER_FOCUSED', 
      'budget-wizard': 'BUDGET_WIZARD',
      'growth-hacker': 'GROWTH_HACKER',
      'crisis-manager': 'CRISIS_MANAGER',
      'traditional-producer': 'TRADITIONAL_PRODUCER',
      'premium-focused': 'PREMIUM_FOCUSED',
      'collaborative': 'COLLABORATIVE'
    };

    return NEURAL_PRODUCER_PROFILES[profileMap[dominantProfile] || 'TECH_ADOPTER'];
  },

  generateInsights: (choices: any[], profile: any) => {
    const insights = [];
    
    // Insight baseado nas escolhas
    if (choices.some(c => c.id === 'implement-system')) {
      insights.push({
        category: 'INOVAÇÃO',
        icon: '🚀',
        text: 'Você não tem medo de testar novas tecnologias para melhorar a experiência dos seus clientes.'
      });
    }

    if (choices.some(c => c.id === 'value-added')) {
      insights.push({
        category: 'ESTRATÉGIA',
        icon: '💎',
        text: 'Você entende que valor não é só preço baixo - é sobre criar experiências memoráveis.'
      });
    }

    if (choices.some(c => c.id === 'pivot-event')) {
      insights.push({
        category: 'LIDERANÇA',
        icon: '⚡',
        text: 'Na pressão, você não desmorona - você se reinventa e encontra soluções criativas.'
      });
    }

    if (choices.some(c => c.id === 'accept-partnership')) {
      insights.push({
        category: 'CRESCIMENTO',
        icon: '🤝',
        text: 'Você sabe que crescer junto é melhor que lutar sozinho. Parcerias estratégicas são seu forte.'
      });
    }

    // Insights padrão se não tiver específicos
    if (insights.length === 0) {
      insights.push({
        category: 'POTENCIAL',
        icon: '🎯',
        text: 'Você tem todas as características para revolucionar seus eventos com as ferramentas certas.'
      });
    }

    return insights;
  }
};

// Métricas do Neural Game
export const NEURAL_METRICS = {
  budget: { name: 'Orçamento', icon: '💰', color: 'yellow' },
  satisfaction: { name: 'Satisfação', icon: '😊', color: 'green' },
  audience: { name: 'Audiência', icon: '👥', color: 'blue' },
  technology: { name: 'Tecnologia', icon: '⚡', color: 'purple' }
};

// Conquistas do Neural Game
export const NEURAL_ACHIEVEMENTS = [
  {
    id: 'tech-pioneer',
    name: 'Pioneiro Tech',
    description: 'Primeiro a adotar novas tecnologias',
    condition: (choices: any[]) => choices.some(c => c.id === 'implement-system')
  },
  {
    id: 'crisis-solver',
    name: 'Solucionador de Crises',
    description: 'Transforma problemas em oportunidades',
    condition: (choices: any[]) => choices.some(c => c.id === 'pivot-event')
  },
  {
    id: 'value-creator',
    name: 'Criador de Valor',
    description: 'Entende valor além do preço',
    condition: (choices: any[]) => choices.some(c => c.id === 'value-added')
  },
  {
    id: 'partnership-master',
    name: 'Mestre das Parcerias',
    description: 'Sabe quando colaborar para crescer',
    condition: (choices: any[]) => choices.some(c => c.id === 'accept-partnership')
  }
];

export const detectAchievements = (choices: any[]) => {
  return NEURAL_ACHIEVEMENTS
    .filter(achievement => achievement.condition(choices))
    .map(achievement => achievement.name);
};
