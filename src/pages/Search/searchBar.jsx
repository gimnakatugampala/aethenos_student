import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const SearchBar = () => {
  const [keyword, setKeyword] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    console.log(keyword , "jlhasldkhjas")
    router.push(`/Search?keyword=${keyword}`);
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

  return (
    <div className="input-group">
      <input
        type="text"
        className="form-control"
        placeholder="Search"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyPress={handleKeyPress}
      />
     
      <button className="search-btn" type="button" onClick={handleSearch}>
        <i className="icon-2"></i>

      </button>
    </div>
  );
};

export default SearchBar;
