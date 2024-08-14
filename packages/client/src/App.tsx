import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import Layout from '@/components/Layout'
import routes from './routes'
import { useDispatch } from 'react-redux'
import useSWR from 'swr'
import { getSettings } from './http'
import { useEffect } from 'react'
import ErrorResult from './components/result/error'
import Loading from './components/Loading'
import { loadSettings } from './store/settingsReducer'
import { getLanguage } from './store/adminReducer'
import store from './store'
import i18n from './i18n'

function App() {
  const language = getLanguage(store.getState())

  i18n.set(language)

  const dispatch = useDispatch()
  const { data, error } = useSWR('/api/settings', getSettings)

  useEffect(() => {
    if (data) dispatch(loadSettings(data))
  }, [data, dispatch])

  if (error) return <ErrorResult />
  if (!data) return <Loading />

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
