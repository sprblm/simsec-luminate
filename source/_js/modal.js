const Modal = {
  openModal: () => {
    $('.js-open-modal').click(e => {
      $(e.currentTarget)
        .parent()
        .find('.js-target-modal')
        .addClass('js-active');

      $('#overlay').addClass('js-active');
      $('body').addClass('js-body-modal-active');
    });
  },
  closeModal: () => {
    $('body').on('click', '.js-close-modal', () => {
      $('.js-target-modal').removeClass('js-active');
      $('#overlay').removeClass('js-active');
      $('body').removeClass('js-body-modal-active');
    });
  },
  clickOverlayCloseModal: () => {
    $('#overlay').click(() => {
      $('body').removeClass('js-body-modal-active');
    });
  },
  init() {
    this.openModal();
    this.closeModal();
    this.clickOverlayCloseModal();
  }
};

module.exports = Modal;
