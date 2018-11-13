import axios from 'axios'

export const GET_AGENTES = 'GET_AGENTES'
export const RECEIVE_AGENTES = 'RECEIVE_AGENTES'
export const RECEIVE_AGENTES_FAILED = 'RECEIVE_AGENTES_FAILED'

function requestAgentes () {
    return {
        type: GET_AGENTES
    }
}

function receiveAgentes(agentes) {
    return {
        type: RECEIVE_AGENTES,
        agentes
    }
}

function receiveAgentesFailed() {
    return {
        type: RECEIVE_AGENTES_FAILED,
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