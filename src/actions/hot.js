import * as types from '../store/constants'

export const showHot = ({ dispatch }, ...args) => {
    return dispatch(types.SHOW_HOT, ...args)
}

export const closeHot = ({ dispatch }, ...args) => {
    return dispatch(types.CLOSE_HOT, ...args)
}

export const setHots = ({ dispatch }, ...args) => {
    return dispatch(types.SET_HOTS, ...args)
}