import React from 'react'
import PropTypes from 'prop-types'

import { Field, reduxForm } from 'redux-form'

import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const styles = {
    title: {
        marginBottom: "16px"
    },
    form: {
        align: "center"
    },
    input: {
        marginBottom: "16px"
    },
    progress: {
        position: "absolute",
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12
    }
}

const renderTextField = ({
    input,
    ...custom
}) => (
        <TextField
            {...input}
            {...custom}
            variant="outlined"
        />
    )

let LoginForm = props => {
    const { handleSubmit, classes, isLoading, success, message } = props

    return (
        <form onSubmit={handleSubmit} className={classes.form}>
            <Card>
                <CardContent>
                    <Typography variant="h4" align="center" className={classes.title}>Login</Typography>
                        <Field fullWidth name="username" component={renderTextField} type="text" label="Usuário" className={classes.input} />
                        <Field fullWidth name="password" component={renderTextField} type="password" label="Senha" className={classes.input} />
                        { message && (
                            <Typography color="error">{message}</Typography>
                        )}
                </CardContent>
                <CardActions>
                    <Button fullWidth size="large" disabled={isLoading} type="submit" color="primary" variant="contained">
                        { isLoading ? (
                            <CircularProgress className={classes.progress} size={24} />
                        ) : (
                            "Login"
                        )}
                    </Button>
                </CardActions>
            </Card>
        </form>
    )
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.auth.isLoading,
        success: state.auth.success,
        message: state.auth.message
    }
}

LoginForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    success: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
}

LoginForm = reduxForm({
    form: 'login'
})(withStyles(styles)(LoginForm))

LoginForm = connect(mapStateToProps)(LoginForm)

export default LoginForm