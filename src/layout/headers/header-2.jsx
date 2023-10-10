import Link from 'next/link';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import SearchPopup from '../../components/common/popup-modal/search-popup';
import OffCanvas from '../../components/common/sidebar/off-canvas';
import useCartInfo from '../../hooks/use-cart-info';
import useSticky from '../../hooks/use-sticky';
import { wishlistItems } from '../../redux/features/wishlist-slice';
import MainMenu from './component/main-menu';
import Cart from './component/cart';

const HeaderTwo = ({ style_3, no_topBar = false }) => {
    const { sticky } = useSticky();
    const { quantity } = useCartInfo();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const wishlists = useSelector(wishlistItems);
    return (
        <>
            <header className={`edu-header header-style-${style_3 ? '3' : '2'} ${no_topBar ? 'no-topbar' : ''}`}>
                {!no_topBar && 
                    <div className="header-top-bar">
                        <div className="container">
                            <div className="header-top">
                                <div className="header-top-left">
                                    <ul className="header-info">
                                        <li><a href="tel:+011235641231"><i className="icon-phone"></i>Call: 123 4561 5523</a></li>
                                        <li><a href="mailto:info@edublink.com" rel="noreferrer" target="_blank"><i className="icon-envelope"></i>Email: info@edublink.com</a></li>
                                    </ul>
                                </div>

                                <div className="header-top-right">
                                    <ul className="header-info">
                                        <li><Link href="/sign-in"><a>Login</a></Link></li>
                                        <li><Link href="/sign-in"><a>Register</a></Link></li>
                                        <li className="header-btn"><a href="#" className={`edu-btn ${style_3 ? '' : 'btn-secondary'} btn-medium`}>Apply Now <i className="icon-4"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                }

                <div id="edu-sticky-placeholder"></div>

                <div className={`header-mainmenu ${sticky ? 'edu-sticky' : ''}`}>
                    <div className="container">
                        <div className="header-navbar">
                            <div className="header-brand">
                                <div className="logo">
                                    <Link href="/">
                                        <a>
                                            <img className="logo-light" src={style_3 ? '/assets/images/logo/logo-dark.png' : "/assets/images/logo/logo-dark-2.png"} alt="Corporate Logo" />
                                            <img className="logo-dark" src={style_3 ? '/assets/images/logo/logo-white.png' : "/assets/images/logo/logo-light-2.png"} alt="Corporate Logo" />
                                        </a>
                                    </Link>
                                </div>
                            </div>

                            <div className="header-mainnav">
                                <nav className="mainmenu-nav">
                                    <MainMenu />
                                </nav>
                            </div>

                            <div className="header-right">
                                <ul className="header-action">
                                    <li className="icon search-icon" onClick={() => setIsSearchOpen(true)}>
                                        <a style={{cursor:'pointer'}} className="search-trigger">
                                            <i className="icon-2"></i>
                                        </a>
                                    </li>

                                    <li className="icon">
                                        <Link href="/wishlist">
                                            <a className="wishlist">
                                                <i className="icon-22"></i>
                                                <span className="count">{wishlists?.length}</span>
                                            </a>
                                        </Link>
                                    </li>

                                    <li className="icon cart-icon">
                                        <Link href="/cart">
                                            <a className="cart-icon">
                                                <i className="icon-3"></i>
                                                <span className="count">{quantity}</span>
                                            </a>
                                        </Link>
                                        <Cart />
                                    </li>

                                    {no_topBar && 
                                        <li className="header-btn">
                                            <a href="#" className="edu-btn btn-medium">Apply Now <i className="icon-4"></i></a>
                                        </li>
                                    }

                                    <li className="mobile-menu-bar d-block d-xl-none">
                                        <button className="hamberger-button" onClick={()=> setIsOpen(true)}>
                                            <i className="icon-54"></i>
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
        
                {/* <!-- Start Search Popup  --> */}
                <SearchPopup isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />
                {/* <!-- End Search Popup  --> */}
            </header>

            {/* sidebar start */}
            <OffCanvas isOpen={isOpen} setIsOpen={setIsOpen} />
            {/* sidebar end */}
        </>
    )
}

export default HeaderTwo;