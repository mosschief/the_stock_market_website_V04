import React, { Component } from 'react';
import Registration from './components/Registration/Registration'
import Home from './components/Home/Home'
import Particles from 'react-particles-js';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import NavHeader from './components/NavHeader/NavHeader'
import "react-bootstrap";
import "./App.css";


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

class App extends Component {
  constructor(){
  	super();
  	this.state={
  		input:'',
  		route:'Registration'
  	}
  }


  render() {
    return <Router>
        <div>
          <Particles className="particles" params={particlesOptions} />
          <NavHeader/>
          <Route exact={true} path="/" component={Home} />
          <Route exact={true} path="/login" component={Registration} />
          <Route exact={true} path="/signup" component={Registration} />
        </div>
      </Router>;
  }
}

export default App;
