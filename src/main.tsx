import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { Theme } from '@radix-ui/themes';
import { BrowserRouter } from 'react-router-dom';
import '@radix-ui/themes/styles.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Theme
        appearance={'dark'}
        hasBackground={false}
        panelBackground={'translucent'}
      >
        <App />
      </Theme>
    </BrowserRouter>
  </React.StrictMode>
);
