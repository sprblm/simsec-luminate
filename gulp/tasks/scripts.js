const gulp = require('gulp');
const gutil = require('gulp-util');
const plumber = require('gulp-plumber');
const shell = require('gulp-shell');
const webpack = require('webpack-stream');
const webpackDevConfig = require('../../webpack-dev.config.js');
const webpackProdConfig = require('../../webpack-prod.config.js');

// ///////////////////////// JAVASCRIPT TASKS ///////////////////////////
// sourcemaps, concat, uglify;

gulp.task('build:scripts:dev', () =>
    gulp
        .src('source/_js/scripts.js')
        .pipe(plumber())
        .pipe(webpack(webpackDevConfig))
        .pipe(gulp.dest('source/assets/'))
        .pipe(gulp.dest('_site/assets/'))
        .on('error', gutil.log)
);

gulp.task('build:scripts:prod', () =>
    gulp
        .src('source/_js/scripts.js')
        .pipe(plumber())
        .pipe(webpack(webpackProdConfig))
        .pipe(gulp.dest('source/assets/'))
        .pipe(gulp.dest('_site/assets/'))
        .on('error', gutil.log)
);
