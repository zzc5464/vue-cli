import Vue from 'vue';
import Router from 'vue-router'
Vue.use(Router);

// 导入组件
import Index from '@/components/index/index';
import Home from '@/components/index/home';
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/login'




// 配置路由表
export const commonRouter = [
  // 登录
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  // 首页
  {
    path: '/',
    name: 'index',
    component: Index
  },
  // 页面开始的导航
  {
    path: '/home',
    name: 'home',
    component: Index,
    children : [{
      path : 'index',
      name:'首页',
      component : Home
    }
    ]
  }
]

export default new Router({
    routes: commonRouter
});
