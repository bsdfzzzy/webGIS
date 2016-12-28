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
  import { showInstruction, closeInstruction, changeBrief, changeTitle } from '../actions/instruction'
  import { showNavigate, closeNavigate } from '../actions/navigate'
  import { changeFloor, setMapLayer, setVectorLayer, setF1Layer, setF2Layer, setF3Layer, 
    setF4Layer, setLayers } from '../actions/map'
  import { showBlocks, showRooms, showTeams, setBlocks, setRooms, setTeams } from '../actions/list'
  import { getUserCoordinate, getBuilding, getPathLayer, getShowNavigateLogo, getMapFloor,
    getMapLayer, getVectorLayer, getF1Layer, getF2Layer, getF3Layer, getF4Layer, getLayers } from '../getters'
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
        getLayers
      },
      actions: {
        showInstruction,
        showNavigate,
        closeNavigate,
        closeInstruction,
        changeBrief,
        changeTitle,
        showBlocks,
				showRooms,
				showTeams,
				setBlocks,
				setRooms,
				setTeams,
        changeFloor,
        setMapLayer,
        setVectorLayer,
        setF1Layer,
        setF2Layer,
        setF3Layer,
        setF4Layer,
        setLayers
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
            url: 'http://geoserver.gugoo.cc/geoserver/gogomap/wms',
            params: {
              'FORMAT': format,
              'VERSION': '1.1.1',  
              'STYLES': '',
              'LAYERS': 'gogomap:gogo_original',
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
        console.log(window.map.layers)
        let content = e.target.innerHTML
        switch(content) {
          case '1F': 
            this.changeFloor(1)
            break
          case '2F': 
            this.changeFloor(2)
            break
          case '3F': 
            this.changeFloor(3)
            break
          case '4F': 
            this.changeFloor(4)
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
      let userCoor = this.getUserCoordinate
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
      let thumbnail = new ol.Feature({
        geometry: new ol.geom.Point([103.93056, 30.74784])
      })
      thumbnail.setId(1)
      thumbnail.setStyle(new ol.style.Style({
        image: new ol.style.Icon(({
          anchor: [0.5, 1],
          src: '/static/img/camera.png',
          scale: 0.1
        }))
      }))
      let vectorSource = new ol.source.Vector({
        features: [user, thumbnail]
      });
      let vectorLayer = new ol.layer.Vector({
        source: vectorSource
      });
      let wms = this.loadMap()
      that.setMapLayer(wms)
      that.setVectorLayer(vectorLayer)
      that.setLayers()
      window.map = new ol.Map({
        controls: ol.control.defaults({
          attribution: false
        }),
        target: 'map',
        overlays: [overlay],
        layers: that.getLayers
        ,
        view: view
      })
      map.getView().fit(bounds, map.getSize())
      view.setCenter(userCoor)
      view.setZoom(3)
      overlay.setPosition(userCoor)
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
        if (resolution <= 0.000001341104507446289) {
          ul_.style.display = 'block'
        }
      })
      map.on('click', function(evt) {
        that.closeInstruction()
        let view2 = map.getView()
        let view2Resolution = view2.getResolution()
        let source2 = wms.getSource()
        let url = source2.getGetFeatureInfoUrl(
          evt.coordinate, view2Resolution, view2.getProjection(),
          {'INFO_FORMAT': 'application/json', 'FEATURE_COUNT': 50})
        if (url) {
          axios.get(url)
          .then(function(res) {
            let brief, title
            let data = res.data
            console.log(data)
                switch(data.features[0].properties.refname || data.features[1].properties.refname) {
                  case "1号楼":
                    brief = that.getBrief(0)
                    title = that.getTitle(0)
                    that.changeTitle(title)
                    that.changeBrief(brief)
                    that.closeNavigate()
                    that.showInstruction()
                    break
                  case "2号楼":
                    brief = that.getBrief(1)
                    title = that.getTitle(1)
                    that.changeTitle(title)
                    that.changeBrief(brief)
                    that.closeNavigate()
                    that.showInstruction()
                    break
                  case "3号楼":
                    brief = that.getBrief(2)
                    title = that.getTitle(2)
                    that.changeTitle(title)
                    that.changeBrief(brief)
                    that.closeNavigate
                    that.showInstruction()
                    break
                  case "4号楼":
                    brief = that.getBrief(3)
                    title = that.getTitle(3)
                    that.changeTitle(title)
                    that.changeBrief(brief)
                    that.closeNavigate()
                    that.showInstruction()
                    break
                  case "5号楼":
                    brief = that.getBrief(4)
                    title = that.getTitle(4)
                    that.changeTitle(title)
                    that.changeBrief(brief)
                    that.closeNavigate()
                    that.showInstruction()
                    break
                  case "6号楼":
                    brief = that.getBrief(5)
                    title = that.getTitle(5)
                    that.changeTitle(title)
                    that.changeBrief(brief)
                    that.closeNavigate()
                    that.showInstruction()
                    break
                  case "7号楼":
                    brief = that.getBrief(6)
                    title = that.getTitle(6)
                    that.changeTitle(title)
                    that.changeBrief(brief)
                    that.closeNavigate()
                    that.showInstruction()
                    break
                  case "8号楼":
                    brief = that.getBrief(7)
                    title = that.getTitle(7)
                    that.changeTitle(title)
                    that.changeBrief(brief)
                    that.closeNavigate()
                    that.showInstruction()
                    break
                  default:
                    break
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
        data.building.map(function (item) {
          item.type = "BUILDING"
        })
        data.room.map(function (item) {
          item.type = "ROOM"
        })
        data.team.map(function (item) {
          item.type = "TEAM"
        })
				that.setBlocks(data.building)
				that.setRooms(data.room)
				that.setTeams(data.team)
			})
    }
  }
</script>
<style>
	.mapContainer {
		margin-top: 0px;
		overflow: hidden;
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
    top: 40%;
    background: white;
    border-radius: 100px;
    width: 40px;
    height: 40px;
  }
</style>