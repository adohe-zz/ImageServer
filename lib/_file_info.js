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
