var imported = false;
onmessage = function(e) {
  if (imported) {
    postMessage(crc32(e.data));
    if (typeof exports !== 'undefined') {
      imported = false;
    }
  } else {
    imported = true;
    importScripts(e.data);
  }
}
