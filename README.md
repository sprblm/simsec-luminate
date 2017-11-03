# objectively-jekyll-boilerplate

### Prerequisites
- [jekyll](https://jekyllrb.com/) 

#### Development
- Add your development url and baseurl in `_config.yml`.
- Fetch and update bundled gems by running `bundle install`
- Fetch and update npm packages by running `npm install`
- Run the server with `bundle exec jekyll serve`. Your server will run at [http://localhost:4000/DEV-BASEURL/](http://localhost:4000/DEV-BASEURL/)
- You can also use gulp for live reloading via browsersync. `gulp` will run at [http://localhost:3000](http://localhost:3000). The gulp build task will use  the blank url and baseurl in `_config_dev.yml`.
  
### Deployment
Add your production url and baseurl in `_config.yml`.

We use [gulp-gh-pages](https://www.npmjs.com/package/gulp-gh-pages) to publish the site to [Github Pages](https://pages.github.com/). The deploy task is defined in `gulpfile.js`, which pushes the compiled _site folder to the gh-pages branch. 

To deploy your site, run `gulp deploy`

#### Troubleshooting Deployment 

The gulp-gh-pages plugin stores a cache of the repo automatically in a `.publish` folder, which throws this error when you try to deploy after deleting your gh-pages branch. 

```
Error in plugin 'gulp-gh-pages'
Message:
    Command failed: git pull  
Your configuration specifies to merge with the ref 'refs/heads/gh-pages'
from the remote, but no such ref was fetched.

Details:
    killed: false
    code: 1
    signal: null
    cmd: git pull  

```

To fix this, delete the `.publish` folder in the root of the directory and then run `gulp deploy` again.

See:
https://github.com/shinnn/gulp-gh-pages/issues/109
