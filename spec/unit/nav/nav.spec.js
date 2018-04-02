'use strict';
let fs = require('fs');
let path = require('path');
let templateHTML = fs.readFileSync(path.join(__dirname, 'nav.test.html')).toString();
let { JSDOM } = require('jsdom');
let { window } = new JSDOM(templateHTML);
let { document } = window;
let assert = require('chai').assert;

let Nav = require('../../../source/_js/nav.js');
describe('Nav', function() {
  const body = document.body;
  let nav;
  let navButton;
  let overlay;

  beforeEach(function() {
    global.$ = require('jquery')(window);
    body.innerHTML = templateHTML;
    Nav.init();
    navButton = document.querySelector('.js-trigger-menu');
    nav = document.querySelector('nav');
    overlay = document.querySelector('#overlay');
    navButton.click();
  });
  afterEach(function() {
    body.innerHTML = '';
  });
  it('should make Nav menu active', function() {
    assert.equal(nav.classList.contains('js-active-menu'), true);
  });
  it('should make Overlay active', function() {
    assert.equal(overlay.classList.contains('js-active'), true);
  });
});
