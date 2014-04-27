var path = require('path');
var fontina = require('..');

var font = path.join(__dirname, 'fonts-source', 'LeagueGothic-Regular.otf');
var outputDir = path.join(__dirname, 'fonts-output');
fontina(font, outputDir, {error:true, output:true});
 
