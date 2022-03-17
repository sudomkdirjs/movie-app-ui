import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Layout from './pages/Layout';

import { routes } from './routes';

import './styles/App.css';

function App() {
  return (
    <Router>
      <Switch>
        {routes.map((route) => (
          <Route exact={route.exact} path={route.path}>
            <Layout>{route.component}</Layout>
          </Route>
        ))}
      </Switch>
    </Router>
  );
}

export default App;
