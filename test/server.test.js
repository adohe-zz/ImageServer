"use strict";

var http = require('http'),
    should = require('chai').should(),
    request = require('request'),
    requestHandler = require('../lib/_request_handler');

describe('server.test.js', function () {

    beforeEach(function (done) {
        http.createServer(requestHandler).listen(8080, function () {
            done();
        });
    });

    describe('#get()', function () {

    });

    describe('#post()', function () {

    });

    describe('#destroy()', function () {

    });

    after(function () {
    });
});
