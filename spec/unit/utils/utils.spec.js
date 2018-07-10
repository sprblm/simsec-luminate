'use strict';

let fs = require('fs');
let path = require('path');
let templateHTML = fs.readFileSync(path.join(__dirname, 'utils.test.html')).toString();
let { JSDOM } = require('jsdom');
let { window } = new JSDOM(templateHTML);
let { document } = window;
let assert = require('chai').assert;

let Utils = require('../../../source/_js/utils.js');

describe('Utils', function() {
  const body = document.body;

  beforeEach(function() {
    global.$ = require('jquery')(window);
    body.innerHTML = templateHTML;
  });

  describe('markdownLinksNewPage', function() {
    it('open markdown rendered links in a new page', function() {
      let notMarkdownLink = document.getElementById('not_markdown');
      let markdownLink = document.getElementById('markdown');

      assert.equal(notMarkdownLink.getAttribute('target'), null);
      assert.equal(markdownLink.getAttribute('target'), null);
      Utils.markdownLinksNewPage();
      assert.equal(notMarkdownLink.getAttribute('target'), null);
      assert.equal(markdownLink.getAttribute('target'), '_blank');
    });
  });
});
