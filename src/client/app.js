import React from 'react'
import { hydrate } from 'react-dom'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'

import thunkMiddleware from 'redux-thunk'

import rootReducer from '../shared/reducers/rootReducer'

import jwt from 'jsonwebtoken'

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true

const preloadedState = window.__PRELOADED_STATE__
delete window.__PRELOADED_STATE__

const store = createStore(rootReducer, preloadedState, applyMiddleware(thunkMiddleware))

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

import { tokenIsValid, tokenIsInvalid, tokenIsNull } from '../shared/actions/auth'

const token = localStorage.getItem('token')

if(token !== null) {
    jwt.verify(token, 'ILoveMyCat', function (error, decoded) {
        if (error) {
            store.dispatch(tokenIsInvalid())
        }
        else {
            store.dispatch(tokenIsValid({
                timestamp: decoded.iat,
                expiration: decoded.exp
            }))
        }
    })
}
else {
    store.dispatch(tokenIsNull())
}

import App from '../shared/App'

hydrate(<Provider store={store}><BrowserRouter><App /></BrowserRouter></Provider>, document.getElementById('app'));