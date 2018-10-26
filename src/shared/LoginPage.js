import React from 'react'

import { connect } from 'react-redux'

import { loginRequest } from './actions/auth'

import LoginForm from './LoginForm'

class LoginPage extends React.Component {
    constructor (props) {
        super(props)

        this.submit = this.submit.bind(this)
    }

    componentDidMount () {
        if (this.props.success == true) {
            if (typeof this.props.location.state != "undefined") {
                if (typeof this.props.location.state.from != "undefined") {
                    this.props.history.push(this.props.location.state.from.pathname)
                }
            }
            else {
                this.props.history.push('/')
            }
        }
    }

    componentDidUpdate () {
        if (this.props.success == true) {
            if (typeof this.props.location.state != "undefined") {
                if (typeof this.props.location.state.from != "undefined") {
                    this.props.history.push(this.props.location.state.from.pathname)
                }
            }
            else {
                this.props.history.push('/')
            }
        }
    }

    submit = (data) => {
        this.props.loginRequest(data)
    }

    render() {
        const { isLoading, success, message } = this.props
        const color = success ? 'green' : 'red'
        return (
            <div>
                <p style={{color}}>Result</p>
                { isLoading ? <p>Carregando</p> : false }
                <p>Mensagem: { message ? message : 'Nenhuma' }</p>
                <LoginForm onSubmit={this.submit} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.auth.isLoading,
        success: state.auth.success,
        message: state.auth.message
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loginRequest: (data) => dispatch(loginRequest(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)