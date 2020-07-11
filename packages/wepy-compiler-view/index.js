'use strict';

const fs = require('fs');
const path = require('path');
const engineSource = require('consolidate');
const pretty = require('pretty');

const defaultConfig = require(`./config`);
const specialEngines = {
  pug: true,
  jade: true
};

function mergeOptions(engineName, options) {
  let defaultEngineConfig = path.join(__dirname, 'config', `${engineName}.js`);
  defaultEngineConfig = fs.existsSync(defaultEngineConfig) ? require(defaultEngineConfig) : {};
  return Object.assign({}, defaultEngineConfig, defaultConfig, options);
}

function render(engine, content, config) {
  const engineName = engine.name;
  config = engineName ? mergeOptions(engineName, config) : Object.assign({}, defaultConfig, config);
  return engine.render(content, config).then(html => {
    // pug模板准备移除这个"pretty"属性，官方不建议使用它，
    // 我们额外增加一个"enforcePretty"属性强行美化模板

    if (config.enforcePretty) {
      html = pretty(html)
    }
    return html;
  });
}

function compiler(content, config, file) {
  let engine = config.engine;
  if (specialEngines[engine]) {
    return Promise.reject(
      new Error('Please install wepy-compiler-jade. you might go there https://github.com/fengxinming/wepy-compiler-jade')
    );
  }
  let v;
  Object.keys(config).forEach(k => {
    v = config[k];
    switch (k) {
      case 'engine':
        engine = engineSource[v];
        if (!engine) {
          return Promise.reject(
            new Error(`Engine not found for the ".${engine}" file extension`)
          );
        }
        engine = { name: v, render: engine.render };
        break;
      case 'render':
        engine = { render: v };
        break;
        //- 后续增加更多的功能处理
    }
  });
  return render(engine, content, config);
}

module.exports = compiler;
