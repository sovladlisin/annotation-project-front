import * as React from 'react';
import Login from './components/auth/Login';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Home from './components/layout/Home';
import Workspace from './components/layout/Workspace';
import Header from './components/layout/Header';
import Ontology from './components/redactors/Ontology';
import WindowsManager from './components/windows/WindowsManager';

interface IAppProps {
}

const App: React.FunctionComponent<IAppProps> = (props) => {
  return <Router>
    <Header />
    <WindowsManager />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/editor/text/:pk" component={Workspace} />
      <Route exact path="/ontology" component={Ontology} />
    </Switch>
  </Router>
    ;
};

export default App;
