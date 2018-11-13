import { GET_AGENTES } from '../actions/agentesActions'
import { RECEIVE_AGENTES } from '../actions/agentesActions'
import { RECEIVE_AGENTES_FAILED } from '../actions/agentesActions'

const initialState = {
    loading: false,
    message: '',
    agentes: []
}

const agentesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_AGENTES:
        return {
            ...state,
            loading: true
        }

        case RECEIVE_AGENTES:
        return {
            ...state,
            loading: false,
            agentes: action.agentes
        }

        case RECEIVE_AGENTES_FAILED:
        return {
            ...state,
            loading: false,
            message: 'Não foi possível listar.'
        }

        default:
        return state
    }
}

export default agentesReducer