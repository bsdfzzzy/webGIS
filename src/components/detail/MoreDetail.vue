<template>
	<div class="moreDetail">
		<template v-if="getDetail.detail != ''">
			<div v-html="getDetail.detail"></div>
		</template>
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
	.moreDetail {
		width: 100%;
		overflow: hidden;
		min-height: 400px;
		padding-top: 30px;
		border: 1px solid black;
		box-sizing: border-box;
	}
</style>