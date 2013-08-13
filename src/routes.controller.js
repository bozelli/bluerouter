/* jslint node: true */
'use strict';

var request = require('request'),
    _       = require('underscore'),
    format  = require('util').format,
    conf    = require('../configuration.json');

module.exports = function(app){
    app.get('*', function(req, res){
        request.get(GetRoute(req.url), function(err, data){
            if(!err){
               new HandleRoute(data, res);
            }else{
                res.send(conf.errorMessage);
            }
        });
    });

    app.post('*', function(req, res){
        request.post(GetRoute(req.url), function(err, data){
            if(!err){
               new HandleRoute(data, res);
            }else{
                res.send(conf.errorMessage);
            }
        });
    });

    app.put('*', function(req, res){
        request.put(GetRoute(req.url), function(err, data){
            if(!err){
               new HandleRoute(data, res);
            }else{
                res.send(conf.errorMessage);
            }
        });
    });

    app.delete('*', function(req, res){
        request.delete(GetRoute(req.url), function(err, data){
            if(!err){
               new HandleRoute(data, res);
            }else{
                res.send(conf.errorMessage);
            }
        });
    });
};

function HandleRoute(data, res){
    var headers = data.headers;
    var headersObjects = Object.keys(headers);

    for(var i in headersObjects){
        res.header(headersObjects[i], headers[headersObjects[i]]);
    }

    res.send(data.body);
}

function GetRoute(url){
    var urlSplited = url.split('/');
    var urlParam = urlSplited[1];
    var routes = conf.routes;

    if(!urlParam) return '';

    var route = _.find(routes, function(x){ return x.param == urlParam; });

    if(!route) return '';

    var uri = _.rest(urlSplited, 2);

    return format('%s/%s', route.url, uri);
}