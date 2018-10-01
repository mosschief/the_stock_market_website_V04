import React, { Component } from 'react';
import './App.css';
import Registration from './components/Registration/Registration.js'
import 'react-bootstrap';
import Particles from 'react-particles-js';


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
    return (
      <div id="App">
      	<Particles className="particles"
      		params={particlesOptions}
      	/>
      	{this.state.route==='Registration' ?
        <Registration/>:
        <div>
        </div>
    	}
      </div>
    );
  }
}

export default App;
