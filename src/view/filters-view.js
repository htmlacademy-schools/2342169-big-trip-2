import AbstractView from '../framework/view/abstract-view.js';

const creatingListFiltersItemTemplate = (filter, curFilter) => {
  const {type, name, count } = filter;
  return (
    `<div class="trip-filters__filter">
      <input id="filter-${name}"
        class="trip-filters__filter-input  visually-hidden"
        type="radio"
        name="trip-filter"
        ${type === curFilter ? 'checked' : ''}
        ${count > 0 ? '' : 'disabled'}
        value=${type}
      >
      <label class="trip-filters__filter-label" for="filter-${name}">${name}</label>
    </div>`
  );
};

const creatingFiltersTemplate = (filterItems, curFilter) => {
  const filterItemsTemplate = Array.from(filterItems).map((filter) => creatingListFiltersItemTemplate(filter, curFilter)).join('');
  return(
    `<form class="trip-filters" action="#" method="get">
     ${filterItemsTemplate}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};

export default class FiltersView extends AbstractView {
  #filters = null;
  #curFilter = null;

  constructor(filters, curFilterType) {
    super();
    this.#filters = filters;
    this.#curFilter = curFilterType;
  }

  get template () { return creatingFiltersTemplate(this.#filters, this.#curFilter); }

  setChangeFilterType = (callback) => {
    this._callback.filterTypeChange = callback;
    this.element.addEventListener('change', this.#handlerChangeFilterType);
  };

  #handlerChangeFilterType = (evt) => {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  };
}

