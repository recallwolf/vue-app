<template>
	<div class="header">
		<div class="title">
			<div class="avatar">
				<img width="64" height="64" style="border-radius: 4px" v-bind:src="seller.data.avatar" alt="">
			</div>
			<div class="content">
				<div class="first"><span class="brandfirst"></span>{{seller.data.name}}</div>
				<div class="second">{{seller.data.description}}/{{seller.data.deliveryTime}}分钟送达</div>
				<div class="third"><span class="brandthird"></span>{{seller.data.supports[0].description}}</div>
				<div class="support" v-if="seller.data.supports" v-on:click="display">
					<span class="count">{{seller.data.supports.length}}个</span>
					<span class="icon-keyboard_arrow_right icon-arrow"></span>
				</div>
			</div>
		</div>
		<div class="sub-title" v-on:click="display">
			<span class="broadcast">
				{{seller.data.bulletin}}
			</span>
		</div>
		<div class="background">
			<img v-bind:src="seller.data.avatar" width="100%" height="100%">
		</div>
		<div class="detail" v-if="show">
			<div class="detail-main clearfix">
				<div class="detail-content">
					<div class="name">{{seller.data.name}}</div>
					<star class="detail-star" v-bind:size="48" v-bind:score="seller.data.score"></star>
					<div class="report-x">
						<div class="line-1"></div>
						<div class="discount">优惠信息</div>
						<div class="line-1"></div>
					</div>
					<div class="detail-discount" v-for="detailItem in seller.data.supports">
						<div class="discount-item">{{detailItem.description}}</div>
					</div>
					<div class="detail-report">
						<div class="report-x">
							<div class="line-2"></div>
							<div class="detail-report-main">商家公告</div>
							<div class="line-2"></div>
						</div>
						<div class="detail-report-text">{{seller.data.bulletin}}</div>
					</div>
				</div>
			</div>
			<div class="detail-close" v-on:click="display">
				<span class="icon-close icon-x"></span>
			</div>
		</div>
	</div>
</template>

<script>
	import star from '@/components/star'
	export default {
		props: {
			seller:{
				type: Object
			}
		},
		data(){
			return {show: false}
		},
		components: {
			star
		},
		methods: {
			display(){
				this.show = !this.show;
			}
		}
	}
</script>

<style scoped>
	.header{
		display: flex;
		flex-direction: column;
		height: 134px;
		width: 100%;
		color: #fff;
		background-color: rgba(7,17,27,0.5);
	}
	.title{
		position: relative;
		flex: 1;
		text-align: left;
		padding:  24px 16px 18px 24px;
		font-size: 0;
	}
	.avatar{
		display: inline-block;
	}
	.content{
		display: inline-block;
		margin-left: 16px;
		font-size: 14px;
		vertical-align: top;
		text-align: left;
	}
	.first{
		margin: 2px 0 8px 0;
		font-size: 16px;
		color: rgb(255,255,255);
		font-weight: bold;
		line-height: 16px;
	}
	.brandfirst{
		background-image: url('./../assets/brand@2x.png');
		background-size: 100% 100%;
		display: inline-block;
		vertical-align: top;
		margin-right: 6px;
        width: 27px;
        height: 16px;
	}
	.second{
		margin-bottom: 10px; 
		font-size: 12px;
		color: rgb(255,255,255);
		font-weight: 200;
		line-height: 12px;
	}
	.third{
		font-size: 10px;
		color: rgb(255,255,255);
		font-weight: 200;
		line-height: 12px;
	}
	.brandthird{
		background-image: url('./../assets/decrease_1@3x.png');
		background-size: 100% 100%;
		display: inline-block;
		vertical-align: middle;
		margin-right: 4px;
        width: 12px;
        height: 12px;
	}
	.support{
		position: absolute;
		padding: 0 8px;
		right: 12px;
		bottom: 14px;
		height: 24px;
		line-height: 24px;
		border-radius: 14px;
		background-color: rgba(0,0,0,0.2);
		text-align: center;
	}
	.count{
		font-size: 10px;
	}
	.icon-arrow{
		font-size: 14px;
		vertical-align: middle;
	}
	.sub-title{
		flex: 1;
		padding: 0 22px 0 12px;
		height: 28px;
		background-color: rgba(7,17,27,0.2);
		line-height: 28px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.broadcast{
		font-size: 10px;
		font-weight: 200;
	}
	.background{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
		height: 134px;
		filter: blur(10px);
	}
	.detail{
		position: fixed;
		top: 0;
		left: 0;
		z-index: 100;
		height: 100%;
		width: 100%;
		background-color: rgba(7,17,27,0.8);
	}
	.clearfix{
		display: inline-block;
		text-align: center;
		padding-left: 36px;
		padding-right: 36px;
	}
	.clearfix:after{
		content: ".";
		display: block;
		height: 0;
		clear: both;
		visibility: hidden;
	}
	.detail-main{
		min-height: 100%;
	}
	.detail-content{
		margin-top: 64px;
		padding-bottom: 64px;
		text-align: center;
	}
	.name{
		font-size: 18px;
		font-weight: 700;
		line-height: 18px;
		color: rgb(255,255,255);
	}
	.detail-star{
		margin-top: 16px;
	}
	.discount{
		flex: 1;
		padding-top: 28px;
		padding-bottom: 24px;
		font-size: 16px;
		font-weight: 700;
	}
	.detail-discount{
		position: relative;
		left: 12px;
	}
	.discount-item{
		padding-bottom: 12px;
		text-align: left;
		font-size: 14px;
		font-weight: 200;
		color: rgb(255,255,255);
		line-height: 14px;
	}
	.report-x{
		display: flex;
	}
	.line-1{
		flex: 1;
		position: relative;
		top: -30px;
		border-bottom: 1px solid rgba(255, 255, 255, 0.2);
	}
	.line-2{
		flex: 1;
        position: relative;
        top: -6px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
	}
	.detail-report{
		padding-top: 14px;
	}
	.detail-report-main{
		flex: 1;
		font-size: 16px;
		font-weight: 700;
	}
	.detail-report-text{
		text-align: left;
		padding-left: 12px;
		padding-top: 24px;
		font-size: 14px;
		font-weight: 200;
		line-height: 25px;
	}
	.detail-close{
		position: relative;
		width: 32px;
		height: 32px;
		margin: -64px auto 0 auto;
		clear: both;
		font-size: 32px;
		color: white;
	}
	.icon-x{
		font-size: 32px;
		color: rgba(255,255,255,0.5);
	}
</style>