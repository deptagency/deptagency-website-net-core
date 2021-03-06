// @formatter:off

var requireCached     		= require('../src/gulp/require-cached');
var config                  = require('../config');

var changed                 = requireCached('gulp-changed');
var gulp                    = requireCached('gulp');
var gulpIf                  = requireCached('gulp-if');
var imagemin                = requireCached('gulp-imagemin');

// @formatter:on

/**
 * Task for optimizing images (size).
 * @see https://www.npmjs.com/package/gulp-imagemin
 */
gulp.task('images', function () {

    var options = {

        config: {
            optimizationLevel: 3,   // default 3
            progressive: false,     // for JPG, default false
            interlaces: false,      // for GIF, default false
            multipass: false        // for SVG, default false
        }

    };

    return gulp.src( config.source.getFileGlobs( 'images' ) )

        .pipe( changed( config.dest.getPath( 'images' ) ) )                         // Ignore unchanged files
        .pipe( gulpIf( config.optimizeImages, imagemin( options.config ) ) )   // Optimize
        .pipe( gulp.dest( config.dest.getPath( 'images' ) ) );                      // Export

} );
