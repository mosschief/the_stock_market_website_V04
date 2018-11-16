import React from 'react';
import "./StockChart.css"
import { Table } from 'react-bootstrap';
import { faDivide } from '@fortawesome/free-solid-svg-icons';

const StockChart = ({ stock_list, removeItem, removeAllItems }) =>{
	if(stock_list.length > 0){
		return (
			<div>
			<Table>
				<thead>
					<tr>
						<th>Ticker Symbol</th>
						<th>Share Count</th>
						<th>Price</th>
						<th>Total</th>
					</tr>
				</thead>
				<tbody>
					{
						stock_list.map((item, index) => {
						return(
							<tr key={item.tickerSymbol}>
								<td>{item.tickerSymbol}</td>
								<td>{item.shares}</td>
								<td>${item.currentValue}</td>
								<td>${parseInt(item.currentValue * item.shares)}</td>
								<td className="text-right">
									<button onClick={()=> removeItem(item)} type="button" className="remove-stock-button">
										Remove
									</button>
								</td>
							</tr>
						)
					})
				}
				</tbody>
			</Table>
			<p>Data provided for free by <a href="https://iextrading.com/developer/">IEX</a>. View <a href="https://iextrading.com/api-exhibit-a/">IEX’s Terms of Use</a>.</p>
			</div>
		);
	}
	else{
		return(<div></div>)
	}
}

export default StockChart;