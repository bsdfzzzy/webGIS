<template>
	<div class="briefDetail">
		<img src="#" width="50px" height="50px" class="detailImg">
		<div class="briefDetailContent">
			<p><strong>{{getDetail.title}}</strong></p>
			<p v-if="getDetail.location" style="font-size: 13px; color: 888;">地址：{{getDetail.location}}</p>
			<p v-if="getDetail.telephone" style="font-size: 13px; color: 888;">电话：{{getDetail.telephone}}</p>
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
			// let id = this.getDetail.id
			// postDataJSON = JSON.stringify({
			// 	ids: [id]
			// })
			// axios.post('', ).catch(function (e) {
			// 	console.log(e)
			// })
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
		margin-left: 10px;
		background: #34a4e4;
		border-radius: 40px;
	}
</style>