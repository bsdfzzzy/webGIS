import * as types from '../constants'

const state = {
	whetherShowInstruction: false,
	title: "",
	brief: "",
  id: 0,
  intro: {},
  whetherShowIndoor: false,
  whetherShowBusiness: false
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
  [types.SET_INTRO] (state, intro) {
    state.intro = intro
  },
  [types.SHOW_ITS_INDOOR] (state) {
    state.whetherShowIndoor = true
    state.whetherShowBusiness = false
  },
  [types.SHOW_ITS_BUSINESS] (state) {
    state.whetherShowIndoor = false
    state.whetherShowBusiness = true
  }
}

export default {
    state,
    mutations
}