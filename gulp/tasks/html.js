const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');

// ///////////////////////// HTML TASKS ///////////////////////////
// Minify html, only used in build:prod task
// module.exports = () => {
//   gulp.task('build:html', () =>
//     gulp
//       .src('_site/**/*.html')
//       .pipe(htmlmin({ collapseWhitespace: true }))
//       .pipe(gulp.dest('_site/'))
//   );
// };

gulp.task('build:html', () =>
  gulp
    .src('_site/**/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('_site/'))
);
