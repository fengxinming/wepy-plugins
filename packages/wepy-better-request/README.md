# wepy 基于wepy.request的封装库

[![npm package](https://nodei.co/npm/wepy-better-request.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/wepy-better-request)

> Note: 由于开发的需要封装了该库，使用前请开启promise。

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

### 支持创建多实例

```
import request from 'wepy-better-request';

request.config({
  baseURL: 'https://www.madcoder.cn'
});

request({
  url: '/tests/sleep.php?time=1&t=css&c=Nw==&i=1'
}).then(()=> {
  // statusCode === 200 的逻辑
}).catch(()=> {

})

const request2 = request.create({
  mask: false,
  baseURL: 'https://www.madcoder.cn'
});

request2({
  url: '/tests/sleep.php?time=1&t=css&c=Ng==&i=2'
}).then(()=> {
  // statusCode === 200 的逻辑
}).catch(()=> {

});

```

### 扩展的一些参数

[wx.request 接收的参数，点击此处查看](https://developers.weixin.qq.com/miniprogram/dev/api/network-request.html?t=20161122)

* mask      默认为true，请求接口时显示加载遮罩
* json      如果设置为false，就会设置content-type为application/x-www-form-urlencoded; charset=UTF-8
* testURL   本地模拟数据的接口url地址前缀，配置后会拼接至url前面
* baseURL   后台接口url地址前缀，配置后会拼接至url前面
* agent     默认为`https://`，当url以`https://`开头时，不拼接`baseURL`
* test      当url不以`https://`开头时，如果设置为true，就会拼接至url前面

__NOTE__: 一定要在app.wpy文件里面开启Promise

## installation

```
cnpm install wepy-better-request --save
```


## Usage

```
// 记得在app.wpy文件中的constructor函数中加上这一段

this.use('promisify');

```

建议定义一个request.js处理全局的错误
```
// request.js

import request from 'wepy-better-request';

const request2 = request.create({
  baseURL: 'https://www.madcoder.cn',
  testURL: 'https://test.madcoder.cn'
});

function http(options) {
  return request2({
    url: '/tests/sleep.php?time=1&t=css&c=Ng==&i=2'
  }).then((res) => {
    // statusCode === 200 的逻辑
    return res;
  }).catch((err) => {
    // statusCode非200，或者其他错误处理
    return Promise.reject(err);
  });
};

export default http;

```

一般用法
```
import request from 'wepy-better-request';

// 配置一遍就可以了，可以在app.wpy文件中配置
request.config({
  baseURL: 'https://www.madcoder.cn'
});

request({
  url: '/tests/sleep.php?time=1&t=css&c=Nw==&i=1'
}).then(()=> {
  // statusCode === 200 的逻辑
}).catch(()=> {
  // statusCode非200，或者其他错误处理
});
```
