import React from 'react';
import "./MainChartPage.css"

const MainChartPage = ({stock_list, share_count, stock_price, removeItem, removeAllItems, message}) =>{
  return (
  	<div>
  		{
  			(message!== '' || stock_list.length > 0) && <p className="message text-danger">{message}</p>
  		}
  		{
  		stock_list.length >0 &&
		<table className="table">
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
	    			<tr key={item.stock}>
		    			<th scope="row">{index+1}</th>
		    			<td>{item.stock}</td>
		    			<td>{item.shares}</td>
		    			<td>Pricee</td>
		    			<td>TOTAL</td>
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
		</table>
		}	
	</div>
  );
}

export default MainChartPage;