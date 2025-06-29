import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import { MedicalProvider } from './contexts/MedicalContext.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <MedicalProvider>
        <App />
      </MedicalProvider>
    </BrowserRouter>
  </React.StrictMode>
);