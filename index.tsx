
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { dbService } from './services/db';

const initApp = async () => {
  // DB 초기화 대기 (localStorage 데이터 준비)
  await dbService.init();

  const rootElement = document.getElementById('root');
  if (!rootElement) {
    throw new Error("Could not find root element to mount to");
  }

  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

initApp();
