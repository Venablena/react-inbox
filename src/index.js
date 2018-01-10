import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'font-awesome/css/font-awesome.css';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

//CONVERT TO REDUX
import { Provider } from 'react-redux'
import { createStore, applyMiddleWare } from 'redux'

import reducers from './reducers'
import { fetchMessages } from './actions'

//????
const store = createStore(
  reducers
  //applyMiddleWare would go here
)

store.dispatch(fetchMessages())

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root')
);

registerServiceWorker();
