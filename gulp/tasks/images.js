var changed = require('gulp-changed'),
  gulp = require('gulp'),
  imagemin = require('gulp-imagemin');

/////////////////////////// IMAGE TASKS ///////////////////////////
// Optimize tasks
module.exports = function() {
  gulp.task('build:images', function() {
    return gulp
      .src('source/images/*')
      .pipe(changed('_site/images'))
      .pipe(imagemin())
      .pipe(gulp.dest('_site/images'));
  });
};
