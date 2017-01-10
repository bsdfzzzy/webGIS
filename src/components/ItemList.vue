<template>
	<div class="itemList">
		<div class="searchNav">
			<div class="searchBox">
				<div class="searchColumn">
					<input type="search" name="searchBox" class="searchInput" v-model="searchValue">
				</div>
			</div>
			<div class="listButton" @click="closeAll">
	    		<img src="/static/img/home.png" width="25px" height="25px">
			</div>
		</div>
		<div class="listNav">
			<div :class="getNowSelectItem == 'blocks' ? 'activeItem navItem' : 'navItem'" @click="showItsBlocks">楼栋</div>
			<div :class="getNowSelectItem == 'teams' ? 'activeItem navItem' : 'navItem'" @click="showItsTeams">团队</div>
			<div :class="getNowSelectItem == 'businesses' ? 'activeItem navItem' : 'navItem'" @click="showItsBusinesses">业务</div>
		</div>
		<div class="listContent" v-if="getListDisplay.length != 0">
			<item v-for="display in getListDisplay" :location="display.location" :type="display.type" :img="display.img" :title="display.title" :content="display.desc" :unique_id="display.unique_id" :picture="display.picture"></item>
		</div>
		<div class="listContentNoResult" v-if="getListDisplay.length == 0">
			没有搜索结果
		</div>
	</div>
</template>
<script>
	import Item from './Item.vue'
	import SearchNav from './SearchNav'
	import axios from 'axios'
	import { showBlocks, showBusinesses, showTeams, setBlocks, setBusinesses, setTeams, closeList, setDisplay, showNotAllBlocks, showNotAllBusinesses,
		 showNotAllTeams } from '../actions/list'
    import { closeSearchFloat, notChoosingStart, notChoosingDest } from '../actions/searchFloat'
	import { getListDisplay, getOldDisplay, getNowSelectItem, getListBlocks, getListBusinesses, getListTeams } from '../getters'
	import { closeSearchResult } from '../actions/searchResult'
	import { showSearchNav } from '../actions/searchNav'
	import { showNavigate } from '../actions/navigate'

	export default {
		components: {
			Item,
			SearchNav
		},
		data () {
			return {
				searchValue: ""
			}
		},
		vuex: {
			getters: {
				getListDisplay,
				getOldDisplay,
				getNowSelectItem,
				getListTeams,
				getListBlocks,
				getListBusinesses
			},
			actions: {
				showBlocks,
				showBusinesses,
				showTeams,
				setBlocks,
				setBusinesses,
				setTeams,
				closeList,
				closeSearchFloat,
				closeSearchResult,
				showSearchNav,
				showNavigate,
				notChoosingDest,
				notChoosingStart,
				setDisplay,
				showNotAllBlocks,
				showNotAllBusinesses,
				showNotAllTeams
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
            },
			showItsBlocks () {
				let that = this
				if (this.searchValue == "") {
					that.showBlocks()
				} else {
					let pushDisplay = []
					for (let item of that.getListBlocks) {
						let matcher = eval('/' + that.searchValue + '/')
						if (item) {
							if (item.title.match(matcher) || item.detail.match(matcher)) {
								pushDisplay.push(item)
							}
						}
					}
					that.setDisplay(pushDisplay)
					that.showNotAllBlocks()
				}
			},
			showItsBusinesses () {
				let that = this
				if (this.searchValue == "") {
					that.showBusinesses()
				} else {
					let pushDisplay = []
					for (let item of that.getListBusinesses) {
						let matcher = eval('/' + that.searchValue + '/')
						if (item) {
							if (item.title.match(matcher) || item.detail.match(matcher)) {
								pushDisplay.push(item)
							}
						}
					}
					that.setDisplay(pushDisplay)
					that.showNotAllBusinesses()
				}
			},
			showItsTeams () {
				let that = this
				if (this.searchValue == "") {
					that.showTeams()
				} else {
					let pushDisplay = []
					for (let item of that.getListTeams) {
						let matcher = eval('/' + that.searchValue + '/')
						if (item) {
							if (item.title.match(matcher) || item.detail.match(matcher)) {
								pushDisplay.push(item)
							}
						}
					}
					that.setDisplay(pushDisplay)
					that.showNotAllTeams()
				}
			}
        },
		watch: {
			searchValue: function (newValue) {
				console.log(newValue)
				let that = this
				let pushDisplay = []
				if (newValue == "") {
					if (that.getNowSelectItem == 'blocks') {
						that.setDisplay(that.getListBlocks)
					} else if (that.getNowSelectItem == 'teams') {
						that.setDisplay(that.getListTeams)
					} else if (that.getNowSelectItem == 'businesses') {
						that.setDisplay(that.getListBusinesses)
					}
				} else {
					for (let item of that.getListDisplay) {
						let matcher = eval('/' + newValue + '/')
						if (item) {
							if (item.title.match(matcher) || item.detail.match(matcher)) {
								pushDisplay.push(item)
							}
						}
					}
					that.setDisplay(pushDisplay)
				}
			}
		},
		ready () {
			this.showBlocks()
		}
	}
</script>
<style>
	.itemList { 
		position: fixed;
		top: 0;
		width: 100%;
		height: 100%;
		background: white;
		z-index: 9000;
	}
	.listNav {
		margin-top: 40px;
		display: flex;
		height: 40px;
		padding: 5px 0;
		background: white;
		box-sizing: border-box;
	}
	.navItem {
		float: left;
		flex: 1;
		text-align: center;
		box-sizing: border-box;
		height: 30px;
	}
	.listNav :not(:first-child) {
		border-left: 1px solid #ccc;
	}
	.listContent {
		background: rgba(225, 225, 225, 0.5);
		width: 100%;
		height: calc(100% - 80px);
		position: absolute;
		top: 80px;
		overflow: scroll;
	}
	.activeItem {
		color: #34a4e4;
		border-bottom: 2px solid #34a4e4;
	}
	.listContentNoResult {
		width: 100%;
		height: calc(100% - 80px);
		position: absolute;
		top: 80px;
		line-height: 60px;
		text-align: center;
		padding-top: 50%;
		color: #999;
		background: rgb(240, 240, 240);
	}
</style>