const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync');
const gulp = require('gulp');
const gutil = require('gulp-util');
const importCss = require('gulp-import-css');
const minifyCss = require('gulp-minify-css');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const sass = require('gulp-sass');

// module.exports = () => {
//   gulp.task('build:styles', () =>
//     gulp
//       .src('source/_sass/styles.scss')
//       .pipe(plumber())
//       .pipe(sass())
//       .pipe(importCss())
//       .pipe(
//         autoprefixer({
//           browsers: ['last 2 versions', '> 5%', 'IE 9']
//         })
//       )
//       .pipe(minifyCss({ keepBreaks: false }))
//       .pipe(rename('style.min.css'))
//       .pipe(gulp.dest('source/assets/'))
//       .pipe(gulp.dest('_site/assets/'))
//       .pipe(browserSync.stream())
//       .on('error', gutil.log)
//   );
// };

gulp.task('build:styles', () =>
  gulp
    .src('source/_sass/styles.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(importCss())
    .pipe(
      autoprefixer({
        browsers: ['last 2 versions', '> 5%', 'IE 9']
      })
    )
    .pipe(minifyCss({ keepBreaks: false }))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('source/assets/'))
    .pipe(gulp.dest('_site/assets/'))
    .pipe(browserSync.stream())
    .on('error', gutil.log)
);
