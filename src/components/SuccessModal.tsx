import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { CheckCircle, RotateCcw, Zap, Star, Trophy, Crown, Sparkles, Users, TrendingUp, Target, Gift } from 'lucide-react';

interface SuccessModalProps {
  onRestart: () => void;
  isVisible: boolean;
  neuralResults?: {
    profile: {
      name: string;
      title: string;
      description: string;
      color: string;
      personality: string;
      traits?: string[];
    };
    insights: any[];
    metrics: any;
    achievements: string[];
  };
}

export default function SuccessModal({ onRestart, isVisible, neuralResults }: SuccessModalProps) {
  console.log('🔍 SuccessModal Debug:', { 
    isVisible, 
    hasNeuralResults: !!neuralResults,
    neuralResults 
  });

  if (!isVisible) {
    console.log('❌ SuccessModal not visible');
    return null;
  }

  console.log('✅ SuccessModal should be visible');

  const profile = neuralResults?.profile || null;
  const insights = neuralResults?.insights || [];
  const achievements = neuralResults?.achievements || [];

  console.log('📊 SuccessModal data parsed:', { 
    hasProfile: !!profile, 
    profileTitle: profile?.title,
    insightsCount: insights.length, 
    achievementsCount: achievements.length 
  });

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-8 max-w-2xl w-full">
        <h1 className="text-4xl font-bold text-center mb-6">🎉 SUCESSO!</h1>
        
        <div className="space-y-4">
          <div className="p-4 bg-blue-100 rounded-lg">
            <h3 className="font-bold">Debug Info:</h3>
            <p>Modal Visible: {isVisible ? 'YES' : 'NO'}</p>
            <p>Neural Results: {neuralResults ? 'YES' : 'NO'}</p>
            <p>Profile: {profile ? profile.title || 'No title' : 'No profile'}</p>
            <p>Insights: {insights.length}</p>
            <p>Achievements: {achievements.length}</p>
          </div>
          
          {profile && (
            <div className="p-4 bg-green-100 rounded-lg">
              <h3 className="font-bold">{profile.title}</h3>
              <p>{profile.description}</p>
              <p className="text-sm text-gray-600">{profile.personality}</p>
            </div>
          )}
          
          {insights.length > 0 && (
            <div className="p-4 bg-yellow-100 rounded-lg">
              <h3 className="font-bold">Insights ({insights.length})</h3>
              <ul>
                {insights.slice(0, 3).map((insight, idx) => (
                  <li key={idx} className="text-sm">
                    {insight.icon} {insight.text}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {achievements.length > 0 && (
            <div className="p-4 bg-purple-100 rounded-lg">
              <h3 className="font-bold">Achievements ({achievements.length})</h3>
              <ul>
                {achievements.slice(0, 3).map((achievement, idx) => (
                  <li key={idx} className="text-sm">
                    🏆 {achievement}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        <div className="flex gap-4 mt-6">
          <button 
            onClick={onRestart}
            className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            Nova Análise
          </button>
          <button 
            className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            Ver Detalhes
          </button>
        </div>
      </div>
    </div>
  );
}