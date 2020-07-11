'use strict';

const jade = require('jade');
const pug = require('pug');
const pretty = require('pretty');

const util = require('./lib/util');

const defaults = {
  cache: false,
  pretty: true
};

const engineSource = {
  jade,
  pug
};

function render(content, config) {
  let engine = config.engine;
  if (!engine) {
    engine = 'jade';
  }
  engine = engineSource[engine];
  if (!engine) {
    throw new Error(`Engine ${engine} not found`);
  }
  const indent = util.getIndent(content);
  if (indent.firstLineIndent) {
    content = util.fixIndent(content, indent.firstLineIndent * -1, indent.char);
  }
  config = Object.assign({}, defaults, config);
  let html = engine.compile(content, config)(config);

  // pug模板准备移除这个"pretty"属性，官方不建议使用它，
  // 我们额外增加一个"enforcePretty"属性强行美化模板
  if (config.enforcePretty) {
    html = pretty(html)
  }
  return html;
}

function compiler(content, config) {
  return new Promise((resolve, reject) => {
    try {
      let html = render(content, config);
      resolve(html);
    } catch (e) {
      reject(e);
    }
  });
};

compiler.sync = function(content, config) {
  return render(content, config);
};

module.exports = compiler;
