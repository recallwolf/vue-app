<template>
	<div class="goods">
		<div class="menu" ref="menu">
			<ul>
				<li class="list" v-for="(good,index) in goods.data" v-bind:class="{current: index===currentIndex}" v-on:click="selectMenu(index)">
					<span class="me-content" v-bind:class="{'current-content': index===currentIndex}">{{good.name}}</span>
				</li>
			</ul>
		</div>
		<div class="goods-content" ref="goods">
			<ul>
				<li v-for="good in goods.data"  class="list-hook">
					<div class="food-title">{{good.name}}</div>
					<ul>
						<li v-for="food in good.foods" class="food-item">
							<div>
								<div class="food-icon"><img v-bind:src="food.icon" width="57" height="57"></div>
								<div class="food-content">
									<div class="food-name">{{food.name}}</div>
									<div class="food-des" v-if="food.description!=''">{{food.description}}</div>
									<div class="food-count">月售:{{food.sellCount}}份 好评率:{{food.rating}}%</div>
									<div class="food-price">
										¥{{food.price}} 
										<span class="food-old" v-show="food.oldPrice!=''">
											¥{{food.oldPrice}}
										</span>
									</div>
									<clickbutton v-bind:food="food" v-bind:cartList="cartList"></clickbutton>
								</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<cart v-bind:seller="seller" v-bind:cartList="cartList"></cart>
	</div>
</template>

<script>
    import bscroll from 'better-scroll'
    import cart from '@/components/shoppingcart'
    import clickbutton from '@/components/clickbutton'
	export default{
		props: {
			seller: {
				type: Object
			}
		},
		data(){
			return{
				goods: {},
				cartList: [],
				listHeight: [],
				scrollY: 0,
			}
		},
		components: {
			cart,
			clickbutton
		},
		computed: {
			currentIndex(){
				for (let i = 0; i < this.listHeight.length; i++){
          			let heightOne = this.listHeight[i];
          			let heightTwo = this.listHeight[i + 1];
          			if(heightTwo){
          				if (this.scrollY >= heightOne && this.scrollY < heightTwo){
            				return i;
          				}
        			}
        		}
        		return false;
        	}
      	},
		created(){
			this.$http.get('/api/goods').then(response => {
        		response = response.body;
        		if(response.errno === 0){
          			this.goods = response;
          			this.$nextTick(() => {
          					this.scroll();
          					this.computeHeight();
          				}
          			);
        		}
			})
		},
		methods: {
			scroll(){
				this.menuScroll = new bscroll(this.$refs.menu, {
					click: true
				});
				this.foodScroll = new bscroll(this.$refs.goods, {
					probeType: 3,
					click: true
				});
				this.foodScroll.on('scroll', (pos) => {
					this.scrollY = Math.abs(Math.round(pos.y));
				});
			},
			selectMenu(index){
				let goodList = this.$refs.goods.getElementsByClassName('list-hook');
				let el = goodList[index];
        		this.foodScroll.scrollToElement(el, 300);
			},
			computeHeight(){
				let goodList = this.$refs.goods.getElementsByClassName('list-hook');
				let height = 0;
				this.listHeight.push(height);
				for(let x in goodList){
					let tmp = goodList[x];
					height+= tmp.clientHeight;
					this.listHeight.push(height);
				}
			}
		}
	}
</script>

<style scoped>
	.goods{
		display: flex;
		width: 100%;
		position: absolute;
		bottom: 46px;
		top: 174px;
	}
	.menu{
		flex: 0 0 80px;
		text-align: left;
		width: 80px;
		background-color: #f3f5f7;
		overflow: hidden;
	}
	.list{
		display: table;
		height: 52px;
		width: 56px;
		line-height: 54px;
		padding: 0 12px;
	}
	.current{
		padding: 0 12px;
        margin-top: -1px;
        background: #fff;
	}
	.me-content{
		display: table-cell;
		text-align: center;
		vertical-align: middle;
		border-bottom-style:solid;
		border-bottom-width: 1px;
		border-bottom-color: rgba(7,17,27,0.1);	
		line-height: 14px;
		font-size: 12px;
		font-weight: 200;
	}
	.current-content{
		font-weight: 700;
		border: none;
	}
	.goods-content{
		flex: 1;
		text-align: left;
		overflow: hidden;
	}
	.food-title{
		line-height: 26px;
		background-color: #f3f5f7;
		font-size: 12px;
		color: rgb(147,153,159);
		border-left: 2px solid #d9dde1;
		padding-left: 14px;
	}
	.food-item{
		margin: 18px;
		border-style: solid;
		border-bottom-width: 1px;
		border-color: rgba(7,17,27,0.1);
	}
	.food-item:last-child{
		border: none;
	}
	.food-icon{
		display: inline-block;
		padding-right: 10px;
		padding-bottom: 18px;
	}
	.food-content{
		width: 130px;
		display: inline-block;
		font-size: 0;
		vertical-align: top;
	}
	.food-name{
		font-size: 16px;
		font-weight: 600;
		line-height: 16px;
		color: rgb(7,17,27);
		padding-bottom: 8px
	}
	.food-des{
		font-size: 12px;
		color: rgb(147,153,159);
		line-height: 12px;
		padding-bottom: 4px;
	}
	.food-count{
		font-size: 12px;
		color: rgb(147,153,159);
		line-height: 12px;
	}
	.food-price{
		font-size: 16px;
		color: rgb(240,20,20);
		font-weight: 700;
		line-height: 24px;
		padding-bottom: 9px;
		display: inline-block;
	}
	.food-old{
		font-size: 12px;
		color: rgb(147,153,159);
		font-weight: 700;
		line-height: 24px;
		text-decoration: line-through;
	}
</style>