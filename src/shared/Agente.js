import React from 'react'
import Layout from './components/Layout'
import { connect } from 'react-redux'
import { getAgente } from './actions/agentesActions'

import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import { withStyles } from '@material-ui/core/styles'

import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import { Link, withRouter } from 'react-router-dom'

import _ from 'lodash'

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    grow: {
        flexGrow: 1
    },
    progress: {
        position: 'absolute',
        top: '50%',
        left: '50%'
    }
})

class Agente extends React.Component {

    componentDidMount() {
        const { match } = this.props
        this.props.getAgente(match.params.id)
    }

    render() {
        const { classes, loading, message, agente } = this.props
        return (
            <Layout>
                {loading && <CircularProgress className={classes.progress} />}
                {message && <p>{message}</p>}
                <Paper className={classes.root}>
                    <Toolbar>
                        <div><Typography variant="h6" noWrap>
                            {agente.nome}
                        </Typography>
                        <Typography variant="subtitle2" noWrap>
                            {_.replace(agente.matricula, /(\d{3})(\d{3})(\d{1})([0-9a-zA-Z])/g, "\$1.\$2.\$3\-\$4")}
                        </Typography></div>
                        <div className={classes.grow} />
                        <Button variant="contained" color="secondary">Editar</Button>
                    </Toolbar>
                    <Typography variant="body1">{!_.isEmpty(agente.endereco) && agente.endereco[0].cidade.nome + " - " + agente.endereco[0].cidade.estado.sigla}</Typography>
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
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAgente: (id) => dispatch(getAgente(id))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Agente)))