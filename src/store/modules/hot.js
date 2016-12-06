import * as types from '../constants'

const state = {
	whetherShowHot: true,
}

const mutations = {
	[types.SHOW_HOT] (state) {
        state.whetherShowHot = true
    },
    [types.CLOSE_HOT] (state) {
        state.whetherShowHot = false
    }
}

export default {
	state,
	mutations
}