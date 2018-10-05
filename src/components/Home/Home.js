import React, { Component } from "react";
import { Grid, Row, Col, Button, Jumbotron } from "react-bootstrap";
import HomeForm from "./HomeForm"
import NavHeader from "../NavHeader/NavHeader"

class Home extends Component {
  render() {
    return (
    <div>
      <HomeForm/>
    </div>
    );
  }
}
export default Home;