import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Global CSS reset to remove whitespace
const globalStyles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
  
  #root {
    margin: 0;
    padding: 0;
    width: 100vw;
    height: 100vh;
  }
`;

// Inject global styles
const styleSheet = document.createElement('style');
styleSheet.textContent = globalStyles;
document.head.appendChild(styleSheet);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
