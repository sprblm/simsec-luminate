var gulp = require('gulp'),
  mocha = require('gulp-spawn-mocha'),
  shell = require('gulp-shell');

// module.exports = function() {
//   // gulp.task(
//   //   'html_proofer',
//   //   shell.task([
//   //     'bundle exec htmlproofer ./_site --allow-hash-href --disable-external --check-favicon --url-swap "/objectively-jekyll-boilerplate|:" --check-html'
//   //   ])
//   // );
//   // // rebuild _site before testing html
//   // gulp.task('test:html', function() {
//   //   runSequence('build:jekyll:dev', 'html_proofer');
//   // });

//   // gulp.task('test:es-lint', shell.task(['eslint ./source/_js/**/*.js']));

//   // gulp.task('test:mocha', function() {
//   //   return gulp.src('spec/**/*.spec.js').pipe(mocha());
//   // });

//   // gulp.task('test', function() {
//   //   runSequence(['test:html', 'test:es-lint', 'test:mocha']);
//   // });

//   // gulp.task('test:watch', function() {
//   //   runSequence(['test:html', 'test:es-lint', 'test:mocha']);
//   //   gulp.watch('source/**/*.js', ['test:es-lint', 'test:mocha']);
//   //   gulp.watch(['_site/**/*.html'], ['html_proofer']);
//   // });

//   // gulp4 tasks

//   gulp.task(
//     'html_proofer',
//     shell.task([
//       'bundle exec htmlproofer ./_site --allow-hash-href --disable-external --check-favicon --url-swap "/objectively-jekyll-boilerplate|:" --check-html'
//     ])
//   );

//   gulp.task('test:html'.gulp.series('build:jekyll:dev', 'html_proofer'));

//   gulp.task('test:es-lint', shell.task(['eslint ./source/_js/**/*.js']));

//   gulp.task('test:mocha', function() {
//     return gulp.src('spec/**/*.spec.js').pipe(mocha());
//   });

//   gulp.task('test', gulp.series('test:html', 'test:es-lint', 'test:mocha'));

//   gulp.task('test:watch', gulp.series('test:html', 'test:es-lint', 'test:mocha'), function() {
//     gulp.watch('source/**/*.js', ['test:es-lint', 'test:mocha']);
//     gulp.watch(['_site/**/*.html'], ['html_proofer']);
//   });
// };

gulp.task(
  'html_proofer',
  shell.task([
    'bundle exec htmlproofer ./_site --allow-hash-href --disable-external --check-favicon --url-swap "/objectively-jekyll-boilerplate|:" --check-html'
  ])
);

// fix task
// gulp.task('test:html'.gulp.series('build:jekyll:dev', 'html_proofer'));
gulp.task('test:html', done => {
  done();
});

gulp.task('test:es-lint', shell.task(['eslint ./source/_js/**/*.js']));

gulp.task('test:mocha', () => gulp.src('spec/**/*.spec.js').pipe(mocha()));

gulp.task('test', done => {
  gulp.parallel('test:html', 'test:es-lint', 'test:mocha');
  done();
});
