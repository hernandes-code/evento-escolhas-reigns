// Teste do Sistema de Badges Atualizado - 7 Badges

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

// Sistema atualizado de badges - 7 badges apenas
const calculateBadgesUpdated = (choiceCategories, metrics) => {
  const badges = [];
  
  // 1. PLATFORM_ADOPTER
  if (choiceCategories.platform_user >= 1 || (choiceCategories.organized >= 2 && metrics.technology >= 50)) {
    badges.push('PLATFORM_ADOPTER');
  }
  
  // 2. STRATEGIC_MIND
  if (choiceCategories.strategic >= 2 || (choiceCategories.data_driven >= 1 && choiceCategories.organized >= 1) || (choiceCategories.strategic >= 1 && metrics.budget >= 65)) {
    badges.push('STRATEGIC_MIND');
  }
  
  // 3. RELATIONSHIP_BUILDER
  if (choiceCategories.relationship_focused >= 1 || choiceCategories.proactive >= 1 || (choiceCategories.inclusive >= 1 && metrics.satisfaction >= 65)) {
    badges.push('RELATIONSHIP_BUILDER');
  }
  
  // 4. PROBLEM_SOLVER
  if (choiceCategories.creative >= 1 || (choiceCategories.inclusive >= 1 && choiceCategories.balanced >= 1) || (metrics.satisfaction >= 75 && choiceCategories.proactive >= 1)) {
    badges.push('PROBLEM_SOLVER');
  }
  
  // 5. DATA_MASTER
  if ((choiceCategories.data_driven >= 1 && choiceCategories.data_focused >= 1) || (choiceCategories.data_driven >= 1 && metrics.technology >= 60) || choiceCategories.data_focused >= 1) {
    badges.push('DATA_MASTER');
  }
  
  // 6. TECH_ENTHUSIAST
  if (metrics.technology >= 65 || (choiceCategories.platform_user >= 1 && metrics.technology >= 55 && choiceCategories.data_driven >= 1)) {
    badges.push('TECH_ENTHUSIAST');
  }
  
  // 7. BUDGET_CONSCIOUS
  if (metrics.budget >= 70 || (choiceCategories.strategic >= 2 && metrics.budget >= 60) || (choiceCategories.money_focused >= 1 && metrics.budget >= 55)) {
    badges.push('BUDGET_CONSCIOUS');
  }
  
  // Sistema de fallback
  if (badges.length === 0) {
    const categoryEntries = Object.entries(choiceCategories).filter(([k, v]) => v > 0);
    if (categoryEntries.length > 0) {
      const maxCategory = categoryEntries.reduce((a, b) => a[1] > b[1] ? a : b);
      
      switch (maxCategory[0]) {
        case 'strategic':
        case 'organized':
          badges.push('STRATEGIC_MIND');
          break;
        case 'platform_user':
          badges.push('PLATFORM_ADOPTER');
          break;
        case 'relationship_focused':
        case 'proactive':
          badges.push('RELATIONSHIP_BUILDER');
          break;
        case 'creative':
        case 'inclusive':
          badges.push('PROBLEM_SOLVER');
          break;
        case 'data_driven':
        case 'data_focused':
          badges.push('DATA_MASTER');
          break;
        case 'balanced':
          badges.push('PROBLEM_SOLVER');
          break;
        default:
          if (metrics.technology >= 50) badges.push('TECH_ENTHUSIAST');
          else if (metrics.budget >= 60) badges.push('BUDGET_CONSCIOUS');
          else if (metrics.satisfaction >= 70) badges.push('RELATIONSHIP_BUILDER');
          else badges.push('PROBLEM_SOLVER');
      }
    } else {
      badges.push('PROBLEM_SOLVER');
    }
  }
  
  return badges;
};

// Estratégias para testar as 7 badges
console.log('=== TESTE SISTEMA ATUALIZADO - 7 BADGES ===\n');

const strategies = [
  { name: 'Foco Plataforma', choices: ['left', 'right', 'left', 'right', 'left', 'left', 'left', 'left', 'left', 'left'] },
  { name: 'Estratégico Máster', choices: ['right', 'right', 'right', 'left', 'left', 'left', 'left', 'left', 'left', 'left'] },
  { name: 'Relacionamentos Pro', choices: ['left', 'left', 'left', 'left', 'right', 'left', 'right', 'right', 'right', 'left'] },
  { name: 'Solucionador Criativo', choices: ['left', 'left', 'left', 'left', 'left', 'right', 'left', 'left', 'right', 'left'] },
  { name: 'Data Specialist', choices: ['left', 'left', 'left', 'left', 'left', 'left', 'left', 'left', 'left', 'left'] },
  { name: 'Tech Enthusiast', choices: ['right', 'right', 'left', 'right', 'right', 'right', 'left', 'right', 'left', 'right'] },
  { name: 'Budget Master', choices: ['left', 'right', 'right', 'left', 'left', 'left', 'left', 'left', 'right', 'left'] },
  { name: 'Balanced Player', choices: ['right', 'right', 'right', 'right', 'right', 'right', 'right', 'right', 'right', 'left'] }
];

const badgeStats = {};
const availableBadges = ['PLATFORM_ADOPTER', 'STRATEGIC_MIND', 'RELATIONSHIP_BUILDER', 'PROBLEM_SOLVER', 'DATA_MASTER', 'TECH_ENTHUSIAST', 'BUDGET_CONSCIOUS'];

strategies.forEach(strategy => {
  const choiceCategories = {
    strategic: 0, organized: 0, platform_user: 0, data_driven: 0,
    creative: 0, relationship_focused: 0, inclusive: 0, proactive: 0,
    budget: 0, improvised: 0, simple: 0, basic: 0, panic: 0,
    data_focused: 0, reactive: 0, money_focused: 0, balanced: 0, momentum_focused: 0
  };

  // Simular métricas baseadas nas estratégias
  let metrics = { budget: 55, audience: 75, satisfaction: 65, technology: 45 };
  
  strategy.choices.forEach((choice, cardIndex) => {
    const card = gameCards[cardIndex];
    const chosenCategory = choice === 'left' ? card.leftChoice.category : card.rightChoice.category;
    choiceCategories[chosenCategory] = (choiceCategories[chosenCategory] || 0) + 1;
    
    // Efeitos nas métricas
    if (chosenCategory === 'platform_user') {
      metrics.technology += 12;
      metrics.budget += 3;
    }
    if (chosenCategory === 'data_driven' || chosenCategory === 'data_focused') {
      metrics.technology += 8;
    }
    if (chosenCategory === 'relationship_focused') {
      metrics.satisfaction += 10;
      metrics.audience += 5;
    }
    if (chosenCategory === 'strategic') {
      metrics.budget += 8;
    }
    if (chosenCategory === 'organized') {
      metrics.budget += 5;
      metrics.satisfaction += 3;
    }
    if (chosenCategory === 'creative') {
      metrics.satisfaction += 7;
      metrics.technology += 4;
    }
    if (chosenCategory === 'proactive') {
      metrics.satisfaction += 8;
      metrics.audience += 6;
    }
    if (chosenCategory === 'inclusive') {
      metrics.satisfaction += 6;
    }
    if (chosenCategory === 'balanced') {
      metrics.satisfaction += 5;
      metrics.budget += 2;
    }
    if (chosenCategory === 'money_focused') {
      metrics.budget += 10;
    }
  });
  
  const badges = calculateBadgesUpdated(choiceCategories, metrics);
  
  console.log(`${strategy.name}:`);
  console.log(`  Badges (${badges.length}): ${badges.join(', ')}`);
  console.log(`  Métricas: Budget:${metrics.budget}, Tech:${metrics.technology}, Satisfaction:${metrics.satisfaction}\n`);
  
  badges.forEach(badge => {
    badgeStats[badge] = (badgeStats[badge] || 0) + 1;
  });
});

console.log('=== ESTATÍSTICAS FINAIS - 7 BADGES ===');
availableBadges.forEach(badge => {
  const count = badgeStats[badge] || 0;
  const percentage = Math.round(count/strategies.length*100);
  const status = count === 0 ? '❌' : count < 2 ? '⚠️' : count > 6 ? '⬆️' : '✅';
  console.log(`${status} ${badge}: ${count}/${strategies.length} (${percentage}%)`);
});

const obtainableBadges = Object.keys(badgeStats);
const missingBadges = availableBadges.filter(badge => !obtainableBadges.includes(badge));

console.log(`\n=== RESULTADO ATUALIZADO ===`);
console.log(`✅ Badges obtíveis: ${obtainableBadges.length}/7`);
if (missingBadges.length > 0) {
  console.log(`❌ Badges ainda não obtíveis: ${missingBadges.join(', ')}`);
} else {
  console.log(`🎯 PERFEITO! Todas as 7 badges são obtíveis!`);
}

console.log(`\n🎮 Sistema com 7 badges ${missingBadges.length === 0 ? 'FUNCIONANDO PERFEITAMENTE!' : 'precisa de ajustes'}`);

// Lista as imagens correspondentes
console.log(`\n📸 MAPEAMENTO DE IMAGENS:`);
console.log(`PLATFORM_ADOPTER → badge-digital-native.png`);
console.log(`STRATEGIC_MIND → badge-strategic-mind.png`);
console.log(`RELATIONSHIP_BUILDER → badge-satisfaction-guru.png`);
console.log(`PROBLEM_SOLVER → badge-crisis-manager.png`);
console.log(`DATA_MASTER → badge-tech-master.png`);
console.log(`TECH_ENTHUSIAST → badge-risk-taker.png`);
console.log(`BUDGET_CONSCIOUS → badge-budget-wizard.png`);
