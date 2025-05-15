/**
 * [js-crc]{@link https://github.com/emn178/js-crc}
 *
 * @namespace crc
 * @version 0.3.1
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2015-2024
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
  var OUTPUT_TYPES = ['hex', 'array'];
  var MODELS = [
    {
      width: 32,
      poly: 0x04c11db7,
      init: 0xffffffff,
      refin: true,
      refout: true,
      xorout: 0xffffffff,
      // CRC-32/ISO-HDLC
      name: 'crc32'
    },
    {
      width: 16,
      poly: 0x8005,
      init: 0x0000,
      refin: true,
      refout: true,
      xorout: 0x0000,
      // CRC-16/ARC
      name: 'crc16'
    }
  ];

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
  function formatMessage(message) {
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

  function createOutputMethod(outputType, options) {
    return function (message) {
      return new Crc(options).update(message)[outputType]();
    };
  }

  function createMethod(module) {
    var bitOffset = 8 - (module.width % 8 || 8);
    var firstBlockBytes = Math.ceil(module.width / 8) % 4 || 4;
    var firstBlockBits = firstBlockBytes << 3;
    var msb = (1 << (firstBlockBits - 1)) >>> 0;
    var msbOffset = firstBlockBits - 8;
    var maskBits = module.width % 32 || 32;
    var crc, poly, tableId;
    var multiWords = module.width > 32;
    if (multiWords) {
      crc = module.init.slice();
      poly = module.poly.slice();
      leftShift(crc, bitOffset);
      leftShift(poly, bitOffset);
      tableId = [poly.join('-'), msbOffset, msb].join('_');
    } else {
      crc = module.init << bitOffset;
      poly = module.poly << bitOffset;
      tableId = [poly, msbOffset, msb].join('_');
    }
    var options = {
      refin: module.refin,
      refout: module.refout,
      xorout: module.xorout,
      width: module.width,
      multiWords: multiWords,
      bitOffset: bitOffset,
      msb: msb,
      msbOffset: msbOffset,
      maskBits: maskBits,
      mask: 2**maskBits - 1,
      crc: crc,
      poly: poly,
      tableId: tableId
    };
    var method = createOutputMethod('hex', options);
    method.create = function () {
      return new Crc(options);
    };
    method.update = function (message) {
      return method.create().update(message);
    };
    for (var i = 0; i < OUTPUT_TYPES.length; ++i) {
      var type = OUTPUT_TYPES[i];
      method[type] = createOutputMethod(type, options);
    }
    return method;
  }

  function leftShift(words, bits) {
    if (!bits) {
      return;
    }
    var i = 0;
    for (; i < words.length - 1; ++i) {
      words[i] = (words[i] << bits) | (words[i + 1] >>> (32 - bits));
    }
    words[i] = (words[i] << bits);
  }

  function rightShift(words, bits) {
    if (!bits) {
      return;
    }
    var i = words.length - 1;
    for (; i > 0; --i) {
      words[i] = (words[i - 1] << (32 - bits)) | (words[i] >>> bits);
    }
    words[i] = words[i] >>> bits;
  }

  function xor(a, b) {
    for (var i = 0; i < a.length; ++i) {
      a[i] ^= b[i];
    }
  }

  var TABLES = {};
  function getTable(tableId, poly, msbOffset, msb) {
    if (!TABLES[tableId]) {
      TABLES[tableId] = createTable(poly, msbOffset, msb);
    }
    return TABLES[tableId];
  }

  function createTable(poly, msbOffset, msb) {
    var table = [];
    var multiWords = isArray(poly);
    if (!multiWords) {
      poly = [poly]
    }
    for (i = 0; i < 256; ++i) {
      var byte = [i << msbOffset];
      for (var j = 1; j < poly.length; ++j) {
        byte[j] = 0;
      }
      for (var j = 0; j < 8; ++j) {
        if (byte[0] & msb) {
          leftShift(byte, 1);
          for (var k = 0; k < poly.length; ++k) {
            byte[k] = byte[k] ^ poly[k];
          }
        } else {
          leftShift(byte, 1);
        }
      }
      table[i] = multiWords ? byte : byte[0];
    }
    return table;
  }

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

  var REVERSE_BYTE = [];
  for (var i = 0; i < 256; ++i) {
    REVERSE_BYTE[i] = reverse(i, 8);
  }

  function Crc(options) {
    this.options = options;
    this.refin = options.refin;
    this.multiWords = options.multiWords;
    this.bitOffset = options.bitOffset;
    this.msbOffset = options.msbOffset;
    this.maskBits = options.maskBits;
    this.mask = options.mask;
    this.table = getTable(options.tableId, options.poly, this.msbOffset, options.msb);
    if (this.multiWords) {
      this.crc = options.crc.slice();
    } else {
      this.crc = options.crc;
    }
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
    if (this.refin) {
      byte = REVERSE_BYTE[byte];
    }
    if (this.multiWords) {
      crc[0] = crc[0] ^ (byte << this.msbOffset);
      var cache = this.table[(crc[0] >> this.msbOffset) & 0xFF];
      leftShift(crc, 8);
      xor(crc, cache);
    } else {
      crc = (crc ^ (byte << this.msbOffset));
      crc = (crc << 8) ^ this.table[(crc >> this.msbOffset) & 0xFF];
    }
    this.crc = crc;
  };

  Crc.prototype.finalize = function () {
    if (this.finalized) {
      return;
    }
    this.finalized = true;
    if (this.multiWords) {
      rightShift(this.crc, this.bitOffset);
      this.crc[0] = this.crc[0] & this.mask;
      if (this.options.refout) {
        leftShift(this.crc, 32 - this.maskBits);
        var crc = [];
        for (var i = 0; i < this.crc.length; ++i) {
          crc[this.crc.length - i - 1] = reverse(this.crc[i], 32)
        }
        this.crc = crc;
      }
      xor(this.crc, this.options.xorout);
    } else {
      this.crc = (this.crc >>> this.bitOffset) & this.mask;
      if (this.options.refout) {
        this.crc = reverse(this.crc, this.options.width);
      }
      this.crc ^= this.options.xorout;
    }
  };

  Crc.prototype.hex = function () {
    this.finalize();
    var hex = '';
    var crc = this.crc;
    var length = this.options.width;
    if (this.multiWords) {
      crc = crc[0];
      length = length % 32 || 32;
    }
    for (var i = (Math.ceil(length / 4) << 2) - 4; i >= 0; i -= 4) {
      hex += HEX_CHARS[(crc >> i) & 0x0F];
    }
    if (this.multiWords) {
      for (var j = 1; j < this.crc.length; ++j) {
        crc = this.crc[j];
        for (i = 28; i >= 0; i -= 4) {
          hex += HEX_CHARS[(crc >> i) & 0x0F];
        }
      }
    }
    return hex;
  };
  Crc.prototype.toString = Crc.prototype.hex;

  Crc.prototype.array = function () {
    this.finalize();
    var arr = new Array(Math.ceil(this.options.width / 8));
    var crc = this.crc;
    var length = this.options.width;
    if (this.multiWords) {
      crc = crc[0];
      length = length % 32 || 32;
    }
    var index = 0;
    for (var i = (Math.ceil(length / 8) << 3) - 8; i >= 0; i -= 8) {
      arr[index++] = (crc >> i) & 0xFF;
    }
    if (this.multiWords) {
      for (var j = 1; j < this.crc.length; ++j) {
        crc = this.crc[j];
        for (i = 24; i >= 0; i -= 8) {
          arr[index++] = (crc >> i) & 0xFF;
        }
      }
    }
    return arr;
  };

  var exports = {};
  for (var i = 0;i < MODELS.length;++i) {
    var m = MODELS[i];
    exports[m.name] = createMethod(m);
  }
  exports.createModel = createMethod;
  if (COMMON_JS) {
    module.exports = exports;
  } else {
    for (i = 0;i < MODELS.length;++i) {
      var m = MODELS[i];
      root[m.name] = exports[m.name];
    }
    root.createModel = createMethod;
    if (AMD) {
      define(function() {
        return exports;
      });
    }
  }
})();
