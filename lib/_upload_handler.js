var fs = require('fs'),
    path = require('path'),
    options = require('../config/options'),
    formidable = require('formidable'),
    FileInfo = require('./_file_info');

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
      form = new formidable.IncomingForm(),
      tmpFiles = [],
      map = {},
      files = [];

  form.uploadDir = options.tmpDir;
  form.on('fileBegin', function (name, file) {
      tmpFiles.push(file.path);
      var fileInfo = new FileInfo(file, handler.req, true);
      fileInfo.safeName();
      map[path.basename(file.path)] = fileInfo;
      files.push(fileInfo);
  });
  form.on('field', function (name, value) {
      if (name === '') {
      }
  });
  form.on('file', function (name, file) {
      var fileInfo = map[path.basename(file.path)];
      fileInfo.size = file.size;
      if () {
      }
      fs.renameSync(file.path, options.uploadDir + '/' + fileInfo.name);
      if (options.imageTypes.test(fileInfo.name)) {
          Object.keys(options.imageVersions).forEach(function (version) {
          });
      }
  });
}

UploadHandler.prototype.destroy = function () {
}

// Expose upload handler
module.exports = exports = UploadHandler;
