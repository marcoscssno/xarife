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
export const RECEIVE_USERNAME = 'RECEIVE_USERNAME'

export function loginSuccess(userId) {
    return {
        type: LOGIN_SUCCESS,
        userId
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

export function logoutSuccess(userId) {
    return {
        type: LOGOUT_SUCCESS,
        userId
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
            dispatch(loginSuccess(response.data.data.userId))
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

export function tokenIsValid(userId) {
    return {
        type: TOKEN_IS_VALID,
        userId
    }
}

export function checkAuthentication () {
    return async dispatch => {
        try {
            const response = await axios.get('/api/checkauthentication')
            if (response.data._id) {
                dispatch(tokenIsValid(response.data._id))
            }
        }
        catch (err) {
            dispatch(resetAuthentication())
        }
    }
}

export function getUserName (userId) {
    return async dispatch => {
        try {
            const response = await axios.get('/api/userName/' + userId)
            dispatch(receiveUserName(response.data.userName))
        }
        catch (err) {
            throw err
        }
    }
}

export function receiveUserName(userName) {
    return {
        type: RECEIVE_USERNAME,
        userName
    }
}