import React from 'react'

import { Field, reduxForm } from 'redux-form'

let LoginForm = props => {
    const { handleSubmit } = props

    return (
        <form onSubmit={handleSubmit}>
            <Field name="username" component="input" type="text" />
            <Field name="password" component="input" type="password" />
            <button type="submit">Login</button>
        </form>
    )
}

LoginForm = reduxForm({
    form: 'login'
})(LoginForm)

export default LoginForm