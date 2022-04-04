import { initialFilters } from "../contexts";

export const filterReducer = (filters, action) => {
  switch (action.type) {
    case "SORT_BY":
      return {
        ...filters,
        sortBy: action.payload,
      };
    case "FILTER_BY":
      return {
        ...filters,
        filterBy: action.payload,
      };
    case "ADD_LABEL":
      return {
        ...filters,
        filterLabels: [...filters.filterLabels, action.payload],
      };
    case "REMOVE_LABEL":
      return {
        ...filters,
        filterLabels: filters.filterLabels.filter(
          (item) => item !== action.payload
        ),
      };
    case "ADD_PRIORITY":
      return {
        ...filters,
        filterPriority: [...filters.filterPriority, action.payload],
      };
    case "REMOVE_PRIORITY":
      return {
        ...filters,
        filterPriority: filters.filterPriority.filter(
          (item) => item !== action.payload
        ),
      };
    case "CLEAR_FILTERS":
    default:
      return initialFilters;
  }
};
