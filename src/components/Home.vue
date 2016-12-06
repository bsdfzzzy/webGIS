<template>
	<div class="home">
		<search-nav :whetherShowTypeButton="show" :rightType="type" v-if="getShowSearchNav"></search-nav>
		<map-container></map-container>
		<instruction v-if="getShowInstruction" transition="expand" :title="getBriefTitle" :content="getBriefContent"></instruction>
		<navigate v-if="getShowNavigate" transition="expand"></navigate>
		<search-float v-if="getShowSearchFloat" transition="expand"></search-float>
		<search-result v-if="getShowSearchResult"></search-result>
		<item-list v-if="getShowList"></item-list>
		<detail v-if="getShowDetail"></detail>
	</div>
</template>
<script>
	import MapContainer from './MapContainer'
	import SearchNav from './SearchNav'
	import Instruction from './Instruction'
	import Navigate from './Navigate'
	import SearchFloat from './SearchFloat'
	import SearchResult from './SearchResult'
	import ItemList from './ItemList'
	import Detail from './Detail'
	import { getShowDetail, getShowSearchNav, getShowList, getShowSearchResult ,getShowInstruction, getShowNavigate, getBriefContent, getBriefTitle, getShowSearchFloat, getWhetherShowTypeButton } from '../getters'

	export default {
		components: {
			MapContainer,
			SearchNav,
			Instruction,
			Navigate,
			SearchFloat,
			SearchResult,
			ItemList,
			Detail
		},
		vuex: {
			getters: {
				getShowInstruction,
				getShowNavigate,
				getBriefTitle,
				getBriefContent,
				getShowSearchFloat,
				getShowSearchResult,
				getShowList,
				getShowSearchNav,
				getShowDetail
			},
			actions: {
				
			}
		},
		data () {
			return {
				show: true,
				type: "listButton"
			}
		}
	}
</script>
<style>
	.home {
		height: 100%;
	}
</style>