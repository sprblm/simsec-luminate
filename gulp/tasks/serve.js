const gulp = require('gulp');
const browserSync = require('browser-sync');

// module.exports = () => {
//   // Run browserSync server and watch source files for changes
//   gulp.task(
//     'serve',
//     gulp.series('build:dev', () => {
//       browserSync.init({
//         server: '_site',
//         ghostMode: false,
//         logFileChanges: true,
//         open: false
//       });
//       gulp.watch('source/**/*.scss', ['build:styles']);
//       gulp.watch('source/**/*.js', ['build:scripts:watch']);
//       gulp.watch(['source/**/*.html', '!_site/**/*.*'], ['build:jekyll:watch']);
//       gulp.watch('_data/**.*+(yml|yaml|csv|json)', ['build:jekyll:watch']);
//     })
//   );
// };

