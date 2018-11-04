import React, { Component } from 'react';
import Registration from './components/Registration/Registration';
import Home from './components/Home/Home';
import Graph from './components/Graph/Graph';
import MainChartPage from './components/Main_Chart_Page/MainChartPage';
import Particles from 'react-particles-js';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavHeader from './components/NavHeader/NavHeader';
import StockInputForm from './components/Main_Chart_Page/StockInputForm';
import History from './components/History/History';
import Login from './components/Login/Login'
import "react-bootstrap";
import "./App.css";
import socketIOClient from 'socket.io-client';
import axios from 'axios';

const socket = socketIOClient('https://ws-api.iextrading.com/1.0/tops');

//For the Particles background
const particlesOptions={
	particles: {
		number:{
			value: 40,
			density:{
				enable: true,
				value_area: 800
			}
		}
	}
}
//state
class App extends Component {


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

  addStock = async (event) => {
    event.preventDefault();
    var config = {
          headers: {'Authorization': "bearer " + localStorage.getItem('auth-token')}
    };

    const res = await axios.get('https://stk-api-server.herokuapp.com/user/stocks/', config)
    this.setState({ stocks: res.data.stocks })
  }

  constructor(props){
  	super(props);
    	this.state={
        stock_list: [],
        message: '',
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

  }

	handleStartChange = (e) => {
		var data = this.state;
		data['chartData']['start'] = e.target.value
		this.setState(data);
	}

	handleEndChange = (e) => {
		var data = this.state;
		data['chartData']['end'] = e.target.value
		this.setState(data);
	}

  //Function for adding items to MainChartPage. Associated with StockInputForm.
  //Sets input as AllUpperCase for Ticker symbol and verifies if it is already on the list.
  //Also, verifies that share amount is a valid number.
  //If an issue comes up, messages is updated and the user is prompted to correct issue on
  //the website.
  addItem = (e) => {
    e.preventDefault();
    console.log("clicked");
    const newItem= this.newItem.value.toUpperCase();
    const shareCount=this.sharesItem.value;
    console.log(shareCount);
    let isOnTheList=false;
    //changed from map to forEach. If issue, will turn back to this again.
    this.state.stock_list.forEach(item =>{
      console.log(item.stock)
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
  //Associated with chart, this removes items from the chart via removing them from stock_list.
  //If list is empty a message will show that says this.
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
  //This is associated with the form button that removes all items
  //from the list at once.
  removeAllItems = () =>{
    this.setState({
      stock_list: [],
      message:"There are no Ticker Symbols currently in your list."
    })
  }
  //Associated with StockInputForm. This is specifically associated with
  //the ticker symbol entry box.
  itemEntered = (input) =>{
    this.newItem = input
  }
  //This is associated with StockInputForm. This is associated with the
  //share count entry box.
  sharesEntered = (input) =>{
    this.sharesItem = input
  }
  render() {
    return (
       <Router>
         <div>
           <Particles className="particles" params={particlesOptions} />
           <NavHeader/>
           <Route exact={true} path="/" component={Home} />
           <Route exact={true} path="/login" component={Login} />
           <Route exact={true} path="/signup" component={Registration} />
           <Route exact={true} path='/history' component={History} />
           <Route exact={true} path="/StockInputForm"
           render={props =>
              <div>
                  <StockInputForm
                    addItem={this.addItem}
                    itemEntered = {this.itemEntered}
                    sharesEntered={this.sharesEntered}
                  />
                  <MainChartPage
                    message={this.state.message}
                    stock_list={this.state.stock_list}
                    share_count={this.state.share_count}
                    stock_price={this.state.stock_price}
                    removeItem={this.removeItem}
                    removeAllItems={this.removeAllItems}
                  />
              </div>
            }/>
            <Route exact={true} path="/graph"
              render={(props) => <Graph data={this.state.chartData}
              handleEndChange={this.handleEndChange}
              handleStartChange={this.handleStartChange}/>}
            />
         </div>
       </Router>
    );
  }
}

export default App;

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
        <MainChartPage
          message={this.state.message}
          stock_list={this.state.stock_list}
          share_count={this.state.share_count}
          stock_price={this.state.stock_price}
          removeItem={this.removeItem}
          removeAllItems={this.removeAllItems}
        />
      </div>*/
