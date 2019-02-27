// import Vue from 'vue'
// import Router from 'vue-router'
// import Home from '../components/Home'
// import Detail from '../components/Detail'
// import List from '../components/List'
// import Add from '../components/Add'
// import Collect from '../components/Collect'
//
//
//
// Vue.use(Router);
//
// export default new Router({
//   routes: [
//     {path: '/', redirect: '/home'},
//     {path: '/home', component: Home, meta: {keepAlive: true}}, //this.$route.meta.keepAlive  路由源信息，true就缓存
//     {path: '/detail/:bid', component: Detail, name: 'detail'},
//     {path: '/list', component: List},
//     {path: '/add', component: Add},
//     {path: '/collect', component: Collect},
//     {path: '*', redirect: '/home'}
//   ]
// })


import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);
/**
 * 动态加载路由
 */
export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: ()=>import('../components/Home'),
      meta: {keepAlive: true}
      }, //this.$route.meta.keepAlive  路由源信息，true就缓存
    {
      path: '/detail/:bid',
      component: ()=> import('../components/Detail'),
      name: 'detail'
    },
    {
      path: '/list',
      component: ()=> import('../components/List'),
    },
    {
      path: '/add',
      component: ()=> import('../components/Add'),
    },
    {
      path: '/collect',
      component: ()=>import('../components/Collect'),
    },
    {
      path: '*',
      redirect: '/home'
    }
  ]
})
