import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Download, Users, MessageCircle, Sparkles, Crown, Gift, Zap, Star, Share2, Copy, Eye, Mail } from 'lucide-react';

interface ThankYouModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  userWhatsapp: string;
  neuralProfile?: {
    title: string;
    name: string;
    description: string;
    color: string;
    personality: string;
  };
  insights?: any[];
  finalScore?: number;
}

const ThankYouModal: React.FC<ThankYouModalProps> = ({ 
  isOpen, 
  onClose, 
  userName, 
  userWhatsapp,
  neuralProfile,
  insights,
  finalScore
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [showCarta, setShowCarta] = useState(false);
  const [cartaCopied, setCartaCopied] = useState(false);

  // Gerar carta personalizada
  const generateCarta = () => {
    const carta = `🧠 ANÁLISE NEURAL COMPLETA - ${userName.toUpperCase()}

🎯 PERFIL IDENTIFICADO: ${neuralProfile?.title || 'PRODUTOR NEURAL'}
${neuralProfile?.description || 'Personalidade única identificada'}

📊 SCORE NEURAL: ${finalScore || 0} pontos

💡 INSIGHT PRINCIPAL:
${insights?.[0]?.text || 'Você tem potencial para revolucionar seus eventos'}

🎪 PERSONALIDADE: ${neuralProfile?.personality || 'Estratégico e inovador'}

---
🚀 Esta análise foi gerada pela IA da nossa plataforma de bilheteria inteligente.

Quer descobrir como multiplicar seus eventos?
Acesse: [nossa-plataforma.com]

#BilheteriaInteligente #ProducaoDeEventos #IA`;

    return carta;
  };

  const handleCopyCarta = () => {
    const carta = generateCarta();
    navigator.clipboard.writeText(carta);
    setCartaCopied(true);
    setTimeout(() => setCartaCopied(false), 2000);
  };

  const handleShareCarta = () => {
    const carta = generateCarta();
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(carta)}`;
    window.open(whatsappUrl, '_blank');
  };

  useEffect(() => {
    if (isOpen) {
      // Simular progresso de download
      const progressTimer = setInterval(() => {
        setDownloadProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressTimer);
            return 100;
          }
          return prev + 10;
        });
      }, 200);

      // Sequência de revelação
      setTimeout(() => setCurrentStep(1), 2000);
      setTimeout(() => setCurrentStep(2), 4000);
      setTimeout(() => setCurrentStep(3), 6000);

      return () => clearInterval(progressTimer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-gradient-to-br from-green-900/95 via-emerald-800/90 to-green-900/95 backdrop-blur-xl z-50 flex items-center justify-center p-4">
        
        {/* Confetti Effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-full"
              style={{
                background: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'][Math.floor(Math.random() * 5)],
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, -200],
                x: [0, Math.random() * 100 - 50, Math.random() * 200 - 100],
                rotate: [0, 180, 360],
                opacity: [1, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeOut",
              }}
            />
          ))}
        </div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          transition={{ duration: 1, ease: "backOut" }}
          className="bg-gradient-to-br from-white/95 via-green-50/90 to-white/95 border-4 border-green-400/50 rounded-3xl p-8 max-w-2xl w-full shadow-[0_50px_100px_rgba(34,197,94,0.3)] backdrop-blur-sm relative overflow-hidden"
        >
          
          {/* Success Header */}
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center mb-8"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 360]
              }}
              transition={{ 
                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 3, repeat: Infinity, ease: "linear" }
              }}
              className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-green-400 via-emerald-500 to-green-600 rounded-full flex items-center justify-center shadow-[0_20px_40px_rgba(34,197,94,0.4)]"
            >
              <CheckCircle className="w-16 h-16 text-white" />
            </motion.div>

            <h1 className="text-5xl font-black text-gray-800 mb-4">
              🎉 SUCESSO!
            </h1>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
              Bem-vindo(a), {userName}!
            </h2>
            <p className="text-xl text-gray-600">
              Seu <strong>Pacote Neural Premium</strong> está sendo preparado...
            </p>
          </motion.div>

          {/* Progress Steps */}
          <div className="space-y-6 mb-8">
            
            {/* Step 1: E-book Generation */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-500 ${
                currentStep >= 1 
                  ? 'bg-green-100 border-green-300' 
                  : 'bg-gray-100 border-gray-200'
              }`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                currentStep >= 1 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-300 text-gray-600'
              }`}>
                {currentStep >= 1 ? <CheckCircle className="w-6 h-6" /> : <Download className="w-6 h-6" />}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-800">E-book "Bilheteria Digital Master"</h3>
                <p className="text-sm text-gray-600">
                  Personalizado para {neuralProfile?.title || 'seu perfil neural'}
                </p>
                {currentStep === 0 && (
                  <div className="mt-2 bg-gray-200 rounded-full h-2 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-green-400 to-green-600"
                      animate={{ width: `${downloadProgress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                )}
              </div>
              {currentStep >= 1 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-green-500 font-bold"
                >
                  ✅
                </motion.div>
              )}
            </motion.div>

            {/* Step 2: Community Access */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-500 ${
                currentStep >= 2 
                  ? 'bg-purple-100 border-purple-300' 
                  : 'bg-gray-100 border-gray-200'
              }`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                currentStep >= 2 
                  ? 'bg-purple-500 text-white' 
                  : 'bg-gray-300 text-gray-600'
              }`}>
                {currentStep >= 2 ? <CheckCircle className="w-6 h-6" /> : <Users className="w-6 h-6" />}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-800">Comunidade VIP de Produtores</h3>
                <p className="text-sm text-gray-600">
                  Acesso liberado por 30 dias + networking exclusivo
                </p>
              </div>
              {currentStep >= 2 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-purple-500 font-bold"
                >
                  ✅
                </motion.div>
              )}
            </motion.div>

            {/* Step 3: Marketing Consultation */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
              className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-500 ${
                currentStep >= 3 
                  ? 'bg-orange-100 border-orange-300' 
                  : 'bg-gray-100 border-gray-200'
              }`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                currentStep >= 3 
                  ? 'bg-orange-500 text-white' 
                  : 'bg-gray-300 text-gray-600'
              }`}>
                {currentStep >= 3 ? <CheckCircle className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-800">Assessoria de Marketing Gratuita</h3>
                <p className="text-sm text-gray-600">
                  Consultoria personalizada via WhatsApp
                </p>
              </div>
              {currentStep >= 3 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-orange-500 font-bold"
                >
                  ✅
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Next Steps */}
          {currentStep >= 3 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
              className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-2xl p-6 mb-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="w-6 h-6 text-yellow-600" />
                <h3 className="text-xl font-bold text-gray-800">PRÓXIMOS PASSOS:</h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-700">
                  <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
                  <span>📱 Você receberá o e-book via <strong>WhatsApp ({userWhatsapp})</strong> em até 5 minutos</span>
                </div>
                
                <div className="flex items-center gap-3 text-gray-700">
                  <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
                  <span>👥 Link da <strong>Comunidade VIP</strong> será enviado junto</span>
                </div>
                
                <div className="flex items-center gap-3 text-gray-700">
                  <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
                  <span>🎯 Nossa equipe entrará em contato para <strong>assessoria gratuita</strong></span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Social Proof */}
          {currentStep >= 3 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2 }}
              className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl p-6 mb-6 text-center"
            >
              <div className="flex items-center justify-center gap-2 mb-3">
                <Star className="w-6 h-6 text-yellow-300" />
                <Star className="w-6 h-6 text-yellow-300" />
                <Star className="w-6 h-6 text-yellow-300" />
                <Star className="w-6 h-6 text-yellow-300" />
                <Star className="w-6 h-6 text-yellow-300" />
              </div>
              <h4 className="font-bold text-xl mb-2">+2.847 Produtores Transformados</h4>
              <p className="text-green-100">
                "Aumentei minhas vendas em <strong>347%</strong> usando as estratégias do e-book!"
              </p>
              <p className="text-sm text-green-200 mt-2">- Marina Santos, São Paulo</p>
            </motion.div>
          )}

          {/* Carta Compartilhável */}
          {currentStep >= 3 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2 }}
              className="bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-orange-400/30 rounded-2xl p-6 mb-6"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <Mail className="w-6 h-6 text-orange-400" />
                <h3 className="text-xl font-bold text-white">SUA CARTA NEURAL</h3>
                <Mail className="w-6 h-6 text-orange-400" />
              </div>
              
              <p className="text-gray-300 text-center mb-4">
                Compartilhe sua análise neural personalizada nas redes sociais!
              </p>

              <div className="flex gap-3 justify-center mb-4">
                <motion.button
                  onClick={() => setShowCarta(!showCarta)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  {showCarta ? 'Ocultar' : 'Ver Carta'}
                </motion.button>
                
                <motion.button
                  onClick={handleCopyCarta}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2"
                >
                  <Copy className="w-4 h-4" />
                  {cartaCopied ? 'Copiado!' : 'Copiar'}
                </motion.button>
                
                <motion.button
                  onClick={handleShareCarta}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2"
                >
                  <Share2 className="w-4 h-4" />
                  WhatsApp
                </motion.button>
              </div>

              {/* Carta Preview */}
              <AnimatePresence>
                {showCarta && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-gradient-to-br from-white/95 to-gray-100/95 rounded-xl p-4 text-gray-800 text-sm font-mono whitespace-pre-line overflow-auto max-h-60"
                  >
                    {generateCarta()}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Close Button */}
          {currentStep >= 3 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5 }}
              className="text-center"
            >
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-3 rounded-xl font-bold text-lg shadow-lg transition-all duration-300 flex items-center gap-3 mx-auto"
              >
                <Crown className="w-6 h-6" />
                CONTINUAR NAVEGANDO
                <Sparkles className="w-6 h-6" />
              </motion.button>
              
              <p className="text-sm text-gray-500 mt-3">
                Fique de olho no seu WhatsApp! 📱
              </p>
            </motion.div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ThankYouModal;
