import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import Store from './redux/store';
import { BrowserRouter as Router } from 'react-router-dom';

console.log(Store.getState());

ReactDOM.render(
  <Router>
      <App />
  </Router>, 
  document.querySelector('#root')
);
