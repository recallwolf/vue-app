<template>
	<div class="cart">
		<div class="icon">
			<div class="outside">
				<div class="inside" v-show="cartList.length == 0">
					<span class="icon-shopping_cart cart-icon"></span>
				</div>
				<div class="insidefull" v-show="cartList.length > 0" v-on:click="cartdispaly">
					<span class="icon-shopping_cart carticonfull">
						<span class="totalcount">{{totalcount}}</span>
					</span>
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
		<div class="result" v-show="totalprice < seller.data.minPrice">¥{{seller.data.minPrice}}起送</div>
		<div class="resultfull" v-show="totalprice >= seller.data.minPrice">结算</div>
		<transition name="fade"><div class="mask" v-show="cartShow" v-on:click="cartdispaly"></div></transition>
		<transition name="fold">
			<div class="cart-content" v-show="cartShow">
				<div class="cart-title" ref="cart">
					<div class="buycart">
						购物车
						<span class="empty" v-on:click="clear">
							<div v-on:click="cartdispaly">
								清空
							</div>
						</span>
					</div>
				</div>
				<div class="cartitem" ref="cartitem">
					<ul>
						<li v-for="(item, index) in cartList" v-bind:key="index">
							<div class="layout">
								<div class="itemname">
									{{item.name}}/{{item.count}}份
								</div>
								<div class="itemprice">
									¥{{item.price*item.count}} 
								</div>
								<clickbutton v-on:add="addFood" v-bind:cartList="cartList" v-bind:food="item" v-on:display="cartdispaly"></clickbutton>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</transition>
		<div v-for="(ball, index) in balls" v-bind:key="index">
			<transition v-on:before-enter="beforeDrop" v-on:enter="dropping" v-on:after-enter="afterDrop">
            	<div class="ball" v-show="ball.show">
             		<div class="inner inner-hook"></div>
            	</div>
          	</transition>
		</div>
	</div>
</template>

<script>
	import bscroll from 'better-scroll'
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
				cartShow: false,
				balls: [
					{show: false},
					{show: false},
					{show: false},
					{show: false},
					{show: false}
				],
				dropBalls: []
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
			},
			totalcount(){
				let totalcount = 0;
				for(let index in this.cartList){
					let item = this.cartList[index];
					totalcount += item.count;
				}
				return totalcount;
			},
		},
		created(){
			this.$nextTick(() => {
				this.scroll = new bscroll(this.$refs.cartitem, {
                	click: true
            	});
			})
		},
		watch: {
			cartShow: function(){
				if(this.cartShow) {
          			this.$nextTick(() => {
          				this.scroll.refresh();
   					});
   				}
   			}
   		},
		methods:{
			cartdispaly(){
				this.cartShow = !this.cartShow;
			},
			drop(el){
				for(let i = 0; i < this.balls.length; i++){
					let ball = this.balls[i];
					if(!ball.show){
						ball.show = true;
						ball.el = el;
						this.dropBalls.push(ball);
						return;
					}
				}
			},
			beforeDrop(el){
				let count = this.balls.length;
				while (count--){
					let ball = this.balls[count];
					if (ball.show) {
						let rect = ball.el.getBoundingClientRect();
						let x = rect.left - 32;
						let y = -(window.innerHeight - rect.top - 22);
						el.style.display = '';
						el.style.webkitTransform = `translate3d(0,${y}px,0)`;
						el.style.transform = `translate3d(0,${y}px,0)`;
						let inner = el.getElementsByClassName('inner-hook')[0];
						inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
						inner.style.transform = `translate3d(${x}px,0,0)`;
					}
				}
			},
			dropping(el, done){
				let rf = el.offsetHeight;
				this.$nextTick(() => {
					el.style.webkitTransform = 'translate3d(0,0,0)';
					el.style.transform = 'translate3d(0,0,0)';
					let inner = el.getElementsByClassName('inner-hook')[0];
					inner.style.webkitTransform = 'translate3d(0,0,0)';
					inner.style.transform = 'translate3d(0,0,0)';
					el.addEventListener('transitionend', done);
				});
			},
			afterDrop(el){
				let ball = this.dropBalls.shift();
				if (ball) {
					ball.show = false;
					el.style.display = 'none';
				}
			},
			addFood(target){
				this.drop(target);
			}
		}
    }
</script>

<style scoped>
	.fold-leave-active,.fold-enter{
		transform: translate(0,100%);
	}
    .fold-enter-active,.fold-leave-active{
    	transition: all 0.5s;
	}
	.fade-enter-active,.fade-leave-active{
     	transition: all 0.5s;
	}
    .fade-enter,.fade-leave-active{
    	opacity: 0;
	}
	.ball{
		position: fixed;
		left: 32px;
		bottom: 22px;
		z-index: 200;
		transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
	}
	.inner{
		width: 16px;
		height: 16px;
		border-radius: 50%;
		background: rgb(0, 160, 220);
		transition: all 0.4s linear;
	}
	.cart{
		position: fixed;
		display: flex;
		width: 100%;
		height: 48px;
		background-color: #141d27;
		bottom: 0px;
		z-index: 100;
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
	.totalcount{
		position: absolute;
		bottom: 18px;
		left: 16px;
		background-color: rgb(240,20,20);
		padding-left: 3px;
		padding-right: 3px;
		width: 20px;
		font-size: 14px;
		font-weight: 700;
		line-height: 16px;
		color: rgb(255,255,255);
		border-radius: 12px;
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
		z-index: -1;
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
		position: fixed;
		font-size: 12px;
		color: rgb(0,160,220);
		line-height: 40px;
		right: 18px;
		background-color: #f3f5f7;
	}
	.cartitem{
		height: 218px;
		padding-left: 18px;
		padding-right: 18px;
		overflow: hidden;
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