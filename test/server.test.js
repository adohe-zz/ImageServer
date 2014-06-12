"use strict";

var http = require('http'),
    should = require('chai').should(),
    request = require('request'),
    fs = require('fs'),
    requestHandler = require('../lib/_request_handler');

describe('server.test.js', function () {

    before(function (done) {
      http.createServer(requestHandler).listen(8080);
      done();
    });

    describe('#get()', function () {

      it('should get an image', function (done) {
        request('http://127.0.0.1:8080/images/github.jpeg', function (err, response, body) {
          should.not.exist(err);
          response.statusCode.should.equal(200);
          should.exist(body);
          done();
        });
      });

      it('should get 404 when the image not exists', function (done) {
        request('http://127.0.0.1:8080/images/wife.png', function (err, response, body) {
          should.not.exist(err);
          response.statusCode.should.equal(404);
          done();
        });
      });

      it('should get all images', function (done) {
        request('http://127.0.0.1:8080/', function (err, response, body) {
          should.not.exist(err);
          response.statusCode.should.equal(200);
          JSON.parse(body).files.should.have.length(2);
          done();
        });
      });
    });

    describe('#post()', function () {

      /*before(function (done) {
        var options = {
          url: 'http://127.0.0.1:8080/',
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        };
        fs.createReadStream('./test/ask.png').pipe(request.post(options));
        done();
      });

      it('should get the ask.png', function (done) {
        request('http://127.0.0.1:8080/images/ask.png', function (err, response, body) {
          should.not.exist(err);
          response.statusCode.should.equal(200);
          should.exist(body);
          done();
        });
      });*/
    });

    describe('#destroy()', function () {

      it('should return success', function (done) {
        request.del('http://127.0.0.1:8080/images/iphone.png', function (err, response, body) {
          should.not.exist(err);
          response.statusCode.should.equal(200);
          //should.exist(JSON.parse(body).success);
          JSON.parse(body).success.should.equal(true);
          done();
        });
      });

    });
});
