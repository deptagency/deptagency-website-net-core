// @formatter:off

var requireCached     		= require('../src/gulp/require-cached');
var config                = require('../config');
var log                   = require('../src/debug/log');
var packageJSON           = require('../../package.json');

var browserSync           = requireCached('browser-sync');

var path                  = require('path');
var mkdirp                = requireCached('mkdirp');
var gulp                  = requireCached('gulp');
var glob                  = requireCached('glob');

var exec 									= require('child_process').exec;


//@formatter:on



gulp.task( 'dotnet', function (cb) {

  exec('cd ../backend/Web/D.Website && dotnet build', function (err, stdout, stderr) {
    cb();
    browserSync.reload();
  });

} );
