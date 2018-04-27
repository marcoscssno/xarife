var express = require('express');
var path = require('path');

import React from 'react'
import { renderToString } from 'react-dom/server'

import { Provider } from 'react-redux'
import { createStore } from 'redux'

import rootReducer from '../shared/reducers/rootReducer'

const store = createStore(rootReducer)

import { StaticRouter } from 'react-router'

import App from '../shared/App'

import api from './api'

var app = express();

app.use(express.static(path.resolve(__dirname, '../client')));

const renderStuff = (req, res) => {
    const context = {}
    return (
        `<!doctype html>
        <html lang="pt-BR">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

            <title>Xarife</title>
        </head>
        <body>
            <h1>Hello, world!</h1>
            <div id="app">
            ${renderToString (
                <Provider store={store}>
                    <StaticRouter location={req.url} context={context}>
                        <App />
                    </StaticRouter>
                </Provider>
            )}
            </div>

            <script src="/app.js"></script>
            <script>
                // WARNING: See the following for security issues around embedding JSON in HTML:
                // http://redux.js.org/recipes/ServerRendering.html#security-considerations
                window.__PRELOADED_STATE__ = ${JSON.stringify(store.getState()).replace(/</g, '\\u003c')}
            </script>
        </body>
        </html>`
    )
}

app.use('/api', api)

app.use(function (req, res) {
    res.send(renderStuff(req))
});

app.listen(8080, function () {
    console.log('Xarife rodando em http://localhost:8080');
});