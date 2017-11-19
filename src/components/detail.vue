<template>
	<div class="foodDetail">
		<div>
			<div class="icon-arrow_lift arrow" v-on:click="close"></div>
			<div class="image">
				<img v-bind:src="food.image">
			</div>
			<div class="main">
				<div class="detailTitle">{{food.name}}</div>
				<div class="detailSubheading">
					月售{{food.sellCount}}份
					<div class="rating">
						好评率{{food.rating}}%
					</div>
				</div>
				<div class="price">¥{{food.price}}</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		props: {
			food: {
				type: Object
			}
		},
		methods: {
			close(){
				this.$emit("close");
			}
		}
	}
</script>

<style scoped>
	.foodDetail{
		display: fixed;
		position: absolute;
		top: 0;
		left: 0;
		bottom: 48px;
		width: 100%;
		background-color: #fff;
		z-index: 50;
	}
	.arrow{
		position: absolute;
		top: 10px;
		left: 0;
		padding: 10px;
		color: #fff;
		font-size: 20px;
		text-align: left;
		z-index: 50;
	}
	.image{
		position: relative;
    	width: 100%;
    	height: 0;
    	padding-top: 100%;
	}
	img{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
	}
	.main{
		padding-left: 18px;
	}
	.detailTitle{
		padding-top: 18px;
		text-align: left;
		font-weight: 700;
		font-size: 14px;
		color: rgb(7,17,27);
		line-height: 14px;
	}
	.detailSubheading{
		padding-top: 8px;
		font-size: 10px;
		color: rgb(147,153,159);
		line-height: 10px;
		text-align: left;
	}
	.rating{
		display: inline-block;
		padding-left: 6px;
	}
	.price{
		padding-top: 18px;
		font-size: 14px;
		font-weight: 700;
		color: rgb(240,20,20);
		line-height: 24px;
		text-align: left;
	}
</style>
