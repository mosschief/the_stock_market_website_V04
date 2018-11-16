import React from 'react';
import {
  Navbar, Nav, NavItem, NavDropdown, MenuItem
} from 'react-bootstrap';
import { withRouter, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class NavHeader extends React.Component {

  constructor(props){
    super(props);
    this.logOut = this.logOut.bind(this);
  }

  logOut = () => {
    localStorage.removeItem('auth-token');
    this.props.history.push('/');
  };

  render() {
    if(localStorage.getItem('auth-token')) {
      return (
        <Navbar>
          <Navbar.Header>
            <Link to="/">
              <Navbar.Brand>Market Tracker</Navbar.Brand>
            </Link>
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey={4} href="/newsfeed">
                News
              </NavItem>
              <NavItem eventKey={1} href="/portfolio">
                Portfolio
              </NavItem>
              <NavItem eventKey={2} href="/history">
                History
              </NavItem>
              <NavItem eventKey={3} href="/Graph">
                Charts
              </NavItem>
            </Nav>
            <Nav pullRight>
              <NavDropdown
                eventKey={4}
                title={<FontAwesomeIcon id="nav-icon" icon="user-astronaut" size="2x" />}
                id="logout-dropdown"
              >
                <MenuItem eventKey={4.1} onClick={this.logOut}>Logout</MenuItem>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      );
    }
    else {
      return(
        <Navbar>
          <Navbar.Header>
            <Link to="/">
              <Navbar.Brand>Market Tracker</Navbar.Brand>
            </Link>
          </Navbar.Header>
        </Navbar>
      )}
  }
}

export default withRouter(NavHeader);
