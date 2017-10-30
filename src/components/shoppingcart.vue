<template>
	<div class="cart">
		<div class="icon">
			<div class="outside">
				<div class="inside" v-show="cartList.length == 0">
					<span class="icon-shopping_cart cart-icon"></span>
				</div>
				<div class="insidefull" v-show="cartList.length > 0" v-on:click="cartdispaly">
					<span class="icon-shopping_cart carticonfull"></span>
				</div>
			</div>
		</div>
		<div class="msg">
			<div class="price">
				¥{{totalprice}}
			</div>
			<div class="filter">
				另需{{seller.data.deliveryPrice}}元配送费
			</div>
		</div>
		<div class="result" v-show="cartList.length == 0">¥20起送</div>
		<div class="resultfull" v-show="cartList.length > 0">结算</div>
		<div class="mask" v-show="cartShow">
			<div class="cart-content" >
				<div class="cart-title" ref="cart">
					<div class="buycart">
						购物车
					<span class="empty" v-on:click="clear">
						<span v-on:click="cartdispaly">
							清空
						</span>
					</span>
					</div>
				</div>
				<div class="cartitem">
					<ul>
						<li v-for="item in cartList">
							<div class="layout">
								<div class="itemname">
									{{item.name}}/{{item.count}}份
								</div>
								<div class="itemprice">
									¥{{item.price*item.count}} 
								</div>
								<clickbutton v-bind:cartList="cartList" v-bind:food="item"></clickbutton>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import clickbutton from '@/components/clickbutton'
	export default{
		props: {
			seller: {
				type: Object
			},
			cartList: {
				type: Array
			},
			clear: {
				type: Function
			}
		},
		data(){
			return{
				cartShow: false
			}
		},
		components: {
			clickbutton
		},
		computed: {
			totalprice(){
				let totalprice = 0;
				for(let index in this.cartList){
					let item = this.cartList[index]; 
					totalprice += item.count * item.price;
				}
				return totalprice;
			}
		},
		methods:{
			cartdispaly(){
				this.cartShow = !this.cartShow;
			}
		}
	}
</script>

<style scoped>
	.cart{
		position: fixed;
		display: flex;
		width: 100%;
		height: 48px;
		background-color: #141d27;
		bottom: 0px;
	}
	.icon{
		flex: 0 0 60px;
		width: 60px;
		background-color: rgb(7,17,27);
	}
	.outside{
		position: relative;
		bottom: 8px;
		left: 8px;
		width: 50px;
		height: 50px;
		background-color: rgb(7,17,27);
		border-radius: 50%;
	}
	.inside{
		position: relative;
		top: 5px;
		left: 5px;
		bottom: 5px;
		width: 40px;
		height: 40px;
		background-color: rgba(221,221,221,0.1);
		border-radius: 50%;
	}
	.insidefull{
		position: relative;
		top: 5px;
		left: 5px;
		bottom: 5px;
		width: 40px;
		height: 40px;
		background-color: rgb(0,160,220);
		border-radius: 50%;
	}
	.cart-icon{
		font-size: 22px;
		line-height: 22px;
		color: rgba(255,255,255,0.4);
		position: relative;
		top: 19%;
	}
	.carticonfull{
		font-size: 22px;
		line-height: 22px;
		color: rgb(255,255,255);
		position: relative;
		top: 19%;
	}
	.msg{
		flex: 1;
		text-align: left;
		background-color: rgb(7,17,27);
	}
	.price{
		display: inline-block;
		padding-top: 14px;
		padding-left: 6px;
		line-height: 24px;
		font-weight: 700;
		color: rgba(255,255,255,0.4);
		font-size: 16px;
	}
	.filter{
		display: inline-block;
		padding-left: 6px;
		border-left: 1px solid rgba(255,255,255,0.4);
		font-weight: 500;
		font-size: 14px;
		line-height: 16px;
		color: rgba(255,255,255,0.4);
	}
	.result{
		flex: 0 0 95px;
		width: 95px;
		padding-top: 14px;
		line-height: 24px;
		color: rgba(255,255,255,0.4);
		text-align: center;
		vertical-align: middle;
		background-color: #2b343c;
		font-weight: 700;
	}
	.resultfull{
		flex: 0 0 95px;
		width: 95px;
		padding-top: 14px;
		line-height: 24px;
		color: #fff;
		text-align: center;
		vertical-align: middle;
		background-color: #00b43c;
		font-weight: 700;
	}
	.mask{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(7,17,27,0.6);
		z-index: -1;
	}
	.cart-content{
		position: fixed;
		bottom: 0;
		left: 0;
		height: 306px;
		width: 100%;
		background-color: #fff;
		overflow: hidden;
	}
	.cart-title{
		position: relative;
		top: 0;
		left: 0;
		height: 40px;
		background-color: #f3f5f7;
		border-bottom: 1px solid rgba(7,17,27,0.1);
	}
	.buycart{
		font-size: 14px;
		font-weight: 200;
		line-height: 40px;
		color: rgb(7,17,27);
		text-align: left;
		padding-left: 18px;
	}
	.empty{
		position: absolute;
		font-size: 12px;
		color: rgb(0,160,220);
		line-height: 40px;
		right: 18px;
	}
	.cartitem{
		padding-left: 18px;
		padding-right: 18px;
	}
	.layout{
		display: flex;
		border-bottom: 1px solid rgba(7,17,27,0.1);
		padding-top: 12px;
		line-height: 24px;
	}
	.itemname{
		flex: 1;
		text-align: left;
		padding-bottom: 12px;
		font-size: 14px;
		color: rgb(7,17,27);
	}
	.itemprice{
		flex: 1;
		text-align: left;
		padding-left: 18px;
		font-size: 14px;
		font-weight: 600;
		color: rgb(240,20,20);
	}
</style>