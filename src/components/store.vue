<template>
	<div class="seller" ref="seller">
		<div>
			<div class="seller-main">
				<div class="seller-main-text">{{seller.data.name}}</div>
				<div class="seller-star" >
					<star v-bind:size="36" v-bind:score="seller.data.score"></star>
					<div class="ratingCount">({{seller.data.ratingCount}})</div>
					<div class="sellCount">月售{{seller.data.sellCount}}份</div>
				</div>
				<div class="average">
					<div class="left">
						<div class="average-title">起送价</div>
						<div class="average-price">
							{{seller.data.minPrice}}
							<span class="average-end">元</span>
						</div>
					</div>
					<div class="center">
						<div class="average-title">商家配送</div>
						<div class="average-price">
							{{seller.data.deliveryPrice}}
							<span class="average-end">元</span>
						</div>
					</div>
					<div class="right">
						<div class="average-title">平均配送时间</div>
						<div class="average-price">
							{{seller.data.deliveryTime}}
							<span class="average-end">分钟</span>
						</div>
					</div>
				</div>
			</div>
			<div class="line"></div>
			<div class="seller-content">
				<div class="title">公告与活动</div>
				<div class="text">{{seller.data.bulletin}}</div>
				<div class="text-nav" v-for="detailItem in seller.data.supports">
					<div class="text-main">{{detailItem.description}}</div>
				</div>
			</div>
			<div class="line"></div>
			<div class="sign">
				<div class="title-2">商家实景</div>
				<div class="pic" ref="pic">
					<ul class="picList" ref="picList">
            			<li class="picDetail" v-for="pic in seller.data.pics">
              				<img v-bind:src="pic" width="120" height="90">
            			</li>
          			</ul>
				</div>
			</div>
			<div class="line"></div>
			<div class="info">
				<div class="title-2">商家信息</div>
				<div class="info-text" v-for="info in seller.data.infos">
					<div class="info-main">{{info}}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import bscroll from 'better-scroll'
	import star from '@/components/star'
	export default{
		props: {
			seller: {
				type: Object
			}
		},
		components: {
			star
		},
		created(){
			this.$nextTick(() => {
				this.storeScroll = new bscroll(this.$refs.seller, {
					click: true
				});

				let picWidth = 120;
          		let margin = 6;
          		let width = (picWidth + margin) * this.seller.data.pics.length - margin;
          		this.$refs.picList.style.width = width + 'px';
              	this.picScroll = new bscroll(this.$refs.pic, {
                	scrollX: true,
                	eventPassthrough: 'vertical'
              	});
			});
		}
	}
</script>

<style scoped>
	.seller{
		width: 100%;
		position: absolute;
   	 	top: 176px;
    	bottom: 0;
    	overflow: hidden;
	}
	.seller-main{
		text-align: left;
		padding-top: 18px;
		padding-left: 18px;
		padding-right: 18px;
		border-bottom: 1px solid rgba(7,17,27,0.1);
		background-color: #fff;
	}
	.seller-main-text{
		font-size: 14px;
		color: rgb(7,17,27);
		line-height: 14px;
	}
	.seller-star{
		display: flex;
		padding-top: 8px;
		padding-bottom: 18px;
		border-bottom: 1px solid rgba(7,17,27,0.1);
	}
	.ratingCount{
		font-size: 12px;
		padding-top: 2px;
		padding-left: 8px;
		color: rgb(77,85,93);
		font-weight: normal;
	}
	.sellCount{
		font-size: 12px;
		padding-top: 2px;
		padding-left: 12px;
		color: rgb(77,85,93);
		font-weight: normal;
	}
	.average{
		text-align: center;
		padding-top: 18px;
		padding-bottom: 18px;
		display: flex;
	}
	.left{
		flex: 1;
	}
	.center{
		flex: 1;
		border-left: 1px solid rgba(7,17,27,0.1);
		border-right: 1px solid rgba(7,17,27,0.1);
	}
	.right{
		flex: 1;
	}
	.average-title{
		font-size: 12px;
		color: rgb(147,153,159);
		line-height: 12px;
	}
	.average-price{
		padding-top: 4px;
		font-size: 24px;
		color: rgb(7,17,27);
	}
	.average-end{
		font-size: 12px;
	}
	.line{
		height: 18px;
		background-color: #f3f5f7;
	}
	.seller-content{
		padding-left: 18px;
		padding-right: 18px;
		padding-top: 18px;
		text-align: left;
		border-bottom: 1px solid rgba(7,17,27,0.1);
	}
	.title{
		font-size: 14px;
		line-height: 14px;
		color: rgb(7,17,27);
		padding-bottom: 8px;
	}
	.text{
		padding-left: 12px;
		padding-right: 12px;
		padding-bottom: 16px;
		font-size: 12px;
		font-weight: normal;
		line-height: 24px;
		color: rgb(240,20,20);
	}
	.text-nav{
		border-top: 1px solid rgba(7,17,27,0.1);
	}
	.text-main{
		padding: 16px 12px;
		font-size: 12px;
		font-weight: normal;
		color: rgb(7,17,27);
		line-height: 16px;
	}
	.title-2{
		font-size: 14px;
		line-height: 14px;
		color: rgb(7,17,27);
		padding-bottom: 12px;
	}
	.sign{
		text-align: left;
		border-top: 1px solid rgba(7,17,27,0.1);
		border-bottom: 1px solid rgba(7,17,27,0.1);
		padding-top: 18px;
		padding-left: 18px;
		padding-right: 18px;
	}
	.pic{
		width: 100%;
		padding-top: 12px;
		padding-bottom: 18px;
		overflow: hidden;
		white-space: nowrap;
	}
	.picList{
		font-size: 0;
	}
	.picDetail{
		display: inline-block;
        margin-right: 6px;
        width: 120px;
        height: 90px;
	}
	.info{
		text-align: left;
		border-top: 1px solid rgba(7,17,27,0.1);
		padding-top: 18px;
		padding-left: 18px;
		padding-right: 18px;
	}
	.info-text{
		border-top: 1px solid rgba(7,17,27,0.1);
	}
	.info-main{
		padding: 16px 12px;
		font-size: 12px;
		font-weight: normal;
		color: rgb(7,17,27);
		line-height: 16px;
	}
</style>