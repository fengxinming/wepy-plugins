<p align="center">
  <a href="http://stylus-lang.com/">
    <img alt="Stylus" src="http://stylus-lang.com/img/stylus-logo.svg" width="393"/>
  </a>
</p>

# wepy stylus 编译器
> Note: wepy官方提供的插件`wepy-compiler-stylus`对stylus的封装不太友好，不方便开发者配置一些高级特性，因此重新封装了一个stylus的编译插件`wepy-compiler-styl`

---

## Table of contents

  - [Features](#features)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Examples](#examples)

<br/>

## Features

### Support a few advanced features
  * define
  * rawDefine
  * include
  * import
  * use
  * url

## installation

```
cnpm install wepy-compiler-styl --save-dev
```


## Usage

```
// configure wepy.config.js

module.exports = {
  compilers: {
    styl: {
      compress: true
    }
  }
};
```

## Examples

```
// configure wepy.config.js

module.exports = {
  compilers: {
    styl: {
      compress: true,                                 // 压缩
      includeCSS: true,                               // 支持导入css
      supportObject: true,                            // 支持以下参数
      define: {                                       // 控制不同环境的样式处理
        isProd: process.env.NODE_ENV === 'production'
      },
      include: [],                                    // 等价于 paths: [__dirname, __dirname + '/utils']，将目录暴露给全局
      import: [                                       // 导入自定义的functions和mixins等
        path.join('src', 'css', 'utils', '**/*.styl')
      ],
      use: [],                                        // 导入插件nib、poststylus等
      url: 'inline-url',                              // 使用base64将图片转码
      url: {
        name: 'inline-url',
        limit: 30000,                                 // 限制多少B以内的图片被压缩
        paths: []                                     // 从指定的目录下查找图片
      }
    }
  }
};
```
