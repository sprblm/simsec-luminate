const gulp = require('gulp');
const shell = require('gulp-shell');

module.exports = () => {
  gulp.task('jekyll:clean', shell.task(['bundle exec jekyll clean']));

  // jekyll build for production without assets processing
  gulp.task('build:jekyll:prod', shell.task('bundle exec jekyll build'));

  // build for production with full html minification and image optimization
  gulp.task(
    'build:prod',
    gulp.series('jekyll:clean', 'build:scripts:prod', 'build:styles', 'build:images', 'build:jekyll:prod', 'build:html')
  );
};
