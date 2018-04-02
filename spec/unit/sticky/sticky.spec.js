'use strict';
let fs = require('fs');
let path = require('path');
let templateHTML = fs.readFileSync(path.join(__dirname, 'sticky.test.html')).toString();
let { JSDOM } = require('jsdom');
let { window } = new JSDOM(templateHTML);
let { document } = window;
let assert = require('chai').assert;

let Sticky = require('../../../source/_js/sticky.js');

describe('Sticky', function() {
  const body = document.body;
  let sticky;
  let closeSticky;

  beforeEach(function() {
    global.$ = require('jquery')(window);
    body.innerHTML = templateHTML;
    Sticky.init();
    sticky = document.querySelector('.js-target-sticky');
    closeSticky = document.querySelector('.js-close-sticky');
  });
  afterEach(function() {
    body.innerHTML = '';
  });
  it('should close', function() {
    assert.equal(sticky.classList.contains('js-active'), true);
    closeSticky.click();
    assert.equal(sticky.classList.contains('js-active'), false);
  });
});
