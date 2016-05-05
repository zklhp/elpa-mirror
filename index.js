var rp = require('request-promise');
var sd = require('super-download');
var Q = require('q');
var http = require('http');
var _progress = require('cli-progress');


var config = require('./config');

var PARSE_REGEX = /\(([^ ]*) \. \[\((\d*) (\d*)\).*?( tar | single )/g;
var PARSE_LINE_REGEX = /\(([^ ]*) \. \[\((\d*) (\d*)\).*?( tar | single )/;
http.globalAgent.maxSockets = 300; // melpa limit 500

rp(config.ELPA_ARCHIVE_CONTENTS_URL)
  .then(function(data){
    console.log('fetched');
    var lines = data.match(PARSE_REGEX);
    var packages = [];
    for (var i in lines) {
      temp = lines[i].match(PARSE_LINE_REGEX);
      packages.push(
        temp[1] + '-' + temp[2] + '.' + temp[3] + '.' + (temp[4] === ' tar ' ? 'tar' : 'el')
      );
    }
    downloadPackages(packages);
  }).catch(function(err){
    console.log(err);
  });



function downloadPackages(packages){
  var tasks = [];
  var progress = 0;
  tasks.push(sd(config.ELPA_ARCHIVE_CONTENTS_URL, {
    directory: "./packages",
    timeout: 9999999999
  }));
  for (var i in packages) {
    var filename = packages[i];
    var promise =  sd(config.ELPA_URL + filename, {
      directory: "./packages",
      timeout: 9999999999
    });
    promise.filename = filename;
    tasks.push(
      promise
    );
  }

  var bar = new _progress.Bar();
  bar.start(tasks.length, 0);

  Q.all(tasks.map(function(task){
    return task.then(function(){
      progress ++;
      bar.update(progress);
    }).catch(function(err){
      console.log('\n' + task.filename + '\n===\n' + err);
      progress ++;
      bar.update(progress);
    });
  }))
    .then(function(){
      done();
    }).catch(function(err){
      console.log(err);
    });


}
