import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
// import store from "./Redux/reduxe-store";
import store from './Redux/Store'

export const rerenderEntireTree = () => {
    ReactDOM.render(
        <BrowserRouter>
            <App store={store} dispatch={store.dispatch.bind(store)}/>
        </BrowserRouter>,
        document.getElementById('root')
    );
}
// rerenderEntireTree(store.getState());
rerenderEntireTree();

store.subscribe(() => {
    let state = store.getState();
    rerenderEntireTree()
})


reportWebVitals();
