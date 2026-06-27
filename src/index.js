import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

function hideSplash() {
  const el = document.getElementById('splash');
  if (!el) return;
  el.classList.add('out');
  setTimeout(() => el.remove(), 750);
}

// Two conditions must BOTH be met before hiding the splash:
//   1. Icon font is ready (or 4 s timeout — unblocks visitors in restricted countries)
//   2. At least 3 seconds have passed so the splash is always visible long enough
Promise.all([
  Promise.race([
    document.fonts.ready,
    new Promise((resolve) => setTimeout(resolve, 4000)),
  ]),
  new Promise((resolve) => setTimeout(resolve, 3000)),
]).then(() => {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  // Let React commit its first frame, then fade the splash out
  requestAnimationFrame(() => requestAnimationFrame(hideSplash));
});
