var fs = require('fs');
var path = require('path');

exports.getFileTree = function(dir, done) {

    var results = [];

    fs.readdir(dir, function(err, list) {
        // don't take hidden files here
        list = list.filter(item => !(/(^|\/)\.[^\/\.]/g).test(item));
        if (err)
            return done(err);

        var pending = list.length;

        if (!pending)
            return done(null, {name: path.basename(dir), type: 'folder', children: results});

        list.forEach(function(file) {
            file = path.resolve(dir, file);
            fs.stat(file, function(err, stat) {
                if (stat && stat.isDirectory()) {
                    exports.getFileTree(file, function(err, res) {
                        results.push({
                            label: path.basename(file),
                            type: 'folder',
                            children: res
                        });
                        if (!--pending)
                            done(null, results);
                    });
                }
                else {

                    results.push({
                        type: 'file',
                        label: path.basename(file),
                        language: getLanguageFromExtension(file)
                    }
                        
                    );
                    if (!--pending)
                        done(null, results);
                }
            });
        });
    });
}

exports.getFile = function(p, done) {
    fs.readFile(p, 'utf8', function (err,d) {
      if (err) {
        return done(err, null);
      }
      var f = {
          label:path.basename(p),
          language:getLanguageFromExtension(p),
          data: d
      }
      return done(null,f);
    });
}

function getLanguageFromExtension(file) {
    var re = /(?:\.([^.]+))?$/;
    var ext = re.exec(file)[1];

    var lang = "";
    if (ext == "py") lang = "python";
    if (ext == "json") lang = "json";
    if (ext == "js") lang = "javascript";
    if ((ext == "htm") || (ext == "html")) lang = "html";
    return lang;
}


// var dirTree = ('/Users/ukicar/workNow/nodesign/WeIO/weio/weioIDE/sandbox/');
//
// diretoryTreeToObj(dirTree, function(err, res){
//     if(err)
//         console.error(err);
//     console.log(JSON.stringify(res, null, 2));
// });

