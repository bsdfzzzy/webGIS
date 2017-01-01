<template>
    <div class="listButton" v-if="righttype == 'backButton'" @click="closeAll">
	    <img src="/static/img/back.png" width="30px" height="30px">
	</div>
</template>
<script>
    import { closeSearchResult } from '../../actions/searchResult'

	export default {
		props: ['righttype'],
		vuex: {
			actions: {
                closeSearchResult
			}
		},
        methods: {
            closeAll: function () {
                this.closeSearchResult()
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
		margin-top: 8px;
		cursor: pointer;
	}
</style>