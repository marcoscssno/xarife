import axios from 'axios'
import qs from 'qs'

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILED = 'LOGIN_FAILED'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'

export function loginSuccess() {
    return {
        type: LOGIN_SUCCESS
    }
}

function loginFailed(response) {
    return {
        type: LOGIN_FAILED,
        response
    }
}

function logoutSuccess() {
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
            dispatch(loginSuccess())
        })
        .catch(error => dispatch(loginFailed(error.response.data)))
    }
}

export function logoutRequest(history) {
    return dispatch => {
        localStorage.removeItem('token')
        history.push('/')
        dispatch(logoutSuccess())
    }
}