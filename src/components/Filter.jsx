import React, { useRef } from "react";
import { useClickOutside } from "../utils/hooks";
import { GrFormClose } from "react-icons/gr";
import { useFilters, useLabels } from "../contexts";
import {
  addFilterLabel,
  addFilterPriority,
  clearFilters,
  filterBy,
  removeFilterLabel,
  removeFilterPriority,
  sortBy,
} from "../actions";

export const Filter = ({ className, onClose }) => {
  const filterRef = useRef(null);

  const { filters, filtersDispatch } = useFilters();
  const { labels } = useLabels();

  useClickOutside(filterRef, onClose);

  const handleSortByChange = (e) =>
    e.target.checked && filtersDispatch(sortBy(e.target.value));

  const handleFilterByChange = (e) =>
    e.target.checked && filtersDispatch(filterBy(e.target.value));

  const handleFilterLabelChange = (e) =>
    e.target.checked
      ? filtersDispatch(addFilterLabel(e.target.value))
      : filtersDispatch(removeFilterLabel(e.target.value));

  const handleFilterPriorityChange = (e) =>
    e.target.checked
      ? filtersDispatch(addFilterPriority(e.target.value))
      : filtersDispatch(removeFilterPriority(e.target.value));

  const handleClearFilters = () => filtersDispatch(clearFilters());

  return (
    <div
      ref={filterRef}
      className={`br-sm bg-light p-xl pb-xs fc-fs-fs shadow-light pos-abs z-200 ${
        className ? className : ""
      }`}
    >
      <div className="fr-sb-ct full-width ul-light pb-sm">
        <h4 className="font-medium">Sort & Filter Notes</h4>
        <button onClick={onClose} className="fr-ct-ct ml-xl">
          <GrFormClose className="txt-lg" />
        </button>
      </div>
      <p className="font-medium txt-xs my-sm">Sort By</p>
      <div className="ml-xl mb-sm fc-fs-fs">
        <label htmlFor="newest" className="fr-ct-ct txt-xs cursor-pointer">
          <input
            type="radio"
            name="sort"
            value="newest"
            checked={filters.sortBy === "newest"}
            id="newest"
            className="mr-sm"
            onChange={handleSortByChange}
          />
          Newest First
        </label>
      </div>
      <div className="ml-xl mb-sm fc-fs-fs">
        <label htmlFor="oldest" className="fr-ct-ct txt-xs cursor-pointer">
          <input
            type="radio"
            name="sort"
            value="oldest"
            checked={filters.sortBy === "oldest"}
            id="oldest"
            onChange={handleSortByChange}
            className="mr-sm"
          />
          Oldest First
        </label>
      </div>
      <p className="font-medium txt-xs my-sm">Filter By</p>
      <div className="ml-xl mb-sm fc-fs-fs">
        <label htmlFor="priority" className="fr-ct-ct txt-xs cursor-pointer">
          <input
            type="radio"
            name="filter"
            value="priority"
            checked={filters.filterBy === "priority"}
            id="priority"
            onChange={handleFilterByChange}
            className="mr-sm"
          />
          Priority
        </label>
      </div>
      <div className="ml-xl mb-sm fc-fs-fs">
        <label htmlFor="label" className="fr-ct-ct txt-xs cursor-pointer">
          <input
            type="radio"
            name="filter"
            value="label"
            checked={filters.filterBy === "label"}
            id="label"
            onChange={handleFilterByChange}
            className="mr-sm"
          />
          Label
        </label>
      </div>
      {filters.filterBy && (
        <>
          <p className="font-medium txt-xs my-sm">{filters.filterBy}</p>
          <div className="ml-xl mb-sm fc-fs-fs">
            {filters.filterBy === "label"
              ? labels.map((label) => (
                  <label
                    key={label}
                    htmlFor={label}
                    className="fr-ct-ct txt-xs mb-sm cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      name="filter"
                      value={label}
                      checked={filters.filterLabels.includes(label)}
                      id={label}
                      onChange={handleFilterLabelChange}
                      className="mr-sm"
                    />
                    {label}
                  </label>
                ))
              : ["Low", "High", "Medium"].map((priority) => (
                  <label
                    key={priority}
                    htmlFor={priority}
                    className="fr-ct-ct txt-xs mb-sm cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      name="filter"
                      value={priority}
                      checked={filters.filterPriority.includes(priority)}
                      id={priority}
                      onChange={handleFilterPriorityChange}
                      className="mr-sm"
                    />
                    {priority}
                  </label>
                ))}
          </div>
        </>
      )}
      <button
        onClick={handleClearFilters}
        className="ml-auto mt-sm txt-xs txt-underline hover-light py-xs px-lg br-sm"
      >
        Clear All
      </button>
    </div>
  );
};
