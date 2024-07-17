import React from 'react'
import ReactDOM from 'react-dom/client'
import 'antd/dist/reset.css'
import 'tailwindcss/tailwind.css'
import 'antd/dist/antd.min.js.LICENSE.txt'
import './styles/index.css'
import { notification } from 'antd'
import App from './App.tsx'

notification.config({
  duration: 2
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
    {/* </HashRouter> */}
  </React.StrictMode>
)
