import React from 'react';
import socketIOClient from 'socket.io-client';
import axios from 'axios';

import StockChart from './StockChart'
import StockInputForm from './StockInputForm';

const socket = socketIOClient('https://ws-api.iextrading.com/1.0/tops');

export default class Portfolio extends React.Component {

  constructor(props){
    super(props)
    this.state = {
        stock_list: [],
        message: '',
    }
  }

  componentDidMount(){
    var config = {
          headers: {'Authorization': "bearer " + localStorage.getItem('auth-token')}
    };

    axios.get('https://stk-api-server.herokuapp.com/user/stocks/', config)
         .then(res => this.setState({ stock_list: res.data.stocks }))
         .then(() => {
            let stock_arr = this.state.stock_list.map(stock => stock.tickerSymbol.toLowerCase())
            let stock_list_string = stock_arr.join()

            // Connect to the channel
            socket.on('connect', () => {

              // Subscribe to stocks that user owns
              socket.emit('subscribe', stock_list_string);

              //Listen to the channel's messages
              socket.on('message', message => {
                let data = JSON.parse(message);
                this.state.stock_list.filter((stock, index) => {
                  if(stock.tickerSymbol === data.symbol)
                    if(data.lastSalePrice !== 0)
                      this.state.stock_list[index].currentValue = data.lastSalePrice.toFixed(2)
                      this.forceUpdate()
                })
              })
            })
          })
         .catch(err => console.log(err));
  }

  componentWillUnmount(){
    // Disconnect from the channel
    socket.on('disconnect', () => console.log('Disconnected.'))
  }

  getStocks = async (event) => {
    event.preventDefault();
    var config = {
      headers: {'Authorization': "bearer " + localStorage.getItem('auth-token')}
    };

    const res = await axios.get('https://stk-api-server.herokuapp.com/user/stocks/', config)
    this.setState({ stock_list: res.data.stocks })
  }

  addStock = async (e) => {
    e.preventDefault();
    const newItem = this.newItem.value.toUpperCase();
    const shareCount = this.sharesItem.value;

    var config = {
      headers: {'Authorization': "bearer " + localStorage.getItem('auth-token')}
    };

    var body = {
      shares: shareCount
    }

    try {
      const res = await axios.post(`https://stk-api-server.herokuapp.com/user/stocks/add/${newItem}`, body, config);
      const data = await res.data;
      this.setState({stock_list: [...this.state.stock_list, data]})

    }catch(error){
      console.log(error);
    }

    e.target.reset();
  }

  removeItem = async (item) =>{
    var config ={
      headers: {'Authorization': "bearer " + localStorage.getItem('auth-token')}
    };

    var body = {
      shares: 15
    }

    try{
      const res = await axios.post(`https://stk-api-server.herokuapp.com/user/stocks/delete/${item.tickerSymbol}`, body, config);
      const data = await res.data;
      const res2 = await axios.get('https://stk-api-server.herokuapp.com/user/stocks/', config)
      this.setState({ stock_list: res2.data.stocks })
    }catch(error){
      console.log(error);
    }
  }

  removeAllItems = () =>{
    this.setState({
      stock_list: [],
      message:"There are no Ticker Symbols currently in your list."
    })
  }

  itemEntered = (input) =>{
    this.newItem = input
  }

  sharesEntered = (input) =>{
    this.sharesItem = input
  }

  render(){
    return(
      <div>
          <StockInputForm
            addStock={this.addStock}
            itemEntered = {this.itemEntered}
            sharesEntered={this.sharesEntered}
          />
          <StockChart
            stock_list={this.state.stock_list}
            share_count={this.state.share_count}
            stock_price={this.state.stock_price}
            removeItem={this.removeItem}
            removeAllItems={this.removeAllItems}
          />
      </div>
    );
  }
}