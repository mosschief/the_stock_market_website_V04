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
						<th scope="col">#</th>
						<th scope="col">Ticker Symbol</th>
						<th scope="col">Share Count</th>
						<th scope="col">Price</th>
						<th scope="col">Total</th>
					</tr>
				</thead>
				<tbody>
					{
						stock_list.map((item, index) => {
						return(
							<tr key={item.tickerSymbol}>
								<th scope="row">{index+1}</th>
								<td>{item.tickerSymbol}</td>
								<td>{item.shares}</td>
								<td>${item.currentValue}</td>
								<td>${parseInt(item.currentValue * item.shares)}</td>
								<td className="text-right">
									<button onClick={()=> removeItem(item)} type="button" className="btn btn-default btn-sm">
										REMOVE
									</button>
								</td>
							</tr>
						)
					})
				}
				</tbody>
				<tfoot>
					<tr>
						<td colSpan="2">&nbsp;</td>
						<td className="text-center">
							<button className="btn btn-default btn-sm btn-danger" onClick={removeAllItems}>CLEAR ALL HOLDINGS FROM LIST</button>
						</td>
					</tr>
				</tfoot>
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