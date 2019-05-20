const NavLinks = {
  activeColor: () => {
    const currentPage = document.querySelector('main').id;
    const navLinks = document.querySelectorAll('.nav-link');

    Array.from(navLinks).forEach(link => {
      if (link.getAttribute('nav-data') === currentPage) {
        link.classList.add('active-orange');
      } else if (currentPage === 'insight' || currentPage === 'recommendation' || currentPage === 'theme') {
        if (link.getAttribute('nav-data').includes(currentPage)) {
          link.classList.add('active-blue');
        }
      } else if (link.getAttribute('nav-data') === 'themes' && currentPage === 'index') {

        $(window).scroll(() => {
          if ($(window).scrollTop() + 50 >= $('#themes').position().top) {
            link.classList.add('active-orange');
          } else {
            link.classList.remove('active-orange');
          }
        });
      }
    });
  },

  init() {
    this.activeColor();
  }
}

module.exports = NavLinks;
