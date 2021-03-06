// @formatter:off

var requireCached     		= require('../src/gulp/require-cached');
var config                  = require('../config');
var log                     = require('../src/debug/log');

var path                    = require('path');
var gulp                    = requireCached('gulp');
var modernizr               = requireCached('gulp-modernizr');
var browserSync             = requireCached('browser-sync');
var uglify                  = requireCached('gulp-uglify');
var gulpIf                  = requireCached('gulp-if');

//@formatter:on


/**
 *  Gulp task responsible for compiling the handlebar templates to html.
 *  @see: http://handlebarsjs.com/
 *  @see: https://www.npmjs.com/package/gulp-hb
 */
gulp.task( 'modernizr', function () {


    var options = {

        outputName: 'modernizr-custom.js',

        source: [
            config.dest.getPath( 'css', '*.css' ),
            config.dest.getPath( 'javascript', '*.js' )
        ],

        dest: config.dest.getPath( 'javascript' ),

        modernizr: {

            // Avoid unnecessary builds (see Caching section below)
            cache : true,

            // By default, source is uglified before saving
            uglify: true,

            // Based on default settings on http://modernizr.com/download/
            options: [
                "setClasses",
                //"addTest",
                "html5printshiv"
                //"testProp",
                //"fnBind"
            ],
            excludeTests: ['hidden'] // hidden class triggers a bootstrap utility class that hides the page
        },

        // Minify file with UglifyJS.
        // @see: https://www.npmjs.com/package/gulp-uglify
        minify: config.minify,
        uglifyOptions: {
            mangle: true, // Pass false to skip mangling names.
            preserveComments: false // 'all', 'some', {function}
        }

    }

    // ignore previously build modernizr file if there is one.
    options.source.push(options.dest + '/!' + options.outputName);


    return gulp.src( options.source)

        .pipe( modernizr(options.outputName, options.modernizr) )
        .pipe( gulpIf( options.minify, uglify( options.uglifyOptions ) ) )
        .pipe( gulp.dest( options.dest ) )
        .pipe( browserSync.stream( { once: true } ) );

} );




