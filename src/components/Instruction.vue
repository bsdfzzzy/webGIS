<template>
	<div class="instruction">
		<div class="brief">
			<!-- <div class="scroll" @click.stop.prevent="toggle"> + </div> -->
			<div class="brief-ins">
				<img src="/static/img/logo.jpg" width="60px" height="60px" class="brief-ins-logo">
				<div class="brief-ins-content">
					<p><strong style="font-size:15px;">{{title}}</strong></p>
					<p style="font-size: 13px;">{{content}}</p>
				</div>	
			</div>
			<!-- <div class="menu">
				<div class="detail">详情</div>
				<div class="panorama">全景</div>
			</div> -->
			<div class="navigateButton" @click="navigateToTheBuilding">
				<img src="/static/img/navi.png" width="65px" height="65px">
			</div>
		</div>
		<div v-if="show" class="more-ins" transition="expand"></div>
	</div>
</template>
<script>
	import { getBuilding } from '../getters'
	import { showNavigate, setDest } from '../actions/navigate'
	import { setDestId, closeInstruction } from '../actions/instruction' 
	import { setDirectionCoordinate } from '../actions/coordinate'

	export default {
		props: ['title', 'content'],
		vuex: {
			getters: {
				getBuilding
			},
			actions: {
				showNavigate,
				setDest,
				setDestId,
				setDirectionCoordinate,
				closeInstruction
			}
		},
		data () {
			return {
				show: false
			}
		},
		methods: {
			toggle () {
				this.show = !this.show
			},
			navigateToTheBuilding () {
				for (let item of this.getBuilding) {
					if (item.name == this.title) {
						this.setDestId(item.id)
						this.setDirectionCoordinate(item.id)
						break
					}
				}
				this.closeInstruction()
				this.setDest(this.title)
				this.showNavigate()
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
		min-height: 100px;
		padding-top: 20px;
	}
	.scroll {
		height: 20px;
		width: 100%;
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
		min-height: 75px;
		overflow: hidden;
	}
	.menu {
		position: absolute;
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
		top: -33px;
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