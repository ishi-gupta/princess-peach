import React from 'react';

const GameScreen = () => {
  const styles = {
    container: {
      width: '100vw',
      height: '100vh',
      overflowX: 'auto',
      overflowY: 'hidden',
      scrollBehavior: 'smooth'
    },
    scrollableContent: {
      width: '2000px',
      height: '100vh',
      backgroundImage: 'url(/backgrounds/tileable-background-skyline.png)',
      backgroundSize: 'auto 100%',
      backgroundPosition: 'left center',
      backgroundRepeat: 'repeat-x',
      position: 'relative'
    },
    gameContent: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      textAlign: 'center',
      zIndex: 10
    },
    text: {
      fontSize: '3rem',
      color: '#fff',
      textShadow: '3px 3px 0px #000',
      fontFamily: 'monospace',
      marginBottom: '2rem'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.scrollableContent}>
        {/* Game content overlay */}
        <div style={styles.gameContent}>
          <h1 style={styles.text}>🎮 Game Screen! 🎮</h1>
          <p style={{...styles.text, fontSize: '1.5rem'}}>
            Scroll left and right to explore!
          </p>
        </div>
      </div>
    </div>
  );
};

export default GameScreen;
