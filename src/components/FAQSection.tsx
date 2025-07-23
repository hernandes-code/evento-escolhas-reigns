import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, CheckCircle, Shield, Clock, Zap, Users, TrendingUp } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
  icon: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  delay?: number;
}

const FAQItem: React.FC<FAQItemProps> = ({ 
  question, 
  answer, 
  icon, 
  isOpen, 
  onToggle, 
  delay = 0 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-orange-500/20 rounded-2xl overflow-hidden mb-4"
    >
      <button
        onClick={onToggle}
        className="w-full px-6 py-5 flex items-center gap-4 text-left hover:bg-orange-500/5 transition-colors"
      >
        <div className="text-orange-400">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-white font-bold text-lg">{question}</h3>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-6 h-6 text-orange-400" />
        </motion.div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6">
              <div className="pl-12 text-gray-300 leading-relaxed">
                {answer}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQ_ITEMS = [
  {
    question: "Como posso ter certeza de que o eBook realmente funciona?",
    answer: "Mais de 2.847 produtores já transformaram seus negócios com nosso método. Veja os depoimentos acima! Além disso, oferecemos garantia total de 30 dias. Se não ficar satisfeito, devolvemos 100% do seu dinheiro, sem perguntas.",
    icon: <Shield className="w-6 h-6" />
  },
  {
    question: "Quanto tempo leva para ver os primeiros resultados?",
    answer: "A maioria dos nossos alunos vê os primeiros resultados em 24-48h após implementar as estratégias neurais. É um sistema testado e aprovado por milhares de produtores que saíram do zero e chegaram a 6 dígitos.",
    icon: <Clock className="w-6 h-6" />
  },
  {
    question: "Funciona para qualquer tipo de evento?",
    answer: "SIM! As estratégias neurais funcionam para: Casamentos, Formaturas, Corporativos, Aniversários, Bar/Bat Mitzvá, Eventos Sociais, Temáticos e muito mais. O método é universal porque trabalha com a psicologia humana.",
    icon: <Zap className="w-6 h-6" />
  },
  {
    question: "A comunidade VIP realmente vale a pena?",
    answer: "A comunidade é onde a MÁGICA acontece! Você terá acesso direto aos produtores que mais faturam no Brasil, networking de alto nível, parcerias exclusivas e suporte 24/7. Muitos fecham mais negócios só pelos contatos da comunidade.",
    icon: <Users className="w-6 h-6" />
  },
  {
    question: "E se eu for iniciante, vai funcionar para mim?",
    answer: "PERFEITO! O método foi criado pensando especialmente em iniciantes. Começamos do básico absoluto e te levamos ao nível master passo a passo. Vários alunos saíram do ZERO e hoje faturam +R$ 50mil/mês.",
    icon: <TrendingUp className="w-6 h-6" />
  },
  {
    question: "Por que está tão barato? Qual é a pegadinha?",
    answer: "NÃO HÁ pegadinha! Este preço promocional é para os primeiros 100 produtores que passaram pelo nosso teste neural. É nossa forma de validar o perfil ideal antes do lançamento oficial. Depois volta para R$ 497.",
    icon: <CheckCircle className="w-6 h-6" />
  }
];

interface FAQSectionProps {
  className?: string;
}

const FAQSection: React.FC<FAQSectionProps> = ({ className = "" }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={`${className}`}>
      <motion.h3
        className="text-3xl font-bold text-center text-orange-400 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        ❓ DÚVIDAS MAIS FREQUENTES
      </motion.h3>
      
      <div className="space-y-4">
        {FAQ_ITEMS.map((item, index) => (
          <FAQItem
            key={index}
            question={item.question}
            answer={item.answer}
            icon={item.icon}
            isOpen={openIndex === index}
            onToggle={() => toggleFAQ(index)}
            delay={index * 0.1}
          />
        ))}
      </div>
      
      {/* Garantia destacada */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-8 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-2 border-green-500/50 rounded-2xl p-6 text-center"
      >
        <Shield className="w-12 h-12 text-green-400 mx-auto mb-4" />
        <h4 className="text-2xl font-bold text-green-400 mb-2">
          🛡️ GARANTIA TOTAL DE 30 DIAS
        </h4>
        <p className="text-gray-300 leading-relaxed">
          Experimente por 30 dias. Se não estiver 100% satisfeito, devolvemos seu dinheiro. 
          Sem perguntas, sem burocracias. Você não tem nada a perder e tudo a ganhar!
        </p>
        <div className="mt-4 text-green-400 font-bold">
          ✓ Risco ZERO para você!
        </div>
      </motion.div>
    </div>
  );
};

export default FAQSection;
