import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'
import goods from './../components/goods'
import comments from './../components/comments'
import seller from './../components/seller'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  routes: [
    /*{
      path: '/',
      name: 'Hello',
      component: HelloWorld
    }*/
    {
      path: '/',
      redirect: '/goods',
    },
    {
    	path: '/goods',
    	name: 'goods',
    	component: goods
    },
    {
      path: '/comments',
      name: 'comments',
      component: comments
    },
    {
      path: '/seller',
      name: 'seller',
      component: seller
    }
  ]
})
