import React, { useState } from 'react';
import Link from 'next/link';
import useSticky from '../../hooks/use-sticky';
import ResponsiveMenu from './responsive-menu';

const Header = () => {
    const { sticky } = useSticky();
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <header className="edu-header header-style-1 pv-header-style">
                <div id="edu-sticky-placeholder"></div>
                <div className={`header-mainmenu ${sticky ? 'edu-sticky' : ''}`}>
                    <div className="container-custom">
                        <div className="header-navbar">
                            <div className="header-brand">
                                <div className="logo">
                                    <Link href="/">
                                        <a>
                                            <img className="logo-light" src="/assets/images/logo/logo-dark.png" alt="Corporate Logo" />
                                            <img className="logo-dark" src="/assets/images/logo/logo-white.png" alt="Corporate Logo" />
                                        </a>
                                    </Link>
                                </div>
                            </div>
                            <div className="header-mainnav">
                                <nav className="mainmenu-nav">
                                    <ul className="mainmenu">
                                        <li>
                                            <a href="#intro">Intro</a>
                                        </li>
                                        <li>
                                            <a href="#demos">Demos</a>
                                        </li>
                                        <li>
                                            <a href="https://docs.devsblink.com/edublink-react/" target="_blank">Documentation</a>
                                        </li>
                                        <li>
                                            <a href="https://devsblink.freshdesk.com/" target="_blank">Support</a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                            <div className="header-right">
                                <ul className="header-action">
                                    <li className="header-btn">
                                        <a href="https://1.envato.market/AoJezj" target="_blank" className="edu-btn btn-medium">Purchase Now</a>
                                    </li>
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

                <div className="popup-mobile-menu splash-mobile-menu">
                    <div className="inner">
                        <div className="header-top">
                            <div className="logo">
                                <Link href="/">
                                    <a>
                                        <img className="logo-light" src="/assets/images/logo/logo-dark.png" alt="Corporate Logo" />
                                        <img className="logo-dark" src="/assets/images/logo/logo-white.png" alt="Corporate Logo" />
                                    </a>
                                </Link>
                            </div>
                            <div className="close-menu">
                                <button className="close-button">
                                    <i className="icon-73"></i>
                                </button>
                            </div>
                        </div>
                        <ul className="mainmenu">
                            <li>
                                <a href="#intro">Intro</a>
                            </li>
                            <li>
                                <a href="#demos">Demos</a>
                            </li>
                            <li>
                                <a href="https://docs.devsblink.com/edublink-react/" target="_blank">Documentation</a>
                            </li>
                            <li>
                                <a href="https://devsblink.freshdesk.com/" target="_blank">Support</a>
                            </li>
                            <li className="header-btn">
                                <a href="https://1.envato.market/AoJezj" target="_blank" className="edu-btn btn-medium">Purchase Now</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>

            {/* sidebar start */}
            <ResponsiveMenu isOpen={isOpen} setIsOpen={setIsOpen} />
            {/* sidebar end */}
        </>
    )
}

export default Header;