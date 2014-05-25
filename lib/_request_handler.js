var options = require('../config/options'),
    nodeStatic = require('node-static'),
    UploadHandler = require('./_upload_handler'),
    fileServer = new nodeStatic.Server(options.publicDir, options.nodeStatic);

module.exports = function (req, res) {

  // Set headers
  res.setHeader(
      'Access-Control-Allow-Origin',
      options.accessControl.allowOrigin
  );

  res.setHeader(
      'Access-Control-Allow-Methods',
      options.accessControl.allowMethods
  );

  res.setHeader(
      'Access-Control-Allow-Headers',
      options.accessControl.allowHeaders
  );

  var setNoCacheHeaders = function () {
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Cache-Control', 'private, no-cache, no-store, max-age=0, must-revalidate');
        res.setHeader('Expires', '0');
        res.setHeader('Content-Disposition', 'inline; filename="files.json"');
      },
      handleResult = function () {
      },
      handler = new UploadHandler(req, res, handleResult);

  switch (req.method) {
    case 'OPTIONS':
      res.end();
      break;
    case 'HEAD':
    case 'GET':
      if (req.url === '/') {
        setNoCacheHeaders();
        if (req.method === 'GET') {
          handler.get();
        } else {
          res.end();
        }
      } else {
        fileServer.serve(req, res);
      }
      break;
    case 'POST':
      break;
    case 'DELETE':
      break;
    default:
      res.statusCode = 405;
      res.end();
  }
}
