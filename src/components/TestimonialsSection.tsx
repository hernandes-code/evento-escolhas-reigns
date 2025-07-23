import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, TrendingUp, Users, Zap } from 'lucide-react';

interface TestimonialCardProps {
  testimonial: {
    name: string;
    role: string;
    company: string;
    text: string;
    rating: number;
    result: string;
    avatar?: string;
  };
  index: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateY: -15 }}
      animate={{ opacity: 1, y: 0, rotateY: 0 }}
      transition={{ delay: index * 0.2, duration: 0.6 }}
      className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 border border-orange-500/20 rounded-2xl p-6 relative overflow-hidden"
      whileHover={{ scale: 1.02, rotateY: 5 }}
    >
      {/* Efeito de brilho */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
      
      {/* Quote icon */}
      <div className="absolute top-4 right-4 opacity-20">
        <Quote className="w-8 h-8 text-orange-400" />
      </div>
      
      {/* Stars */}
      <div className="flex items-center gap-1 mb-3">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < testimonial.rating 
                ? 'fill-yellow-400 text-yellow-400' 
                : 'text-gray-600'
            }`}
          />
        ))}
      </div>
      
      {/* Testimonial text */}
      <p className="text-gray-300 mb-4 leading-relaxed text-sm">
        "{testimonial.text}"
      </p>
      
      {/* Result highlight */}
      <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-lg p-3 mb-4">
        <div className="flex items-center gap-2 text-green-400 font-semibold text-sm">
          <TrendingUp className="w-4 h-4" />
          {testimonial.result}
        </div>
      </div>
      
      {/* Author info */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
          {testimonial.name.charAt(0)}
        </div>
        <div>
          <div className="text-white font-semibold text-sm">{testimonial.name}</div>
          <div className="text-gray-400 text-xs">{testimonial.role}, {testimonial.company}</div>
        </div>
      </div>
    </motion.div>
  );
};

export const EBOOK_TESTIMONIALS = [
  {
    name: "Marina Santos",
    role: "Produtora de Casamentos",
    company: "Elite Eventos",
    text: "Antes do guia, eu perdia clientes por não saber usar a tecnologia certa. Agora automatizei tudo e meu faturamento triplicou em 2 meses!",
    rating: 5,
    result: "Receita: R$ 15mil → R$ 45mil/mês"
  },
  {
    name: "Carlos Oliveira",
    role: "Eventos Corporativos",
    company: "Pro Business Events",
    text: "As estratégias neurais do eBook mudaram minha forma de pensar eventos. Hoje tenho uma lista de espera de 3 meses!",
    rating: 5,
    result: "Lista de espera: 0 → 50 clientes"
  },
  {
    name: "Ana Costa",
    role: "Formaturas & Formandos",
    company: "Formatura Perfeita",
    text: "O método neural me ajudou a entender o que meus clientes realmente querem. Passei de 10 para 50 eventos por mês!",
    rating: 5,
    result: "Eventos/mês: 10 → 50"
  },
  {
    name: "Roberto Silva",
    role: "Eventos Sociais",
    company: "Celebrar & Cia",
    text: "Implementei as 7 estratégias do eBook e em 30 dias já tinha recuperado o investimento 500x. Inacreditável!",
    rating: 5,
    result: "ROI: 500x em 30 dias"
  },
  {
    name: "Juliana Mendes",
    role: "Aniversários de Luxo",
    company: "Luxury Parties",
    text: "O guia me ensinou a precificar corretamente e a usar IA para otimizar tudo. Agora cobro 3x mais pelos mesmos eventos!",
    rating: 5,
    result: "Margem de lucro: +300%"
  },
  {
    name: "Fernando Rocha",
    role: "Eventos Temáticos",
    company: "Temática Eventos",
    text: "Seguindo o passo a passo do eBook, criei um sistema que funciona no piloto automático. Trabalho menos e ganho mais!",
    rating: 5,
    result: "Automatização: 80% dos processos"
  }
];

interface TestimonialsSectionProps {
  className?: string;
  showAll?: boolean;
}

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ 
  className = "", 
  showAll = false 
}) => {
  const testimonialsToShow = showAll ? EBOOK_TESTIMONIALS : EBOOK_TESTIMONIALS.slice(0, 3);
  
  return (
    <div className={`${className}`}>
      <motion.h3
        className="text-2xl font-bold text-center text-orange-400 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        📣 O QUE OUTROS PRODUTORES ESTÃO DIZENDO
      </motion.h3>
      
      <div className="grid md:grid-cols-3 gap-6">
        {testimonialsToShow.map((testimonial, index) => (
          <TestimonialCard
            key={index}
            testimonial={testimonial}
            index={index}
          />
        ))}
      </div>
      
      {/* Stats row */}
      <motion.div
        className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-xl p-4">
          <div className="text-2xl font-bold text-orange-400">4.9/5</div>
          <div className="text-xs text-gray-400">Avaliação Média</div>
        </div>
        
        <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl p-4">
          <div className="text-2xl font-bold text-green-400">2.847+</div>
          <div className="text-xs text-gray-400">Produtores Ativos</div>
        </div>
        
        <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-xl p-4">
          <div className="text-2xl font-bold text-blue-400">↑267%</div>
          <div className="text-xs text-gray-400">Aumento Médio</div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-4">
          <div className="text-2xl font-bold text-purple-400">24h</div>
          <div className="text-xs text-gray-400">Resultados Rápidos</div>
        </div>
      </motion.div>
    </div>
  );
};

export default TestimonialsSection;
