// Teste do Sistema de Badges Equilibrado

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

// NOVO Sistema equilibrado de badges
const calculateBadgesNew = (choiceCategories, metrics) => {
  const badges = [];
  
  // 1. PLATFORM_ADOPTER - Foco em adoção de plataformas
  if (choiceCategories.platform_user >= 1 || choiceCategories.organized >= 2) {
    badges.push('PLATFORM_ADOPTER');
  }
  
  // 2. STRATEGIC_MIND - Pensamento estratégico (reduzido threshold)
  if (choiceCategories.strategic >= 1 || (choiceCategories.data_driven >= 1 && choiceCategories.organized >= 1)) {
    badges.push('STRATEGIC_MIND');
  }
  
  // 3. RELATIONSHIP_BUILDER - Relacionamentos (ajustado para ser obtível)
  if (choiceCategories.relationship_focused >= 1 || choiceCategories.proactive >= 1 || choiceCategories.inclusive >= 2) {
    badges.push('RELATIONSHIP_BUILDER');
  }
  
  // 4. PROBLEM_SOLVER - Resolução criativa de problemas
  if (choiceCategories.creative >= 1 || choiceCategories.inclusive >= 1 || (choiceCategories.balanced >= 1 && metrics.satisfaction >= 60)) {
    badges.push('PROBLEM_SOLVER');
  }
  
  // 5. DATA_MASTER - Análise de dados e tecnologia
  if (choiceCategories.data_driven >= 1 || choiceCategories.data_focused >= 1 || metrics.technology >= 60) {
    badges.push('DATA_MASTER');
  }
  
  // 6. TECH_ENTHUSIAST - Entusiasta de tecnologia (threshold mais balanceado)
  if (metrics.technology >= 55 || (choiceCategories.platform_user >= 1 && metrics.technology >= 45)) {
    badges.push('TECH_ENTHUSIAST');
  }
  
  // 7. BUDGET_CONSCIOUS - Consciência orçamentária (threshold mais alto)
  if (metrics.budget >= 65 || (choiceCategories.strategic >= 1 && metrics.budget >= 55)) {
    badges.push('BUDGET_CONSCIOUS');
  }
  
  // 8. PEOPLE_PERSON - Foco nas pessoas (threshold mais alto para balance)
  if (metrics.satisfaction >= 75 || (choiceCategories.relationship_focused >= 1 && metrics.satisfaction >= 65)) {
    badges.push('PEOPLE_PERSON');
  }
  
  // Sistema de fallback mais inteligente
  if (badges.length === 0) {
    const categoryEntries = Object.entries(choiceCategories).filter(([k, v]) => v > 0);
    if (categoryEntries.length > 0) {
      const maxCategory = categoryEntries.reduce((a, b) => a[1] > b[1] ? a : b);
      
      switch (maxCategory[0]) {
        case 'strategic':
        case 'organized':
        case 'data_driven':
          badges.push('STRATEGIC_MIND');
          break;
        case 'platform_user':
          badges.push('PLATFORM_ADOPTER');
          break;
        case 'relationship_focused':
        case 'proactive':
        case 'inclusive':
          badges.push('RELATIONSHIP_BUILDER');
          break;
        case 'creative':
        case 'balanced':
          badges.push('PROBLEM_SOLVER');
          break;
        case 'data_focused':
          badges.push('DATA_MASTER');
          break;
        default:
          if (metrics.technology >= 45) badges.push('TECH_ENTHUSIAST');
          else if (metrics.budget >= 50) badges.push('BUDGET_CONSCIOUS');
          else if (metrics.satisfaction >= 60) badges.push('PEOPLE_PERSON');
          else badges.push('PROBLEM_SOLVER');
      }
    } else {
      badges.push('PROBLEM_SOLVER');
    }
  }
  
  return badges;
};

// Simular múltiplas estratégias para testar todas as badges
console.log('=== ANÁLISE DO NOVO SISTEMA EQUILIBRADO ===\n');

const strategies = [
  { name: 'Sempre Left', choices: Array(10).fill('left') },
  { name: 'Sempre Right', choices: Array(10).fill('right') },
  { name: 'Alternado', choices: Array(10).fill(0).map((_, i) => i % 2 === 0 ? 'left' : 'right') },
  { name: 'Foco Estratégico', choices: ['right', 'right', 'right', 'left', 'left', 'left', 'left', 'right', 'right', 'left'] },
  { name: 'Foco Relacionamentos', choices: ['left', 'left', 'left', 'left', 'right', 'left', 'right', 'right', 'left', 'left'] },
  { name: 'Foco Tecnologia', choices: ['left', 'right', 'left', 'right', 'left', 'right', 'left', 'left', 'left', 'right'] },
  { name: 'Foco Dados', choices: ['right', 'left', 'right', 'left', 'left', 'left', 'left', 'left', 'right', 'left'] },
  { name: 'Balanced Mix', choices: ['left', 'right', 'left', 'right', 'right', 'right', 'left', 'right', 'right', 'left'] },
  { name: 'Creative Path', choices: ['left', 'left', 'left', 'left', 'left', 'right', 'left', 'left', 'left', 'left'] },
  { name: 'Platform Focus', choices: ['right', 'right', 'left', 'right', 'left', 'left', 'left', 'left', 'left', 'left'] }
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

  // Simular métricas finais mais variadas baseadas nas escolhas
  let metrics = { budget: 55, audience: 75, satisfaction: 65, technology: 45 };
  
  strategy.choices.forEach((choice, cardIndex) => {
    const card = gameCards[cardIndex];
    const chosenCategory = choice === 'left' ? card.leftChoice.category : card.rightChoice.category;
    choiceCategories[chosenCategory] = (choiceCategories[chosenCategory] || 0) + 1;
    
    // Simular efeito nas métricas baseado na categoria com mais variação
    if (chosenCategory === 'platform_user' || chosenCategory === 'data_driven') {
      metrics.technology += 10;
    }
    if (chosenCategory === 'relationship_focused' || chosenCategory === 'inclusive') {
      metrics.satisfaction += 8;
    }
    if (chosenCategory === 'strategic' || chosenCategory === 'organized') {
      metrics.budget += 7;
    }
    if (chosenCategory === 'creative' || chosenCategory === 'balanced') {
      metrics.satisfaction += 5;
      metrics.technology += 3;
    }
    if (chosenCategory === 'data_focused') {
      metrics.technology += 6;
    }
    if (chosenCategory === 'proactive') {
      metrics.satisfaction += 6;
      metrics.audience += 4;
    }
  });
  
  const badges = calculateBadgesNew(choiceCategories, metrics);
  
  console.log(`${strategy.name}:`);
  console.log(`  Badges: ${badges.length} - ${badges.join(', ')}`);
  console.log(`  Categorias principais: ${Object.entries(choiceCategories).filter(([k,v]) => v > 0).slice(0, 5).map(([k,v]) => `${k}:${v}`).join(', ')}`);
  console.log(`  Métricas: Budget:${metrics.budget}, Tech:${metrics.technology}, Satisfaction:${metrics.satisfaction}\n`);
  
  badgesByStrategy[strategy.name] = badges;
  badges.forEach(badge => {
    badgeStats[badge] = (badgeStats[badge] || 0) + 1;
  });
});

console.log('\n=== ESTATÍSTICAS DO NOVO SISTEMA ===');
Object.entries(badgeStats).sort((a, b) => b[1] - a[1]).forEach(([badge, count]) => {
  const percentage = Math.round(count/strategies.length*100);
  console.log(`${badge}: ${count}/${strategies.length} estratégias (${percentage}%)`);
});

// Verificar se todas as badges são obtíveis
const allBadges = ['PLATFORM_ADOPTER', 'STRATEGIC_MIND', 'RELATIONSHIP_BUILDER', 'PROBLEM_SOLVER', 'DATA_MASTER', 'TECH_ENTHUSIAST', 'BUDGET_CONSCIOUS', 'PEOPLE_PERSON'];
const obtainableBadges = Object.keys(badgeStats);
const missingBadges = allBadges.filter(badge => !obtainableBadges.includes(badge));

console.log(`\n=== RESULTADO DO BALANCEAMENTO ===`);
console.log(`✅ Badges obtíveis: ${obtainableBadges.length}/8 (${Math.round(obtainableBadges.length/8*100)}%)`);
if (missingBadges.length > 0) {
  console.log(`❌ Badges ainda não obtíveis: ${missingBadges.join(', ')}`);
} else {
  console.log(`🎯 SUCESSO! Todas as 8 badges são obtíveis!`);
}

// Analisar distribuição
const balanced = Object.values(badgeStats).every(count => count >= 2 && count <= 7);
console.log(`🎯 Distribuição equilibrada: ${balanced ? 'SIM' : 'NÃO'}`);

const averagePercentage = Object.values(badgeStats).reduce((a, b) => a + b, 0) / obtainableBadges.length / strategies.length * 100;
console.log(`📊 Média de obtenção: ${Math.round(averagePercentage)}%`);
