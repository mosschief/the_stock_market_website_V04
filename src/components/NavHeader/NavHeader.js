import React, { Component } from "react";
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from "react-bootstrap";
import { Link } from "react-router-dom"

class NavHeader extends Component {
  render() {
    return(
      <Navbar>
        <Navbar.Header>
          <Link to="/">
            <Navbar.Brand>
              Market Tracker
            </Navbar.Brand>
          </Link>
        </Navbar.Header>
      </Navbar>
    );
  }
}
export default NavHeader;
