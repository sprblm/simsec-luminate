const browserSync = require('browser-sync');
const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const HubRegistry = require('gulp-hub');

// For Development: `gulp` will run `gulp serve`, to build and watch

// require('./gulp/tasks/html');

// require('./gulp/tasks/deploy')();
// require('./gulp/tasks/images')();
// require('./gulp/tasks/scripts')();
// require('./gulp/tasks/serve')();
// require('./gulp/tasks/styles')();
// require('./gulp/tasks/tests')();
// require('./gulp/tasks/watch')();
// require('./gulp/tasks/build_dev')();
// require('./gulp/tasks/build_prod')();

// DEFAULT
// gulp.task('default', gulp.series('serve'));

gulp.task('build:html', () =>
  gulp
    .src('_site/**/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('_site/'))
);

/* load some files into the registry */
const hub = new HubRegistry(['gulp/tasks/html.js', 'gulp/tasks/*.js']);

/* tell gulp to use the tasks just loaded */
gulp.registry(hub);

gulp.task('list', done => {
  console.log(hub);
  let tasks = Object.keys(gulp.registry().tasks());
  console.log(JSON.stringify(tasks), null, 2);
  done();
});

// these tasks wont run in separate files due to loading order
// BUILD_DEV
gulp.task('build:jekyll:dev', gulp.series('build:jekyll', 'build:html'));

gulp.task('build:dev', gulp.series(gulp.series('build:scripts:dev', 'build:styles'), 'build:jekyll', 'build:html'));

// BUILD_PROD
gulp.task(
  'build:prod',
  gulp.series('jekyll:clean', 'build:scripts:prod', 'build:styles', 'build:images', 'build:jekyll:prod', 'build:html')
);

// default serve
gulp.task(
  'serve',
  gulp.series('build:dev', () => {
    browserSync.init({
      server: '_site',
      ghostMode: false,
      logFileChanges: true,
      open: false
    });
    gulp.watch('source/**/*.scss', ['build:styles']);
    gulp.watch('source/**/*.js', ['build:scripts:watch']);
    gulp.watch(['source/**/*.html', '!_site/**/*.*'], ['build:jekyll:watch']);
    gulp.watch('_data/**.*+(yml|yaml|csv|json)', ['build:jekyll:watch']);
  })
);

gulp.task('default', gulp.series('serve'));
