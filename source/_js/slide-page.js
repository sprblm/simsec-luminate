const SlidePage = {
  slidePage: () => {
    const aboutSlideButton = document.querySelectorAll('.slide-about-page');
    const aboutPanel = document.querySelector('.slide-panel');
    const closeButton = document.querySelector('.close-panel');

    Array.prototype.slice.call(aboutSlideButton).forEach(item => {
      item.addEventListener('click', e => {
        e.preventDefault();
        aboutPanel.classList.add('slide-panel--is-visible');

        document.querySelector('.main-menu--left').classList.remove('js-active-menu');
        document.querySelector('#overlay').classList.remove('js-active');
      });
    })

    closeButton.addEventListener('click', () => {
      aboutPanel.classList.remove('slide-panel--is-visible');
    });
  },
  init() {
    this.slidePage();
  }
};

module.exports = SlidePage;
