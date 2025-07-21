// Análise do Sistema de Pontos - Evento Escolhas Reigns
// Simulação de 20 jogos para identificar problemas de balanceamento

// Dados das cartas extraídos do arquivo gameCards.ts
const gameCards = [
  {
    id: 'venue-choice',
    leftChoice: { effects: { budget: 20, audience: 5, satisfaction: 3, technology: 2 } },
    rightChoice: { effects: { budget: -15, audience: 20, satisfaction: 15, technology: 10 } }
  },
  {
    id: 'pre-event-marketing',
    leftChoice: { effects: { budget: -15, audience: 12, satisfaction: 8, technology: 5 } },
    rightChoice: { effects: { budget: -12, audience: 25, satisfaction: 15, technology: 20 } }
  },
  {
    id: 'ticketing-dilemma',
    leftChoice: { effects: { budget: 25, audience: 30, satisfaction: 15, technology: 12 } },
    rightChoice: { effects: { budget: 15, audience: 15, satisfaction: 20, technology: 8 } }
  },
  {
    id: 'technology-choice',
    leftChoice: { effects: { budget: 10, audience: 8, satisfaction: 5, technology: 5 } },
    rightChoice: { effects: { budget: -5, audience: 35, satisfaction: 30, technology: 45 } }
  },
  {
    id: 'payment-strategy',
    leftChoice: { effects: { budget: 20, audience: 5, satisfaction: 3, technology: 18 } },
    rightChoice: { effects: { budget: -8, audience: 40, satisfaction: 35, technology: 30 } }
  },
  {
    id: 'crisis-management',
    leftChoice: { effects: { budget: -30, audience: 25, satisfaction: 15, technology: 5 } },
    rightChoice: { effects: { budget: -8, audience: 15, satisfaction: 35, technology: 25 } }
  },
  {
    id: 'data-strategy',
    leftChoice: { effects: { budget: -5, audience: 8, satisfaction: 5, technology: 35 } },
    rightChoice: { effects: { budget: -12, audience: 20, satisfaction: 30, technology: 25 } }
  },
  {
    id: 'social-media-crisis',
    leftChoice: { effects: { budget: -3, audience: 5, satisfaction: 2, technology: 12 } },
    rightChoice: { effects: { budget: -8, audience: 30, satisfaction: 25, technology: 20 } }
  },
  {
    id: 'partnership-dilemma',
    leftChoice: { effects: { budget: 35, audience: 12, satisfaction: 8, technology: 5 } },
    rightChoice: { effects: { budget: 22, audience: 18, satisfaction: 25, technology: 15 } }
  },
  {
    id: 'final-decision',
    leftChoice: { effects: { budget: -5, audience: 25, satisfaction: 40, technology: 35 } },
    rightChoice: { effects: { budget: 18, audience: 35, satisfaction: 12, technology: 8 } }
  }
];

const INITIAL_METRICS = {
  budget: 100,
  audience: 0,
  satisfaction: 0,
  technology: 0
};

// Função para simular um jogo completo
function simulateGame(strategy = 'random') {
  let metrics = { ...INITIAL_METRICS };
  let choices = [];
  let gameOver = false;
  let gameOverReason = '';
  
  for (let i = 0; i < gameCards.length && !gameOver; i++) {
    const card = gameCards[i];
    let choice;
    
    // Estratégias diferentes de escolha
    switch (strategy) {
      case 'budget_focused':
        choice = (card.leftChoice.effects.budget || 0) > (card.rightChoice.effects.budget || 0) ? 'left' : 'right';
        break;
      case 'audience_focused':
        choice = (card.leftChoice.effects.audience || 0) > (card.rightChoice.effects.audience || 0) ? 'left' : 'right';
        break;
      case 'satisfaction_focused':
        choice = (card.leftChoice.effects.satisfaction || 0) > (card.rightChoice.effects.satisfaction || 0) ? 'left' : 'right';
        break;
      case 'technology_focused':
        choice = (card.leftChoice.effects.technology || 0) > (card.rightChoice.effects.technology || 0) ? 'left' : 'right';
        break;
      case 'balanced':
        // Escolha baseada na métrica mais baixa
        const minMetric = Math.min(metrics.budget, metrics.audience, metrics.satisfaction, metrics.technology);
        const needsBudget = metrics.budget === minMetric;
        const needsAudience = metrics.audience === minMetric;
        const needsSatisfaction = metrics.satisfaction === minMetric;
        const needsTechnology = metrics.technology === minMetric;
        
        const leftTotal = (card.leftChoice.effects.budget || 0) * (needsBudget ? 2 : 1) +
                         (card.leftChoice.effects.audience || 0) * (needsAudience ? 2 : 1) +
                         (card.leftChoice.effects.satisfaction || 0) * (needsSatisfaction ? 2 : 1) +
                         (card.leftChoice.effects.technology || 0) * (needsTechnology ? 2 : 1);
        
        const rightTotal = (card.rightChoice.effects.budget || 0) * (needsBudget ? 2 : 1) +
                          (card.rightChoice.effects.audience || 0) * (needsAudience ? 2 : 1) +
                          (card.rightChoice.effects.satisfaction || 0) * (needsSatisfaction ? 2 : 1) +
                          (card.rightChoice.effects.technology || 0) * (needsTechnology ? 2 : 1);
        
        choice = leftTotal > rightTotal ? 'left' : 'right';
        break;
      default: // random
        choice = Math.random() < 0.5 ? 'left' : 'right';
    }
    
    const chosenEffects = choice === 'left' ? card.leftChoice.effects : card.rightChoice.effects;
    choices.push({ card: card.id, choice, effects: chosenEffects });
    
    // Aplicar efeitos com limites
    metrics.budget = Math.max(0, Math.min(100, metrics.budget + (chosenEffects.budget || 0)));
    metrics.audience = Math.max(0, Math.min(100, metrics.audience + (chosenEffects.audience || 0)));
    metrics.satisfaction = Math.max(0, Math.min(100, metrics.satisfaction + (chosenEffects.satisfaction || 0)));
    metrics.technology = Math.max(0, Math.min(100, metrics.technology + (chosenEffects.technology || 0)));
    
    // Verificar game over (depois de pelo menos 2 cartas)
    if (i >= 1) {
      if (metrics.budget <= 0) {
        gameOver = true;
        gameOverReason = 'Budget ended';
      } else if (metrics.audience < 0) {
        gameOver = true;
        gameOverReason = 'No audience';
      } else if (metrics.satisfaction < 0) {
        gameOver = true;
        gameOverReason = 'Satisfaction too low';
      }
    }
  }
  
  return {
    strategy,
    finalMetrics: metrics,
    choices,
    gameOver,
    gameOverReason,
    cardsCompleted: choices.length,
    totalScore: metrics.budget + metrics.audience + metrics.satisfaction + metrics.technology
  };
}

// Executar 20 simulações com diferentes estratégias
console.log('=== ANÁLISE DO SISTEMA DE PONTOS - 20 SIMULAÇÕES ===\n');

const strategies = ['random', 'budget_focused', 'audience_focused', 'satisfaction_focused', 'technology_focused', 'balanced'];
const results = [];

strategies.forEach(strategy => {
  console.log(`--- Estratégia: ${strategy.toUpperCase()} ---`);
  
  for (let i = 0; i < 3; i++) {
    const result = simulateGame(strategy);
    results.push(result);
    
    console.log(`Simulação ${i + 1}:`);
    console.log(`  Cartas completadas: ${result.cardsCompleted}/10`);
    console.log(`  Game Over: ${result.gameOver ? 'SIM' : 'NÃO'} ${result.gameOverReason ? `(${result.gameOverReason})` : ''}`);
    console.log(`  Métricas finais: Budget ${result.finalMetrics.budget}%, Audience ${result.finalMetrics.audience}%, Satisfaction ${result.finalMetrics.satisfaction}%, Technology ${result.finalMetrics.technology}%`);
    console.log(`  Score total: ${result.totalScore}`);
    console.log('');
  }
});

// Análise final mais 2 simulações aleatórias extras
console.log('--- SIMULAÇÕES ALEATÓRIAS EXTRAS ---');
for (let i = 0; i < 2; i++) {
  const result = simulateGame('random');
  results.push(result);
  
  console.log(`Simulação Random ${i + 1}:`);
  console.log(`  Cartas completadas: ${result.cardsCompleted}/10`);
  console.log(`  Game Over: ${result.gameOver ? 'SIM' : 'NÃO'} ${result.gameOverReason ? `(${result.gameOverReason})` : ''}`);
  console.log(`  Métricas finais: Budget ${result.finalMetrics.budget}%, Audience ${result.finalMetrics.audience}%, Satisfaction ${result.finalMetrics.satisfaction}%, Technology ${result.finalMetrics.technology}%`);
  console.log(`  Score total: ${result.totalScore}`);
  console.log('');
}

// Análise estatística
console.log('=== ANÁLISE ESTATÍSTICA ===');

const completedGames = results.filter(r => !r.gameOver);
const gameOverCount = results.filter(r => r.gameOver).length;

console.log(`\nTotal de simulações: ${results.length}`);
console.log(`Jogos completos: ${completedGames.length} (${(completedGames.length/results.length*100).toFixed(1)}%)`);
console.log(`Game Over: ${gameOverCount} (${(gameOverCount/results.length*100).toFixed(1)}%)`);

if (completedGames.length > 0) {
  const avgMetrics = {
    budget: completedGames.reduce((sum, r) => sum + r.finalMetrics.budget, 0) / completedGames.length,
    audience: completedGames.reduce((sum, r) => sum + r.finalMetrics.audience, 0) / completedGames.length,
    satisfaction: completedGames.reduce((sum, r) => sum + r.finalMetrics.satisfaction, 0) / completedGames.length,
    technology: completedGames.reduce((sum, r) => sum + r.finalMetrics.technology, 0) / completedGames.length
  };
  
  console.log('\nMétricas médias em jogos completos:');
  console.log(`  Budget: ${avgMetrics.budget.toFixed(1)}%`);
  console.log(`  Audience: ${avgMetrics.audience.toFixed(1)}%`);
  console.log(`  Satisfaction: ${avgMetrics.satisfaction.toFixed(1)}%`);
  console.log(`  Technology: ${avgMetrics.technology.toFixed(1)}%`);
  
  console.log('\nMétricas mín/máx em jogos completos:');
  console.log(`  Budget: ${Math.min(...completedGames.map(r => r.finalMetrics.budget))} - ${Math.max(...completedGames.map(r => r.finalMetrics.budget))}`);
  console.log(`  Audience: ${Math.min(...completedGames.map(r => r.finalMetrics.audience))} - ${Math.max(...completedGames.map(r => r.finalMetrics.audience))}`);
  console.log(`  Satisfaction: ${Math.min(...completedGames.map(r => r.finalMetrics.satisfaction))} - ${Math.max(...completedGames.map(r => r.finalMetrics.satisfaction))}`);
  console.log(`  Technology: ${Math.min(...completedGames.map(r => r.finalMetrics.technology))} - ${Math.max(...completedGames.map(r => r.finalMetrics.technology))}`);
}

console.log('\n=== PROBLEMAS IDENTIFICADOS ===');

console.log('\n1. ORÇAMENTO:');
const budgetStats = results.map(r => r.finalMetrics.budget);
const avgBudget = budgetStats.reduce((a, b) => a + b, 0) / budgetStats.length;
console.log(`   - Média final: ${avgBudget.toFixed(1)}%`);
console.log(`   - Minimum: ${Math.min(...budgetStats)}%`);
console.log(`   - Maximum: ${Math.max(...budgetStats)}%`);
console.log(`   - Análise: ${avgBudget > 70 ? 'PROBLEMA - Orçamento raramente fica baixo' : 'OK - Orçamento tem variação adequada'}`);

console.log('\n2. OUTROS STATUS:');
const audienceStats = results.map(r => r.finalMetrics.audience);
const satisfactionStats = results.map(r => r.finalMetrics.satisfaction);
const technologyStats = results.map(r => r.finalMetrics.technology);

console.log(`   Audience - Média: ${(audienceStats.reduce((a, b) => a + b, 0) / audienceStats.length).toFixed(1)}%, Max: ${Math.max(...audienceStats)}%`);
console.log(`   Satisfaction - Média: ${(satisfactionStats.reduce((a, b) => a + b, 0) / satisfactionStats.length).toFixed(1)}%, Max: ${Math.max(...satisfactionStats)}%`);
console.log(`   Technology - Média: ${(technologyStats.reduce((a, b) => a + b, 0) / technologyStats.length).toFixed(1)}%, Max: ${Math.max(...technologyStats)}%`);

console.log('\n3. BALANCE DE ESCOLHAS:');
// Analisar quantas vezes cada tipo de efeito aparece
let budgetPositive = 0, budgetNegative = 0;
let audiencePositive = 0, audienceNegative = 0;
let satisfactionPositive = 0, satisfactionNegative = 0;
let technologyPositive = 0, technologyNegative = 0;

gameCards.forEach(card => {
  [card.leftChoice, card.rightChoice].forEach(choice => {
    if (choice.effects.budget > 0) budgetPositive++;
    if (choice.effects.budget < 0) budgetNegative++;
    if (choice.effects.audience > 0) audiencePositive++;
    if (choice.effects.audience < 0) audienceNegative++;
    if (choice.effects.satisfaction > 0) satisfactionPositive++;
    if (choice.effects.satisfaction < 0) satisfactionNegative++;
    if (choice.effects.technology > 0) technologyPositive++;
    if (choice.effects.technology < 0) technologyNegative++;
  });
});

console.log(`   Budget: ${budgetPositive} positivos, ${budgetNegative} negativos`);
console.log(`   Audience: ${audiencePositive} positivos, ${audienceNegative} negativos`);
console.log(`   Satisfaction: ${satisfactionPositive} positivos, ${satisfactionNegative} negativos`);
console.log(`   Technology: ${technologyPositive} positivos, ${technologyNegative} negativos`);

console.log('\n=== RECOMENDAÇÕES ===');
console.log('1. REDUZIR ganhos de orçamento (máximo +15 por carta)');
console.log('2. AUMENTAR custos de algumas escolhas estratégicas');
console.log('3. ADICIONAR mais escolhas que reduzem orçamento significativamente');
console.log('4. BALANCEAR crescimento dos outros status para serem mais graduais');
console.log('5. INCLUIR trade-offs mais difíceis entre status diferentes');
