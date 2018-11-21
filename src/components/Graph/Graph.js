import React from 'react';
import "./Graph.css"
import {Line} from 'react-chartjs-2';
import axios from 'axios';
import socketIOClient from 'socket.io-client';
import {Button, Jumbotron, DropdownButton, Dropdown, MenuItem} from 'react-bootstrap'

export default class Graph extends React.Component {

	constructor(props){
		super(props);

		this.state = {
				stock_list: [],
				current_ticker: "",
				selection: "",
				chartData: {
						raw: {
							labels: [],
							datasets: [
								{
									label: "Price",
									data: [],
									borderColor: 'green',
									fill: 'false'
								}
							]
						},
						start: '',
						end: ''
				}
			};
		this.getPrices = this.getPrices.bind(this);
		this.processData = this.processData.bind(this);
		this.handleStartChange = this.handleStartChange.bind(this);
		this.handleEndChange = this.handleEndChange.bind(this);
	}

  componentDidMount(){
    var config = {
          headers: {'Authorization': "bearer " + localStorage.getItem('auth-token')}
    };

    axios.get('https://stk-api-server.herokuapp.com/user/stocks/', config)
         .then(res => {
			 var stocks = []
			 this.setState({current_ticker: res.data.stocks[0].tickerSymbol})
			 for(var key in res.data.stocks){
				 stocks.push(res.data.stocks[key].tickerSymbol);
			 }
			this.setState({ stock_list: stocks })
		 })
         .catch(err => console.log(err));
  }

	processData(data){
		var rawData = data['Time Series (Daily)']
		var graphData = {
						raw: {
								labels: [],
								datasets: [
									{
										label: "Price",
										data: [],
										borderColor: 'green',
										fill: 'false'
									}
								]
							  },
							start: '',
							end: ''
						};

		for(var key in rawData){
			graphData.raw.labels.push(key);
			graphData.raw.datasets[0].data.push(rawData[key]["4. close"]);
		}
		graphData.raw.labels.reverse();
		graphData.raw.datasets[0].data.reverse();
		graphData.start = graphData.raw.labels[0];
		graphData.end = graphData.raw.labels[graphData.raw.labels.length - 1];
		return graphData
	}

	getPrices = (e) => {
		const tickerSymbol = e;
		this.setState({current_ticker: tickerSymbol})
		if (tickerSymbol) {
		fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${tickerSymbol}&apikey=3UW9H28YWAJTQPHS`)
			.then(res => res.json())
			.then((data) => {
			  data = this.processData(data);
			  var newData = this.state;
			  newData.chartData = data;
			  newData.selection = tickerSymbol;
			  this.setState(newData);
			})
			.catch(error => console.log(error));
		}
		}

	handleStartChange = (e) => {
		const chartData = this.state;
		chartData.chartData['start'] = e.target.value
		this.setState(chartData);
	}

	handleEndChange = (e) => {
		const chartData = this.state;
		chartData.chartData['end'] = e.target.value
		this.setState(chartData);
	}

	render(){
	var	{ chartData } = this.state;
	console.log(this.state);
		return (

		<div>
		<div className="dropdown">

		<DropdownButton
      bsStyle="default"
      title= {this.state.current_ticker}
      key='1'
      id='stocks'
			onSelect={this.getPrices}
    >
			  {this.state.stock_list.map(function(name, index){
                    return <MenuItem eventKey={ name }>{name}</MenuItem>;
			  })}
		  </DropdownButton>
		</div>

		<div className="chart">

			<Line
				data={chartData.raw}
				options={{
					title: {
						display: true,
						text: this.state.selection
					},
					scales: {
						xAxes: [{
							type: "time",
							time: {
								parser: 'YYYY-MM-DD',
								displayFormats: {
									day: 'YYYY-MM-DD'
								},
								minUnit: 'day',
								min: chartData.start,
								max: chartData.end
							}
						}]
					}
				}}
			/>
			<fieldset>
				<div>
					<label htmlFor="start">Start</label>
					<input type="date" id="start" name="dates" value={ chartData.start } onChange={this.handleStartChange}/>
					<label htmlFor="end">End</label>
					<input type="date" id="end" name="dates" value={ chartData.end } onChange={this.handleEndChange}/>
				</div>
			</fieldset>
		</div>
		</div>
		);
	}
}