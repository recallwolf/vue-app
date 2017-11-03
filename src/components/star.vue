<template>
	<div>
		<div v-for="classitem in classitems" v-bind:class="[classitem,starType]"></div>
	</div>
</template>

<script>
	export default{
		props: {
			size: {
				type: Number
			},
			score: {
				type: Number
			}
		},
		data(){
			return {
				starType: 'star-' + this.size,
				result: []
			}
		},
		computed: {
			classitems(){
				const Length = 5;
				const on = 'star-' + this.size + '-on';
				const half = 'star-' + this.size + '-half';
				const off = 'star-' + this.size + '-off';
				let score = Math.floor(this.score * 2) / 2;
				let isInt = score%1 == 0;
				let int = Math.floor(score);
				let result = this.result;
				for(let i = 0; i < int; i++){
					result.push(on);
				}
				if(!isInt){
					result.push(half);
				}
				if(result.length < Length){
					let length = Length - result.length;
					for(let i = 0; i < length; i++){
						result.push(off);
					}
				}
				return result;
			}
		}
	}
</script>

<style scoped>
	.star-24{
		width: 10px;
        height: 10px;
        margin-right: 3px;
		background-size: 100% 100%;
		display: inline-block; 
	}
	.star-24:last-child{
		margin-right: 0;
	}
	.star-24-on{
		background-image: url(./../assets/star24_on@3x.png);
	}
	.star-24-half{
		background-image: url(./../assets/star24_half@3x.png);
	}
	.star-24-off{
		background-image: url(./../assets/star24_off@3x.png);
	}

	.star-36{
		width: 15px;
        height: 15px;
        margin-right: 6px;
        background-size: 100% 100%;
        display: inline-block; 
	}
	.star-36:last-child{
		margin-right: 0;
	}
	.star-36-on{
		background-image: url(./../assets/star36_on@3x.png);
	}
	.star-36-half{
		background-image: url(./../assets/star36_half@3x.png);
	}
	.star-36-off{
		background-image: url(./../assets/star36_off@3x.png);
	}

	.star-48{
		width: 20px;
        height: 20px;
        margin-right: 22px;
        background-size: 100% 100%;
        display: inline-block; 
	}
	.star-48:last-child{
		margin-right: 0;
	}
	.star-48-on{
		background-image: url(./../assets/star48_on@3x.png);
	}
	.star-48-half{
		background-image: url(./../assets/star48_half@3x.png);
	}
	.star-48-off{
		background-image: url(./../assets/star48_off@3x.png);
	}
</style>