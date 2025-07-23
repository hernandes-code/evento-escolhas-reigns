import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Instagram, Calendar, Ticket, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';

interface FormularioCapturaProps {
  isOpen: boolean;
  onComplete: (dados: any) => void;
  playerName: string;
}

const FormularioCaptura: React.FC<FormularioCapturaProps> = ({ 
  isOpen, 
  onComplete, 
  playerName 
}) => {
  const [dados, setDados] = useState({
    nome: playerName,
    instagram: '',
    tipoEvento: '',
    vendeIngressoAntecipado: ''
  });

  const [etapaAtual, setEtapaAtual] = useState(0);

  const tiposEvento = [
    { id: 'casamentos', nome: 'Casamentos', emoji: '💒' },
    { id: 'corporativos', nome: 'Eventos Corporativos', emoji: '🏢' },
    { id: 'formaturas', nome: 'Formaturas', emoji: '🎓' },
    { id: 'aniversarios', nome: 'Aniversários', emoji: '🎂' },
    { id: 'shows', nome: 'Shows e Concerts', emoji: '🎵' },
    { id: 'conferencias', nome: 'Conferências', emoji: '🎤' },
    { id: 'outros', nome: 'Outros', emoji: '✨' }
  ];

  const handleNext = () => {
    if (etapaAtual < 3) {
      setEtapaAtual(prev => prev + 1);
    } else {
      onComplete(dados);
    }
  };

  const handleSkip = () => {
    onComplete(dados);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="max-w-lg w-full bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl border-2 border-orange-500/30 overflow-hidden"
      >
        
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-red-600 p-6 text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center"
          >
            <Sparkles className="w-8 h-8 text-white" />
          </motion.div>
          
          <h2 className="text-2xl font-bold text-white mb-2">
            🎯 ÚLTIMOS DADOS PARA SUA ASSESSORIA
          </h2>
          <p className="text-white/90">
            Para personalizar ainda mais sua estratégia
          </p>
          
          {/* Progress bar */}
          <div className="w-full bg-white/20 rounded-full h-2 mt-4">
            <motion.div
              className="bg-white h-2 rounded-full"
              animate={{ width: `${((etapaAtual + 1) / 4) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <div className="p-6">
          
          {/* Etapa 1: Nome */}
          {etapaAtual === 0 && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div className="text-center mb-6">
                <User className="w-12 h-12 text-orange-400 mx-auto mb-3" />
                <h3 className="text-xl font-bold text-white">Confirme seu nome</h3>
                <p className="text-gray-400">Para personalizar sua assessoria</p>
              </div>
              
              <input
                type="text"
                placeholder="Seu nome completo"
                value={dados.nome}
                onChange={(e) => setDados(prev => ({ ...prev, nome: e.target.value }))}
                className="w-full bg-slate-800 border-2 border-orange-500/30 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-orange-400 focus:outline-none"
                autoFocus
              />
            </motion.div>
          )}

          {/* Etapa 2: Instagram */}
          {etapaAtual === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div className="text-center mb-6">
                <Instagram className="w-12 h-12 text-pink-400 mx-auto mb-3" />
                <h3 className="text-xl font-bold text-white">Seu Instagram profissional</h3>
                <p className="text-gray-400">Para analisarmos seus eventos atuais</p>
              </div>
              
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">@</span>
                <input
                  type="text"
                  placeholder="seu_instagram"
                  value={dados.instagram}
                  onChange={(e) => setDados(prev => ({ ...prev, instagram: e.target.value }))}
                  className="w-full bg-slate-800 border-2 border-pink-500/30 rounded-xl pl-8 pr-4 py-3 text-white placeholder-gray-400 focus:border-pink-400 focus:outline-none"
                  autoFocus
                />
              </div>
            </motion.div>
          )}

          {/* Etapa 3: Tipo de Evento */}
          {etapaAtual === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div className="text-center mb-6">
                <Calendar className="w-12 h-12 text-blue-400 mx-auto mb-3" />
                <h3 className="text-xl font-bold text-white">Que tipo de evento você produz?</h3>
                <p className="text-gray-400">Principal segmento de atuação</p>
              </div>
              
              <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto">
                {tiposEvento.map((tipo) => (
                  <motion.button
                    key={tipo.id}
                    onClick={() => setDados(prev => ({ ...prev, tipoEvento: tipo.id }))}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      dados.tipoEvento === tipo.id
                        ? 'border-blue-400 bg-blue-500/20 text-white'
                        : 'border-gray-600 bg-slate-800/50 text-gray-300 hover:border-blue-500/50'
                    }`}
                  >
                    <div className="text-2xl mb-2">{tipo.emoji}</div>
                    <div className="text-sm font-semibold">{tipo.nome}</div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Etapa 4: Venda antecipada */}
          {etapaAtual === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div className="text-center mb-6">
                <Ticket className="w-12 h-12 text-green-400 mx-auto mb-3" />
                <h3 className="text-xl font-bold text-white">Você vende ingressos antecipados?</h3>
                <p className="text-gray-400">Para entender seu modelo atual</p>
              </div>
              
              <div className="space-y-3">
                {[
                  { id: 'sim_sempre', texto: 'Sim, sempre vendo antecipado', cor: 'green' },
                  { id: 'sim_as_vezes', texto: 'Às vezes, depende do evento', cor: 'yellow' },
                  { id: 'nao_ainda', texto: 'Não, ainda não faço isso', cor: 'red' },
                  { id: 'nao_se_aplica', texto: 'Não se aplica ao meu tipo de evento', cor: 'gray' }
                ].map((opcao) => (
                  <motion.button
                    key={opcao.id}
                    onClick={() => setDados(prev => ({ ...prev, vendeIngressoAntecipado: opcao.id }))}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                      dados.vendeIngressoAntecipado === opcao.id
                        ? `border-${opcao.cor}-400 bg-${opcao.cor}-500/20 text-white`
                        : 'border-gray-600 bg-slate-800/50 text-gray-300 hover:border-gray-500'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full border-2 ${
                        dados.vendeIngressoAntecipado === opcao.id
                          ? `border-${opcao.cor}-400 bg-${opcao.cor}-400`
                          : 'border-gray-500'
                      }`} />
                      <span className="font-semibold">{opcao.texto}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Botões de ação */}
          <div className="flex gap-3 mt-8">
            <motion.button
              onClick={handleSkip}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Pular
            </motion.button>
            
            <motion.button
              onClick={handleNext}
              disabled={
                (etapaAtual === 0 && !dados.nome) ||
                (etapaAtual === 2 && !dados.tipoEvento) ||
                (etapaAtual === 3 && !dados.vendeIngressoAntecipado)
              }
              className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold py-3 px-6 rounded-xl transition-all disabled:cursor-not-allowed"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center justify-center gap-2">
                {etapaAtual === 3 ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Finalizar
                  </>
                ) : (
                  <>
                    Próximo
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </div>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FormularioCaptura;
