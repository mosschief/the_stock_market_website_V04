import React, { Component } from "react";
import { FormGroup, Grid, Row, Col, Button, Jumbotron } from "react-bootstrap";
import { Link } from 'react-router-dom'
import "../../assets/styles/HomeForm.css"

class HomeForm extends Component {
  render() {
		return <div>
        <Grid fluid={true}>
          <Row>
            <Col>
              <Jumbotron>
                <h1>Start your financial journey.</h1>
                <p>
                  Follow your favorite stocks and ETF's to visualize your
                  gains.
                </p>
                <div class="homeButton">
                  <Link to="/login">
                    <Button>Sign In</Button>
                  </Link>
                </div>
                <div class="homeButton">
                  <Link to="/signup">
                    <Button>Register</Button>
                  </Link>
                </div>
              </Jumbotron>
            </Col>
          </Row>
        </Grid>
      </div>;
  }
}
export default HomeForm;