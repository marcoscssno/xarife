import { LOGIN_REQUEST } from '../actions/auth'
import { LOGIN_RESPONSE } from '../actions/auth'

const initialState = {
    username: 'ninguem',
    password: 'nenhuma'
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        return {
            username: action.username,
            password: action.password
        }

        case LOGIN_RESPONSE:
        console.log(action.response)

        default:
        return state
    }
}

export default authReducer