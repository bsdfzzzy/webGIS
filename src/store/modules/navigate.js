import * as types from '../constants'
import coordinate from './coordinate'
import ol from 'openlayers/dist/ol.js'

const state = {
    whetherShowNavigate: true,
    whetherShowNavigateContent: false,
  	start: {
      title: "请输入起点"
    },
  	direction: {
      title: "请输入终点"
    },
  	whetherShowChooseStart: false,
  	whetherShowChooseDirection: false,
  	showStarts: [],
  	showDirections: [],
  	disableButton: false,
    checkStart: true,
    checkDest: true,
    route: [],
    startFloor: 1,
    destFloor: 1,
    nowFloor: 1,
    nowType: 'outdoor',
    startLayer: "",
    destLayer: ""
}

const styles = {
  'route': new ol.style.Style({
    stroke: new ol.style.Stroke({
      width: 6, color: [237, 212, 0, 0.8]
    })
  }),
  'iconStart': new ol.style.Style({
    image: new ol.style.Icon({
      anchor: [0.5, 1],
      src: '/static/img/start.png',
      scale: 0.3
    })
  }),
  'iconDest': new ol.style.Style({
    image: new ol.style.Icon({
      anchor: [0.5, 1],
      src: '/static/img/dest.png',
      scale: 0.3
    })
  })
}

const mutations = {
  [types.SHOW_NAVIGATE] (state) {
    state.whetherShowNavigate = true
    state.whetherShowNavigateContent = false
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
  [types.SET_START] (state, start) {
    state.start = start
    state.startFloor = start.floor
    let startMarker = new ol.Feature({
      type: 'iconStart',
      geometry: new ol.geom.Point(start.coordinate),
      name: "startMarker"
    })
    if (window.pathStart) {
      map.removeLayer(pathStart)
    }
    window.pathStart = new ol.layer.Vector({
      source: new ol.source.Vector({
        features: [startMarker]
      }),
      style: function(feature) {
        return styles[feature.get('type')];
      }
    })
    pathStart.setZIndex(99)
    state.startLayer = pathStart
    map.addLayer(pathStart)
  },
  [types.SET_DEST] (state, dest) {
    state.direction = dest
    state.destFloor = dest.floor
    let destMarker = new ol.Feature({
      type: 'iconDest',
      geometry: new ol.geom.Point(dest.coordinate),
      name: "destMarker"
    })
    if (window.pathDest) {
      map.removeLayer(pathDest)
    }
    window.pathDest = new ol.layer.Vector({
      source: new ol.source.Vector({
        features: [destMarker]
      }),
      style: function(feature) {
        return styles[feature.get('type')];
      }
    })
    pathDest.setZIndex(99)
    state.destLayer = pathDest
    map.addLayer(pathDest)
  },
  [types.SET_CHECKSTART] (state, bol) {
    state.checkStart = bol
  },
  [types.SET_CHECKDEST] (state, bol) {
    state.checkDest = bol
  },
  [types.SET_ROUTE] (state, route) {
    state.route = route
  },
  [types.SHOW_NAVIGATE_CONTENT] (state) {
    state.whetherShowNavigateContent = true
    state.whetherShowNavigate = false
  },
  [types.CLOSE_NAVIGATE_CONTENT] (state) {
    state.whetherShowNavigateContent = false
    state.whetherShowNavigate = true
  },
  [types.SET_NOW_FLOOR] (state, floor) {
    state.nowFloor = floor
  },
  [types.SET_NOW_TYPE] (state, type) {
    state.nowType = type
  }
}

export default {
    state,
    mutations
}