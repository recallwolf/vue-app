<template>
	<div class="comments" ref="comments">
		<div>
			<div class="score">
				<div class="score-main">
					<div class="textfirst">{{seller.data.score}}</div>
					<div class="textsecond">综合评分</div>
					<div class="textthird">高于周边商家{{seller.data.rankRate}}%</div>
				</div>
				<div class="score-content">
					<div class="scorecontent-text">
						服务态度 
						<star class="service" v-bind:size="24" v-bind:score="seller.data.serviceScore"></star>
						<div class="orangeScore">{{seller.data.serviceScore}}</div>
					</div>
					<div class="scorecontent-text">
						商品评分
						<star class="food" v-bind:size="24" v-bind:score="seller.data.foodScore"></star>
						<div class="orangeScore">{{seller.data.foodScore}}</div>
					</div>
					<div class="deliveryTime">
						送达时间
						<span class="time">{{seller.data.deliveryTime}}分钟</span>
					</div>
				</div>
			</div>
			<div class="line"></div>
			<rating class="rating" v-if="comments.data" v-bind:ratings="comments.data" v-on:refresh="refresh"></rating>
		</div>
	</div>
</template>

<script>
	import bscroll from 'better-scroll'
	import star from '@/components/star'
	import rating from '@/components/rating'
	export default{
		props: {
			seller: {
				type: Object
			}
		},
		data(){
			return {
				comments: {}
			}
		},
		components: {
			star,
			rating
		},
		created(){
			this.$http.get('/api/comments').then((response) => {
				response = response.body;
				if(response.errno === 0){
					this.comments = response;
					this.$nextTick(() => {
						this.commentsScroll = new bscroll(this.$refs.comments, {
							click: true
						});
					});
				}
			});
		},
		methods: {
			refresh(){
				this.$nextTick(() => {
					this.commentsScroll.refresh();
				});
			}
		}
	}
</script>

<style scoped>
	.comments{
		width: 100%;
		position: absolute;
   	 	top: 176px;
    	bottom: 0;
    	overflow: hidden;
	}
	.score{
		display: flex;
		width: 100%;
		height: 100px;
		padding-top: 18px;
		padding-bottom: 18px;
		background-color: #fff;
		border-bottom: 1px solid rgba(7,17,27,0.1);
	}
	.score-main{
		flex: 0 0 138px;
		border-right: 1px solid rgba(7,17,27,0.1);
	}
	.textfirst{
		font-size: 24px;
		color: rgb(255,153,0);
		line-height: 28px;
		padding-top: 12px;
		padding-bottom: 6px;
	}
	.textsecond{
		font-size: 14px;
		line-height: 14px;
		padding-bottom: 10px;
	}
	.textthird{
		font-size: 10px;
		color: rgb(147,153,159);
		line-height: 10px;
		padding-bottom: 6px;
	}
	.score-content{
		flex: 1;
		padding-left: 24px;
		padding-top: 12px;
	}
	.scorecontent-text{
		display: flex;
		text-align: left;
		padding-bottom: 8px;
		font-size: 12px;
		line-height: 18px;
		color: rgb(7,17,27);
	}
	.service{
		padding-left: 8px;
	}
	.food{
		padding-left: 8px;
	}
	.orangeScore{
		padding-left: 12px;
		font-size: 12px;
		line-height: 18px;
		color: rgb(255,153,0);
	}
	.deliveryTime{
		text-align: left;
		font-size: 12px;
		line-height: 18px;
		color: rgb(7,17,27);
	}
	.time{
		padding-left: 6px;
		font-size: 12px;
		color: rgb(147,153,159);
		line-height: 18px;
	}
	.line{
		height: 18px;
		background-color: #f3f5f7;
	}
	.rating{
		padding-top: 18px;
		text-align: left;
	}
</style>