<template>
	<div> 
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
		methods:{
			add(){
				if(this.food.count == false||this.food.count == undefined){
					Vue.set(this.food, 'count', 0);
					this.cartList.push(this.food);
				}
				this.food.count++;			
			},
			del(){
				this.food.count--;
				if(this.food.count === 0){
					let foodName = this.food.name;
					for(let x in this.cartList){
						let toArray = [this.cartList[x]];
						let index = toArray.findIndex(function(value){
							return value.name === foodName;
						});	
						if(index >= 0){
							this.cartList.splice(index,1);

						}
					}
				}
			}
		}
	}
</script>

<style>
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