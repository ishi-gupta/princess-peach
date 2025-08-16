import React, { useState, useEffect, useCallback } from 'react';

const GameScreen = () => {
  const [marioPosition, setMarioPosition] = useState({ x: 100, y: 300 });
  const [marioVelocity, setMarioVelocity] = useState({ x: 0, y: 0 });
  const [isJumping, setIsJumping] = useState(false);
  const [screenOffset, setScreenOffset] = useState(0);
  const [keys, setKeys] = useState({});

  const GRAVITY = 0.8;
  const JUMP_FORCE = -15;
  const MOVE_SPEED = 5;
  const GROUND_Y = 300;

  // Handle key presses
  const handleKeyDown = useCallback((e) => {
    setKeys(prev => ({ ...prev, [e.code]: true }));
  }, []);

  const handleKeyUp = useCallback((e) => {
    setKeys(prev => ({ ...prev, [e.code]: false }));
  }, []);

  // Set up keyboard listeners
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  // Game loop
  useEffect(() => {
    const gameLoop = () => {
      setMarioPosition(prev => {
        let newX = prev.x;
        let newY = prev.y;
        let newVelocityX = 0;
        let newVelocityY = prev.y;

        // Handle horizontal movement
        if (keys['ArrowLeft'] || keys['KeyA']) {
          newVelocityX = -MOVE_SPEED;
        }
        if (keys['ArrowRight'] || keys['KeyD']) {
          newVelocityX = MOVE_SPEED;
        }

        // Handle jumping
        if ((keys['ArrowUp'] || keys['KeyW'] || keys['Space']) && !isJumping) {
          newVelocityY = JUMP_FORCE;
          setIsJumping(true);
        }

        // Apply gravity
        newVelocityY += GRAVITY;

        // Update position
        newX += newVelocityX;
        newY += newVelocityY;

        // Ground collision
        if (newY >= GROUND_Y) {
          newY = GROUND_Y;
          newVelocityY = 0;
          setIsJumping(false);
        }

        // Update screen offset for endless scrolling
        if (newX > 400) {
          setScreenOffset(prev => prev + (newX - 400));
          newX = 400;
        } else if (newX < 100) {
          setScreenOffset(prev => prev + (newX - 100));
          newX = 100;
        }

        setMarioVelocity({ x: newVelocityX, y: newVelocityY });
        return { x: newX, y: newY };
      });
    };

    const interval = setInterval(gameLoop, 16); // ~60 FPS
    return () => clearInterval(interval);
  }, [keys, isJumping]);

  const styles = {
    container: {
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      position: 'relative'
    },
    scrollableContent: {
      width: '100vw',
      height: '100vh',
      backgroundImage: 'url(/backgrounds/tileable-background-skyline.png)',
      backgroundSize: 'auto 100%',
      backgroundPosition: `${-screenOffset}px center`,
      backgroundRepeat: 'repeat-x',
      position: 'relative',
      transition: 'background-position 0.1s ease-out'
    },
    bamboo: {
      position: 'absolute',
      left: `${50 - screenOffset}px`,
      bottom: '100px',
      width: '100px',
      height: 'auto',
      zIndex: 5
    },
    cherryBlossomsTop: {
      position: 'absolute',
      right: `${0 - screenOffset}px`,
      top: '30px',
      width: '200px',
      height: 'auto',
      zIndex: 5,
      animation: 'sway 3s ease-in-out infinite'
    },
    lantern: {
      position: 'absolute',
      left: `${300 - screenOffset}px`,
      top: '0px',
      width: '100px',
      height: 'auto',
      zIndex: 5,
      animation: 'sway 4s ease-in-out infinite reverse',
      filter: 'drop-shadow(0 0 8px rgba(255, 0, 0, 0.6))'
    },
    lantern2: {
      position: 'absolute',
      left: `${150 - screenOffset}px`,
      top: '0px',
      width: '80px',
      height: 'auto',
      zIndex: 5,
      animation: 'sway 3s ease-in-out infinite',
      filter: 'drop-shadow(0 0 8px rgba(255, 0, 0, 0.6))'
    },
    mario: {
      position: 'absolute',
      left: `${marioPosition.x}px`,
      bottom: `${marioPosition.y}px`,
      width: '60px',
      height: 'auto',
      zIndex: 20,
      transform: marioVelocity.x < 0 ? 'scaleX(-1)' : 'scaleX(1)',
      transition: 'transform 0.1s ease-out'
    },
    instructions: {
      position: 'absolute',
      top: '20px',
      left: '20px',
      color: 'white',
      fontFamily: 'monospace',
      fontSize: '16px',
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
      zIndex: 25
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.scrollableContent}>
        {/* Decorative elements that scroll with the background */}
        <img 
          src="/assets/sprites/bamboo.png" 
          alt="Bamboo" 
          style={styles.bamboo}
        />
        
        <img 
          src="/assets/sprites/lantern.png" 
          alt="Lantern" 
          style={styles.lantern}
        />
        <img 
          src="/assets/sprites/lantern.png" 
          alt="Lantern 2" 
          style={styles.lantern2}
        />
        
        <img 
          src="/assets/sprites/cherryblossom-sky.png" 
          alt="Cherry Blossoms Top" 
          style={styles.cherryBlossomsTop}
        />
        
        {/* Mario character */}
        <img 
          src="/assets/sprites/mario.png" 
          alt="Mario" 
          style={styles.mario}
        />
      </div>
      
      {/* Instructions */}
      <div style={styles.instructions}>
        <div>Arrow Keys: Move</div>
        <div>Space/Up: Jump</div>
        <div>Screen Offset: {Math.round(screenOffset)}px</div>
      </div>
    </div>
  );
};

export default GameScreen;
