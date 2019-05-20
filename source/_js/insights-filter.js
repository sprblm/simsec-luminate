const InsightsFilter = {
  insightList: undefined,
  searchQueries: undefined,
  options: { valueNames: [ 'theme' ] },
  createList: () => {
    InsightsFilter.insightList = new List('insights-list', InsightsFilter.options);
    // InsightsFilter.insightList.sort('title', { order: 'asc' });
    InsightsFilter.setSearchQueryDefaults();
  },
  setSearchQueryDefaults: () => {
    InsightsFilter.searchQueries = { theme: 'all' };
  },
  filterList: searchQueries => {
    const { theme } = searchQueries;

    InsightsFilter.insightList.filter(item => {
      if (
        item.values().theme.indexOf(theme) !== -1
      ) {
        return true;
      }
    });
  },
  filterByDropdowns: () => {
    const dropdown = document.querySelector('.dropdown');

    dropdown.addEventListener('change', e => {
      const filterSelection = e.currentTarget.id;
      let selectedOption;

      Array.from(e.currentTarget.childNodes).forEach(item => {
        if (item.selected === true) {
          selectedOption = item.getAttribute('data-select');
          InsightsFilter.searchQueries[filterSelection] = selectedOption;
        }
      });

      InsightsFilter.filterList(InsightsFilter.searchQueries);
    });
  },
  matchSearchQueriesToUI() {
    const dropdown = document.querySelector('.dropdown');
    InsightsFilter.searchQueries[dropdown.id] = dropdown.selectedOptions[0].getAttribute('data-select');
    const selectedIndex = dropdown.selectedOptions[0].index;

    if (selectedIndex !== -1) {
      dropdown.selectedIndex = selectedIndex;
    }

    InsightsFilter.filterList(InsightsFilter.searchQueries);
  },
  noResultsDiv: () => {
    const insightsCount = document.querySelectorAll('.list-item').length;

    insightsCount > 0
    ? document.querySelector('.no-results').style.display = 'none'
    : document.querySelector('.no-results').style.display = 'block';
  },
  clearAllDropdowns: () => {
    document.querySelector('.clear-all').addEventListener('click', e => {
      e.preventDefault();
      RecommendationsFilter.recommendationList.filter();
      // RecommendationsFilter.recommendationList.sort('title', { order: 'asc' });
      document.querySelectorAll('.dropdown').forEach(dropdown => dropdown.selectedIndex = 0);
    });
  },
  init() {
    const insightsPage = document.querySelector('#insights');
    if (insightsPage) {
      this.createList();
      this.filterByDropdowns();
      this.matchSearchQueriesToUI();
      this.noResultsDiv();
      this.clearAllDropdowns();
    }
  }
}

module.exports = InsightsFilter;
