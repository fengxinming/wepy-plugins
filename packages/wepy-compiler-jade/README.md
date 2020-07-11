# wepy jade/pug 编译插件

[![npm package](https://nodei.co/npm/wepy-compiler-jade.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/wepy-compiler-jade)

> Note: 修复`wepy-compiler-pug`不支持全局对象传入，代码无法合并到源代码库，因此自己提供一个pug/jade模板解析插件`wepy-compiler-jade`。

---

<p align="center">
  <a href="https://tencent.github.io/wepy/">
    <img alt="WePY" src="http://sem.g3img.com/g3img/zhongshihudong/c2_20170623114249_41503.png" width="210"/>
  </a>
</p>

## Table of contents

  - [Features](#features)
  - [Installation](#installation)
  - [Usage](#usage)

<br/>

## Features

### Supported template engines

  - [jade](https://github.com/visionmedia/jade) [(website)](http://jade-lang.com/)
  - [pug (formerly jade)](https://github.com/pugjs/pug) [(website)](https://pugjs.org)

__NOTE__: you must still install the engines you wish to use, add them to your package.json dependencies.

## installation

```
cnpm install wepy-compiler-jade --save-dev
```


## Usage

```
// configure wepy.config.js

module.exports = {
  compilers: {
    jade: {
      engine: 'pug',             // 默认为jade。如果需要使用 pug 模板，就在此处设置
      // enforcePretty: true,       // 默认为false，即：让模板引擎自动美化。该参数用于模板引擎美化失效时强行美化。
      globalConfig: {            // 这个属性名字可以随便定义，只要在模板中使用相同的名字即可
        imgUrlPrefix: ''
      }
    }
  }
};

// write vue/wpy template

<template lang="jade">
  view
    image(src=`${globalConfig.imgUrlPrefix}/images/xxx.svg`)
</template>    

```
