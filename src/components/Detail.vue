<template>
	<div class="detail">
		<div class="searchNav">
			<div class="slideDown" @click="back">
				<img src="/static/img/back.png" width="20px" height="25px">
			</div>
			<div class="searchBox">
				<div class="searchColumn">
					<input type="search" name="searchBox" class="searchInput">
				</div>
			</div>
			<div class="listButton" @click="closeAll">
	    		<img src="/static/img/home.png" width="25px" height="25px">
			</div>
		</div>
		<brief-detail></brief-detail>
		<more-detail></more-detail>
	</div>
</template>
<script>
	import BriefDetail from './detail/BriefDetail'
	import MoreDetail from './detail/MoreDetail'
	import { closeList } from '../actions/list'
	import { closeSearchFloat, notChoosingDest, notChoosingStart } from '../actions/searchFloat'
	import { closeSearchResult } from '../actions/searchResult'
	import { showSearchNav } from '../actions/searchNav'
	import { showNavigate } from '../actions/navigate'
	import { closeDetail } from '../actions/detail'

	export default {
		components: {
			BriefDetail,
			MoreDetail
		},
		vuex: {
			getters: {

			},
			actions: {
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
            closeAll: function () {
                this.closeList()
                this.closeSearchFloat()
                this.closeSearchResult()
				this.showSearchNav()
				this.showNavigate()
				this.notChoosingStart()
				this.notChoosingDest()
				this.closeDetail()
            },
			back: function () {
				this.closeDetail()
			}
        },
	}
</script>
<style>
	.detail {
		width: 100%;
		overflow: scroll;
		position: fixed;
		z-index: 9999;
		top: 0;
		background: white;
		height: 100%;
		margin-top: 40px;
		border-top: 1px solid rgba(240, 240, 240, 0.8);
	}
	.slideDown img {
		margin-top: 8px;
		padding-left: 5px;
		box-sizing: border-box;
	}
</style>