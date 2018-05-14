import React from 'react'

import { connect } from 'react-redux'

import { addOne, takeOne } from './actions/counter'

import { Route, Link, withRouter } from 'react-router-dom'

import About from './About'
import LoginPage from './LoginPage'

import { hot } from 'react-hot-loader'

const App = (props) => (
    <div>
        <h1>Hello, World!</h1>
        <p>{props.count}</p>
        <button onClick={() => props.onClickAdd()}>Add</button>
        <button onClick={() => props.onClickRemove()}>Remove</button>
        <Link to='/about'>About</Link>
        <Link to='/'>App</Link>
        <Route path='/about' component={About} />
        <Route path='/login' component={LoginPage} />
    </div>
)

const mapStateToProps = (state) => {
    return {
        count: state.counter.count
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onClickAdd: () => dispatch(addOne()),
        onClickRemove: () => dispatch(takeOne())
    }
}

export default hot(module)(withRouter(connect(mapStateToProps, mapDispatchToProps)(App)))