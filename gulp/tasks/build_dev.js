var browserSync = require('browser-sync'),
  gulp = require('gulp'),
  runSequence = require('run-sequence').use(gulp),
  shell = require('gulp-shell');

module.exports = function() {
  // DEV: Jekyll build shell task
  gulp.task('build:jekyll', shell.task('bundle exec jekyll build --incremental --config _config.yml,_config_dev.yml'));

  //DEV: Jekyll build and html minification
  gulp.task('build:jekyll:dev', function(callback) {
    runSequence('build:jekyll', 'build:html', callback);
  });

  // minimal build sequence for development
  gulp.task('build:dev', function(callback) {
    runSequence(['build:scripts:dev', 'build:styles'], 'build:jekyll', 'build:html', callback);
  });
};
