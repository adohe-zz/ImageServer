var options = require('../config/options'),
    nodeStatic = require('node-static'),
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

  switch (req.method) {
    case 'OPTIONS':
      res.end();
      break;
    case 'HEAD':
    case 'GET':
      if (req.url === '/') {
        if (req.method === 'GET') {
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
