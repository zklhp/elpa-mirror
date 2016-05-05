var rp = require('request-promise');
var sd = require('super-download');
var Q = require('q');
var http = require('http');

var ELPA_LIST = require('./config').list;
var parse_packages = require('./config').parse_packages;

var ARCHIVE_CONTENTS = 'archive-contents';

http.globalAgent.maxSockets = 300;


function fetchElpa(elpa){
  rp(ELPA_LIST[elpa] + ARCHIVE_CONTENTS)
    .then(function(data){
      console.log(elpa + ' fetched');
      var packages = parse_packages[elpa](data);
      downloadPackages(packages, elpa);
    }).catch(function(err){
      console.log(err);
    });
}

for (var name in ELPA_LIST) {
  fetchElpa(name);
}



function downloadPackages(packages, elpa){
  var tasks = [];
  var progress = 0;
  tasks.push(sd(ELPA_LIST[elpa] + ARCHIVE_CONTENTS, {
    directory: 'packages/' + elpa,
    timeout: 9999999999
  }));
  for (var i in packages) {
    var filename = packages[i];
    var promise =  sd(filename, {
      directory: "packages" + elpa,
      timeout: 9999999999
    });
    promise.filename = filename;
    tasks.push(
      promise
    );
  }

  function done(){
    console.log(elpa + 'DONE');
  }

  Q.all(tasks.map(function(task){
    return task.then(function(){
      progress ++;
      console.log(elpa + progress + '/' + tasks.length);
    }).catch(function(err){
      console.log('\n' + task.filename + '\n===\n' + err);
      progress ++;
      console.log(elpa + progress + '/' + tasks.length);
    });
  }))
    .then(function(){
      done();
    }).catch(function(err){
      console.log(err);
    });

}
