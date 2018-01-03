var gulp            = require('gulp'),
    shell           = require('gulp-shell'),
    ghPages         = require('gulp-gh-pages'),
    imagemin        = require('gulp-imagemin'),
    browserSync     = require('browser-sync'),
    cp              = require('child_process'),
    runSequence     = require('run-sequence').use(gulp),
    babel           = require('gulp-babel'),
    webpack         = require('webpack'),
    webpackStream   = require('webpack-stream');

var messages = {
    jekyllBuild: 'building...'
};

gulp.task('webpack', function () {
  return gulp.src('./webpack/entry.js')
    .pipe(webpackStream({
      entry: './webpack/entry.js',
      output: {
        path: __dirname + '/source/js',
        filename: 'bundle.js'
      },
      resolve: {
        extensions: ['.js', '.jsx']
      }
    }, webpack, function (err, stats) {
        console.log(stats.toString({ colors: true }));
    }))
    .pipe(babel())
    .pipe(gulp.dest('./source/js'));
});

// Browser Sync
gulp.task('browserSync', function () {
  browserSync({
    server: {
      baseDir: '_site'
    }
  });
});

gulp.task('image', function () {
  return gulp.src('source/images/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('_site/images'));
});


// Deploy Tasks
gulp.task('build:prod', shell.task(['bundle exec jekyll build']));

gulp.task('push-gh-master', shell.task(['git push origin master']));

gulp.task('push-gh-pages', function () {
  return gulp.src('_site/**/*')
    .pipe(ghPages({ force: true }));
});

gulp.task('deploy', function (callback) {
  runSequence(
    'build:prod',
    'image',
    'push-gh-master',
    'push-gh-pages',
    callback
  );
});

// Dev tasks
gulp.task('jekyll', shell.task(['bundle exec jekyll build --incremental --config _config.yml,_config_dev.yml']));
gulp.task('jekyll-force', shell.task(['bundle exec jekyll build --config _config.yml,_config_dev.yml']));

gulp.task('jekyll-rebuild', ['jekyll'], function () {
    browserSync.reload();
});

gulp.task('sync', function () {
    browserSync.reload();
});

gulp.task('jekyll-rebuild-force', ['jekyll-force'], function () {
    browserSync.reload();
});

gulp.task('watch', function () {
  gulp.watch('source/**/*.*', ['jekyll-rebuild']);
  gulp.watch('source/_data/*.*', ['jekyll-rebuild-force']);
  gulp.watch('./webpack/**/**/*.js', ['webpack']);
});

  gulp.task('default', function (callback) {
  runSequence(
    ['jekyll-rebuild-force', 'watch', 'browserSync', 'webpack'],
    callback
  )
});
