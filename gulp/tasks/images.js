const changed = require('gulp-changed');
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');

// ///////////////////////// IMAGE TASKS ///////////////////////////
// Optimize tasks
module.exports = () => {
  gulp.task('build:images', () =>
    gulp
      .src('source/images/*')
      .pipe(changed('_site/images'))
      .pipe(imagemin())
      .pipe(gulp.dest('_site/images'))
  );
};
