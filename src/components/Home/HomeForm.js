import React from 'react';
import {
  Grid, Row, Col, Button, Jumbotron,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../assets/styles/HomeForm.css';

export default function HomeForm() {
  return (
    <div>
      <Grid fluid>
        <Row>
          <Col>
            <Jumbotron>
              <h1>Start your financial journey.</h1>
              <p>
                Follow your favorite stocks and ETF&#39;s to visualize your
                gains.
              </p>
              <div className="homeButton">
                <Link to="/login">
                  <Button block>Sign In</Button>
                </Link>
              </div>
              <div className="homeButton">
                <Link to="/signup">
                  <Button block>Register</Button>
                </Link>
              </div>
            </Jumbotron>
          </Col>
        </Row>
      </Grid>
    </div>
  );
}
