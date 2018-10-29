import React from 'react';
import './Login.css';
import Axios from 'axios';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: ''
    };
    this.login = this.login.bind(this);
  }

  login = async (event) => {
    // var config = {
    //       headers: {'Authorization': "bearer " + token}
    // };

    // var bodyParameters = {
    //     key: "value"
    // }

    event.preventDefault();

    const body = {
      username: this.state.username,
      password: this.state.password
    }

    const res = await fetch('/auth/login', { method: 'POST', body: body })
    const data = await res.json();
    if(data.error){
      this.setState({ error: data.error })
    }

  }

  render() {
    const { username, password, error } = this.state;
    let errorMessage;

    if (error) {
      errorMessage = <div>{ error }</div>
    }

    return (
      <div className="jumbotron center-block align-middle">
        <div className="container">
          <form onSubmit={this.login}>
            <div className="form-group row">
              <label htmlFor="inputUserName3" className="col-sm-2 col-form-label">Username</label>
              <div className="col-sm-10">
                <input type="text"
                  className="form-control"
                  id="inputUserName3"
                  placeholder="Username"
                  value = {username}
                  onChange={(e) => { this.setState({ username: e.target.value }); }}/>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
              <div className="col-sm-10">
                <input type="password"
                  className="form-control"
                  id="inputPassword3"
                  placeholder="Password"
                  value = {password}
                  onChange={(e) => { this.setState({ password: e.target.value }); }}/>
              </div>
            </div>
            <div className="form-group row">
              <div className="col-sm-10">
                <button type="submit" className="btn btn-primary">Login</button>
              </div>
            </div>
            <div>
              {errorMessage}
            </div>
          </form>
        </div>
      </div>
    );
  }
}
