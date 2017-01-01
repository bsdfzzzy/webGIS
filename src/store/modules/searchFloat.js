import * as types from '../constants'

const state = {
	whetherShowSearchFloat: false,
    choosingStart: false,
    choosingDest: false,
    searchKeyword: ""
}

const mutations = {
	[types.SHOW_SEARCHFLOAT] (state) {
        state.whetherShowSearchFloat = true
    },
    [types.CLOSE_SEARCHFLOAT] (state) {
        state.whetherShowSearchFloat = false
        state.searchKeyword = ""
    },
    [types.CHOOSING_START] (state) {
        state.choosingStart = true
    },
    [types.CHOOSING_DEST] (state) {
        state.choosingDest = true
    },
    [types.NOT_CHOOSING_START] (state) {
        state.choosingStart = false
    },
    [types.NOT_CHOOSING_DEST] (state) {
        state.choosingDest = false
    },
    [types.SET_SEARCH_KEYWORD] (state, keyword) {
        state.searchKeyword = keyword
    }
}

export default {
	state,
	mutations
}