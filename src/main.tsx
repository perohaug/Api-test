import { createRoot } from 'react-dom/client';
import { App } from './components/root/App';
import { Router } from './components/router/Router';
import React from 'react';

const container = document.getElementById('root');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
