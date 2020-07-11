'use strict';

var defaults = {
  title: '加载中...',
  mask: true
};

function Loading(options) {
  this.queueNum = 0;
  this.options = Object.assign({}, defaults, options);
}

Loading.prototype._start = function() {
  wx.showLoading(this.options);
};

Loading.prototype._stop = function() {
  wx.hideLoading();
};

Loading.prototype.start = function() {
  if (this.options.sync) {
    this.queueNum += 1;
  }
  this._start();
  return this;
};

Loading.prototype.stop = function(force) {
  if (this.options.sync) {
    this.queueNum -= 1;
  }
  if (this.queueNum <= 0 || force) {
    this.queueNum = 0;
    this._stop();
  }
  return this;
};

module.exports = Loading;
