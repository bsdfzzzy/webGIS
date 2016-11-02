<template>
	<div class="route">
		<img src="#" class="logo" width="80px" height="80px">
		<route-query></route-query>
		<hot></hot>
	</div>
</template>
<script>
	import RouteQuery from './RouteQuery'
	import Hot from './Hot'

	export default {
		components: {
			RouteQuery,
			Hot
		}
	}
</script>
<style>
	.route {
		width: 100%;
		overflow: hidden;
		text-align: center;
		padding: 50px 20px;
		box-sizing: border-box;
	}
	.logo {
		margin: 0 auto 40px;
	}
</style>