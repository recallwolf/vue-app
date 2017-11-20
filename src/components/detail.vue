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
				<div class="price">
					¥{{food.price}}
					<div class="oldPrice" v-show="food.oldPrice!=''">
						¥{{food.oldPrice}}
					</div>
					<div class="add" v-if="!food.count || food.count===0" v-on:click="add"><p class="addText">加入购物车</p></div>
					<clickbutton class="button" v-if="food.count && food.count != 0" v-bind:food="food" v-bind:cartList="cartList"></clickbutton>
				</div>
			</div>
			<div class="line"></div>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue'
	import clickbutton from '@/components/clickbutton'
	export default{
		props: {
			food: {
				type: Object
			},
			cartList: {
				type: Array
			}
		},
		components: {
			clickbutton
		},
		methods: {
			close(){
				this.$emit("close");
			},
			add(){
				if(this.food.count == false||this.food.count == undefined){
					Vue.set(this.food, 'count', 0);
					this.cartList.push(this.food);
				}
				this.food.count++;			
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
		display: block;
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
		padding-bottom: 18px;
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
	.oldPrice{
		display: inline-block;
		padding-left: 6px;
		font-size: 12px;
		font-weight: 700;
		color: rgb(147,153,159);
		line-height: 24px;
		text-decoration: line-through;
	}
	.add{
		display: inline-block;
		position: absolute;
		right: 18px;
		height: 24px;
		width: 74px;
		border-radius: 12px;
		background-color: rgb(0,160,220);
		text-align: center;
	}
	.button{
		display: inline-block;
		position: absolute;
		right: 18px;
	}
	.addText{
		padding-top: 7px;
		font-size: 10px;
		font-weight: normal;
		line-height: 12px;
		color: rgb(255,255,255);
	}
	.line{
		height: 18px;
		background-color: #f3f5f7;
	}
</style>
