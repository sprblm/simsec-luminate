const NavLinks = {
  activeColor: () => {
    const currentPage = document.querySelector('main').id;
    const navLinks = document.querySelectorAll('.nav-link');

    Array.from(navLinks).forEach(link => {
      if (link.getAttribute('nav-data') === currentPage) {
        link.classList.add('active-orange');
      } else if (currentPage === 'insight' || currentPage === 'recommendation') {
        if (link.getAttribute('nav-data').includes(currentPage)) {
          link.classList.add('active-blue');
        }
      }
    });
  },
  init() {
    this.activeColor();
  }
}

module.exports = NavLinks;
