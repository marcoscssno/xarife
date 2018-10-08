import React from 'react'

import { connect } from 'react-redux'

import { addOne, takeOne } from './actions/counter'
import { logoutRequest } from './actions/auth'

import { Route, Redirect, Link, withRouter } from 'react-router-dom'

import Navbar from './components/Navbar'
import About from './About'
import LoginPage from './LoginPage'

import { hot } from 'react-hot-loader'

import Button from '@material-ui/core/Button';

const App = (props) => (
    <div>
        <Navbar title="Xarife" />
        <h1>Hello, World!</h1>
        <h1>{props.isAuthenticated ? "Yes" : "No"}</h1>
        <button onClick={() => props.onClickLogout(props.history)}>Logout</button>
        <p>{props.count}</p>
        <button onClick={() => props.onClickAdd()}>Add</button>
        <button onClick={() => props.onClickRemove()}>Remove</button>
        <Link to='/about'>About</Link>
        <Link to='/'>App</Link>
        <Link to='/login'>Login</Link>
        <Button color="primary" component={Link} to="/login">Login</Button>
        <PrivateRoute isAuthenticated={props.isAuthenticated} path='/about' component={About} />
        <Route path='/login' component={LoginPage} />
    </div>
)

const mapStateToProps = (state) => {
    return {
        count: state.counter.count,
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

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
    <Route
    isAuthenticated={isAuthenticated}
    {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );

export default hot(module)(withRouter(connect(mapStateToProps, mapDispatchToProps)(App)))