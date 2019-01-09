const gulp = require('gulp');
const shell = require('gulp-shell');

gulp.task('jekyll:clean', shell.task(['bundle exec jekyll clean']));

gulp.task('build:jekyll:prod', shell.task('bundle exec jekyll build'));

