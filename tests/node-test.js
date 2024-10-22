expect = require('expect.js');
Worker = require("tiny-worker");

function unset() {
  delete require.cache[require.resolve('../src/crc.js')];
  delete require.cache[require.resolve('./test.js')];
  crc16 = null;
  crc32 = null;
  createModel = null;
  Object.keys(require('../src/models.js')).forEach((key) => {
    global[key] = null;
  });
  delete require.cache[require.resolve('../src/models.js')];
  delete require.cache[require.resolve('./models-test.js')];
  BUFFER = undefined;
  JS_CRC_NO_WINDOW = undefined;
  JS_CRC_NO_NODE_JS = undefined;
  JS_CRC_NO_COMMON_JS = undefined;
  JS_CRC_NO_ARRAY_BUFFER = undefined;
  JS_CRC_NO_ARRAY_BUFFER_IS_VIEW = undefined;
  window = undefined;
}

function requireToGlobal() {
  crc16 = require('../src/crc.js').crc16;
  crc32 = require('../src/crc.js').crc32;
  createModel = require('../src/crc.js').createModel;
  Object.assign(global, require('../src/models.js'));
}

function runCommonJsTest() {
  requireToGlobal();
  require('./test.js');
  require('./models-test.js');
  unset();
}

function runWindowTest() {
  window = global;
  require('../src/crc.js');
  require('../src/models.js');
  require('./test.js');
  require('./models-test.js');
  unset();
}

// Node.js env
BUFFER = true;
runCommonJsTest();

// Node.js env, no Buffer.from
JS_CRC_NO_BUFFER_FROM = true
runCommonJsTest();

// Webpack browser env
JS_CRC_NO_NODE_JS = true;
window = global;
runCommonJsTest();

// browser env
JS_CRC_NO_NODE_JS = true;
JS_CRC_NO_COMMON_JS = true;
runWindowTest();

// browser env and no array buffer
JS_CRC_NO_NODE_JS = true;
JS_CRC_NO_COMMON_JS = true;
JS_CRC_NO_ARRAY_BUFFER = true;
runWindowTest();

// browser env and no isView
JS_CRC_NO_NODE_JS = true;
JS_CRC_NO_COMMON_JS = true;
JS_CRC_NO_ARRAY_BUFFER_IS_VIEW = true;
runWindowTest();

// browser AMD
JS_CRC_NO_NODE_JS = true;
JS_CRC_NO_COMMON_JS = true;
JS_CRC_NO_ARRAY_BUFFER_IS_VIEW = false;
window = global;
define = function (func) {
  crc16 = func().crc16;
  crc32 = func().crc32;
  if (crc16) {
    require('./test.js');
  } else {
    require('./models-test.js');
  }
};
define.amd = true;

require('../src/crc.js');
require('../src/models.js')
unset();

// webworker
WORKER = 'tests/worker.js';
SOURCE = 'src/crc.js';

require('./worker-test.js');

delete require.cache[require.resolve('./worker-test.js')];

// cover webworker
JS_CRC_NO_WINDOW = true;
JS_CRC_NO_NODE_JS = true;
WORKER = './worker.js';
SOURCE = '../src/crc.js';
window = global;
self = global;

Worker = function (file) {
  require(file);
  currentWorker = this;

  this.postMessage = function (data) {
    onmessage({data: data});
  };
}

postMessage = function (data) {
  currentWorker.onmessage({data: data});
}

importScripts = function () {};

requireToGlobal();
require('./worker-test.js');
