import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Provider} from 'react-redux';

import 'https://kit.fontawesome.com/a74079c183.js';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "react-simple-keyboard/build/css/index.css";
import "react-datepicker/dist/react-datepicker.css";
import 'react-tabs/style/react-tabs.css';
import "swiper/css";
import "swiper/css/free-mode";
import "react-tabs/style/react-tabs.css";

import store from './context/store';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />

    </Provider>
  </React.StrictMode>
);

