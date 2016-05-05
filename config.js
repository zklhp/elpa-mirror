var list = {
  melpa: 'http://melpa.org/packages/',
  org: 'http://orgmode.org/elpa/',
  gnu: 'http://elpa.gnu.org/packages/'
};

var parse_packages = {
  melpa: function(content){
    var PARSE_REGEX = /\(([^ ]*) \. \[\((\d*) (\d*)\).*?( tar | single )/g;
    var PARSE_LINE_REGEX = /\(([^ ]*) \. \[\((\d*) (\d*)\).*?( tar | single )/;
    var packages = [];
    var lines = content.match(PARSE_REGEX);
    for (var i in lines) {
      var temp = lines[i].match(PARSE_LINE_REGEX);
      packages.push(
        list.melpa + temp[1] + '-' + temp[2] + '.' + temp[3] + '.' + (temp[4] === ' tar ' ? 'tar' : 'el')
      );
    }
    return packages;
  },
  org: function(content){
    var PARSE_REGEX = /\(([^ ]*) [\s]*\. \[\((\d*)\)/g;
    var PARSE_LINE_REGEX = /\(([^ ]*) [\s]*\. \[\((\d*)\)/;
    var packages = [];
    var lines = content.match(PARSE_REGEX);
    for (var i in lines) {
      var temp = lines[i].match(PARSE_LINE_REGEX);
      packages.push(
        list.org + temp[1] + '-' + temp[2] + '.tar'
      );
    }
    return packages;
  },
  gnu: function(content){
    var PARSE_REGEX = /\(([^ ]*) \.\s*\[\(([\d\s]*)\)[\S\s]*?( single| tar)/g;
    var PARSE_LINE_REGEX = /\(([^ ]*) \.\s*\[\(([\d\s]*)\)[\S\s]*?( single| tar)/;
    var packages = [];
    var lines = content.match(PARSE_REGEX);
    for (var i in lines) {
      var temp = lines[i].match(PARSE_LINE_REGEX);
      packages.push(
        list.gnu + temp[1] + '-' + temp[2].replace(/ /g,'.') + '.' + (temp[3] === ' tar' ? 'tar' : 'el')
      );
    }
    return packages;

  }
}

module.exports = {
  list: list,
  parse_packages: parse_packages
};
