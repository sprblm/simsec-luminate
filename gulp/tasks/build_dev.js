const browserSync = require('browser-sync');
const gulp = require('gulp');
const shell = require('gulp-shell');

gulp.task('build:jekyll', shell.task('bundle exec jekyll build --incremental --config _config.yml,_config_dev.yml'));

