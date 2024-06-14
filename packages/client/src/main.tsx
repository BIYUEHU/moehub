import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import 'antd/dist/reset.css';
import 'tailwindcss/tailwind.css';
import 'antd/dist/antd.min.js.LICENSE.txt';
import './styles/index.css';
import { notification } from 'antd';
import App from './App.tsx';

notification.config({
  duration: 3
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);
