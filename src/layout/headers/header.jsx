import Link from 'next/link';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import SearchPopup from '../../components/common/popup-modal/search-popup';
import OffCanvas from '../../components/common/sidebar/off-canvas';
import DropDownProfile from '../../components/profile/dropdwonProfile';
import useCartInfo from '../../hooks/use-cart-info';
import useSticky from '../../hooks/use-sticky';
import { wishlistItems } from '../../redux/features/wishlist-slice';
import HeaderTopLeft from '../headers/component/header-top-left';
import HeaderTopRight from '../headers/component/header-top-right';
import MainMenu from '../headers/component/main-menu';
import Cart from './component/cart';
import SearchBar from '../../pages/Search/searchBar';

const categories = [
    { link: '/courses/design', title: 'Design' },
    { link: '/courses/development', title: 'Development' },
    { link: '/courses/architecture', title: 'Architecture' },
    { link: '/courses/life-style', title: 'Life Style' },
    { link: '/courses/data-science', title: 'Data Science' },
    { link: '/courses/marketing', title: 'Marketing' },
    { link: '/courses/music', title: 'Music' },
    { link: '/courses/photography', title: 'Photography' },
    { link: '/courses/business', title: 'Finance' },
    { link: '/courses/motivation', title: 'Motivation' }
]

const Header = ({header_style, no_top_bar, disable_full_width, disable_category }) => {
    const  activeUser = false;
    const { sticky } = useSticky();
    const { quantity } = useCartInfo();
    const wishlists = useSelector(wishlistItems);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [openProfile, setOpenProfile] = useState(false);

    return (
        <>
            <header className={`edu-header header-style-${header_style ? header_style : '1'} ${ disable_full_width ? 'disbale-header-fullwidth' : 'header-fullwidth' } ${no_top_bar ? 'no-topbar' : ''}`}>
                { ! no_top_bar && 
                    <div className="header-top-bar">
                        <div className="container-fluid">
                            <div className="header-top">
                                <div className="header-top-left">
                                    <HeaderTopLeft />
                                </div>
                                <div className="header-top-right">
                                    <HeaderTopRight />
                                </div>
                            </div>
                        </div>
                    </div>
                }
                <div id="edu-sticky-placeholder"></div>
                <div className={`header-mainmenu ${sticky ? 'edu-sticky' : ''}`}>
                    <div className="container-fluid">
                        <div className="header-navbar">
                            <div className="header-brand">
                                <div className="logo">
                                    <Link href={'/'} legacyBehavior>
                                        <a>
                                            <img className="logo-light" src='/assets/images/logo/Header_Athenos_logo.png' alt="logo" />
                                            <img className="logo-dark" src='/assets/images/logo/Header_Athenos_logo.png' alt="logo" />
                                        </a>
                                    </Link>
                                </div>

                                { ! disable_category &&
                                    <div className="header-category">
                                        <nav className="mainmenu-nav">
                                            <ul className="mainmenu">
                                                <li className="has-droupdown">
                                                    <a href="#"><i className="icon-1"></i>Category</a>
                                                    <ul className="submenu">
                                                        {
                                                            categories.map((category, i) => (
                                                                <li key={i}>
                                                                    <Link href={`${category.link}`} legacyBehavior><a>{category.title}</a></Link>
                                                                </li>
                                                            ) )
                                                        }
                                                    </ul>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                }
                            </div>
                            <div className="header-mainnav">
                                <nav className="mainmenu-nav">
                                    {/* main menu start */}
                                    <MainMenu />
                                    {/* main menu end */}
                                </nav>
                            </div>
                            <div className="header-right">
                                <ul className="header-action">
                                    <li className="search-bar">
                                        <div className="input-group">
                                        <SearchBar/>
                                            {/* <input type="text" className="form-control" placeholder="Search" />
                                            <button className="search-btn" type="button">
                                                <i className="icon-2"></i>
                                            </button> */}
                                        </div>
                                    </li>
                                    <li className="icon search-icon">
                                        <a style={{cursor:'pointer'}} onClick={() => setIsSearchOpen(true)} className="search-trigger">
                                            <i className="icon-2"></i>
                                        </a>
                                    </li>
                                    <li className="icon">
                                        <Link href="/wishlist" legacyBehavior>
                                            <a className="wishlist">
                                                <i className="icon-22"></i>
                                                <span className="count">{wishlists?.length}</span>
                                            </a>
                                        </Link>
                                    </li>
                                    <li className="icon cart-icon">
                                        <Link href="/cart" legacyBehavior>
                                            <a className="cart-icon">
                                                <i className="icon-3"></i>
                                                <span className="count">{quantity}</span>
                                            </a>
                                        </Link>
                                        <Cart />
                                    </li>

                                    
                                        {activeUser ?  <li>
                                           
                                           <img src='/assets/images/user.png' alt='user' onClick={()=> setOpenProfile((prve)=> !prve)} style={{width :50, height: 50,borderRadius:100,border:'solid',borderColor:'black',borderWidth:1,padding:3}} />
                                          
                                       </li>  :  <><li className="header-info">
                                            <Link href="/sign-in" legacyBehavior>
                                                <a className="edu-btn btn-small">Login
                                                </a>
                                            </Link>
                                        </li>
                                        <li className="header-info">
                                                <Link href="/sign-up" legacyBehavior>
                                                    <a className="edu-btn btn-small">Register
                                                    </a>
                                                </Link>
                                            </li></>

                                }
                                {
                                     openProfile && <DropDownProfile />
                                }
                                   
                                    
                                    
                                    <li className="mobile-menu-bar d-block d-xl-none">
                                        <button className="hamberger-button" onClick={() => setIsOpen(true)}>
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

export default Header;