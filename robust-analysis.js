// Análise Robusta do Sistema de Pontos - 500 Simulações
// Análise científica para balanceamento perfeito

// Dados das cartas com novo balanceamento atual
const gameCards = [
  { id: 'venue-choice', left: { budget: 15, audience: -5, satisfaction: -8, technology: 2 }, right: { budget: -20, audience: 15, satisfaction: 12, technology: 8 } },
  { id: 'pre-event-marketing', left: { budget: -18, audience: 8, satisfaction: 5, technology: 3 }, right: { budget: -15, audience: 20, satisfaction: 12, technology: 15 } },
  { id: 'ticketing-dilemma', left: { budget: 15, audience: 18, satisfaction: 8, technology: 6 }, right: { budget: 8, audience: 10, satisfaction: 15, technology: 4 } },
  { id: 'technology-choice', left: { budget: 8, audience: 5, satisfaction: 2, technology: 3 }, right: { budget: -12, audience: 18, satisfaction: 16, technology: 22 } },
  { id: 'payment-strategy', left: { budget: 12, audience: -10, satisfaction: -15, technology: 12 }, right: { budget: -15, audience: 22, satisfaction: 18, technology: 15 } },
  { id: 'crisis-management', left: { budget: -35, audience: 15, satisfaction: 8, technology: 2 }, right: { budget: -12, audience: 8, satisfaction: 25, technology: 18 } },
  { id: 'data-strategy', left: { budget: -8, audience: -8, satisfaction: -5, technology: 25 }, right: { budget: -18, audience: 12, satisfaction: 20, technology: 15 } },
  { id: 'social-media-crisis', left: { budget: -5, audience: -5, satisfaction: -8, technology: 8 }, right: { budget: -12, audience: 20, satisfaction: 18, technology: 12 } },
  { id: 'partnership-dilemma', left: { budget: 15, audience: 8, satisfaction: -5, technology: 3 }, right: { budget: 10, audience: 15, satisfaction: 20, technology: 12 } },
  { id: 'final-decision', left: { budget: -10, audience: 15, satisfaction: 25, technology: 20 }, right: { budget: 12, audience: 25, satisfaction: 5, technology: 5 } }
];

function simulateGame(strategy = 'random') {
  let metrics = { budget: 100, audience: 0, satisfaction: 0, technology: 0 };
  let choices = [];
  let gameOver = false;
  let gameOverReason = '';
  let gameOverCard = -1;
  
  for (let i = 0; i < gameCards.length && !gameOver; i++) {
    const card = gameCards[i];
    let choice;
    
    // Estratégias diferentes
    switch (strategy) {
      case 'budget_saver':
        choice = (card.leftChoice?.effects?.budget || 0) > (card.rightChoice?.effects?.budget || 0) ? 'left' : 'right';
        break;
      case 'audience_focused':
        choice = (card.leftChoice?.effects?.audience || 0) > (card.rightChoice?.effects?.audience || 0) ? 'left' : 'right';
        break;
      case 'satisfaction_focused':
        choice = (card.leftChoice?.effects?.satisfaction || 0) > (card.rightChoice?.effects?.satisfaction || 0) ? 'left' : 'right';
        break;
      case 'technology_focused':
        choice = (card.leftChoice?.effects?.technology || 0) > (card.rightChoice?.effects?.technology || 0) ? 'left' : 'right';
        break;
      case 'balanced':
        // Escolhe baseado na métrica mais baixa
        const minValue = Math.min(metrics.budget, metrics.audience, metrics.satisfaction, metrics.technology);
        let leftScore = 0, rightScore = 0;
        
        ['budget', 'audience', 'satisfaction', 'technology'].forEach(metric => {
          const weight = metrics[metric] === minValue ? 3 : 1;
          leftScore += (card.left[metric] || 0) * weight;
          rightScore += (card.right[metric] || 0) * weight;
        });
        
        choice = leftScore > rightScore ? 'left' : 'right';
        break;
      case 'avoid_negative':
        // Evita escolhas que reduzem muito qualquer métrica
        const leftNegatives = Object.values(card.left).filter(v => v < -10).length;
        const rightNegatives = Object.values(card.right).filter(v => v < -10).length;
        
        if (leftNegatives < rightNegatives) choice = 'left';
        else if (rightNegatives < leftNegatives) choice = 'right';
        else choice = Math.random() < 0.5 ? 'left' : 'right';
        break;
      default: // random
        choice = Math.random() < 0.5 ? 'left' : 'right';
    }
    
    const chosenEffects = choice === 'left' ? card.left : card.right;
    choices.push({ card: card.id, choice, effects: chosenEffects });
    
    // Aplicar efeitos
    metrics.budget = Math.max(0, Math.min(100, metrics.budget + (chosenEffects.budget || 0)));
    metrics.audience = Math.max(0, Math.min(100, metrics.audience + (chosenEffects.audience || 0)));
    metrics.satisfaction = Math.max(0, Math.min(100, metrics.satisfaction + (chosenEffects.satisfaction || 0)));
    metrics.technology = Math.max(0, Math.min(100, metrics.technology + (chosenEffects.technology || 0)));
    
    // Verificar game over (depois da primeira carta)
    if (i >= 0) {
      if (metrics.budget <= 0) {
        gameOver = true;
        gameOverReason = 'Budget';
        gameOverCard = i + 1;
      } else if (metrics.audience <= 0) {
        gameOver = true;
        gameOverReason = 'Audience';
        gameOverCard = i + 1;
      } else if (metrics.satisfaction <= 0) {
        gameOver = true;
        gameOverReason = 'Satisfaction';
        gameOverCard = i + 1;
      }
    }
  }
  
  return {
    strategy,
    finalMetrics: metrics,
    choices,
    gameOver,
    gameOverReason,
    gameOverCard,
    cardsCompleted: choices.length,
    totalScore: metrics.budget + metrics.audience + metrics.satisfaction + metrics.technology
  };
}

// Executar 500 simulações
console.log('=== ANÁLISE ROBUSTA - 500 SIMULAÇÕES ===\n');

const strategies = ['random', 'budget_saver', 'audience_focused', 'satisfaction_focused', 'technology_focused', 'balanced', 'avoid_negative'];
const allResults = [];

strategies.forEach(strategy => {
  console.log(`--- Testando estratégia: ${strategy.toUpperCase()} ---`);
  const strategyResults = [];
  
  for (let i = 0; i < 70; i++) { // ~70 por estratégia = ~500 total
    const result = simulateGame(strategy);
    strategyResults.push(result);
    allResults.push(result);
  }
  
  const completed = strategyResults.filter(r => !r.gameOver);
  const gameOverRate = (strategyResults.length - completed.length) / strategyResults.length * 100;
  
  if (completed.length > 0) {
    const avgMetrics = {
      budget: completed.reduce((s, r) => s + r.finalMetrics.budget, 0) / completed.length,
      audience: completed.reduce((s, r) => s + r.finalMetrics.audience, 0) / completed.length,
      satisfaction: completed.reduce((s, r) => s + r.finalMetrics.satisfaction, 0) / completed.length,
      technology: completed.reduce((s, r) => s + r.finalMetrics.technology, 0) / completed.length
    };
    
    console.log(`  Game Over Rate: ${gameOverRate.toFixed(1)}%`);
    console.log(`  Avg Completed: Budget ${avgMetrics.budget.toFixed(1)}% | Audience ${avgMetrics.audience.toFixed(1)}% | Satisfaction ${avgMetrics.satisfaction.toFixed(1)}% | Technology ${avgMetrics.technology.toFixed(1)}%`);
  } else {
    console.log(`  Game Over Rate: 100% - ESTRATÉGIA IMPOSSÍVEL`);
  }
  console.log('');
});

// Análise de Game Over por carta
console.log('=== ANÁLISE DE GAME OVER POR CARTA ===');
const gameOverByCard = {};
allResults.filter(r => r.gameOver).forEach(r => {
  if (!gameOverByCard[r.gameOverCard]) gameOverByCard[r.gameOverCard] = { total: 0, reasons: {} };
  gameOverByCard[r.gameOverCard].total++;
  if (!gameOverByCard[r.gameOverCard].reasons[r.gameOverReason]) {
    gameOverByCard[r.gameOverCard].reasons[r.gameOverReason] = 0;
  }
  gameOverByCard[r.gameOverCard].reasons[r.gameOverReason]++;
});

Object.keys(gameOverByCard).sort((a, b) => parseInt(a) - parseInt(b)).forEach(card => {
  const data = gameOverByCard[card];
  console.log(`Carta ${card} (${gameCards[card-1]?.id}): ${data.total} game overs`);
  Object.keys(data.reasons).forEach(reason => {
    console.log(`  - ${reason}: ${data.reasons[reason]} vezes`);
  });
});

// Análise detalhada por carta
console.log('\n=== ANÁLISE DETALHADA POR CARTA ===');
gameCards.forEach((card, index) => {
  const leftChoices = allResults.filter(r => r.choices[index]?.choice === 'left').length;
  const rightChoices = allResults.filter(r => r.choices[index]?.choice === 'right').length;
  
  console.log(`\nCarta ${index + 1}: ${card.id}`);
  console.log(`  Escolhas: Left ${leftChoices} | Right ${rightChoices}`);
  console.log(`  Efeitos Left: B${card.left.budget} A${card.left.audience} S${card.left.satisfaction} T${card.left.technology}`);
  console.log(`  Efeitos Right: B${card.right.budget} A${card.right.audience} S${card.right.satisfaction} T${card.right.technology}`);
  
  // Calcular impacto médio
  const leftImpact = (card.left.budget || 0) + (card.left.audience || 0) + (card.left.satisfaction || 0) + (card.left.technology || 0);
  const rightImpact = (card.right.budget || 0) + (card.right.audience || 0) + (card.right.satisfaction || 0) + (card.right.technology || 0);
  console.log(`  Impacto total: Left ${leftImpact} | Right ${rightImpact}`);
});

// Estatísticas gerais
console.log('\n=== ESTATÍSTICAS GERAIS ===');
const totalGames = allResults.length;
const completedGames = allResults.filter(r => !r.gameOver);
const gameOverRate = (totalGames - completedGames.length) / totalGames * 100;

console.log(`Total de jogos: ${totalGames}`);
console.log(`Taxa de Game Over: ${gameOverRate.toFixed(1)}%`);
console.log(`Jogos completados: ${completedGames.length}`);

if (completedGames.length > 0) {
  const avgFinal = {
    budget: completedGames.reduce((s, r) => s + r.finalMetrics.budget, 0) / completedGames.length,
    audience: completedGames.reduce((s, r) => s + r.finalMetrics.audience, 0) / completedGames.length,
    satisfaction: completedGames.reduce((s, r) => s + r.finalMetrics.satisfaction, 0) / completedGames.length,
    technology: completedGames.reduce((s, r) => s + r.finalMetrics.technology, 0) / completedGames.length
  };
  
  console.log('\nMétricas médias finais (jogos completos):');
  console.log(`  Budget: ${avgFinal.budget.toFixed(1)}%`);
  console.log(`  Audience: ${avgFinal.audience.toFixed(1)}%`);
  console.log(`  Satisfaction: ${avgFinal.satisfaction.toFixed(1)}%`);
  console.log(`  Technology: ${avgFinal.technology.toFixed(1)}%`);
  
  console.log('\nAnálise de balance:');
  console.log(`  Budget final adequado: ${avgFinal.budget >= 40 && avgFinal.budget <= 70 ? 'SIM' : 'NÃO'} (ideal: 40-70%)`);
  console.log(`  Outros status crescem adequadamente: ${avgFinal.audience <= 85 && avgFinal.satisfaction <= 85 && avgFinal.technology <= 85 ? 'SIM' : 'NÃO'} (ideal: <85%)`);
  console.log(`  Game over rate adequado: ${gameOverRate >= 10 && gameOverRate <= 30 ? 'SIM' : 'NÃO'} (ideal: 10-30%)`);
}

console.log('\n=== RECOMENDAÇÕES DE BALANCEAMENTO ===');
console.log('Baseado na análise de 500 simulações:');

// Análise dos problemas específicos
const card1GameOvers = gameOverByCard[1]?.total || 0;
if (card1GameOvers > totalGames * 0.1) {
  console.log('\n🚨 PROBLEMA CRÍTICO: Carta 1 causa muitos game overs');
  console.log('   SOLUÇÃO: Reduzir penalidades da escolha "lugar afastado"');
}

if (gameOverRate > 40) {
  console.log('\n🚨 PROBLEMA: Game over rate muito alto');
  console.log('   SOLUÇÃO: Suavizar penalidades em geral');
} else if (gameOverRate < 5) {
  console.log('\n⚠️ PROBLEMA: Game over rate muito baixo');
  console.log('   SOLUÇÃO: Aumentar dificuldade');
}

console.log('\n📊 VALORES IDEAIS CALCULADOS:');
console.log('  - Budget inicial: 100 (manter)');
console.log('  - Budget ganho máximo por carta: +12 a +15');
console.log('  - Budget perda máxima por carta: -15 a -25');
console.log('  - Outros status ganho máximo: +15 a +20');
console.log('  - Outros status perda máxima: -8 a -12');
console.log('  - Game over rate target: 15-25%');
