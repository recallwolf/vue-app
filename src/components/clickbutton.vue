<template>
	<div>
		<transition name="move">
			<span class="icon-remove_circle_outline icon-remove" v-on:click="del" v-show="food.count"></span>
		</transition>
		<transition name="move">
			<span class="num" v-show="food.count">{{food.count}}</span>
		</transition>
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
				this.$emit('add', event.target);		
			},
			del(){
				if(this.food.count){
					this.food.count--;
				}
				if(this.food.count === 0){
					let foodName = this.food.name;
					for(let x in this.cartList){
						let toArray = [this.cartList[x]];
						let index = toArray.findIndex(function(value){
							return value.name === foodName;
						});	
						if(index >= 0){
							this.cartList.splice(x,1);

						}
					}
					if(this.cartList.length === 0){
						this.$emit('display');
					}
				}
			}
		}
	}
</script>

<style>
	.move-enter-active, .move-leave-active{
		transition: all 0.4s linear;
	}
	.move-enter, .move-leave-active{
		transform: translate(100%, 0) rotate(180deg);
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