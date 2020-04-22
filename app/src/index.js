import React from 'react';
import ReactDOM from 'react-dom';
import '@babel/polyfill';
import App from './App';
import './index.css';

export const runApp = () => {
    ReactDOM.render(
        <App/>,
        document.getElementById('root')
    );
};
