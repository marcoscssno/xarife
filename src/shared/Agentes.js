import React from 'react'
import Layout from './components/Layout'
import { connect } from 'react-redux'
import { getAgentes } from './actions/agentesActions'

import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import { withStyles } from '@material-ui/core/styles'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    progress: {
        position: 'absolute',
        top: '50%',
        left: '50%'
    },
    clickable: {
        cursor: 'pointer'
    }
})

class Agentes extends React.Component {
    
    componentDidMount () {
        this.props.getAgentes()
    }

    handleClick = (event, id) => {
        alert(id)
    }
    
    render () {
        const { classes, loading, message, agentes } = this.props
        return (
            <Layout>
                {loading && <CircularProgress className={classes.progress} />}
                {message && <p>{message}</p>}
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                        <TableRow>
                            <TableCell>Nome</TableCell>
                            <TableCell>Matrícula</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {agentes && agentes.map(agente => (
                            <TableRow key={agente._id} hover onClick={event => this.handleClick(event, agente._id)} className={classes.clickable}>
                            <TableCell component="th" scope="row">
                                {agente.nome}
                            </TableCell>
                            <TableCell>{agente.matricula}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    </Paper>
            </Layout>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        agentes: state.agentes.agentes,
        loading: state.agentes.loading,
        message: state.agentes.message,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAgentes: () => dispatch(getAgentes())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Agentes))