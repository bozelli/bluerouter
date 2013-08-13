/* jslint node: true */
'use strict';

var request = require('request');
var _       = require('underscore');
var mongodb = require('mongodb');
var format  = require('util').format;
var conf    = require('../configuration.json');

module.exports = function(app){
    app.get('*', function(req, res){
        new GetRoute(req.url, function(err, route){
            if(err){ new SendError(err, res); return; }
            request.get(route, function(err, data){
                if(err){ new SendError(err, res); return; }
                new HandleRoute(data, res);
            });
        });
    });

    app.post('*', function(req, res){
        new GetRoute(req.url, function(err, route){
            request.post(route, function(err, data){
                if(err){ new SendError(err, res); return; }
                new HandleRoute(data, res);
            });
        });
    });

    app.put('*', function(req, res){
        new GetRoute(req.url, function(err, route){
            if(err){ new SendError(err, res); return; }
            request.put(route, function(err, data){
                if(err){ new SendError(err, res); return; }
                new HandleRoute(data, res);
            });
        });
    });

    app.del('*', function(req, res){
        new GetRoute(req.url, function(err, route){
            if(err){ new SendError(err, res); return; }
            request.put(route, function(err, data){
                if(err){ new SendError(err, res); return; }
                new HandleRoute(data, res);
            });
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

function GetRoute(url, callback){
    var urlSplited = url.split('/');
    var urlParam = urlSplited[1];

    if(!urlParam){
        callback('Does not exist parameter.', null);
        return;
    }

    new Routes(function(err, data){
        var route = _.find(data, function(x){ return x.param == urlParam; });

        if(!route){
            callback('route not found', null);
            return;
        }

        var uri = _.rest(urlSplited, 2);

        callback(null, format('%s/%s', route.url, uri));
    });
}

function Routes(callback){
    if(conf.database.active){
        mongodb.connect(process.env.MONGODBCONNECTION || conf.database.connectionString, function(err, mongo){
            if(err){ callback(err, null); return; }
            mongo.collection('routes').find().toArray(function (err, data){
                if(err){
                    callback(err, null);
                }else{
                    callback(null, data);
                }
            });
        });
    }else{
        callback(null, conf.routesWithoutDB);
    }
}

function SendError(err, res){
    res.send({
        "Status": "Error on BlueRoute",
        "Message": err,
    });
}