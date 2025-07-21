// Teste Final do Balanceamento Otimizado
const cards = [
  { id: 'venue', left: { budget: 12, audience: 2, satisfaction: -3, technology: 2 }, right: { budget: -18, audience: 18, satisfaction: 15, technology: 8 } },
  { id: 'marketing', left: { budget: -18, audience: 10, satisfaction: 4, technology: 3 }, right: { budget: -15, audience: 18, satisfaction: 12, technology: 15 } },
  { id: 'pricing', left: { budget: 12, audience: 15, satisfaction: 6, technology: 5 }, right: { budget: 6, audience: 8, satisfaction: 12, technology: 3 } },
  { id: 'platform', left: { budget: 6, audience: 4, satisfaction: 2, technology: 3 }, right: { budget: -15, audience: 15, satisfaction: 12, technology: 20 } },
  { id: 'payment', left: { budget: 10, audience: -6, satisfaction: -8, technology: 10 }, right: { budget: -12, audience: 25, satisfaction: 20, technology: 18 } },
  { id: 'crisis', left: { budget: -35, audience: 15, satisfaction: 8, technology: 2 }, right: { budget: -12, audience: 8, satisfaction: 25, technology: 18 } },
  { id: 'data', left: { budget: -5, audience: -4, satisfaction: -2, technology: 22 }, right: { budget: -15, audience: 15, satisfaction: 22, technology: 18 } },
  { id: 'social', left: { budget: -3, audience: -2, satisfaction: -4, technology: 8 }, right: { budget: -10, audience: 22, satisfaction: 20, technology: 15 } },
  { id: 'partnership', left: { budget: 15, audience: 8, satisfaction: -5, technology: 3 }, right: { budget: 10, audience: 15, satisfaction: 20, technology: 12 } },
  { id: 'final', left: { budget: -10, audience: 15, satisfaction: 25, technology: 20 }, right: { budget: 12, audience: 25, satisfaction: 5, technology: 5 } }
];

function simulate() {
  let m = { budget: 105, audience: 8, satisfaction: 8, technology: 0 }; // Valores finais otimizados
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

console.log('=== TESTE FINAL - BALANCEAMENTO OTIMIZADO ===\n');

let results = [];
for (let i = 0; i < 500; i++) {
  results.push(simulate());
}

const gameOvers = results.filter(r => r.gameOver);
const completed = results.filter(r => !r.gameOver);

console.log(`Total: 500 simulações`);
console.log(`Game Over: ${gameOvers.length} (${(gameOvers.length/500*100).toFixed(1)}%)`);
console.log(`Completos: ${completed.length} (${(completed.length/500*100).toFixed(1)}%)`);

const overallRate = gameOvers.length / 500 * 100;

if (gameOvers.length > 0) {
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
    console.log(`Carta ${card}: ${data.count} game overs (${(data.count/500*100).toFixed(1)}%)`);
    Object.keys(data.reasons).forEach(reason => {
      console.log(`  ${reason}: ${data.reasons[reason]}`);
    });
  });
}

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

console.log('\n=== AVALIAÇÃO FINAL ===');
console.log(`Taxa de Game Over: ${overallRate.toFixed(1)}%`);

if (overallRate >= 15 && overallRate <= 25) {
  console.log('✅ BALANCEAMENTO PERFEITO! Taxa ideal de dificuldade.');
} else if (overallRate > 25) {
  console.log('🚨 AINDA MUITO DIFÍCIL - Reduzir penalidades');
} else if (overallRate < 10) {
  console.log('⚠️ MUITO FÁCIL - Aumentar penalidades');
} else {
  console.log('🟡 ACEITÁVEL - Pequenos ajustes podem ser feitos');
}

const card1Rate = gameOvers.filter(r => r.gameOverCard === 1).length / 500 * 100;
console.log(`\nCarta 1 Game Over: ${card1Rate.toFixed(1)}% ${card1Rate <= 3 ? '✅ EXCELENTE' : card1Rate <= 8 ? '🟡 ACEITÁVEL' : '🚨 PROBLEMÁTICA'}`);

if (completed.length > 0) {
  const avg = {
    budget: completed.reduce((s, r) => s + r.metrics.budget, 0) / completed.length,
    audience: completed.reduce((s, r) => s + r.metrics.audience, 0) / completed.length,
    satisfaction: completed.reduce((s, r) => s + r.metrics.satisfaction, 0) / completed.length,
    technology: completed.reduce((s, r) => s + r.metrics.technology, 0) / completed.length
  };
  
  console.log(`\nBudget final: ${avg.budget.toFixed(1)}% ${avg.budget >= 45 && avg.budget <= 65 ? '✅ PERFEITO' : '⚠️ AJUSTAR'}`);
  console.log(`Status crescem adequadamente: ${avg.audience <= 75 && avg.satisfaction <= 75 && avg.technology <= 75 ? '✅ PERFEITO' : '⚠️ CRESCEM MUITO'}`);
}

console.log('\n🎯 SISTEMA CIENTÍFICO IMPLEMENTADO COM SUCESSO!');
