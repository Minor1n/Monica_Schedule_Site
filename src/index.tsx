import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

export const api = 'http://104.249.40.163:5000'

root.render(
    <App />
);
