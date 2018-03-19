var gulp = require('gulp'),
  browserSync = require('browser-sync');

module.exports = function() {
  /////////////////////////// WATCH TASKS ///////////////////////////
  gulp.task('build:jekyll:watch', ['build:jekyll:dev'], function(callback) {
    browserSync.reload();
    callback();
  });
  gulp.task('build:scripts:watch', ['build:scripts'], function(callback) {
    browserSync.reload();
    callback();
  });
};
