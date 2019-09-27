import React, {Component} from 'react';
import {Route, Redirect, Switch} from 'react-router-dom';
import {Login, Home, Register, ArticlesMgr,ArticleDetails} from './routers'
import {connect} from 'react-redux';

const mapState = (state) => ({
    isLogin: state.user.isLogin
});

class App extends Component {
    render() {
        return (
            <>
                <Switch>
                    <Route path='/login'
                        // component={Login}
                           render={(routeProps) => {
                               return this.props.isLogin ? <Redirect to='/home'/> : <Login {...routeProps} />
                           }}
                    />
                    <Route path='/home' render={(routeProps) => {
                        return this.props.isLogin ? <Home {...routeProps}/> : <Redirect to='/login'/>
                    }}/>
                    <Route component={Register} path='/register'/>
                    <Route component={ArticlesMgr} path='/articlesMgr'/>
                    <Route component={ArticleDetails} path='/articleDetails/'/>
                    <Redirect to='/login' from='/'/>
                </Switch>
            </>
        );
    }
}

export default connect(mapState)(App);