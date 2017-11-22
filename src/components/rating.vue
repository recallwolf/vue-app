<template>
    <div>
        <div class="textContent">
        	<div class="totalButton">
				<span class="button"><p class="text" v-on:click="all" v-bind:class="{'textActive': state === 2}">全部</p></span>
				<span class="button"><p class="text" v-on:click="positive" v-bind:class="{'textActive': state === 0}">推荐</p></span>
				<span class="button"><p class="neg" v-on:click="negative" v-bind:class="{'negActive': state === 1}">吐槽</p></span>
			</div>
			<div class="isContent" v-on:click="check">
				<span class="icon-check_circle check" v-bind:class="{'checkActive': isCheck}"></span>
				<span class="checkText">只看有内容的评价</span>
			</div>
    	</div>
        <div class="ratingContent">
			<ul>
				<li class="list" v-for="(rating, index) in processedRating" v-show="isShow(rating.rateType, rating.text)" v-bind:key="index">
					<div class="userTitle">
						<div class="time">{{rating.rateTime | formatDate}}</div>
						<div class="userInfo">
							<div class="avatar"><img v-bind:src="rating.avatar"></div>
							<div class="username">{{rating.username}}</div>
						</div>
					</div>
					<div class="msg">
						<span v-bind:class="{'icon-thumb_up': !rating.rateType, 'good': !rating.rateType,'icon-thumb_down': rating.rateType, 'bad': rating.rateType}"></span>
						<span>{{rating.text}}</span>
					</div>
				</li>
			</ul>
        </div>
	</div>
</template>

<script>
 	import {formatDate} from './../common/js/date'
	import bscroll from 'better-scroll'
    export default {
        props: {
			ratings: {
				type: Array
			}
        },
        data(){
            return {
                state: 2,
                isCheck: true,
				processedRating: this.ratings,
            }
        },
        methods:{
            all(){
                this.state = 2;
				this.processedRating = this.ratings;
				this.$emit("refresh");
            },
            positive(){
                this.state = 0;
        		this.processedRating = this.ratings.filter((rating) => {
          			return rating.rateType === 0;
				});
				this.$emit("refresh");
			},
            negative(){
                this.state = 1;
				this.processedRating = this.ratings.filter((rating) => {
          			return rating.rateType === 1;
				});
				this.$emit("refresh");
            },
            check(){
				this.isCheck = !this.isCheck;
				this.$emit("refresh");
			},
			isShow(type, text){
				if(this.isCheck && !text){	
          			return false;
        		}
				else{
         			return true;
       			}
			}
		},
		filters: {
      		formatDate(time) {
        		let date = new Date(time);
       			return formatDate(date, 'yyyy-MM-dd hh:mm');
      		}
		}
    }
</script>

<style scoped>
    .textContent{
        padding: 0 18px;
    }
    .totalButton{
        padding-bottom: 16px;
        border-bottom: 1px solid rgba(7,17,27,0.1);
    }
    .button{
        padding-right: 8px;
        display: inline-block;
    }
    .text{
        background-color: rgba(0,160,220,0.2);
        border-radius: 2px;
        padding: 8px 12px;
        font-size: 12px;
        color: rgb(77,85,93);
    }
    .textActive{
        background-color: rgb(0,160,220);
        border-radius: 2px;
        padding: 8px 12px;
        font-size: 12px;
        color: rgb(255,255,255);
    }
    .neg{
        background-color: rgba(77,85,93,0.2);
        border-radius: 2px;
        padding: 8px 12px;
        font-size: 12px;
        color: rgb(77,85,93);
    }
    .negActive{
        background-color: rgba(77,85,93,0.8);
        border-radius: 2px;
        padding: 8px 12px;
        font-size: 12px;
        color: rgb(255,255,255);
    }
    .isContent{
        padding: 12px 0;
    }
    .check{
		vertical-align: middle;
		font-size: 24px;
		line-height: 24px;
		color: rgb(147,153,159);
	}
    .checkActive{
        vertical-align: middle;
		font-size: 24px;
		line-height: 24px;
		color: rgb(0,200,80);
    }
    .checkText{
        font-size: 12px;
        line-height: 24px;
        color: rgb(147,153,159);
    }
    .ratingContent{
        border-top: 1px solid rgba(7,17,27,0.1);
    }
	.list{
		padding: 16px 0;
		margin: 0 18px;
		border-bottom: 1px solid rgba(7,17,27,0.1);
	}
	.userTitle{
		display: flex;
	}
	.userInfo{
		flex: 1;
		text-align: right;
	}
	.avatar{
		width: 12px; 
		height: 12px;
		display: inline-block;
	}
	img{
		width: 100%;
		height: 100%;
		border-radius: 6px;
	}
	.username{
		font-size: 10px;
		line-height: 12px;
		color: rgb(147,153,159);
		display: inline-block;
	}
	.time{
		text-align: left;
		flex: 1;
		font-size: 10px;
		color: rgb(147,153,159);
		line-height: 12px;
	}
	.msg{
		padding-top: 6px;
		font-size: 12px;
		color: rgb(7,17,27);
		line-height: 16px;
	}
	.good{
		font-size: 12px;
		color: rgb(0,160,220);
		line-height: 24px;
	}
	.bad{
		font-size: 12px;
		color: rgb(147,153,159);
		line-height: 24px;
	}
</style>

