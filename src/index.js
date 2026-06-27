import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Delay first render until all fonts (including Material Symbols icons) are ready,
// so icons are never shown as squares or blank on the initial paint.
document.fonts.ready.then(() => {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
