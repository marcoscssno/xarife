import React from 'react'

import { connect } from 'react-redux'

import { addOne, takeOne } from './actions/counter'
import { logoutRequest } from './actions/auth'

import { Route, Switch, withRouter } from 'react-router-dom'

import Agentes from './Agentes'
import Escala from './Escala'
import Agente from './Agente'
import CadastrarAgente from './CadastrarAgente'
import EditarAgente from './EditarAgente'
import HomePage from './HomePage'
import LoginPage from './LoginPage'
import Divisoes from './Divisoes'
import PrivateRoute from './PrivateRoute'

import { hot } from 'react-hot-loader'

import CssBaseLine from '@material-ui/core/CssBaseLine'

const App = (props) => (
    <CssBaseLine>
        <Switch>
            <PrivateRoute exact path='/agente/cadastrar' component={CadastrarAgente} />
            <PrivateRoute exact path='/agente/:id' component={Agente} />
            <PrivateRoute exact path='/agente/:id/editar' component={EditarAgente} />
        </Switch>
            <Route path='/login' component={LoginPage} />
            <PrivateRoute exact path='/' component={HomePage} />
            <PrivateRoute exact path='/agentes' component={Agentes} />
            <PrivateRoute exact path='/escala' component={Escala} />
            <PrivateRoute exact path='/divisoes' component={Divisoes} />
    </CssBaseLine>
)

const mapStateToProps = (state) => {
    return {
        count: state.counter.count,
        isAuthenticated: state.auth.isAuthenticated
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onClickAdd: () => dispatch(addOne()),
        onClickRemove: () => dispatch(takeOne()),
        onClickLogout: (history) => dispatch(logoutRequest(history))
    }
}

export default hot(module)(withRouter(connect(mapStateToProps, mapDispatchToProps)(App)))