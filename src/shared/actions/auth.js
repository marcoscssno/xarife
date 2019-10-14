import axios from 'axios'
import qs from 'qs'

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILED = 'LOGIN_FAILED'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const TOKEN_IS_INVALID = 'TOKEN_IS_INVALID'
export const TOKEN_IS_VALID = 'TOKEN_IS_VALID'
export const TOKEN_IS_NULL = 'TOKEN_IS_NULL'
export const DEAUTHENTICATE = 'DEAUTHENTICATE'

export function loginSuccess() {
    return {
        type: LOGIN_SUCCESS
    }
}

export function loginFailed(response) {
    return {
        type: LOGIN_FAILED,
        response
    }
}

export function deauthenticate(message) {
    return {
        type: DEAUTHENTICATE,
        message
    }
}

export function logoutSuccess() {
    return {
        type: LOGOUT_SUCCESS
    }
}

function loginIsLoading () {
    return {
        type: LOGIN_REQUEST
    }
}

export function resetAuthentication (message = '') {
    return dispatch => {
        dispatch(deauthenticate(message))
        localStorage.removeItem('token')
        delete axios.defaults.headers.common["Authorization"]
    }
}


export function loginRequest(data) {
    const { username, password } = data
    return async dispatch => {
        dispatch(loginIsLoading())
        dispatch(resetAuthentication())
        try {
            const response = await axios.post('/api/login',
            qs.stringify({
                username: username,
                password: password
            }))
            localStorage.setItem('token', response.data.token)
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
            dispatch(loginSuccess())
        }
        catch (err) {
            dispatch(loginFailed(err.response.data))
        }
    }
}

export function logoutRequest(history) {
    return dispatch => {
        dispatch(resetAuthentication())
        history.push('/login')
        dispatch(logoutSuccess())
    }
}

export function tokenIsInvalid() {
    return {
        type: TOKEN_IS_INVALID
    }
}

export function tokenIsNull() {
    return {
        type: TOKEN_IS_NULL
    }
}

export function tokenIsValid() {
    return {
        type: TOKEN_IS_VALID
    }
}

export function checkAuthentication () {
    return async dispatch => {
        try {
            const response = await axios.get('/api/checkauthentication')
            if (response.data.user) {
                dispatch(tokenIsValid())
            }
        }
        catch (err) {
            dispatch(resetAuthentication())
        }
    }
}