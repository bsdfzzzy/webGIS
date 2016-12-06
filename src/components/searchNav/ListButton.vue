<template>
    <div class="listButton" v-if="righttype == 'listButton'" @click="showList">
	    <img src="/static/img/menu.png" width="30px" height="30px">
	</div>
</template>
<script>
	import { showList } from '../../actions/list'

	export default {
		props: ['righttype'],
		vuex: {
			actions: {
				showList
			}
		}

	}
</script>
<style>
    .listButton {
		text-align: center;
		line-height: 40px;
		flex-grow: 1;
		float: right;
    }
	.listButton img {
		margin: 5px auto 0px;
		cursor: pointer;
	}
</style>