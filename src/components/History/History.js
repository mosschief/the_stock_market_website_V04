import React from 'react';
import {
  Jumbotron, FormGroup, ControlLabel, FormControl, Button, Grid, Row,
} from 'react-bootstrap';
import HistoryTable from './HistoryTable';
import './History.css';
import axios from 'axios';
import moment from 'moment';

export default class History extends React.Component {
  constructor(props) {
    super(props);
    this.getStockHistory = this.getStockHistory.bind(this);
    this.setTickerSymbol = this.setTickerSymbol.bind(this);
    this.state = {
      tickerSymbol: '',
      dateAdded: '',
      prices: [],
      query: [],
      stock_list: []
    };
  }

  componentDidMount(){
    var config = {
          headers: {'Authorization': "bearer " + localStorage.getItem('auth-token')}
    };

    axios.get('https://stk-api-server.herokuapp.com/user/stocks/', config)
         .then(res => {
           this.setState({ stock_list: res.data.stocks })
           this.setState({ tickerSymbol: this.state.stock_list[0].tickerSymbol })
         })
         .catch(err => console.log(err));
  }

  setTickerSymbol = ({target: { value }}) => {
    const stock = JSON.parse(value);
    this.setState({ tickerSymbol: stock.tickerSymbol, dateAdded: moment(stock.dateAdded).format('YYYYMMDD') });
  }

  getStockHistory = async (event) => {
    const { tickerSymbol, dateAdded } = this.state;
    event.preventDefault();
    if (tickerSymbol) {
      const res = await axios.get(`https://api.iextrading.com/1.0/stock/${tickerSymbol}/chart/date/${dateAdded}`)
      console.log(res.data);
    }
  }

  render() {
    const { prices = [], tickerSymbol, query = [], stock_list } = this.state;
    const stockChoices = stock_list.map((stock) => <option value={JSON.stringify(stock)}>{stock.company}</option>)

    return (
      <div>
        <Grid>
          <Row>
            <div className="pseudoelement-parent">
              <Jumbotron className="history-search">
                <h1>History</h1>
                <form onSubmit={this.getStockHistory}>
                  <FormGroup controlId="formBasicText">
                    <ControlLabel>Select One of Your Stocks</ControlLabel>
                    <FormControl onChange={this.setTickerSymbol} componentClass="select" placeholder="select">
                      {stockChoices}
                    </FormControl>
                  </FormGroup>
                  <Button className="history-button" type="submit">Find Stock History</Button>
                </form>
              </Jumbotron>
            </div>
          </Row>
          <Row>
            <HistoryTable prices={prices} />
          </Row>
        </Grid>
      </div>
    );
  }
}
