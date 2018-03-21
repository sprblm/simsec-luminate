var gulp = require("gulp"),
  shell = require("gulp-shell");

module.exports = function() {
  gulp.task("html_proofer", shell.task([
      'bundle exec htmlproofer ./_site --allow-hash-href --disable-external --check-favicon --url-swap "/objectively-jekyll-boilerplate|:" --check-html'
    ]));
}
// bundle exec htmlproofer ./_site --allow-hash-href --check-favicon --check-html --disable-external

// bundle exec htmlproofer ./_site --http-status-ignore "999" --url-swap "wow:cow,mow:doh" --check-html
 

// bundle exec htmlproofer ./_site --url-swap "\/objectively-jekyll-boilerplate|:" --check-html