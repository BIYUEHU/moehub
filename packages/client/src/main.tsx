import React from 'react'
import ReactDOM from 'react-dom/client'
import 'antd/dist/reset.css'
// import 'tailwindcss/tailwind.css'
import '@/styles/index.css'
import { notification } from 'antd'
import { Provider } from 'react-redux'
import store, { persistor } from '@/store'
import App from '@/App.tsx'
import { PersistGate } from 'redux-persist/integration/react'
import Loading from '@/components/Loading'

notification.config({
  duration: 2
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
)
