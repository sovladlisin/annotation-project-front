import * as React from 'react';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Home from './components/layout/Home';
import Workspace from './components/layout/Workspace';
import Header from './components/layout/Header';
import Ontology from './components/redactors/Ontology';
import WindowsManager from './components/windows/WindowsManager';
import AlertContainer from './components/utils/AlertContainer';

interface IAppProps {
}

const App: React.FunctionComponent<IAppProps> = (props) => {
  return <Router>
    <Header />
    <WindowsManager />
    <AlertContainer />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/ontology" component={Ontology} />
      <Route exact path="/workspace/:pk" component={Workspace} />
    </Switch>
  </Router>
    ;
};

export default App;
