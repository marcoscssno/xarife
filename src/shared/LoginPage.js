import React from 'react'

import { connect } from 'react-redux'

import { loginRequest } from './actions/auth'

import LoginForm from './LoginForm'

class LoginPage extends React.Component {
    constructor (props) {
        super(props)

        this.submit = this.submit.bind(this)
    }

    submit = (data) => {
        this.props.loginRequest(data)
    }

    render() {
        const { username, password } = this.props
        return (
            <div>
                <p>{username}</p>
                <p>{password}</p>
                <LoginForm onSubmit={this.submit} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        username: state.auth.username,
        password: state.auth.password
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loginRequest: (data) => dispatch(loginRequest(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)