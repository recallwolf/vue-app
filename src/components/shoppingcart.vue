<template>
	<div class="cart">
		<div class="icon">
			<div class="outside">
				<div v-bind:class="{insidefull: num, inside: true}">
					<span v-bind:class="{'icon-shopping_cart': true, 'cart-icon': true, carticonfull: num}"></span>
				</div>
			</div>
		</div>
		<div class="msg">
			<div class="price">
				¥10
			</div>
			<div class="filter">
				另需{{seller.data.deliveryPrice}}元配送费
			</div>
		</div>
		<div v-bind:class="{result: true, resultfull: num}">结算</div>
	</div>
</template>

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
</style>

<script>
	export default{
		props: {
			num: {},
			seller: {
				type: Object
			},
		}
	}
</script>