import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Target, 
  Brain, 
  TrendingUp, 
  Zap 
} from 'lucide-react';
import { OfertaContent } from './OfertaContent';

interface OfertaFinalProps {
  nivel: string;
  categorias: {
    marketing: number;
    organizacao: number;
    vendas: number;
    digital: number;
  };
  pontuacao: number;
  onCompleted: () => void;
}

interface PersonalityInsight {
  title: string;
  description: string;
  percentage: number;
  color: string;
  icon: React.ReactNode;
}

const getNivelInfo = (nivel: string) => {
  const nivelMap = {
    'iniciante': {
      titulo: 'Produtor Iniciante',
      emoji: '🌱',
      cor: 'from-blue-500 to-cyan-500',
      descricao: 'Você tem uma base sólida e muito potencial!'
    },
    'intermediario': {
      titulo: 'Produtor em Crescimento', 
      emoji: '📈',
      cor: 'from-orange-500 to-yellow-500',
      descricao: 'Já entende o negócio e está pronto para o próximo nível!'
    },
    'avancado': {
      titulo: 'Produtor Estratégico',
      emoji: '🏆', 
      cor: 'from-purple-500 to-pink-500',
      descricao: 'Tem visão avançada e pode maximizar ainda mais!'
    }
  };
  return nivelMap[nivel as keyof typeof nivelMap] || nivelMap.iniciante;
};

const getCategoriaInsights = (categorias: any): PersonalityInsight[] => {
  const categoriaMap = {
    marketing: {
      title: 'Marketing Digital',
      color: 'text-orange-400',
      icon: <Target className="w-6 h-6" />
    },
    organizacao: {
      title: 'Organização',
      color: 'text-blue-400', 
      icon: <Brain className="w-6 h-6" />
    },
    vendas: {
      title: 'Estratégia de Vendas',
      color: 'text-green-400',
      icon: <TrendingUp className="w-6 h-6" />
    },
    digital: {
      title: 'Habilidades Digitais',
      color: 'text-purple-400',
      icon: <Zap className="w-6 h-6" />
    }
  };

  return Object.entries(categorias).map(([key, value]) => {
    const info = categoriaMap[key as keyof typeof categoriaMap];
    const percentage = Math.round((value as number / 8) * 100);
    
    return {
      title: info.title,
      description: `${value}/8 pontos conquistados`,
      percentage,
      color: info.color,
      icon: info.icon
    };
  });
};

const OfertaFinal: React.FC<OfertaFinalProps> = ({ 
  nivel, 
  categorias, 
  pontuacao,
  onCompleted 
}) => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    whatsapp: '',
    experiencia: '',
    interesse: ''
  });
  const [showOferta, setShowOferta] = useState(false);
  
  const nivelInfo = getNivelInfo(nivel);
  const insights = getCategoriaInsights(categorias);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowOferta(true);
  };

  const isFormValid = formData.nome && formData.email && formData.whatsapp;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-50">
        <div className="w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(156,146,172,0.05)_0%,transparent_50%)]"></div>
      </div>
      
      <div className="relative z-10 p-6">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <motion.div 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-3 mb-6">
              <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${nivelInfo.cor} flex items-center justify-center text-2xl shadow-2xl`}>
                {nivelInfo.emoji}
              </div>
              <div className="text-left">
                <h1 className="text-2xl font-bold text-white">
                  {nivelInfo.titulo}
                </h1>
                <p className="text-slate-300 text-sm">
                  {nivelInfo.descricao}
                </p>
              </div>
            </div>
          </motion.div>

          {!showOferta ? (
            <>
              {/* Insights das Categorias */}
              <motion.div 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="grid md:grid-cols-2 gap-6 mb-12"
              >
                {insights.map((insight, index) => (
                  <motion.div
                    key={insight.title}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`${insight.color}`}>
                        {insight.icon}
                      </div>
                      <h3 className="font-semibold text-lg text-white">
                        {insight.title}
                      </h3>
                    </div>
                    
                    <div className="mb-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-slate-300">{insight.description}</span>
                        <span className="text-sm font-semibold text-white">{insight.percentage}%</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${insight.percentage}%` }}
                          transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                          className={`h-2 rounded-full bg-gradient-to-r ${insight.color.replace('text-', 'from-').replace('-400', '-400')} to-white`}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Formulário */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700 mb-8"
              >
                <h2 className="text-2xl font-bold text-center mb-2 text-white">
                  💡 Receba Estratégias Personalizadas
                </h2>
                <p className="text-center text-slate-300 mb-8">
                  Com base no seu perfil <span className="text-orange-400 font-semibold">{nivelInfo.titulo}</span>, 
                  preparamos um material exclusivo com estratégias específicas para seu nível.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Nome completo *
                      </label>
                      <input
                        type="text"
                        name="nome"
                        value={formData.nome}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                        placeholder="Digite seu nome"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        WhatsApp *
                      </label>
                      <input
                        type="tel"
                        name="whatsapp"
                        value={formData.whatsapp}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                        placeholder="(11) 99999-9999"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                      placeholder="seu@email.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Experiência com eventos
                    </label>
                    <select
                      name="experiencia"
                      value={formData.experiencia}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="">Selecione...</option>
                      <option value="iniciante">Iniciante (0-1 anos)</option>
                      <option value="intermediario">Intermediário (2-5 anos)</option>
                      <option value="avancado">Avançado (5+ anos)</option>
                    </select>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={!isFormValid}
                    whileHover={{ scale: isFormValid ? 1.02 : 1 }}
                    whileTap={{ scale: isFormValid ? 0.98 : 1 }}
                    className={`w-full py-4 rounded-lg font-semibold text-lg transition-all duration-200 ${
                      isFormValid
                        ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 shadow-lg'
                        : 'bg-slate-600 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    {isFormValid ? '🎯 RECEBER ESTRATÉGIAS PERSONALIZADAS' : 'Preencha os campos obrigatórios'}
                  </motion.button>
                </form>
              </motion.div>
            </>
          ) : (
            /* Oferta Final */
            <OfertaContent 
              formData={formData}
              nivelInfo={nivelInfo}
              insights={insights}
              pontuacao={pontuacao}
              onCompleted={onCompleted}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default OfertaFinal;
