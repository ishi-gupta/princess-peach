import React, { useEffect } from 'react';

// Background Effects Component - stays active during gameplay
const BackgroundEffects = ({ clouds = [] }) => {
  const styles = {
    bamboo: {
      position: 'absolute',
      left: '50px',
      bottom: '100px',
      width: '100px',
      height: 'auto',
      zIndex: 5
    },
    cherryBlossomsTop: {
      position: 'absolute',
      right: '0px',
      top: '30px',
      width: '200px',
      height: 'auto',
      zIndex: 5,
      animation: 'sway 3s ease-in-out infinite'
    },
    lantern: {
      position: 'absolute',
      left: '300px',
      top: '0px',
      width: '100px',
      height: 'auto',
      zIndex: 5,
      animation: 'sway 4s ease-in-out infinite reverse',
      filter: 'drop-shadow(0 0 8px rgba(255, 0, 0, 0.6))'
    },
    lantern2: {
      position: 'absolute',
      left: '150px',
      top: '0px',
      width: '80px',
      height: 'auto',
      zIndex: 5,
      animation: 'sway 3s ease-in-out infinite',
      filter: 'drop-shadow(0 0 8px rgba(255, 0, 0, 0.6))'
    },
    grassFloor: {
      position: 'absolute',
      bottom: '0',
      left: '0',
      width: '100%',
      height: 'auto',
      zIndex: 8
    },
    cloud: {
      position: 'absolute',
      left: '-100px',
      zIndex: 3,
      animation: 'floatCloud linear infinite'
    }
  };

  return (
    <>
      {/* Randomly generated floating clouds */}
      {clouds.map(cloud => (
        <img 
          key={cloud.id}
          src={cloud.src}
          alt="Cloud"
          style={{
            ...styles.cloud,
            top: `${cloud.top}px`,
            width: `${cloud.size}px`,
            height: 'auto',
            animation: `floatCloud ${cloud.duration}s linear infinite`,
            animationDelay: `${cloud.delay}s`
          }}
        />
      ))}
      
      {/* Bamboo on the left */}
      <img 
        src="/assets/sprites/bamboo.png" 
        alt="Bamboo" 
        style={styles.bamboo}
      />
      
      {/* Lanterns on the left */}
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
      
      {/* Cherry blossoms on the top right */}
      <img 
        src="/assets/sprites/cherryblossom-sky.png" 
        alt="Cherry Blossoms Top" 
        style={styles.cherryBlossomsTop}
      />
      
      {/* Grass floor at the bottom */}
      <img 
        src="/backgrounds/grass-floor.png" 
        alt="Grass Floor" 
        style={styles.grassFloor}
      />
    </>
  );
};

// UI Elements Component - disappears when game starts
const StartScreenUI = ({ onStartGame }) => {
  const styles = {
    titleContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      zIndex: 10,
      position: 'relative'
    },
    superIshitaLogo: {
      width: '800px',
      height: 'auto',
      marginBottom: '15px',
      animation: 'bounceGlow 2s ease-in-out infinite',
      filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.3))'
    },
    shanghaiAdventureLogo: {
      width: '300px',
      height: 'auto',
      marginBottom: '30px',
      filter: 'drop-shadow(0 0 12px rgba(255, 255, 0, 0.8))',
      animation: 'glow 3s ease-in-out infinite'
    },
    clickPrompt: {
      fontSize: '24px',
      color: 'white',
      fontFamily: 'PixelEmulator, monospace',
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
      animation: 'pulse 2s ease-in-out infinite',
      cursor: 'pointer',
      userSelect: 'none',
      zIndex: 15
    }
  };

  return (
    <div style={styles.titleContainer}>
      {/* SUPER ISHITA BROs logo */}
      <img 
        src="/assets/sprites/super-ishita.png" 
        alt="SUPER ISHITA BROs" 
        style={styles.superIshitaLogo}
      />
      
      {/* SHANGHAI ADVENTURE logo */}
      <img 
        src="/assets/sprites/shanghai-adventure.png" 
        alt="SHANGHAI ADVENTURE" 
        style={styles.shanghaiAdventureLogo}
      />
      
      {/* Click anywhere to start prompt */}
      <div style={styles.clickPrompt}>
        CLICK ANYWHERE TO START
      </div>
    </div>
  );
};

// Main StartScreen Component
const StartScreen = ({ onStartGame, showUI = true, clouds = [] }) => {
  const styles = {
    container: {
      width: '100vw',
      height: '100vh',
      backgroundImage: 'url(/backgrounds/tileable-background-skyline.png)',
      backgroundSize: 'auto 100%',
      backgroundPosition: 'left center',
      backgroundRepeat: 'repeat-x',
      position: 'relative',
      margin: 0,
      padding: 0,
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: showUI ? 'pointer' : 'default'
    }
  };

  // Add CSS animations and font to the document
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @font-face {
        font-family: 'PixelEmulator';
        src: url('/assets/fonts/PixelEmulator-xq08.ttf') format('truetype');
        font-weight: normal;
        font-style: normal;
      }
      
      @keyframes bounceGlow {
        0%, 100% {
          transform: translateY(0px);
          filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.3));
        }
        50% {
          transform: translateY(-10px);
          filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.6));
        }
      }
      
      @keyframes glow {
        0%, 100% {
          filter: drop-shadow(0 0 12px rgba(255, 255, 0, 0.8));
        }
        50% {
          filter: drop-shadow(0 0 20px rgba(255, 255, 0, 1));
        }
      }
      
      @keyframes pulse {
        0%, 100% {
          opacity: 1;
          transform: scale(1);
        }
        50% {
          opacity: 0.7;
          transform: scale(1.05);
        }
      }
      
      @keyframes sway {
        0%, 100% {
          transform: rotate(-2deg);
        }
        50% {
          transform: rotate(2deg);
        }
      }
      
      @keyframes floatCloud {
        0% {
          transform: translateX(-100px);
        }
        100% {
          transform: translateX(calc(100vw + 100px));
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handleClick = () => {
    if (showUI) {
      onStartGame();
    }
  };

  return (
    <div style={styles.container} onClick={handleClick}>
      {/* Background effects - always active */}
      <BackgroundEffects clouds={clouds} />
      
      {/* UI elements - only show when showUI is true */}
      {showUI && <StartScreenUI onStartGame={onStartGame} />}
    </div>
  );
};

export default StartScreen;
