<template>
	<div class="comments">
		<div class="score">
			<div class="score-main">
				<div class="textfirst">{{seller.data.score}}</div>
				<div class="textsecond">综合评分</div>
				<div class="textthird">高于周边商家{{seller.data.rankRate}}%</div>
			</div>
			<div class="score-content">
				<div class="scorecontent-text">
					服务态度 
					<span><star class="service" v-bind:size="24" v-bind:score="seller.data.serviceScore"></star></span>
				</div>
				<div class="scorecontent-text">
					商品评分
					<star class="food" v-bind:size="24" v-bind:score="seller.data.foodScore"></star>
				</div>
				<div class="deliveryTime">
					送达时间
					<span class="time">{{seller.data.deliveryTime}}分钟</span>
				</div>
			</div>
		</div>
		<div class="line"></div>
		<div class="score-detail">
			<div class="blockpos">
				<div class="block">
					<div class="blocktext">全部</div>
				</div>
				<div class="block-inline-1">
					<div class="blocktext">满意</div>
				</div>
				<div class="block-inline-2">
					<div class="blocktext">不满意</div>
				</div>
			</div>
			<div class="only">
				<span class="icon-check_circle check"></span>
				只看有内容的评价
			</div>
		</div>
	</div>
</template>

<script>
	import star from '@/components/star'
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
			star
		},
		created(){
			this.$http.get('/api/comments').then((response) => {
				response = response.body;
				if(response.errno === 0){
         			this.comments = response;
        		}
			});
		}
	}
</script>

<style scoped>
	.comments{
		width: 100%;
		height: 100%;
	}
	.score{
		display: flex;
		width: 100%;
		height: 100px;
		padding-top: 18px;
		padding-bottom: 18px;
		background-color: #fff;
		border-bottom: 2px solid rgba(7,17,27,0.1);
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
		background-color: rgba(7,17,27,0.1);
	}
	.score-detail{
		height: 100%;
		border-top: 2px solid rgba(7,17,27,0.1);
		background-color: #fff;
	}
	.blockpos{
		position: relative;
		padding-left: 18px;
		padding-right: 18px;
		height: 68px;
		text-align: left;
		border-bottom: 1px solid rgba(7,17,27,0.1);
	}
	.block{
		position: relative;
		top: 18px;
		right: 8px;
		width: 50px;
		height: 32px;
		color: rgb(255,255,255);
		background-color: rgb(0,160,220);
		border-radius: 2px;
		display: inline-block;
	}
	.blocktext{
		font-size: 14px;
		font-weight: 600;
		line-height: 32px;
		text-align: center;
	}
	.block-inline-1{
		position: relative;
		right: 8px;
		top: 18px;
		width: 50px;
		height: 32px;
		color: rgb(77,85,93);
		background-color: rgba(0,160,220,0.4);
		border-radius: 2px;
		display: inline-block;
	}
	.block-inline-2{
		position: relative;
		right: 8px;
		top: 18px;
		width: 65px;
		height: 32px;
		background-color: rgba(77,85,93,0.2);
		border-radius: 2px;
		display: inline-block;
	}
	.only{
		padding: 12px 10px;
		border-bottom: 1px solid rgba(7,17,27,0.1);
		line-height: 24px;
		font-size: 14px;
		text-align: left;
		color: rgb(147,153,159);
	}
	.check{
		vertical-align: middle;
		font-size: 24px;
		line-height: 24px;
		color: rgb(147,153,159);
	}
</style>