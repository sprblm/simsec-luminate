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
  redirectDropdownSelect: () => {
    document.querySelector('.redirect-dropdown-nav').addEventListener('change', (e) => {
      const selectedOption = e.currentTarget.options[e.currentTarget.selectedIndex];
      const urlPath = selectedOption.getAttribute('data-path');

      window.location.pathname = urlPath;
    })
  },
  matchDropdownToPath: () => {
    const pageSelector = document.querySelector('main').getAttribute('data-page');
    const themesDropdown = document.querySelector('.redirect-dropdown-nav');
    const selectedIndex =  document.querySelectorAll(".redirect-dropdown-nav__option[data-page='"+ pageSelector +"']")[0].index;

    themesDropdown.selectedIndex = selectedIndex;
  },
  init() {
    const hasIssuesDropdown = document.querySelector('.redirect-dropdown-nav');
    const pageSelector = document.querySelector('main').getAttribute('data-page');
    this.fixDropdown();
    if (hasIssuesDropdown && pageSelector) {
      this.redirectDropdownSelect();
      this.matchDropdownToPath();
    }
  }
};

module.exports = FixedDropdown;
