const Search = {
  fixedSearchTrigger() {
    // Search Click Behavior
    $('.js-trigger-search').on('click', e => {
      e.preventDefault();
      $(e.currentTarget)
        .parent()
        .addClass('js-active');
      $('#overlay').addClass('js-active');
    });
  },
  init() {
    this.fixedSearchTrigger();
  }
};

module.exports = Search;
