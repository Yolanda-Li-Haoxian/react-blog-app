import React from 'react';
import ReactDOM,{render} from 'react-dom';
import {HashRouter as Router,Route} from 'react-router-dom'
import './styles/index.css';
import App from './App';

render(
    <Router>
            <Route component={App} />
    </Router>,

    document.getElementById('root')
);

