export interface Badge {
  id: string;
  name: string;
  description: string;
  criteria: (metrics: any, history: any) => boolean;
  image: string;
  character: string;
}

export const BADGES: Badge[] = [
  {
    id: 'mao-de-vaca',
    name: 'Mão de Vaca',
    description: 'Economizou até no cafezinho!',
    criteria: (metrics, history) => metrics.budget >= 85,
    image: '/assets/badges/mao-de-vaca.png',
    character: 'produtor-cofre',
  },
  {
    id: 'arrasta-multidao',
    name: 'Arrasta Multidão',
    description: 'Trouxe até o vizinho pro evento!',
    criteria: (metrics, history) => metrics.audience >= 90,
    image: '/assets/badges/arrasta-multidao.png',
    character: 'produtor-megafone',
  },
  {
    id: 'mestre-do-sorriso',
    name: 'Mestre do Sorriso',
    description: 'Todo mundo saiu feliz e relaxado!',
    criteria: (metrics, history) => metrics.satisfaction >= 90,
    image: '/assets/badges/mestre-do-sorriso.png',
    character: 'produtor-zen',
  },
  {
    id: 'techno-guru',
    name: 'Techno Guru',
    description: 'Usou até drone pra servir salgadinho!',
    criteria: (metrics, history) => metrics.technology >= 90,
    image: '/assets/badges/techno-guru.png',
    character: 'produtor-vr',
  },
  {
    id: 'improvisador',
    name: 'Improvisador',
    description: 'Resolve tudo no improviso!',
    criteria: (metrics, history) => metrics.budget < 60 && metrics.audience < 60 && metrics.satisfaction < 60 && metrics.technology < 60,
    image: '/assets/badges/improvisador.png',
    character: 'produtor-mochila',
  },
  {
    id: 'pixzeiro',
    name: 'Pixzeiro',
    description: 'Só aceita Pix, sem conversa!',
    criteria: (metrics, history) => history.filter(h => h.cardId.includes('pagamento') && h.choice === 'left').length >= 2,
    image: '/assets/badges/pixzeiro.png',
    character: 'produtor-pix',
  },
  {
    id: 'influencer',
    name: 'Influencer',
    description: 'Virou trend no TikTok!',
    criteria: (metrics, history) => history.filter(h => h.cardId.includes('marketing') && h.choice === 'left').length >= 2,
    image: '/assets/badges/influencer.png',
    character: 'produtor-selfie',
  },
  {
    id: 'raiz',
    name: 'Raiz',
    description: 'Não abre mão do papel e caneta!',
    criteria: (metrics, history) => history.filter(h => h.cardId.includes('tradicional')).length >= 2,
    image: '/assets/badges/raiz.png',
    character: 'produtor-agenda',
  },
  {
    id: 'aventureiro',
    name: 'Aventureiro',
    description: 'Vive no limite, sem medo de errar!',
    criteria: (metrics, history) => metrics.budget < 30 || metrics.audience < 30 || metrics.satisfaction < 30 || metrics.technology < 30,
    image: '/assets/badges/aventureiro.png',
    character: 'produtor-capacete',
  },
];
