import { LOGIN_REQUEST } from '../actions/auth'
import { LOGIN_SUCCESS } from '../actions/auth'
import { LOGIN_FAILED } from '../actions/auth'
import { LOGOUT_SUCCESS } from '../actions/auth'
import { TOKEN_IS_INVALID } from '../actions/auth'
import { TOKEN_IS_VALID } from '../actions/auth'

const initialState = {
    isLoading: false,
    timestamp: null,
    expiration: null,
    isAuthenticated: false,
    success: false,
    message: ''
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        return {
            ...state,
            isLoading: true
        }

        case LOGIN_SUCCESS:
        return {
            ...state,
            isLoading: false,
            timestamp: action.data.timestamp,
            expiration: action.data.expiration,
            isAuthenticated: true,
            success: true,
            message: 'Congratulations!'
        }

        case LOGIN_FAILED:
        return {
            ...state,
            isLoading: false,
            isAuthenticated: false,
            success: false,
            message: action.response.message
        }

        case LOGOUT_SUCCESS:
        return {
            ...state,
            isLoading: false,
            isAuthenticated: false,
            success: true,
            message: 'Logout!'
        }

        case TOKEN_IS_INVALID:
        return {
            ...state,
            isAuthenticated: false,
            success: false,
            message: 'Token expirou!'
        }

        case TOKEN_IS_VALID:
        return {
            ...state,
            isLoading: false,
            timestamp: action.data.timestamp,
            expiration: action.data.expiration,
            isAuthenticated: true,
            success: true,
            message: 'Welcome back!'
        }

        default:
        return state
    }
}

export default authReducer