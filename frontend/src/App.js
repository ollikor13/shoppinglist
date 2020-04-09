import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from './components/home'
import List from './components/list'


const App = () => {
  const padding = {
    padding: 5
  }

  return (
    <Router>

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/list/:id">
          <List />
        </Route>
      </Switch>

    </Router>
  )
}

export default App;
