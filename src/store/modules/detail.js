import * as types from '../constants'

const state = {
	whetherShowDetail: false,
    display: {},
    showBase: true,
    showBusiness: false
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
    },
    [types.SHOW_BASE] (state) {
        state.showBase = true
        state.showBusiness = false
    },
    [types.SHOW_BUSINESS] (state) {
        state.showBase = false
        state.showBusiness = true
    }
}

export default {
	state,
	mutations
}