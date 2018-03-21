var babel = require('gulp-babel'),
  concat = require('gulp-concat'),
  gulp = require('gulp'),
  gutil = require('gulp-util'),
  plumber = require('gulp-plumber'),
  sourcemaps = require('gulp-sourcemaps'),
  uglify = require('gulp-uglify');

/////////////////////////// JAVASCRIPT TASKS ///////////////////////////
//sourcemaps, concat, uglify;
module.exports = function() {
  gulp.task('build:scripts', function() {
    return gulp
      .src('source/_js/**/*.js')
      .pipe(plumber())
      .pipe(babel({ presets: ['env'] }))
      .pipe(sourcemaps.init())
      .pipe(concat('scripts.js'))
      .pipe(uglify())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('source/assets/'))
      .pipe(gulp.dest('_site/assets/'))
      .on('error', gutil.log);
  });
};
