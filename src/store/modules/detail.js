import * as types from '../constants'

const state = {
	whetherShowDetail: false,
    display: {}
}

const mutations = {
	[types.SHOW_DETAIL] (state) {
        state.whetherShowDetail = true
    },
    [types.CLOSE_DETAIL] (state) {
        state.whetherShowDetail = false
    },
    [types.SET_DISPLAY_DETAIL] (state, detail) {
        state.display = detail
    }
}

export default {
	state,
	mutations
}