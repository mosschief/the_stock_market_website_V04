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
        message: ''
    }
  }

  componentDidMount(){

    // // Listen to the channel's messages
    // socket.on('message', async message => {
    //   let data = JSON.parse(message);
    //   this.setState({ stocks: this.state.stocks.concat(data) });
    // })

    // // Connect to the channel
    // socket.on('connect', () => {

    //   // Subscribe to topics (i.e. appl,fb,aig+)
    //   socket.emit('subscribe', 'snap,fb,aig+')
    // })

    var config = {
          headers: {'Authorization': "bearer " + localStorage.getItem('auth-token')}
    };

    axios.get('https://stk-api-server.herokuapp.com/user/stocks/', config)
         .then(res => this.setState({ stock_list: res.data.stocks }))
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
    this.setState({ stocks: res.data.stocks })
  }

  addItem = (e) => {
    e.preventDefault();
    const newItem= this.newItem.value.toUpperCase();
    const shareCount=this.sharesItem.value;

    let isOnTheList=false;

    this.state.stock_list.forEach(item =>{
      if(item.stock===newItem){
        isOnTheList=true
      }
    })

    if(isOnTheList){
      this.setState({
        message:"This ticker Symbol is already on the list or you did not enter a ticker symbol!"
      })
    }else if(shareCount<=0 || isNaN(shareCount)){
      this.setState({
        message:"ENTER A VALID SHARE COUNT!"
      })
    }else{
      newItem !== '' && this.setState({
      //... old items, then adding new item.
      stock_list: [...this.state.stock_list, {stock: newItem, shares: shareCount}],
      message: ''
    })
    }
    e.target.reset();
  }

  removeItem = (item) =>{
    const new_stock_list = this.state.stock_list.filter(ticker_symbol =>{
      return ticker_symbol !== item;
    })
    this.setState({
      stock_list: [...new_stock_list]
    })
    if(new_stock_list.length ===0){
      this.setState({
        message:"There are no Ticker Symbols currently in your list."
      })
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
            addItem={this.addItem}
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

//Leaving this for testing purposes, will delete when in final production. Please do NOT remove. If you
//Feel it should be removed, please contact Kyle.
/*      <div className = "App">
        <Particles className="particles"
          params={particlesOptions}
        />
        <StockInputForm
          addItem={this.addItem}
          itemEntered = {this.itemEntered}
        />
        <StockChart
          message={this.state.message}
          stock_list={this.state.stock_list}
          share_count={this.state.share_count}
          stock_price={this.state.stock_price}
          removeItem={this.removeItem}
          removeAllItems={this.removeAllItems}
        />
      </div>*/