import React, {Component} from 'react';
import {Route, Redirect,Switch} from 'react-router-dom';
import {Login, Home} from './components/index'

class App extends Component {
    render() {
        console.log(this.props);
        return (
            <>
                <Switch>
                    <Route component={Login} path='/login'/>
                    <Route component={Home} path='/home'/>
                    <Redirect to='/login' from='/'/>
                </Switch>
            </>
        );
    }
}

export default App;