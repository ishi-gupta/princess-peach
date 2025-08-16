import React, { useState, useEffect, useRef } from 'react';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('start');
  const [clouds, setClouds] = useState([]);
  const cloudIntervalRef = useRef(null);

  // Generate a random cloud
  const generateCloud = () => {
    const cloudTypes = ['/assets/sprites/cloud.png', '/assets/sprites/different-cloud.png'];
    const cloudType = cloudTypes[Math.floor(Math.random() * cloudTypes.length)];
    
    const newCloud = {
      id: Date.now() + Math.random(),
      src: cloudType,
      top: Math.random() * 150 + 20,
      size: Math.random() * 60 + 40,
      duration: Math.random() * 20 + 20, // Random duration between 20-40s (slower)
      delay: Math.random() * 5
    };
    
    setClouds(prev => [...prev, newCloud]);
    
    setTimeout(() => {
      setClouds(prev => prev.filter(cloud => cloud.id !== newCloud.id));
    }, (newCloud.duration + newCloud.delay) * 1000);
  };

  // Start cloud generation
  const startCloudGeneration = () => {
    // Clear any existing interval
    if (cloudIntervalRef.current) {
      clearInterval(cloudIntervalRef.current);
    }
    
    // Generate first few clouds immediately
    generateCloud();
    setTimeout(() => generateCloud(), 1000);
    setTimeout(() => generateCloud(), 2000);
    
    // Set up interval for continuous generation
    cloudIntervalRef.current = setInterval(() => {
      generateCloud();
    }, Math.random() * 4000 + 1500); // 1.5-5.5 seconds (more frequent)
  };

  // Stop cloud generation
  const stopCloudGeneration = () => {
    if (cloudIntervalRef.current) {
      clearInterval(cloudIntervalRef.current);
      cloudIntervalRef.current = null;
    }
    setClouds([]); // Clear existing clouds
  };

  // Handle screen changes
  useEffect(() => {
    if (currentScreen === 'game') {
      startCloudGeneration();
    } else {
      stopCloudGeneration();
    }

    // Cleanup on unmount
    return () => {
      if (cloudIntervalRef.current) {
        clearInterval(cloudIntervalRef.current);
      }
    };
  }, [currentScreen]);

  const goToGame = () => {
    setCurrentScreen('game');
  };

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      {/* Always render the background without clouds */}
      <StartScreen onStartGame={goToGame} showUI={false} clouds={[]} />
      
      {/* Overlay the UI only when on start screen */}
      {currentScreen === 'start' && (
        <div style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          zIndex: 20,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <StartScreen onStartGame={goToGame} showUI={true} clouds={[]} />
        </div>
      )}
      
      {/* Show clouds only during gameplay */}
      {currentScreen === 'game' && (
        <div style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          zIndex: 3,
          pointerEvents: 'none'
        }}>
          {clouds.map(cloud => (
            <img 
              key={cloud.id}
              src={cloud.src}
              alt="Cloud"
              style={{
                position: 'absolute',
                left: '-100px',
                top: `${cloud.top}px`,
                width: `${cloud.size}px`,
                height: 'auto',
                zIndex: 3,
                animation: `floatCloud ${cloud.duration}s linear infinite`,
                animationDelay: `${cloud.delay}s`
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
