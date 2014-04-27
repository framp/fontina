var path = require('path');
var utils = require('./utils');

var convertScript = '-script "' + path.join(__dirname, 'convert.pe')+ '"';
var nameScript = '-script "' + path.join(__dirname, 'getName.pe')+ '"';

exports.fontforgeConvert = function(font, outputDir){
  var executable = 'fontforge';
  var args = [font, outputDir].map(utils.escapeShell).join(' ');
  return [executable, convertScript, args].join(' ');
};


exports.fontforgeName = function(font, outputDir){
  var executable = 'fontforge';
  var args = [font, outputDir].map(utils.escapeShell).join(' ');
  return [executable, nameScript, args].join(' ');
};

exports.sfnt2woff = function(font, outputDir){
  var executable = 'sfnt2woff';
  var extension = '.otf'; 
  font = path.join(outputDir, utils.getFileName(font) + extension);
  var args = utils.escapeShell(font);
  return [executable, args].join(' ');
};

exports.ttf2eot = function(font, outputDir){
  var executable = 'bash -c \'ttf2eot';
  var extIn = '.ttf';
  var extOut = '.eot';
  var ending = '\'';
  font = path.join(outputDir, utils.getFileName(font));
  var args = [font + extIn, font + extOut].map(utils.escapeShell);
  args.splice(1, 0, '>');
  args = args.join(' ');
  return [executable, args].join(' ') + ending;
};