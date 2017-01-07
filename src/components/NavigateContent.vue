<template>
	<div class="navigateContent">
		<div class="closeNavigateBox" @click="closeNavigateContentBox">×</div>
		<div class="content">
			<div class="mainContent">
				{{getStart ? getStart.title : ''}} &nbsp;&nbsp;&nbsp;&nbsp;>>&nbsp;&nbsp;&nbsp;&nbsp; {{getDest? getDest.title : ''}}
			</div>
		</div>
	</div>
</template>
<script>
    import { closeNavigateContent } from '../actions/navigate'
    import { getDest, getStart } from '../getters'

    export default {
        vuex: {
            getters: {
                getDest,
                getStart
            },
            actions: {
                closeNavigateContent
            }
        },
        methods: {
            closeNavigateContentBox () {
                this.closeNavigateContent()
            }
        }
    }
</script>
<style>
    .navigateContent {
        position: fixed;
		bottom: 0;
		width: 96%;
		min-height: 10px;
		background: white;
		margin: auto;
		left: 0;
		right: 0;
		padding: 10px 15px 5px;
		box-sizing: border-box;
		border: 1px solid #aaa;
        text-align: center;
    }

    .navigateContent .mainContent {
        color: #666;
        min-height: 50px;
        line-height: 50px;
    }
</style>