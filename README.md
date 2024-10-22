# js-crc
[![Build Status](https://travis-ci.org/emn178/js-crc.svg?branch=master)](https://travis-ci.org/emn178/js-crc)
[![Coverage Status](https://coveralls.io/repos/emn178/js-crc/badge.svg?branch=master)](https://coveralls.io/r/emn178/js-crc?branch=master)  
[![NPM](https://nodei.co/npm/js-crc.png?stars&downloads)](https://nodei.co/npm/js-crc/)  
Simple CRC checksum functions for JavaScript. Supports many predefined models such as CRC-8, CRC-16, CRC-24, CRC-32, and CRC-64. It also supports custom CRC models.

## Download
### Core
[Compress](https://raw.github.com/emn178/js-crc/master/build/crc.min.js)  
[Uncompress](https://raw.github.com/emn178/js-crc/master/src/crc.js)  

### Models
[Compress](https://raw.github.com/emn178/js-crc/master/build/models.min.js)  
[Uncompress](https://raw.github.com/emn178/js-crc/master/src/model.js)

## Installation
You can also install js-crc by using Bower.

    bower install js-crc

For node.js, you can use this command to install:

    npm install js-crc

## Import
There are only 2 default models in `js-crc`. crc32 and crc16. More models are in `js-crc/models`. You can check all models in [this file](https://github.com/emn178/js-crc/blob/master/src/models.js). The `name` and `alias` will convert to lower snake case and export. For example, `CRC-64/ECMA-182` will convert to `crc_64_ecma_182`.

### Node.js
If you use node.js, you should require the module first:
```JavaScript
var crc32 = require('js-crc').crc32;
var crc16 = require('js-crc').crc16;
var crc_64_ecma_182 = require('js-crc/models').crc_64_ecma_182;
```
or
```JavaScript
const { crc32, crc16 } = require('js-crc');
const { crc_64_ecma_182 } = require('js-crc/models');
```

### TypeScript
If you use TypeScript, you can import like this:
```TypeScript
import { crc32, crc16 } from 'js-crc';
import { crc_64_ecma_182 } from 'js-crc/models';
```

### RequireJS
It supports AMD:
```JavaScript
require(['your/path/crc.js'], function (crc) {
  var crc32 = crc.crc32;
  var crc16 = crc.crc16;
  // ...
});
```

## Usage
### Basic
You could use like this:
```JavaScript
crc32('Message to check');
crc16('Message to check');

var crc = crc32.create();
crc.update('Message to check');
crc.hex();

var crc2 = crc32.update('Message to check');
crc2.update('Message2 to check');
crc2.array();
```

### Custom Model
You can create custom model:
```JavaScript
const { createModel } = require('js-crc');
var myModel = createModel({
  width: 16,
  poly: 0x8005,
  init: 0x0000,
  refin: true,
  refout: true,
  xorout: 0x0000
});
myModel('Message to check');
```

If width more than 32, `poly`, `init` and `xorout` have to split into an array of 32-bit numbers. For example
```JavaScript
createModel({
  width: 82,
  poly: [0x0308c, 0x01110114, 0x01440411],
  init: [0, 0, 0],
  refin: true,
  refout: true,
  xorout: [0, 0, 0]
})
```

### Example
```JavaScript
crc32('The quick brown fox jumps over the lazy dog'); // 414fa339
crc32('The quick brown fox jumps over the lazy dog.'); // 519025e9

// It also supports byte `Array`, `Uint8Array`, `ArrayBuffer` input:
crc32([0]); // d202ef8d
crc32(new Uint8Array([0])); // d202ef8d
```

## License
The project is released under the [MIT license](http://www.opensource.org/licenses/MIT).

## Contact
The project's website is located at https://github.com/emn178/js-crc  
Author: Chen, Yi-Cyuan (emn178@gmail.com)
