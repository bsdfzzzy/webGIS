<template>
	<div class="home">
		<!-- <search-nav></search-nav> -->
		<map-container></map-container>
		<instruction v-if="showInstruction" transition="expand" :title="getBriefTitle" :content="getBriefContent"></instruction>
		<navigate v-if="showNavigate" transition="expand"></navigate>
	</div>
</template>
<script>
	import MapContainer from './MapContainer'
	import SearchNav from './SearchNav'
	import Instruction from './Instruction'
	import Navigate from './Navigate'
	import { showInstruction, showNavigate, getBriefContent, getBriefTitle } from '../getters'

	export default {
		components: {
			MapContainer,
			//SearchNav,
			Instruction,
			Navigate,
		},
		vuex: {
			getters: {
				showInstruction,
				showNavigate,
				getBriefTitle,
				getBriefContent
			},
			actions: {
				
			}
		}
	}
</script>
<style>
	.home {
		height: 100%;
	}
</style>