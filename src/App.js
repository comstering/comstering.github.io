import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import NavBar from './components/views/NavBar/NavBar';
import MainPage from './components/views/MainPage/MainPage';
import AboutPage from './components/views/AboutPage/AboutPage';
import ProjectPage from './components/views/ProjectPage/ProjectPage';
import SkillPage from './components/views/SkillPage/SkillPage';
import ContactPage from './components/views/ContactPage/ContactPage';

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path='/' component={MainPage} />

        <Route path='/about' component={AboutPage} />

        <Route path="/project" component={ProjectPage} />

        <Route path='/skills' component={SkillPage} />

        <Route path='/contact' component={ContactPage} />
      </Switch>
    </Router>
  );
}

export default App;