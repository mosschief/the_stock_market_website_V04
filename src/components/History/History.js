import React from 'react';
import {
  Jumbotron, FormGroup, ControlLabel, FormControl, Button, Grid, Row,
} from 'react-bootstrap';
import HistoryTable from './HistoryTable';
import './History.css';

export default class History extends React.Component {
  constructor(props) {
    super(props);
    this.searchStocks = this.searchStocks.bind(this);
    this.setTickerSymbol = this.setTickerSymbol.bind(this);
    this.getTickerSymbols = this.getTickerSymbols.bind(this);
    this.state = {
      tickerSymbol: '',
      prices: [],
      query: [],
    };
  }

  setTickerSymbol = ({ target: { value } }) => {
    this.setState({ tickerSymbol: value },
      () => {
        const { tickerSymbol } = this.state;
        if (tickerSymbol && tickerSymbol.length > 1) {
          // this.getTickerSymbols();
        } else if (!tickerSymbol) { this.setState({ query: [] }); }
      });
  }

  getTickerSymbols = () => {
    const { tickerSymbol } = this.state;
    fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${tickerSymbol}&apikey=3UW9H28YWAJTQPHS`)
      .then(res => res.json())
      .then((res) => {
        this.setState({ query: res.bestMatches });
      });
  }

  searchStocks = (event) => {
    const { tickerSymbol } = this.state;
    event.preventDefault();
    if (tickerSymbol) {
      fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=${tickerSymbol}&interval=5min&apikey=3UW9H28YWAJTQPHS`)
        .then(res => res.json())
        .then((data) => {
          this.setState({ prices: data['Monthly Adjusted Time Series'] });
        })
        .catch(error => console.log(error));
    }
  }

  render() {
    const { prices = [], tickerSymbol, query = [] } = this.state;
    return (
      <div>
        <Grid>
          <Row>
            <div className="pseudoelement-parent">
              <Jumbotron className="history-search">
                <h1>History</h1>
                <form onSubmit={this.searchStocks}>
                  <FormGroup
                    controlId="formBasicText"
                  >
                    <ControlLabel>Select a Fund</ControlLabel>
                    <FormControl
                      type="text"
                      value={tickerSymbol}
                      placeholder="Enter a ticker symbol"
                      onChange={this.setTickerSymbol}
                    />
                    <FormControl.Feedback />
                  </FormGroup>
                  {Object.keys(query).length ? (
                    <div>
                      {Object.keys(query).map(result => (
                        <p>{query[result]['1. symbol']}</p>
                      ))}
                    </div>
                  ) : <div />}
                  <Button type="submit">Find Stock History</Button>
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
