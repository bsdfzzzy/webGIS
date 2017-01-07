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

export const showBusinesses = ({ dispatch }, ...args) => {
    return dispatch(types.SHOW_BUSINESSES, ...args)
}

export const showTeams = ({ dispatch }, ...args) => {
    return dispatch(types.SHOW_TEAMS, ...args)
}

export const showNotAllBlocks = ({ dispatch }, ...args) => {
    return dispatch(types.SHOW_NOT_ALL_BLOCKS, ...args)
}

export const showNotAllBusinesses = ({ dispatch }, ...args) => {
    return dispatch(types.SHOW_NOT_ALL_BUSINESSES, ...args)
}

export const showNotAllTeams = ({ dispatch }, ...args) => {
    return dispatch(types.SHOW_NOT_ALL_TEAMS, ...args)
}

export const setBlocks = ({ dispatch }, ...args) => {
    return dispatch(types.SET_BLOCKS, ...args)
}

export const setBusinesses = ({ dispatch }, ...args) => {
    return dispatch(types.SET_BUSINESSES, ...args)
}

export const setTeams = ({ dispatch }, ...args) => {
    return dispatch(types.SET_TEAMS, ...args)
}

export const setDisplay = ({ dispatch }, ...args) => {
    return dispatch(types.SET_DISPLAY, ...args)
}