const InternalPageNav = {
  createDropdownOptions() {
    const headers = document.querySelectorAll('.internal-page-nav');
    const navDropdown = document.querySelector('#internal-page-nav');
    $(headers).each((idx,header) => {
      const newOption = document.createElement('option');
      newOption.value = header.innerHTML;
      newOption.text = header.innerHTML;
      newOption.setAttribute('class', 'internal-page-nav__option');
      newOption.setAttribute('data-target', header.id);
      navDropdown.add(newOption);
    });
  },
  handleDropdownSelect() {
    document.querySelector('.internal-page-nav__container').addEventListener('change', () => {
      const currentTarget = document.querySelectorAll('.internal-page-nav__select > option:checked')[0];
      const dataTarget = currentTarget.getAttribute('data-target');
      $('html, body').animate({
        scrollTop: $(`#${dataTarget}`).offset().top - 55
      });
    });
  },
  getCurrentScroll() {
    window.addEventListener('scroll', () => {
      this.matchDropdownToScrollPosition();
    });
  },
  matchDropdownToScrollPosition() {
    document.querySelectorAll('.internal-page-nav').forEach(header => {
      if (header.getBoundingClientRect().bottom < 300) {
        const currentScroll = header.id;
        document.querySelectorAll('.internal-page-nav__option').forEach((dropdown, idx) => {
          if (currentScroll === dropdown.getAttribute('data-target')) {
            document.querySelector('#internal-page-nav').selectedIndex = idx;
          }
        });
      }
    });
  },
  init() {
    this.createDropdownOptions();
    this.handleDropdownSelect();
    this.getCurrentScroll();
  }
};

module.exports = InternalPageNav;
