/* jslint node: true */
/* global setup: true, suite: true, test: true */
'use strict';

var assert = require('chai').assert;

suite('routes should', function(){
    var data;

    setup(function(){
        data = {
            "headers": { "Content-Type" : "text/plain" },
            "body": "Hello"
        };
    });

    test('handle route', function(){
        var handleRoute = require('../infrastructure').handleRoute;
        var res = {
            "header": function(){},
            "send": function(param){
                assert.equal('Hello',param);
            }
        };
        handleRoute(data, res);
  });
});