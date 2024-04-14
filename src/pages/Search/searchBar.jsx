import React, { useState } from "react";
import { useRouter } from "next/router";
import Swal from "sweetalert2/dist/sweetalert2.js";
import Dropdown from 'react-bootstrap/Dropdown';


const SearchBar = () => {
  const [keyword, setKeyword] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();

  const handleSearch = () => {
    if (keyword == "") {
      Swal.fire({
        title: "Empty Field!",
        text: "Please Enter Search Keyword",
        icon: "error",
      });
    } else {
      router.push(`/search?keyword=${keyword}`);
    }
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
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
    setShowDropdown(false);
  };

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

 

  return (
    <div className="input-group d-none d-sm-flex">
      <input
        type="text"
        className="form-control"
        placeholder="Search"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyPress={handleKeyPress}
      />

      <button className="search-btn" type="button" onClick={handleSearch}>
        <i className="icon-2"></i>
      </button>

      {/* {showDropdown && ( */}
      <Dropdown show={showDropdown} onToggle={handleDropdownToggle}>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Dropdown Button
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
     
      {/* )} */}
    </div>
  );
};

export default SearchBar;
