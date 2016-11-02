<template>
	<div class="navigation">
		<search-nav></search-nav>
		<navigation-map></navigation-map>
		<navigation-infor></navigation-infor>
	</div>
</template>
<script>
	import SearchNav from './SearchNav'
	import NavigationMap from './NavigationMap'
	import NavigationInfor from './NavigationInfor'

	export default {
		components: {
			SearchNav,
			NavigationMap,
			NavigationInfor
		}
	}
</script>
<style>
	.navigation {
		width: 100%;
		height: 100%;
		margin-top: 40px;
	}
</style>