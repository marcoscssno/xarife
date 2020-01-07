import {
    GET_AGENTES,
    GET_AGENTE,
    RECEIVE_AGENTES,
    RECEIVE_AGENTE,
    RECEIVE_AGENTES_FAILED,
    RECEIVE_AGENTE_FAILED,
    CADASTRAR_AGENTE_REQUEST,
    CADASTRAR_AGENTE_SUCCESS,
    CADASTRAR_AGENTE_FAILED,
    EDITAR_AGENTE_REQUEST,
    EDITAR_AGENTE_SUCCESS,
    EDITAR_AGENTE_FAILED,
} from '../actions/agentesActions'

const initialState = {
    loading: false,
    message: '',
    agentes: {},
    agente: {},
    success: false
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
                agentes: action.agentes,
                message: ''
            }

        case RECEIVE_AGENTE:
            return {
                ...state,
                loading: false,
                agente: action.agente,
                message: ''
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

        case CADASTRAR_AGENTE_REQUEST:
            return {
                ...state,
                loading: true,
                message: ''
            }

        case CADASTRAR_AGENTE_SUCCESS:
            return {
                ...state,
                loading: false,
                message: '',
                success: true
            }

        case CADASTRAR_AGENTE_FAILED:
            return {
                ...state,
                loading: false,
                message: action.message,
                success: false
            }

        case EDITAR_AGENTE_REQUEST:
            return {
                ...state,
                loading: true,
                message: ''
            }

        case EDITAR_AGENTE_SUCCESS:
            return {
                ...state,
                loading: false,
                message: '',
                success: true
            }

        case EDITAR_AGENTE_FAILED:
            return {
                ...state,
                loading: false,
                message: action.message,
                success: false
            }

        default:
            return {
                ...state,
                success: false
            }
    }
}

export default agentesReducer