import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './components/home'
import List from './components/list'


const App = () => {

  return (
    <Router>

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/list/:code">
          <List />
        </Route>
      </Switch>

    </Router>
  )
}

export default App;
