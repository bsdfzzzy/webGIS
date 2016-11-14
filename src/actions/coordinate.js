import * as types from '../store/constants'

export const setStartCoordinate = ({ dispatch }, ...args) => {
    return dispatch(types.SET_STARTCOORDINATE, ...args)
}

export const setDirectionCoordinate = ({ dispatch }, ...args) => {
    return dispatch(types.SET_DIRECTIONCOORDINATE, ...args)
}