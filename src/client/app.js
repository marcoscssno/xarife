import React from 'react'
import { hydrate } from 'react-dom'

import { Provider } from 'react-redux'
import { createStore } from 'redux'

import rootReducer from '../shared/reducers/rootReducer'

const preloadedState = window.__PRELOADED_STATE__
delete window.__PRELOADED_STATE__

const store = createStore(rootReducer, preloadedState)

import { BrowserRouter } from 'react-router-dom'

import App from '../shared/App'

hydrate(<Provider store={store}><BrowserRouter><App /></BrowserRouter></Provider>, document.getElementById('app'));