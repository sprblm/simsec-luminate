/* =========================================
  gulp plugins
========================================= */

const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync');
const cleanCSS = require('gulp-clean-css');
const ghPages = require('gulp-gh-pages');
const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
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
    .pipe(
      autoprefixer({
        browsers: ['last 2 versions', '> 5%', 'IE 9']
      })
    )
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('source/assets/'))
    .pipe(gulp.dest('_site/assets/'))
    .pipe(browserSync.stream())
);

/* =========================================
  images
========================================= */

/* =========================================
  scripts
========================================= */

gulp.task('build:scripts:dev', () =>
  gulp
    .src('source/_js/scripts.js')
    .pipe(plumber())
    .pipe(webpack(webpackDevConfig))
    .pipe(gulp.dest('source/assets/'))
    .pipe(gulp.dest('_site/assets/'))
    // .pipe(browserSync.stream())
);

gulp.task('build:scripts:prod', () =>
  gulp
    .src('source/_js/scripts.js')
    .pipe(plumber())
    .pipe(webpack(webpackProdConfig))
    .pipe(gulp.dest('source/assets/'))
    .pipe(gulp.dest('_site/assets/'))
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
  gulp.series('jekyll:clean', 'build:scripts:prod', 'build:styles', 'build:jekyll:prod', 'build:html')
);

/* =========================================
  tests
========================================= */

gulp.task(
  'html_proofer',
  shell.task([
    'bundle exec htmlproofer ./_site --allow-hash-href --disable-external --check-favicon --url-swap "/simsec-luminate|:" --check-html'
  ])
);

gulp.task('test:html', gulp.series('build:jekyll:dev', 'html_proofer'));

gulp.task('test:es-lint', shell.task(['eslint ./source/_js/**/*.js']));

gulp.task('test:mocha', () => gulp.src('spec/**/*.spec.js').pipe(mocha()));

gulp.task('test', gulp.series('test:html', 'test:es-lint', 'test:mocha'), done => {
  done();
});

/* =========================================
  deploy
========================================= */

gulp.task('circleci', () => gulp.src('.circleci/config.yml').pipe(gulp.dest('_site/.circleci/')))

gulp.task('push-gh-master', shell.task(['git push origin master']));

gulp.task('push-gh-pages', () => gulp.src('_site/**/*', { dot: true }).pipe(ghPages({ force: true })));

gulp.task('deploy', gulp.series('build:prod', 'circleci', 'push-gh-master', 'push-gh-pages'));

/* =========================================
  serve
========================================= */

// BrowserSync Reload
function browserSyncReload(done) {
  browserSync.reload();
  done();
}

gulp.task('build:jekyll:watch', gulp.series('build:jekyll:dev'), done => {
  browserSync.reload();
  done();
});
gulp.task('build:scripts:watch', gulp.series('build:scripts:dev'), done => {
  browserSync.reload();
  done();
});

gulp.task('serve', done => {
  browserSync.init({
    server: '_site',
    ghostMode: false,
    logFileChanges: true,
    open: false
  });
  gulp.watch('source/**/*.scss', gulp.series('build:styles'));
  gulp.watch('source/_js/*.js', gulp.series('build:scripts:dev', browserSyncReload));
  gulp.watch(['source/**/*.html', '!_site/**/*.*'], gulp.series('build:jekyll:dev', browserSyncReload));
  gulp.watch('_data/**.*+(yml|yaml|csv|json)', gulp.series('build:jekyll:dev', browserSyncReload));
  done();
});

gulp.task('default', gulp.series('build:dev','serve'));
