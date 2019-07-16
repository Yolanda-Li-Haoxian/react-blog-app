import React from 'react';
import {Provider} from 'react-redux';
import {render} from 'react-dom';
import {HashRouter as Router, Route} from 'react-router-dom'
import './styles/index.css';
import App from './App';
import store from './store';

render(
    <Provider store={store}>
        <Router>
            <Route component={App}/>
        </Router>
    </Provider>,

    document.getElementById('root')
);

