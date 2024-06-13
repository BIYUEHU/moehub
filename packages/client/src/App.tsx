import { useRoutes } from 'react-router-dom';
import Layout from './components/Layout';
import router from './router';

function App() {
  const outlet = useRoutes(router);
  document.title = 'MoeHub';

  return <Layout outlet={outlet!} />;
}

export default App;
