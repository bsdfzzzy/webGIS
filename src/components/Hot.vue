<template>
	<div class="hot">
		<nav>热门搜索</nav>
		<div class="labels">
			<div class="hotLabel">热门搜索</div>
			<div class="hotLabel">热门搜索</div>
			<div class="hotLabel">热门搜索</div>
			<div class="hotLabel">热门搜索</div>
			<div class="hotLabel">热门搜索</div>
		</div>
	</div>
	<!-- <div class="insulate"></div> -->
</template>
<script></script>
<style>
	.hot {
		width: 100%;
		overflow: hidden;
		text-align: left;
		padding: 20px 20px 0 20px;
	}
	.hot nav {
		font-size: 13px;
		color: #999;
	}
	.labels {
		width: 85%;
		margin: 20px auto 0;
		overflow: hidden;
	}
	.hotLabel {
		float: left;
		margin-right: 10px;
		margin-bottom: 10px;
		line-height: 15px;
		border-radius: 5px;
		font-size: 10px;
		height: 15px;
		color: white;
		background: #ccc;
		padding: 4px 8px;
	}
	.insulate {
		height: 8px;
		width: 100%;
		background: #ddd;
	}
</style>