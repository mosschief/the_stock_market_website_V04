import React from 'react';
import axios from 'axios';
import { FormControl, FormGroup, ControlLabel, Jumbotron, Grid, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Registration.css';

export default class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.registerUser = this.registerUser.bind(this);
    this.state = {
      firstName: '',
      lastName: '',
      password: '',
      email: '',
    };
  }

  registerUser = async (event) => {
    event.preventDefault();
    console.log('wtf happened')

    const body = {
      email: this.state.email,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName
    }

    try{
      const res = await axios.post('https://stk-api-server.herokuapp.com/auth/signup', body);
      this.props.history.push('/login')
    } catch(error){
      console.log(error);
    }
  }

  render() {
    return (
      <Jumbotron>
        <h1>Sign up for MT</h1>
        <Grid className="loginGrid">
          <form onSubmit={this.registerUser}>
            <FormGroup ControlId="formBasicText">
              <FormControl
                className="login-box"
                type="text"
                value={this.state.firstName}
                placeholder="First name"
                onChange={(e) => { this.setState({ firstName: e.target.value }); }}/>
              <FormControl.Feedback />
              <FormControl
                className="login-box"
                type="text"
                value={this.state.lastName}
                placeholder="Last name"
                onChange={(e) => { this.setState({ lastName: e.target.value }); }}/>
              <FormControl.Feedback />
              <FormControl
                className="login-box"
                type="text"
                value={this.state.email}
                placeholder="Email"
                onChange={(e) => { this.setState({ email: e.target.value }); }}/>
              <FormControl.Feedback />
              <FormControl
                className="login-box"
                type="password"
                value={this.state.password}
                placeholder="Password"
                onChange={(e) => { this.setState({ password: e.target.value }); }}/>
              <FormControl.Feedback />
            </FormGroup>
            <Button type="submit" className="login-button">Sign up</Button>
          </form>
      </Grid>
      <p className="no-account">Already have an account?
        <Link className="login-link" to='/login'> Log in</Link>
      </p>
    </Jumbotron>
    );
  }
}
