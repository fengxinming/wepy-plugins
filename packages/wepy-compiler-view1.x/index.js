'use strict';

const fs = require('fs');
const path = require('path');
const engineSource = require('consolidate');
const pretty = require('pretty');

const adapter = require('./adapter/jade');
const defaultConfig = require(`./config`);
const specialEngines = {
  pug: adapter,
  jade: adapter
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
  let engine;
  let v;
  Object.keys(config).forEach(k => {
    v = config[k];
    switch (k) {
      case 'engine':
        engine = specialEngines[v] || engineSource[v];
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
  if (!engine) {
    return Promise.reject(
      new Error(`Engine ${engine} not found`)
    );
  }
  return render(engine, content, config);
}

module.exports = compiler;
