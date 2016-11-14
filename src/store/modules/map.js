import * as types from '../constants'
import coordinate from './coordinate'
import ol from 'openlayers/dist/ol.js'

const state = {
	map: {
  		mainMap: "",
  		bounds: [103.91759021426549, 30.741624632146454,103.93913373188894, 30.76281872384709],
  		resolutions: [
  			2.9411764705882e-5,
        	0.0000214576721191406,
        	0.0000107288360595703,
        	0.00000536441802978515,
        	0.000002682209014892575,
        	0.0000013411045074462876,
        	6.705522537231438e-7,
  		],
  		pathLayer: ""
  	}
}

const mutations = {
	
}

export default {
	state,
	mutations
}