// Análise de Balanceamento do Jogo - NOVA VERSÃO
const gameCards = [
  { id: 'venue-choice', left: { budget: 15, audience: -5, satisfaction: -8, technology: 2 }, right: { budget: -20, audience: 15, satisfaction: 12, technology: 8 } },
  { id: 'pre-event-marketing', left: { budget: -18, audience: 8, satisfaction: 5, technology: 3 }, right: { budget: -15, audience: 20, satisfaction: 12, technology: 15 } },
  { id: 'ticketing-dilemma', left: { budget: 15, audience: 25, satisfaction: 10, technology: 8 }, right: { budget: 8, audience: 12, satisfaction: 18, technology: 5 } },
  { id: 'technology-choice', left: { budget: 8, audience: 5, satisfaction: 2, technology: 3 }, right: { budget: -12, audience: 25, satisfaction: 22, technology: 30 } },
  { id: 'payment-strategy', left: { budget: 12, audience: -10, satisfaction: -15, technology: 12 }, right: { budget: -15, audience: 30, satisfaction: 25, technology: 20 } },
  { id: 'crisis-management', left: { budget: -35, audience: 15, satisfaction: 8, technology: 2 }, right: { budget: -12, audience: 8, satisfaction: 25, technology: 18 } },
  { id: 'data-strategy', left: { budget: -8, audience: -8, satisfaction: -5, technology: 25 }, right: { budget: -18, audience: 12, satisfaction: 20, technology: 15 } },
  { id: 'social-media-crisis', left: { budget: -5, audience: -5, satisfaction: -8, technology: 8 }, right: { budget: -12, audience: 20, satisfaction: 18, technology: 12 } },
  { id: 'partnership-dilemma', left: { budget: 15, audience: 8, satisfaction: -5, technology: 3 }, right: { budget: 10, audience: 15, satisfaction: 20, technology: 12 } },
  { id: 'final-decision', left: { budget: -10, audience: 15, satisfaction: 25, technology: 20 }, right: { budget: 12, audience: 25, satisfaction: 5, technology: 5 } }
];

function simulateGame() {
  let metrics = { budget: 100, audience: 0, satisfaction: 0, technology: 0 };
  let gameOver = false;
  let reason = '';
  
  for (let i = 0; i < gameCards.length && !gameOver; i++) {
    const card = gameCards[i];
    const choice = Math.random() < 0.5 ? 'left' : 'right';
    const effects = choice === 'left' ? card.left : card.right;
    
    metrics.budget = Math.max(0, Math.min(100, metrics.budget + (effects.budget || 0)));
    metrics.audience = Math.max(0, Math.min(100, metrics.audience + (effects.audience || 0)));
    metrics.satisfaction = Math.max(0, Math.min(100, metrics.satisfaction + (effects.satisfaction || 0)));
    metrics.technology = Math.max(0, Math.min(100, metrics.technology + (effects.technology || 0)));
    
    if (i >= 1) {
      if (metrics.budget <= 0) { gameOver = true; reason = 'Budget'; }
      else if (metrics.audience < 0) { gameOver = true; reason = 'Audience'; }
      else if (metrics.satisfaction < 0) { gameOver = true; reason = 'Satisfaction'; }
    }
  }
  
  return { metrics, gameOver, reason };
}

console.log('=== 20 SIMULAÇÕES DO JOGO ===\n');

let results = [];
for (let i = 1; i <= 20; i++) {
  const result = simulateGame();
  results.push(result);
  console.log(`Simulação ${i}:`);
  console.log(`  Budget: ${result.metrics.budget}% | Audience: ${result.metrics.audience}% | Satisfaction: ${result.metrics.satisfaction}% | Technology: ${result.metrics.technology}%`);
  console.log(`  Game Over: ${result.gameOver ? 'SIM (' + result.reason + ')' : 'NÃO'} | Score Total: ${result.metrics.budget + result.metrics.audience + result.metrics.satisfaction + result.metrics.technology}`);
  console.log('');
}

// Análise
const completed = results.filter(r => !r.gameOver);
const avgBudget = results.reduce((s, r) => s + r.metrics.budget, 0) / 20;
const avgAudience = results.reduce((s, r) => s + r.metrics.audience, 0) / 20;
const avgSatisfaction = results.reduce((s, r) => s + r.metrics.satisfaction, 0) / 20;
const avgTechnology = results.reduce((s, r) => s + r.metrics.technology, 0) / 20;

console.log('=== ANÁLISE DOS RESULTADOS ===');
console.log(`Jogos completados: ${completed.length}/20 (${completed.length*5}%)`);
console.log(`Médias: Budget ${avgBudget.toFixed(1)}% | Audience ${avgAudience.toFixed(1)}% | Satisfaction ${avgSatisfaction.toFixed(1)}% | Technology ${avgTechnology.toFixed(1)}%`);

console.log('\n=== PROBLEMAS IDENTIFICADOS ===');
console.log(`1. ORÇAMENTO: Média de ${avgBudget.toFixed(1)}% - ${avgBudget > 70 ? 'MUITO ALTO' : 'OK'}`);
console.log(`2. CRESCIMENTO: Outros status crescem rápido demais`);
console.log(`3. GAME OVER: Apenas ${20-completed.length} de 20 jogos terminaram early`);

// Análise detalhada das cartas
console.log('\n=== ANÁLISE DAS CARTAS ===');
let budgetGains = 0, budgetLosses = 0;
gameCards.forEach(card => {
  if (card.left.budget > 0) budgetGains += card.left.budget;
  if (card.left.budget < 0) budgetLosses += Math.abs(card.left.budget);
  if (card.right.budget > 0) budgetGains += card.right.budget;
  if (card.right.budget < 0) budgetLosses += Math.abs(card.right.budget);
});
console.log(`Total possível ganho orçamento: ${budgetGains}`);
console.log(`Total possível perda orçamento: ${budgetLosses}`);
console.log(`Ratio ganho/perda: ${(budgetGains/budgetLosses).toFixed(2)} (ideal: ~1.2-1.5)`);
