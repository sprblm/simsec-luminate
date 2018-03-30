const Overlay = {
  onClickOverlay() {
    $('#overlay').click(() => {
      $('.js-active').removeClass('js-active');
      $('.js-active-menu').removeClass('js-active-menu');
    });
  },
  init() {
    this.onClickOverlay();
  }
};

module.exports = Overlay;
