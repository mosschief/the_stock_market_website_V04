import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import Graph from '../Graph/Graph';
import History from '../History/History';
import Portfolio from '../Portfolio/Portfolio';

const ProtectedRoutes = () => {
  if(localStorage.getItem('auth-token')){
    return(
      <div>
        <Route exact={true} path='/history' component={History} />
        <Route exact={true} path="/portfolio" component={Portfolio}/>
        <Route exact={true} path="/graph" component={Graph}/>
      </div>
    )
  }
  else{
    return(
      <div>
        <Redirect to={{ pathname: "/login"}}/>
      </div>
    );
  }
}

export default ProtectedRoutes;