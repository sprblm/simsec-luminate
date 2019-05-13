const FixedDropdown = {
  fixDropdown: () => {
    const $window = $(window);

    if ($('.fixed-dropdown').length > 0) {
      const $fixedNav = $('.fixed-dropdown');
      const elTop = $fixedNav.offset().top;

      $window.scroll(() => {
        $fixedNav.toggleClass('fixed', $window.scrollTop() > elTop);
      });
    }
  },
  init() {
    this.fixDropdown();
  }
};

module.exports = FixedDropdown;
