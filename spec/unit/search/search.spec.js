'use strict';
let fs = require('fs');
let path = require('path');
let templateHTML = fs.readFileSync(path.join(__dirname, 'search.test.html')).toString();
let { JSDOM } = require('jsdom');
let { window } = new JSDOM(templateHTML);
let { document } = window;
let assert = require('chai').assert;

let Search = require('../../../source/_js/search.js');

describe('Search', function() {
  const body = document.body;
  let overlay;
  let search;
  let form;
  beforeEach(function() {
    global.$ = require('jquery')(window);
    body.innerHTML = templateHTML;
    Search.init();
    search = document.querySelector('.js-trigger-search')
    overlay = document.querySelector('#overlay');
    form = document.querySelector('form');
  });
  afterEach(function() {
    body.innerHTML = '';
  });
  it('should open js-target-search search bar', function() {
    search.click()
    assert.equal(form.classList.contains('js-active'), true);
    assert.equal(overlay.classList.contains('js-active'), true);
  });
});
