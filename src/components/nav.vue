<template>
	<div class="nav">
		<div class="item"><router-link to='/goods'>商品</router-link></div>
		<div class="item"><router-link to='/comments'>评论</router-link></div>
		<div class="item"><router-link to='/store'>商家</router-link></div>
	</div>
</template>

<style scoped>
	.nav{
		display: flex;
		width: 100%;
		height: 40px;
		line-height: 40px;
		border-top: 1px solid rgba(7,17,27,0.1);
		border-bottom: 1px solid rgba(7,17,27,0.1);
	}
	.item{
		flex: 1;
		text-align: center;
	}
	a{
		text-decoration: none;
		display: block;
		font-size: 14px;
		color: rgb(77,85,93);
	}
	.active{
    	color: rgb(240,20,20);
  	}
</style>

