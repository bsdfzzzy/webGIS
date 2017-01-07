import * as types from '../constants'

const state = {
	whetherShowList: false,
	blocks: [],
	businesses: [],
	teams: [],
	oldDisplay: [],
	display: [],
	nowSelect: "blocks",
	searchKey: ''
}

const mutations = {
	[types.SHOW_LIST] (state) {
		state.whetherShowList = true
	},
	[types.CLOSE_LIST] (state) {
		state.whetherShowList = false
	},
    [types.SHOW_BLOCKS] (state) {
		state.oldDisplay = state.blocks
		state.display = state.blocks
		state.nowSelect = 'blocks'
	},
	[types.SHOW_BUSINESSES] (state) {
		state.oldDisplay = state.businesses
		state.display = state.businesses
		state.nowSelect = 'businesses'
	},
	[types.SHOW_TEAMS] (state) {
		state.oldDisplay = state.teams
		state.display = state.teams
		state.nowSelect = 'teams'
	},
	[types.SHOW_NOT_ALL_BLOCKS] (state) {
		state.nowSelect = 'blocks'
	},
	[types.SHOW_NOT_ALL_BUSINESSES] (state) {
		state.nowSelect = 'businesses'
	},
	[types.SHOW_NOT_ALL_TEAMS] (state) {
		state.nowSelect = 'teams'
	},
	[types.SET_BLOCKS] (state, blocks) {
		state.blocks = blocks
	},
	[types.SET_BUSINESSES] (state, businesses) {
		state.businesses = businesses
	},
	[types.SET_TEAMS] (state, teams) {
		state.teams = teams
	},
	[types.SET_DISPLAY] (state, display) {
		state.display = display
	}
}

export default {
	state,
	mutations
}