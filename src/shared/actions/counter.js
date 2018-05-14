export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT'

export function addOne() {
    return {
        type: INCREMENT
    }
}

export function takeOne() {
    return {
        type: DECREMENT
    }
}

export function loginRequest() {
    return {
        type: LOGIN_REQUEST
    }
}