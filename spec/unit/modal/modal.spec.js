'use strict';
let fs = require('fs');
let path = require('path');
let templateHTML = fs.readFileSync(path.join(__dirname, 'modal.test.html')).toString();
let { JSDOM } = require('jsdom');
let { window } = new JSDOM(templateHTML);
let { document } = window;
let assert = require('chai').assert;

let Modal = require('../../../source/_js/modal.js');

describe('Modal', function() {
  const body = document.body;

  let modalOneOpen;
  let modalOneTarget;
  let modalOneClose;
  let modalTwoOpen;
  let modalTwoTarget;
  let modalClose;
  let overlay;
  let activeModal;

  beforeEach(function() {
    global.$ = require('jquery')(window);
    body.innerHTML = templateHTML;
    Modal.init();
    overlay = document.querySelector('#overlay');
  });
  afterEach(function() {
    body.innerHTML = '';
  });
  it('should open the first modal', function() {
    modalOneOpen = document.querySelector('#modal-1-trigger');
    modalOneTarget = document.querySelector('#modal-1-target');
    modalOneOpen.click();

    assert.equal(overlay.classList.contains('js-active'), true);
    assert.equal(body.classList.contains('js-body-modal-active'), true);
    assert.equal(modalOneTarget.classList.contains('js-active'), true);
  });

  it('should close a modal when clicking on close button', function() {
    modalOneOpen = document.querySelector('#modal-1-trigger');
    modalOneTarget = document.querySelector('#modal-1-target');
    modalOneOpen.click();
    modalOneClose = document.querySelector('.js-close-modal');
    modalOneClose.click();

    assert.equal(overlay.classList.contains('js-active'), false);
    assert.equal(body.classList.contains('js-body-modal-active'), false);
    assert.equal(modalOneTarget.classList.contains('js-active'), false);
  });
  it('should close a modal when clicking on overlay', function() {
    modalOneOpen = document.querySelector('#modal-1-trigger');
    modalOneOpen.click();

    assert.equal(body.classList.contains('js-body-modal-active'), true);

    overlay.click();

    assert.equal(body.classList.contains('js-body-modal-active'), false);
  });
  it('should display the first modal content', function() {
    modalOneOpen = document.querySelector('#modal-1-trigger');
    modalOneTarget = document.querySelector('#modal-1-target');
    modalOneOpen.click();
    activeModal = document.querySelector('.js-active');

    assert.equal(activeModal.getAttribute('id'), 'modal-1-target');
  });
  it('should display the second modal content', function() {
    modalTwoOpen = document.querySelector('#modal-2-trigger');
    modalTwoTarget = document.querySelector('#modal-2-target');
    modalTwoOpen.click();
    activeModal = document.querySelector('.js-active');

    assert.equal(activeModal.getAttribute('id'), 'modal-2-target');
  });
});
