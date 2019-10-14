import { GET_AGENTES, GET_AGENTE, RECEIVE_AGENTES, RECEIVE_AGENTE, RECEIVE_AGENTES_FAILED, RECEIVE_AGENTE_FAILED } from '../actions/agentesActions'

const initialState = {
    loading: false,
    message: '',
    agentes: {},
    agente: {}
}

const agentesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_AGENTES:
        return {
            ...state,
            loading: true
        }

        case GET_AGENTE:
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

        case RECEIVE_AGENTE:
        return {
            ...state,
            loading: false,
            agente: action.agente
        }

        case RECEIVE_AGENTES_FAILED:
        return {
            ...state,
            loading: false,
            message: 'Não foi possível listar.'
        }

        case RECEIVE_AGENTE_FAILED:
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