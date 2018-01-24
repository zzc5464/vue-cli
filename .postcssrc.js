// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},
    // 会默认的去读取package.json里面的 "browserslist" 配置项内容

    "autoprefixer": {}
  }
}

/* 
browserslist 配置说明如下
"browserslist": [
    "> 1%",    兼容全球使用率大于 1%的游览器
    "last 2 versions",  兼容每个游览器的最近两个版本
    "not ie <= 8" 不兼容 ie8 及以下
  ]

  一些其他的配置项
  https://github.com/ai/browserslist
*/