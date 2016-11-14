<template>
	<div class="navigate">
		<div class="closeNavigateBox" @click="closeNavigateBox">×</div>
		<div class="content">
			<div class="mainContent">
				<div class="fromAndTo">
					<input type="text" name="from" placeholder="{{getStart}}" v-model="start" @focus="showStartChoose">
					<input type="text" name="to" placeholder="{{getDest}}" @focus="showDirectionChoose" :value="direction" v-model="direction">
				</div>
				<div class="chooseStartBox" v-if="showChooseStart">
					<div class="closeChoose" @click="closeChoose">×</div>
					<ul>
						<li v-for="start in showStarts" @click="selectStart" data-id="{{start.id}}">{{start.name}}</li>
					</ul>
				</div>
				<div class="chooseDirectionBox" v-if="showChooseDirection">
					<div class="closeChoose" @click="closeChoose">×</div>
					<ul>
						<li v-for="direction in showDirections" @click="selectDirection" data-id="{{direction.id}}">{{direction.name}}</li>
					</ul>
				</div>
			</div>
				<button class="navigateButtonContainer" :disabled="getShowButton" @click="pathNavigate">路径规划</button>
			</div>
	</div>
</template>
<script>
	import { showChooseStart, showChooseDirection, showStarts, showDirections, getShowButton, getStartCoordination, getDirectionCoordination, getStart, getDest } from '../getters'
	import { displayChooseStart, closeChooseStart, displayChooseDirection, closeChooseDirection, showAllStarts, showPartialStarts, showAllDirections, showPartialDirections, showButton, disableButton, setDestId, setStart,setDest, closeNavigate } from '../actions/components'
	import { setStartCoordinate, setDirectionCoordinate } from '../actions/coordinate'
	import ol from 'openlayers/dist/ol.js'

	export default {
		ready: function () {
			this.showAllDirections()
		},
		data () {
			return {
				start: "",
				direction: "",
			}
		},
		vuex: {
			getters: {
				showChooseStart,
				showChooseDirection,
				showStarts,
				showDirections,
				getShowButton,
				getStartCoordination,
				getDirectionCoordination,
				getStart,
				getDest
			},
			actions: {
				displayChooseStart,
				displayChooseDirection,
				closeChooseStart,
				closeChooseDirection,
				showAllDirections,
				showAllStarts,
				showPartialDirections,
				showPartialStarts,
				setStartCoordinate,
				setDirectionCoordinate,
				showButton, 
				disableButton,
				setDestId,
				setStart,
				setDest,
				closeNavigate
			}
		},
		methods: {
			closeChoose () {
				this.closeStartChoose()
				this.closeDirectionChoose()
			},
			closeNavigateBox() {
				this.closeNavigate()
			},
			showStartChoose () {
				this.displayChooseStart()
				this.closeChooseDirection()
				this.disableButton()
			},
			closeStartChoose () {
				this.closeChooseStart()
			},
			showDirectionChoose () {
				this.displayChooseDirection()
				this.closeChooseStart()
				this.disableButton()
			},
			closeDirectionChoose () {
				this.closeChooseDirection()
			},
			selectStart (e) {
				this.start = e.target.innerHTML
				this.closeStartChoose()
				this.setStartCoordinate(e.target.dataset.id)
				this.showButton()
			},
			selectDirection (e) {
				this.direction = e.target.innerHTML
				this.closeDirectionChoose()
				this.setDirectionCoordinate(e.target.dataset.id)
				this.setDestId(e.target.dataset.id)
				this.showButton()
			},
			pathNavigate () {
				if (window.path) {
					map.removeLayer(path)
				}
				let startPoint = this.getStartCoordination
				let destPoint = this.getDirectionCoordination
				let popup = document.getElementById("popup")
				popup.style.display = "none"
				let viewparams = [
      				'x1:' + startPoint[0], 'y1:' + startPoint[1],  
      				'x2:' + destPoint[0], 'y2:' + destPoint[1]  
    			];  
    			viewparams = viewparams.join(';')
    			window.pathResult = new ol.layer.Image({
    				source: new ol.source.ImageWMS({
    					url: 'http://geoserver.gugoo.cc/geoserver/gogomap/wms',
    					params: {
    						LAYERS: 'gogomap:sql-test',
    						FORMAT: 'image/png',
    						viewparams: viewparams
    					}
    				})
    			})
    			console.log(pathResult)
    			map.addLayer(pathResult)
				let startMarker = new ol.Feature({
        			type: 'iconStart',
        			geometry: new ol.geom.Point(startPoint)
      			});
      			let endMarker = new ol.Feature({
        			type: 'iconDest',
        			geometry: new ol.geom.Point(destPoint)
      			});
      			let styles = {
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
      			window.path = new ol.layer.Vector({
        			source: new ol.source.Vector({
          				features: [startMarker, endMarker]
        			}),
        			style: function(feature) {
          				return styles[feature.get('type')];
        			}
      			});

				map.addLayer(path)
			}
		},
		watch: {
			start: function (newStart) {
				this.setStart(newStart)
				if (newStart == "") {
					this.showAllStarts()
				} else {
					this.showPartialStarts(newStart)
				}
			},
			direction: function (newDirection) {
				this.setDest(newDirection)
				if (newDirection == "") {
					this.showAllDirections()
				} else {
					this.showPartialDirections(newDirection)
				}
			}
		}
	}
</script>
<style>
	.navigate {
		position: fixed;
		bottom: 0;
		width: 96%;
		height: 172px;
		background: rgba(52, 164, 228, 0.2);
		margin: auto;
		left: 0;
		right: 0;
		padding: 25px 30px 15px;
		box-sizing: border-box;
	}
	.closeNavigateBox {
		position: absolute;
		top: 0;
		right: 0;
		width: 20px;
		height: 20px;
		background: rgba(200, 200, 200, 0.3);
		font-size: 17px;
		text-align: center;
		line-height: 20px;
		z-index: 1000;
	}
	.content {
		width: 100%;
		height: 100%;
	}
	.mainContent {
		width: 100%;
		height: 80px;
		margin-bottom: 0px;
		position: relative;
	}
	.mainContent ul {
		list-style: none;
		padding: 10px 20px 20px;
		height: 180px;
		overflow: auto;
		box-sizing: border-box;
	}
	.mainContent ul li {
		border-bottom: 1px dashed #bbb;
		line-height: 37px;
	}
	.fromAndTo {
		width: 100%;
	}
	.fromAndTo input {
		width: 100%;
		display: block;
		box-sizing: border-box;
		min-height: 37px;
		background: none;
		outline: none;
		border: none;
		border-bottom: 1px dashed black;
		padding-left: 10px;
	}
	.chooseStartBox {
		width: 100%;
		height: 180px;
		background: rgba(52, 164, 228, 0.3);
		position: absolute;
		bottom: 80px;
		z-index: 1000;
	}
	.chooseDirectionBox {
		width: 100%;
		height: 180px;
		background: rgba(52, 164, 228, 0.3);
		position: absolute;
		bottom: 45px;
		z-index: 1000;
	}
	.closeChoose {
		position: absolute;
		top: 0;
		right: 0;
		width: 20px;
		height: 20px;
		background: rgba(200, 200, 200, 0.3);
		font-size: 15px;
		text-align: center;
		line-height: 20px;
	}
	.navigateButtonContainer {
		width: 100%;
		height: 35px;
		overflow: hidden;
		box-sizing: border-box;
		border-radius: 3px;
		background: #34a4e4;
		outline: none;
		color: white;
		font-size: 18px;
		font-weight: 400;
		margin-top: 10px;
	}
</style>