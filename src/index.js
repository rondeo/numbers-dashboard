import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { Provider } from "react-redux";
import store from "./store";

import App from './App';

// Bring in bootstrap styling
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
