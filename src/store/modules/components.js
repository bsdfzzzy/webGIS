import * as types from '../constants'
import coordinate from './coordinate'
import ol from 'openlayers/dist/ol.js'

const state = {
	instruction: {
		showInstruction: false,
		title: "",
		brief: "",
    id: 0
	},
  navigate: {
  	showNavigate: true,
  	start: "我的位置",
  	direction: "荷福众创空间",
  	showChooseStart: false,
  	showChooseDirection: false,
  	showStarts: [],
  	showDirections: [],
  	disableButton: false
  }
}

const mutations = {
  [types.SHOW_INSTRUCTION] (state) {
    state.instruction.showInstruction = true
  },
  [types.CLOSE_INSTRUCTION] (state) {
    state.instruction.showInstruction = false
  },
  [types.CHANGE_BRIEF] (state, str) {
  	state.instruction.brief = str
  },
  [types.CHANGE_TITLE] (state, str) {
  	state.instruction.title = str
  },
  [types.SHOW_NAVIGATE] (state) {
    state.navigate.showNavigate = true
  },
  [types.CLOSE_NAVIGATE] (state) {
    state.navigate.showNavigate = false
  },
  [types.SHOW_CHOOSESTART] (state) {
  	state.navigate.showChooseStart = true
  },
  [types.CLOSE_CHOOSESTART] (state) {
  	state.navigate.showChooseStart = false
  },
  [types.SHOW_CHOOSEDIRECTION] (state) {
  	state.navigate.showChooseDirection = true
  },
  [types.CLOSE_CHOOSEDIRECTION] (state) {
  	state.navigate.showChooseDirection = false
  },
  [types.SHOW_ALLSTARTS] (state) {
  	state.navigate.showStarts = coordinate.state.buildingCoordinate
  },
  [types.SHOW_PARTIALSTARTS] (state, str) {
  	state.navigate.showStarts = []
  	let matcher = eval('/' + str + '/')
  	coordinate.state.buildingCoordinate.map((item) => {
  		if (item.name.match(matcher)) {
  			state.navigate.showStarts.push(item)
  		}
  	})
  },
  [types.SHOW_ALLDIRECTIONS] (state, directions) {
  	state.navigate.showDirections = []
    for (let item of coordinate.state.buildingCoordinate) {
      if (item.id < 8) {
        state.navigate.showDirections.push(item)
      } else {
        break
      }
    }
  },
  [types.SHOW_PARTIALDIRECTIONS] (state, str) {
  	state.navigate.showDirections = []
  	let matcher = eval('/' + str + '/')
  	coordinate.state.buildingCoordinate.map((item) => {
  		if (item.name.match(matcher) && item.id < 8) {
  			state.navigate.showDirections.push(item)
  		}
  	})
  },
  [types.DISABLE_BUTTON] (state) {
  	state.navigate.disableButton = true
  },
  [types.SHOW_BUTTON] (state) {
  	if(coordinate.state.start.length == 2 && coordinate.state.direction.length == 2) {
  		state.navigate.disableButton = false
  	}
  },
  [types.SET_DESTID] (state, id) {
    state.instruction.id = id
  },
  [types.SET_START] (state, str) {
    state.navigate.start = str
  },
  [types.SET_DEST] (state, str) {
    state.navigate.direction = str
  }
}

export default {
    state,
    mutations
}