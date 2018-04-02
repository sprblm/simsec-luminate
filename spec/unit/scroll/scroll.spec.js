'use strict';
let fs = require('fs');
let path = require('path');
let templateHTML = fs.readFileSync(path.join(__dirname, 'scroll.test.html')).toString();
let { JSDOM } = require('jsdom');
let { window } = new JSDOM(templateHTML);
let { document } = window;
let assert = require('chai').assert;

let Scroll = require('../../../source/_js/scroll.js');

const isElAtTop = el => {
  let location = $(el).offset().top - $(window).scrollTop();
  console.log($(el).offset().top);
  return Math.floor(location);
};
describe('Scroll', function() {
  const body = document.body;
  beforeEach(function() {
    global.$ = require('jquery')(window);
    body.innerHTML = templateHTML;
    Scroll.init();
  });
  afterEach(function() {
    body.innerHTML = '';
  });
});
