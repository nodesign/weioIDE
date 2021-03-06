var fs = require('fs');
var path = require('path');

exports.getProjectsList = function(dir, done) {
    var dirs = [];
    var a = fs.readdir(dir, (err, files) => {
        var i = 0;
        console.log("FILES",files);
        // ignore hidden files
        files = files.filter(item => !(/(^|\/)\.[^\/\.]/g).test(item));
        console.log("FILES",files);
/*
      files.forEach(file => {
          fs.stat(file, (err, stats) => {
              i++;
              //console.log(file + " " + stats.isDirectory());
              if (stats.isDirectory()) dirs.push(file);
              if (i == files.length) {
                  done(null, dirs);
              }
          });
      });
*/
        
        done(null, files);
    });
}

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

exports.inspectFile = function(p, done) {
    data = {};
    fs.lstat(p, (err,d) => {
        if (err) {
            done(err, null); 
        } else {
            if (d.isDirectory()) {
                data.type = "folder";
            } else if (d.isFile()){
                data.type = "file";
                if (getLanguageFromExtension(p)) data.supportedType = true;
                    else data.supportedType = false;
            }
            data.size = d.size;
            done(null, data);
        }
    });
}

exports.getFile = function(p, done) {
    if (getLanguageFromExtension(p) != null) {
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
    } else {
        return done("File extension not supported", null);
    }
}

exports.saveFile = function(p, data, done) {
    console.log(data);
    fs.writeFile(p, data, function(err) {
    if(err) {
        return done(err, null);
    }
    return done(null, "The file was saved!");

    }); 
}


function getLanguageFromExtension(file) {
    var re = /(?:\.([^.]+))?$/;
    var ext = re.exec(file)[1];

    var lang = null;
    if (ext == "py") lang = "python";
    if (ext == "json") lang = "json";
    if (ext == "js") lang = "javascript";
    if ((ext == "htm") || (ext == "html")) lang = "html";
    if (ext == "toml") lang = "toml";
    return lang;
}


// var dirTree = ('/Users/ukicar/workNow/nodesign/WeIO/weio/weioIDE/sandbox/');
//
// diretoryTreeToObj(dirTree, function(err, res){
//     if(err)
//         console.error(err);
//     console.log(JSON.stringify(res, null, 2));
// });

