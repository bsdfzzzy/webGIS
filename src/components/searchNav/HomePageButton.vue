<template>
    <div class="listButton" v-if="righttype == 'homePageButton'" @click="closeAll">
	    <img src="/static/img/cancel.png" width="30px" height="30px">
	</div>
</template>
<script>
	import { closeList } from '../../actions/list'
    import { closeSearchFloat, notChoosingStart, notChoosingDest } from '../../actions/searchFloat'
    import { closeSearchResult } from '../../actions/searchResult'
	import { showSearchNav } from '../../actions/searchNav'
	import { showNavigate } from '../../actions/navigate'

	export default {
		props: ['righttype'],
		vuex: {
			actions: {
				closeList,
                closeSearchFloat,
                closeSearchResult,
				showSearchNav,
				showNavigate,
				notChoosingDest,
				notChoosingStart
			}
		},
        methods: {
            closeAll: function () {
                this.closeList()
                this.closeSearchFloat()
                this.closeSearchResult()
				this.showSearchNav()
				this.showNavigate()
				this.notChoosingStart()
				this.notChoosingDest()
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