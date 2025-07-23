import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, Award, ChevronRight, Sparkles } from 'lucide-react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowLeadForm: () => void;
  profile: any;
  insights: any[];
  finalScore: number;
  achievements: string[];
}

const SuccessModal: React.FC<SuccessModalProps> = ({ 
  isOpen, 
  onClose, 
  onShowLeadForm, 
  profile, 
  insights, 
  finalScore, 
  achievements 
}) => {
  const [currentInsight, setCurrentInsight] = useState(0);
  const [showAchievements, setShowAchievements] = useState(false);
  
  // Debug logs
  useEffect(() => {
    console.log('🎉 SuccessModal Props:', {
      profile: profile,
      insights: insights,
      finalScore: finalScore,
      achievements: achievements,
      profileType: typeof profile,
      insightsCount: insights?.length,
      achievementsCount: achievements?.length
    });
  }, [profile, insights, finalScore, achievements]);

  useEffect(() => {
    if (isOpen && insights?.length > 0) {
      const timer = setInterval(() => {
        setCurrentInsight((prev) => (prev + 1) % insights.length);
      }, 4000);
      
      const achievementTimer = setTimeout(() => {
        setShowAchievements(true);
      }, 2000);
      
      return () => {
        clearInterval(timer);
        clearTimeout(achievementTimer);
      };
    }
  }, [isOpen, insights?.length]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.5, opacity: 0, rotateY: 90 }}
          animate={{ scale: 1, opacity: 1, rotateY: 0 }}
          exit={{ scale: 0.5, opacity: 0, rotateY: -90 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-gradient-to-br from-slate-900 via-slate-800 to-black border-2 border-yellow-500/30 rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-[0_25px_50px_rgba(251,191,36,0.3)]"
        >
          {/* Cabeçalho com celebração */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-center mb-8"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="inline-block mb-4"
            >
              <Trophy className="w-16 h-16 text-yellow-400 mx-auto" />
            </motion.div>
            
            <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
              🎉 ANÁLISE NEURAL COMPLETA!
            </h1>
            
            <p className="text-xl text-gray-300">
              Sua personalidade de produtor foi decodificada!
            </p>
          </motion.div>

          {/* Profile Display */}
          {profile && (
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className={`p-6 rounded-2xl mb-6 ${profile.color || 'bg-gradient-to-r from-blue-600 to-purple-600'}`}
            >
              <div className="flex items-center gap-4">
                <div className="text-4xl">{profile.icon || '🎯'}</div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{profile.title || 'Neural Producer'}</h2>
                  <p className="text-white/90">{profile.description || 'Perfil neural identificado'}</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Insights rotativos */}
          {insights && insights.length > 0 && (
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="bg-black/30 rounded-2xl p-6 mb-6 min-h-[120px] flex items-center justify-center"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentInsight}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  <Star className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
                  <p className="text-white text-lg leading-relaxed">
                    {insights[currentInsight]?.text || insights[currentInsight] || 'Insight neural processado'}
                  </p>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}

          {/* Score Display */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="text-center mb-6"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-blue-600 px-6 py-3 rounded-full">
              <Sparkles className="w-6 h-6 text-white" />
              <span className="text-white font-bold text-xl">
                Score Neural: {finalScore || 0}
              </span>
              <Sparkles className="w-6 h-6 text-white" />
            </div>
          </motion.div>

          {/* Achievements */}
          <AnimatePresence>
            {showAchievements && achievements && achievements.length > 0 && (
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-6"
              >
                <h3 className="text-xl font-bold text-yellow-400 mb-4 text-center flex items-center justify-center gap-2">
                  <Award className="w-6 h-6" />
                  Conquistas Desbloqueadas
                </h3>
                
                <div className="grid grid-cols-2 gap-3">
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={index}
                      initial={{ scale: 0, rotate: 180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 1.2 + index * 0.2, duration: 0.5 }}
                      className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-lg p-3 text-center"
                    >
                      <div className="text-2xl mb-2">🏆</div>
                      <div className="text-sm font-semibold text-yellow-400">{achievement}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* CTA Button */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="text-center"
          >
            <motion.button
              onClick={onShowLeadForm}
              whileHover={{ scale: 1.05, rotateX: 5 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 hover:from-orange-600 hover:via-red-600 hover:to-pink-600 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center gap-3 mx-auto group"
            >
              <Award className="w-6 h-6 group-hover:rotate-12 transition-transform" />
              RECEBER MEUS BÔNUS PREMIUM
              <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default SuccessModal;
