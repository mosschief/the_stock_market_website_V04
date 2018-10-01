import React from 'react';
import "./Registration.css"

const Registration = () =>{
    return (
    <div>
    <div>
    <div className="jumbotron center-block align-middle">
		<div className="container">
		  <form>
		    <div className="form-group row">
		      <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
		      <div className="col-sm-10">
		        <input type="email" className="form-control" id="inputEmail3" placeholder="Email" />
		      </div>
		    </div>
		    <div className="form-group row">
		      <label htmlFor="inputUserName3" className="col-sm-2 col-form-label">Username</label>
		      <div className="col-sm-10">
		        <input type="text" className="form-control" id="inputEmail3" placeholder="Email" />
		      </div>
		    </div>
		    <div className="form-group row">
		      <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
		      <div className="col-sm-10">
		        <input type="password" className="form-control" id="inputPassword3" placeholder="Password" />
		      </div>
		    </div>
		    <div className="form-group row">
			      <div className="col-sm-10">
			        <button 
			        type="submit" 
			        className="btn btn-primary"
			        
			        >
			        Register
			        </button>
			      </div>
		    </div>
		  </form>
		</div>
	</div>
	</div>
	</div>
    );
}

export default Registration;