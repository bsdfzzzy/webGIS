<template>
	<div class="instruction">
		<div class="brief">
			<!--<div class="scroll" @click.stop.prevent="toggle">
				<img :src="up ? '/static/img/Panel_arrow-up.png' : '/static/img/Panel_arrow-down.png'" width="30px" />	
			</div>-->
			<div class="brief-ins">
				<img :src=`http://map.gugoo.cc/${getIntro.picture}` width="60px" height="60px" class="brief-ins-logo">
				<div class="brief-ins-content">
					<p><strong style="font-size:15px; margin-right:15px;">{{getIntro.title}}</strong></p>
					<!--<span v-if="getIntro.location">{{getIntro.location}}</span>-->
					<br />
					<p style="font-size: 13px;">{{getIntro.desc}}</p>
					<br />
					<p v-if="getIntro.location" style="font-size: 13px; color: 888;"><img src="/static/img/location.png" width="10px" height="10px" />&nbsp;&nbsp;&nbsp;{{getIntro.location}}</p>
					<p v-if="getIntro.telephone" style="font-size: 13px; color: 888;"><img src="/static/img/phone.png" width="10px" height="10px" />&nbsp;&nbsp;&nbsp;{{getIntro.telephone}}</p>
				</div>	
			</div>
			 <div class="menu">
				<div class="" @click="showItsDetail">详情</div>
				<template v-if="getShowIndoor">
					<div class="panorama" @click="getIntoBuilding">室内</div>
				</template>
				<template v-else="getShowBusiness">
					<div class="panorama" @click="getIntoBusiness">业务</div>
				</template>
			</div> 
			<div class="navigateButton" @click="navigateToTheBuilding">
				<img src="/static/img/navi.png" width="65px" height="65px">
			</div>
		</div>
		<!--<div v-if="show" class="more-ins" transition="expand"></div>-->
	</div>
</template>
<script>
	import { getListAll, getIntro, getShowIndoor, getShowBusiness } from '../getters'
	import { showNavigate, setDest } from '../actions/navigate'
	import { setDestId, closeInstruction } from '../actions/instruction'
	import { showBusinesses } from '../actions/list'
	import { setDirectionCoordinate } from '../actions/coordinate'
	import { showDetail, setDisplayDetail, showBusiness, showBase } from '../actions/detail'

	export default {
		vuex: {
			getters: {
				getListAll,
				getIntro,
				getShowIndoor,
				getShowBusiness
			},
			actions: {
				showNavigate,
				setDest,
				setDestId,
				setDirectionCoordinate,
				closeInstruction,
				showDetail,
				setDisplayDetail,
				showBusinesses,
				showBusiness,
				showBase
			}
		},
		data () {
			return {
				show: false,
				up: true
			}
		},
		methods: {
			toggle () {
				this.show = !this.show
				this.up = !this.up
			},
			navigateToTheBuilding () {
				this.setDest(this.getIntro)
				// for (let item of this.getListAll) {
				// 	if (item.unique_id == this.title) {
				// 		this.setDest(item)
				// 		this.setDirectionCoordinate(item.coordinateToNavigate)
				// 		break
				// 	}
				// }
				this.closeInstruction()
				this.showNavigate()
			},
			showItsDetail () {
				let intro = this.getIntro
				this.showBase()
				this.setDisplayDetail(intro)
				this.showDetail()
			},
			getIntoBuilding () {
				let view = map.getView()
				let that = this
				view.setCenter(that.getIntro.coordinate)
				view.setZoom(6)
			},
			getIntoBusiness () {
				let that = this
				this.showBusiness()
				let id = this.getIntro.unique_id
				for(let item of that.getListAll) {
					if (item) {
						if (item.unique_id == id) {
							that.setDisplayDetail(item)
							that.showDetail()
							break
						}
					}
				}
			}
		}
	}
</script>
<style>
	.instruction {
		position: fixed;
		bottom: 0;
		width: 96%;
		margin: auto;
		left: 0;
		right: 0;
		background: white;
		border: 1px solid #aaa;
	}
	.brief {
		position: relative;
		min-height: 50px;
		padding-top: 10px;
	}
	.scroll {
		height: 20px;
		width: 100%;
		text-align: center;
	}
	.scroll img {
		margin-left: auto;
		margin-right: auto;
	}
	.brief-ins {
		box-sizing: border-box;
		padding: 10px 20px 20px;
		width: 100%;
		position: relative;
		overflow: hidden;
		height: 100%;
	}
	.more-ins {
		width: 100%;
		height: 100px;
	}
	.brief-ins-logo {
		float: left;
	}
	.brief-ins-content {
		margin-left: 15px;
		float: left;
		width: calc(100% - 20px - 60px - 15px);
		min-height: 20px;
		overflow: hidden;
	}
	.menu {
		position: relative;
		width: calc(100% - 40px);
		height: 30px;
		margin: auto;
		left: 0;
		right: 0;
		bottom: 0;
		font-weight: 400;
		font-size: 14px;
	}
	.menu div {
		width: 50%;
		float: left;
		text-align: center;
		line-height: 30px;
		border-top: 1px solid #ddd;
		box-sizing: border-box;
	}
	.panorama {
		border-left: 1px solid #ddd;
	}
	.navigateButton {
		position: absolute;
		overflow: hidden;
		height: 65px;
		width: 65px;
		box-sizing: border-box;
		right: 20px;
		top: -40px;
		z-index: 1000;
		border-radius: 100px;
		text-align: center;
		background: white;
		z-index: 1000;
	}
	.navigateButton img {
		z-index: 1000;
	}
</style>