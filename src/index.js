import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { initAnalytics } from './utils/analytics';

initAnalytics();

const container = document.getElementById('root');
const app = <React.StrictMode><App /></React.StrictMode>;

// Production pages already contain readable HTML. Attach interactions immediately.
if (container.dataset.prerendered === 'true') {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
