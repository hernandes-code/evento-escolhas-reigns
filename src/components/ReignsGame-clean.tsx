import { useState } from 'react';
import LandingPageBilheteria from './LandingPageBilheteria';
import { DesafioProdutor } from './DesafioProdutor';
import { OfertaFinal } from './OfertaFinal';

export default function ReignsGame() {
  const [showLandingPage, setShowLandingPage] = useState(true);
  const [showDesafioProdutor, setShowDesafioProdutor] = useState(false);
  const [showOfertaFinal, setShowOfertaFinal] = useState(false);
  const [desafioResults, setDesafioResults] = useState<any>(null);
  const [playerName, setPlayerName] = useState('Produtor');

  const handleStartGameFromLanding = () => {
    setShowLandingPage(false);
    setShowDesafioProdutor(true);
  };

  const handleDesafioComplete = (results: any) => {
    setDesafioResults(results);
    setShowDesafioProdutor(false);
    setShowOfertaFinal(true);
  };

  // Fluxo: Landing → DesafioProdutor → OfertaFinal
  if (showLandingPage) {
    return <LandingPageBilheteria onStartGame={handleStartGameFromLanding} />;
  }

  if (showDesafioProdutor) {
    return (
      <DesafioProdutor 
        userName={playerName}
        onComplete={handleDesafioComplete}
      />
    );
  }

  if (showOfertaFinal && desafioResults) {
    return <OfertaFinal gameResult={desafioResults} />;
  }

  return null;
}
