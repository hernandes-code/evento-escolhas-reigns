// Análise Científica - 500 Simulações
const cards = [
  { id: 'venue', left: { budget: 15, audience: -5, satisfaction: -8, technology: 2 }, right: { budget: -20, audience: 15, satisfaction: 12, technology: 8 } },
  { id: 'marketing', left: { budget: -18, audience: 8, satisfaction: 5, technology: 3 }, right: { budget: -15, audience: 20, satisfaction: 12, technology: 15 } },
  { id: 'pricing', left: { budget: 15, audience: 18, satisfaction: 8, technology: 6 }, right: { budget: 8, audience: 10, satisfaction: 15, technology: 4 } },
  { id: 'platform', left: { budget: 8, audience: 5, satisfaction: 2, technology: 3 }, right: { budget: -12, audience: 18, satisfaction: 16, technology: 22 } },
  { id: 'payment', left: { budget: 12, audience: -10, satisfaction: -15, technology: 12 }, right: { budget: -15, audience: 22, satisfaction: 18, technology: 15 } },
  { id: 'crisis', left: { budget: -35, audience: 15, satisfaction: 8, technology: 2 }, right: { budget: -12, audience: 8, satisfaction: 25, technology: 18 } },
  { id: 'data', left: { budget: -8, audience: -8, satisfaction: -5, technology: 25 }, right: { budget: -18, audience: 12, satisfaction: 20, technology: 15 } },
  { id: 'social', left: { budget: -5, audience: -5, satisfaction: -8, technology: 8 }, right: { budget: -12, audience: 20, satisfaction: 18, technology: 12 } },
  { id: 'partnership', left: { budget: 15, audience: 8, satisfaction: -5, technology: 3 }, right: { budget: 10, audience: 15, satisfaction: 20, technology: 12 } },
  { id: 'final', left: { budget: -10, audience: 15, satisfaction: 25, technology: 20 }, right: { budget: 12, audience: 25, satisfaction: 5, technology: 5 } }
];

function simulate() {
  let m = { budget: 100, audience: 0, satisfaction: 0, technology: 0 };
  let over = false;
  let overCard = -1;
  let overReason = '';
  
  for (let i = 0; i < cards.length && !over; i++) {
    const card = cards[i];
    const choice = Math.random() < 0.5 ? 'left' : 'right';
    const effects = choice === 'left' ? card.left : card.right;
    
    m.budget = Math.max(0, Math.min(100, m.budget + (effects.budget || 0)));
    m.audience = Math.max(0, Math.min(100, m.audience + (effects.audience || 0)));
    m.satisfaction = Math.max(0, Math.min(100, m.satisfaction + (effects.satisfaction || 0)));
    m.technology = Math.max(0, Math.min(100, m.technology + (effects.technology || 0)));
    
    if (m.budget <= 0) { over = true; overCard = i + 1; overReason = 'Budget'; }
    else if (m.audience <= 0) { over = true; overCard = i + 1; overReason = 'Audience'; }
    else if (m.satisfaction <= 0) { over = true; overCard = i + 1; overReason = 'Satisfaction'; }
  }
  
  return { metrics: m, gameOver: over, gameOverCard: overCard, gameOverReason: overReason };
}

console.log('=== ANÁLISE DE 500 SIMULAÇÕES ===\n');

let results = [];
for (let i = 0; i < 500; i++) {
  results.push(simulate());
}

const gameOvers = results.filter(r => r.gameOver);
const completed = results.filter(r => !r.gameOver);

console.log(`Total: 500 simulações`);
console.log(`Game Over: ${gameOvers.length} (${(gameOvers.length/500*100).toFixed(1)}%)`);
console.log(`Completos: ${completed.length} (${(completed.length/500*100).toFixed(1)}%)`);

console.log('\n=== GAME OVER POR CARTA ===');
const byCard = {};
gameOvers.forEach(r => {
  if (!byCard[r.gameOverCard]) byCard[r.gameOverCard] = { count: 0, reasons: {} };
  byCard[r.gameOverCard].count++;
  if (!byCard[r.gameOverCard].reasons[r.gameOverReason]) byCard[r.gameOverCard].reasons[r.gameOverReason] = 0;
  byCard[r.gameOverCard].reasons[r.gameOverReason]++;
});

Object.keys(byCard).sort((a,b) => parseInt(a) - parseInt(b)).forEach(card => {
  const data = byCard[card];
  console.log(`Carta ${card}: ${data.count} game overs`);
  Object.keys(data.reasons).forEach(reason => {
    console.log(`  ${reason}: ${data.reasons[reason]}`);
  });
});

if (completed.length > 0) {
  const avg = {
    budget: completed.reduce((s, r) => s + r.metrics.budget, 0) / completed.length,
    audience: completed.reduce((s, r) => s + r.metrics.audience, 0) / completed.length,
    satisfaction: completed.reduce((s, r) => s + r.metrics.satisfaction, 0) / completed.length,
    technology: completed.reduce((s, r) => s + r.metrics.technology, 0) / completed.length
  };
  
  console.log('\n=== MÉTRICAS FINAIS (JOGOS COMPLETOS) ===');
  console.log(`Budget: ${avg.budget.toFixed(1)}%`);
  console.log(`Audience: ${avg.audience.toFixed(1)}%`);
  console.log(`Satisfaction: ${avg.satisfaction.toFixed(1)}%`);
  console.log(`Technology: ${avg.technology.toFixed(1)}%`);
}

console.log('\n=== ANÁLISE DOS PROBLEMAS ===');
const card1Problems = byCard[1]?.count || 0;
const card1Rate = card1Problems / 500 * 100;

console.log(`Carta 1 game over rate: ${card1Rate.toFixed(1)}%`);
if (card1Rate > 10) {
  console.log('🚨 PROBLEMA: Primeira carta muito difícil!');
}

const overallRate = gameOvers.length / 500 * 100;
console.log(`Taxa geral de game over: ${overallRate.toFixed(1)}%`);

if (overallRate > 40) {
  console.log('🚨 PROBLEMA: Jogo muito difícil');
} else if (overallRate < 10) {
  console.log('⚠️ PROBLEMA: Jogo muito fácil');
} else {
  console.log('✅ Taxa de dificuldade adequada');
}

console.log('\n=== RECOMENDAÇÕES ===');
console.log('1. Primeira carta deve ter penalidades menores');
console.log('2. Valores negativos não devem passar de -10 nas primeiras 3 cartas');
console.log('3. Orçamento inicial pode ser 110 para dar margem');
console.log('4. Métricas que começam em 0 precisam de proteção inicial');
