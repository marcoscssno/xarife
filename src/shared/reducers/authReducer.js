import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT_SUCCESS, TOKEN_IS_INVALID, TOKEN_IS_VALID, TOKEN_IS_NULL, DEAUTHENTICATE, RECEIVE_USERNAME } from '../actions/auth'

const initialState = {
    isLoading: false,
    isAuthenticated: false,
    success: false,
    message: '',
    userId: '',
    userName: '',
    userName: ''
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case DEAUTHENTICATE:
            return {
                ...state,
                isAuthenticated: false,
                message: action.message,
                userId: '',
                userName: ''
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
                message: 'Congratulations!',
                userId: action.userId
            }

        case LOGIN_FAILED:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: false,
                success: false,
                message: action.response.message,
            }

        case LOGOUT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: false,
                success: true,
                message: 'Logout!',
                userId: '',
                userName: ''
            }

        case TOKEN_IS_INVALID:
            return {
                ...state,
                isAuthenticated: false,
                success: false,
                message: 'Token expirou!',
                userId: '',
                userName: ''
            }

        case TOKEN_IS_NULL:
            return {
                ...state,
                isAuthenticated: false,
                success: false,
                message: 'Faça login!',
                userId: '',
                userName: ''
            }

        case TOKEN_IS_VALID:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: true,
                success: true,
                message: 'Bem-vindo de volta!',
                userId: action.userId
            }

        case RECEIVE_USERNAME:
            return {
                ...state,
                userName: action.userName
            }

        default:
            return state
    }
}

export default authReducer