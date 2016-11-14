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
  <!-- <ul class="chooseFloor">
    <li class="floor active">1F</li>
    <li class="floor">2F</li>
    <li class="floor">3F</li>
  </ul> -->
</template>
<script>
	import ol from 'openlayers/dist/ol.js'
  import { showInstruction, closeInstruction, showNavigate, closeNavigate, changeBrief, changeTitle, setVueMap } from '../actions/components'
  import { getUserCoordinate, getBuilding, getPathLayer } from '../getters'

  export default {
    vuex: {
      getters: {
        getUserCoordinate,
        getBuilding,
        getPathLayer
      },
      actions: {
        showInstruction,
        showNavigate,
        closeNavigate,
        closeInstruction,
        changeBrief,
        changeTitle
      }
    },
  	methods: {
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
            console.log(item.name)
            return item.name
          }
        }
      }
    },
    watch: {
      getPathLayer: function (newPathLayer) {
        if (newPathLayer == "") {
          console.log()
        } else {
          console.log("bbb")
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
        2.9411764705882e-5,
        0.0000214576721191406,
        0.0000107288360595703,
        0.00000536441802978515,
        0.000002682209014892575,
        0.0000013411045074462876,
        6.705522537231438e-7,
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
      let thumbnail = new ol.Feature({
        geometry: new ol.geom.Point([103.93056, 30.74784])
      })
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
      window.map = new ol.Map({
        controls: ol.control.defaults({
          attribution: false
        }),
        target: 'map',
        overlays: [overlay],
        layers: [
          wms,
          vectorLayer
        ],
        view: view
      })
      map.getView().fit(bounds, map.getSize())
      view.setCenter(userCoor)
      view.setZoom(3)
      overlay.setPosition(userCoor)
      content.innerHTML = '<p>我的位置</p>';
      map.on('click', function(evt) {
        map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
          areaImg.style.display = "block"
        })
        that.closeInstruction()
        let view2 = map.getView()
        let view2Resolution = view2.getResolution()
        let source2 = wms.getSource()
        let url = source2.getGetFeatureInfoUrl(
          evt.coordinate, view2Resolution, view2.getProjection(),
          {'INFO_FORMAT': 'application/json', 'FEATURE_COUNT': 50})
        if (url) {
          fetch(url).then(function(res) {
            let brief, title
            if (res.ok) {
              res.json().then(function (data) {
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
            }
          }, function(e) {
            console.log(e)
          })
        }

      });
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
</style>