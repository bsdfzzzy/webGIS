import * as types from '../constants'

const state = {
	whetherShowSearchResult: false,
    results: []
}

const mutations = {
	[types.SHOW_SEARCHRESULT] (state) {
        state.whetherShowSearchResult = true
    },
    [types.CLOSE_SEARCHRESULT] (state) {
        state.whetherShowSearchResult = false
    },
    [types.SET_SEARCHRESULT] (state, results) {
        state.results = results
    }
}

export default {
	state,
	mutations
}