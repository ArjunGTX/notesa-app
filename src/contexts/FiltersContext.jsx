import { createContext, useReducer, useContext } from "react";
import { filterReducer } from "../reducers";

const FiltersContext = createContext(null);

export const initialFilters = {
  sortBy: "",
  filterBy: "",
  filterLabels: [],
  filterPriority: [],
};

export const useFilters = () => useContext(FiltersContext);

export const FiltersProvider = ({ children }) => {
  const [filters, filtersDispatch] = useReducer(filterReducer, initialFilters);

  return (
    <FiltersContext.Provider value={{ filters, filtersDispatch }}>
      {children}
    </FiltersContext.Provider>
  );
};
