import * as types from '../store/constants'

export const showInstruction = ({ dispatch }, ...args) => {
    return dispatch(types.SHOW_INSTRUCTION, ...args)
}
export const closeInstruction = ({ dispatch }, ...args) => {
    return dispatch(types.CLOSE_INSTRUCTION, ...args)
}
export const showNavigate = ({ dispatch }, ...args) => {
    return dispatch(types.SHOW_NAVIGATE, ...args)
}
export const closeNavigate = ({ dispatch }, ...args) => {
    return dispatch(types.CLOSE_NAVIGATE, ...args)
}

export const displayChooseStart = ({ dispatch }, ...args) => {
    return dispatch(types.SHOW_CHOOSESTART, ...args)
}

export const closeChooseStart = ({ dispatch }, ...args) => {
	return dispatch(types.CLOSE_CHOOSESTART, ...args)
}

export const displayChooseDirection = ({ dispatch }, ...args) => {
	return dispatch(types.SHOW_CHOOSEDIRECTION, ...args)
}

export const closeChooseDirection = ({ dispatch }, ...args) => {
	return dispatch(types.CLOSE_CHOOSEDIRECTION, ...args)
}

export const showAllStarts = ({ dispatch }, ...args) => {
	return dispatch(types.SHOW_ALLSTARTS, ...args)
}

export const showPartialStarts = ({dispatch}, ...args) => {
	return dispatch(types.SHOW_PARTIALSTARTS, ...args)
}

export const showAllDirections = ({dispatch}, ...args) => {
	return dispatch(types.SHOW_ALLDIRECTIONS, ...args)
}

export const showPartialDirections = ({dispatch}, ...args) => {
	return dispatch(types.SHOW_PARTIALDIRECTIONS, ...args)
}

export const showButton = ({dispatch}, ...args) => {
	return dispatch(types.SHOW_BUTTON, ...args)
}

export const disableButton = ({dispatch}, ...args) => {
	return dispatch(types.DISABLE_BUTTON, ...args)
}

export const changeBrief = ({dispatch}, ...args) => {
	return dispatch(types.CHANGE_BRIEF, ...args)
}

export const changeTitle = ({dispatch}, ...args) => {
	return dispatch(types.CHANGE_TITLE, ...args)
}

export const pathNavigate = ({dispatch}, ...args) => {
	return dispatch(types.PATH_NAVIGATE, ...args)
}

export const setVueMap = ({dispatch}, ...args) => {
	return dispatch(types.SET_VUEMAP, ...args)
}

export const setDestId = ({dispatch}, ...args) => {
	return dispatch(types.SET_DESTID, ...args)
}

export const setStart = ({dispatch}, ...args) => {
	return dispatch(types.SET_START, ...args)
}

export const setDest = ({dispatch}, ...args) => {
	return dispatch(types.SET_DEST, ...args)
}