// Análise de Badges - Sistema Equilibrado

// Simular estrutura das cartas e badges
const gameCards = [
  { leftChoice: { category: 'budget' }, rightChoice: { category: 'strategic' } },
  { leftChoice: { category: 'improvised' }, rightChoice: { category: 'organized' } },
  { leftChoice: { category: 'strategic' }, rightChoice: { category: 'simple' } },
  { leftChoice: { category: 'basic' }, rightChoice: { category: 'platform_user' } },
  { leftChoice: { category: 'improvised' }, rightChoice: { category: 'inclusive' } },
  { leftChoice: { category: 'panic' }, rightChoice: { category: 'creative' } },
  { leftChoice: { category: 'data_focused' }, rightChoice: { category: 'relationship_focused' } },
  { leftChoice: { category: 'reactive' }, rightChoice: { category: 'proactive' } },
  { leftChoice: { category: 'money_focused' }, rightChoice: { category: 'balanced' } },
  { leftChoice: { category: 'data_driven' }, rightChoice: { category: 'momentum_focused' } }
];

// Sistema atual de badges
const calculateBadgesOld = (choiceCategories, metrics) => {
  const badges = [];
  
  if (choiceCategories.platform_user >= 1 || choiceCategories.organized >= 3) {
    badges.push('PLATFORM_ADOPTER');
  }
  
  if (choiceCategories.strategic >= 2 || choiceCategories.data_driven >= 2) {
    badges.push('STRATEGIC_MIND');
  }
  
  if (choiceCategories.relationship_focused >= 2 || choiceCategories.proactive >= 2) {
    badges.push('RELATIONSHIP_BUILDER');
  }
  
  if (choiceCategories.creative >= 1 || (metrics.satisfaction >= 70 && choiceCategories.inclusive >= 1)) {
    badges.push('PROBLEM_SOLVER');
  }
  
  if (choiceCategories.data_driven >= 1 || metrics.technology >= 70) {
    badges.push('DATA_MASTER');
  }
  
  if (metrics.technology >= 70 || choiceCategories.platform_user >= 1) {
    badges.push('TECH_ENTHUSIAST');
  }
  
  if (metrics.budget >= 60) {
    badges.push('BUDGET_CONSCIOUS');
  }
  
  if (metrics.satisfaction >= 65 || choiceCategories.relationship_focused >= 2) {
    badges.push('PEOPLE_PERSON');
  }
  
  return badges;
};

// Simular 1000 jogos com estratégias diferentes
console.log('=== ANÁLISE DE BADGES - SISTEMA ATUAL ===\n');

const strategies = [
  { name: 'Sempre Left', choices: Array(10).fill('left') },
  { name: 'Sempre Right', choices: Array(10).fill('right') },
  { name: 'Alternado', choices: Array(10).fill(0).map((_, i) => i % 2 === 0 ? 'left' : 'right') },
  { name: 'Random 1', choices: ['left', 'right', 'left', 'left', 'right', 'left', 'right', 'right', 'left', 'right'] },
  { name: 'Random 2', choices: ['right', 'left', 'right', 'left', 'left', 'right', 'left', 'left', 'right', 'left'] },
  { name: 'Foco Tech', choices: ['right', 'right', 'left', 'right', 'left', 'right', 'left', 'right', 'left', 'left'] },
  { name: 'Foco People', choices: ['left', 'left', 'right', 'left', 'right', 'left', 'right', 'left', 'right', 'right'] }
];

const badgeStats = {};
const badgesByStrategy = {};

strategies.forEach(strategy => {
  const choiceCategories = {
    strategic: 0, organized: 0, platform_user: 0, data_driven: 0,
    creative: 0, relationship_focused: 0, inclusive: 0, proactive: 0,
    budget: 0, improvised: 0, simple: 0, basic: 0, panic: 0,
    data_focused: 0, reactive: 0, money_focused: 0, balanced: 0, momentum_focused: 0
  };

  // Simular métricas finais baseadas nas escolhas
  let metrics = { budget: 55, audience: 75, satisfaction: 65, technology: 45 };
  
  strategy.choices.forEach((choice, cardIndex) => {
    const card = gameCards[cardIndex];
    const chosenCategory = choice === 'left' ? card.leftChoice.category : card.rightChoice.category;
    choiceCategories[chosenCategory] = (choiceCategories[chosenCategory] || 0) + 1;
    
    // Simular efeito nas métricas baseado na categoria
    if (chosenCategory === 'platform_user' || chosenCategory === 'data_driven') {
      metrics.technology += 8;
    }
    if (chosenCategory === 'relationship_focused' || chosenCategory === 'inclusive') {
      metrics.satisfaction += 6;
    }
    if (chosenCategory === 'strategic' || chosenCategory === 'organized') {
      metrics.budget += 5;
    }
  });
  
  const badges = calculateBadgesOld(choiceCategories, metrics);
  
  console.log(`${strategy.name}:`);
  console.log(`  Badges: ${badges.length} - ${badges.join(', ')}`);
  console.log(`  Categorias: ${Object.entries(choiceCategories).filter(([k,v]) => v > 0).map(([k,v]) => `${k}:${v}`).join(', ')}`);
  console.log(`  Métricas: Budget:${metrics.budget}, Tech:${metrics.technology}, Satisfaction:${metrics.satisfaction}\n`);
  
  badgesByStrategy[strategy.name] = badges;
  badges.forEach(badge => {
    badgeStats[badge] = (badgeStats[badge] || 0) + 1;
  });
});

console.log('\n=== ESTATÍSTICAS DE BADGES ===');
Object.entries(badgeStats).sort((a, b) => b[1] - a[1]).forEach(([badge, count]) => {
  console.log(`${badge}: ${count}/7 estratégias (${Math.round(count/7*100)}%)`);
});

// Identificar badges raras
const rareBadges = Object.entries(badgeStats).filter(([badge, count]) => count < 3);
console.log('\n=== BADGES RARAS (menos de 43% das estratégias) ===');
rareBadges.forEach(([badge, count]) => {
  console.log(`❌ ${badge}: apenas ${count}/7 estratégias`);
});

console.log('\n=== BADGES QUE NUNCA APARECEM ===');
const allBadges = ['PLATFORM_ADOPTER', 'STRATEGIC_MIND', 'RELATIONSHIP_BUILDER', 'PROBLEM_SOLVER', 'DATA_MASTER', 'TECH_ENTHUSIAST', 'BUDGET_CONSCIOUS', 'PEOPLE_PERSON'];
const missingBadges = allBadges.filter(badge => !badgeStats[badge]);
missingBadges.forEach(badge => {
  console.log(`❌ ${badge}: NUNCA obtida`);
});
