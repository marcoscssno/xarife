import React from 'react'

import { connect } from 'react-redux'

import { Route, Redirect, withRouter } from 'react-router-dom'

import { tokenIsInvalid, tokenIsNull, checkAuthentication } from './actions/auth'

class PrivateRoute extends React.Component {

    componentDidUpdate () {
        const { checkAuthentication } = this.props
        checkAuthentication()
    }

    render() {
        const { isAuthenticated, tokenIsInvalid, component: Component, ...rest } = this.props
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
        isAuthenticated: state.auth.isAuthenticated
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        tokenIsInvalid: () => dispatch(tokenIsInvalid()),
        tokenIsNull: () => dispatch(tokenIsNull()),
        checkAuthentication: () => dispatch(checkAuthentication())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PrivateRoute))