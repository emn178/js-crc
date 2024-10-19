(function(crc32, crc16) {
  Array.prototype.toHexString = ArrayBuffer.prototype.toHexString = function () {
    var array = new Uint8Array(this);
    var hex = '';
    for (var i = 0; i < array.length; ++i) {
      var c = array[i].toString('16');
      hex += c.length === 1 ? '0' + c : c;
    }
    return hex;
  };

  var testCases = {
    crc32: {
      'ascii': {
        '414fa339': 'The quick brown fox jumps over the lazy dog',
        '519025e9': 'The quick brown fox jumps over the lazy dog.'
      },
      'UTF8': {
        '5a09ed37': '中文',
        'cf1f6086': 'aécio',
        'a9aeffea': '𠜎'
      },
      'Array': {
        'd202ef8d': [0],
        '414fa339': [84, 104, 101, 32, 113, 117, 105, 99, 107, 32, 98, 114, 111, 119, 110, 32, 102, 111, 120, 32, 106, 117, 109, 112, 115, 32, 111, 118, 101, 114, 32, 116, 104, 101, 32, 108, 97, 122, 121, 32, 100, 111, 103]
      }
    },
    crc16: {
      'ascii': {
        'fcdf': 'The quick brown fox jumps over the lazy dog',
        '843d': 'The quick brown fox jumps over the lazy dog.'
      },
      'UTF8': {
        '6659': '中文',
        '9ef3': 'aécio',
        '46da': '𠜎'
      },
      'Array': {
        '0000': [0],
        'fcdf': [84, 104, 101, 32, 113, 117, 105, 99, 107, 32, 98, 114, 111, 119, 110, 32, 102, 111, 120, 32, 106, 117, 109, 112, 115, 32, 111, 118, 101, 114, 32, 116, 104, 101, 32, 108, 97, 122, 121, 32, 100, 111, 103]
      }
    }
  };

  if (!(typeof JS_CRC_NO_ARRAY_BUFFER === 'boolean' && JS_CRC_NO_ARRAY_BUFFER)) {
    testCases.crc32.Uint8Array = {
      '414fa339': new Uint8Array([84, 104, 101, 32, 113, 117, 105, 99, 107, 32, 98, 114, 111, 119, 110, 32, 102, 111, 120, 32, 106, 117, 109, 112, 115, 32, 111, 118, 101, 114, 32, 116, 104, 101, 32, 108, 97, 122, 121, 32, 100, 111, 103])
    };
    testCases.crc32.Int8Array = {
      '414fa339': new Int8Array([84, 104, 101, 32, 113, 117, 105, 99, 107, 32, 98, 114, 111, 119, 110, 32, 102, 111, 120, 32, 106, 117, 109, 112, 115, 32, 111, 118, 101, 114, 32, 116, 104, 101, 32, 108, 97, 122, 121, 32, 100, 111, 103])
    };
    testCases.crc32.ArrayBuffer = {
      'd202ef8d': new ArrayBuffer(1)
    };
    testCases.crc16.Uint8Array = {
      'fcdf': new Uint8Array([84, 104, 101, 32, 113, 117, 105, 99, 107, 32, 98, 114, 111, 119, 110, 32, 102, 111, 120, 32, 106, 117, 109, 112, 115, 32, 111, 118, 101, 114, 32, 116, 104, 101, 32, 108, 97, 122, 121, 32, 100, 111, 103])
    };
    testCases.crc16.Int8Array = {
      'fcdf': new Int8Array([84, 104, 101, 32, 113, 117, 105, 99, 107, 32, 98, 114, 111, 119, 110, 32, 102, 111, 120, 32, 106, 117, 109, 112, 115, 32, 111, 118, 101, 114, 32, 116, 104, 101, 32, 108, 97, 122, 121, 32, 100, 111, 103])
    };
    testCases.crc16.ArrayBuffer = {
      '0000': new ArrayBuffer(1),
    };
  }

  if (typeof BUFFER === 'boolean' && BUFFER) {
    testCases.crc32.Buffer = {
      '414fa339': Buffer.from(new Uint8Array([84, 104, 101, 32, 113, 117, 105, 99, 107, 32, 98, 114, 111, 119, 110, 32, 102, 111, 120, 32, 106, 117, 109, 112, 115, 32, 111, 118, 101, 114, 32, 116, 104, 101, 32, 108, 97, 122, 121, 32, 100, 111, 103]))
    };
    testCases.crc16.Buffer = {
      'fcdf': Buffer.from(new Uint8Array([84, 104, 101, 32, 113, 117, 105, 99, 107, 32, 98, 114, 111, 119, 110, 32, 102, 111, 120, 32, 106, 117, 109, 112, 115, 32, 111, 118, 101, 114, 32, 116, 104, 101, 32, 108, 97, 122, 121, 32, 100, 111, 103]))
    };
  }

  var errorTestCases = [null, undefined, { length: 0 }, 0, 1, false, true, NaN, Infinity, function () {}];

  function runTestCases(name, algorithm) {
    var methods = [
      {
        name: name,
        call: algorithm,
      },
      {
        name: name + '.hex',
        call: algorithm.hex
      },
      {
        name: name + '.array',
        call: function (message) {
          return algorithm.array(message).toHexString();
        }
      }
    ];

    var classMethods = [
      {
        name: 'create',
        call: function (message) {
          return algorithm.create().update(message).toString();
        }
      },
      {
        name: 'update',
        call: function (message) {
          return algorithm.update(message).toString();
        }
      },
      {
        name: 'hex',
        call: function (message) {
          return algorithm.update(message).hex();
        }
      },
      {
        name: 'array',
        call: function (message) {
          return algorithm.update(message).array().toHexString();
        }
      },
      {
        name: 'finalize',
        call: function (message) {
          var hash = algorithm.update(message);
          hash.hex();
          return hash.hex();
        }
      }
    ];

    var subTestCases = testCases[name];

    describe(name, function () {
      methods.forEach(function (method) {
        describe('#' + method.name, function () {
          for (var testCaseName in subTestCases) {
            (function (testCaseName) {
              var testCase = subTestCases[testCaseName];
              context('when ' + testCaseName, function () {
                for (var hash in testCase) {
                  (function (message, hash) {
                    it('should be equal', function () {
                      expect(method.call(message)).to.be(hash);
                    });
                  })(testCase[hash], hash);
                }
              });
            })(testCaseName);
          }
        });
      });

      classMethods.forEach(function (method) {
        describe('#' + method.name, function () {
          for (var testCaseName in subTestCases) {
            (function (testCaseName) {
              var testCase = subTestCases[testCaseName];
              context('when ' + testCaseName, function () {
                for (var hash in testCase) {
                  (function (message, hash) {
                    it('should be equal', function () {
                      expect(method.call(message)).to.be(hash);
                    });
                  })(testCase[hash], hash);
                }
              });
            })(testCaseName);
          }
        });
      });

      describe('#' + name, function () {
        errorTestCases.forEach(function (testCase) {
          context('when ' + testCase, function () {
            it('should throw error', function () {
              expect(function () {
                algorithm(testCase);
              }).to.throwError(/input is invalid type/);
            });
          });
        });

        context('when update after finalize', function () {
          it('should throw error', function () {
            expect(function () {
              var hash = algorithm.update('any');
              hash.hex();
              hash.update('any');
            }).to.throwError(/finalize already called/);
          });
        });
      });
    });
  }

  runTestCases('crc32', crc32);
  runTestCases('crc16', crc16);
})(crc32, crc16);
