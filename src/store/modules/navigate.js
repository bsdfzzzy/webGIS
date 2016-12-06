import * as types from '../constants'
import coordinate from './coordinate'

const state = {
    whetherShowNavigate: true,
  	start: {
      title: "我的位置"
    },
  	direction: {
      title: "荷福众创空间"
    },
  	whetherShowChooseStart: false,
  	whetherShowChooseDirection: false,
  	showStarts: [],
  	showDirections: [],
  	disableButton: false,
    checkStart: true,
    checkDest: true
}

const mutations = {
  [types.SHOW_NAVIGATE] (state) {
    state.whetherShowNavigate = true
  },
  [types.CLOSE_NAVIGATE] (state) {
    state.whetherShowNavigate = false
  },
  [types.SHOW_CHOOSESTART] (state) {
  	state.whetherShowChooseStart = true
  },
  [types.CLOSE_CHOOSESTART] (state) {
  	state.whetherShowChooseStart = false
  },
  [types.SHOW_CHOOSEDIRECTION] (state) {
  	state.whetherShowChooseDirection = true
  },
  [types.CLOSE_CHOOSEDIRECTION] (state) {
  	state.whetherShowChooseDirection = false
  },
  [types.SHOW_ALLSTARTS] (state) {
  	state.showStarts = coordinate.state.buildingCoordinate
  },
  [types.SHOW_PARTIALSTARTS] (state, str) {
  	state.showStarts = []
  	let matcher = eval('/' + str + '/')
  	coordinate.state.buildingCoordinate.map((item) => {
  		if (item.name.match(matcher)) {
  			state.showStarts.push(item)
  		}
  	})
  },
  [types.SHOW_ALLDIRECTIONS] (state, directions) {
  	state.showDirections = []
    for (let item of coordinate.state.buildingCoordinate) {
      if (item.id < 10) {
        state.showDirections.push(item)
      } else {
        break
      }
    }
  },
  [types.SHOW_PARTIALDIRECTIONS] (state, str) {
  	state.showDirections = []
  	let matcher = eval('/' + str + '/')
  	coordinate.state.buildingCoordinate.map((item) => {
  		if (item.name.match(matcher) && item.id < 10) {
  			state.showDirections.push(item)
  		}
  	})
  },
  [types.DISABLE_BUTTON] (state) {
  	state.disableButton = true
  },
  [types.SHOW_BUTTON] (state) {
  	if(coordinate.state.start.length == 2 && coordinate.state.direction.length == 2) {
  		state.disableButton = false
  	}
  },
  [types.SET_START] (state, str) {
    state.start = str
  },
  [types.SET_DEST] (state, str) {
    state.direction = str
  },
  [types.SET_CHECKSTART] (state, bol) {
    state.checkStart = bol
  },
  [types.SET_CHECKDEST] (state, bol) {
    state.checkDest = bol
  }
}

export default {
    state,
    mutations
}