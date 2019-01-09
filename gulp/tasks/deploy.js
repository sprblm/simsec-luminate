const ghPages = require('gulp-gh-pages');
const gulp = require('gulp');
const shell = require('gulp-shell');

// ///////////////////////// DEPLOY TASKS ///////////////////////////
// module.exports = () => {
//   gulp.task('push-gh-master', shell.task(['git push origin master']));

//   gulp.task('push-gh-pages', () => gulp.src('_site/**/*').pipe(ghPages({ force: true })));

//   gulp.task('deploy', gulp.series('build:prod', 'push-gh-master', 'push-gh-pages'));
// };

gulp.task('push-gh-master', shell.task(['git push origin master']));

gulp.task('push-gh-pages', () => gulp.src('_site/**/*').pipe(ghPages({ force: true })));

// gulp.task('deploy', gulp.series('build:prod', 'push-gh-master', 'push-gh-pages'));
