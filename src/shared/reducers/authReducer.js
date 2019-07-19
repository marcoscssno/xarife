import {LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT_SUCCESS, TOKEN_IS_INVALID, TOKEN_IS_VALID, TOKEN_IS_NULL, DEAUTHENTICATE } from '../actions/auth'

const initialState = {
    isLoading: false,
    isAuthenticated: false,
    success: false,
    message: ''
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case DEAUTHENTICATE:
        return {
            ...state,
            isAuthenticated: false,
            message: action.message
        }
        
        case LOGIN_REQUEST:
        return {
            ...state,
            isLoading: true
        }

        case LOGIN_SUCCESS:
        return {
            ...state,
            isLoading: false,
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

        case TOKEN_IS_NULL:
        return {
            ...state,
            isAuthenticated: false,
            success: false,
            message: 'Faça login!'
        }

        case TOKEN_IS_VALID:
        return {
            ...state,
            isLoading: false,
            isAuthenticated: true,
            success: true,
            message: 'Welcome back!'
        }

        default:
        return state
    }
}

export default authReducer