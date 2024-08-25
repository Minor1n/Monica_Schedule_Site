import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { initInitData } from '@telegram-apps/sdk';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const initData = initInitData();
export const api = 'http://104.249.40.163:5000'
export const userId = initData?.user?.id


root.render(
    <App />
);
