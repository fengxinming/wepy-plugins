# wepy template 编译器

[![npm package](https://nodei.co/npm/wepy-compiler-view.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/wepy-compiler-view)

> Note: 提供一个多模板解析插件`wepy-compiler-view`，唯一的遗憾，就是在编辑器中没有展示高亮语法提示。如果有使用pug/jade模版的同学，可以直接戳[`wepy-compiler-pug`](https://github.com/fengxinming/wepy-compiler-pug)插件，把wpy扩展名改成vue之后，就有高亮语法提示了。

---

<p align="center">
  <a href="https://tencent.github.io/wepy/">
    <img alt="WePY" src="https://tencent.github.io/wepy/img/wepylogo.png" width="52"/>
  </a>
</p>

## Table of contents

  - [Features](#features)
  - [Installation](#installation)
  - [Usage](#usage)

<br/>

## Features

### Supported template engines

  - [atpl](https://github.com/soywiz/atpl.js)
  - [bracket](https://github.com/danlevan/bracket-template)
  - [doT.js](https://github.com/olado/doT) [(website)](http://olado.github.io/doT/)
  - [dust (unmaintained)](https://github.com/akdubya/dustjs) [(website)](http://akdubya.github.com/dustjs/)
  - [dustjs-linkedin (maintained fork of dust)](https://github.com/linkedin/dustjs) [(website)](http://linkedin.github.io/dustjs/)
  - [eco](https://github.com/sstephenson/eco)
  - [ect](https://github.com/baryshev/ect) [(website)](http://ectjs.com/)
  - [ejs](https://github.com/mde/ejs) [(website)](http://ejs.co/)
  - [haml](https://github.com/visionmedia/haml.js)
  - [haml-coffee](https://github.com/9elements/haml-coffee)
  - [hamlet](https://github.com/gregwebs/hamlet.js)
  - [handlebars](https://github.com/wycats/handlebars.js/) [(website)](http://handlebarsjs.com/)
  - [hogan](https://github.com/twitter/hogan.js) [(website)](http://twitter.github.com/hogan.js/)
  - [htmling](https://github.com/codemix/htmling)
  - [jade](https://github.com/visionmedia/jade) [(website)](http://jade-lang.com/)
  - [jazz](https://github.com/shinetech/jazz)
  - [jqtpl](https://github.com/kof/jqtpl)
  - [JUST](https://github.com/baryshev/just)
  - [liquor](https://github.com/chjj/liquor)
  - [lodash](https://github.com/bestiejs/lodash) [(website)](http://lodash.com/)
  - [marko](https://github.com/marko-js/marko) [(website)](http://markojs.com)
  - [mote](https://github.com/satchmorun/mote) [(website)](http://satchmorun.github.io/mote/)
  - [mustache](https://github.com/janl/mustache.js)
  - [nunjucks](https://github.com/mozilla/nunjucks) [(website)](https://mozilla.github.io/nunjucks)
  - [plates](https://github.com/flatiron/plates)
  - [pug (formerly jade)](https://github.com/pugjs/pug) [(website)](http://jade-lang.com/)
  - [QEJS](https://github.com/jepso/QEJS)
  - [ractive](https://github.com/Rich-Harris/Ractive)
  - [react](https://github.com/facebook/react)
  - [slm](https://github.com/slm-lang/slm)
  - [swig (unmaintained)](https://github.com/paularmstrong/swig)
  - [swig (maintained fork)](https://github.com/node-swig/swig-templates)
  - [teacup](https://github.com/goodeggs/teacup)
  - [templayed](http://archan937.github.com/templayed.js/)
  - [twig](https://github.com/justjohn/twig.js)
  - [liquid](https://github.com/leizongmin/tinyliquid) [(website)](http://liquidmarkup.org/)
  - [toffee](https://github.com/malgorithms/toffee)
  - [underscore](https://github.com/documentcloud/underscore) [(website)](http://underscorejs.org/#template)
  - [vash](https://github.com/kirbysayshi/vash)
  - [walrus](https://github.com/jeremyruppel/walrus) [(website)](http://documentup.com/jeremyruppel/walrus/)
  - [whiskers](https://github.com/gsf/whiskers.js)

__NOTE__: you must still install the engines you wish to use, add them to your package.json dependencies.

## installation

```
cnpm install wepy-compiler-view --save-dev
```


## Usage

```
// configure wepy.config.js

module.exports = {
  compilers: {
    view: {
      engine: 'ejs',
      render: promise,           // （选填）自定义渲染函数，支持promise
      globalConfig: {            // 这个属性名字可以随便定义，只要在模板中使用相同的名字即可
        imgUrlPrefix: ''
      }
    }
  }
};

// write vue/wpy template

<template lang="view">
  view
    image(src=`${globalConfig.imgUrlPrefix}/images/xxx.svg`)
</template>    

```
