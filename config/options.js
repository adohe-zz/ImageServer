module.exports = {
  tmpDir: '',
  publicDir: '',
  uploadDir: '',
  uploadUrl: '/images',
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
    cache: 36000
  }
};
