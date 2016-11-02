<template>
	<div class="instruction">
		<div class="scroll" @click.stop.prevent="toggle"> + </div>
		<div class="brief-ins">
			<img src="#" width="60px" height="60px" class="brief-ins-logo">
			<div class="brief-ins-content">
				<p><strong>sss</strong></p>
				<br>
				<p>askdha</p>
			</div>
			<button class="go" @click="to">go</button>
		</div>
		<div v-if="show" class="more-ins" transition="expand"></div>
	</div>
</template>
<script>
	export default {
		data () {
			return {
				show: false
			}
		},
		methods: {
			toggle () {
				this.show = !this.show
			},
			to () {
				this.$router.go({name: 'result'})
			}
		}
	}
</script>
<style>
	.instruction {
		position: fixed;
		bottom: 0;
		width: 100%;
		overflow: hidden;
		background: yellow;
	}
	.scroll {
		height: 20px;
		width: 100%;
	}
	.brief-ins {
		box-sizing: border-box;
		height: 80px;
		padding: 10px 20px 20px;
		bottom: 0;
		width: 100%;
		position: relative;
		overflow: hidden;
	}
	.more-ins {
		width: 100%;
		height: 100px;
	}
	.brief-ins-logo {
		float: left;
	}
	.brief-ins-content {
		margin-left: 15px;
		float: left;
	}
	.go {
		float: left;
		position: absolute;
		right: 40px;
		top: 30px;
	}
</style>