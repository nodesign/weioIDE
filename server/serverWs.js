var JsonRpcWs = require('json-rpc-ws');

var server = JsonRpcWs.createServer();

server.expose('mirror', function mirror (params, reply) {

    console.log('mirror handler', params);
    reply(null, params);
});

server.start({ port: 8080 }, function started () {
    console.log('Server started on port 8080');
});