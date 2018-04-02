var gulp = require('gulp'),
  runSequence = require('run-sequence').use(gulp),
  mocha = require('gulp-spawn-mocha'),
  shell = require('gulp-shell');

module.exports = function() {
  gulp.task(
    'html_proofer',
    shell.task([
      'bundle exec htmlproofer ./_site --allow-hash-href --disable-external --check-favicon --url-swap "/objectively-jekyll-boilerplate|:" --check-html'
    ])
  );
  // rebuild _site before testing html
  gulp.task('test:html', function() {
    runSequence('build:jekyll:dev', 'html_proofer');
  });

  gulp.task('test:es-lint', shell.task(['eslint ./source/_js/**/*.js']));

  gulp.task('test:mocha', function() {
    return gulp.src('spec/**/*.spec.js').pipe(mocha());
  });

  gulp.task('test', function() {
    runSequence(['test:html', 'test:es-lint', 'test:mocha']);
  });

  gulp.task('test:watch', function() {
    runSequence(['test:html', 'test:es-lint', 'test:mocha']);
    gulp.watch('source/**/*.js', ['test:es-lint', 'test:mocha']);
    gulp.watch(['_site/**/*.html'], ['html_proofer']);
  });
};
