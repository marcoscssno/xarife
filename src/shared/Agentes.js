import React from 'react'
import Layout from './components/Layout'
import { connect } from 'react-redux'
import { getAgentes } from './actions/agentesActions'
import _ from 'lodash'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import { withStyles } from '@material-ui/core/styles'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';

import { Link, withRouter } from 'react-router-dom'
import { enfeitarMatricula } from './helpers/texto';

import moment from 'moment'

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.black, 0.05),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.black, 0.025),
        },
        marginRight: theme.spacing.unit * 2,
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit * 3,
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing.unit * 9,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
    },
    grow: {
        flexGrow: 1
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

    componentDidMount() {
        this.props.getAgentes()
    }

    handleClick = (event, history, id) => {
        history.push(`/agente/${id}`)
    }

    render() {
        const { classes, loading, message, agentes, history } = this.props
        let cidade, estado
        return (
            <Layout>
                {loading && <CircularProgress className={classes.progress} />}
                {message && <p>{message}</p>}
                <Paper className={classes.root}>
                    <Toolbar>
                        <Typography variant="h6" noWrap>
                            Agentes Penitenciários
                        </Typography>
                        <div className={classes.grow} />
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Pesquisar"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                            />
                        </div>
                        <Button variant="contained" color="secondary" component={Link} to="/agente/cadastrar">Cadastrar</Button>
                    </Toolbar>
                    {!_.isEmpty(agentes) &&
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Nome</TableCell>
                                    <TableCell>Matrícula</TableCell>
                                    <TableCell>Residência</TableCell>
                                    <TableCell>Lotação</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {agentes.map(agente => (
                                    <TableRow key={agente._id} hover onClick={event => this.handleClick(event, history, agente._id)} className={classes.clickable}>
                                        <TableCell component="th" scope="row">
                                            {agente.nome}
                                        </TableCell>
                                        <TableCell>{enfeitarMatricula(agente.matricula)}</TableCell>
                                        <TableCell>{!_.isEmpty(agente.endereco) && agente.endereco[0].cidade.nome + " - " + agente.endereco[0].cidade.estado.sigla}</TableCell>
                                        <TableCell>{!_.isEmpty(agente.lotacoes) && agente.lotacoes[0].divisao !== null ? agente.lotacoes[0].divisao.nome.sigla != null ? agente.lotacoes[0].divisao.nome.sigla + " " + moment(agente.lotacoes[0].data).fromNow() : agente.lotacoes[0].divisao.nome.porExtenso + " " + moment(agente.lotacoes[0].data).fromNow() : ""}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    }
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Agentes)))