<template>
	<search-nav></search-nav>
	<div class="itemList">
		<item></item>
		<item></item>
		<item></item>
	</div>
</template>
<script>
	import Item from './Item'
	import SearchNav from './SearchNav'

	export default {
		components: {
			Item,
			SearchNav
		}
	}
</script>
<style>
	.itemList { 
		margin-top: 70px;
	}
</style>