import React from 'react';
import "./Graph.css"
import {Line} from 'react-chartjs-2';
import { Table } from 'react-bootstrap';


const Graph = ({data}) =>{
  return (

  <div className="chart">
	<Line
		data={data.raw}
		options={{
			title: {
				display: true,
				text: 'GOOGL' 
			},
			scales: {
				xAxes: [{
					type: "time",
					time: {
						parser: 'MM-DD-YYYY',
						displayFormats: {
							day: 'MM-DD-YYYY'
						},
						minUnit: 'day',
						min: data.start,
						max: data.end
					}
				}]
			}
		}}
	/>
		<fieldset>
    <div>
        <label for="start">Start</label>
<input type="date" id="start" name="dates" onChange={this.handleStartChange.bind(this)}
				    />
		
		<label for="end">End</label>
			<input type="date" id="end" name="dates" onChange={this.handleEndChange.bind(this)}
				   / >
    </div>

</fieldset>
	</div>
  );
}

export default Graph;