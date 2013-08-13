#!/usr/bin/env node
/* jslint node: true */
'use strict';

/**
 * Module dependencies.
 */
var express  = require('express'),
    http     = require('http'),
    path     = require('path'),
    format   = require('util').format,
    app      = express();

/**
 * Express Configuration.
 */
app.set('port', process.env.PORT || 8050);
app.disable('x-powered-by');
app.use(express.favicon());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.logger('dev'));
require('./src/routes.controller.js')(app);

/**
 * Development only.
 */
if ('development' === app.get('env')) {
    app.use(express.errorHandler());
}

/**
 * Start Server.
 */
http.createServer(app).listen(app.get('port'), function(){
    console.info(format('\n- \u001b[32mBlueOri Router\u001b[0m at \u001b[4mhttp://localhost:%s\u001b[0m\n', app.get('port')));
});