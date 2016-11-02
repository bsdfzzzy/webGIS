<template>
	<div class="routeQuery">
		<div class="fromAndTo">
			<input type="text" name="from" class="from" placeholder="我的位置">
			<img src="#" width="60px" height="30px">
			<input type="text" name="to" class="to" placeholder="您要去哪儿">
		</div>
		<button class="queryButton">chaxun</button>
	</div>
</template>
<script></script>
<style>
	.routeQuery {
		margin: 0 auto;
		overflow: hidden;
	}
	.fromAndTo {
		width: 90%;
		height: 30px;
		overflow: hidden;
		margin: 0 auto 30px;
		display: flex;
	}
	.fromAndTo input {
		width: 100%;
		min-width: 70px;
		outline: none;
		box-sizing: border-box;
		border: 1px solid #aaa;
		text-align: center;
		border-radius: 3px;
	}
	.from {
		display: block;
		margin-right: 10px;
		flex-basis: 60px;
		flex-grow: 1;
	}
	.to {
		width: 50px;
		display: block;
		flex-basis: 60px;
		flex-grow: 1;
	}
	.fromAndTo img {
		display: block;
		margin-right: 10px;
	}
	.queryButton {
		width: 90%;
		height: 30px;
		font-size: 20px;
		background: #4876FF;
		color: white;
		border-radius: 5px;
		outline: none;
		border: none;
	}
</style>