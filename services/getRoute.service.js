/* jslint node: true */
'use strict';

var mongodb  = require('mongodb');
var yaml     = require('js-yaml');
var conf     = require('../configuration.yml');

module.exports = function Routes(callback){
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
};