import * as types from '../constants'
import coordinate from './coordinate'
import ol from 'openlayers/dist/ol.js'

const state = {
  	nowFloor: 1,
	mapLayer: "",
	vectorLayer: "",
	f1_layer: "",
	f2_layer: "",
	f3_layer: "",
	f4_layer: "",
	layers: []
}

const mutations = {
	[types.CHANGE_FLOOR] (state, floor) {
		state.nowFloor = floor
	},
	[types.SET_MAPLAYER] (state, layer) {
		state.mapLayer = layer
	},
	[types.SET_VECTORLAYER] (state, layer) {
		state.vectorLayer = layer
	},
	[types.SET_F1LAYER] (state, layer) {
		state.f1_layer = layer
	},
	[types.SET_F2LAYER] (state, layer) {
		state.f2_layer = layer
	},
	[types.SET_F3LAYER] (state, layer) {
		state.f3_layer = layer
	},
	[types.SET_F4LAYER] (state, layer) {
		state.f4_layer = layer
	},
	[types.SET_LAYERS] (state, f_layer) {
		if (f_layer) {
			state.layers = [state.mapLayer, state.vectorLayer, f_layer]
		} else {
			state.layers = [state.mapLayer, state.vectorLayer]
		}
	}
}

export default {
	state,
	mutations
}