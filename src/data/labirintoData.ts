export interface PortalCenario {
  id: string;
  nome: string;
  situacao: string;
  opcaoA: {
    texto: string;
    emoji: string;
    traits: Record<string, number>;
    resultado: string;
  };
  opcaoB: {
    texto: string;
    emoji: string;
    traits: Record<string, number>;
    resultado: string;
  };
  icone: string;
  cor: string;
  categoria: string;
}

export interface PerfilProdutor {
  nome: string;
  descricao: string;
  caracteristicas: string[];
  pontoForte: string;
  potencial: string;
  cor: string;
  icone: string;
}

export const CENARIOS_LABIRINTO: PortalCenario[] = [
  {
    id: 'crise',
    nome: 'Portal da Crise',
    situacao: 'Seu evento de 500 pessoas está em 2h e o sistema de som falhou completamente',
    opcaoA: {
      texto: 'Buscar solução técnica alternativa',
      emoji: '🔧',
      traits: { estrategico: 15, organizador: 10, tech_savvy: 20, proativo: 15 },
      resultado: 'Mente analítica sob pressão'
    },
    opcaoB: {
      texto: 'Transformar em experiência íntima',
      emoji: '🎪',
      traits: { criativo: 20, relacionamento: 15, inclusivo: 10, estrategico: 10 },
      resultado: 'Visão criativa adaptativa'
    },
    icone: '🔥',
    cor: '#EF4444',
    categoria: 'Gestão de Crise'
  },
  {
    id: 'inovacao',
    nome: 'Portal da Inovação',
    situacao: 'Cliente corporativo quer "algo nunca visto antes" mas tem orçamento de evento padrão',
    opcaoA: {
      texto: 'Criar experiência tecnológica',
      emoji: '🚀',
      traits: { tech_savvy: 20, criativo: 15, estrategico: 10, organizador: 5 },
      resultado: 'Inovador tecnológico'
    },
    opcaoB: {
      texto: 'Revolucionar a experiência humana',
      emoji: '✨',
      traits: { criativo: 20, relacionamento: 15, inclusivo: 15, proativo: 10 },
      resultado: 'Revolucionário de experiências'
    },
    icone: '💡',
    cor: '#F59E0B',
    categoria: 'Inovação'
  },
  {
    id: 'conexao',
    nome: 'Portal da Conexão',
    situacao: 'Evento misto: executivos conservadores e jovens criativos no mesmo espaço',
    opcaoA: {
      texto: 'Criar experiências paralelas',
      emoji: '🎭',
      traits: { organizador: 20, estrategico: 15, inclusivo: 10, criativo: 10 },
      resultado: 'Arquiteto de experiências'
    },
    opcaoB: {
      texto: 'Unificar através de storytelling',
      emoji: '📖',
      traits: { relacionamento: 20, criativo: 15, inclusivo: 15, estrategico: 10 },
      resultado: 'Mestre em conexões humanas'
    },
    icone: '👥',
    cor: '#8B5CF6',
    categoria: 'Relacionamento'
  },
  {
    id: 'investimento',
    nome: 'Portal do Investimento',
    situacao: 'Cliente aprovou verba extra de 50%. Onde investir para máximo impacto?',
    opcaoA: {
      texto: 'Tecnologia e produção',
      emoji: '🎬',
      traits: { tech_savvy: 15, estrategico: 20, organizador: 15, proativo: 10 },
      resultado: 'Estrategista de investimentos'
    },
    opcaoB: {
      texto: 'Experiência e networking',
      emoji: '🤝',
      traits: { relacionamento: 20, criativo: 15, inclusivo: 15, estrategico: 10 },
      resultado: 'Investidor em relacionamentos'
    },
    icone: '💰',
    cor: '#10B981',
    categoria: 'Estratégia Financeira'
  },
  {
    id: 'crescimento',
    nome: 'Portal do Crescimento',
    situacao: 'Proposta para organizar evento nacional chegou hoje. Equipe atual é limitada.',
    opcaoA: {
      texto: 'Aceitar e expandir rapidamente',
      emoji: '⚡',
      traits: { proativo: 20, estrategico: 15, organizador: 10, tech_savvy: 10 },
      resultado: 'Visionário expansionista'
    },
    opcaoB: {
      texto: 'Formar parceria estratégica',
      emoji: '🤝',
      traits: { relacionamento: 20, estrategico: 15, inclusivo: 15, organizador: 10 },
      resultado: 'Construtor de alianças'
    },
    icone: '🚀',
    cor: '#3B82F6',
    categoria: 'Crescimento'
  },
  {
    id: 'parcerias',
    nome: 'Portal das Parcerias',
    situacao: 'Seu maior concorrente propôs sociedade em projeto milionário',
    opcaoA: {
      texto: 'Analisar viabilidade técnica',
      emoji: '📊',
      traits: { estrategico: 20, organizador: 15, tech_savvy: 10, proativo: 10 },
      resultado: 'Analista estratégico'
    },
    opcaoB: {
      texto: 'Focar no potencial humano',
      emoji: '💫',
      traits: { relacionamento: 20, inclusivo: 15, criativo: 15, estrategico: 10 },
      resultado: 'Diplomata dos negócios'
    },
    icone: '🤝',
    cor: '#EC4899',
    categoria: 'Parcerias'
  },
  {
    id: 'risco',
    nome: 'Portal do Risco',
    situacao: 'Oportunidade de criar formato de evento totalmente novo. Pode revolucionar ou falhar.',
    opcaoA: {
      texto: 'Pilotar com dados e métricas',
      emoji: '📈',
      traits: { tech_savvy: 20, estrategico: 15, organizador: 15, proativo: 10 },
      resultado: 'Inovador calculista'
    },
    opcaoB: {
      texto: 'Confiar na intuição criativa',
      emoji: '🎨',
      traits: { criativo: 20, proativo: 15, relacionamento: 10, inclusivo: 10 },
      resultado: 'Visionário intuitivo'
    },
    icone: '🎲',
    cor: '#F97316',
    categoria: 'Gestão de Risco'
  },
  {
    id: 'legado',
    nome: 'Portal do Legado',
    situacao: 'Como você quer ser lembrado no mercado de eventos daqui 10 anos?',
    opcaoA: {
      texto: 'Pioneiro em tecnologia',
      emoji: '🔮',
      traits: { tech_savvy: 20, proativo: 15, estrategico: 15, criativo: 10 },
      resultado: 'Pioneiro tecnológico'
    },
    opcaoB: {
      texto: 'Criador de conexões únicas',
      emoji: '🌟',
      traits: { relacionamento: 20, criativo: 15, inclusivo: 15, estrategico: 10 },
      resultado: 'Criador de momentos eternos'
    },
    icone: '🏆',
    cor: '#FBBF24',
    categoria: 'Visão de Futuro'
  }
];

export const PERFIS_PRODUTOR: Record<string, PerfilProdutor> = {
  'visionario_estrategico': {
    nome: 'Visionário Estratégico',
    descricao: 'Você combina visão de futuro com planejamento meticuloso. Antecipa tendências e executa com precisão.',
    caracteristicas: ['Pensamento de longo prazo', 'Análise de mercado', 'Execução precisa', 'Inovação calculada'],
    pontoForte: 'Capacidade de ver oportunidades onde outros veem problemas',
    potencial: 'Líder de transformação digital no mercado de eventos',
    cor: '#3B82F6',
    icone: '🧠'
  },
  'mestre_relacionamentos': {
    nome: 'Mestre em Relacionamentos',
    descricao: 'Sua força está nas conexões humanas. Cria experiências que tocam corações e geram networking poderoso.',
    caracteristicas: ['Inteligência emocional', 'Network poderoso', 'Experiências memoráveis', 'Comunicação excepcional'],
    pontoForte: 'Transformar eventos em plataformas de conexão genuína',
    potencial: 'Referência em experiências humanas autênticas',
    cor: '#EC4899',
    icone: '💝'
  },
  'inovador_tecnologico': {
    nome: 'Inovador Tecnológico',
    descricao: 'Você está sempre um passo à frente. Usa tecnologia para criar experiências impossíveis de replicar.',
    caracteristicas: ['Domínio tecnológico', 'Inovação constante', 'Eficiência operacional', 'Soluções disruptivas'],
    pontoForte: 'Integrar tecnologia de forma orgânica em experiências humanas',
    potencial: 'Pioneiro em eventos do futuro',
    cor: '#10B981',
    icone: '🚀'
  },
  'arquiteto_experiencias': {
    nome: 'Arquiteto de Experiências',
    descricao: 'Você desenha jornadas emocionais. Cada detalhe é pensado para criar impacto duradouro.',
    caracteristicas: ['Design de experiência', 'Atenção aos detalhes', 'Criatividade aplicada', 'Gestão emocional'],
    pontoForte: 'Criar momentos que ficam na memória para sempre',
    potencial: 'Referência em experiências transformadoras',
    cor: '#8B5CF6',
    icone: '✨'
  },
  'estrategista_negocios': {
    nome: 'Estrategista de Negócios',
    descricao: 'Você vê o evento como investimento. Maximiza ROI enquanto entrega valor excepcional.',
    caracteristicas: ['Visão de negócios', 'ROI otimizado', 'Parcerias estratégicas', 'Crescimento sustentável'],
    pontoForte: 'Equilibrar excelência criativa com resultados financeiros',
    potencial: 'Líder em eventos corporativos de alto valor',
    cor: '#F59E0B',
    icone: '📈'
  },
  'criativo_disruptivo': {
    nome: 'Criativo Disruptivo',
    descricao: 'Você quebra padrões e cria tendências. Seus eventos são falados por meses.',
    caracteristicas: ['Originalidade extrema', 'Coragem criativa', 'Tendências próprias', 'Impacto viral'],
    pontoForte: 'Criar experiências que ninguém imaginava ser possível',
    potencial: 'Influenciador de toda uma geração de produtores',
    cor: '#EF4444',
    icone: '🎨'
  }
};

export const TRAITS_NEURAIS = {
  estrategico: { nome: 'Estratégico', cor: '#3B82F6', icone: '🎯' },
  organizador: { nome: 'Organizador', cor: '#10B981', icone: '📋' },
  tech_savvy: { nome: 'Tech Expert', cor: '#8B5CF6', icone: '💻' },
  criativo: { nome: 'Criativo', cor: '#EC4899', icone: '🎨' },
  relacionamento: { nome: 'Networking', cor: '#F59E0B', icone: '🤝' },
  inclusivo: { nome: 'Inclusivo', cor: '#06B6D4', icone: '🌍' },
  proativo: { nome: 'Proativo', cor: '#EF4444', icone: '⚡' },
  visionario: { nome: 'Visionário', cor: '#FBBF24', icone: '🔮' }
};
