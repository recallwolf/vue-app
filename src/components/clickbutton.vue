<template>
	<div class="iconx"> 
		<span class="icon-remove_circle_outline icon-remove" v-on:click="del" v-show="food.count"></span>
		<span class="num" v-show="food.count">{{food.count}}</span>
		<span class="icon-add_circle icon-add" v-on:click="add"></span>
	</div>
</template>

<script>
	import Vue from 'vue'
	export default{
		props:{
			food: {
				type: Object
			},
			cartList: {
				type: Array
			}
		},
		created(){
			Vue.set(this.food, 'count', 0);
		},
		methods:{
			add(){
				this.food.count++;
				this.cartList.push(this.food);
				console.log(this.cartList);
			},
			del(){
				if(this.food.count){
					this.food.count--;
					this.cartList.splice(0, 1);
					//console.log(this.cartList);
				}
			}
		}
	}
</script>

<style>
	.iconx{
		display: inline-block;
		float: left;
		padding-top: 3px;
	}
	.icon-remove{
		position: absolute;
		right: 60px;
		font-size: 22px;
		line-height: 22px;
		color: rgb(0,160,220);
	}
	.num{
		text-align: center;
		width: 23px;
		position: absolute;
		right: 38px;
		font-size: 12px;
		line-height: 22px;
		color: rgb(147,153,159);
	}
	.icon-add{
		position: absolute;
		right: 16px;
		font-size: 22px;
		line-height: 22px;
		color: rgb(0,160,220);
	}
</style>