/* ============================================================
 * asyncLoader.js v1.0.0
 * simple asynchronous script and stylesheet loading with callback
 * http://async.soluch.at/
 * ============================================================
 * Copyright 2013, Adrian Soluch - http://soluch.at/
 * Released under the MIT License
 * ============================================================ */

(function (window, doc) {

  asyncLoader = function (urls, options, randomUrl) {
    urls.foreach(function (i, file) {
      var ext = getExtension(file);
      
      if(randomUrl)
        file = getUrl(file);
        
      loadFile(file, ext, options);
    });

    // checking for a callback function
    if (typeof options.callback == 'function') {
      // calling the callback
      var readyStateCheckInterval = setInterval(function () {
          if (doc.readyState === 'complete') {
            clearInterval(readyStateCheckInterval);
            options.callback();
          }
        }, 10);
    }
  };

  var getExtension = function (file) {
    var extension = file.split('.');
    return extension[extension.length - 1];
  },
  loadFile = function (file, ext, options) {
    switch (ext) {
    case 'js':
      loadJs(file, options);
      break;
    case 'css':
      loadCss(file);
      break;
    default:
      break;
    }
  },
  loadJs = function (url, options) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
  },
  loadCss = function (url) {
    var link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = url;
    document.getElementsByTagName('head')[0].appendChild(link);
  },
  getUrl = function (url) {
    url = unescape(url);
    //		var randomNum = Math.floor(Math.random()*100000000);
    var randomNum = 1;
    var symbol = url.indexOf("?") == -1 ? "?" : "&";
    url = url + symbol + "_=" + randomNum;
    return url;
  };
  // simple foreach implementation
  Array.prototype.foreach = function (callback) {
    for (var i = 0; i < this.length; i++) {
      callback(i, this[i]);
    }
  }
})(this, document);