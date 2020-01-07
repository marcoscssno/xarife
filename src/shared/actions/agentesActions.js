import axios from 'axios'
import qs from 'qs'

export const GET_AGENTES = 'GET_AGENTES'
export const GET_AGENTE = 'GET_AGENTE'
export const RECEIVE_AGENTES = 'RECEIVE_AGENTES'
export const RECEIVE_AGENTE = 'RECEIVE_AGENTE'
export const RECEIVE_AGENTES_FAILED = 'RECEIVE_AGENTES_FAILED'
export const RECEIVE_AGENTE_FAILED = 'RECEIVE_AGENTE_FAILED'
export const CADASTRAR_AGENTE_REQUEST = 'CADASTRAR_AGENTE_REQUEST'
export const CADASTRAR_AGENTE_SUCCESS = 'CADASTRAR_AGENTE_SUCCESS'
export const CADASTRAR_AGENTE_FAILED = 'CADASTRAR_AGENTE_FAILED'
export const EDITAR_AGENTE_REQUEST = 'EDITAR_AGENTE_REQUEST'
export const EDITAR_AGENTE_SUCCESS = 'EDITAR_AGENTE_SUCCESS'
export const EDITAR_AGENTE_FAILED = 'EDITAR_AGENTE_FAILED'

function requestAgentes () {
    return {
        type: GET_AGENTES
    }
}

function requestAgente () {
    return {
        type: GET_AGENTE
    }
}

function receiveAgentes(agentes) {
    return {
        type: RECEIVE_AGENTES,
        agentes
    }
}

function receiveAgente(agente) {
    return {
        type: RECEIVE_AGENTE,
        agente
    }
}

function receiveAgentesFailed() {
    return {
        type: RECEIVE_AGENTES_FAILED,
    }
}

function receiveAgenteFailed(message) {
    return {
        type: RECEIVE_AGENTE_FAILED,
        message
    }
}

export function getAgentes() {
    return async dispatch => {
        dispatch(requestAgentes())
        try {
            const agentes = await axios.get('/api/agente')
            dispatch(receiveAgentes(agentes.data))
        }
        catch (err) {
            dispatch(receiveAgentesFailed(err.message))
        }
    }
}

export function getAgente(id) {
    return dispatch => {
        dispatch(requestAgente())
        return axios.get(`/api/agente/${id}`)
        .then(response => {
            dispatch(receiveAgente(response.data))
        })
        .catch(error => dispatch(receiveAgenteFailed()))
    }
}

export function cadastrarAgenteRequest () {
    return {
        type: CADASTRAR_AGENTE_REQUEST
    }
}

export function cadastrarAgenteSuccess () {
    return {
        type: CADASTRAR_AGENTE_SUCCESS
    }
}

export function cadastrarAgenteFailed (message) {
    return {
        type: CADASTRAR_AGENTE_FAILED,
        message
    }
}

export function cadastrarAgente(data) {
    return async dispatch => {
        dispatch(cadastrarAgenteRequest())
        try {
            const response = await axios.post('/api/agente', qs.stringify(data))
            dispatch(cadastrarAgenteSuccess())
        }
        catch (err) {
            dispatch(cadastrarAgenteFailed(err.response.data.message))
        }
    }
}

export function editarAgenteRequest () {
    return {
        type: EDITAR_AGENTE_REQUEST
    }
}

export function editarAgenteSuccess () {
    return {
        type: EDITAR_AGENTE_SUCCESS
    }
}

export function editarAgenteFailed (message) {
    return {
        type: EDITAR_AGENTE_FAILED,
        message
    }
}

export function editarAgente(data) {
    return async dispatch => {
        dispatch(editarAgenteRequest())
        try {
            const response = await axios.post('/api/agente', qs.stringify(data))
            dispatch(editarAgenteSuccess())
        }
        catch (err) {
            dispatch(editarAgenteFailed(err.response.data.message))
        }
    }
}