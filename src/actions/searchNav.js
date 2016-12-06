import * as types from '../store/constants'

export const showSearchNav = ({ dispatch }, ...args) => {
    return dispatch(types.SHOW_SEARCHNAV, ...args)
}
export const closeSearchNav = ({ dispatch }, ...args) => {
    return dispatch(types.CLOSE_SEARCHNAV, ...args)
}