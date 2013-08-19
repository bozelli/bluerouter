/* jslint node: true */
'use strict';

module.exports = function(data, res){
    var headers = data.headers;
    var headersObjects = Object.keys(headers);

    for(var i in headersObjects){
        res.header(headersObjects[i], headers[headersObjects[i]]);
    }

    res.send(data.body);
};