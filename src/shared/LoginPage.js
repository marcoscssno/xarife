import React from 'react'

import { connect } from 'react-redux'

import { loginRequest } from './actions'

class LoginPage extends React.Component {
    constructor (props) {
        super(props)
    }

    submit = values => {
        console.log(values)
    }

    render {
        return (
            <LoginForm onSubmit={this.submit} />
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loginRequest: () => dispatch(loginRequest())
    }
}

export default connect(mapDispatchToProps)(LoginPage)