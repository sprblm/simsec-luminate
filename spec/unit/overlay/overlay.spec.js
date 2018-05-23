'use strict';
let fs = require('fs');
let path = require('path');
let templateHTML = fs.readFileSync(path.join(__dirname, 'overlay.test.html')).toString();
let { JSDOM } = require('jsdom');
let { window } = new JSDOM(templateHTML);
let { document } = window;
let assert = require('chai').assert;

let Overlay = require('../../../source/_js/overlay.js');
describe('Overlay', function() {
  const body = document.body;
  let overlay;

  beforeEach(function() {
    global.$ = require('jquery')(window);
    body.innerHTML = templateHTML;
    Overlay.init();
    overlay = document.querySelector('#overlay');
  });
  afterEach(function() {
    body.innerHTML = '';
  });
  it('should remove js-active and js-menu-active classes on click', function() {
    var jsActive = document.getElementsByClassName('js-active');
    var jsActiveMenu = document.getElementsByClassName('js-active-menu');
    assert.equal(jsActive.length, 3);
    assert.equal(jsActiveMenu.length, 3);

    overlay.click();

    assert.equal(jsActive.length, 0);
    assert.equal(jsActiveMenu.length, 0);
  });
});
