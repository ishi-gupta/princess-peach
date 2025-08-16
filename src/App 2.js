import React, { useState } from 'react';
import StartScreen from './components/StartScreen';
import GameMap from './components/GameMap';
import EndScreen from './components/EndScreen';

const App = () => {
  const [gameState, setGameState] = useState('start'); // 'start', 'playing', 'end'

  const handleStartGame = () => {
    setGameState('playing');
  };

  const handleEndGame = () => {
    setGameState('end');
  };

  const handleRestartGame = () => {
    setGameState('start');
  };

  return (
    <div style={{ margin: 0, padding: 0, fontFamily: 'Arial, sans-serif' }}>
      {gameState === 'start' && <StartScreen onStartGame={handleStartGame} />}
      {gameState === 'playing' && <GameMap onEndGame={handleEndGame} />}
      {gameState === 'end' && <EndScreen onRestartGame={handleRestartGame} />}
    </div>
  );
};

export default App;
