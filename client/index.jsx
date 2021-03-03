import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import Store from './redux/store';

console.log(Store.getState());

ReactDOM.render(
  <App />,
  document.querySelector('#root')
);
