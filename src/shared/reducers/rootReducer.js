import { combineReducers } from 'redux'

import { reducer as formReducer } from 'redux-form'

import counterReducer from './counterReducer'
import authReducer from './authReducer'
import agentesReducer from './agentesReducer'

const rootReducer = combineReducers ({
    counter: counterReducer,
    auth: authReducer,
    agentes: agentesReducer,
    form: formReducer
})

export default rootReducer