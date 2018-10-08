import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Particles from 'react-particles-js';
import Registration from './components/Registration/Registration';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import History from './components/History/History';
import NavHeader from './components/NavHeader/NavHeader';
import 'react-bootstrap';
import './App.css';


const particlesOptions = {
  particles: {
    number: {
      value: 40,
      density: {
        enable: true,
        value_area: 800,
      },
    },
  },
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      route: 'Registration',
    };
  }

  render() {
    return (
      <Router>
        <div>
          <Particles className="particles" params={particlesOptions} />
          <NavHeader />
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Registration} />
          <Route exact path="/history" component={History} />
        </div>
      </Router>
    );
  }
}

export default App;
