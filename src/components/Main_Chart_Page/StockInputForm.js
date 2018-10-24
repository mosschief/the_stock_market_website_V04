import React from 'react';
import "./StockInputForm.css";
import {Button} from 'react-bootstrap';



const StockInputForm = ({addItem, itemEntered, sharesEntered}) =>{
  return (
  	<div>
		<form onSubmit={addItem} className="form-inline">
			<div className="form-group">
				<label className="sr-only" htmlFor="newItemInput">Ticker Symbol</label>
				<input ref={itemEntered} type="text" placeholder="Ticker Symbol" className="form-control" id="newItemInput" />
			</div>
			<div className="form-group">
				<label className="sr-only" htmlFor="newItemInput">Ticker Symbol</label>
				<input ref={sharesEntered} type="text" placeholder="Ticker Symbol" className="form-control" id="newItemInput" />
			</div>
			<Button type="submit" className="btn btn-primary">Submit</Button>
		</form>
	</div>
  );
}

export default StockInputForm;