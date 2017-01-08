<template>
	<div class="searchNav">
		<type-button v-if="whethershowtypebutton"></type-button>
		<div class="searchBox">
			<div class="searchColumn">
				<div class="inputBack" v-if="!focus && (keyword == '' || keyword == undefined)">
					<img src="/static/img/Nav_search.png" width="20px" height="20px" />
					<span>Search...</span>
				</div>
				<!--<input type="search" name="searchBox" class="searchInput" @click="showList" @blur="offFocus" @focus="onFocus" v-model="searchValue" @keyup.enter="searchResult">-->
				<input type="search" name="searchBox" class="searchInput" @click="showList" @blur="offFocus" @focus="onFocus" v-model="searchValue" :disabled="disable">
			</div>
		</div>
		<list-button :rightType="righttype"></list-button>
		<home-page-button :rightType="righttype"></home-page-button>
		<back-button :rightType="righttype"></back-button>
	</div>
</template>
<script>
	import axios from 'axios'
	import { showSearchFloat } from '../actions/searchFloat'
	import { closeSearchNav } from '../actions/searchNav'
    import { setPromptDisplay, showPrompt, closePrompt, clearPrompt } from '../actions/prompt'
	import { showHot, closeHot } from '../actions/hot'
	import { showList } from '../actions/list'
	import { setSearchResult, showSearchResult } from '../actions/searchResult'
	import { getListAll, getPromptDisplay } from '../getters'
	import TypeButton from './searchNav/TypeButton'
	import ListButton from './searchNav/ListButton'
	import HomePageButton from './searchNav/HomePageButton'
	import BackButton from './searchNav/BackButton'

	export default {
		props: ['whethershowtypebutton', 'righttype', 'keyword', 'disable'],
		components: {
			TypeButton,
			ListButton,
			HomePageButton,
			BackButton
		},
		vuex: {
			getters: {
				getListAll,
				getPromptDisplay
			},
			actions: {
				showSearchFloat,
				showHot,
				closeHot,
				setPromptDisplay,
				showPrompt,
				closePrompt,
				closeSearchNav,
				setSearchResult,
				showSearchResult,
				showList,
				clearPrompt
			}
		},
		data () {
			return {
				searchValue: "",
				focus: false
			}
		},
		methods: {
			onFocus: function () {
				this.focus = true
			},
			offFocus: function () {
				this.focus = false
			},
			closeHots: function (e) {
				console.log(e)
			},
			showsearchfloat: function () {
				this.showSearchFloat()
				this.closeSearchNav()
			},
			searchResult (e) {
				let that = this
				if (e.keyCode === 13) {
					let result = []
					that.getPromptDisplay.map(function (item) {
						result.push(item)
					})
					that.setSearchResult(result)
					that.showSearchResult()
				}
			}
		},
		watch: {
			searchValue: function (newSearchValue) {
				console.log(newSearchValue)
				let that = this
				if (newSearchValue == "") {
					this.showHot()
					this.closePrompt()
				} else {
					this.closeHot()
					axios.get(`http://map.gugoo.cc//poi_search?kw=${newSearchValue}`).then(res => {
						let data = res.data.data
						that.setPromptDisplay(data)
						that.showPrompt()
					})
					// let pushDisplay = []
					// this.getListAll.map(function (item) {
					// 	let matcher = eval('/' + newSearchValue + '/')
					// 	if (item) {
					// 		if (item.title.match(matcher)) {
  					// 			pushDisplay.push(item)
  					// 		}
					// 	}
					// })
					// this.setPromptDisplay(pushDisplay)
					// this.showPrompt()
				}
			},
			keyword: function (newKeyword) {
				this.searchValue = newKeyword
			}
		},
		ready: function () {
		}
	}

</script>
<style>
	.searchNav {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 40px;
		background-color: white;
		z-index: 1000;
		display: flex;
	}
	.searchBox {
		float: left;
		flex-basis: 60%;
		flex-grow: 20;
		height: 100%;
		text-align: center;
	}
	.searchColumn {
		width: 95%;
		height: 30px;
		margin-top: 5px;
		margin-left: 3%;
		border-radius: 15px;
		border: 1px;
		outline: none;
		background: rgba(240, 240, 240, 1);
	}
	.searchInput {
		width: 90%;
		height: 100%;
		outline: none;
	}
	.inputBack {
		color: #aaa;
		line-height: 40px;
		float: left;
		margin-left: 10px;
		position: absolute;
	}
	.inputBack span {
		vertical-align: middle;
		display: inline-block;
		height: 20px;
		line-height: 10px;
	}
</style>