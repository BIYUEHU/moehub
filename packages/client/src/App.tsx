import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import Layout from '@/components/Layout'
import routes from './routes'

function App() {
  return (
    <Router>
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<Layout title={route.title} outlet={route.component} isPrivate={route.isPrivate} />}
          />
        ))}
      </Routes>
    </Router>
  )
}

export default App
