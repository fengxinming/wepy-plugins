'use strict';

var wepy = require('wepy');
var Loading = require('./gloading');

wepy = wepy.default || wepy;

var gloading = new Loading({
  sync: true
});
var defaults = {
  agent: 'https://',
  mask: true,
  toast: {
    icon: 'none',
    duration: 3000
  }
};

function merge(src, options = {}) {
  var newOptions = {};
  if (options.toast) {
    newOptions.toast = Object.assign({}, src.toast, options.toast);
    delete options.toast;
  }
  return Object.assign(newOptions, src, options);
}

function request(options = {}) {
  // 遮罩，默认不显示菊花
  if (options.mask) {
    // 这里写菊花转
    gloading.start();
    // delete options.mask;
  }
  // 简化类型设置
  var headers = (options.header = options.header || {});
  if (options.json === false) {
    headers['content-type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
    delete options.json;
  }
  options.header = headers;
  var url = options.url;
  // 拼接默认前缀
  if (url.indexOf(options.agent) !== 0) {
    if (options.test) {
      url = options.testURL + url;
    } else if (options.baseURL) {
      url = options.baseURL + url;
    }
    delete options.test;
    delete options.testURL;
    delete options.baseURL;
  }
  delete options.agent;
  options.url = url;
  // 增加时间戳
  options.timestamp = options.timestamp || (+new Date());
  return wepy.request(options).then((res) => {
    if (options.mask) {
      gloading.stop();
    }
    if (res.statusCode === 200) {
      return res;
    } else {
      if (options.toast) {
        wx.showToast({
          icon: options.toast.icon,
          title: res.data.message,
          duration: options.toast.duration
        });
      }
      return Promise.reject(res);
    }
  }).catch((err) => {
    if (options.mask) {
      gloading.stop();
    }
    err.data = err;
    err.statusCode = -1;
    return Promise.reject(err);
  });
};

function createInstance(defaultConfig, scope) {
  var req = function(options) {
    // 合并创建实例时传入的参数
    var opts = merge(defaults, scope.options);
    // 合并当前传入的参数
    opts = merge(opts, options);
    return request(opts);
  };
  req.config = function(options) {
    scope.options = options;
  };
  req.config(defaultConfig);
  return req;
}

var req = createInstance({}, {});
// 创建新request
req.create = function(options) {
  return createInstance(options, {});
};

module.exports = req;
