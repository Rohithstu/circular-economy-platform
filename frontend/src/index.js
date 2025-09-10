// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// ⬇️ Change this line
import App from './App';   // It works with App.jsx too (no need to add extension)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
