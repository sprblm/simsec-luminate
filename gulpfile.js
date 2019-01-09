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

/* load some files into the registry */
const hub = new HubRegistry(['gulp/tasks/*.js']);

/* tell gulp to use the tasks just loaded */
gulp.registry(hub);

gulp.task('list', done => {
  console.log(hub);
  console.log(Object.keys(gulp.registry().tasks()));
  done();
});
