var static = require('node-static'),
    fileServer = new static.Server('../public');

require('http').createServer(function (req, res) {
  req.on('end', function () {
    fileServer.serve(req, res);
  }).resume();
}).listen(8000);
