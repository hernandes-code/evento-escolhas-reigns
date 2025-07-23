import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Users, TrendingUp, Zap, AlertTriangle, Flame } from 'lucide-react';

interface ScarcityBannerProps {
  className?: string;
  timeLeft: number;
}

const ScarcityBanner: React.FC<ScarcityBannerProps> = ({ className = "", timeLeft }) => {
  const [visitorCount, setVisitorCount] = useState(0);
  const [spotsLeft, setSpotsLeft] = useState(0);

  useEffect(() => {
    // Simula contadores realistas
    const baseVisitors = 847 + Math.floor(Math.random() * 50);
    const baseSpots = 23 + Math.floor(Math.random() * 8);
    
    setVisitorCount(baseVisitors);
    setSpotsLeft(baseSpots);

    // Reduz spots ocasionalmente
    const spotsInterval = setInterval(() => {
      setSpotsLeft(prev => Math.max(1, prev - (Math.random() > 0.7 ? 1 : 0)));
    }, 30000);

    return () => clearInterval(spotsInterval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getUrgencyColor = () => {
    if (timeLeft < 300) return 'from-red-600 to-red-800'; // 5 min
    if (timeLeft < 600) return 'from-orange-600 to-red-600'; // 10 min
    return 'from-orange-500 to-red-500';
  };

  const getUrgencyMessage = () => {
    if (timeLeft < 120) return '🚨 ÚLTIMOS MINUTOS!';
    if (timeLeft < 300) return '⚠️ QUASE EXPIRANDO!';
    if (timeLeft < 600) return '🔥 OPORTUNIDADE SE ESGOTANDO!';
    return '⏰ OFERTA POR TEMPO LIMITADO!';
  };

  return (
    <div className={className}>
      
      {/* Banner principal de urgência */}
      <motion.div
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className={`bg-gradient-to-r ${getUrgencyColor()} p-4 rounded-2xl mb-6 text-center text-white relative overflow-hidden`}
      >
        {/* Efeito de pulso */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />
        
        <div className="relative z-10">
          <div className="text-2xl font-black mb-2">
            {getUrgencyMessage()}
          </div>
          <div className="text-xl font-bold">
            Expira em: <span className="text-yellow-300 text-2xl">{formatTime(timeLeft)}</span>
          </div>
          {timeLeft < 300 && (
            <div className="text-sm mt-1 opacity-90">
              Depois disso, volta para R$ 497,00
            </div>
          )}
        </div>
      </motion.div>

      {/* Contadores de escassez */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        
        {/* Pessoas online */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/50 rounded-xl p-4 text-center"
        >
          <Users className="w-8 h-8 text-blue-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-blue-400">{visitorCount.toLocaleString()}</div>
          <div className="text-sm text-gray-300">Pessoas visualizando agora</div>
          <div className="flex items-center justify-center gap-1 mt-1">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-green-400 rounded-full"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
              />
            ))}
            <span className="text-xs text-green-400 ml-2">ONLINE</span>
          </div>
        </motion.div>

        {/* Vagas restantes */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/50 rounded-xl p-4 text-center"
        >
          <AlertTriangle className="w-8 h-8 text-orange-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-orange-400">{spotsLeft}</div>
          <div className="text-sm text-gray-300">Vagas restantes</div>
          <div className="text-xs text-red-400 mt-1 font-semibold">
            {spotsLeft < 10 ? '🚨 QUASE ESGOTADO!' : '⚠️ LIMITADO!'}
          </div>
        </motion.div>

        {/* Taxa de aprovação */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/50 rounded-xl p-4 text-center"
        >
          <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-green-400">98.7%</div>
          <div className="text-sm text-gray-300">Taxa de aprovação</div>
          <div className="text-xs text-green-400 mt-1 font-semibold">
            ✓ COMPRA GARANTIDA
          </div>
        </motion.div>
      </div>

      {/* Alertas de ação */}
      <div className="space-y-3">
        
        {/* Alerta crítico */}
        {timeLeft < 300 && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-red-500/20 border-l-4 border-red-500 p-4 rounded-r-xl"
          >
            <div className="flex items-center gap-3">
              <Flame className="w-6 h-6 text-red-400" />
              <div>
                <div className="text-red-400 font-bold">ATENÇÃO CRÍTICA!</div>
                <div className="text-sm text-gray-300">
                  Últimas vagas sendo ocupadas AGORA. Não perca esta oportunidade única!
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Pressão social */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-purple-500/20 border-l-4 border-purple-500 p-4 rounded-r-xl"
        >
          <div className="flex items-center gap-3">
            <Zap className="w-6 h-6 text-purple-400" />
            <div>
              <div className="text-purple-400 font-bold">ÚLTIMA CHANCE!</div>
              <div className="text-sm text-gray-300">
                Esta é a única oportunidade de entrar no grupo seleto com esse preço.
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ScarcityBanner;
