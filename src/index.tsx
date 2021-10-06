import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {store} from './Redux/reduxe-store'
import {Provider} from "react-redux";

setInterval(() => {
    store.dispatch({type:"FAKE"})
}, 1000)
ReactDOM.render(
        <BrowserRouter>
            <Provider store={store}>
            <App />
            </Provider>
        </BrowserRouter>, document.getElementById('root')
    );
 reportWebVitals();
