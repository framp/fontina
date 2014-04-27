exports.escapeShell = function(cmd) {
  return '"' + cmd.replace(/(["\s'$`\\])/g,'\\$1') + '"';
};

exports.getFileName = function(font){
  var match = font.match(/\/([^\/]+)\.[^.]+$/);
  if (match && match[1])
    return match[1];
  return font;
};

exports.getFileExtension = function(font){
  var match = font.match(/\.([^.]+)$/);
  if (match && match[1])
    return match[1];
};

exports.trim = function(str){
  return str.replace(/(^\s+|\s+$)/g, '');
};