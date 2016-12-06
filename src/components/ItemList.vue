<template>
	<div class="itemList">
		<search-nav :rightType="'homePageButton'"></search-nav>
		<div class="listNav">
			<div class="navItem" @click="showBlocks">楼栋</div>
			<div class="navItem" @click="showRooms">房间</div>
			<div class="navItem" @click="showTeams">团队</div>
		</div>
		<div class="listContent">
			<item v-for="display in getListDisplay" :img="display.img" :title="display.title" :content="display.desc" :id="display.id"></item>
		</div>
	</div>
</template>
<script>
	import Item from './Item.vue'
	import SearchNav from './SearchNav'
	import axios from 'axios'
	import { showBlocks, showRooms, showTeams, setBlocks, setRooms, setTeams } from '../actions/list'
	import { getListDisplay } from '../getters'

	export default {
		components: {
			Item,
			SearchNav
		},
		vuex: {
			getters: {
				getListDisplay
			},
			actions: {
				showBlocks,
				showRooms,
				showTeams,
				setBlocks,
				setRooms,
				setTeams
			}
		},
	}
</script>
<style>
	.itemList { 
		position: fixed;
		top: 0;
		width: 100%;
		height: 100%;
		background: white;
		z-index: 9000;
	}
	.listNav {
		margin-top: 40px;
		display: flex;
		height: 40px;
		padding: 5px 0;
		background: white;
		box-sizing: border-box;
	}
	.navItem {
		float: left;
		flex: 1;
		text-align: center;
		box-sizing: border-box;
		height: 30px;
		cursor: pointer;
	}
	.listNav :not(:first-child) {
		border-left: 1px solid #ccc;
	}
	.listContent {
		background: rgba(225, 225, 225, 0.5);
		width: 100%;
		height: calc(100% - 80px);
		position: absolute;
		top: 80px;
		overflow: scroll;
	}
</style>