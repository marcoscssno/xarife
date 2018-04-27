import React from 'react'

import { connect } from 'react-redux'

import { addOne, takeOne } from './actions'

import { Route, Link, withRouter } from 'react-router-dom'

import About from './About'

const App = (props) => (
    <div>
        <h1>Hello, Guys!</h1>
        <p>{props.count}</p>
        <button onClick={() => props.onClickAdd()}>Add</button>
        <button onClick={() => props.onClickRemove()}>Remove</button>
        <Link to='/about'>About</Link>
        <Link to='/'>App</Link>
        <Route path='/about' component={About} />
    </div>
)

const mapStateToProps = (state) => {
    return {
        count: state.count
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onClickAdd: () => dispatch(addOne()),
        onClickRemove: () => dispatch(takeOne())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))