var gulp = require('gulp');

// For Development: `gulp` will run `gulp serve`, to build and watch

// For Deployment: `gulp deploy`

require('./gulp/tasks/build_dev')();
require('./gulp/tasks/build_prod')();
require('./gulp/tasks/deploy')();
require('./gulp/tasks/html')();
require('./gulp/tasks/images')();
require('./gulp/tasks/scripts')();
require('./gulp/tasks/serve')();
require('./gulp/tasks/styles')();
require("./gulp/tasks/tests")();
require('./gulp/tasks/watch')();

// DEFAULT
gulp.task('default', ['serve']);
