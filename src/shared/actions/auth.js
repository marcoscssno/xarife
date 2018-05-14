import axios from 'axios'
import qs from 'qs'

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_RESPONSE = 'LOGIN_RESPONSE'

function loginResponse(response) {
    return {
        type: LOGIN_RESPONSE,
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
        .then(response => dispatch(loginResponse(response.data)))
        .catch(error => console.log(error.request))
    }
}