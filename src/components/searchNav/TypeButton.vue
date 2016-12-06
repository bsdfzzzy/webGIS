<template>
    	<div class="slideDown" @click="displayMenu">
			分类
		</div>
		<div class="category" id="category" style="display: none;">
			<ul>
				<li class="categoryName" @click="displayChildMenu">
					分类一
					<ul class="smallCategory"  style="display: none;">
						<li class="smallCategoryName">分类二</li>
						<li class="smallCategoryName">分类二</li>
						<li class="smallCategoryName">分类二</li>
					</ul>
				</li>
				<li class="categoryName active" @click="displayChildMenu">
					分类一
					<ul class="smallCategory" style="display: none;">
						<li class="smallCategoryName">分类二</li>
						<li class="smallCategoryName">分类二</li>
						<li class="smallCategoryName">分类二</li>
					</ul>
				</li>
				<li class="categoryName" @click="displayChildMenu">
					分类一
					<ul class="smallCategory"  style="display: none;">
						<li class="smallCategoryName">分类二</li>
						<li class="smallCategoryName">分类二</li>
						<li class="smallCategoryName">分类二</li>
					</ul>
				</li>
			</ul>
		</div>
</template>
<script>
    export default {
        methods: {
			displayChildMenu (e) {
				var uls = document.getElementsByClassName('smallCategory');
				for (var j in uls) {
					if(uls[j].style) {
						uls[j].style.display = "none";
					}
					
				}
				for (var i in e.target.childNodes) {
					if (e.target.childNodes[i].tagName == 'UL') {
						e.target.childNodes[i].style.display = "block";
					}
				}
			},
			displayMenu (e) {
				var menu = e.target.parentNode.getElementsByClassName("category")[0];
				if (menu.style.display == "none") {
					menu.style.display = "block";
				} else if (menu.style.display == "block") {
					menu.style.display = "none";
				}
			}
		}
    }
</script>
<style>
	.slideDown {
		flex-grow: 1;
		height: 100%;
		text-align: center;
		color: white;
		line-height: 40px;
		cursor: pointer;
	}
	.category {
		position: absolute;
		top: 40px;
		left: 0px;
		width: 70px;
	}
	.categoryName {
		width: 100%;
		height: 30px;
		text-align: center;
		line-height: 30px;
		background: white;
		color: #4f5f6f;
		border: 1px solid #ddd;
		position: relative;
	}
	.active {
		background: #34a4e4 !important;
		color: white !important;
	}
	.smallCategory {
		position: absolute;
		top: 0;
		left: 102%;
		width: 70px;
		list-style: none;
	}
	.hide {
		display: none !important;
	}
	.smallCategoryName {
		width: 100%;
		height: 30px;
		text-align: center;
		line-height: 30px;
		background: white;
		color: #4f5f6f;
		border: 1px solid #ddd;
	}
	.smallActive {
		background: #34a4e4 !important;
		color: white !important;
	}
</style>