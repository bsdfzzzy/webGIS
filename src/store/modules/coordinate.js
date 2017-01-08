import * as types from '../constants'

const state = {
 	userCoordinate: [103.926272675, 30.7596634121],
 	start: [],
  direction: [103.93056, 30.74784],
  type: 'outdoor',
  floor: 1,
  uniqueId: 63,
  buildingCoordinate: []
}

let span = document.getElementById('initData')
let defaultCoor = JSON.parse(span.innerHTML)
if (Number(defaultCoor.longitude)) {
  state.userCoordinate = [Number(defaultCoor.longitude), Number(defaultCoor.lantitude)]
  state.start = [Number(defaultCoor.longitude), Number(defaultCoor.lantitude)]
  state.type = defaultCoor.type
  state.floor = Number(defaultCoor.floor)
  state.uniqueId = Number(defaultCoor.unique_id)
}

const mutations = {
  [types.SET_STARTCOORDINATE] (state, coordinate) {
  		state.start = coordinate
  },
  [types.SET_DIRECTIONCOORDINATE] (state, coordinate) {
  		state.direction = coordinate
  }
}

export default {
    state,
    mutations
}
