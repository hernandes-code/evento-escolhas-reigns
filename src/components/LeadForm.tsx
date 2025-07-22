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
  neuralResults?: {
    profile: {
      name: string;
      title: string;
      description: string;
      color: string;
      personality: string;
    };
    insights: any[];
    metrics: any;
    achievements?: string[];
  };
}

interface ValidationErrors {
  name?: string;
  whatsapp?: string;
  instagram?: string;
}

export default function LeadForm({ onSubmit, isVisible, finalScore, neuralResults }: LeadFormProps) {
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
        className="fixed inset-0 bg-gradient-to-br from-slate-900/95 via-slate-800/90 to-slate-900/95 backdrop-blur-xl flex items-center justify-center p-2 sm:p-4 z-50"
      >
        <motion.div
          ref={formRef}
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="bg-gradient-to-br from-white via-gray-50/95 to-white border-2 border-gray-200/50 rounded-3xl shadow-[0_32px_64px_-12px_rgba(0,0,0,0.25)] backdrop-blur-sm p-6 sm:p-8 max-w-lg w-full max-h-[95vh] overflow-y-auto relative overflow-hidden"
        >
          
          {/* Efeito de glassmorphism sutil */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50/30 via-transparent to-rose-50/20 rounded-3xl"></div>
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-200/50 to-transparent"></div>
          
          {/* Timer de urgência premium */}
          {timeLeft > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-6 right-6 bg-gradient-to-r from-orange-500/90 to-red-500/90 backdrop-blur-sm text-white px-4 py-2 rounded-2xl shadow-lg border border-orange-300/30"
            >
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Clock className="w-4 h-4 animate-pulse" />
                <span className="font-mono tracking-wider">
                  {formatTime(timeLeft)}
                </span>
              </div>
            </motion.div>
          )}

          {/* Progress Bar Premium */}
          <div className="relative mb-8">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-semibold text-slate-700">
                Etapa {currentStep} de 2
              </span>
              <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                {Math.round((currentStep / 2) * 100)}% completo
              </span>
            </div>
            <div className="relative w-full bg-slate-200 rounded-full h-3 overflow-hidden shadow-inner">
              <motion.div
                className="h-full bg-gradient-to-r from-orange-400 via-orange-500 to-red-500 rounded-full shadow-sm relative overflow-hidden"
                initial={{ width: "0%" }}
                animate={{ width: `${(currentStep / 2) * 100}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-transparent animate-pulse"></div>
              </motion.div>
            </div>
          </div>

          {/* Header dinâmico por step */}
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-center mb-8 relative z-10"
          >
            {currentStep === 1 ? (
              <>
                <div className="mb-6">
                  <motion.div
                    animate={{ 
                      rotate: [0, 360],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                      scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                    }}
                    className="w-24 h-24 mx-auto bg-gradient-to-br from-orange-400 via-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-[0_16px_64px_rgba(251,146,60,0.4)] relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-full"></div>
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      🧠
                    </motion.div>
                  </motion.div>
                </div>
                
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-slate-800 via-orange-600 to-red-600 mb-4 leading-tight"
                >
                  🎉 ANÁLISE NEURAL<br />FINALIZADA!
                </motion.h1>

                {/* Neural Profile Display */}
                {neuralResults?.profile && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-gradient-to-br from-white/90 via-orange-50/80 to-white/90 backdrop-blur-sm border border-orange-200/50 rounded-2xl p-6 mb-6 shadow-lg relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-400/50 to-transparent"></div>
                    
                    <div className="text-center mb-4">
                      <div className={`inline-block px-4 py-2 rounded-full text-white font-bold text-lg bg-gradient-to-r ${neuralResults.profile.color} shadow-lg mb-3`}>
                        {neuralResults.profile.title}
                      </div>
                      <p className="text-slate-700 font-medium mb-2">{neuralResults.profile.description}</p>
                      <p className="text-sm text-slate-600">
                        <strong>Personalidade:</strong> {neuralResults.profile.personality}
                      </p>
                    </div>

                    {/* Quick insights preview */}
                    {neuralResults.insights && neuralResults.insights.length > 0 && (
                      <div className="bg-gradient-to-r from-green-50/80 to-emerald-50/80 backdrop-blur-sm border border-green-200/30 rounded-xl p-4 mb-4">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <span className="text-green-600 text-sm font-bold uppercase tracking-wide">
                            💡 {neuralResults.insights[0].category}
                          </span>
                        </div>
                        <p className="text-slate-700 font-medium text-center text-sm">
                          {neuralResults.insights[0].icon} {neuralResults.insights[0].text}
                        </p>
                      </div>
                    )}

                    {/* Metrics visualization */}
                    {neuralResults.metrics && (
                      <div className="grid grid-cols-4 gap-2 mb-4">
                        {Object.entries(neuralResults.metrics).map(([key, value]: [string, any]) => (
                          <div key={key} className="text-center">
                            <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md ${
                              value >= 70 ? 'bg-gradient-to-br from-green-400 to-green-600' :
                              value >= 50 ? 'bg-gradient-to-br from-orange-400 to-orange-600' :
                              'bg-gradient-to-br from-gray-400 to-gray-600'
                            }`}>
                              {Math.round(value)}%
                            </div>
                            <p className="text-xs text-slate-600 mt-1 capitalize">{key}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}

                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                  className="bg-gradient-to-br from-white/80 via-orange-50/50 to-white/80 backdrop-blur-sm border border-orange-200/30 rounded-2xl p-6 mb-4 shadow-lg relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-300/50 to-transparent"></div>
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <Zap className="w-6 h-6 text-orange-500" />
                    <span className="font-bold text-slate-800 text-xl">RECOMPENSA DESBLOQUEADA</span>
                    <Zap className="w-6 h-6 text-orange-500" />
                  </div>
                  <p className="text-slate-700 leading-relaxed mb-4 text-lg">
                    Sua análise neural qualificou você para receber <strong className="text-slate-800">GRATUITAMENTE</strong>:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-3 bg-white/60 rounded-xl p-3 border border-orange-200/30">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center shadow-md text-xl">
                        📚
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 text-sm">E-book "Bilheteria Digital Master"</p>
                        <p className="text-xs text-slate-600">Personalizado para {neuralResults?.profile?.name || 'seu perfil'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-white/60 rounded-xl p-3 border border-orange-200/30">
                      <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-600 rounded-xl flex items-center justify-center shadow-md text-xl">
                        👥
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 text-sm">Comunidade Exclusiva VIP</p>
                        <p className="text-xs text-slate-600">+500 produtores conectados</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-6 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-orange-500" />
                      <span className="font-medium">3x mais vendas</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-orange-500" />
                      <span className="font-medium">Suporte 24/7</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Gift className="w-4 h-4 text-orange-500" />
                      <span className="font-medium">100% gratuito</span>
                    </div>
                  </div>
                </motion.div>

                {/* Urgency amplifier */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="bg-gradient-to-r from-red-500/10 to-orange-500/10 backdrop-blur-sm border border-red-300/30 rounded-xl p-4 mb-4"
                >
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Clock className="w-5 h-5 text-red-600" />
                    <span className="font-bold text-red-700 text-sm uppercase tracking-wide">
                      OFERTA POR TEMPO LIMITADO
                    </span>
                  </div>
                  <p className="text-slate-700 text-center text-sm">
                    Esta análise neural personalizada + recompensas ficam disponíveis apenas por <strong className="text-red-600">{formatTime(timeLeft)}</strong>
                  </p>
                </motion.div>
              </>
            ) : (
              <>
                <div className="mb-6">
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-20 h-20 mx-auto bg-gradient-to-br from-green-400 via-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-[0_8px_32px_rgba(34,197,94,0.3)] relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-full"></div>
                    <CheckCircle className="w-10 h-10 text-white relative z-10" />
                  </motion.div>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-3">
                  Última etapa! 🎯
                </h2>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Personalize seu e-book com base na sua análise neural
                </p>

                {/* Current profile reminder */}
                {neuralResults?.profile && (
                  <div className="bg-gradient-to-r from-green-50/80 to-emerald-50/80 backdrop-blur-sm border border-green-200/30 rounded-xl p-4 mb-4">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-green-600 text-sm font-bold">
                        📋 Personalizando para: {neuralResults.profile.name}
                      </span>
                    </div>
                    <p className="text-slate-700 text-center text-sm">
                      Conteúdo específico para {neuralResults.profile.personality.toLowerCase()}
                    </p>
                  </div>
                )}
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
                  <div className="space-y-3">
                    <Label htmlFor="name" className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                      <Users className="w-4 h-4 text-orange-500" />
                      Nome completo
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Como devemos te chamar?"
                      className={`bg-white/80 backdrop-blur-sm border-2 border-gray-200/60 text-slate-800 placeholder:text-slate-400 focus:border-orange-400 focus:ring-4 focus:ring-orange-100 rounded-xl px-4 py-3 text-base transition-all duration-200 shadow-sm hover:shadow-md hover:border-orange-300 ${
                        touchedFields.has('name') && validationErrors.name
                          ? 'border-red-400 focus:border-red-400 focus:ring-red-100'
                          : touchedFields.has('name') && !validationErrors.name
                          ? 'border-green-400 focus:border-green-400 focus:ring-green-100'
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
                          className="flex items-center gap-2 text-red-600 text-sm bg-red-50 px-3 py-2 rounded-lg"
                        >
                          <AlertCircle className="w-4 h-4" />
                          {validationErrors.name}
                        </motion.div>
                      )}
                      {touchedFields.has('name') && !validationErrors.name && formData.name && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="flex items-center gap-2 text-green-600 text-sm bg-green-50 px-3 py-2 rounded-lg"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Perfeito!
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* WhatsApp */}
                  <div className="space-y-3">
                    <Label htmlFor="whatsapp" className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                      <Phone className="w-4 h-4 text-orange-500" />
                      WhatsApp <span className="text-xs font-medium text-orange-600 bg-orange-50 px-2 py-1 rounded-full">(para receber o e-book)</span>
                    </Label>
                    <Input
                      id="whatsapp"
                      type="tel"
                      value={formData.whatsapp}
                      onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                      placeholder="(11) 99999-9999"
                      className={`bg-white/80 backdrop-blur-sm border-2 border-gray-200/60 text-slate-800 placeholder:text-slate-400 focus:border-orange-400 focus:ring-4 focus:ring-orange-100 rounded-xl px-4 py-3 text-base transition-all duration-200 shadow-sm hover:shadow-md hover:border-orange-300 ${
                        touchedFields.has('whatsapp') && validationErrors.whatsapp
                          ? 'border-red-400 focus:border-red-400 focus:ring-red-100'
                          : touchedFields.has('whatsapp') && !validationErrors.whatsapp
                          ? 'border-green-400 focus:border-green-400 focus:ring-green-100'
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
                          className="flex items-center gap-2 text-red-600 text-sm bg-red-50 px-3 py-2 rounded-lg"
                        >
                          <AlertCircle className="w-4 h-4" />
                          {validationErrors.whatsapp}
                        </motion.div>
                      )}
                      {touchedFields.has('whatsapp') && !validationErrors.whatsapp && formData.whatsapp && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="flex items-center gap-2 text-green-600 text-sm bg-green-50 px-3 py-2 rounded-lg"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Vamos te enviar por aqui!
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Instagram */}
                  <div className="space-y-3">
                    <Label htmlFor="instagram" className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                      <AtSign className="w-4 h-4 text-orange-500" />
                      Instagram do seu evento
                    </Label>
                    <Input
                      id="instagram"
                      type="text"
                      value={formData.instagram}
                      onChange={(e) => handleInputChange('instagram', e.target.value)}
                      placeholder="@seueventoaqui"
                      className={`bg-white/80 backdrop-blur-sm border-2 border-gray-200/60 text-slate-800 placeholder:text-slate-400 focus:border-orange-400 focus:ring-4 focus:ring-orange-100 rounded-xl px-4 py-3 text-base transition-all duration-200 shadow-sm hover:shadow-md hover:border-orange-300 ${
                        touchedFields.has('instagram') && validationErrors.instagram
                          ? 'border-red-400 focus:border-red-400 focus:ring-red-100'
                          : touchedFields.has('instagram') && !validationErrors.instagram
                          ? 'border-green-400 focus:border-green-400 focus:ring-green-100'
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
                          className="flex items-center gap-2 text-red-600 text-sm bg-red-50 px-3 py-2 rounded-lg"
                        >
                          <AlertCircle className="w-4 h-4" />
                          {validationErrors.instagram}
                        </motion.div>
                      )}
                      {touchedFields.has('instagram') && !validationErrors.instagram && formData.instagram && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="flex items-center gap-2 text-green-600 text-sm bg-green-50 px-3 py-2 rounded-lg"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Vamos seguir vocês!
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <motion.button
                    type="button"
                    onClick={handleNextStep}
                    disabled={!isStep1Valid()}
                    whileHover={{ scale: isStep1Valid() ? 1.02 : 1 }}
                    whileTap={{ scale: isStep1Valid() ? 0.98 : 1 }}
                    className={`w-full py-4 px-6 rounded-xl font-bold text-base transition-all duration-200 relative overflow-hidden ${
                      isStep1Valid()
                        ? 'bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 hover:from-orange-600 hover:via-orange-700 hover:to-red-600 text-white shadow-[0_8px_32px_rgba(251,146,60,0.3)] hover:shadow-[0_12px_40px_rgba(251,146,60,0.4)] border-2 border-orange-400/50'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed border-2 border-gray-200'
                    }`}
                  >
                    {isStep1Valid() && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      />
                    )}
                    <div className="relative flex items-center justify-center gap-3">
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
                  <div className="space-y-3">
                    <Label htmlFor="eventType" className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-orange-500" />
                      Que tipo de evento você produz?
                    </Label>
                    <Select value={formData.eventType} onValueChange={(value) => handleInputChange('eventType', value)}>
                      <SelectTrigger className="bg-white/80 backdrop-blur-sm border-2 border-gray-200/60 text-slate-800 focus:border-orange-400 focus:ring-4 focus:ring-orange-100 rounded-xl px-4 py-3 text-base transition-all duration-200 shadow-sm hover:shadow-md hover:border-orange-300">
                        <SelectValue placeholder="Selecione o tipo de evento" />
                      </SelectTrigger>
                      <SelectContent className="bg-white/95 backdrop-blur-sm border-2 border-gray-200/60 rounded-xl shadow-xl">
                        <SelectItem value="show" className="text-slate-800 hover:bg-orange-50 focus:bg-orange-50 rounded-lg">Shows/Concertos</SelectItem>
                        <SelectItem value="festa" className="text-slate-800 hover:bg-orange-50 focus:bg-orange-50 rounded-lg">Festas</SelectItem>
                        <SelectItem value="festival" className="text-slate-800 hover:bg-orange-50 focus:bg-orange-50 rounded-lg">Festivais</SelectItem>
                        <SelectItem value="bar" className="text-slate-800 hover:bg-orange-50 focus:bg-orange-50 rounded-lg">Bares</SelectItem>
                        <SelectItem value="balada" className="text-slate-800 hover:bg-orange-50 focus:bg-orange-50 rounded-lg">Baladas</SelectItem>
                        <SelectItem value="outros" className="text-slate-800 hover:bg-orange-50 focus:bg-orange-50 rounded-lg">Outros</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Maior desafio */}
                  <div className="space-y-3">
                    <Label htmlFor="mainChallenge" className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-orange-500" />
                      Qual seu maior desafio atual?
                    </Label>
                    <Select value={formData.mainChallenge} onValueChange={(value) => handleInputChange('mainChallenge', value)}>
                      <SelectTrigger className="bg-white/80 backdrop-blur-sm border-2 border-gray-200/60 text-slate-800 focus:border-orange-400 focus:ring-4 focus:ring-orange-100 rounded-xl px-4 py-3 text-base transition-all duration-200 shadow-sm hover:shadow-md hover:border-orange-300">
                        <SelectValue placeholder="Selecione o maior desafio" />
                      </SelectTrigger>
                      <SelectContent className="bg-white/95 backdrop-blur-sm border-2 border-gray-200/60 rounded-xl shadow-xl">
                        <SelectItem value="vendas" className="text-slate-800 hover:bg-orange-50 focus:bg-orange-50 rounded-lg">Aumentar vendas de ingressos</SelectItem>
                        <SelectItem value="marketing" className="text-slate-800 hover:bg-orange-50 focus:bg-orange-50 rounded-lg">Marketing e divulgação</SelectItem>
                        <SelectItem value="tecnologia" className="text-slate-800 hover:bg-orange-50 focus:bg-orange-50 rounded-lg">Soluções tecnológicas</SelectItem>
                        <SelectItem value="organizacao" className="text-slate-800 hover:bg-orange-50 focus:bg-orange-50 rounded-lg">Organização e gestão</SelectItem>
                        <SelectItem value="custos" className="text-slate-800 hover:bg-orange-50 focus:bg-orange-50 rounded-lg">Controle de custos</SelectItem>
                        <SelectItem value="publico" className="text-slate-800 hover:bg-orange-50 focus:bg-orange-50 rounded-lg">Atrair mais público</SelectItem>
                        <SelectItem value="outros" className="text-slate-800 hover:bg-orange-50 focus:bg-orange-50 rounded-lg">Outros</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex gap-4 mt-6">
                    <motion.button
                      type="button"
                      onClick={handlePrevStep}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 py-3 px-4 bg-white/80 backdrop-blur-sm hover:bg-gray-50 text-slate-700 border-2 border-gray-200 hover:border-gray-300 rounded-xl font-semibold transition-all duration-200 shadow-sm hover:shadow-md"
                    >
                      Voltar
                    </motion.button>
                    
                    <motion.button
                      type="submit"
                      disabled={!isFormComplete() || isSubmitting}
                      whileHover={{ scale: isFormComplete() && !isSubmitting ? 1.02 : 1 }}
                      whileTap={{ scale: isFormComplete() && !isSubmitting ? 0.98 : 1 }}
                      className={`flex-[2] py-4 px-6 rounded-xl font-bold text-base transition-all duration-200 relative overflow-hidden ${
                        isFormComplete() && !isSubmitting
                          ? 'bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 hover:from-orange-600 hover:via-orange-700 hover:to-red-600 text-white shadow-[0_8px_32px_rgba(251,146,60,0.3)] hover:shadow-[0_12px_40px_rgba(251,146,60,0.4)] border-2 border-orange-400/50'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed border-2 border-gray-200'
                      }`}
                    >
                      {(isFormComplete() && !isSubmitting) && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                          animate={{ x: ['-100%', '100%'] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        />
                      )}
                      <div className="relative flex items-center justify-center gap-3">
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Processando Neural...
                          </>
                        ) : (
                          <>
                            <Gift className="w-5 h-5" />
                            {neuralResults?.profile ? `RECEBER RECOMPENSAS DE ${neuralResults.profile.name.toUpperCase()}` : 'RECEBER E-BOOK GRÁTIS'}
                          </>
                        )}
                      </div>
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>

          {/* Segurança e benefícios premium com insights neurais */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 space-y-4 relative z-10"
          >
            <div className="text-center text-sm text-slate-600 flex items-center justify-center gap-2 bg-green-50/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-green-200/50">
              <span className="text-green-500">🔒</span>
              <span className="font-medium">Seus dados estão 100% seguros. Enviamos apenas conteúdo neural personalizado!</span>
            </div>
            
            {/* Neural-based benefits */}
            <div className="bg-gradient-to-br from-orange-50/80 via-white/50 to-orange-50/80 backdrop-blur-sm border border-orange-200/30 rounded-2xl p-4 shadow-sm">
              {neuralResults?.profile ? (
                <>
                  <div className="text-center mb-4">
                    <span className="inline-block px-3 py-1 bg-gradient-to-r from-orange-400 to-orange-600 text-white text-xs font-bold rounded-full shadow-sm mb-2">
                      CONTEÚDO NEURAL PERSONALIZADO
                    </span>
                    <p className="text-slate-700 text-sm font-medium">
                      Baseado na sua análise como <strong>{neuralResults.profile.name}</strong>
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm text-slate-700">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full shadow-sm"></div>
                      <span className="font-medium">Estratégias para {neuralResults.profile.name.split(' ')[0]}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full shadow-sm"></div>
                      <span className="font-medium">Insights neurais exclusivos</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full shadow-sm"></div>
                      <span className="font-medium">Comunidade do seu perfil</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full shadow-sm"></div>
                      <span className="font-medium">Mentoria especializada</span>
                    </div>
                  </div>
                  
                  {/* Quick insight preview */}
                  {neuralResults.insights && neuralResults.insights.length > 1 && (
                    <div className="mt-4 bg-gradient-to-r from-purple-50/80 to-blue-50/80 backdrop-blur-sm border border-purple-200/30 rounded-xl p-3">
                      <div className="text-center">
                        <p className="text-xs font-bold text-purple-700 uppercase tracking-wide mb-1">
                          💡 Prévia do seu conteúdo neural
                        </p>
                        <p className="text-slate-700 text-sm font-medium">
                          {neuralResults.insights[1].icon} {neuralResults.insights[1].text}
                        </p>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="grid grid-cols-2 gap-4 text-sm text-slate-700">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full shadow-sm"></div>
                    <span className="font-medium">E-book exclusivo</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full shadow-sm"></div>
                    <span className="font-medium">Comunidade VIP</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full shadow-sm"></div>
                    <span className="font-medium">Dicas semanais</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full shadow-sm"></div>
                    <span className="font-medium">Suporte direto</span>
                  </div>
                </div>
              )}
            </div>

            {/* Achievement teaser */}
            {neuralResults?.achievements && neuralResults.achievements.length > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
                className="bg-gradient-to-r from-purple-50/80 to-indigo-50/80 backdrop-blur-sm border border-purple-200/30 rounded-xl p-3"
              >
                <div className="text-center">
                  <p className="text-xs font-bold text-purple-700 uppercase tracking-wide mb-1">
                    🏆 Conquista desbloqueada
                  </p>
                  <p className="text-slate-700 text-sm font-medium">
                    Você desbloqueou <strong>{neuralResults.achievements.length}</strong> conquista{neuralResults.achievements.length > 1 ? 's' : ''} especial{neuralResults.achievements.length > 1 ? 'is' : ''}!
                  </p>
                  <p className="text-xs text-slate-600 mt-1">
                    Acesse todo o conteúdo exclusivo no e-book
                  </p>
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
