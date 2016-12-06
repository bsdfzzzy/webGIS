<template>
	<div class="item">
		<div class="itemContentContainer">
			<img :src="img" width="60px" height="60px" class="itemContentImg">
			<p class="itemContentTitle"><strong>{{title}}</strong></p>
			<p class="itemContentDesc">{{content}}</p>
		</div>
		<div class="itemButtonContainer">
			<div class="setThisToStart" @click="setToStart" data-id="{{id}}">设为起点</div>
			<div class="itemDetail" @click="routeToDetail" data-id="{{id}}">详情</div>
		</div>
	</div>
</template>
<script>
	import { getListAll } from '../getters'
	import { setDisplayDetail, showDetail } from '../actions/detail'
	import { setStart, setDest } from '../actions/navigate'
	import { closeList } from '../actions/list'
    import { closeSearchFloat, notChoosingStart, notChoosingDest } from '../actions/searchFloat'
    import { closeSearchResult } from '../actions/searchResult'
	import { showSearchNav } from '../actions/searchNav'
	import { showNavigate } from '../actions/navigate'

	export default {
		props: ['img', 'title', 'content', 'id'],
		vuex: {
			getters: {
				getListAll
			},
			actions: {
				setDisplayDetail,
				showDetail,
				setStart,
				setDest,
				closeList,
                closeSearchFloat,
                closeSearchResult,
				showSearchNav,
				showNavigate,
				notChoosingDest,
				notChoosingStart
			}
		},
		methods: {
			setToStart (e) {
				let that = this
				this.getListAll.map(function (item) {
					if (item.id == e.target.dataset.id) {
						that.setStart(item)
						that.closeList()
                		that.closeSearchFloat()
                		that.closeSearchResult()
						that.showSearchNav()
						that.showNavigate()
						that.notChoosingStart()
						that.notChoosingDest()
						return
					}
				})
			},
			routeToDetail (e) {
				let that = this
				this.getListAll.map(function (item) {
					if (item.id == e.target.dataset.id) {
						that.setDisplayDetail(item)
					}
				})
				this.showDetail()
			}
		}
	}
</script>
<style>
	.item {
		width: 90%;
		min-height: 100px;
		background: white;
		margin-top: 15px;
		margin-left: auto;
		margin-right: auto;
		overflow: hidden;
	}
	.itemContentContainer {
		width: 100%;
		padding: 30px 0 20px 20px;
		overflow: hidden;
	}
	.itemContentImg {
		float: left;
		margin-right: 15px;
	}
	.itemContentTitle {
		font-size: 15px;
		line-height: 15px;
	}
	.itemContentDesc {
		font-size: 12px;
		color: #999;
		float: left;
		width: calc(100% - 20px - 100px)
	}
	.itemButtonContainer {
		display: flex;
		width: 90%;
		margin-left: auto;
		margin-right: auto;
		height: 40px;
		background: white;
		border-top: 1px solid #ddd;
	}
	.itemButtonContainer div {
		flex: 1;
		text-align: center;
		line-height: 30px;
		height: 30px;
		margin-top: 5px;
	}
	.setThisToStart {
		flex: 1;
		border-right: 1px solid #ddd;
	}
</style>