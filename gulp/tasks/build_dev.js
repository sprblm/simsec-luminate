const browserSync = require('browser-sync');
const gulp = require('gulp');
const shell = require('gulp-shell');

module.exports = () => {
  // DEV: Jekyll build shell task
  gulp.task('build:jekyll', shell.task('bundle exec jekyll build --incremental --config _config.yml,_config_dev.yml'));

  // DEV: Jekyll build and html minification

  // gulp.task('build:jekyll:dev', function(callback) {
  //   runSequence('build:jekyll', 'build:html', callback);
  // });

  gulp.task('build:jekyll:dev', gulp.series('build:jekyll', 'build:html'));

  // minimal build sequence for development
  //   gulp.task('build:dev', function(callback) {
  //     runSequence(['build:scripts:dev', 'build:styles'], 'build:jekyll', 'build:html', callback);
  //   });
  // };

  gulp.task('build:dev', gulp.series('build:scripts:dev', 'build:styles', 'build:jekyll', 'build:html'));
};
