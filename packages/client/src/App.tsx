import { useRoutes } from 'react-router-dom';
import layout from './components/layout';
import router from './router';

function App() {
  const outlet = useRoutes(router);

  return <div>{layout(outlet!)}</div>;
}

export default App;
