<template>
	<div class="moreDetail">
		<nav>
			<div class="moreDetailNav" @click="showBase">
				<p :class="getShowDetailBase ? 'activeItem' : ''">基本信息</p>
			</div>
			<div class="moreDetailNav" @click="showBusiness">
				<p :class="getShowDetailBusiness ? 'activeItem' : ''">业务信息</p>
			</div>
		</nav>
		<template class="moreDetailBaseContainer" v-if="getShowDetailBase">
			<template v-if="!getDetail.detail">
				<div class="noMoreDetailBase">
					没有更多信息
				</div>
			</template>
			<template v-else>
				<div v-html="getDetail.detail" class="moreDetailBase"></div>
			</template>
		</template>
		<template class="moreDetailBusinessContainer" v-if="getShowDetailBusiness">
			<template v-if="getDetail.business.length != 0">
				<template v-for="officeBusiness in getDetail.business">
					<p class="moreDetailBusiness">{{officeBusiness.business_name}}</p>
					<div v-html="officeBusiness.business_detail" class="moreDetailBusiness"></div>
				</template>
			</template>
			<template v-else>
				<div class="noMoreDetailBusiness">
					没有更多信息
				</div>
			</template>
		</template>
	</div>
</template>
<script>
	import { getDetail, getShowDetailBase, getShowDetailBusiness, getListDisplay } from '../../getters'
	import { showBase, showBusiness } from '../../actions/detail'

	export default {
		vuex: {
			getters: {
				getDetail,
				getShowDetailBase,
				getShowDetailBusiness,
				getListDisplay
			},
			actions: {
				showBase,
				showBusiness
			}
		},
		ready: function () {
			// if (this.getListDisplay[0]) {
			// 	if (this.getListDisplay[0].business_name) {
			// 		this.showBusiness()
			// 	} else {
			// 		this.showBase()
			// 	}
			// } else {
			// 	this.showBase()
			// }
		}
	}
</script>
<style>
	.moreDetail {
		width: 100%;
		overflow: hidden;
		min-height: 400px;
		box-sizing: border-box;
	}
	.moreDetailNav {
		display: inline-block;
		flex: 1;
		text-align: center;
		height: 30px;
		line-height: 35px;
	}
	.moreDetail nav {
		height: 35px;
		display: flex;
		border-bottom: 1px solid #ddd;
		-webkit-box-shadow: 0 2px 10px rgba(220, 220, 220, 0.8);/*safari或chrome*/
		box-shadow: 0 2px 10px rgba(220, 220, 220, 0.8);/*opera或ie9*/
		-moz-box-shadow: 0 2px 10px rgba(220, 220, 220, 0.8);/*firefox*/
	}
	.moreDetailNav:last-child {
		border-left: 1px solid #ddd;
	}
	.moreDetailNav p {
		width: 80%;
		margin: auto;
		height: 30px;
	}
	.moreDetailBase {
		padding: 40px;
	}
	.moreDetailBusiness {
		padding: 40px;
	}
	.noMoreDetailBusiness {
		color: #888;
		text-align: center;
		width: 100%;
		margin-top: 50%;
	}
	.noMoreDetailBase {
		color: #888;
		text-align: center;
		width: 100%;
		margin-top: 50%;
	}
</style>