import React from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, Star, Crown, TrendingUp, Zap, Target, 
  Award, Sparkles, Eye, Layers, Atom, Activity 
} from 'lucide-react';
import { TRAITS_NEURAIS, PERFIS_PRODUTOR } from '../data/labirintoData';

interface ResultadoModalProps {
  isOpen: boolean;
  resultado: any;
  onContinue: () => void;
  playerName: string;
}

const ResultadoModal: React.FC<ResultadoModalProps> = ({ 
  isOpen, 
  resultado, 
  onContinue, 
  playerName 
}) => {
  if (!isOpen || !resultado) return null;

  const { perfil, traits, pontuacaoTotal, escolhas, traitDominante, compatibilidade } = resultado;

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.5, opacity: 0, rotateY: -180 }}
        animate={{ scale: 1, opacity: 1, rotateY: 0 }}
        transition={{ duration: 1, type: "spring" }}
        className="max-w-4xl w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl border-4 border-orange-500/30 overflow-hidden max-h-[90vh] overflow-y-auto relative"
      >
        
        {/* Efeitos de fundo */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(100)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-orange-400/60 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>

        <div className="relative z-10">
          
          {/* Header épico */}
          <div className="bg-gradient-to-r from-purple-600 to-orange-600 p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="relative"
            >
              <div className="w-24 h-24 mx-auto mb-4 relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity }}
                  className="absolute inset-0 border-4 border-white/30 rounded-full"
                />
                <div className="absolute inset-2 bg-gradient-to-br from-white to-yellow-200 rounded-full flex items-center justify-center text-4xl">
                  {perfil?.icone}
                </div>
              </div>
              
              <h1 className="text-4xl font-black text-white mb-2">
                🎉 ANÁLISE NEURAL COMPLETA!
              </h1>
              <p className="text-xl text-white/90">
                {playerName}, descobrimos seu DNA de produtor
              </p>
            </motion.div>
          </div>

          <div className="p-8">
            
            {/* Perfil principal */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-center mb-8"
            >
              <div className="bg-gradient-to-br from-purple-500/20 to-orange-500/20 border-2 border-purple-500/50 rounded-3xl p-8 mb-6">
                <h2 className="text-4xl font-bold text-white mb-4" style={{ color: perfil?.cor }}>
                  {perfil?.nome}
                </h2>
                <p className="text-xl text-gray-300 leading-relaxed mb-6">
                  {perfil?.descricao}
                </p>
                
                {/* Score de compatibilidade */}
                <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-2xl p-6 border border-green-500/30">
                  <div className="text-6xl font-black text-green-400 mb-2">
                    {Math.round(compatibilidade)}%
                  </div>
                  <div className="text-white font-bold text-lg">
                    COMPATIBILIDADE COM NOSSA PLATAFORMA
                  </div>
                  <div className="text-gray-300 text-sm mt-2">
                    Você está no top 15% dos produtores mais inteligentes!
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Análise neural visual */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="mb-8"
            >
              <h3 className="text-2xl font-bold text-white text-center mb-6">
                🧬 SEU MAPEAMENTO NEURAL
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(TRAITS_NEURAIS).map(([key, trait], index) => {
                  const valor = traits[key as keyof typeof traits] || 0;
                  const porcentagem = Math.min(100, (valor / 100) * 100);
                  
                  return (
                    <motion.div
                      key={key}
                      initial={{ scale: 0, rotateY: -90 }}
                      animate={{ scale: 1, rotateY: 0 }}
                      transition={{ delay: 1.4 + index * 0.1 }}
                      className="bg-slate-800/50 rounded-xl p-4 text-center border border-gray-600/30"
                    >
                      <div className="text-2xl mb-2">{trait.icone}</div>
                      <div className="text-sm font-bold text-white mb-2">{trait.nome}</div>
                      
                      {/* Barra de progresso */}
                      <div className="w-full bg-gray-700 rounded-full h-3 mb-2">
                        <motion.div
                          className="h-3 rounded-full"
                          style={{ backgroundColor: trait.cor }}
                          initial={{ width: 0 }}
                          animate={{ width: `${porcentagem}%` }}
                          transition={{ delay: 1.6 + index * 0.1, duration: 1 }}
                        />
                      </div>
                      
                      <div className="text-xs text-gray-400">{Math.round(porcentagem)}%</div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Suas características únicas */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 2 }}
              className="mb-8"
            >
              <h3 className="text-2xl font-bold text-white text-center mb-6">
                ✨ SUAS CARACTERÍSTICAS ÚNICAS
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Target className="w-6 h-6 text-blue-400" />
                    <div className="text-lg font-bold text-white">Ponto Forte</div>
                  </div>
                  <p className="text-gray-300">{perfil?.pontoForte}</p>
                </div>
                
                <div className="bg-gradient-to-br from-green-500/20 to-teal-500/20 border border-green-500/30 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Sparkles className="w-6 h-6 text-green-400" />
                    <div className="text-lg font-bold text-white">Potencial</div>
                  </div>
                  <p className="text-gray-300">{perfil?.potencial}</p>
                </div>
              </div>
            </motion.div>

            {/* Histórico de decisões */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
              className="mb-8"
            >
              <h3 className="text-2xl font-bold text-white text-center mb-6">
                📊 SUAS DECISÕES NO LABIRINTO
              </h3>
              
              <div className="bg-slate-800/30 rounded-2xl p-6 border border-gray-600/30">
                <div className="space-y-3 max-h-40 overflow-y-auto">
                  {escolhas.slice(0, 8).map((escolha: string, i: number) => (
                    <motion.div
                      key={i}
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 2.7 + i * 0.1 }}
                      className="flex items-center gap-3 text-sm"
                    >
                      <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                        {i + 1}
                      </div>
                      <div className="text-gray-300">{escolha}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* CTA para continuar */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 3 }}
              className="text-center"
            >
              <motion.button
                onClick={onContinue}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.98 }}
                className="group relative bg-gradient-to-r from-orange-500 via-red-500 to-purple-600 hover:from-orange-600 hover:via-red-600 hover:to-purple-700 text-white font-black text-2xl px-12 py-6 rounded-2xl shadow-2xl border-2 border-orange-400/50 overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                  animate={{ x: ['-200%', '200%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
                
                <div className="relative flex items-center gap-4">
                  <Crown className="w-8 h-8" />
                  <div>VER MINHA OFERTA PERSONALIZADA</div>
                  <Sparkles className="w-8 h-8" />
                </div>
              </motion.button>

              <p className="text-gray-400 text-sm mt-4">
                Agora que conhecemos seu perfil, temos uma oportunidade especial para você 🎯
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ResultadoModal;
