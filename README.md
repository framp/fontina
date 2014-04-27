#fontina

Fontina make your fonts ready for @font-face.

A stylesheet will be created as well.

##Requirements

You should install:

 - Fontforge:   http://fontforge.sourceforge.net/
 - ttf2eot:     http://code.google.com/p/ttf2eot/)
 - sfnt2woff:   http://people.mozilla.com/~jkew/woff/

##Usage
    var fontina = require('fontina');
    var options = {};
    fontina('./fonts/font.ttf', './public/fonts', options);

Fontina will do the rest.

The options object can be configured as follow:

    {
      force: false,   // if true the file extension won't be checked
      output: false,  // if true the output from the tool will be printed
      error: false,   // if true the errors from the tool will be printed
      cwd: null       // current directory from which the tool are run
    }
    
Check out grunt-fontina()
    
##Why

I've always hated using an external service just to get my font ready.

It breaks your workflow and you have to do it every time you add a font.

##License
MIT
