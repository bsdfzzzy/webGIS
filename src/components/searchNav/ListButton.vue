<template>
    <div class="listButton" v-if="righttype == 'listButton'" @click="showChooseBox">
	    <img src="/static/img/menu.png" width="25px" height="25px">
	</div>
	<div class="chooseIndoor" v-if="showChoose">
		<ul>
			<li @click="setChoose('activityCenter')">活动中心</li>
			<li @click="setChoose('createPlace')">众创空间</li>
		</ul>
	</div>
</template>
<script>
	import { showList } from '../../actions/list'

	export default {
		props: ['righttype'],
		vuex: {
			actions: {
				showList
			}
		},
		data () {
			return {
				showChoose: false,
			}
		},
		methods: {
			setChoose: function (str) {
				let view = map.getView()
				this.showChoose = !this.showChoose
				switch (str) {
					case 'activityCenter':
						view.setCenter([103.92685, 30.75790])
						view.setZoom(6)
						break
					case 'createPlace':
						view.setCenter([103.930201536, 30.7472126727])
						view.setZoom(4)
						break
					default: 
						break
				}
			},
			showChooseBox: function () {
				this.showChoose = !this.showChoose
			}
		}
	}
</script>
<style>
    .listButton {
		text-align: center;
		line-height: 40px;
		flex-grow: 1;
		float: right;
    }
	.listButton img {
		margin-top: 8px;
		cursor: pointer;
	}
	.chooseIndoor {
		width: auto;
		height: auto;
		position: fixed;
		right: 0;
		top: 41px;
		background: white;
	}
	.chooseIndoor ul {
		list-style: none;
		padding: 0;
	}
	.chooseIndoor ul li {
		padding: 5px 13px;
		font-size: 15px;
		font-weight: 1;
	}
	.chooseIndoor ul li:first-child {
		border-bottom: 1px solid rgba(220, 220, 220, 0.8);
	}
</style>