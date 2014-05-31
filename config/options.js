var path = require('path'),
    basePath = path.resolve(__dirname, '..');

module.exports = {
  tmpDir: basePath + '/tmp',
  publicDir: basePath + '/public',
  uploadDir: basePath + '/public/images',
  uploadUrl: '/images/',
  minFileSize: 1,
  maxFileSize: 10485760, // 10MB
  maxPostSize: 10485760, // 10MB
  acceptFileTypes: /.+/i,
  imageTypes: /\.(gif|jpe?g|png|bmp|swf)$/i,
  imageVersions: {
    'thumbnails': {
      width: 80,
      height: 80
    }
  },
  accessControl: {
    allowOrigin: '*',
    allowMethods: 'OPTIONS, HEAD, GET, POST, PUT, DELETE',
    allowHeaders: 'Content-Type, Content-Range, Content-Disposition'
  },
  /*
  ssl: {
    key: '',
    cert: ''
  }
  */
  nodeStatic: {
    cache: 3600
  }
};
