# ImageServer
![Build Status](https://api.travis-ci.org/AdoHe/ImageServer.png?branch=master)

Node.js based image server.

## Features

* File type validation
* Image resizing
* Cache Control
* URI Generation
* HTTPS Support

## Getting started

First download and install [GraphicsMagick](http://www.graphicsmagick.org/) or [ImageMagick](http://www.imagemagick.org/). In Mac OS X, you can simply use [Homebrew](http://brew.sh/) and do:

```
brew install imagemagick
brew install graphicsmagick
```
if you want WebP support with ImageMagick, you must add the WebP option:

```
brew install imagemagick --with-webp
```
then clone the repo:

```
git clone git@github.com:AdoHe/ImageServer.git
```

## Basic Usage

`Get /images/test.png`

Get the test.png, returns 200 status code on success, otherwise 404.

`Post /`

Upload or post an image to the server. You can use any kind of clients to do this, but must pay 
attention to these:

* Content-Type: multipart/form-data
* Supported Image types: refer the `config/options.js` for supported image types

Returns a JSON array contains the upload image names with files key.

`Delete /images/test.png`

Delete the test.png and related images. Returns `{success: true}` otherwise `{success: false}`.


## Configure

A simple configuration file is placed in `config/options.js`, just modify this to meet your needs.


## Tests

```
$ make test
```

## Contributing

It took me sometime doing this, hope this will help you. If you find anything wrong and you have 
better solutions, you are welcome to send pull requests or open issues:)

## TODO

Use [sharp](https://github.com/lovell/sharp) to do image resizing.

## Licence

(The MIT License)

Copyright (c) 2010 [TonyAdo](https://github.com/AdoHe)

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
