<template>
	<div class="header">
		<div class="title">
			<div class="avatar">
				<img width="64" height="64" style="border-radius: 4px"v-bind:src='seller.data.avatar'>
			</div>
			<div class="content">
				<div class="first">{{seller.data.name}}</div>
				<div class="second">{{seller.data.description}}/{{seller.data.deliveryTime}}分钟送达</div>
				<div class="third">{{seller.data.supports[0].description}}</div>
			</div>
		</div>
		<div class="sub-title">

		</div>
	</div>
</template>

<style scoped>
	.header{
		display: flex;
		width: 100%;
		color: #fff;
		background-color: rgba(7,17,27,0.5);
	}
	.title{
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
	.sub-title{
	
	}
</style>

<script>
	export default {
		props:['seller']
	}
</script>