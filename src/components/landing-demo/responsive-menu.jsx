import Link from 'next/link';
import React, { useState } from 'react';

const ResponsiveMenu = ({ isOpen, setIsOpen }) => {
    const [navTitle, setNavTitle] = useState('')

    const openMobileMenu = (menu) => {
        if(navTitle === menu){
            setNavTitle('')
        }
        else {
            setNavTitle(menu)
        }
    }
    return (
        <>
            <div className={`popup-mobile-menu ${isOpen?'active':''}`}>
                <div className="inner">
                    <div className="header-top">
                        <div className="logo">
                            <Link href="/">
                                <a>
                                    <img className="logo-light" src='/assets/images/logo/logo-dark.png' alt="logo" />
                                    <img className="logo-dark" src='/assets/images/logo/logo-white.png' alt="logo" />
                                </a>
                            </Link>
                        </div>

                        <div className="close-menu" onClick={() => setIsOpen(false)}>
                            <button className="close-button">
                                <i className="icon-73"></i>
                            </button>
                        </div>
                    </div>

                    <div className="mm-menu">
                        <ul>
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
                    </div>
                </div>
            </div>

            {/* overlay start */}
            <div onClick={() => setIsOpen(false)} className={`body-overlay ${isOpen ? 'apply' : ''}`}></div>
            {/* overlay end */}
        </>
    )
}

export default ResponsiveMenu;