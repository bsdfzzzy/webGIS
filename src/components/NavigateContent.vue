<template>
	<div class="navigateContent">
		<!--<div class="closeNavigateBox" @click="closeNavigateContentBox">×</div>-->
		<div class="content">
			<div class="mainContent">
                <div class="contentName">{{getStart ? getStart.title : ''}}</div>
                <div class="contentArrow">>></div>
                <div class="contentName">{{getDest? getDest.title : ''}}</div>
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
        display: flex;
        text-align: center;
    }
    .mainContent .contentName {
        flex: 3;
    }
    .mainContent .contentArrow {
        flex: 1;
    }
</style>