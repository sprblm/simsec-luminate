const Sticky = {
  closeSticky() {
    $('.js-close-sticky').click(() => {
      $('.js-target-sticky').removeClass('js-active');
    });
  },
  init() {
    this.closeSticky();
  }
};

module.exports = Sticky;
