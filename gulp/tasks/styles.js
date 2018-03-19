var autoprefixer = require('gulp-autoprefixer'),
  browserSync = require('browser-sync'),
  gulp = require('gulp'),
  gutil = require('gulp-util'),
  importCss = require('gulp-import-css'),
  minifyCss = require('gulp-minify-css'),
  plumber = require('gulp-plumber'),
  rename = require('gulp-rename'),
  sass = require('gulp-sass');

module.exports = function() {
  gulp.task('build:styles', function() {
    return gulp
      .src('source/_sass/styles.scss')
      .pipe(plumber())
      .pipe(sass())
      .pipe(importCss())
      .pipe(
        autoprefixer({
          browsers: ['last 2 versions', '> 5%', 'IE 9']
        })
      )
      .pipe(minifyCss({ keepBreaks: false }))
      .pipe(rename('style.min.css'))
      .pipe(gulp.dest('source/assets/'))
      .pipe(gulp.dest('_site/assets/'))
      .pipe(browserSync.stream())
      .on('error', gutil.log);
  });
};
