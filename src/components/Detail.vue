<template>
	<div class="detail">
		<brief-detail></brief-detail>
		<more-detail></more-detail>
	</div>
</template>
<script>
	import BriefDetail from './detail/BriefDetail'
	import MoreDetail from './detail/MoreDetail'

	export default {
		components: {
			BriefDetail,
			MoreDetail,
		}
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
	}
</style>