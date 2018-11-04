import React from 'react';
import "./Graph.css"
import {Line} from 'react-chartjs-2';


export default class Graph extends React.Component {

	constructor(props){
		super(props);

		this.state={
			chartData: {
					raw: {
						labels: ['2017-08-23', '2017-08-24', '2017-08-25', '2017-08-26', '2017-08-27', '2017-08-28'],
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
		};
		this.handleEndChange = this.handleEndChange.bind(this);
		this.handleStartChange = this.handleStartChange.bind(this);
	}

	handleStartChange = (e) => {
		const chartData = this.state;
		chartData['start'] = e.target.value
		this.setState(chartData);
	}

	handleEndChange = (e) => {
		const chartData = this.state;
		chartData['end'] = e.target.value
		this.setState(chartData);
	}

	render(){
	const	{ chartData } = this.state;
		return (
		<div className="chart">
			<Line
				data={chartData.raw}
				options={{
					title: {
						display: true,
						text: 'GOOGL'
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
					<input type="date" id="start" name="dates" onChange={this.handleStartChange}/>
					<label htmlFor="end">End</label>
					<input type="date" id="end" name="dates" onChange={this.handleEndChange}/>
				</div>
			</fieldset>
		</div>
		);
	}
}