import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Registration from './components/Registration/Registration';
import Home from './components/Home/Home';
import Graph from './components/Graph/Graph';
import Particles from 'react-particles-js';
import NavHeader from './components/NavHeader/NavHeader';
import History from './components/History/History';
import Login from './components/Login/Login'
import Portfolio from './components/Portfolio/Portfolio';
import ProtectedRoutes from './components/Protected'
import "./App.css";

//For the Particles background
const particlesOptions={
	particles: {
		number:{
			value: 40,
			density:{
				enable: true,
				value_area: 800
			}
		}
	}
}
//state
class App extends Component {

  constructor(props){
  	super(props);
  }

  render() {
    return (
       <Router>
         <div>
            <Particles className="particles" params={particlesOptions} />
            <NavHeader/>
            <Route exact={true} path="/" component={Home} />
            <Route exact={true} path="/login" component={Login} />
            <Route exact={true} path="/signup" component={Registration} />
            <ProtectedRoutes/>
          </div>
       </Router>
    );
  }
}

export default App;