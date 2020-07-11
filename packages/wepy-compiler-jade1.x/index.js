'use strict';

const render = require('wepy-compiler-view');

function compiler(content, config, file) {
  if (!config.engine) {
    config.engine = 'jade';
  }
  return render(content, config, file);
}

module.exports = compiler;
