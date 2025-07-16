import { GameCard } from '../types/game';

export const gameCards: GameCard[] = [
  {
    id: 'venue-choice',
    title: 'Escolha do Local',
    description: 'Evento para 500 pessoas. Local A: R$ 8.000, 800 lugares, bairro afastado. Local B: R$ 15.000, 600 lugares, centro.',
    leftChoice: {
      text: 'Local A - R$ 8.000 (afastado)',
      effects: { budget: 15, audience: -10, satisfaction: -5, technology: -5 },
      consequence: 'Economizou R$ 7.000, mas 25% desistiram pela localização. Transporte público limitado.',
      tip: '💡 Dica: Locais centrais reduzem custos de transporte e aumentam presença.'
    },
    rightChoice: {
      text: 'Local B - R$ 15.000 (centro)',
      effects: { budget: -10, audience: 15, satisfaction: 10, technology: 5 },
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
      effects: { budget: -10, audience: 10, satisfaction: 5, technology: -5 },
      consequence: 'Buzz inicial forte, mas caiu 70% após 2 semanas. Perdeu timing final.',
      tip: '💡 Dica: Campanhas concentradas geram picos, mas perdem momentum.'
    },
    rightChoice: {
      text: 'R$ 2.000 + R$ 3.000 escalonado',
      effects: { budget: -10, audience: 20, satisfaction: 10, technology: 15 },
      consequence: 'Estratégia sustentada! Buzz inicial + retargeting converteu indecisos.',
      tip: '💡 Dica: Marketing escalonado mantém "top of mind" e otimiza conversões.'
    },
    icon: '📈',
    educationalContent: 'Marketing escalonado tem 60% mais vendas nos últimos 15 dias.',
    points: { left: 15, right: 30 }
  },
  {
    id: 'ticketing-dilemma',
    title: 'Precificação',
    description: '400 ingressos. Lotes progressivos: 1º R$ 80, 2º R$ 120, 3º R$ 150. Ou preço único R$ 100?',
    leftChoice: {
      text: 'Lotes R$ 80→120→150',
      effects: { budget: 5, audience: 20, satisfaction: -5, technology: 10 },
      consequence: 'Vendas rápidas no 1º lote, reclamações no 3º. Total: R$ 44.000. Urgência efetiva.',
      tip: '💡 Dica: Lotes progressivos aumentam urgência, mas podem gerar insatisfação.'
    },
    rightChoice: {
      text: 'Preço único R$ 100',
      effects: { budget: 0, audience: 10, satisfaction: 15, technology: 5 },
      consequence: 'Vendas constantes, boa satisfação. Total: R$ 40.000. Sem urgência inicial.',
      tip: '💡 Dica: Preços fixos geram confiança, mas reduzem urgência de compra.'
    },
    icon: '💰',
    educationalContent: 'Lotes aumentam vendas antecipadas em 45%, mas devem ser bem comunicados.',
    points: { left: 20, right: 15 }
  },
  {
    id: 'technology-choice',
    title: 'Investimento em Tecnologia',
    description: 'Você tem R$ 8.000 para tecnologia. Pode investir em: App próprio (R$ 8.000) com funcionalidades completas, ou dividir entre QR Code check-in (R$ 3.000) + Live streaming (R$ 5.000).',
    leftChoice: {
      text: 'App próprio completo (R$ 8.000)',
      effects: { budget: -20, audience: 10, satisfaction: 25, technology: 35 },
      consequence: 'App funcionou perfeitamente! Networking aumentou 300%, satisfação alta. Porém, apenas 40% baixaram antes do evento.',
      tip: '💡 Dica: Apps próprios oferecem experiência premium, mas dependem de adoção prévia.'
    },
    rightChoice: {
      text: 'QR Check-in (R$ 3.000) + Live Streaming (R$ 5.000)',
      effects: { budget: -20, audience: 35, satisfaction: 15, technology: 25 },
      consequence: 'Check-in em 30 segundos, zero filas! Live atingiu 2.000 pessoas online. Soluções simples com alto impacto.',
      tip: '💡 Dica: Tecnologias focadas resolvem problemas específicos e têm adoção mais rápida.'
    },
    icon: '📱',
    educationalContent: 'Eventos híbridos (presencial + online) alcançam 3x mais pessoas e geram 40% mais leads qualificados.',
    points: { left: 25, right: 35 }
  },
  {
    id: 'payment-strategy',
    title: 'Estratégia de Pagamento',
    description: 'Pesquisa mostra que 60% do público prefere PIX, 30% cartão e 10% boleto. Você pode: aceitar apenas PIX (economia de 2% em taxas) ou aceitar todos os métodos.',
    leftChoice: {
      text: 'Apenas PIX (economia de 2% em taxas)',
      effects: { budget: 15, audience: -25, satisfaction: -15, technology: 10 },
      consequence: 'Economizou R$ 800 em taxas, mas perdeu 40% das vendas. Público mais velho ficou excluído do processo.',
      tip: '💡 Dica: Economias em taxas podem custar mais em vendas perdidas.'
    },
    rightChoice: {
      text: 'Todos os métodos (PIX, cartão, boleto)',
      effects: { budget: -10, audience: 30, satisfaction: 25, technology: 20 },
      consequence: 'Vendas aumentaram 35%! Diversidade de pagamento incluiu todos os perfis. Custo extra se pagou com volume.',
      tip: '💡 Dica: Inclusão de métodos de pagamento amplia alcance e aumenta conversões.'
    },
    icon: '💳',
    educationalContent: 'Eventos que oferecem 3+ métodos de pagamento vendem 35% mais ingressos que os com opção única.',
    points: { left: 10, right: 30 }
  },
  {
    id: 'crisis-management',
    title: 'Gestão de Crise',
    description: 'Faltam 5 dias para o evento. O artista principal cancelou! Você pode: contratar um substituto famoso (R$ 12.000 extra) ou promover o co-headliner + oferecer experiências VIP gratuitas.',
    leftChoice: {
      text: 'Contratar substituto famoso (R$ 12.000)',
      effects: { budget: -30, audience: 20, satisfaction: 10, technology: 0 },
      consequence: 'Público aceitou bem, mas orçamento estourou. Tiveram que cortar outros itens. Evento aconteceu, mas com prejuízo.',
      tip: '💡 Dica: Soluções caras de última hora podem comprometer todo o orçamento.'
    },
    rightChoice: {
      text: 'Promover co-headliner + experiências VIP gratuitas',
      effects: { budget: -5, audience: 5, satisfaction: 25, technology: 15 },
      consequence: 'Transformou crise em oportunidade! Público adorou as experiências VIP. Co-headliner brilhou e ganhou novos fãs.',
      tip: '💡 Dica: Criatividade na crise pode gerar mais valor que soluções caras.'
    },
    icon: '🚨',
    educationalContent: 'Produtores experientes sempre têm "Plano B" para artistas principais, reduzindo riscos em 80%.',
    points: { left: 15, right: 30 }
  },
  {
    id: 'data-strategy',
    title: 'Estratégia de Dados',
    description: 'Você pode coletar dados do público via: formulário obrigatório no ingresso (conversão 60%) ou pesquisa opcional pós-evento (conversão 15%) com incentivo R$ 20 desconto no próximo.',
    leftChoice: {
      text: 'Formulário obrigatório na compra',
      effects: { budget: 0, audience: -10, satisfaction: -10, technology: 25 },
      consequence: 'Coletou 240 dados qualificados, mas 16% desistiram da compra. Dados ricos, mas impacto nas vendas.',
      tip: '💡 Dica: Formulários obrigatórios geram dados melhores, mas podem reduzir conversão.'
    },
    rightChoice: {
      text: 'Pesquisa opcional + incentivo R$ 20',
      effects: { budget: -10, audience: 15, satisfaction: 20, technology: 15 },
      consequence: 'Apenas 60 respostas, mas todas super qualificadas. Gasto R$ 1.200 em incentivos, mas gerou goodwill positivo.',
      tip: '💡 Dica: Incentivos voluntários geram dados mais honestos e melhor relacionamento.'
    },
    icon: '📊',
    educationalContent: 'Dados coletados voluntariamente têm 3x mais precisão que formulários obrigatórios.',
    points: { left: 20, right: 25 }
  },
  {
    id: 'social-media-crisis',
    title: 'Crise nas Redes Sociais',
    description: 'Um influenciador criticou seu evento online (30k visualizações). Você pode: responder publicamente defendendo o evento ou convidar para uma conversa privada + ingresso VIP.',
    leftChoice: {
      text: 'Resposta pública defendendo o evento',
      effects: { budget: 0, audience: -15, satisfaction: -20, technology: 5 },
      consequence: 'Virou debate público! Mais 100k pessoas viram a polêmica. Alguns apoiaram, mas imagem ficou associada ao conflito.',
      tip: '💡 Dica: Respostas públicas podem amplificar crises ao invés de resolvê-las.'
    },
    rightChoice: {
      text: 'Conversa privada + ingresso VIP',
      effects: { budget: -5, audience: 20, satisfaction: 15, technology: 10 },
      consequence: 'Influenciador virou embaixador! Postou story positivo (50k visualizações) elogiando o atendimento. Crise virou oportunidade.',
      tip: '💡 Dica: Diálogo privado transforma críticos em embaixadores.'
    },
    icon: '📱',
    educationalContent: '90% das crises nas redes sociais podem ser resolvidas com diálogo direto, evitando exposição pública.',
    points: { left: 5, right: 30 }
  },
  {
    id: 'partnership-dilemma',
    title: 'Dilema de Parcerias',
    description: 'Uma marca quer patrocinar R$ 10.000, mas exige exclusividade da categoria e 3 posts no Instagram do evento. Você já tem interesse de 2 marcas menores (R$ 3.000 cada) da mesma categoria.',
    leftChoice: {
      text: 'Aceitar patrocínio exclusivo R$ 10.000',
      effects: { budget: 25, audience: 5, satisfaction: -5, technology: 0 },
      consequence: 'Mais dinheiro, mas marca gigante "engoliu" a identidade do evento. Público reclamou do excesso de branding.',
      tip: '💡 Dica: Patrocínios grandes podem comprometer a autenticidade do evento.'
    },
    rightChoice: {
      text: 'Duas marcas menores (R$ 6.000 total)',
      effects: { budget: 15, audience: 10, satisfaction: 15, technology: 5 },
      consequence: 'Menos dinheiro, mas parcerias mais equilibradas. Marcas menores se engajaram mais e público aprovou a diversidade.',
      tip: '💡 Dica: Múltiplas parcerias podem gerar mais valor agregado que uma grande.'
    },
    icon: '🤝',
    educationalContent: 'Eventos com 3-5 patrocinadores têm 40% mais engajamento que os com patrocínio único.',
    points: { left: 20, right: 25 }
  },
  {
    id: 'final-decision',
    title: 'Decisão Final: Expansão',
    description: 'Seu evento foi um sucesso! Você pode: usar o lucro para fazer uma 2ª edição maior no mesmo ano, ou guardar para investir em tecnologia e fazer uma edição ainda melhor no próximo ano.',
    leftChoice: {
      text: '2ª edição ainda este ano',
      effects: { budget: -25, audience: 20, satisfaction: 5, technology: -10 },
      consequence: 'Acelerou demais! Segunda edição teve problemas de organização. Público comparou com a primeira e ficou decepcionado.',
      tip: '💡 Dica: Crescimento rápido pode comprometer qualidade e reputação.'
    },
    rightChoice: {
      text: 'Investir em tecnologia para próximo ano',
      effects: { budget: 15, audience: 30, satisfaction: 30, technology: 40 },
      consequence: 'Paciência recompensada! Próxima edição com tecnologia avançada virou referência. Construiu uma marca sólida.',
      tip: '💡 Dica: Crescimento sustentado constrói marcas duradouras.'
    },
    icon: '🎯',
    educationalContent: 'Eventos que investem em tecnologia entre edições têm 70% mais chances de se tornarem referência no setor.',
    points: { left: 15, right: 35 }
  }
];

// Eventos aleatórios que podem acontecer durante o jogo
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
  budget: 60,
  audience: 50,
  satisfaction: 50,
  technology: 50
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