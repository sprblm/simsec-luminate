const Nav = {
  mainMenu() {
    // Main Menu Click Behavior
    $('.js-trigger-menu').click(e => {
      $(e.currentTarget)
        .next()
        .addClass('js-active-menu');
      $('#overlay').addClass('js-active');
    });
  },
  init() {
    this.mainMenu();
  }
};

module.exports = Nav;
