var fs = require('fs'),
    gm = require('gm');

// obtain the size of an image
gm('../public/dear.jpg')
  .size(function (err, size) {
    if (!err) {
      console.log(size.width + ':' + size.height);
    }
  });

// output all image properties
gm('../public/dear.jpg')
  .identify(function (err, data) {
    if (!err) {
      console.log(data);
    }
  });
