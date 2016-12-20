var fs = require('fs');
var toml = require('toml');
var JsonRpcWs = require('json-rpc-ws');
var weioFiles = require('./weioLib/weioFiles.js');
var weioSpawn = require('./weioLib/weioSpawn.js');
var spawnParams = "";

// SYNC OPERATIONS HERE BEFORE SERVER START

// get configuration that will serve some functions here
// don't do this in async way as it's important that all functions
// get these config at start
var config = fs.readFileSync("./server/weioConfig.json", 'utf8');

try {
    config = JSON.parse(config);
} catch (e){
    console.error(e);
    process.exit();
}

var userConf = fs.readFileSync(config.projects.lastOpenedProject+"/projectConfig.toml", 'utf8');

// END SYNC OPERATIONS. ONLY ASYNC FROM NOW ON



var server = JsonRpcWs.createServer();

server.expose('getProjectsList', function getProjectsList(params, reply) {

    var path = config.projects.rootDirectory;
    weioFiles.getProjectsList(path, (err, res) => {
        if(err)
            console.error(err);
        //console.log('mirror handler', params);
        console.log(JSON.stringify(res, null, 2));
        reply(null, JSON.stringify(res));
    });

});

server.expose('getFileTree', function  getFileTree(params, reply) {


    var dirTree = config.projects.rootDirectory+params[0];

    config.projects.lastOpenedProject = dirTree;
    fs.writeFile("./server/weioConfig.json", JSON.stringify(config, null, 4));

    weioFiles.getFileTree(dirTree, (err, res) => {
        if(err)
            console.error(err);
        //console.log('mirror handler', params);
        console.log(JSON.stringify(res, null, 2));
        reply(null, JSON.stringify(res));
    });

});

server.expose('inspectFile', function inspectFile(params, reply) {

    var filename = config.projects.rootDirectory + params[0];
    weioFiles.inspectFile(filename, (err, res) => {
        if(err) {
                reply(err, null);
                console.error(err);
            } else {
                console.log("INSPECTED", res);
                reply(null, JSON.stringify(res));
            }
    });

});

server.expose('getFile', function getFile (params, reply) {

    var filename = config.projects.rootDirectory+params[0];
    weioFiles.getFile(filename, (err, res) => {
        if(err) {
                reply(err, null);
                console.error(err);
            } else {
                reply(null, JSON.stringify(res));
            }
    });

});

server.expose('saveFile', function saveFile (params, reply) {

    var filename = config.projects.rootDirectory + params[0];
    var data = params[1];
    //console.log("SAVE", params[0]);
    weioFiles.saveFile(filename, data, (err, res) => {
        if(err) {
                reply(err, null);
                console.error(err);
            } else {
                reply(null, JSON.stringify(res));
            }
    });

});


// This must be called prior to PLAY
server.expose('readUserConfiguration', function readUserConfiguration (params, reply) {

    try {
        userConf = fs.readFileSync(config.projects.lastOpenedProject+"/projectConfig.toml", 'utf8');

        spawnParams = toml.parse(userConf);
        reply(null, "success");
    } catch (e){
        var reason = "Parsing projectConfig.toml, error on line " + e.line + ", column " + e.column +
        ": " + e.message;
        config.log(reason);
        reply(reason);
    }

});

server.expose('play', function play (params, reply) {

    // if something is still alive than kick it hard with SIGKILL
    //weioSpawn.exterminateProcess();
    console.log("PLAY NOW", config.projects.lastOpenedProject+"/projectConfig.toml");

    try {
        console.log("WILL SPAWN", spawnParams.play.starter);
        weioSpawn.spawnProcess(spawnParams.play.starter, (err, res) => {
            if (err) {
                reply(err, null);
            } else {
                server.send(this.id, "pushToConsole", [res], null);
                console.log(res);
                }
            });
        } catch (e){
            reply("Parsing projectConfig.toml, error on line " + e.line + ", column " + e.column +
            ": " + e.message);
        }
});



server.expose('stop', function stop (params, reply) {
    weioSpawn.killProcess();
    reply(null, JSON.stringify("SIGKILL has been sent"));
});

// SERVER START
server.start({ port: config.server.webSocketServerPort }, function started () {
    console.log('Websocket server started on port ' + config.server.webSocketServerPort);
});