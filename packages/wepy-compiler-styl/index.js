'use strict';

const path = require('path');
const stylus = require('stylus');
const flatten = require('lodash.flatten');

module.exports = function (content, config, file) {
  return new Promise(function (resolve, reject) {
    const opath = path.parse(file);
    config.paths = [opath.dir];
    config.filename = opath.base;

    const sets = {};
    const defines = {};
    const rawDefines = {};
    let includes = [];
    let imports = [];
    let v;

    Object.keys(config).forEach(k => {
      v = config[k];
      switch (k) {
        case 'define':
          Object.assign(defines, v);
          break;
        case 'rawDefine':
          Object.assign(rawDefines, v);
          break;
        case 'include':
          includes.push(v);
          break;
        case 'import':
          imports.push(v);
          break;
        case 'url':
          let obj;
          if (typeof v === 'string') {
            obj = {};
            obj[v] = stylus.url();
            Object.assign(defines, obj);
          } else {
            obj = {};
            obj[v.name] = stylus.url({
              limit: v.limit != null ? v.limit : 30000,
              paths: v.paths || []
            });
            Object.assign(defines, obj);
          }
          break;
        case 'includeCSS':
          k = 'include css';
        default:
          sets[k] = v;
      }
    });

    delete config.define;
    delete config.rawDefine;
    delete config.include;
    delete config['import'];
    delete config.url;
    delete config.includeCSS;

    const instance = stylus(content, config);

    includes = flatten(includes);
    imports = flatten(imports);

    Object.keys(sets).forEach(key => {
      instance.set(key, sets[key]);
    });
    Object.keys(defines).forEach(key => {
      instance.define(key, defines[key]);
    });
    Object.keys(rawDefines).forEach(key => {
      instance.define(key, rawDefines[key], true);
    });
    (includes || []).forEach(n => {
      instance.include(n);
    });
    (imports || []).forEach(n => {
      instance['import'](n);
    });

    imports = instance.deps();

    instance.render(function (err, css) {
      if (err) {
        reject(err);
      } else {
        if (config.supportObject) {
          var result = {};
          result.css = css;
          result.context = file;
          result.imports = imports;
          resolve(result);
        } else {
          resolve(css);
        }
      }
    });
  });
};
