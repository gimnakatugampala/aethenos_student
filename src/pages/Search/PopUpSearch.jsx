import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const SearchBar = ({ isSearchOpen = useState(false), setIsSearchOpen }) => {
  const [keyword, setKeyword] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    router.push(`/search?keyword=${keyword}`);
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
    e.preventDefault();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSearchOpen(false)
  };

  return (
    <div className={`edu-search-popup ${isSearchOpen ? "open" : ""}`}>
      <div className="content-wrap">
        <div className="site-logo">
          <img
            className="logo-light"
            src="/assets/images/logo/Header_Athenos_logo.png"
            alt="logo"
          />
          <img
            className="logo-dark"
            src="/assets/images/logo/Header_Athenos_logo.png"
            alt="logo"
          />
        </div>
        <div className="close-button" onClick={() => setIsSearchOpen(false)}>
          <button className="close-trigger">
            <i className="icon-73"></i>
          </button>
        </div>
        <div className="inner">
          <form className="search-form" onSubmit={handleSubmit}>
            <input
              type="text"
              className="edublink-search-popup-field"
              placeholder="Search Here..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button className="submit-button" onClick={handleSearch}>
              <i className="icon-2"></i>
            </button>
          </form>
          {/* <PopUpSearch/> */}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
