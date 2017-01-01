import * as types from '../store/constants'

export const showDetail = ({ dispatch }, ...args) => {
    return dispatch(types.SHOW_DETAIL, ...args)
}

export const closeDetail = ({ dispatch }, ...args) => {
    return dispatch(types.CLOSE_DETAIL, ...args)
}

export const setDisplayDetail = ({ dispatch }, ...args) => {
    return dispatch(types.SET_DISPLAY_DETAIL, ...args)
}

export const showBase = ({ dispatch }, ...args) => {
    return dispatch(types.SHOW_BASE, ...args)
}

export const showBusiness = ({ dispatch }, ...args) => {
    return dispatch(types.SHOW_BUSINESS, ...args)
}