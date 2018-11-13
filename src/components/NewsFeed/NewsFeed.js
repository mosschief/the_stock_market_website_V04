import React from 'react';
import axios from 'axios';
import { Nav, NavItem, Tabs, Tab, Grid, Row, Col } from 'react-bootstrap';
import Story from './Story/Story.js';



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
    axios.get('http://localhost:5000/', {
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
              <Nav className="story-container" bsStyle="pills" stacked>
                {stock_list.map(stock => (
                  <NavItem eventKey={stock.tickerSymbol}>{stock.tickerSymbol}</NavItem>
                ))}
              </Nav>
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
        </Tab.Container>;
      </div>
    )
  }
}