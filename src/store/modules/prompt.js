import * as types from '../constants'

const state = {
	whetherShowPrompt: false,
    display: []
}

const mutations = {
	[types.SHOW_PROMPT] (state) {
        state.whetherShowPrompt = true
    },
    [types.CLOSE_PROMPT] (state) {
        state.whetherShowPrompt = false
    },
    [types.SET_PROMPT_DISPLAY] (state, displays) {
        state.display = displays
    },
    [types.CLEAR_PROMPT] (state) {
        state.display = []
    }
}

export default {
	state,
	mutations
}