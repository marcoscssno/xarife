import { LOGIN_REQUEST } from '../actions/auth'
import { LOGIN_SUCCESS } from '../actions/auth'
import { LOGIN_FAILED } from '../actions/auth'

const initialState = {
    isLoading: false,
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
            success: true,
            message: 'Congratulations!'
        }

        case LOGIN_FAILED:
        return {
            ...state,
            isLoading: false,
            success: false,
            message: action.response.message
        }

        default:
        return state
    }
}

export default authReducer