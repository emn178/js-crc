/**
 * [js-crc]{@link https://github.com/emn178/js-crc}
 *
 * @namespace crc
 * @version 0.2.0
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2015-2017
 * @license MIT
 */
/*jslint bitwise: true */
(function () {
  'use strict';

  var INPUT_ERROR = 'input is invalid type';
  var FINALIZE_ERROR = 'finalize already called';
  var WINDOW = typeof window === 'object';
  var root = WINDOW ? window : {};
  if (root.JS_CRC_NO_WINDOW) {
    WINDOW = false;
  }
  var WEB_WORKER = !WINDOW && typeof self === 'object';
  var NODE_JS = !root.JS_CRC_NO_NODE_JS && typeof process === 'object' && process.versions && process.versions.node;
  if (NODE_JS) {
    root = global;
  } else if (WEB_WORKER) {
    root = self;
  }
  var COMMON_JS = !root.JS_CRC_NO_COMMON_JS && typeof module === 'object' && module.exports;
  var AMD = typeof define === 'function' && define.amd;
  var ARRAY_BUFFER = !root.JS_CRC_NO_ARRAY_BUFFER && typeof ArrayBuffer !== 'undefined';
  var HEX_CHARS = '0123456789abcdef'.split('');

  var isArray = Array.isArray;
  if (root.JS_CRC_NO_NODE_JS || !isArray) {
    isArray = function (obj) {
      return Object.prototype.toString.call(obj) === '[object Array]';
    };
  }

  var isView = ArrayBuffer.isView;
  if (ARRAY_BUFFER && (root.JS_CRC_NO_ARRAY_BUFFER_IS_VIEW || !isView)) {
    isView = function (obj) {
      return typeof obj === 'object' && obj.buffer && obj.buffer.constructor === ArrayBuffer;
    };
  }

  // [message: string, isString: bool]
  var formatMessage = function (message) {
    var type = typeof message;
    if (type === 'string') {
      return [message, true];
    }
    if (type !== 'object' || message === null) {
      throw new Error(INPUT_ERROR);
    }
    if (ARRAY_BUFFER && message.constructor === ArrayBuffer) {
      return [new Uint8Array(message), false];
    }
    if (!isArray(message) && !isView(message)) {
      throw new Error(INPUT_ERROR);
    }
    return [message, false];
  }

  var OUTPUT_TYPES = ['hex', 'array'];

  var Modules = [
    {
      name: 'crc32',
      width: 32,
      poly: 0x4C11DB7,
      init: 0xFFFFFFFF,
      xorout: 0xFFFFFFFF,
      refin: true,
      refout: true
    },
    {
      name: 'crc16',
      width: 16,
      poly: 0x8005,
      init: 0,
      xorout: 0,
      refin: true,
      refout: true
    }
  ];

  var createOutputMethod = function (outputType, module) {
    return function (message) {
      return new Crc(module).update(message)[outputType]();
    };
  };

  var createMethod = function (module) {
    var method = createOutputMethod('hex', module);
    method.create = function () {
      return new Crc(module);
    };
    method.update = function (message) {
      return method.create().update(message);
    };
    for (var i = 0; i < OUTPUT_TYPES.length; ++i) {
      var type = OUTPUT_TYPES[i];
      method[type] = createOutputMethod(type, module);
    }
    return method;
  };

  function reverse(val, width) {
    var result = 0;
    for (var i = 0; val; ++i) {
      if (val & 1) {
        result |= (1 << ((width - 1) - i));
      }
      val = val >>> 1;
    }
    return result;
  }

  function Crc(options) {
    this.options = options;
    this.bitOffset = options.width % 8;
    if (this.bitOffset) {
      this.bitOffset = 8 - this.bitOffset;
    }
    var msbBit = Math.ceil(options.width / 8) * 8;
    this.msb = (1 << (msbBit - 1)) >>> 0;
    this.msbOffset = msbBit - 8;
    this.mask = 2**options.width - 1;
    this.crc = this.options.init << this.bitOffset;
    this.poly = this.options.poly << this.bitOffset;
  }

  Crc.prototype.update = function (message) {
    if (this.finalized) {
      throw new Error(FINALIZE_ERROR);
    }
    var result = formatMessage(message);
    message = result[0];
    var isString = result[1];
    var code, i, length = message.length;
    if (isString) {
      for (i = 0; i < length; ++i) {
        code = message.charCodeAt(i);
        if (code < 0x80) {
          this.updateByte(code);
        } else if (code < 0x800) {
          this.updateByte((0xc0 | (code >> 6)));
          this.updateByte((0x80 | (code & 0x3f)));
        } else if (code < 0xd800 || code >= 0xe000) {
          this.updateByte((0xe0 | (code >> 12)));
          this.updateByte((0x80 | ((code >> 6) & 0x3f)));
          this.updateByte((0x80 | (code & 0x3f)));
        } else {
          code = 0x10000 + (((code & 0x3ff) << 10) | (message.charCodeAt(++i) & 0x3ff));
          this.updateByte((0xf0 | (code >> 18)));
          this.updateByte((0x80 | ((code >> 12) & 0x3f)));
          this.updateByte((0x80 | ((code >> 6) & 0x3f)));
          this.updateByte((0x80 | (code & 0x3f)));
        }
      }
    } else {
      for (i = 0; i < length; ++i) {
        this.updateByte(message[i]);
      }
    }
    return this;
  };

  Crc.prototype.updateByte = function (byte) {
    var crc = this.crc;
    if (this.options.refin) {
      byte = reverse(byte, 8);
    }
    crc = crc ^ (byte << this.msbOffset);
    for (var j = 0; j < 8; ++j) {
      if (crc & this.msb) {
        crc = (crc << 1) ^ this.poly;
      } else {
        crc = crc << 1;
      }
    }
    this.crc = crc;
  };

  Crc.prototype.finalize = function () {
    if (this.finalized) {
      return;
    }
    this.finalized = true;
    this.crc = (this.crc >>> this.bitOffset) & this.mask;
    if (this.options.refout) {
      this.crc = reverse(this.crc, this.options.width);
    }
    this.crc ^= this.options.xorout;
  };

  Crc.prototype.hex = function () {
    this.finalize();
    var hex = [];
    for (var i = 0; i < this.options.width; i += 4) {
      hex.unshift(HEX_CHARS[(this.crc >> i) & 0x0F]);
    }
    return hex.join('');
  };
  Crc.prototype.toString = Crc.prototype.hex;

  Crc.prototype.array = function () {
    this.finalize();

    var arr = [];
    for (var i = 0; i < this.options.width; i += 8) {
      arr.unshift((this.crc >> i) & 0xFF);
    }
    return arr;
  };

  var exports = {};
  for (var i = 0;i < Modules.length;++i) {
    var m = Modules[i];
    exports[m.name] = createMethod(m);
  }
  exports.createCrc = createMethod;
  if (COMMON_JS) {
    module.exports = exports;
  } else {
    for (i = 0;i < Modules.length;++i) {
      var m = Modules[i];
      root[m.name] = exports[m.name];
    }
    root.createCrc = createMethod;
    if (AMD) {
      define(function() {
        return exports;
      });
    }
  }
})();
