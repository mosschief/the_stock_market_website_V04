import React from 'react';
import "./Graph.css"
import {Line} from 'react-chartjs-2';
//import { Table } from 'react-bootstrap';


const Graph = ({data, handleEndChange, handleStartChange}) =>{
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
						parser: 'YYYY-MM-DD',
						displayFormats: {
							day: 'YYYY-MM-DD'
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
        <label htmlFor="start">Start</label>
<input type="date" id="start" name="dates" onChange={(e)=> handleStartChange(e)}
				    />
		
		<label htmlFor="end">End</label>
			<input type="date" id="end" name="dates" onChange={(e)=> handleEndChange(e)}
				   / >
    </div>

</fieldset>
	</div>
  );
}

export default Graph;