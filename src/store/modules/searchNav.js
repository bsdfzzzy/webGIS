import * as types from '../constants'

const state = {
    whetherShowSearchNav: true,
}

const mutations = {
    [types.SHOW_SEARCHNAV] (state) {
        state.whetherShowSearchNav = true
    },
    [types.CLOSE_SEARCHNAV] (state) {
        state.whetherShowSearchNav = false
    }
}

export default {
    state,
    mutations
}