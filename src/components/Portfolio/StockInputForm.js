import React from 'react';
import "./StockInputForm.css";
import {Button, Jumbotron} from 'react-bootstrap';



const StockInputForm = ({addItem, itemEntered, sharesEntered}) =>{
  return (
		<div>
			<form onSubmit={addItem} className="form-inline">
				<div className="form-group">
					<label className="sr-only" htmlFor="newItemInput">Ticker Symbol</label>
					<input ref={itemEntered} type="text" placeholder="Ticker Symbol" className="form-control add-stock-input" id="newItemInput" />
				</div>
				<div className="form-group">
					<label className="sr-only" htmlFor="newItemInput">Shares</label>
					<input ref={sharesEntered} min="0" type="number" placeholder="Shares" className="form-control" id="newItemInput" />
				</div>
				<Button type="submit" className="add-stock-button">Add Stock</Button>
			</form>
		</div>
  );
}

export default StockInputForm;