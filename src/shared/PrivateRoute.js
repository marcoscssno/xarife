import React from 'react'

import { connect } from 'react-redux'

import { Route, Redirect, withRouter } from 'react-router-dom'

import { tokenIsInvalid } from './actions/auth'

class PrivateRoute extends React.Component {

    componentDidMount () {
        const { isAuthenticated, expiration, tokenIsInvalid } = this.props

        if (expiration <= Math.floor(Date.now() / 1000)) {
            tokenIsInvalid()
        }
    }

    componentDidUpdate () {
        const { isAuthenticated, expiration, tokenIsInvalid } = this.props

        if (expiration <= Math.floor(Date.now() / 1000)) {
            tokenIsInvalid()
        }
    }

    render() {
        const { isAuthenticated, expiration, timestamp, tokenIsInvalid, component: Component, ...rest } = this.props
        return (
            <Route {...rest} render={(props) => {
                if (isAuthenticated) {
                    return (
                        <Component {...props} />
                    )
                }
                else {
                    return (
                        <Redirect
                        to={{
                        pathname: "/login",
                        state: { from: props.location }
                        }}
                        />
                    )
                }
            }} />
        )
    }

}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        expiration: state.auth.expiration,
        timestamp: state.auth.timestamp
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        tokenIsInvalid: () => dispatch(tokenIsInvalid())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PrivateRoute))