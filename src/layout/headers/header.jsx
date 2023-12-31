import Link from 'next/link';
import React, { useState , useEffect} from 'react';
import { useSelector } from 'react-redux';
// import SearchPopup from '../../components/common/popup-modal/search-popup';
import PopUpSearch from '../../pages/Search/PopUpSearch';
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
import {  getUserStatus } from '../../api';
import SmallRedLoading from '../../functions/Loading/SmallRedLoading';
import Cookies from 'js-cookie';

const categories = [
    { link: '/courses/design', title: 'Design' },
    { link: '/courses/it-software', title: 'IT & Software' },
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

    const [activeUser, setactiveUser] = useState(false)
    // let  activeUser = false;
    const { sticky } = useSticky();
    const { quantity } = useCartInfo();
    const wishlists = useSelector(wishlistItems);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [openProfile, setOpenProfile] = useState(false);

    const [isUserLoading, setisUserLoading] = useState(true)
    const [CURRENTUSER, setCURRENTUSER] = useState(Cookies.get('aethenos'))

    
    useEffect(() => {
        setTimeout(() => {
            setisUserLoading(false)
        }, 1500);

    }, [])
    

    return (
        <>
            <header className={`edu-header header-style-${header_style ? header_style : '1'} ${ disable_full_width ? 'disbale-header-fullwidth' : 'header-fullwidth' } ${no_top_bar ? 'no-topbar' : ''}`}>
                { ! no_top_bar && 
                    <div className="header-top-bar">
                        <div className="container-fluid">
                            <div className="header-top" style={{height:40}}>
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
                                                    <a href="#"><i className="icon-1"></i>Categories</a>
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
                                    <li className="icon search-icon search-bar">
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

                                    {/* A Loading */}
                                    {isUserLoading ? (
                                        <SmallRedLoading />
                                    ) : (
                                    <>

                                    {CURRENTUSER == null ? (
                                        <>
                                        <li className="header-info">
                                                <Link href="/login" legacyBehavior>
                                                    <a className="edu-btn btn-small">Login
                                                    </a>
                                                </Link>
                                            </li>

                                        <li className="header-info">
                                        <Link href="/register" legacyBehavior>
                                            <a className="edu-btn btn-small">Register
                                            </a>
                                        </Link>
                                        </li>
                                        </>
                                    ) : (

                                    <li> 
                                        <i onClick={()=> setOpenProfile((prve)=> !prve)} class="fas fa-user-circle fa-2x"></i>
                                    </li>
                                    )}
                                            
                                    </>
                                    )}


                                {openProfile && <DropDownProfile setOpenProfile={setOpenProfile} setisUserLoading={setisUserLoading} setCURRENTUSER={setCURRENTUSER}  />}
                                   
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
                <PopUpSearch isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />
                {/* <!-- End Search Popup  --> */}
            </header>

            {/* sidebar start */}
            <OffCanvas isOpen={isOpen} setIsOpen={setIsOpen} />
            {/* sidebar end */}
        </>
    )
}

export default Header;