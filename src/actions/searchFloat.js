import * as types from '../store/constants'

export const showSearchFloat = ({ dispatch }, ...args) => {
    return dispatch(types.SHOW_SEARCHFLOAT, ...args)
}

export const closeSearchFloat = ({ dispatch }, ...args) => {
    return dispatch(types.CLOSE_SEARCHFLOAT, ...args)
}

export const choosingStart = ({ dispatch }, ...args) => {
    return dispatch(types.CHOOSING_START, ...args)
}

export const choosingDest = ({ dispatch }, ...args) => {
    return dispatch(types.CHOOSING_DEST, ...args)
}

export const notChoosingStart = ({ dispatch }, ...args) => {
    return dispatch(types.NOT_CHOOSING_START, ...args)
}

export const notChoosingDest = ({ dispatch }, ...args) => {
    return dispatch(types.NOT_CHOOSING_DEST, ...args)
}