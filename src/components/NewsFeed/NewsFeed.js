import React from 'react';
import axios from 'axios';
import { Nav, NavItem, Tabs, Tab, Grid, Row, Col, ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap';
import Story from './Story/Story.js';
import './NewsFeed.css'



export default class NewsFeed extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      feed: [],
      stock_list: [],
      key: null
    }
    this.handleSelect = this.handleSelect.bind(this);
    this.getStories = this.getStories.bind(this);
  }

  handleSelect(key) {
    this.setState({ key: key })
    this.getStories(key);
  }

  componentDidMount(){
    var config = {
          headers: {'Authorization': "bearer " + localStorage.getItem('auth-token')}
    };

    axios.get('https://stk-api-server.herokuapp.com/user/stocks/', config)
         .then(res => {
           this.setState({ stock_list: res.data.stocks })
           this.setState({ key: this.state.stock_list[0].tickerSymbol })
           this.getStories(this.state.key);
         })
         .catch(err => console.log(err));

  }

  getStories(key){
    axios.get('https://stk-news.herokuapp.com/', {
      params: {
        tickerSymbol: key
      }
    }).then(res => this.setState({ feed: res.data }))
      .catch(error => console.log(error));
  }

  render(){
    const { feed, stock_list, key } = this.state;

    return(
      <div>
        <Tab.Container  activeKey={key} onSelect={this.handleSelect}>
          <Row className="clearfix">
            <Col sm={3}>
              <p>Select a Stock/ETF to get news about below:</p>
              <div class="buttonContainer">
              <ButtonToolbar>
                <DropdownButton bsSize="large" title={key} id="dropdown-size-large" activeKey={key} onSelect={this.handleSelect}>
                  {stock_list.map(stock => (
                    <MenuItem eventKey={stock.tickerSymbol}>{stock.tickerSymbol}</MenuItem>
                  ))}
                </DropdownButton>
              </ButtonToolbar>
              </div>
            </Col>
            <Col sm={8}>
              <Tab.Content animation>
                {stock_list.map(stock => (
                  <Tab.Pane eventKey={stock.tickerSymbol}>
                    <Grid>
                      {feed.map(row => (
                        <Row>
                          {row.map(story => (<Col md={4}><Story title={story.title} image={story.urlToImage} link={story.url}/></Col>))}
                        </Row>
                        ))
                      }
                    </Grid>
                  </Tab.Pane>
                ))}
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    )
  }
}