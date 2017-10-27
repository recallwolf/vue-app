<template>
	<div class="goods">
		<div class="menu" ref="menu">
			<ul>
				<li class="list" v-for="good in goods.data"><span class="me-content">{{good.name}}</span></li>
			</ul>
		</div>
		<div class="goods-content" ref="goods">
			<ul>
				<li v-for="good in goods.data">
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
										<span class="icon-remove_circle_outline icon-remove" v-on:click="del" v-show="num"></span>
										<span class="num" v-show="num">{{num}}</span>
										<span class="icon-add_circle icon-add" v-on:click="add"></span>
									</div>
								</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<cart v-bind:num="num" v-bind:seller="seller"></cart>
	</div>
</template>

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
	.me-content{
		display: table-cell;
		vertical-align: middle;
		border-bottom-style:solid;
		border-bottom-width: 1px;
		border-bottom-color: rgba(7,17,27,0.1);	
		line-height: 14px;
		font-size: 12px;
		font-weight: 200;
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
		margin-bottom: -1px;
		border-style: solid;
		border-bottom-width: 1px;
		border-color: rgba(7,17,27,0.1);
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
	}
	.food-old{
		font-size: 12px;
		color: rgb(147,153,159);
		font-weight: 700;
		line-height: 24px;
		text-decoration: line-through;
	}
	.icon-remove{
		position: absolute;
		right: 64px;
		font-size: 22px;
		line-height: 24px;
		color: rgb(0,160,220);
	}
	.num{
		text-align: center;
		width: 28px;
		position: absolute;
		right: 38px;
		font-size: 12px;
		line-height: 24px;
		color: rgb(147,153,159);
	}
	.icon-add{
		position: absolute;
		right: 18px;
		font-size: 22px;
		line-height: 24px;
		color: rgb(0,160,220);
	}
</style>

<script>
    import bscroll from 'better-scroll'
    import cart from '@/components/shoppingcart'
	export default{
		props: {
			seller: {
				type: Object
			},
		},
		data(){
			return{
				goods: {},
				num: 0
			}
		},
		components: {
			cart
		},
		created(){
			this.$http.get('/api/goods').then(response => {
        		response = response.body
        		if(response.errno === 0){
          			this.goods = response;
          			//console.log(this.goods);
          			this.$nextTick(() => {
          					this.scroll();
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
					click: true
				});
			},
			add(){
				this.num++;
			},
			del(){
				if(this.num > 0){
					this.num--;
				}
			}
		}
	}
</script>

