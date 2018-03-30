var babel = require('gulp-babel'),
  concat = require('gulp-concat'),
  gulp = require('gulp'),
  gutil = require('gulp-util'),
  plumber = require('gulp-plumber'),
  shell = require('gulp-shell'),
  sourcemaps = require('gulp-sourcemaps'),
  uglify = require('gulp-uglify'),
  webpack = require('webpack-stream');

/////////////////////////// JAVASCRIPT TASKS ///////////////////////////
//sourcemaps, concat, uglify;
module.exports = function() {
  gulp.task('build:scripts:dev', function() {
    return gulp
      .src('source/_js/scripts.js')
      .pipe(plumber())
      .pipe(webpack(require('../../webpack-dev.config.js')))
      .pipe(gulp.dest('source/assets/'))
      .pipe(gulp.dest('_site/assets/'))
      .on('error', gutil.log);
  });
  gulp.task('build:scripts:prod', function() {
    return gulp
      .src('source/_js/scripts.js')
      .pipe(plumber())
      .pipe(webpack(require('../../webpack-prod.config.js')))
      .pipe(gulp.dest('source/assets/'))
      .pipe(gulp.dest('_site/assets/'))
      .on('error', gutil.log);
  });
};
