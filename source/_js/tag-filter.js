const TagFilter = {
  listUrl: '/recommendations.html',
  baseUrl: '',
  searchListUrl: undefined,
  filterByTag: () => {
    $('.tag-filter-link').on('click', e => {
      e.preventDefault();
      const filterTag = e.target.getAttribute('filter-tag');
      const query = e.target.getAttribute('filter-query');
      const url = document.location.origin;

      TagFilter.searchListUrl = `${url}${TagFilter.baseUrl}${TagFilter.listUrl}?${filterTag}=${query}`;
      window.location.href = TagFilter.searchListUrl;
    });
  },
  init() {
    this.filterByTag();
  }
};

module.exports = TagFilter;
