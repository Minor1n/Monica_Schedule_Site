import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { initInitData } from '@telegram-apps/sdk';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const initData = initInitData();
export const api = 'https://api.minorin.ru'
export const userId = initData?.user?.id || 0


root.render(
    <App />
);
