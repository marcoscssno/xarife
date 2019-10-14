import React from 'react'

import { connect } from 'react-redux'

import { Route, Redirect, withRouter } from 'react-router-dom'

import { tokenIsInvalid, tokenIsNull, checkAuthentication, resetAuthentication } from './actions/auth'

import IdleTimer from 'react-idle-timer'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'


class PrivateRoute extends React.Component {

    constructor(props) {
        super(props)
        this.idleTimer = null
        this.onIdle = this._onIdle.bind(this)
        this.state = { open: false }
    }

    handleOpenDialog = () => {
        this.setState({open: true})
    }

    handleCloseDialog = () => {
        this.setState({open: false})
    }

    componentDidUpdate() {
        const { checkAuthentication } = this.props
        checkAuthentication()
    }

    _onIdle(e) {
        const { logoutByInactivity } = this.props
        this.handleOpenDialog()
        logoutByInactivity()
    }

    render() {
        const { isAuthenticated, tokenIsInvalid, component: Component, ...rest } = this.props
        return (
            <div>
                <Route {...rest} render={(props) => {
                    if (isAuthenticated) {
                        return (
                            <div>
                                <IdleTimer
                                    ref={ref => { this.idleTimer = ref }}
                                    element={document}
                                    onActive={this.onActive}
                                    onIdle={this.onIdle}
                                    onAction={this.onAction}
                                    debounce={250}
                                    timeout={1000 * 300} />

                                <Component {...props} />
                            </div>
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

                <Dialog
                    open={this.state.open}
                    onClose={this.handleCloseDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Parece que você ficou ausente."}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Você foi desconectado por questões de segurança. Por favor, entre novamente.
            </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCloseDialog} color="primary" autoFocus>
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>
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
        tokenIsInvalid: () => dispatch(tokenIsInvalid()),
        tokenIsNull: () => dispatch(tokenIsNull()),
        checkAuthentication: () => dispatch(checkAuthentication()),
        logoutByInactivity: () => dispatch(resetAuthentication())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PrivateRoute))