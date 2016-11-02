<template>
	<div class="searchNav">
		<div class="slideDown"> + </div>
		<div class="searchBox">
			<input type="search" name="searchBox" class="searchColumn">
		</div>
	</div>
</template>
<script>
	export default {

	}
</script>
<style>
	.searchNav {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 40px;
		background-color: #397419; 
	}
	.slideDown {
		float: left;
		width: 20%;
		height: 100%;
	}
	.searchBox {
		float: left;
		width: 80%;
		height: 100%;
		text-align: center;
	}
	.searchColumn {
		width: 90%;
		height: 30px;
		margin-top: 5px;
		border-radius: 7px;
		border: 1px;
	}
</style>