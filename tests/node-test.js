crc32 = require('../src/crc.js').crc32;
crc16 = require('../src/crc.js').crc16;
expect = require('expect.js');
require('./test.js');

delete require.cache[require.resolve('../src/crc.js')]
delete require.cache[require.resolve('./test.js')]
crc32 = null
crc16 = null

HI_CRC32_TEST = true;
require('../src/crc.js');
require('./test.js');
