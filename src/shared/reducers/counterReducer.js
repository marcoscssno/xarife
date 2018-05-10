const initialState = {
    count: 0
}

const counterReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'INCREMENT':
        console.log('incrementing')
        return {
            count: state.count + 1
        }

        case 'DECREMENT':
        console.log('decrementing')
        return {
            count: state.count - 1
        }

        default:
        return state
    }
}

export default counterReducer