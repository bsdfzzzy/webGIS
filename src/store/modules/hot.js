import * as types from '../constants'

const state = {
	whetherShowHot: true,
    hots: []
}

const mutations = {
	[types.SHOW_HOT] (state) {
        state.whetherShowHot = true
    },
    [types.CLOSE_HOT] (state) {
        state.whetherShowHot = false
    },
    [types.SET_HOTS] (state, hots) {
        state.hots = hots
    }
}

export default {
	state,
	mutations
}