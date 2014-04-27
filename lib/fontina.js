var fs = require('fs');
var path = require('path');
var async = require('async');
var exec = require('child_process').exec;

var commands = require('./commands');
var utils = require('./utils');

var templatePath = path.join(__dirname, '..', 'template.css');
var cssTemplate = fs.readFileSync(templatePath, { encoding: 'utf8' });

var fontina = function(font, outputDir, options){
  options = options || {};
  
  var extension = utils.getFileExtension(font);
  if (fontina.supported.indexOf(extension)===-1 && !options.force)
    return false;
  
  var fontforgeConvert = commands.fontforgeConvert(font, outputDir);
  var fontforgeName = commands.fontforgeName(font, outputDir);
  var ttf2eot = commands.ttf2eot(font, outputDir);
  var sfnt2woff = commands.sfnt2woff(font, outputDir);
  
  async.parallel([
    async.series.bind(null, [
      execProcess.bind(null, fontforgeConvert, options),
      async.parallel.bind(null, [
        execProcess.bind(null, ttf2eot, options),
        execProcess.bind(null, sfnt2woff, options)
      ])
    ]),
    async.waterfall.bind(null, [
      execProcess.bind(null, fontforgeName, options, true),
      createStylesheet.bind(null, font, outputDir, options)    
    ])
  ], options.callback);  
};

fontina.supported = ['ttf', 'otf', 'svg', 'woff'];

function execProcess(command, options, returnStdout, callback){
  if (typeof(returnStdout) === "function"){
    callback = returnStdout;
    returnStdout = undefined;
  }
  var proc = (options.__exec || exec)(command, { cwd: options.cwd });
  var buffer = '';
  if (options.output)
    proc.stdout.pipe(process.stdout);
  if (options.error)
    proc.stderr.pipe(process.stderr);
  if (returnStdout){
    proc.stdout.on('data', function(data){
      buffer += data;
    });
  }
  proc.on('close', function (code) {
    if (callback)
      callback(null, returnStdout ? buffer : undefined);
  });
  return proc;
}

function createStylesheet(font, outputDir, options, fontName, callback){
  var fileName = utils.getFileName(font);
  var name = utils.trim(fontName) || fileName;
  var stream = fs.createWriteStream(path.join(outputDir, fileName + '.css'));
  stream.once('open', function() {
    stream.write(cssTemplate.replace(/\{name\}/g, name));
    stream.end();
  });
  stream.on('end', function(){
    if (callback)
      callback();
  });
};

module.exports = fontina;