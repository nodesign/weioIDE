var JsonRpcWs = require('json-rpc-ws');
var weioFiles = require('./weioLib/weioFiles.js')
var server = JsonRpcWs.createServer();

server.expose('mirror', (params, reply) => {

    console.log('mirror handler', params);
    reply(null, params);
});

server.expose('getProjectsList', (params, reply) => {

    var path = params[0];
    weioFiles.getProjectsList(path, function(err, res){
        if(err)
            console.error(err);
        //console.log('mirror handler', params);
        console.log(JSON.stringify(res, null, 2));
        reply(null, JSON.stringify(res));
    });

});

server.expose('getFileTree', (params, reply) => {

    var dirTree = params[0];
    weioFiles.getFileTree(dirTree, function(err, res){
        if(err)
            console.error(err);
        //console.log('mirror handler', params);
        console.log(JSON.stringify(res, null, 2));
        reply(null, JSON.stringify(res));
    });

});

server.expose('getFile', (params, reply) => {

    var filename = params[0];
    weioFiles.getFile(filename, function(err, res){
        if(err) {
                reply(err, null);
                console.error(err);
            } else {
                reply(null, JSON.stringify(res));
            }
    });

});

server.expose('saveFile', (params, reply) =>  {

    var filename = params[0];
    var data = params[1];

    weioFiles.saveFile(filename, data, function(err, res){
        if(err) {
                reply(err, null);
                console.error(err);
            } else {
                reply(null, JSON.stringify(res));
            }
    });

});

server.start({ port: 8080 }, function started () {
    console.log('Server started on port 8080');
});