import React, {useState, useEffect} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import NavBar from './components/views/NavBar/NavBar'
import MainPage from './components/views/MainPage/MainPage';
import ProjectPage from './components/views/ProjectPage/ProjectPage';

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/" component={MainPage} />

        <Route path="/project" component={ProjectPage} />
      </Switch>
    </Router>
  );
}

export default App;