<template>
	<div class="briefDetail">
		<img src="#" width="60px" height="60px" class="detailImg">
		<div class="briefDetailContent">
			<p><strong>akshdaksd</strong></p>
			<p>ashdsakjd</p>
			<p>asldad</p>
		</div>
		<button class="go">go</button>
	</div>
</template>
<script></script>
<style>
	.briefDetail {
		width: 100%;
		min-height: 60px;
		padding: 30px;
		overflow: hidden;
		border: 1px solid #ddd;
		-webkit-box-shadow: 0 2px 10px #909090;/*safari或chrome*/
		box-shadow: 0 2px 10px #909090;/*opera或ie9*/
		-moz-box-shadow: 0 2px 10px #909090;/*firefox*/
	}
	.detailImg {
		float: left;
	}
	.briefDetailContent {
		overflow: hidden;
		float: left;
		margin-left: 20px;
	}
	.go {
		float: right;
		margin-top: 20px;
	}
</style>