<template>
	<div class="detail">
		<brief-detail></brief-detail>
		<more-detail></more-detail>
	</div>
</template>
<script>
	import BriefDetail from './BriefDetail'
	import MoreDetail from './MoreDetail'

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
		overflow: hidden;
	}
</style>