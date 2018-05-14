import { combineReducers } from 'redux'

import { reducer as formReducer } from 'redux-form'

import counterReducer from './counterReducer'
import authReducer from './authReducer'

const rootReducer = combineReducers ({
    counter: counterReducer,
    auth: authReducer,
    form: formReducer
})

export default rootReducer