import React, { Component } from 'react';
import Registration from './components/Registration/Registration'
import Home from './components/Home/Home'
import Graph from './components/Graph/Graph';
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
  		route:'Registration',
		chartData: {
				raw: {				
					labels: ['08-23-2017', '08-24-2017', '08-25-2017', '08-26-2017', '08-27-2017', '08-28-2017'],
					datasets: [
						{
							label: "Price",
							data:[
								251.32,
								258.32,
								150.22,
								210.31,
								213.33,
								251.21,
							],
							 borderColor: 'green',
							 fill: 'false'
						}
					]
				},
				start: '08-23-2017',
				end: '08-28-2017'
		}
  	}
  }
	handleStartChange = (e) => {
		var data = this.state;
		data['chartData']['start'] = e.target.value 
		this.setState(data);
	}

	handleEndChange = (e) => {
		var data = this.state;
		data['chartData']['end'] = e.target.value 
		this.setState(data);
	}


  render() {
    return <Router>
        <div>
          <Particles className="particles" params={particlesOptions} />
          <NavHeader/>
          <Route exact={true} path="/" component={Home} />
          <Route exact={true} path="/login" component={Registration} />
          <Route exact={true} path="/signup" component={Registration} />
		  <Route exact={true} path="/graph" 
			render={(props) => <Graph data={this.state.chartData}/>}
		  />
        </div>
      </Router>;
	}
 }


export default App;
