import * as types from '../constants'

const state = {
	whetherShowInstruction: false,
	title: "",
	brief: "",
    id: 0
}

const mutations = {
  [types.SHOW_INSTRUCTION] (state) {
    state.whetherShowInstruction = true
  },
  [types.CLOSE_INSTRUCTION] (state) {
    state.whetherShowInstruction = false
  },
  [types.CHANGE_BRIEF] (state, str) {
  	state.brief = str
  },
  [types.CHANGE_TITLE] (state, str) {
  	state.title = str
  },
  [types.SET_DESTID] (state, id) {
    state.id = id
  },
}

export default {
    state,
    mutations
}