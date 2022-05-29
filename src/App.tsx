import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import UniversityPage from './pages/UniversityPage'
import FacultyPage from './pages/FacultyPage'
import FloorPage from './pages/FloorPage';
import PageNotFound from './pages/PageNotFound';
import './styles/index.css';

function App() {
  return (
    <Router basename="/interactive-univ-map">
      <Switch>
        <Route exact path="/" component={ UniversityPage } />
        <Route path="/:facultyId/:floorId" component={ FloorPage } />
        <Route path="/:facultyId" component={ FacultyPage } />
        <Route exact path="/404-page-not-found" component={ PageNotFound } />
      </Switch>
    </Router>
  );
}

export default App;
