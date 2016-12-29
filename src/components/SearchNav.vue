<template>
	<div class="searchNav">
		<type-button v-if="whethershowtypebutton"></type-button>
		<div class="searchBox">
			<input type="search" name="searchBox" class="searchColumn" @click="showsearchfloat" v-model="searchValue" @keyup.enter="searchResult">
		</div>
		<list-button :rightType="righttype"></list-button>
		<home-page-button :rightType="righttype"></home-page-button>
		<back-button :rightType="righttype"></back-button>
	</div>
</template>
<script>
	import { showSearchFloat } from '../actions/searchFloat'
	import { closeSearchNav } from '../actions/searchNav'
    import { setPromptDisplay, showPrompt, closePrompt } from '../actions/prompt'
	import { showHot, closeHot } from '../actions/hot'
	import { setSearchResult, showSearchResult } from '../actions/searchResult'
	import { getListAll, getPromptDisplay } from '../getters'
	import TypeButton from './searchNav/TypeButton'
	import ListButton from './searchNav/ListButton'
	import HomePageButton from './searchNav/HomePageButton'
	import BackButton from './searchNav/BackButton'

	export default {
		props: ['whethershowtypebutton', 'righttype'],
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
				showSearchResult
			}
		},
		data () {
			return {
				searchValue: ""
			}
		},
		methods: {
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
				if (newSearchValue == "") {
					this.showHot()
					this.closePrompt()
				} else {
					this.closeHot()
					let pushDisplay = []
					this.getListAll.map(function (item) {
						let matcher = eval('/' + newSearchValue + '/')
						if (item) {
							if (item.title.match(matcher)) {
  								pushDisplay.push(item)
  							}
						}
					})
					this.setPromptDisplay(pushDisplay)
					this.showPrompt()
				}
			}
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
		background-color: #34a4e4;
		z-index: 1000;
		display: flex;
	}
	.searchBox {
		float: left;
		flex-basis: 60%;
		flex-grow: 2;
		height: 100%;
		text-align: center;
	}
	.searchColumn {
		width: 90%;
		height: 30px;
		margin-top: 5px;
		border-radius: 15px;
		border: 1px;
		outline: none;
	}
</style>