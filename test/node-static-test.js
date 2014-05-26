var static = require('node-static'),
    options = require('../config/options'),
    fileServer = new static.Server(options.publicDir);

require('http').createServer(function (req, res) {
  req.on('end', function () {
    fileServer.serve(req, res);
  }).resume();
}).listen(8000);
