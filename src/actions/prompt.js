import * as types from '../store/constants'

export const showPrompt = ({ dispatch }, ...args) => {
    return dispatch(types.SHOW_PROMPT, ...args)
}
export const closePrompt = ({ dispatch }, ...args) => {
    return dispatch(types.CLOSE_PROMPT, ...args)
}

export const setPromptDisplay = ({ dispatch }, ...args) => {
    return dispatch(types.SET_PROMPT_DISPLAY, ...args)
}

export const clearPrompt = ({ dispatch }, ...args) => {
    return dispatch(types.CLEAR_PROMPT, ...args)
}