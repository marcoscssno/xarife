import React from 'react'

import { connect } from 'react-redux'

import { addOne, takeOne } from './actions/counter'
import { logoutRequest } from './actions/auth'

import { Route, Redirect, Link, withRouter } from 'react-router-dom'

import About from './About'
import HomePage from './HomePage'
import LoginPage from './LoginPage'
import PrivateRoute from './PrivateRoute'

import { hot } from 'react-hot-loader'

import CssBaseLine from '@material-ui/core/CssBaseLine'

const App = (props) => (
    <CssBaseLine>
        <Route path='/login' component={LoginPage} />
        <Route exact path='/' component={HomePage} />
        <PrivateRoute path='/about' component={About} />
    </CssBaseLine>
)

const mapStateToProps = (state) => {
    return {
        count: state.counter.count,
        timestamp: state.auth.timestamp,
        expiration: state.auth.expiration,
        isAuthenticated: state.auth.isAuthenticated
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onClickAdd: () => dispatch(addOne()),
        onClickRemove: () => dispatch(takeOne()),
        onClickLogout: (history) => dispatch(logoutRequest(history))
    }
}

export default hot(module)(withRouter(connect(mapStateToProps, mapDispatchToProps)(App)))