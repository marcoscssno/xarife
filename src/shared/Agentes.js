import React from 'react'
import Layout from './components/Layout'
import { connect } from 'react-redux'
import { getAgentes } from './actions/agentesActions'

import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import { withStyles } from '@material-ui/core/styles'

const styles = {
    progress: {
        position: 'absolute',
        top: '50%',
        left: '50%'
    }
}

class Agentes extends React.Component {
    
    componentDidMount () {
        this.props.getAgentes()
    }
    
    render () {
        const { classes, loading, message, agentes } = this.props
        return (
            <Layout>
                <Typography variant="h2" component="h2">Agentes</Typography>
                {loading && <CircularProgress className={classes.progress} />}
                {message && <p>{message}</p>}
                {agentes && agentes.map((agente) => (
                    <div key={agente._id}>
                        <Typography variant="h5" component="h5">{agente.nome}</Typography>
                        <Typography variant="h6" component="h6">{agente.matricula}</Typography>
                    </div>
                ))}
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