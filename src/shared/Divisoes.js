import React from 'react'
import Layout from './components/Layout'
import NovaDivisaoForm from './NovaDivisaoForm'
import { connect } from 'react-redux'

import _ from 'lodash'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import { withStyles } from '@material-ui/core/styles'

import Paper from '@material-ui/core/Paper';
import { fade } from '@material-ui/core/styles/colorManipulator';

import { Link, withRouter } from 'react-router-dom'


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

class Divisoes extends React.Component {

    componentDidMount() {
        
    }

    handleClick = (event, history, id) => {
        history.push(`/agente/${id}`)
    }

    render() {
        const { classes } = this.props
        return (
            <Layout>
                <Paper className={classes.root}>
                    <NovaDivisaoForm onSubmit={this.submit} />
                </Paper>
            </Layout>
        )
    }

}

export default withRouter(connect()(withStyles(styles)(Divisoes)))