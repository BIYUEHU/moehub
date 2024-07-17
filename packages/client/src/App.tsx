import { HashRouter, Route, Routes } from 'react-router-dom'
import Layout from '@/components/Layout'
import routes from './routes'

function App() {
  return (
    <HashRouter>
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<Layout title={route.title} outlet={route.component} isPrivate={route.isPrivate} />}
          />
        ))}
      </Routes>
    </HashRouter>
  )
}

export default App
