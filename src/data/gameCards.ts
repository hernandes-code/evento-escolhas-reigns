import { GameCard } from '../types/game';

export const gameCards: GameCard[] = [
  {
    id: 'venue-choice',
    title: 'Escolha do Local',
    description: 'Você precisa escolher o local para seu evento. Qual opção você escolhe?',
    leftChoice: {
      text: 'Local mais barato',
      effects: { budget: 20, audience: -10, satisfaction: -5 },
      consequence: 'Você economizou dinheiro, mas o local pode limitar o público e a experiência.'
    },
    rightChoice: {
      text: 'Local premium',
      effects: { budget: -15, audience: 15, satisfaction: 10 },
      consequence: 'Investimento alto, mas o local premium atrai mais público e melhora a experiência.'
    },
    icon: '🏢'
  },
  {
    id: 'ticketing-system',
    title: 'Sistema de Ingressos',
    description: 'Como você vai vender os ingressos do seu evento?',
    leftChoice: {
      text: 'Venda presencial',
      effects: { budget: 5, audience: -15, technology: -20, satisfaction: -10 },
      consequence: 'Venda limitada e filas longas. Você perdeu muitas vendas online!'
    },
    rightChoice: {
      text: 'Bilheteria digital',
      effects: { budget: -5, audience: 20, technology: 25, satisfaction: 15 },
      consequence: 'Excelente escolha! Vendas 24/7, sem filas e dados valiosos dos clientes.'
    },
    icon: '🎫'
  },
  {
    id: 'marketing-strategy',
    title: 'Estratégia de Marketing',
    description: 'Como você vai divulgar seu evento?',
    leftChoice: {
      text: 'Boca a boca',
      effects: { budget: 10, audience: -20, satisfaction: -5 },
      consequence: 'Alcance muito limitado. Você deixou muita gente sem saber do evento.'
    },
    rightChoice: {
      text: 'Marketing digital',
      effects: { budget: -10, audience: 25, technology: 15, satisfaction: 10 },
      consequence: 'Investimento certeiro! Alcance massivo e segmentação precisa do público.'
    },
    icon: '📱'
  },
  {
    id: 'payment-method',
    title: 'Formas de Pagamento',
    description: 'Quais formas de pagamento você vai aceitar?',
    leftChoice: {
      text: 'Só dinheiro',
      effects: { budget: 0, audience: -25, technology: -15, satisfaction: -15 },
      consequence: 'Muita gente não trouxe dinheiro. Você perdeu vendas importantes!'
    },
    rightChoice: {
      text: 'PIX, cartão e digital',
      effects: { budget: -5, audience: 20, technology: 20, satisfaction: 20 },
      consequence: 'Perfeito! Facilidade de pagamento aumentou as vendas e a satisfação.'
    },
    icon: '💳'
  },
  {
    id: 'event-app',
    title: 'App do Evento',
    description: 'Você vai criar um app para o evento?',
    leftChoice: {
      text: 'Não precisa',
      effects: { budget: 5, audience: -10, technology: -20, satisfaction: -10 },
      consequence: 'Sem app, o público ficou perdido e a experiência foi prejudicada.'
    },
    rightChoice: {
      text: 'App interativo',
      effects: { budget: -15, audience: 15, technology: 30, satisfaction: 25 },
      consequence: 'O app revolucionou a experiência! Networking, cronograma e muito mais.'
    },
    icon: '📱'
  },
  {
    id: 'data-collection',
    title: 'Coleta de Dados',
    description: 'Como você vai coletar dados dos participantes?',
    leftChoice: {
      text: 'Lista de papel',
      effects: { budget: 0, audience: -5, technology: -25, satisfaction: -10 },
      consequence: 'Dados perdidos e impossíveis de analisar. Oportunidade desperdiçada!'
    },
    rightChoice: {
      text: 'Formulário digital',
      effects: { budget: -5, audience: 10, technology: 25, satisfaction: 15 },
      consequence: 'Dados organizados e insights valiosos para futuros eventos!'
    },
    icon: '📊'
  },
  {
    id: 'social-media',
    title: 'Redes Sociais',
    description: 'Como você vai usar as redes sociais durante o evento?',
    leftChoice: {
      text: 'Postar depois',
      effects: { budget: 0, audience: -15, technology: -10, satisfaction: -5 },
      consequence: 'Perdeu o buzz do momento! Engajamento foi muito baixo.'
    },
    rightChoice: {
      text: 'Transmissão ao vivo',
      effects: { budget: -10, audience: 30, technology: 20, satisfaction: 20 },
      consequence: 'Viralizou! Milhares assistiram online e o evento ganhou muito alcance.'
    },
    icon: '📺'
  },
  {
    id: 'feedback-system',
    title: 'Sistema de Feedback',
    description: 'Como você vai coletar feedback dos participantes?',
    leftChoice: {
      text: 'Não coletar',
      effects: { budget: 0, audience: -5, technology: -15, satisfaction: -20 },
      consequence: 'Sem feedback, você não sabe o que melhorar para o próximo evento.'
    },
    rightChoice: {
      text: 'Pesquisa digital',
      effects: { budget: -5, audience: 5, technology: 20, satisfaction: 15 },
      consequence: 'Feedback valioso! Agora você sabe exatamente o que funcionou.'
    },
    icon: '⭐'
  },
  {
    id: 'last-minute-tickets',
    title: 'Ingressos de Última Hora',
    description: 'Alguém quer comprar ingressos na porta do evento. O que fazer?',
    leftChoice: {
      text: 'Não vender',
      effects: { budget: -10, audience: -15, satisfaction: -10 },
      consequence: 'Perdeu vendas e deixou gente frustrada na porta.'
    },
    rightChoice: {
      text: 'Venda digital na hora',
      effects: { budget: 15, audience: 10, technology: 15, satisfaction: 10 },
      consequence: 'Com QR code e pagamento digital, vendeu na hora! Tecnologia salvou o dia.'
    },
    icon: '🚪'
  },
  {
    id: 'event-analytics',
    title: 'Análise do Evento',
    description: 'Como você vai medir o sucesso do seu evento?',
    leftChoice: {
      text: 'Só contar pessoas',
      effects: { budget: 0, audience: -5, technology: -20, satisfaction: -15 },
      consequence: 'Dados limitados. Você não conseguiu otimizar para o próximo evento.'
    },
    rightChoice: {
      text: 'Analytics completo',
      effects: { budget: -10, audience: 10, technology: 30, satisfaction: 20 },
      consequence: 'Dados completos! Horários de pico, origem do público e muito mais.'
    },
    icon: '📈'
  }
];

export const INITIAL_METRICS = {
  budget: 50,
  audience: 50,
  satisfaction: 50,
  technology: 50
};