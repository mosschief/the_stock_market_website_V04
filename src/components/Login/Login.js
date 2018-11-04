import React from 'react';
import axios from 'axios';
import { FormControl, FormGroup, ControlLabel, Jumbotron, Grid, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Login.css';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: ''
    };
    this.login = this.login.bind(this);
  }

  login = async (event) => {
    event.preventDefault();

    const body = {
      email: this.state.email,
      password: this.state.password
    }

    try {
      const res = await axios.post('https://stk-api-server.herokuapp.com/auth/login', body);
      const data = await res.data;
      if(data.error){
        this.setState({ error: data.error })

        setTimeout(function(){
          this.setState({ error: '' });
        }.bind(this), 10000);

        this.props.history.push('/login');
      }
      else{
        localStorage.setItem('auth-token', res.data['auth-token']);
        this.props.history.push('/portfolio')
      }
    } catch(error) {
        this.setState({ error: error });
    }
  }

  render() {
    const { username, password, error } = this.state;
    let errorMessage;

    if (error) {
      errorMessage = <div className="error-message">{ error }</div>
    }

    return (
        <Jumbotron>
          <h1>Log in to MT</h1>
          <Grid className="loginGrid">
            <form onSubmit={this.login}>
              <FormGroup ControlId="formBasicText">
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
              <Button type="submit" className="login-button">Log in</Button>
            </form>
        </Grid>
        <p className="no-account">Don't have an account?
          <Link className="signup-link" to='/signup'> Sign Up</Link>
        </p>
        {errorMessage}
      </Jumbotron>
    );
  }
}
