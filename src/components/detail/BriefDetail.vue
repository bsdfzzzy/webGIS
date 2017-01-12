<template>
	<div class="briefDetail">
		<img :src="'http://map.gugoo.cc/' + getDetail.picture" width="50px" height="50px" class="detailImg">
		<div class="briefDetailContent">
			<p><strong>{{getDetail.title}}</strong></p>
			<br />
			<p v-if="getDetail.location" style="" class="detailIntro"><img src="/static/img/location.png" width="10px" height="10px" />&nbsp;&nbsp;&nbsp;<span>{{getDetail.location}}</span></p>
			<p v-if="getDetail.telephone" style="font-size: 13px; color: 888;" class="detailIntro"><img src="/static/img/phone.png" width="10px" height="10px" />&nbsp;&nbsp;&nbsp;<span><span v-for="tel in detailTels">{{tel}}</span></span></p>
		</div>
		<img src="/static/img/route.png" width="50px" height="50px" class="route" @click="setDestination">
	</div>
</template>
<script>
	import { getDetail } from '../../getters'
	import { setDest, showNavigate } from '../../actions/navigate'
	import { closeList } from '../../actions/list'
	import { closeSearchFloat, notChoosingStart, notChoosingDest } from '../../actions/searchFloat'
	import { closeSearchResult } from '../../actions/searchResult'
	import { showSearchNav } from '../../actions/searchNav'
	import { closeDetail } from '../../actions/detail'

	export default {
		vuex: {
			getters: {
				getDetail
			},
			actions: {
				setDest,
				closeList,
				closeSearchFloat,
				closeSearchResult,
				showNavigate,
				showSearchNav,
				notChoosingDest,
				notChoosingStart,
				closeDetail
			}
		},
		data () {
			return {
				detailTels: []
			}
		},
		methods: {
			setDestination () {
				let that = this
				this.setDest(that.getDetail)
				that.closeList()
				that.closeSearchFloat()
				that.closeSearchResult()
				that.showSearchNav()
				that.showNavigate()
				that.notChoosingStart()
				that.notChoosingDest()
				that.closeDetail()
			}
		},
		ready: function () {
			let that = this
			this.getDetail.telephone.split(" ").map(function (item) {
				that.detailTels.push(item)
			})
			console.log(this.detailTels)
		}
	}
</script>
<style>
	.briefDetail {
		width: 100%;
		box-sizing: border-box;
		min-height: 60px;
		padding: 50px 30px 30px;
		overflow: hidden;
	}
	.briefDetail p {
		width: 100%;
		float: left;
	}
	.detailImg {
		float: left;
	}
	.briefDetailContent {
		overflow: hidden;
		float: left;
		margin-left: 20px;
		width: calc(100% - 160px);
	}
	.route {
		float: left;
		margin-left: 35px;
		background: #34a4e4;
		border-radius: 40px;
	}
	.detailIntro {
		font-size: 13px;
		color: 888;
		display: flex;
	}
	.detailIntro:not(:first-child) {
		margin-top: 5px;
	}
	.detailIntro img {
		height: 13px;
		width: 13px;
		flex: 1;
	}
	.detailIntro > span {
		flex: 100;
	}
	.detailIntro > span > span {
		display: block;
	}
</style>