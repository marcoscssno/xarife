import { combineReducers } from 'redux'

import { reducer as formReducer } from 'redux-form'

import counterReducer from './counterReducer'

const rootReducer = combineReducers ({
    counter: counterReducer,
    form: formReducer
})

export default rootReducer 