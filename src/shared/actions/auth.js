import axios from 'axios'
import qs from 'qs'

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILED = 'LOGIN_FAILED'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const TOKEN_IS_INVALID = 'TOKEN_IS_INVALID'
export const TOKEN_IS_VALID = 'TOKEN_IS_VALID'

export function loginSuccess(data) {
    return {
        type: LOGIN_SUCCESS,
        data
    }
}

export function loginFailed(response) {
    return {
        type: LOGIN_FAILED,
        response
    }
}

export function logoutSuccess() {
    return {
        type: LOGOUT_SUCCESS
    }
}


export function loginRequest(data) {
    const { username, password } = data
    return dispatch => {
        axios.post('/api/login',
        qs.stringify({
            username: username,
            password: password
        }))
        .then(response => {
            localStorage.setItem('token', response.data.token)
            dispatch(loginSuccess(response.data.data))
        })
        .catch(error => dispatch(loginFailed(error.response.data)))
    }
}

export function logoutRequest(history) {
    return dispatch => {
        localStorage.removeItem('token')
        history.push('/login')
        dispatch(logoutSuccess())
    }
}

export function tokenIsInvalid() {
    return {
        type: TOKEN_IS_INVALID
    }
}

export function tokenIsValid(data) {
    return {
        type: TOKEN_IS_VALID,
        data
    }
}