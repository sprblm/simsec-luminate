# Copy static site
CWD=`pwd`

# Clone Pages repository
cd /tmp
git clone git@github.com:simplysecure/simsec-luminate.git build
cd build && git checkout -b gh-pages origin/gh-pages
# cd build && git checkout -b YOUR_BRANCH origin/YOUR_BRANCH # If not using master

# Trigger Jekyll rebuild
cd $CWD
bundle exec jekyll contentful
bundle exec jekyll build

# Push newly built repository
cp -r $CWD/_site/* /tmp/build  #or $CWD/_site

cd /tmp/build

git config --global user.email $GH_EMAIL
git config --global user.name $GH_USERNAME

git add .
git commit -m "Automated Rebuild"