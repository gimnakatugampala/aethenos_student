import React, { useState, useCallback } from "react";
import { useRouter } from "next/router";
import Swal from "sweetalert2/dist/sweetalert2.js";
import Dropdown from "react-bootstrap/Dropdown";
import { SearchItemsByKeyword } from "../../api";
import debounce from "lodash.debounce";

const SearchBar = ({ setShowDropdown, setsearchResults }) => {
  const [keyword, setKeyword] = useState("");
  const router = useRouter();

  // Debounced version of the search function
  const debouncedSearch = useCallback(
    debounce((searchTerm) => {
      SearchItemsByKeyword(searchTerm, setsearchResults);
    }, 300), // Adjust debounce delay as needed
    [setsearchResults]
  );

  const handleSearch = () => {
    if (keyword === "") {
      Swal.fire({
        title: "Empty Field!",
        text: "Please Enter Search Keyword",
        icon: "error",
      });
    } else {
      router.push(`/search?keyword=${encodeURIComponent(keyword)}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleFocus = () => {
    setShowDropdown(true);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setShowDropdown(false);
      if (setsearchResults) {
        setsearchResults(null);
      }
    }, 100);
  };

  const handleKeywordSearch = (e) => {
    const searchTerm = e.target.value;
    setKeyword(searchTerm);
    debouncedSearch(searchTerm);
  };

  return (
    <div className="input-group d-none d-sm-flex">
      <input
        type="text"
        className="form-control"
        placeholder="Search"
        value={keyword}
        onChange={handleKeywordSearch}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyPress={handleKeyPress}
      />

      <button className="search-btn" type="button" onClick={handleSearch}>
        <i className="icon-2"></i>
      </button>
    </div>
  );
};

export default SearchBar;
