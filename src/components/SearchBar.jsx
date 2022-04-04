import React, { useState } from "react";
import { Input } from "./Input";
import { AiOutlineSearch } from "react-icons/ai";
import { FiFilter } from "react-icons/fi";
import { Filter } from "./Filter";

export const SearchBar = ({ className }) => {
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const handleSearchChange = (e) => setSearch(e.target.value);
  return (
    <div
      className={`fr-ct-ct pos-rel search-bar mb-xl ${
        className ? className : ""
      }`}
    >
      <form className="full-width px-md">
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
