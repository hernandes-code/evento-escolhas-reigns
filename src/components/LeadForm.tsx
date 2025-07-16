import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Trophy, User, Phone, Instagram, Calendar } from 'lucide-react';
import type { LeadData } from '../types/game';

interface LeadFormProps {
  onSubmit: (data: LeadData) => void;
  isVisible: boolean;
  finalScore: number;
}

export default function LeadForm({ onSubmit, isVisible, finalScore }: LeadFormProps) {
  const [formData, setFormData] = useState<LeadData>({
    name: '',
    whatsapp: '',
    instagram: '',
    eventType: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isVisible) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onSubmit(formData);
    setIsSubmitting(false);
  };

  const handleInputChange = (field: keyof LeadData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const isFormValid = formData.name && formData.whatsapp && formData.instagram && formData.eventType;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gradient-card rounded-2xl shadow-glow border border-border/20 p-6 max-w-md w-full animate-bounce-in max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="text-center mb-6">
          <div className="mb-4">
            <Trophy className="w-12 h-12 text-warning mx-auto animate-pulse-glow" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Parabéns pelo Desempenho!
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            Sua pontuação: <span className="font-bold text-primary">{finalScore}/400</span>
          </p>
          <p className="text-xs text-muted-foreground">
            Agora que você viu a importância da tecnologia em eventos, que tal conhecer soluções que podem revolucionar seus eventos?
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-foreground">
              <User className="w-4 h-4 inline mr-2" />
              Nome completo
            </Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Seu nome completo"
              className="bg-secondary/30 border-border/30"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="whatsapp" className="text-sm font-medium text-foreground">
              <Phone className="w-4 h-4 inline mr-2" />
              WhatsApp
            </Label>
            <Input
              id="whatsapp"
              type="tel"
              value={formData.whatsapp}
              onChange={(e) => handleInputChange('whatsapp', e.target.value)}
              placeholder="(11) 99999-9999"
              className="bg-secondary/30 border-border/30"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="instagram" className="text-sm font-medium text-foreground">
              <Instagram className="w-4 h-4 inline mr-2" />
              Instagram do evento
            </Label>
            <Input
              id="instagram"
              type="text"
              value={formData.instagram}
              onChange={(e) => handleInputChange('instagram', e.target.value)}
              placeholder="@seueventoaqui"
              className="bg-secondary/30 border-border/30"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="eventType" className="text-sm font-medium text-foreground">
              <Calendar className="w-4 h-4 inline mr-2" />
              Tipo de evento
            </Label>
            <Select value={formData.eventType} onValueChange={(value) => handleInputChange('eventType', value)}>
              <SelectTrigger className="bg-secondary/30 border-border/30">
                <SelectValue placeholder="Selecione o tipo de evento" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border/30">
                <SelectItem value="show">Show/Concerto</SelectItem>
                <SelectItem value="festa">Festa</SelectItem>
                <SelectItem value="corporativo">Evento Corporativo</SelectItem>
                <SelectItem value="casamento">Casamento</SelectItem>
                <SelectItem value="formatura">Formatura</SelectItem>
                <SelectItem value="festival">Festival</SelectItem>
                <SelectItem value="workshop">Workshop/Curso</SelectItem>
                <SelectItem value="outros">Outros</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="pt-4">
            <Button 
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className="w-full bg-gradient-primary hover:opacity-90 text-primary-foreground"
            >
              {isSubmitting ? 'Enviando...' : 'Receber Dicas Exclusivas'}
            </Button>
          </div>
        </form>

        <div className="mt-4 text-xs text-muted-foreground text-center">
          🔒 Seus dados estão seguros e serão usados apenas para enviar dicas sobre eventos
        </div>
      </div>
    </div>
  );
}