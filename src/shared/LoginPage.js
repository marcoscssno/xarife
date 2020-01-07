import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import { loginRequest } from './actions/auth'

import LoginForm from './LoginForm'

import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import green from '@material-ui/core/colors/green'

const styles = {
    root: {
        flexGrow: 1,
        height: "100%",
        position: "absolute",
        backgroundColor: green[900]
    }
}

class LoginPage extends React.Component {
    constructor (props) {
        super(props)

        this.submit = this.submit.bind(this)
    }

    componentDidMount () {
        if (this.props.isAuthenticated == true) {
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
        if (this.props.isAuthenticated == true) {
            if (typeof this.props.location.state !== "undefined") {
                if (typeof this.props.location.state.from !== "undefined") {
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
        const { classes } = this.props
        return (
            <div>
                <Grid container direction="row" justify="center" alignItems="center" className={classes.root}>
                    <Grid item xs={12} sm={8} md={4}>
                        <LoginForm onSubmit={this.submit} />
                    </Grid>
                </Grid>
            </div>
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
        loginRequest: (data) => dispatch(loginRequest(data))
    }
}

LoginPage.propTypes = {
    classes: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LoginPage))