import * as types from '../store/constants'

export const showSearchResult = ({ dispatch }, ...args) => {
    return dispatch(types.SHOW_SEARCHRESULT, ...args)
}

export const closeSearchResult = ({ dispatch }, ...args) => {
    return dispatch(types.CLOSE_SEARCHRESULT, ...args)
}

export const setSearchResult = ({ dispatch }, ...args) => {
    return dispatch(types.SET_SEARCHRESULT, ...args)
}