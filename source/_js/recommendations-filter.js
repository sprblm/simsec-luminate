const RecommendationsFilter = {
  recommendationList: undefined,
  searchQueries: undefined,
  options: {
    valueNames: [
      'title',
      'theme',
      'insight'
    ]
  },
  createList: () => {
    if (document.location.href.indexOf('recommendations') > -1) {
      RecommendationsFilter.recommendationList = new List('recommendations-list', RecommendationsFilter.options);
      RecommendationsFilter.recommendationList.sort('title', { order: 'asc' });
    }
    RecommendationsFilter.setSearchQueryDefaults();
  },
  setSearchQueryDefaults: () => {
    RecommendationsFilter.searchQueries = {
      theme: 'all',
      insight: 'all',
    };
  },
  filterList: searchQueries => {
    const { theme, insight } = searchQueries;

    RecommendationsFilter.recommendationList.filter(item => {
      if (
        item.values().theme.indexOf(theme) !== -1 &&
        item.values().insight.indexOf(insight) !== -1
      ) {
        return true;
      }
    });
  },
  filterByDropdowns: () => {
    const dropdownFilters = document.querySelectorAll('.dropdown');

    dropdownFilters.forEach(filter => {
      filter.addEventListener('change', e => {
        const filterSelection = e.currentTarget.id;
        let selectedOption;

        Array.from(e.currentTarget.childNodes).forEach(item => {
          if (item.selected === true) {
            selectedOption = item.getAttribute('data-select');
            RecommendationsFilter.searchQueries[filterSelection] = selectedOption;
          }
        });
        RecommendationsFilter.filterList(RecommendationsFilter.searchQueries);
      });
    });
  },
  init() {
    this.createList();
    this.filterByDropdowns();
  }
}

module.exports = RecommendationsFilter;
