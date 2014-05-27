var fs = require('fs'),
    options = require('../config/options'),
    formidable = require('formidable');

function UploadHandler (req, res, callback) {
  this.req = req;
  this.res = res;
  this.callback = callback;
}

/**
 * Get all upload files
 *
 */
UploadHandler.prototype.get = function () {
  var handler = this,
      files = [];

  fs.readdir(options.uploadDir, function (err, list) {
    list.forEach(function (name) {
      var stats = fs.statSync(options.uploadDir + '/' + name),
          fileInfo;
      if (stats.isFile() && name[0] !== '0') {
        fileInfo = new FileInfo({
          name: name,
          size: stats.size
        });
        fileInfo.initUrl(handler.req);
        files.push(fileInfo);
      }
    });
    handler.callback({files: files});
  });
}

UploadHandler.prototype.post = function () {
  var handler = this,
      form = new formidable.IncomingForm();
}

UploadHandler.prototype.destroy = function () {
}

// Expose upload handler
module.exports = exports = UploadHandler;
