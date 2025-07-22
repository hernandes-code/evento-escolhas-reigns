import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Badge } from './ui/badge';
import { Download, Star, Users, Phone, AtSign, Calendar, CheckCircle, AlertCircle, Gift, Zap, TrendingUp, Clock } from 'lucide-react';
import type { LeadData } from '../types/game';
import logo from '../assets/logo.png';

interface LeadFormProps {
  onSubmit: (data: LeadData) => void;
  isVisible: boolean;
  finalScore: number;
}

interface ValidationErrors {
  name?: string;
  whatsapp?: string;
  instagram?: string;
}

export default function LeadForm({ onSubmit, isVisible, finalScore }: LeadFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<LeadData>({
    name: '',
    whatsapp: '',
    instagram: '',
    eventType: '',
    mainChallenge: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutos em segundos
  const formRef = useRef<HTMLDivElement>(null);

  // Timer countdown para urgência
  useEffect(() => {
    if (!isVisible) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isVisible]);

  // Formatação do tempo restante
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Validação em tempo real
  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Nome é obrigatório';
        if (value.trim().length < 2) return 'Nome deve ter pelo menos 2 caracteres';
        if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(value)) return 'Nome deve conter apenas letras';
        break;
      case 'whatsapp':
        if (!value.trim()) return 'WhatsApp é obrigatório';
        const cleanPhone = value.replace(/\D/g, '');
        if (cleanPhone.length < 10) return 'Número inválido (mín. 10 dígitos)';
        if (cleanPhone.length > 11) return 'Número inválido (máx. 11 dígitos)';
        break;
      case 'instagram':
        if (!value.trim()) return 'Instagram é obrigatório';
        if (!value.startsWith('@')) return 'Instagram deve começar com @';
        if (value.length < 2) return 'Instagram muito curto';
        break;
    }
    return undefined;
  };

  // Verificar se o Step 1 é válido
  const isStep1Valid = () => {
    const nameError = validateField('name', formData.name);
    const whatsappError = validateField('whatsapp', formData.whatsapp);
    const instagramError = validateField('instagram', formData.instagram);
    
    return !nameError && !whatsappError && !instagramError;
  };

  // Verificar se o formulário completo é válido
  const isFormComplete = () => {
    return isStep1Valid() && formData.eventType && formData.mainChallenge;
  };

  if (!isVisible) return null;

  const handleInputChange = (field: string, value: string) => {
    // Formatação automática para WhatsApp
    if (field === 'whatsapp') {
      const cleanValue = value.replace(/\D/g, '');
      if (cleanValue.length <= 11) {
        let formattedValue = cleanValue;
        if (cleanValue.length > 0) {
          if (cleanValue.length <= 2) {
            formattedValue = `(${cleanValue}`;
          } else if (cleanValue.length <= 7) {
            formattedValue = `(${cleanValue.slice(0, 2)}) ${cleanValue.slice(2)}`;
          } else {
            formattedValue = `(${cleanValue.slice(0, 2)}) ${cleanValue.slice(2, 7)}-${cleanValue.slice(7)}`;
          }
        }
        value = formattedValue;
      } else {
        return; // Não permite mais de 11 dígitos
      }
    }

    // Formatação automática para Instagram
    if (field === 'instagram' && !value.startsWith('@') && value.length > 0) {
      value = '@' + value;
    }

    setFormData(prev => ({ ...prev, [field]: value }));
    setTouchedFields(prev => new Set(prev).add(field));

    // Validação em tempo real
    const error = validateField(field, value);
    setValidationErrors(prev => ({
      ...prev,
      [field]: error
    }));
  };

  const handleNextStep = () => {
    if (isStep1Valid()) {
      setCurrentStep(2);
      // Scroll suave para o topo do form
      formRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Marcar todos os campos como tocados para mostrar erros
      setTouchedFields(prev => new Set([...prev, 'name', 'whatsapp', 'instagram']));
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(1);
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormComplete()) {
      setTouchedFields(new Set(['name', 'whatsapp', 'instagram']));
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    onSubmit(formData);
    setIsSubmitting(false);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-50"
      >
        <motion.div
          ref={formRef}
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="bg-gradient-to-br from-slate-900 via-slate-800 to-orange-900 border border-orange-400/30 rounded-2xl shadow-2xl p-4 sm:p-6 max-w-lg w-full max-h-[95vh] overflow-y-auto relative"
        >
          
          {/* Timer de urgência */}
          {timeLeft > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-4 right-4 bg-red-500/20 border border-red-400/50 rounded-lg px-3 py-1 flex items-center gap-2 text-xs"
            >
              <Clock className="w-3 h-3 text-red-400" />
              <span className="text-red-300 font-mono font-bold">
                {formatTime(timeLeft)}
              </span>
            </motion.div>
          )}

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-orange-200">
                Etapa {currentStep} de 2
              </span>
              <span className="text-xs text-orange-300">
                {Math.round((currentStep / 2) * 100)}% completo
              </span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
              <motion.div
                className="h-2 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${(currentStep / 2) * 100}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Header dinâmico por step */}
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-center mb-6"
          >
            {currentStep === 1 ? (
              <>
                <div className="mb-4">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 mx-auto bg-gradient-to-r from-orange-400 to-amber-400 rounded-full flex items-center justify-center"
                  >
                    <Gift className="w-8 h-8 text-slate-900" />
                  </motion.div>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400 mb-2">
                  🎉 PARABÉNS, PRODUTOR!
                </h2>
                <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30 rounded-lg p-3 mb-4">
                  <p className="text-green-300 font-bold text-sm">
                    Pontuação: {finalScore}/400 pontos
                  </p>
                  <p className="text-green-200/80 text-xs">
                    Você está entre os TOP produtores! 🏆
                  </p>
                </div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                  className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-400/30 rounded-lg p-4 mb-4"
                >
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <Zap className="w-5 h-5 text-yellow-400" />
                    <span className="font-bold text-orange-200">OFERTA EXCLUSIVA</span>
                    <Zap className="w-5 h-5 text-yellow-400" />
                  </div>
                  <p className="text-sm text-orange-100 leading-relaxed">
                    Receba GRATUITAMENTE o <strong>E-book "Bilheteria Digital Máster"</strong> + 
                    acesso à <strong>Comunidade Exclusiva</strong> de produtores TOP!
                  </p>
                  <div className="flex items-center justify-center gap-4 mt-3 text-xs text-amber-300">
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      <span>3x mais vendas</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      <span>+500 produtores</span>
                    </div>
                  </div>
                </motion.div>
              </>
            ) : (
              <>
                <div className="mb-4">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-16 h-16 mx-auto bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center"
                  >
                    <CheckCircle className="w-8 h-8 text-slate-900" />
                  </motion.div>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-green-300 mb-2">
                  Quase lá! 🎯
                </h2>
                <p className="text-sm text-orange-200/80">
                  Últimos detalhes para personalizar seu e-book
                </p>
              </>
            )}
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence mode="wait">
              {currentStep === 1 ? (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  {/* Nome */}
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium text-orange-200 flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Nome completo
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Como devemos te chamar?"
                      className={`bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-orange-400 focus:ring-orange-400/20 ${
                        touchedFields.has('name') && validationErrors.name
                          ? 'border-red-500 focus:border-red-500'
                          : touchedFields.has('name') && !validationErrors.name
                          ? 'border-green-500'
                          : ''
                      }`}
                      required
                    />
                    <AnimatePresence>
                      {touchedFields.has('name') && validationErrors.name && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="flex items-center gap-2 text-red-400 text-xs"
                        >
                          <AlertCircle className="w-3 h-3" />
                          {validationErrors.name}
                        </motion.div>
                      )}
                      {touchedFields.has('name') && !validationErrors.name && formData.name && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="flex items-center gap-2 text-green-400 text-xs"
                        >
                          <CheckCircle className="w-3 h-3" />
                          Perfeito!
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* WhatsApp */}
                  <div className="space-y-2">
                    <Label htmlFor="whatsapp" className="text-sm font-medium text-orange-200 flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      WhatsApp <span className="text-xs text-amber-300">(para receber o e-book)</span>
                    </Label>
                    <Input
                      id="whatsapp"
                      type="tel"
                      value={formData.whatsapp}
                      onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                      placeholder="(11) 99999-9999"
                      className={`bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-orange-400 focus:ring-orange-400/20 ${
                        touchedFields.has('whatsapp') && validationErrors.whatsapp
                          ? 'border-red-500 focus:border-red-500'
                          : touchedFields.has('whatsapp') && !validationErrors.whatsapp
                          ? 'border-green-500'
                          : ''
                      }`}
                      required
                    />
                    <AnimatePresence>
                      {touchedFields.has('whatsapp') && validationErrors.whatsapp && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="flex items-center gap-2 text-red-400 text-xs"
                        >
                          <AlertCircle className="w-3 h-3" />
                          {validationErrors.whatsapp}
                        </motion.div>
                      )}
                      {touchedFields.has('whatsapp') && !validationErrors.whatsapp && formData.whatsapp && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="flex items-center gap-2 text-green-400 text-xs"
                        >
                          <CheckCircle className="w-3 h-3" />
                          Vamos te enviar por aqui!
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Instagram */}
                  <div className="space-y-2">
                    <Label htmlFor="instagram" className="text-sm font-medium text-orange-200 flex items-center gap-2">
                      <AtSign className="w-4 h-4" />
                      Instagram do seu evento
                    </Label>
                    <Input
                      id="instagram"
                      type="text"
                      value={formData.instagram}
                      onChange={(e) => handleInputChange('instagram', e.target.value)}
                      placeholder="@seueventoaqui"
                      className={`bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-orange-400 focus:ring-orange-400/20 ${
                        touchedFields.has('instagram') && validationErrors.instagram
                          ? 'border-red-500 focus:border-red-500'
                          : touchedFields.has('instagram') && !validationErrors.instagram
                          ? 'border-green-500'
                          : ''
                      }`}
                      required
                    />
                    <AnimatePresence>
                      {touchedFields.has('instagram') && validationErrors.instagram && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="flex items-center gap-2 text-red-400 text-xs"
                        >
                          <AlertCircle className="w-3 h-3" />
                          {validationErrors.instagram}
                        </motion.div>
                      )}
                      {touchedFields.has('instagram') && !validationErrors.instagram && formData.instagram && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="flex items-center gap-2 text-green-400 text-xs"
                        >
                          <CheckCircle className="w-3 h-3" />
                          Vamos seguir vocês!
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <motion.button
                    type="button"
                    onClick={handleNextStep}
                    disabled={!isStep1Valid()}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-4 rounded-xl font-bold transition-all text-base ${
                      isStep1Valid()
                        ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-xl'
                        : 'bg-slate-600/50 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <span>Continuar</span>
                      <Zap className="w-5 h-5" />
                    </div>
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  {/* Tipo de evento */}
                  <div className="space-y-2">
                    <Label htmlFor="eventType" className="text-sm font-medium text-orange-200 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Que tipo de evento você produz?
                    </Label>
                    <Select value={formData.eventType} onValueChange={(value) => handleInputChange('eventType', value)}>
                      <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white focus:border-orange-400">
                        <SelectValue placeholder="Selecione o tipo de evento" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-600">
                        <SelectItem value="show" className="text-white hover:bg-slate-700">Shows/Concertos</SelectItem>
                        <SelectItem value="festa" className="text-white hover:bg-slate-700">Festas</SelectItem>
                        <SelectItem value="festival" className="text-white hover:bg-slate-700">Festivais</SelectItem>
                        <SelectItem value="bar" className="text-white hover:bg-slate-700">Bares</SelectItem>
                        <SelectItem value="balada" className="text-white hover:bg-slate-700">Baladas</SelectItem>
                        <SelectItem value="outros" className="text-white hover:bg-slate-700">Outros</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Maior desafio */}
                  <div className="space-y-2">
                    <Label htmlFor="mainChallenge" className="text-sm font-medium text-orange-200 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Qual seu maior desafio atual?
                    </Label>
                    <Select value={formData.mainChallenge} onValueChange={(value) => handleInputChange('mainChallenge', value)}>
                      <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white focus:border-orange-400">
                        <SelectValue placeholder="Selecione o maior desafio" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-600">
                        <SelectItem value="vendas" className="text-white hover:bg-slate-700">Aumentar vendas de ingressos</SelectItem>
                        <SelectItem value="marketing" className="text-white hover:bg-slate-700">Marketing e divulgação</SelectItem>
                        <SelectItem value="tecnologia" className="text-white hover:bg-slate-700">Soluções tecnológicas</SelectItem>
                        <SelectItem value="organizacao" className="text-white hover:bg-slate-700">Organização e gestão</SelectItem>
                        <SelectItem value="custos" className="text-white hover:bg-slate-700">Controle de custos</SelectItem>
                        <SelectItem value="publico" className="text-white hover:bg-slate-700">Atrair mais público</SelectItem>
                        <SelectItem value="outros" className="text-white hover:bg-slate-700">Outros</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex gap-3">
                    <motion.button
                      type="button"
                      onClick={handlePrevStep}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 py-3 bg-slate-600/50 hover:bg-slate-600/70 text-white rounded-xl font-medium transition-all"
                    >
                      Voltar
                    </motion.button>
                    
                    <motion.button
                      type="submit"
                      disabled={!isFormComplete() || isSubmitting}
                      whileHover={{ scale: isFormComplete() ? 1.02 : 1 }}
                      whileTap={{ scale: isFormComplete() ? 0.98 : 1 }}
                      className={`flex-[2] py-4 rounded-xl font-bold text-base transition-all ${
                        isFormComplete() && !isSubmitting
                          ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-xl relative overflow-hidden'
                          : 'bg-slate-600/50 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      {isFormComplete() && !isSubmitting && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                          animate={{ x: ['-100%', '100%'] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        />
                      )}
                      <div className="relative flex items-center justify-center gap-2">
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Enviando...
                          </>
                        ) : (
                          <>
                            <Gift className="w-5 h-5" />
                            RECEBER E-BOOK GRÁTIS
                          </>
                        )}
                      </div>
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>

          {/* Segurança e benefícios */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-6 space-y-3"
          >
            <div className="text-center text-xs text-slate-400 flex items-center justify-center gap-2">
              <span className="text-green-400">🔒</span>
              Seus dados estão 100% seguros. Enviamos apenas conteúdo valioso!
            </div>
            
            <div className="bg-gradient-to-r from-orange-500/5 to-amber-500/5 border border-orange-400/20 rounded-lg p-3">
              <div className="grid grid-cols-2 gap-3 text-xs text-orange-200/80">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>E-book exclusivo</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Comunidade VIP</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Dicas semanais</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Suporte direto</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
