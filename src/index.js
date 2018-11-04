import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'react-bootstrap';
import registerServiceWorker from './registerServiceWorker';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAstronaut } from '@fortawesome/free-solid-svg-icons';

library.add(faUserAstronaut);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
