import axios from 'axios'
import qs from 'qs'

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILED = 'LOGIN_FAILED'

function loginSuccess(response) {
    return {
        type: LOGIN_SUCCESS,
        response
    }
}

function loginFailed(response) {
    return {
        type: LOGIN_FAILED,
        response
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
        .then(response => dispatch(loginSuccess(response.data)))
        .catch(error => dispatch(loginFailed(error.response.data)))
    }
}