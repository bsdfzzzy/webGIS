import * as types from '../store/constants'

export const changeFloor = ({ dispatch }, ...args) => {
    return dispatch(types.CHANGE_FLOOR, ...args)
}

export const setMapLayer = ({ dispatch }, ...args) => {
    return dispatch(types.SET_MAPLAYER, ...args)
}

export const setVectorLayer = ({ dispatch }, ...args) => {
    return dispatch(types.SET_VECTORLAYER, ...args)
}

export const setF1Layer = ({ dispatch }, ...args) => {
    return dispatch(types.SET_F1LAYER, ...args)
}

export const setF2Layer = ({ dispatch }, ...args) => {
    return dispatch(types.SET_F2LAYER, ...args)
}

export const setF3Layer = ({ dispatch }, ...args) => {
    return dispatch(types.SET_F3LAYER, ...args)
}

export const setF4Layer = ({ dispatch }, ...args) => {
    return dispatch(types.SET_F4LAYER, ...args)
}

export const setLayers = ({ dispatch }, ...args) => {
    return dispatch(types.SET_LAYERS, ...args)
}