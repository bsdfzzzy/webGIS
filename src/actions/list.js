import * as types from '../store/constants'

export const showList = ({ dispatch }, ...args) => {
    return dispatch(types.SHOW_LIST, ...args)
}

export const closeList = ({ dispatch }, ...args) => {
    return dispatch(types.CLOSE_LIST, ...args)
}

export const showBlocks = ({ dispatch }, ...args) => {
    return dispatch(types.SHOW_BLOCKS, ...args)
}

export const showRooms = ({ dispatch }, ...args) => {
    return dispatch(types.SHOW_ROOMS, ...args)
}

export const showTeams = ({ dispatch }, ...args) => {
    return dispatch(types.SHOW_TEAMS, ...args)
}

export const setBlocks = ({ dispatch }, ...args) => {
    return dispatch(types.SET_BLOCKS, ...args)
}

export const setRooms = ({ dispatch }, ...args) => {
    return dispatch(types.SET_ROOMS, ...args)
}

export const setTeams = ({ dispatch }, ...args) => {
    return dispatch(types.SET_TEAMS, ...args)
}