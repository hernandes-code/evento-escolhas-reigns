import { GameCard } from '../types/game';

// Balanceamento: ajustes nos efeitos das escolhas para evitar extremos e garantir planejamento
export const gameCards: GameCard[] = [
  {
    id: 'venue-choice',
    title: 'Escolha do Local',
    description: 'Evento para 500 pessoas. Local A: R$ 8.000, 800 lugares, bairro afastado. Local B: R$ 15.000, 600 lugares, centro.',
    leftChoice: {
      text: 'Local A - R$ 8.000 (afastado)',
      effects: { budget: 12, audience: -8, satisfaction: -3, technology: -3 },
      consequence: 'Economizou R$ 7.000, mas 25% desistiram pela localização. Transporte público limitado.',
      tip: '💡 Dica: Locais centrais reduzem custos de transporte e aumentam presença.'
    },
    rightChoice: {
      text: 'Local B - R$ 15.000 (centro)',
      effects: { budget: -8, audience: 12, satisfaction: 8, technology: 3 },
      consequence: 'Investimento alto, mas 95% de presença. Localização facilitou parcerias locais.',
      tip: '💡 Dica: Locais centrais facilitam logística e aumentam valor percebido.'
    },
    icon: '🏢',
    educationalContent: 'Localização representa 40% do sucesso. Lugares centrais aumentam presença em 35%.',
    points: { left: 10, right: 25 }
  },
  {
    id: 'pre-event-marketing',
    title: 'Marketing (60 dias)',
    description: 'R$ 5.000 para marketing. Tudo em influenciadores agora ou dividir: R$ 2.000 influenciadores + R$ 3.000 anúncios escalonados?',
    leftChoice: {
      text: 'R$ 5.000 só influenciadores',
      effects: { budget: -8, audience: 8, satisfaction: 3, technology: -3 },
      consequence: 'Buzz inicial forte, mas caiu 70% após 2 semanas. Perdeu timing final.',
      tip: '💡 Dica: Campanhas concentradas geram picos, mas perdem momentum.'
    },
    rightChoice: {
      text: 'R$ 2.000 + R$ 3.000 escalonado',
      effects: { budget: -8, audience: 15, satisfaction: 8, technology: 12 },
      consequence: 'Estratégia sustentada! Buzz inicial + retargeting converteu indecisos.',
      tip: '💡 Dica: Marketing escalonado mantém "top of mind" e otimiza conversões.'
    },
    icon: '📈',
    educationalContent: 'Marketing escalonado tem 60% mais vendas nos últimos 15 dias.',
    points: { left: 15, right: 30 }
  }
];

export const randomEvents = [
  {
    id: 'weather-crisis',
    title: 'Crise Climática',
    description: 'Previsão de chuva forte no dia do evento!',
    effects: { budget: -10, satisfaction: -15 },
    message: 'Chuva inesperada! Custos extras com cobertura e alguns convidados não vieram.'
  },
  {
    id: 'viral-moment',
    title: 'Momento Viral',
    description: 'Seu evento viralizou no TikTok!',
    effects: { audience: 20, satisfaction: 15 },
    message: 'Um tiktoker famoso postou sobre seu evento! Alcance orgânico explodiu.'
  },
  {
    id: 'technical-issue',
    title: 'Problema Técnico',
    description: 'Falha no sistema de som durante 15 minutos',
    effects: { satisfaction: -10, technology: -15 },
    message: 'Som falhou no meio do show. Equipe técnica resolveu, mas afetou a experiência.'
  },
  {
    id: 'celebrity-surprise',
    title: 'Surpresa Especial',
    description: 'Um artista famoso apareceu de surpresa!',
    effects: { audience: 25, satisfaction: 20 },
    message: 'Uma celebridade apareceu de surpresa! Público ficou eufórico e experiência foi única.'
  },
  {
    id: 'sponsor-bonus',
    title: 'Patrocínio Extra',
    description: 'Um patrocinador decidiu dobrar o investimento!',
    effects: { budget: 20, technology: 10 },
    message: 'Patrocinador ficou tão satisfeito que dobrou o investimento! Recursos extras na conta.'
  }
];

export const INITIAL_METRICS = {
  budget: 65,
  audience: 55,
  satisfaction: 55,
  technology: 55
};

export const GAME_BADGES = {
  TECH_MASTER: {
    name: 'Mestre da Tecnologia',
    description: 'Tomou 8+ decisões focadas em tecnologia',
    icon: '🔧',
    requirement: 'technology_choices >= 8'
  },
  BUDGET_WIZARD: {
    name: 'Mago do Orçamento',
    description: 'Terminou com orçamento acima de 70',
    icon: '💰',
    requirement: 'budget >= 70'
  },
  CROWD_PLEASER: {
    name: 'Conquistador de Multidões',
    description: 'Manteve audiência acima de 80',
    icon: '👥',
    requirement: 'audience >= 80'
  },
  SATISFACTION_GURU: {
    name: 'Guru da Satisfação',
    description: 'Satisfação sempre acima de 70',
    icon: '⭐',
    requirement: 'satisfaction >= 70'
  },
  RISK_TAKER: {
    name: 'Tomador de Riscos',
    description: 'Escolheu opções arriscadas que deram certo',
    icon: '🎲',
    requirement: 'risky_choices >= 5'
  },
  STRATEGIC_MIND: {
    name: 'Mente Estratégica',
    description: 'Pontuação total acima de 280',
    icon: '🧠',
    requirement: 'total_score >= 280'
  },
  CRISIS_MANAGER: {
    name: 'Gestor de Crises',
    description: 'Transformou crises em oportunidades',
    icon: '🚨',
    requirement: 'crisis_handled >= 3'
  },
  DIGITAL_NATIVE: {
    name: 'Nativo Digital',
    description: 'Priorizou soluções digitais',
    icon: '📱',
    requirement: 'digital_choices >= 7'
  }
};