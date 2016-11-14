<template>
	<div class="searchNav">
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
		<div class="searchBox">
			<input type="search" name="searchBox" class="searchColumn">
		</div>
		<div class="choose">
			-
		</div>
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
				var menu = document.getElementById("category");
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
	.searchNav {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 40px;
		background-color: #34a4e4;
		z-index: 1000;
	}
	.slideDown {
		float: left;
		width: 20%;
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
	.searchBox {
		float: left;
		width: 70%;
		height: 100%;
		text-align: center;
	}
	.searchColumn {
		width: 90%;
		height: 30px;
		margin-top: 5px;
		border-radius: 15px;
		border: 1px;
		outline: none;
	}
	.choose {
		text-align: center;
		line-height: 40px;
	}
</style>