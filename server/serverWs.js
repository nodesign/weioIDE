var fs = require('fs');
var toml = require('toml');
var JsonRpcWs = require('json-rpc-ws');
var weioFiles = require('./weioLib/weioFiles.js');
var weioSpawn = require('./weioLib/weioSpawn.js');

// SYNC OPERATIONS HERE BEFORE SERVER START

// get configuration that will serve some functions here
// don't do this in async way as it's important that all functions
// get these config at start
var config = fs.readFileSync("./server/weioConfig.toml", 'utf8');

try {
    config = toml.parse(config);
} catch (e){
    console.error("Parsing error on line " + e.line + ", column " + e.column +
    ": " + e.message);
    process.exit();
}

// END SYNC OPERATIONS. ONLY ASYNC FROM NOW ON

var server = JsonRpcWs.createServer();

server.expose('mirror', (params, reply) => {
    console.log('mirror handler', params);
    reply(null, params);
});

server.expose('getProjectsList', (params, reply) => {

    var path = config.projects.rootDirectory;
    weioFiles.getProjectsList(path, function(err, res){
        if(err)
            console.error(err);
        //console.log('mirror handler', params);
        console.log(JSON.stringify(res, null, 2));
        reply(null, JSON.stringify(res));
    });

});

server.expose('getFileTree', (params, reply) => {

    var dirTree = config.projects.rootDirectory+params[0];
    weioFiles.getFileTree(dirTree, function(err, res){
        if(err)
            console.error(err);
        //console.log('mirror handler', params);
        console.log(JSON.stringify(res, null, 2));
        reply(null, JSON.stringify(res));
    });

});

server.expose('inspectFile', (params, reply) => {

    var filename = config.projects.rootDirectory + params[0];
    weioFiles.inspectFile(filename, function(err, res){
        if(err) {
                reply(err, null);
                console.error(err);
            } else {
                console.log("INSPECTED", res);
                reply(null, JSON.stringify(res));
            }
    });

});

server.expose('getFile', (params, reply) => {

    var filename = config.projects.rootDirectory+params[0];
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

    var filename = config.projects.rootDirectory + params[0];
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

server.expose('play', (params, reply) => {
    console.log(params);
    reply(null, params);
    console.log("SENDING");
    server.send('dddd', ["HJKKLHLJKJKLHKLHJK"], (error, reply) => {
        console.log('mirror reply', reply);
        //console.log(error);
    });
});

// SERVER START
server.start({ port: config.server.webSocketServerPort }, function started () {
    console.log('Websocket server started on port ' + config.server.webSocketServerPort);
});