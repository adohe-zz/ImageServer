var options = require('../config/options'),
    fs = require('fs'),
    path = require('path'),
    _existsSync = fs.existsSync || path.existsSync,
    nameCountRegexp = /(?:(?: \(([\d]+)\))?(\.[^.]+))?$/,
    nameCountFunc = function (s, index, ext) {
      return ' (' + ((parseInt(index, 10) || 0) + 1) + ')' + (ext || '');
    };


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
      this.name = this.name.replace(nameCountRegexp, nameCountFunc);
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
module.exports = exports = FileInfo;
