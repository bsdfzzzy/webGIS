<template>
	<div class="home">
		<search-nav></search-nav>
		<map-container></map-container>
		<instruction></instruction>
	</div>
</template>
<script>
	import MapContainer from './MapContainer'
	import SearchNav from './SearchNav'
	import Instruction from './Instruction'

	export default {
		components: {
			MapContainer,
			SearchNav,
			Instruction
		}
	}
</script>
<style>
	.main {
		height: 100%;
	}
</style>