<template>
	<div class="mapContainer map" id="map"></div>
  <div id="popup" class="ol-popup">
    <a href="#" id="popup-closer" class="ol-popup-closer"></a>
    <div id="popup-content"></div>
  </div>
  <div id="areaImg">
    <img src="/static/img/area.jpg">
    <div id="closeImg">×</div>
  </div>
  <ul class="chooseFloor" id="chooseFloor">
    <li class="floor{{getMapFloor == 1 ? ' active' : ''}}" @click="changeMapFloor">1F</li>
    <li class="floor{{getMapFloor == 2 ? ' active' : ''}}" @click="changeMapFloor">2F</li>
    <li class="floor{{getMapFloor == 3 ? ' active' : ''}}" @click="changeMapFloor">3F</li>
    <li class="floor{{getMapFloor == 4 ? ' active' : ''}}" @click="changeMapFloor">4F</li>
  </ul>
  <div class="navigateLogo" @click="logoToShowNavigate" v-if="getShowNavigateLogo">
    <img src="/static/img/navi.png" width="40px" height="40px">
  </div>
</template>
<script>
	import ol from 'openlayers/dist/ol.js'
  import { showInstruction, closeInstruction, changeBrief, changeTitle, setIntro, showItsIndoor, showItsBusiness } from '../actions/instruction'
  import { showNavigate, closeNavigate, setStart, setNowType, setNowFloor } from '../actions/navigate'
  import { changeFloor, setMapLayer, setVectorLayer, setF1Layer, setF2Layer, setF3Layer, 
    setF4Layer, setLayers } from '../actions/map'
  import { setHots } from '../actions/hot'
  import { showBlocks, showBusinesses, showTeams, setBlocks, setBusinesses, setTeams } from '../actions/list'
  import { getUserCoordinate, getBuilding, getPathLayer, getShowNavigateLogo, getMapFloor,
    getMapLayer, getVectorLayer, getF1Layer, getF2Layer, getF3Layer, getF4Layer, getLayers,
    getListAll, getRoute, getInitialType, getInitialFloor, getInitialUniqueId, getStartLayer, 
    getDestLayer, getNowType, getNowFloor, getStartFloor, getDestFloor } from '../getters'
  import axios from 'axios'

  export default {
    vuex: {
      getters: {
        getUserCoordinate,
        getBuilding,
        getPathLayer,
        getShowNavigateLogo,
        getMapFloor,
        getMapLayer,
        getVectorLayer,
        getF1Layer,
        getF2Layer,
        getF3Layer,
        getF4Layer,
        getLayers,
        getListAll,
        getRoute,
        getInitialType,
        getInitialFloor,
        getInitialUniqueId,
        getNowType,
        getNowFloor,
        getStartFloor,
        getDestFloor
      },
      actions: {
        showInstruction,
        showNavigate,
        closeNavigate,
        closeInstruction,
        changeBrief,
        changeTitle,
        showBlocks,
				showBusinesses,
				showTeams,
				setBlocks,
				setBusinesses,
				setTeams,
        changeFloor,
        setMapLayer,
        setVectorLayer,
        setF1Layer,
        setF2Layer,
        setF3Layer,
        setF4Layer,
        setLayers,
        setIntro,
        setHots,
        showItsIndoor,
        showItsBusiness,
        setStart,
        setNowType,
        setNowFloor
      }
    },
  	methods: {
      logoToShowNavigate () {
        this.showNavigate()
      },
   		loadMap: function () {
   			let format = 'image/png';
				let bounds = [103.91759021426549, 30.741624632146454,
                    103.93913373188894, 30.76281872384709];
				let wms = new ol.layer.Image({
          source: new ol.source.ImageWMS({
            ratio: 1,
            url: 'http://geoserver.gugoo.cc/geoserver/UESTC/wms',
            params: {
              'FORMAT': format,
              'VERSION': '1.1.1',  
              'STYLES': '',
              'LAYERS': 'UESTC:UESTC_outdoor',
            }
          })
        });
        return wms
    	},
      getBrief: function (id) {
        let building = this.getBuilding
        for (let item of building) {
          if (item.id == id) {
            return item.disc
          }
        }
      },
      getTitle: function (id) {
        let building = this.getBuilding
        for (let item of building) {
          if (item.id == id) {
            console.log(item.title)
            return item.title
          }
        }
      },
      changeMapFloor (e) {
        let content = e.target.innerHTML
        switch(content) {
          case '1F': 
            this.changeFloor(1)
            this.setNowFloor(1)
            break
          case '2F': 
            this.changeFloor(2)
            this.setNowFloor(2)
            break
          case '3F': 
            this.changeFloor(3)
            this.setNowFloor(3)
            break
          case '4F': 
            this.changeFloor(4)
            this.setNowFloor(4)
            break
        }
      }
    },
    watch: {
      getMapFloor: function (floor) {
        let f1_layer = this.getF1Layer
        let f2_layer = this.getF2Layer
        let f3_layer = this.getF3Layer
        let f4_layer = this.getF4Layer
        let route = this.getRoute
        if (floor == 1) {
          window.map.removeLayer(f1_layer)
          window.map.removeLayer(f4_layer)
          window.map.removeLayer(f2_layer)
          window.map.removeLayer(f3_layer)
          window.map.addLayer(f1_layer)
        } else if (floor == 2) {
          window.map.removeLayer(f1_layer)
          window.map.removeLayer(f4_layer)
          window.map.removeLayer(f2_layer)
          window.map.removeLayer(f3_layer)
          window.map.addLayer(f2_layer)
        } else if (floor == 3) {
          window.map.removeLayer(f1_layer)
          window.map.removeLayer(f4_layer)
          window.map.removeLayer(f2_layer)
          window.map.removeLayer(f3_layer)
          window.map.addLayer(f3_layer)
        } else if (floor == 4) {
          window.map.removeLayer(f1_layer)
          window.map.removeLayer(f4_layer)
          window.map.removeLayer(f2_layer)
          window.map.removeLayer(f3_layer)
          window.map.addLayer(f4_layer)
        }
        if (window.pathResult) {
          map.removeLayer(pathResult)
        }
        if (route[Number(floor) - 1]) {
          let lineFeature = new ol.Feature({
						geometry: new ol.geom.LineString(route[Number(floor - 1)])
					})
					let lineSource = new ol.source.Vector({
						features: [lineFeature]
					})
					window.pathResult = new ol.layer.Vector({
						source: lineSource,
						style: new ol.style.Style({
							stroke: new ol.style.Stroke({
								width: 3,
								color: [255, 0, 0, 0.8]
							})
						})
					})
					map.addLayer(pathResult)
        }
      },
      getNowType (type) {
        let that =this
        if (type == 'outdoor') {
          if (window.pathStart) {
            map.removeLayer(pathStart)
            map.addLayer(pathStart)
          }
          if (window.pathDest) {
            map.removeLayer(pathDest)
            map.addLayer(pathDest)
          }
          if (window.pathResult) {
            map.removeLayer(pathResult)
            let route = this.getRoute
            let lineFeature = new ol.Feature({
						  geometry: new ol.geom.LineString(route[0])
					  })
					  let lineSource = new ol.source.Vector({
						  features: [lineFeature]
					  })
					  window.pathResult = new ol.layer.Vector({
						  source: lineSource,
						  style: new ol.style.Style({
							  stroke: new ol.style.Stroke({
								  width: 3,
								  color: [255, 0, 0, 0.8]
							  })
						  })
					  })
					  map.addLayer(pathResult)
          }
        } else {
          if (window.pathStart) {
            if (that.getStartFloor == that.getNowFloor) {
              map.removeLayer(pathStart)
              map.addLayer(pathStart)
            } else {
              map.removeLayer(pathStart)
            }
          }
          if (window.pathDest) {
            if (that.getDestFloor == that.getNowFloor) {
              map.removeLayer(pathDest)
              map.addLayer(pathDest)
            } else {
              map.removeLayer(pathDest)
            }
          }
          if (window.pathResult) {
            map.removeLayer(pathResult)
            let floor = this.getMapFloor
            let lineFeature = new ol.Feature({
						  geometry: new ol.geom.LineString(route[Number(floor - 1)])
					  })
					  let lineSource = new ol.source.Vector({
						  features: [lineFeature]
					  })
					  window.pathResult = new ol.layer.Vector({
						  source: lineSource,
						  style: new ol.style.Style({
							  stroke: new ol.style.Stroke({
								  width: 3,
								  color: [255, 0, 0, 0.8]
							  })
						  })
					  })
					  map.addLayer(pathResult)
          }
        }
      },
      getNowFloor (floor) {
        let that = this
        if (window.pathStart) {
          if (that.getStartFloor == that.getNowFloor) {
            map.removeLayer(pathStart)
            map.addLayer(pathStart)
          } else {
            map.removeLayer(pathStart)
          }
        }
        if (window.pathDest) {
          if (that.getDestFloor == that.getNowFloor) {
            map.removeLayer(pathDest)
            map.addLayer(pathDest)
          } else {
            map.removeLayer(pathDest)
          }
        }
      }
    },
    ready: function () {
      let that = this
      let container = document.getElementById('popup')
      let content = document.getElementById('popup-content')
      let closer = document.getElementById('popup-closer')
      let areaImg = document.getElementById("areaImg")
      let closeImg = document.getElementById("closeImg")
      closeImg.onclick = function (e) {
        areaImg.style.display = "none"
      }
      let overlay = new ol.Overlay(/** @type {olx.OverlayOptions} */ ({
        element: container,
        autoPan: true,
        autoPanAnimation: {
          duration: 250
        }
      }));
      closer.onclick = function() {
        overlay.setPosition(undefined);
        closer.blur();
        return false;
      };
      let bounds = [103.91759021426549, 30.741624632146454,
                    103.93913373188894, 30.76281872384709]
      let resolutions = [
        0.0000858306884765625,
        0.00004291534423828125,
        0.000021457672119140625,
        0.000010728836059570312,
        0.000005364418029785156,
        0.000002682209014892578,
        0.000001341104507446289,
        6.705522537231445e-7,
        3.3527612686157227e-7,
        1.6763806343078613e-7
      ];
      let projection = new ol.proj.Projection({
        code: 'EPSG:4326',
        units: 'degrees',
        axisOrientation: 'neu'
      })
      let view = new ol.View({
        projection: projection,
        resolutions: resolutions,
        maxZoom: 7,
      })
      
      // let thumbnail = new ol.Feature({
      //   geometry: new ol.geom.Point([103.93056, 30.74784])
      // })
      // thumbnail.setId(1)
      // thumbnail.setStyle(new ol.style.Style({
      //   image: new ol.style.Icon(({
      //     anchor: [0.5, 1],
      //     src: '/static/img/camera.png',
      //     scale: 0.1
      //   }))
      // }))
      
      let wms = this.loadMap()
      that.setMapLayer(wms)

      // Initial User Position
      let userCoor = this.getUserCoordinate
      if (that.getInitialUniqueId != 0 && that.getInitialUniqueId != 99999) {
        let user = new ol.Feature({
          geometry: new ol.geom.Point(userCoor)
        })
        user.setId(0)
        user.setStyle(new ol.style.Style({
          image: new ol.style.Icon(({
            anchor: [0.5, 0.5],
            src: '/static/img/user.png',
            scale: 0.3
          }))
        }))
        let vectorSource = new ol.source.Vector({
          features: [user]
        })
        let vectorLayer = new ol.layer.Vector({
          source: vectorSource
        })
        that.setVectorLayer(vectorLayer)
        vectorLayer.setZIndex(99)
        view.setCenter(userCoor)
        if (that.getInitialType == 'outdoor') {
          view.setZoom(3)
        } else {
          view.setZoom(6)
        }
        axios.get(`http://map.gugoo.cc/get_detail?unique_id=${that.getInitialUniqueId}`).then(res => {
          let data = res.data
          if (data.building.title) {
            that.setStart(data.building)
          } else if (data.team.title) {
            that.setStart(data.team)
          }
        })
      } else {
        view.setCenter(userCoor)
        view.setZoom(0)
      }
      that.setLayers()
      window.map = new ol.Map({
        controls: ol.control.defaults({
          attribution: false
        }),
        target: 'map',
        overlays: [overlay],
        layers: that.getLayers,
        view: view
      })
      // map.getView().fit(bounds, map.getSize())
      
      // overlay.setPosition(userCoor)
      content.innerHTML = '<p>我的位置</p>';
      let f1_layer = new ol.layer.Image({
        source: new ol.source.ImageWMS({
          ratio: 1,
          url: 'http://geoserver.gugoo.cc/geoserver/UESTC/wms',
          params: {
            'FORMAT': 'image/png',
            'VERSION': '1.1.1',  
            'STYLES': '',
            'LAYERS': 'UESTC:UESTC_F1',
          }
        })
      })
      let f2_layer = new ol.layer.Image({
        source: new ol.source.ImageWMS({
          ratio: 1,
          url: 'http://geoserver.gugoo.cc/geoserver/UESTC/wms',
          params: {
            'FORMAT': 'image/png',
            'VERSION': '1.1.1',  
            'STYLES': '',
            'LAYERS': 'UESTC:UESTC_F2',
          }
        })
      })
      let f3_layer = new ol.layer.Image({
        source: new ol.source.ImageWMS({
          ratio: 1,
          url: 'http://geoserver.gugoo.cc/geoserver/UESTC/wms',
          params: {
            'FORMAT': 'image/png',
            'VERSION': '1.1.1',  
            'STYLES': '',
            'LAYERS': 'UESTC:UESTC_F3',
          }
        })
      })
      let f4_layer = new ol.layer.Image({
        source: new ol.source.ImageWMS({
          ratio: 1,
          url: 'http://geoserver.gugoo.cc/geoserver/UESTC/wms',
          params: {
            'FORMAT': 'image/png',
            'VERSION': '1.1.1',  
            'STYLES': '',
            'LAYERS': 'UESTC:UESTC_F4',
          }
        })
      })
      that.setF1Layer(f1_layer)
      that.setF2Layer(f2_layer)
      that.setF3Layer(f3_layer)
      that.setF4Layer(f4_layer)
      // f1_layer.setZIndex(99)
      // f2_layer.setZIndex(99)
      // f3_layer.setZIndex(99)
      // f4_layer.setZIndex(99)
      // f1_layer.setExtent([103.92656545078216, 30.757355540999242,103.92712937031598, 30.758423502907476])
      // f2_layer.setExtent([103.92656545078216, 30.757355540999242,103.92712937031598, 30.758423502907476])
      // f3_layer.setExtent([103.92656545078216, 30.757355540999242,103.92712937031598, 30.758423502907476])
      // f4_layer.setExtent([103.92656545078216, 30.757355540999242,103.92712937031598, 30.758423502907476])

      switch(that.getMapFloor) {
        case 1:
          map.addLayer(f1_layer)
          break
        case 2:
          map.addLayer(f2_layer)
          break
        case 3:
          map.addLayer(f3_layer)
          break
        case 4:
          map.addLayer(f4_layer)
          break
        default: 
          break
      }
      map.on('moveend', function (e) {
        let view = map.getView()
        let resolution = view.getResolution()
        let ul_ = document.getElementById('chooseFloor')
        if (resolution < 0.000002682209014892578) {
          ul_.style.display = 'block'
          that.setNowType('indoor')
        } else {
          ul_.style.display = 'none'
          that.setNowType('outdoor')
        }
      })
      let shouldShowIndoor = [61, 62, 64, 63, 59, 60, 58, 57, 89]
      map.on('click', function(evt) {
        that.closeInstruction()
        that.closeNavigate()
        let view2 = map.getView()
        let view2Resolution = view2.getResolution()
        let source2
        let url
        if (view2Resolution < 0.000002682209014892578) {
          switch(that.getMapFloor) {
            case 1:
              source2 = f1_layer.getSource()
              break
            case 2:
              source2 = f2_layer.getSource()
              break
            case 3:
              source2 = f3_layer.getSource()
              break
            case 4:
              source2 = f4_layer.getSource()
              break
            default: 
              break
          }
          url = source2.getGetFeatureInfoUrl(
            evt.coordinate, view2Resolution, view2.getProjection(),
            {'INFO_FORMAT': 'application/json', 'FEATURE_COUNT': 50}
          )
        } else {
          source2 = wms.getSource()
          url = source2.getGetFeatureInfoUrl(
            evt.coordinate, view2Resolution, view2.getProjection(),
            {'INFO_FORMAT': 'application/json', 'FEATURE_COUNT': 50})
        }
        if (url) {
          axios.get(url)
          .then(function(res) {
            let brief, title
            let data = res.data
            let uid = data.features[0].properties.Unique_ID
            console.log(data)
            for (let item of that.getListAll) {
              if (item) {
                if (item.unique_id == uid) {
                  let haveIndoor = false
                  for (let ifIndoor of shouldShowIndoor) {
                    if (ifIndoor == uid) {
                      that.showItsIndoor()
                      haveIndoor = true
                      break
                    }
                  }
                  if (!haveIndoor) {
                    that.showItsBusiness()
                  }
                  that.setIntro(item)
                  that.showInstruction()
                  that.closeNavigate()
                }
              } 
            }
          })
          .catch(function(e) {
            console.log(e)
          })
        }
        map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
          if (feature.getId() == 1) {
            areaImg.style.display = "block"
          }
        })
      });
      axios.get('http://map.gugoo.cc/get_all_detail').then(function (res) {
				let data = res.data.data
        let buildings, businesses = [], teams
        if (data.building) {
          buildings = data.building
          buildings.map(function (item) {
            item.type = "BUILDING"
          })
        }
        if (data.team) {
          teams = data.team
          teams.map(function (item) {
            item.type = "TEAM"
          })
        }
        if (teams) {
          teams.map(function (item) {
            if (item.business) {
              item.business.map(function (child) {
                child.title = child.business_name
                child.detail = child.business_detail
                child.unique_id = item.unique_id
                businesses.push(child)
              })
            }
          })
        }
        if (buildings) {
          buildings.map(function (item) {
            if (item.business) {
              item.business.map(function (child) {
                child.title = child.business_name
                child.detail = child.business_detail
                child.unique_id = item.unique_id
                businesses.push(child)
              })
            }
          })
        }
				that.setBlocks(buildings)
				that.setBusinesses(businesses)
				that.setTeams(teams)
			})
      axios.get('http://map.gugoo.cc/get_hotsearch?unique_id=0').then(function (res) {
        let hots = res.data
        that.setHots(hots)
      })
    }
  }
</script>
<style>
	.mapContainer {
		margin-top: 40px;
		overflow: hidden;
    border-top: 1px solid rgba(240, 240, 240, 0.8);
	}
	#map {
		height: 100%;
    position: relative;
    overflow: hidden;
	}
  .ol-zoom-in {
    position: fixed;
    bottom: 40%;
    height: 28px !important;
    width: 28px !important;
    margin-left: 10px;
    border: 1px solid white;
    background-color: #34a4e4;
    color: white;
    font-size: 20px;
    outline: none;
  }
  .ol-zoom-out {
    position: fixed;
    bottom: calc(40% - 33px);
    height: 28px !important;
    width: 28px !important;
    margin-left: 10px;
    border: 1px solid white;
    background-color: #34a4e4;
    color: white;
    font-size: 20px;
    outline: none;
  }
  .chooseFloor {
    position: fixed;
    top: 45%;
    right: 10px;
    width: 28px;
    overflow: hidden;
    display: none;
  }
  .floor {
    width: 100%;
    height: 28px;
    background: white;
    color: #4f5f6f;
    text-align: center;
    line-height: 28px;
    margin-bottom: 1px;
  }
  .active {
    background: #34a4e4;
    color: white; 
  }
  .ol-popup {
    position: absolute;
    background-color: white;
    -webkit-filter: drop-shadow(0 1px 4px rgba(0,0,0,0.2));
    filter: drop-shadow(0 1px 4px rgba(0,0,0,0.2));
    padding: 15px;
    border-radius: 10px;
    border: 1px solid #cccccc;
    bottom: 12px;
    left: -50px;
    min-width: 70px;
  }
  .ol-popup:after, .ol-popup:before {
    top: 100%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
  }
  .ol-popup:after {
    border-top-color: white;
    border-width: 10px;
    left: 48px;
    margin-left: -10px;
  }
  .ol-popup:before {
    border-top-color: #cccccc;
    border-width: 11px;
    left: 48px;
    margin-left: -11px;
  }
  .ol-popup-closer {
    text-decoration: none;
    position: absolute;
    top: 2px;
    right: 8px;
  }
  .ol-popup-closer:after {
    content: "×";
  }
  #areaImg {
    position: fixed;
    top: 10%;
    left: 2%;
    width: 96%;
    height: 38%;
    display: none;
    overflow: hidden;
  }
  #areaImg img{
    width: 100%;
    height: 100%;
  }
  #closeImg {
    position: absolute;
    right: 0;
    top: 0;
    width: 20px;
    height: 20px;
    background: rgba(200, 200, 200, 0.3);
    color: red;
    font-size: 20px;
    line-height: 20px;
    text-align: center;
  }
  .navigateLogo {
    position: fixed;
    right: 10px;
    top: 75%;
    background: white;
    border-radius: 100px;
    width: 40px;
    height: 40px;
  }
</style>