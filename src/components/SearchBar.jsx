import React, { useState, useEffect } from "react";
import { Input } from "./Input";
import { AiOutlineSearch } from "react-icons/ai";
import { FiFilter } from "react-icons/fi";
import { Filter } from "./Filter";
import { useFilters } from "../contexts";
import { searchNote } from "../actions";
import { useDebounce } from "../utils/hooks";

export const SearchBar = ({ className }) => {
  const { filtersDispatch } = useFilters();

  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    debouncedFilterBySearch(search);
  }, [search]);

  const filterBySearch = (query) => {
    filtersDispatch(searchNote(query));
  };

  const debouncedFilterBySearch = useDebounce(filterBySearch, 500);

  const handleSearchChange = (e) => setSearch(e.target.value);

  const handleSearchFormSubmit = (e) => {
    e.preventDefault();
    filterBySearch(search);
  };

  return (
    <div
      className={`fr-ct-ct pos-rel search-bar mb-xl ${
        className ? className : ""
      }`}
    >
      <form className="full-width px-md" onSubmit={handleSearchFormSubmit}>
        <button className="pos-abs search-btn">
          <AiOutlineSearch className="txt-lg" />
        </button>
        <Input
          type="text"
          placeholder="Search Notes..."
          value={search}
          onChange={handleSearchChange}
        />
      </form>
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="pos-abs filter-btn"
      >
        <FiFilter className="txt-md" />
      </button>
      {showFilters && (
        <Filter
          onClose={() => setShowFilters(false)}
          className="bottom-right"
        />
      )}
    </div>
  );
};
