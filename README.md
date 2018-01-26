[TOC]

# 后台管理系统（移动）
## 一、搭建基本结构

```
demo1
	build  
	config	// 上面俩都是vue-cli生成的webpack配置，基本你就别管了
	dist	// 通过 npm run build 打包出来的完整项目。
	node_modules // 所有的包都下在这里，git不提交
	src	// 所有要写的代码都在这里
	  - assets // vue本身是想所有静态资源都放这里，但我放到了./static里面，所以可以删掉
	  - components // 所有的组件都在这里
	  - router // 路由表
	  - static // 本项目中所有的静态资源 css、图片等
	  - untils // 所有常用的小方法
	  - App.vue // 项目的入口文件，基本不动
	  - main.js // 引入vue的一些插件和全局/初始化样式
	  - permission.js // 验证权限的功能都在这里
	static	//	所有静态资源文件
    	- .gitkeep //git不允许提交空的目录，写这个文件就是为了占位置。
	.babelrc	// 转es6的配置文件
	.editorconfig	// 写代码统一的格式配置
	.gitignore	// git提交遗忘的文件配置
	.postcssrc.js	// 设置css不同浏览器兼容补全的配置文件
	index.html	// 不用理他
	package.json	// 本项目所有的配置项，以及包管理
	README.md	// 就是你看的这个
	
```

- `.editorconfig` 文件看这个[介绍](https://www.jianshu.com/p/712cea0ef70e)
- `postcssrc.js`  详见 [配置项](https://github.com/ai/browserslist)

### 1.引入项目基本样式和插件

- 基于`mint-ui` ，搭建的移动端项目，还有一些常用的样式。
- `@` 代表`./src`路径，是通过webpack配置的

```js
import Mint from 'mint-ui';
Vue.use(Mint); 
import 'mint-ui/lib/style.css'  // 使用mint-ui必须写的引入三连
import 'font-awesome/css/font-awesome.css'; // fa字体库
import 'normalize.css';	// 初始化样式
import '@/static/css/base.css'; // 本项目的所有基本样式
```

### 2.在`./router/index.js`中配置路由表

- 引入`vue-router` 这个vue-cli已经配置好了
- 导入需要的组件
- 配置一个路由表
- 将路由表挂载到Router实例

```js
// 导入组件
import Index from '@/components/index/index';
// 配置路由表
export const commonRouter = [
  // 首页
  {
    path: '/',
    name: 'index',
    component: Index
  }
]
// 挂载到Router实例
export default new Router({
    routes: commonRouter
});
```

- 写在 `commonRouter` 中的路由就是不用权限大家都能看的路由组件。
- 之后有判断权限的功能，可以搭配动态路由动态生成出路由表。

### 3.在`@/components`文件中写我们的组件

- 因为头部是不变的，在所有路由中都存在，那么这个组件就是我们的入口组件了
- 用mint-ui的组件做出头部

```html
<template>
  <div class="hello">
    <mt-header fixed title="我是头部">
        <mt-button slot="left" @click="pageBack"  icon="back">返回</mt-button>
    </mt-header>
    <router-view></router-view>
  </div>
</template>
// fixed 表示固定在顶部  title是header的文字
// button组件 slot表示插入到header组件中的哪个插槽  icon表示用哪个图标
// 在头部下面展示路由
```

- 这个头部有三个最主要的功能
  - 返回按钮
  - 依据当前路由，如果是首页则不显示返回按钮
  - 根据不同的路由名称title展示的名字也不一样

#### 返回上一级功能实现

- 核心: `this.$router.go(-1)`

```js
// 给mt-button 组件绑定点击事件
// <mt-button slot="left" @click="pageBack"  icon="back">返回</mt-button>

// 在methods中让路由跳转回上一页。  官方名称：编程式导航。
  methods: {
    pageBack() {
      this.$router.go(-1);
    }
  }
```

#### 根据路由切换显示返回按钮

- 核心 ： `v-show`  && `this.$route.path`

```js
// 给mt-button绑定v-show
// <mt-button slot="left"  v-show='closeBack' @click="pageBack"  icon="back">返回</mt-button>
// 在计算属性中判断当前路由
  computed: {
    closeBack() {
      let hide = this.$route.path;
      if (hide == "/home/index") { // 如果是主页则隐藏返回按钮
        return false;
      } else {
        return true;
      }
    }
  }
```

#### 根据路由的名字展示不同的title

- 核心 : `this.$route.name`
  - 首先你要在路由表配置的时候给name值
  - 给标签的title动态绑定title

```js
  // 登录
  {
    path: '/login',
    name: 'login',  // 一定要给个name哦
    component: Login
  }
```

- `:` 动态绑定

```html
<mt-header fixed :title="title">给个: 动态绑定title这个变量</mt-header> 
```

- 绑定`this.$route.name`

```js
  data() {
    return {
      msg: "Welcome to my world",
      title : this.$route.name // header会根据title的值动态改变显示的文字
    };
  }
```

###4.创建login组件

- 通过mint-ui的form组件搭建
  - `label` 输入框左侧的文字
  - `:state=''`  校验状态，成功失败和警告，可以通过动态绑定
  - `v-model` vue提供的双向绑定表单值 `.trim` 是去掉空格

```html
<mt-field label="邮箱" :state='vlidataUser' placeholder="请输入邮箱" type="email" v-model.trim="email"></mt-field>
```

- login页主要的功能
  1. 跳转到主页
  2. 判断是否有登录过的token
  3. 校验表单

#### 跳转到首页

- 核心方法
  - `this.$router.push()`

```html
<mt-button @click='btn_login' type="primary" size="large">确认登录</mt-button>
给登录按钮绑定@click事件
```

```js
	btn_login(){
          this.$router.push({ path: '/home/index' })
      }
// 跳转到你需要的主页
```

#### 校验表单

- 核心方法
  - mint-ui提供的`:state`，他有三个值 `error, success, warning`

```js
  data(){
      return {
          email:'', // 通过v-model绑定输入表单的值
          password : '',
          vlidataUser:'', // 绑定输入表单的值
          vlidataPwd:'',
      }
  },
  methods : {
      btn_login(){
        // 各种表单验证都可以通过这个流程来判断成功或者失败
          if(this.email == '') {
              this.vlidataUser = 'error';
              return false;
          }
          if(this.password == '') {
              this.vlidataPwd = 'error';
              return false;
          }
          this.vlidataUser = 'success';
          this.vlidataPwd = 'success';
          this.$router.push({ path: '/home/index' })
      }
  }
```

#### 登录成功后设置的token

>设置token这类的方法，可以放到@/untils中，作为一个公共方法存在。
>
>在token.js中导出设置、获取、删除三种方法
>
>其他页面引入时，只需要:
>
>`import { getToken } from '@/untils/token';` 按需引入即可

```js
// @/untils/token.js
//  模拟token
const token = 'adminKey'; // 权限
export function setToken(name){
  // 这边都是模拟的，实际情况应该更复杂
  
    return localStorage.setItem(token,name);
}

export function getToken(){
    return localStorage.getItem(token);
}

export function removeToken(){
    return localStorage.setItem(token,'');
}
```

> 设置token在实际开发中应该是点击登录成功后，通过后端返回的一个token值，将它设置到`localstorage`里面。

#### token判断，如果有token直接跳转到主页

