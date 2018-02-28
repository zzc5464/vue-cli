import NProgress from 'nprogress';
import 'nprogress/nprogress.css'// progress 文件和样式都要引进来  然后通过Nprogress.start() / done() 来显示
import { getToken } from '@/untils/token';
import router from './router';  // 注意，引入的不是vue-router。而是./router/index.js
// 所有关于登录的校验，判断都在这里
router.beforeEach((to, from, next) => {
    /* 
        to 是即将跳转过去的路由信息对象  一般用 to.path进行跳转
        from  是本来所在的路由信息对象
        next()  必须调用的一个方法，否则这个守卫不会终止
    */
    NProgress.start();
    // 判断to.path的路径，如果是/跳转到login
    if(to.path == '/') {
        next({path:'/login'})
    }
    if(getToken()) {
        // 有权限的情况，往下面操作
        if (to.path == '/login') {
            next({ path: '/home/index' })
        }
    }
    else {
        // 无权限 切 不是在登录页的情况下跳转到login
        if(to.path !='/login') {
            next({ path : '/login'})
        }
    }
    
    
    setTimeout(() => {
        NProgress.done();
        next();
    }, 1000);
})

/* 
    路由走完了之后进度条关闭
*/
router.afterEach(() => {
    NProgress.done() // finish progress bar
})