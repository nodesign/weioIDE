var spawn = require('child_process').spawn;

exports.spawnProcess = function(params, done) {
    var exe = params[0];
    var args = params.slice(1,params.length);

    var spawn = require('child_process').spawn,
        proc  = spawn(exe,  args); // use -u for unbuffered python script

    proc.stdout.on('data', function (data) {
      console.log('stdout: ' + data.toString());
      done(null, data.toString());
    });

    proc.stderr.on('data', function (data) {
      console.log('stderr: ' + data.toString());
      done(data.toString());
    });

    proc.on('exit', function (code) {
      console.log('child process exited with code ' + code.toString());
      done(null, 'child process exited with code ' + code.toString());
    });

}
