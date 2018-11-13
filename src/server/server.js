import express from 'express'
import path from 'path'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import passport from 'passport'
import MyLocalStrategy from './strategies/login'

import React from 'react'
import { renderToString } from 'react-dom/server'

import { Provider } from 'react-redux'

import store from './store'

import { StaticRouter } from 'react-router'

import App from '../shared/App'

import api from './api'

import cfg from '../config'

var app = express();

import webpack from 'webpack'
import config from '../../webpack.config.dev'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

if(process.env.NODE_ENV === 'development') {
    const compiler = webpack(config)
    app.use(webpackDevMiddleware(compiler, {publicPath: config.output.publicPath}))
    app.use(webpackHotMiddleware(compiler)) 
}

app.use(morgan('combined'))
app.use(bodyParser.urlencoded({extended: true}))

app.use(passport.initialize())
passport.use('login', MyLocalStrategy)

app.use(express.static(path.resolve(__dirname, '../client')));

const renderStuff = (req, res) => {
    const context = {}
    return (
        `<!doctype html>
        <html lang="pt-BR">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

            <link rel="stylesheet" href="/fonts/material-icons/material-icons.css">
            <link rel="stylesheet" href="/fonts/roboto/roboto.css">
            <link rel="stylesheet" href="/main.css">

            <title>Xarife</title>
        </head>
        <body>
            <div id="app">${renderToString(
                <Provider store={store}>
                    <StaticRouter location={req.url} context={context}>
                        <App />
                    </StaticRouter>
                </Provider>)}</div>

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

app.use( (req, res ) => {
    res.send(renderStuff(req))
});


mongoose.connect(cfg.dburi, cfg.dbauth).then(
    () => {
        app.listen(8080, () => {
            console.log('Xarife rodando em http://localhost:8080');
        });
    },
    err => console.error(err)
)

