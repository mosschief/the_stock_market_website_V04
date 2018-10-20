import React from 'react';
import {
  Navbar, Nav, NavItem,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function NavHeader() {
  return (
    <Navbar>
      <Navbar.Header>
        <Link to="/">
          <Navbar.Brand>Market Tracker</Navbar.Brand>
        </Link>
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav>
          <NavItem eventKey={1} href="/StockInputForm">
            Portfolio
          </NavItem>
          <NavItem eventKey={2} href="/history">
            History
          </NavItem>
          <NavItem eventKey={3} href="/Graph">
            Charts
          </NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
