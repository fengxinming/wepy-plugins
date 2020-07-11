'use strict';

const util = require('../lib/util');

module.exports.render = (content, config) => {
  return new Promise((resolve, reject) => {
    try {
      const indent = util.getIndent(content);
      if (indent.firstLineIndent) {
        content = util.fixIndent(content, indent.firstLineIndent * -1, indent.char);
      }
      const engine = require(config.engine);
      const html = engine.compile(content, config)(config);
      resolve(html);
    } catch (e) {
      reject(e);
    }
  });
};
