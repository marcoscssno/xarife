import React from 'react'
import { hydrate } from 'react-dom'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'

import thunkMiddleware from 'redux-thunk'

import rootReducer from '../shared/reducers/rootReducer'

import axios from 'axios'

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true

const preloadedState = window.__PRELOADED_STATE__
delete window.__PRELOADED_STATE__

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({trace: true}) || compose
const store = createStore(rootReducer, preloadedState, composeEnhancers(
    applyMiddleware(thunkMiddleware))
)

import 'normalize.css'
import './app.css'

if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../shared/reducers/rootReducer', () => {
        const nextRootReducer = require('../shared/reducers/rootReducer');
        store.replaceReducer(nextRootReducer);
    });
}

import { BrowserRouter } from 'react-router-dom'

import { checkAuthentication, tokenIsNull } from '../shared/actions/auth'

const token = localStorage.getItem('token')

if(token !== null) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    store.dispatch(checkAuthentication())
}
else {
    delete axios.defaults.headers.common['Authorization']
    store.dispatch(tokenIsNull())
}

import moment from 'moment'

moment.locale('pt-BR')

import App from '../shared/App'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import deepOrange from '@material-ui/core/colors/deepOrange';

const theme = createMuiTheme({
    palette: {
      primary: green,
      secondary: deepOrange,
    },
});

hydrate(<Provider store={store}><BrowserRouter><MuiThemeProvider theme={theme}><App /></MuiThemeProvider></BrowserRouter></Provider>, document.getElementById('app'));