
const SearchPopup = ({isSearchOpen,setIsSearchOpen}) => {
    const handleSubmit = e => {
      e.preventDefault();
    }
    return (
        <div className={`edu-search-popup ${isSearchOpen ? 'open' : ''}`}>
            <div className="content-wrap">
                <div className="site-logo">
                    <img className="logo-light" src='/assets/images/logo/logo-dark.png' alt="logo" />
                    <img className="logo-dark" src='/assets/images/logo/logo-white.png' alt="logo" />
                </div>
                <div className="close-button" onClick={() => setIsSearchOpen(false)}>
                    <button className="close-trigger"><i className="icon-73"></i></button>
                </div>
                <div className="inner">
                    <form className="search-form" onSubmit={handleSubmit}>
                        <input type="text" className="edublink-search-popup-field" placeholder="Search Here..." />
                        <button className="submit-button"><i className="icon-2"></i></button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SearchPopup;