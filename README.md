# vue-app

a project for learning vue-cli

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

---
## 项目总结
总结项目遇到的难点 踩过的坑
### 1. 购物车小球的实现

> 采用了vue提供的js钩子实现   https://cn.vuejs.org/v2/guide/transitions.html#JavaScript-钩子

#### HTML, CSS部分

```
<div v-for="(ball, index) in balls" v-bind:key="index">
    <transition v-on:before-enter="beforeDrop" v-on:enter="dropping" v-on:after-enter="afterDrop">
    	<div class="ball" v-show="ball.show">
            <div class="inner inner-hook"></div>
    	</div>
    </transition>
</div>

<style>
    .ball{
    	position: fixed;
    	left: 32px;
    	bottom: 22px;
    	z-index: 200;
    	transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
    }
    .inner{
    	width: 16px;
    	height: 16px;
    	border-radius: 50%;
    	background: rgb(0, 160, 220);
    	transition: all 0.4s linear;
    }
</style>
```
> ball类作为外层控制小球的竖向位移    
inner类作为内层控制小球的横向位移

#### js钩子部分

>1. 通过各组件点击事件向shoppingcart组件emit传递被点击的dom元素并触发shoppingcart组件内drop函数  
  
>2. drop函数  
   drop 函数接收传递的dom元素  
   遍历小球数组 改变 show 属性 触发动画效果  
    dom 对象 用于声明ball的el属性供js钩子使用    
   【声明小球数组5个show为false的小球的目的是为了在动画时间内产生的多次点击事件仍有小球动画】  
   dropBalls储存已经开始动画的小球
   
>3. 执行 v-on:before-enter="beforeDrop"  过度前钩子函数  
   获取增加按钮的相对窗口位置 并计算出其与小球末位置的x,y差值
   将小球 transform ：translate（x,y,0）到动画初始位置 即增加按钮的相对窗口位置
   
>4. 执行 v-on:enter="dropping"  过度中钩子函数  
    手动触发浏览器重绘，将 ball 通过 transform ：translate（0，0，0） 移动到目标位置
    
>5. 执行 v-on:after-enter="afterDrop"  过度结束钩子函数  
从存储下落小球的数组里 shift 当前小球  
并将当前小球 display:none; show:false

### 2. 星级评价组件 
#### 组件接受一个 score值(num) 和一个 type值(num)  
  
>1. type + 字符串拼接成新字符串  新字符串名称对应不同的class类
>2. 根据取得的score值取整，取小数处理，再分别根据整数小数push新字符串到数组
>3. 遍历该数组 并把数组内相应的值 v-bind:class 绑定css

### 3. 选择评价组件
#### 组件根据选择按钮 分别显示所有评价内容, 好评, 差评 和有内容评价
>1. 好评 差评 所有评价   
>使用 js 原生方法Array.prototype.filter()获取差评 好评 所有评价 并赋值给新数组 在dom上遍历新数组   
>点击按钮即重赋值给数组 dom重新渲染

>2. 有内容的评价   
>v-show 点击事件存在 且 评论text不存在 返回false不显示  否则返回true

### 4.菜单栏和foodList列表滚动互动 
>1. 计算食物栏每部分高度累加后push到数组
>2. 点击菜单栏 食物栏进行滚动   
函数接收v-for后的index                Array[index]对应食物栏每部分高度
滚动函数滚动到相应高度
>3. scrollY变量为当前高度【随屏幕实时变化】
遍历该数组 与scrollY对比 在相应区间内 返回相应的index
>4. 食物栏当前位置对应相应菜单栏高亮    
    菜单栏v-bind高亮class类 条件为当前index【步骤2 index】和遍历index【步骤3 index】相等

### 5. 购物车食物增加减少
> 声明 cartList数组 在组件中传递 为深拷贝 组件的cartList改动 会导致其他组件cartList数组改动 利用此特性可以同步购物车食物数量
>>注意: json数组和对象的区别

### 6. better-scroll注意点
> http://www.imooc.com/article/18232   
https://ustbhuangyi.github.io/better-scroll/doc/zh-hans/#better-scroll
>>注意: 横列图片要计算出横列总长度 