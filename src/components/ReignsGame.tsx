import { useState } from 'react';
import LandingPageBilheteria from './LandingPageBilheteria';
import QuizDiagnostico from './QuizDiagnostico';
import { OfertaFinalNova } from './OfertaFinalNova';

export default function ReignsGame() {
  const [showLandingPage, setShowLandingPage] = useState(true);
  const [showQuizDiagnostico, setShowQuizDiagnostico] = useState(false);
  const [showOfertaFinal, setShowOfertaFinal] = useState(false);
  const [quizResults, setQuizResults] = useState<any>(null);

  const handleStartGameFromLanding = () => {
    setShowLandingPage(false);
    setShowQuizDiagnostico(true);
  };

  const handleQuizComplete = (results: any) => {
    setQuizResults(results);
    setShowQuizDiagnostico(false);
    setShowOfertaFinal(true);
  };

  // Fluxo: Landing → QuizDiagnostico → OfertaFinal
  if (showLandingPage) {
    return <LandingPageBilheteria onStartGame={handleStartGameFromLanding} />;
  }

  if (showQuizDiagnostico) {
    return (
      <QuizDiagnostico 
        onComplete={handleQuizComplete}
      />
    );
  }

  if (showOfertaFinal && quizResults) {
    return (
      <OfertaFinalNova 
        gameResult={quizResults}
      />
    );
  }

  return null;
}
