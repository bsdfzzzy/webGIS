<template>
	<div class="navigate">
		<!--<div class="closeNavigateBox" @click="closeNavigateBox">×</div>-->
		<div class="content">
			<div class="mainContent">
				<div class="fromAndTo">
					<!--<input type="text" name="from" placeholder="{{getStart}}" v-model="start" @focus="showStartChoose">-->
					<input type="text" name="from" :value="getStart.title" @click="showStartSearchFloat" :class="getStart.unique_id ? 'choosed' : 'notChoosed'">
					<span style="color: red;" id="checkStart" v-if="!checkStart">请选择以上正确格式的建筑名称</span>
					<!--<input type="text" name="to" placeholder="{{getDest}}" @focus="showDirectionChoose" :value="direction" v-model="direction">-->
					<input type="text" name="to" @click="showDestSearchFloat" :value="getDest.title" :class="getDest.unique_id ? 'choosed' : 'notChoosed'">
					<span style="color: red;" id="checkDest" v-if="!checkDest">请选择以上正确格式的建筑名称</span>
				</div>
				<!--<div class="chooseStartBox" id="chooseStartBox" v-if="getShowChooseStart">
					<div class="closeChoose" @click="closeChoose">×</div>
					<ul>
						<li v-for="start in getShowStarts" @click="selectStart" data-id="{{start.id}}">{{start.title}}</li>
					</ul>
				</div>
				<div class="chooseDirectionBox" id="chooseDirectionBox" v-if="getShowChooseDirection">
					<div class="closeChoose" @click="closeChoose">×</div>
					<ul>
						<li v-for="direction in getShowDirections" @click="selectDirection" data-id="{{direction.id}}">{{direction.title}}</li>
					</ul>
				</div>-->
			</div>
				<button class="navigateButtonContainer" :disabled="!getDisableButton" @click="pathNavigate"><img src="/static/img/Button_Route.png" width="17px" height="17px" />   路径规划</button>
			</div>
	</div>
</template>
<script>
	import { getListTeams, getListBusinesses, getListBlocks, getListAll, getShowChooseStart, 
		getShowChooseDirection, getShowStarts, getShowDirections, getShowButton, 
		getStartCoordination, getDirectionCoordination, getStart, getDest, checkDest, 
		checkStart, getBuilding, getDisableButton, getRoute, getMapFloor } from '../getters'
	import { setCheckStart, setCheckDest, closeNavigate, setStart, setDest, showButton, 
		disableButton, displayChooseStart, displayChooseDirection, closeChooseStart, 
		closeChooseDirection, showAllStarts, showAllDirections, showPartialStarts, 
		showPartialDirections, setRoute, showNavigateContent } from '../actions/navigate'
	import { setDestId } from '../actions/instruction'
	import { setStartCoordinate, setDirectionCoordinate } from '../actions/coordinate'
	import { showSearchFloat, choosingStart, choosingDest, notChoosingStart, notChoosingDest } from '../actions/searchFloat'
	import ol from 'openlayers/dist/ol.js'
	import axios from 'axios'

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
				getShowChooseStart,
				getShowChooseDirection,
				getShowStarts,
				getShowDirections,
				getShowButton,
				getStartCoordination,
				getDirectionCoordination,
				getStart,
				getDest,
				checkStart,
				checkDest,
				getBuilding,
				getDisableButton,
				getListAll,
				getListBlocks,
				getListBusinesses,
				getListTeams,
				getRoute,
				getMapFloor
			},
			actions: {
				displayChooseStart,
				displayChooseDirection,
				closeChooseStart,
				closeChooseDirection,
				closeNavigate,
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
				closeNavigate,
				setCheckStart,
				setCheckDest,
				choosingStart,
				choosingDest,
				notChoosingStart,
				notChoosingDest,
				showSearchFloat,
				setRoute,
				showNavigateContent
			}
		},
		methods: {
			showStartSearchFloat () {
				this.closeNavigate()
				this.showSearchFloat()
				this.choosingStart()
				this.notChoosingDest()
			},
			showDestSearchFloat () {
				this.closeNavigate()
				this.showSearchFloat()
				this.choosingDest()
				this.notChoosingStart()
			},
			closeChoose () {
				this.closeStartChoose()
				this.closeDirectionChoose()
			},
			closeNavigateBox() {
				this.closeNavigate()
			},
			showStartChoose (e) {
				this.displayChooseStart()
				this.closeChooseDirection()
				if (e.target.innerHTML == "") {
					this.showAllStarts()
				}
			},
			closeStartChoose () {
				this.closeChooseStart()
			},
			showDirectionChoose () {
				this.displayChooseDirection()
				this.closeChooseStart()
			},
			closeDirectionChoose () {
				this.closeChooseDirection()
			},
			selectStart (e) {
				this.start = e.target.innerHTML
				this.closeStartChoose()
				this.setStartCoordinate(e.target.dataset.id)
			},
			selectDirection (e) {
				this.direction = e.target.innerHTML
				this.closeDirectionChoose()
				this.setDirectionCoordinate(e.target.dataset.id)
				this.setDestId(e.target.dataset.id)
			},
			checkStartName (e) {
				this.closeChooseStart()
				let startName = e.target.innerHTML
				for (let item of this.getBuilding) {
					if (item.title == startName) {
						this.setStartCoordinate(item.id)
						this.setCheckStart(true)
						return
					}
				}
				this.setCheckStart(false)
			},
			checkDestName (e) {
				this.closeChooseDirection()
				let destName = e.target.innerHTML
				for (let item of this.getBuilding) {
					if (item.title == destName) {
						this.setDestCoordinate(item.id)
						this.setCheckDest(true)
						return
					}
				}
				this.setCheckDest(false)
			},
			pathNavigate () {
				let that = this
				if (window.path) {
					map.removeLayer(path)
				}
				if (window.pathResult) {
					map.removeLayer(pathResult)
				}
				let startPoint = this.getStartCoordination
				let destPoint = this.getDirectionCoordination
				let startPointInfo = this.getStart
				let destPointInfo = this.getDest
				// let startPointId, descPointId
				let popup = document.getElementById("popup")
				popup.style.display = "none"
				axios.get('http://map.gugoo.cc/navigate?start_uid=' + startPointInfo.unique_id + '&finish_uid=' + destPointInfo.unique_id).then(function (res) {
					that.setRoute(res.data.coordinates)
					let nowFloor = that.getMapFloor
					let tempLine
					if (res.data.coordinates[nowFloor - 1]) {
						tempLine = res.data.coordinates[nowFloor - 1]
					
						let lineFeature = new ol.Feature({
							geometry: new ol.geom.LineString(tempLine)
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
						that.showNavigateContent()
					}
				}).catch(function (e) {
					console.log(e)
				})
				
				let view = window.map.getView()
				let resolution = view.getResolution()		
      			// let styles = {
        		// 	'route': new ol.style.Style({
          		// 		stroke: new ol.style.Stroke({
            	// 			width: 6, color: [237, 212, 0, 0.8]
          		// 		})
        		// 	}),
        		// 	'iconStart': new ol.style.Style({
          		// 		image: new ol.style.Icon({
            	// 			anchor: [0.5, 1],
            	// 			src: '/static/img/start.png',
            	// 			scale: 0.1
          		// 		})
        		// 	}),
        		// 	'iconDest': new ol.style.Style({
          		// 		image: new ol.style.Icon({
            	// 			anchor: [0.5, 1],
            	// 			src: '/static/img/dest.png',
            	// 			scale: 0.1
          		// 		})
        		// 	})
      			// }
				// if (resolution > 0.000001341104507446289) {
					// let startMarker = new ol.Feature({
        			// 	type: 'iconStart',
        			// 	geometry: new ol.geom.Point(startPointInfo.coordinate),
        			// 	name: "startMarker"
      				// });
      				// startMarker.setId(2)
      				// let endMarker = new ol.Feature({
        			// 	type: 'iconDest',
        			// 	geometry: new ol.geom.Point(destPointInfo.coordinate),
        			// 	name: "endMarker"
      				// });
      				// endMarker.setId(3)
					// window.path = new ol.layer.Vector({
        			// 	source: new ol.source.Vector({
          			// 		features: [startMarker, endMarker]
        			// 	}),
        			// 	style: function(feature) {
          			// 		return styles[feature.get('type')];
        			// 	}
      				// });

					// map.addLayer(path)
				// }
			}
		},
		watch: {
			start: function (newStart) {
				this.setStart(newStart)
				if (newStart == "" || newStart == "我的位置") {
					this.showAllStarts()
				} else {
					this.showPartialStarts(newStart)
				}
				for (let item of this.getBuilding) {
					if (item.title == newStart) {
						this.setStartCoordinate(item.id)
						this.setCheckStart(true)
						return
					}
				}
				this.setCheckStart(false)
			},
			direction: function (newDirection) {
				this.setDest(newDirection)
				if (newDirection == "") {
					this.showAllDirections()
				} else {
					this.showPartialDirections(newDirection)
				}
				for (let item of this.getBuilding) {
					if (item.title == newDirection) {
						this.setDirectionCoordinate(item.id)
						this.setCheckDest(true)
						return
					}
				}
				this.setCheckDest(false)
			},
			checkStart: function (newCheckStart) {
				let chooseStartBox = document.getElementById("chooseStartBox")
				if (!newCheckStart) {
					chooseStartBox.style.bottom = "90px"
				}
			},
			checkDest: function (newCheckDest) {
				let chooseDestBox = document.getElementById("chooseDirectionBox")
				if (!newCheckDest) {
					chooseDestBox.style.bottom = "55px"
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
		min-height: 172px;
		background: white;
		margin: auto;
		left: 0;
		right: 0;
		padding: 25px 30px 15px;
		box-sizing: border-box;
		border: 1px solid #aaa;
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
		min-height: 80px;
		margin-bottom: 0px;
		position: relative;
	}
	.mainContent ul {
		list-style: none;
		padding: 10px 20px 20px;
		min-height: 40px;
		max-height: 120px;
		overflow: auto;
		box-sizing: border-box;
	}
	.mainContent ul li {
		border-bottom: 1px dashed #bbb;
		line-height: 37px;
	}
	.fromAndTo {
		width: 100%;
		height: auto;
		background-image: url('/static/img/start_end.png');
		background-repeat: no-repeat;
		background-position: left center;
		background-size: 80% 80%;
	}
	.fromAndTo input {
		width: 100%;
		display: block;
		box-sizing: border-box;
		min-height: 37px;
		background: none;
		outline: none;
		border: none;
		padding-left: 20px;
		margin-top: 4px;
		font-weight: bolder;
		background: rgba(0, 0, 0, 0);
	}
	.chooseStartBox {
		width: 100%;
		min-height: 40px;
		max-height: 120px;
		background: white;
		position: absolute;
		bottom: 80px;
		z-index: 1000;
		border: 1px solid #aaa;
	}
	.chooseDirectionBox {
		width: 100%;
		min-height: 40px;
		max-height: 120px;
		background: white;
		position: absolute;
		bottom: 45px;
		z-index: 1000;
		border: 1px solid #aaa;
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
		border-radius: 4px;
		background: #34a4e4;
		outline: none;
		color: white;
		font-size: 16px;
		font-weight: 400;
		margin-top: 10px;
		border: 0;
	}
	.choosed {
		color: #000;
		font-weight: bolder;
	}
	.notChoosed {
		color: #bbb;
		font-weight: normal;
	}
</style>