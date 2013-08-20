/* jslint node: true */
'use strict';

var _               = require('underscore');
var format          = require('util').format;
var request         = require('request');
var handleRoute     = require('../infrastructure').handleRoute;
var getRouteService = require('../services').getRoute;

module.exports = function(app){
    app.get('*', function(req, res){
        GetRoute(req.url, function(err, route){
            if(err){ SendError(err, res); return; }
            request.get(route, function(err, data){
                if(err){ SendError(err, res); return; }
                handleRoute(data, res);
            });
        });
    });

    app.post('*', function(req, res){
        GetRoute(req.url, function(err, route){
            request.post(route, function(err, data){
                if(err){ SendError(err, res); return; }
                handleRoute(data, res);
            });
        });
    });

    app.put('*', function(req, res){
        GetRoute(req.url, function(err, route){
            if(err){ SendError(err, res); return; }
            request.put(route, function(err, data){
                if(err){ SendError(err, res); return; }
                handleRoute(data, res);
            });
        });
    });

    app.del('*', function(req, res){
        GetRoute(req.url, function(err, route){
            if(err){ SendError(err, res); return; }
            request.put(route, function(err, data){
                if(err){ SendError(err, res); return; }
                handleRoute(data, res);
            });
        });
    });
};

function GetRoute(url, callback){
    var urlSplited = url.split('/');
    var urlParam = urlSplited[1];

    if(!urlParam){
        callback('Does not exist parameter.', null);
        return;
    }

    getRouteService(function(err, data){
        var route = _.find(data, function(x){ return x.param === urlParam; });

        if(!route){
            callback('route not found', null);
            return;
        }

        var uri = _.rest(urlSplited, 2);

        callback(null, format('%s/%s', route.url, uri));
    });
}

function SendError(err, res){
    res.send({
        "Status": "Error on BlueRoute",
        "Message": err
    });
}