import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getallreviews } from "../../Redux/BookReview/reviewactions";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("booktitle");
  const dispatch = useDispatch();
  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterType(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(getallreviews({ searchTerm, filterType }));
  };

  const clearFilter = () => {
    setSearchTerm("")
    dispatch(getallreviews());
  };

  return (
    <div className="search-bar p-4 bg-gray-100 rounded-lg shadow-md mb-6">
      <form onSubmit={handleSearch} className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder={`Search by ${
            filterType === "bookTitle" ? "Title" : "Author"
          }`}
          value={searchTerm}
          onChange={handleSearchTermChange}
          className="p-2 border border-gray-300 rounded-md outline-none"
        />
        <select
          value={filterType}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="booktitle">Book Title</option>
          <option value="bookauthor">Book Author</option>
        </select>
        <div className="flex gap-2">
          <button
            type="submit"
            className="w-3/6 bg-[#223F7A] text-white p-2 rounded-md hover:bg-opacity-400 transition-colors"
          >
            Search
          </button>
          <button
            onClick={clearFilter}
            type="submit"
            className="w-3/6 bg-[#B71C1C] text-white p-2 rounded-md hover:bg-opacity-400 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
