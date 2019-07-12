import axios from 'axios'

export const GET_AGENTES = 'GET_AGENTES'
export const GET_AGENTE = 'GET_AGENTE'
export const RECEIVE_AGENTES = 'RECEIVE_AGENTES'
export const RECEIVE_AGENTE = 'RECEIVE_AGENTE'
export const RECEIVE_AGENTES_FAILED = 'RECEIVE_AGENTES_FAILED'
export const RECEIVE_AGENTE_FAILED = 'RECEIVE_AGENTE_FAILED'

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

function receiveAgenteFailed() {
    return {
        type: RECEIVE_AGENTE_FAILED,
    }
}

export function getAgentes() {
    return dispatch => {
        dispatch(requestAgentes())
        return axios.get('/api/agentes')
        .then(response => {
            dispatch(receiveAgentes(response.data))
        })
        .catch(error => dispatch(receiveAgentesFailed()))
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