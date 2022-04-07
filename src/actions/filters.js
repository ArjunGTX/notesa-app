export const sortBy = (payload) => ({
  type: "SORT_BY",
  payload,
});

export const filterBy = (payload) => ({
  type: "FILTER_BY",
  payload,
});

export const addFilterLabel = (payload) => ({
  type: "ADD_LABEL",
  payload,
});

export const removeFilterLabel = (payload) => ({
  type: "REMOVE_LABEL",
  payload,
});

export const addFilterPriority = (payload) => ({
  type: "ADD_PRIORITY",
  payload,
});

export const removeFilterPriority = (payload) => ({
  type: "REMOVE_PRIORITY",
  payload,
});

export const clearFilters = () => ({
  type: "CLEAR_FILTERS",
});

export const searchNote = (query) => ({
  type: "SEARCH_NOTES",
  payload: query,
});
