<template>
	<div class="seller">
		<div class="seller-main">
			<div class="seller-main-text">{{seller.data.name}}</div>
			<div class="seller-star" >
				<star v-bind:size="36" v-bind:score="seller.data.score">
			</star>
				<span>{{seller.data.sellCount}}</span>
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
		components: {
			star
		}
	}
</script>

<style scoped>
	.seller{
		width: 100%;
		height: 100%;
	}
	.seller-main{
		text-align: left;
		padding-top: 18px;
		padding-left: 18px;
	}
	.seller-main-text{
		font-size: 14px;
		color: rgb(7,17,27);
		line-height: 14px;
	}
	.seller-star{
		padding-top: 8px;
	}
</style>