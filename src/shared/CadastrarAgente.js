import React from 'react'
import Layout from './components/Layout'
import { connect } from 'react-redux'
import { cadastrarAgente } from './actions/agentesActions'
import CadastrarAgenteForm from './CadastrarAgenteForm'

import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import { withStyles } from '@material-ui/core/styles'

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import { Redirect, withRouter } from 'react-router-dom'

import _ from 'lodash'

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
        flexGrow: 1
    },
    grow: {
        flexGrow: 1
    },
    paddedDiv: {
        padding: theme.spacing.unit * 3,
    },
    progress: {
        position: 'absolute',
        top: '50%',
        left: '50%'
    }
})

class CadastrarAgente extends React.Component {
    constructor (props) {
        super(props)

        this.submit = this.submit.bind(this)
    }

    componentDidMount() {
        
    }

    submit = (data) => {
        this.props.cadastrarAgente(data)
    }

    render() {
        const { classes, success } = this.props
        return (
            <Layout>
                <Paper className={classes.root}>
                    <div className={classes.paddedDiv}>
                        { success ? <Redirect to="/agentes" /> : <CadastrarAgenteForm onSubmit={this.submit} /> }
                    </div>
                </Paper>
            </Layout>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        agente: state.agentes.agente,
        loading: state.agentes.loading,
        message: state.agentes.message,
        success: state.agentes.success,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        cadastrarAgente: (data) => dispatch(cadastrarAgente(data))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CadastrarAgente)))