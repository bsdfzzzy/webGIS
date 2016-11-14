export function showInstruction (state) {
    return state.components.instruction.showInstruction
}

export function showNavigate(state) {
  return state.components.navigate.showNavigate
}

export function showChooseStart (state) {
	return state.components.navigate.showChooseStart
}

export function showChooseDirection (state) {
	return state.components.navigate.showChooseDirection
}

export function showStarts (state) {
	return state.components.navigate.showStarts
}

export function showDirections (state) {
	return state.components.navigate.showDirections
}

export function getShowButton (state) {
	return state.components.navigate.disableButton
}

export function getUserCoordinate (state) {
	return state.coordinate.userCoordinate
}

export function getBuilding (state) {
	return state.coordinate.buildingCoordinate
}

export function getBriefContent (state) {
	return state.components.instruction.brief
}

export function getBriefTitle (state) {
	return state.components.instruction.title
}

export function getPathLayer (state) {
	return state.map.pathLayer
}

export function getStartCoordination (state) {
	return state.coordinate.start
}

export function getDirectionCoordination (state) {
	return state.coordinate.direction
}

export function getDestId (state) {
	return state.components.instruction.id
}

export function getDest (state) {
	return state.components.navigate.direction
}

export function getStart (state) {
	return state.components.navigate.start
}