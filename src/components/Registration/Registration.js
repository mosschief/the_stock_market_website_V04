import React from 'react';
import './Registration.css';

export default class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      passWord: '',
      email: '',
    };
  }

  render() {
    return (
      <div className="jumbotron center-block align-middle">
        <div className="container">
          <form class="form-inline justify-content-center">
            <div className="form-group row">
              <label htmlFor="inputEmail3" className="col-sm-10 col-form-label">Email</label>
              <div className="col-sm-12">
                <input type="email" className="form-control" id="inputEmail3" placeholder="Email" />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="inputUserName3" className="col-sm-10 col-form-label">Username</label>
              <div className="col-sm-12">
                <input type="text" className="form-control" id="inputUserName3" placeholder="Username" />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="inputPassword3" className="col-sm-10 col-form-label">Password</label>
              <div className="col-sm-12">
                <input type="password" className="form-control" id="inputPassword3" placeholder="Password" />
              </div>
            </div>
              <div className="the_button col-sm-12 text-center btn-block">
                <button type="submit" className="btn btn-primary">Register</button>
              </div>
          </form>
        </div>
      </div>
    );
  }
}
