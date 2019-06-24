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
    RecommendationsFilter.recommendationList = new List('recommendations-list', RecommendationsFilter.options);
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
    const dropdownFilter = document.querySelector('.dropdown');
    let filterSelection;
    let selectedOption;

    dropdownFilter.addEventListener('change', e => {
      Array.prototype.slice.call(e.currentTarget.childNodes).forEach(optgroup => {
        if (optgroup.getAttribute('data-select') === 'all') {
          RecommendationsFilter.setSearchQueryDefaults();
        } else {
          Array.prototype.slice.call(optgroup.childNodes).forEach(option => {
            if (option.selected === true) {
              filterSelection = option.getAttribute('data-type');
              selectedOption = option.getAttribute('data-select');
              RecommendationsFilter.setSearchQueryDefaults();
              RecommendationsFilter.searchQueries[filterSelection] = selectedOption;
            }
          });
        }
      });
      RecommendationsFilter.filterList(RecommendationsFilter.searchQueries)
    });
  },
  filterByUrlParams: () => {
    const searchQuery = window.location.search.split('=')[0].slice(1);
    const searchParam = window.location.search.split('=')[1];

    if (searchQuery) {
      const selectOptions = document.querySelector(`#${searchQuery}`).childNodes;

      selectOptions.forEach(option => {
        if (option.getAttribute('data-select') === searchParam) {
          option.selected = true;
        }
      });
    }
    RecommendationsFilter.searchQueries[searchQuery] = searchParam;
    RecommendationsFilter.filterList(RecommendationsFilter.searchQueries);
    RecommendationsFilter.matchSearchQueriesToUI();
  },
  matchSearchQueriesToUI() {
    const dropdown = document.querySelector('.dropdown');
    const selectedIndex = dropdown.options[dropdown.selectedIndex];

    RecommendationsFilter.searchQueries[dropdown.id] = dropdown.options[dropdown.selectedIndex].getAttribute('data-select');

    if (selectedIndex !== -1) {
      dropdown.selectedIndex = selectedIndex;
    }

    RecommendationsFilter.filterList(RecommendationsFilter.searchQueries);
  },
  clearAllDropdowns: () => {
    document.querySelector('.clear-all').addEventListener('click', e => {
      e.preventDefault();
      RecommendationsFilter.setSearchQueryDefaults();
      RecommendationsFilter.recommendationList.filter();
      RecommendationsFilter.recommendationList.sort('title', { order: 'asc' });
      document.querySelectorAll('.dropdown').forEach(dropdown => dropdown.selectedIndex = 0);
      document.querySelector('.no-results').style.display = 'none';
    });
  },
  init() {
    const recommendationsPage = document.querySelector('#recommendations');

    if (recommendationsPage) {
      this.createList();
      this.filterByDropdowns();
      this.filterByUrlParams();
      this.clearAllDropdowns();
    }
  }
}

module.exports = RecommendationsFilter;
