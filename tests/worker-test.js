(function (Worker, WORKER, SOURCE) {
  var cases = {
    '414fa339': 'The quick brown fox jumps over the lazy dog',
    '519025e9': 'The quick brown fox jumps over the lazy dog.'
  };

  describe('#crc32', function () {
    Object.keys(cases).forEach(function (hash) {
      it('should be equal', function (done) {
        var worker = new Worker(WORKER);
        worker.onmessage = function(event) {
          expect(event.data).to.be(hash);
          if (worker.terminate) {
            worker.terminate();
          }
          done();
        };
        worker.postMessage(SOURCE);
        worker.postMessage(cases[hash]);
      });
    });
  });
})(Worker, WORKER, SOURCE);
