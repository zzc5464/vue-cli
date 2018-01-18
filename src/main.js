// @是webpack配置的路径
// 所有需要引入的js文件或者样式都放这个文件中
import Vue from 'vue'
import App from './App'
import router from './router'
import Mint from 'mint-ui';
Vue.use(Mint);
import 'mint-ui/lib/style.css'
import 'font-awesome/css/font-awesome.css';
import 'normalize.css';
import '@/static/css/base.css';
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
