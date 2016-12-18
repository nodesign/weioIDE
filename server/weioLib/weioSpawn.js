var spawn = require('child_process').spawn;
var proc = null;

exports.spawnProcess = function(params, done) {
    
    var exe = params[0];
    var args = params.slice(1,params.length);
    
    var spawn = require('child_process').spawn;
    proc = spawn(exe, args); // use ALWAYS UNBUFFERED stdout here

    proc.stdout.on('data', function (data) {
      console.log('stdout: ' + data.toString());
      done(null, data.toString());
    });

    proc.stderr.on('data', function (data) {
      console.log('stderr: ' + data.toString());
      done(data.toString());
    });

    proc.on('exit', function (code) {
        if (code != null) {
            console.log('child process exited with code ' + code.toString());
            done(null, 'child process exited with code ' + code.toString());
        }
    });

}

// first this one
exports.killProcess = function() { // JUST SIGTERM
    console.log("killing it");

    try {
        process.kill(proc.pid,"SIGTERM"); // SIGTERM
    } catch (e) {
        console.log(e);
    }

}

// if still alive than force it
exports.exterminateProcess = function() { // FUCK HIM HARD DANNY, SIGKILL
    console.log("killing it hard");
    try {
        process.kill(proc.pid, "SIGKILL"); // SIGKILL
    } catch (e) {
        console.log(e);
    }
}