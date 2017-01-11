<template>
	<div class="item">
		<div class="itemContentContainer">
			<img :src="'http://map.gugoo.cc/' + picture" width="60px" height="60px" class="itemContentImg" v-if="picture">
			<p class="itemContentTitle"><strong>{{title}}</strong></p>
			<p class="itemContentDesc" v-if="location">{{location}}</p>
			<p class="itemContentDesc" v-if="content">{{content}}</p>
		</div>
		<div class="itemButtonContainer">
			<div class="setThisToStart" @click="setToDest" data-id="{{unique_id}}" v-if="type">去这里</div>
			<div class="itemDetail" @click="routeToDetail" data-id="{{unique_id}}">详情</div>
		</div>
	</div>
</template>
<script>
	import { getListAll, getListDisplay } from '../getters'
	import { setDisplayDetail, showDetail, showBusiness, showBase } from '../actions/detail'
	import { setStart, setDest } from '../actions/navigate'
	import { closeList } from '../actions/list'
    import { closeSearchFloat, notChoosingStart, notChoosingDest } from '../actions/searchFloat'
    import { closeSearchResult } from '../actions/searchResult'
	import { showSearchNav } from '../actions/searchNav'
	import { showNavigate } from '../actions/navigate'

	export default {
		props: ['img', 'title', 'content', 'unique_id', 'picture', 'location', 'type'],
		vuex: {
			getters: {
				getListAll,
				getListDisplay
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
				notChoosingStart,
				showBase,
				showBusiness
			}
		},
		methods: {
			setToDest (e) {
				let that = this
				for (let item of that.getListAll) {
					if (item) {
						if (item.unique_id == e.target.dataset.id) {
							that.setDest(item)
							that.closeList()
							that.closeSearchFloat()
							that.closeSearchResult()
							that.showSearchNav()
							that.showNavigate()
							that.notChoosingStart()
							that.notChoosingDest()
							break
						}
					}
				}
			},
			routeToDetail (e) {
				let that = this
				for(let item of that.getListAll) {
					if (item) {
						if (item.unique_id == e.target.dataset.id) {
							if (this.getListDisplay[0]) {
								if (this.getListDisplay[0].business_name) {
									this.showBusiness()
								} else {
									this.showBase()
								}
							} else {
								this.showBase()
							}
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
		width: calc(100% - 40px);
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