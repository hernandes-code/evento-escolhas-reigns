import { useState, useEffect, useRef } from 'react';
import { soundGenerator } from '../lib/soundGenerator';

export type SoundType = 
  | 'button-click' 
  | 'choice-positive' 
  | 'choice-negative' 
  | 'game-over' 
  | 'success' 
  | 'notification'
  | 'card-flip'
  | 'badge-unlock';

export const useSound = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [backgroundMusicPlaying, setBackgroundMusicPlaying] = useState(false);
  const backgroundAudioRef = useRef<HTMLAudioElement | null>(null);

  // Inicializar trilha sonora de fundo
  useEffect(() => {
    // Criar trilha sonora corporativa/eventos usando Web Audio API
    const createBackgroundMusic = async () => {
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        
        // Função para tocar trilha ambient corporativa inspirada em eventos
        const playEventAmbientLoop = () => {
          if (isMuted || !audioContext) return;
          
          // Progressão de acordes corporativa/inspiradora (C-Am-F-G)
          const progression = [
            [261.63, 329.63, 392.00], // Dó maior
            [220.00, 261.63, 329.63], // Lá menor
            [174.61, 220.00, 261.63], // Fá maior
            [196.00, 246.94, 293.66], // Sol maior
          ];
          
          progression.forEach((chord, chordIndex) => {
            chord.forEach((freq, noteIndex) => {
              const oscillator = audioContext.createOscillator();
              const gainNode = audioContext.createGain();
              const filterNode = audioContext.createBiquadFilter();
              const reverbGain = audioContext.createGain();
              
              oscillator.connect(filterNode);
              filterNode.connect(gainNode);
              gainNode.connect(reverbGain);
              reverbGain.connect(audioContext.destination);
              
              // Tom suave e corporativo
              oscillator.type = 'sine';
              oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
              
              // Filtro para som mais suave
              filterNode.type = 'lowpass';
              filterNode.frequency.setValueAtTime(1200, audioContext.currentTime);
              filterNode.Q.setValueAtTime(1, audioContext.currentTime);
              
              // Volume muito baixo para ambiente
              const startTime = audioContext.currentTime + (chordIndex * 3);
              const endTime = startTime + 2.8;
              
              gainNode.gain.setValueAtTime(0, startTime);
              gainNode.gain.linearRampToValueAtTime(0.015 + (noteIndex * 0.003), startTime + 0.5);
              gainNode.gain.linearRampToValueAtTime(0.015 + (noteIndex * 0.003), endTime - 0.5);
              gainNode.gain.linearRampToValueAtTime(0, endTime);
              
              // Reverb sutil
              reverbGain.gain.setValueAtTime(0.8, audioContext.currentTime);
              
              oscillator.start(startTime);
              oscillator.stop(endTime);
            });
          });
          
          // Adicionar elementos percussivos sutis (como batida de evento)
          setTimeout(() => {
            if (isMuted || !backgroundMusicPlaying) return;
            
            for (let i = 0; i < 8; i++) {
              const beatTime = audioContext.currentTime + (i * 1.5);
              
              // Kick suave
              const kickOsc = audioContext.createOscillator();
              const kickGain = audioContext.createGain();
              
              kickOsc.connect(kickGain);
              kickGain.connect(audioContext.destination);
              
              kickOsc.type = 'sine';
              kickOsc.frequency.setValueAtTime(60, beatTime);
              kickOsc.frequency.exponentialRampToValueAtTime(30, beatTime + 0.1);
              
              kickGain.gain.setValueAtTime(0.08, beatTime);
              kickGain.gain.exponentialRampToValueAtTime(0.001, beatTime + 0.2);
              
              kickOsc.start(beatTime);
              kickOsc.stop(beatTime + 0.2);
            }
          }, 500);
          
          // Repetir o loop
          if (!isMuted && backgroundMusicPlaying) {
            setTimeout(playEventAmbientLoop, 12000); // 12 segundos por loop
          }
        };
        
        if (!isMuted && backgroundMusicPlaying) {
          playEventAmbientLoop();
        }
      } catch (error) {
        console.warn('Background music not available:', error);
      }
    };

    if (backgroundMusicPlaying) {
      createBackgroundMusic();
    }
  }, [isMuted, backgroundMusicPlaying]);

  const playSound = async (type: SoundType) => {
    if (isMuted) return;
    
    try {
      switch (type) {
        case 'button-click':
          await soundGenerator.playButtonClick();
          break;
        case 'choice-positive':
          await soundGenerator.playChoicePositive();
          break;
        case 'choice-negative':
          await soundGenerator.playChoiceNegative();
          break;
        case 'game-over':
          await soundGenerator.playGameOver();
          break;
        case 'success':
          await soundGenerator.playSuccess();
          break;
        case 'notification':
          await soundGenerator.playNotification();
          break;
        case 'card-flip':
          await soundGenerator.playCardFlip();
          break;
        case 'badge-unlock':
          await soundGenerator.playBadgeUnlock();
          break;
      }
    } catch (error) {
      console.warn('Could not play sound:', error);
    }
  };

  const toggleMute = () => {
    setIsMuted(prev => {
      const newMutedState = !prev;
      if (newMutedState) {
        // Parar música de fundo quando mutado
        setBackgroundMusicPlaying(false);
      }
      return newMutedState;
    });
  };

  // Função para iniciar música de fundo manualmente (após primeira interação do usuário)
  const startBackgroundMusic = () => {
    if (!isMuted && !backgroundMusicPlaying) {
      setBackgroundMusicPlaying(true);
    }
  };

  return {
    playSound,
    isMuted,
    toggleMute,
    startBackgroundMusic,
    backgroundMusicPlaying,
  };
};
