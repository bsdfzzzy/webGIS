<template>
	<div class="briefDetail">
		<img src="#" width="60px" height="60px" class="detailImg">
		<div class="briefDetailContent">
			<p><strong>{{getDetail.title}}</strong></p>
			<p>{{getDetail.desc}}</p>
		</div>
		<button class="go">go</button>
	</div>
</template>
<script>
	import { getDetail } from '../../getters'

	export default {
		vuex: {
			getters: {
				getDetail
			},
			actions: {

			}
		},
		ready: function () {
			// let id = this.getDetail.id
			// postDataJSON = JSON.stringify({
			// 	ids: [id]
			// })
			// axios.post('', ).catch(function (e) {
			// 	console.log(e)
			// })
		}
	}
</script>
<style>
	.briefDetail {
		width: 100%;
		box-sizing: border-box;
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
		width: calc(100% - 100px);
	}
	.go {
		float: left;
		margin-top: 20px;
	}
</style>