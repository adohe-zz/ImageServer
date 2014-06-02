var options = require('../config/options'),
    fs = require('fs'),
    path = require('path'),
    _existsSync = fs.existsSync || path.existsSync;

function FileInfo (file) {
  this.name = file.name;
  this.size = file.size;
  this.type = file.type;
  this.deleteType = 'DELETE';
}

FileInfo.prototype.initUrl = function (req) {
  if (!this.error) {
    var that = this,
        baseUrl = (options.ssl ? 'https:' : 'http:') +
          '//' + req.headers.host + options.uploadUrl;
    this.url = this.deleteUrl = baseUrl + encodeURIComponent(this.name);
    Object.keys(options.imageVersions).forEach(function (version) {
      if (_existsSync(
          options.uploadDir + '/' + version + '/' + that.name
          )) {
            that[version + 'Url'] = baseUrl + version + '/' +
                encodeURIComponent(that.name);
      }
    });
  }
}

FileInfo.prototype.safeName = function () {
    // prevent directory traversal and creating system hidden files
    this.name = path.basename(this.name).replace(/^\.+/, '');
    while (_existsSync(options.uploadDir + '/' + this.name)) {
    }
}

FileInfo.prototype.validate = function () {
    if (options.minFileSize && options.minFileSize > this.size) {
        this.error = 'File is too small';
    }
    if (options.maxFileSize && options.maxFileSize < this.size) {
        this.error = 'File is too big';
    }
    if (!options.acceptFileTypes.test(this.type)) {
        this.error = 'File type not wrong';
    }

    return !this.error;
}

// Expose the file info module
module.exports = FileInfo;
