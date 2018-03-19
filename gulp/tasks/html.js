var gulp = require('gulp'),
  htmlmin = require('gulp-htmlmin');
/////////////////////////// HTML TASKS ///////////////////////////
//Minify html, only used in build:prod task
module.exports = function() {
  gulp.task('build:html', function() {
    return gulp
      .src('_site/**/*.html')
      .pipe(htmlmin({ collapseWhitespace: true }))
      .pipe(gulp.dest('_site/'));
  });
};
