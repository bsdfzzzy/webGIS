<template>
	<div class="instruction">
		<div class="brief">
			<div class="scroll" @click.stop.prevent="toggle">
				<img :src="up ? '/static/img/Panel_arrow-up.png' : '/static/img/Panel_arrow-down.png'" width="30px" />	
			</div>
			<div class="brief-ins">
				<img src="/static/img/logo.jpg" width="60px" height="60px" class="brief-ins-logo" v-if="!up">
				<div class="brief-ins-content">
					<p><strong style="font-size:15px; margin-right:15px;">{{getIntro.title}}</strong><span v-if="up && getIntro.location">{{getIntro.location}}</span></p>
					<p style="font-size: 13px;" v-if="!up">{{getIntro.desc}}</p>
					<p v-if="!up && getIntro.location">{{getIntro.location}}</p>
					<p v-if="!up && getIntro.telephone">{{getIntro.telephone}}</p>
				</div>	
			</div>
			 <div class="menu" v-if="!up">
				<div class="" @click="showItsDetail">详情</div>
				<div class="panorama" @click="getIntoBuilding">室内</div>
			</div> 
			<div class="navigateButton" @click="navigateToTheBuilding">
				<img src="/static/img/navi.png" width="65px" height="65px">
			</div>
		</div>
		<!--<div v-if="show" class="more-ins" transition="expand"></div>-->
	</div>
</template>
<script>
	import { getListAll, getIntro } from '../getters'
	import { showNavigate, setDest } from '../actions/navigate'
	import { setDestId, closeInstruction } from '../actions/instruction'
	import { setDirectionCoordinate } from '../actions/coordinate'
	import { showDetail, setDisplayDetail } from '../actions/detail'

	export default {
		vuex: {
			getters: {
				getListAll,
				getIntro
			},
			actions: {
				showNavigate,
				setDest,
				setDestId,
				setDirectionCoordinate,
				closeInstruction,
				showDetail,
				setDisplayDetail
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
				this.setDisplayDetail(intro)
				this.showDetail()
			},
			getIntoBuilding () {
				
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