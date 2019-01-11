/* =========================================
  gulp plugins
========================================= */

const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync');
const changed = require('gulp-changed');
const htmlmin = require('gulp-htmlmin');
const gulp = require('gulp');
const gutil = require('gulp-util');
const imagemin = require('gulp-imagemin');
const importCss = require('gulp-import-css');
const minifyCss = require('gulp-minify-css');
const mocha = require('gulp-spawn-mocha');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const shell = require('gulp-shell');
const webpack = require('webpack-stream');
const webpackDevConfig = require('./webpack-dev.config.js');
const webpackProdConfig = require('./webpack-prod.config.js');

/* =========================================
  html
========================================= */

gulp.task('build:html', () =>
  gulp
    .src('_site/**/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('_site/'))
);

/* =========================================
  styles
========================================= */

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

/* =========================================
  images
========================================= */

gulp.task('build:images', () =>
  gulp
    .src('source/images/*')
    .pipe(changed('_site/images'))
    .pipe(imagemin())
    .pipe(gulp.dest('_site/images'))
);

/* =========================================
  scripts
========================================= */

gulp.task('build:scripts:dev', () => {
  return gulp
    .src('source/_js/scripts.js')
    .pipe(plumber())
    .pipe(webpack(webpackDevConfig))
    .pipe(gulp.dest('source/assets/'))
    .pipe(gulp.dest('_site/assets/'))
    .on('error', gutil.log);
});

gulp.task('build:scripts:prod', () =>
  gulp
    .src('source/_js/scripts.js')
    .pipe(plumber())
    .pipe(webpack(webpackProdConfig))
    .pipe(gulp.dest('source/assets/'))
    .pipe(gulp.dest('_site/assets/'))
    .on('error', gutil.log)
);

/* =========================================
 build dev
========================================= */

gulp.task('build:jekyll', shell.task('bundle exec jekyll build --incremental --config _config.yml,_config_dev.yml'));

gulp.task('build:jekyll:dev', gulp.series('build:jekyll', 'build:html'));

gulp.task('build:dev', gulp.series(gulp.series('build:scripts:dev', 'build:styles'), 'build:jekyll', 'build:html'));

/* =========================================
  build prod
========================================= */
gulp.task('jekyll:clean', shell.task(['bundle exec jekyll clean']));

gulp.task('build:jekyll:prod', shell.task('bundle exec jekyll build'));

gulp.task(
  'build:prod',
  gulp.series('jekyll:clean', 'build:scripts:prod', 'build:styles', 'build:images', 'build:jekyll:prod', 'build:html')
);

/* =========================================
  tests
========================================= */

gulp.task(
  'html_proofer',
  shell.task([
    'bundle exec htmlproofer ./_site --allow-hash-href --disable-external --check-favicon --url-swap "/objectively-jekyll-boilerplate|:" --check-html'
  ])
);

gulp.task('test:html', gulp.series('build:jekyll:dev', 'html_proofer'));

gulp.task('test:es-lint', shell.task(['eslint ./source/_js/**/*.js']));

gulp.task('test:mocha', () => gulp.src('spec/**/*.spec.js').pipe(mocha()));

gulp.task('test', done => {
  gulp.parallel('test:html', 'test:es-lint', 'test:mocha');
  done();
});

/* =========================================
  serve
========================================= */

const server = browserSync.create();

function serve(done) {
  server.init({
    server: '_site',
    ghostMode: false,
    logFileChanges: true,
    open: false,
    watchOptions: {
      awaitWriteFinish: true
    }
  });
  done();
}

const watch = () => {
  gulp.watch('source/**/*.scss', gulp.series('build:styles'));
  gulp.watch('source/**/*.js', gulp.series('build:scripts:dev'));
  gulp.watch(['source/**/*.html', '!_site/**/*.*'], gulp.series('build:jekyll:dev'));
  gulp.watch('_data/**.*+(yml|yaml|csv|json)', gulp.series('build:jekyll:dev'));
};

gulp.task('default', gulp.series(serve, 'build:dev', watch));
