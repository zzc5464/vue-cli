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
        <mt-button slot="left"  v-show='isShow' @click="pageBack"  icon="back">返回</mt-button>
    </mt-header>
    <router-view></router-view>
  </div>
</template>
```



