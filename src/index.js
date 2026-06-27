import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

function hideSplash() {
  const el = document.getElementById('splash');
  if (!el) return;
  el.classList.add('out');
  setTimeout(() => el.remove(), 650);
}

// Wait for the icon font to be ready before first render so icons are never blank.
// Hard cap of 4 s so visitors in countries where Google/CDNs are blocked
// are never stranded on the splash screen indefinitely.
// Text fonts (Noto Serif / Manrope) are loaded async and don't block this.
Promise.race([
  document.fonts.ready,
  new Promise((resolve) => setTimeout(resolve, 4000)),
]).then(() => {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  // Let React paint its first frame, then fade the splash out
  requestAnimationFrame(() => requestAnimationFrame(hideSplash));
});
