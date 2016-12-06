var JsonRpcWs = require('json-rpc-ws');
var weioFiles = require('./weioLib/weioFiles.js')
var server = JsonRpcWs.createServer();

server.expose('mirror', function mirror (params, reply) {

    console.log('mirror handler', params);
    reply(null, params);
});

server.expose('getFileTree', function mirror (params, reply) {

    var dirTree = params[0];
    weioFiles.getFileTree(dirTree, function(err, res){
        if(err)
            console.error(err);
        //console.log('mirror handler', params);
        console.log(JSON.stringify(res, null, 2));
        reply(null, JSON.stringify(res));
    });

});

server.expose('getFile', function mirror (params, reply) {

    var filename = params[0];
    weioFiles.getFile(filename, function(err, res){
        if(err) {
                reply(JSON.stringify("No such file"), null);
                console.error(err);
            } else {
                reply(null, JSON.stringify(res));
            }
    });

});


//console.log(weioFiles.);

server.start({ port: 8080 }, function started () {
    console.log('Server started on port 8080');
});