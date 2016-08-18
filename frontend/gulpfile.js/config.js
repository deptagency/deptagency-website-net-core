// @formatter:off

var PathConfig          = require('./src/data/path-config');
var processArguments    = require( './src/node/process-arguments' );
var packageJSON         = require('../package.json');



var config              = {};
config.name             = packageJSON.name;
config.version          = packageJSON.version;

config.cleanBuild       = false;
config.debug            = true;
config.notifyError      = true;
config.throwError       = false;    			// Actually throws an (native) error when one occurs, useful for bamboo.

config.minify           = false;
config.optimizeImages   = true;
config.sourcemaps       = true;
config.cleanCSS         = false;    			// removes unused CSS, requires 'gulp-uncss' installation.
config.prettyHTML       = false;
config.minifyHTML       = true;    			// requires 'gulp-htmlmin' installation.

config.gulp             = {
                            debug: false,       // if true, gulp will output a lot of extra information for debugging purposes.
                            lazy: false,         // will only load the tasks in the 'gulp/tasks' folder, just before they are used.
                            verbose: false      // Output extra information during the process.
                        };

// Assign process arguments.
// To use process arguments add '--[key] [value]' to the command.
// If the value is omitted, the value true will be assigned to the key.
config.applyProcessArgs = function  (  ) {

    if( processArguments.has( 'clean' ) )       config.cleanBuild  = processArguments.get( 'clean' );
    if( processArguments.has( 'verbose' ) )     config.verbose     = processArguments.get( 'verbose' );
    if( processArguments.has( 'debug' ) )       config.gulp.debug  = processArguments.get( 'debug' );

}



/**
 *  Defines source & destination folders layout and source files.
 *  Creates an object that parses lo-dash templates on itself.
 *  To retrieve a path use the 'getPath' method.
 *  To retrieve a file glob use the 'getFileGlob' method.
 *
 *  for example: The following script returns the path for the source location of the css (sass) files.
 *
 *  config.dest.getPath('css');
 */
var source      = config.source     = new PathConfig();
var dest        = config.dest       = new PathConfig();

source.root                         = { path: './source' };
source.bower                        = { path: './bower_components' };
source.npm                          = { path: './node_modules' };
source.assets                       = { path: '<%= root %>/assets' };
source.html                         = { path: '<%= root %>/html',           files: '*.html'   };                    // entry point files
source.dotnet                       = { path: '../backend/Web/D.Website',   files: [ '*.cs', '*.cshtml', '**/*.cs', '**/*.cshtml'] 	};		                // entry point files
source.javascript                   = { path: '<%= root %>/javascript',     files: '*.js' 		};		                // entry point files
source.css                          = { path: '<%= root %>/sass',           files: [ '*.scss', '_dev/*.scss']   };      // entry point files
source.data                         = { path: '<%= root %>/data',           files: [ '*.json', '**/*.json' ] 	};
source.images                       = { path: '<%= assets %>/images',       files: [ '*.{jpg,jpeg,png,gif,svg}', '**/*.{jpg,jpeg,png,gif,svg}' ] };
source.svg                          = { path: '<%= assets %>/svg',          files: [ '*.svg', '**/*.svg' ] };


dest.root                           = { path: '../backend/Web/D.Website/wwwroot' };
dest.assets                         = { path: '<%= root %>' };
dest.html                           = { path: '<%= root %>/html' };
dest.css                            = { path: '<%= assets %>/css' };
dest.javascript                     = { path: '<%= assets %>/js' };
dest.images                         = { path: '<%= assets %>/images' };
dest.fonts                          = { path: '<%= assets %>/fonts' };
dest.svg                            = { path: '<%= assets %>/svg' };


module.exports                      = config;
