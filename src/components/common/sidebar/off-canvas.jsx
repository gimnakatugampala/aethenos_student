import Link from 'next/link';
import React, { useState } from 'react';
import menu_data from '../../../layout/headers/menu-data';

const OffCanvas = ({ isOpen, setIsOpen }) => {
    const [navTitle, setNavTitle] = useState('')

    const openMobileMenu = (menu) => {
        if(navTitle === menu){
            setNavTitle('')
        }
        else {
            setNavTitle(menu)
        }
    }
    return <>
        <div className={`popup-mobile-menu ${isOpen?'active':''}`}>
            <div className="inner">
                <div className="header-top">
                    <div className="logo">
                        <a href="/" >

                            <img className="logo-light" src='/assets/images/logo/Header_Athenos_logo.png' alt="logo" />
                            <img className="logo-dark" src='/assets/images/logo/Header_Athenos_logo.png' alt="logo" />

                        </a>
                    </div>

                    <div className="close-menu px-3" onClick={() => setIsOpen(false)}>
                        <button className="close-button">
                            <i className="icon-73"></i>
                        </button>
                    </div>
                </div>

                <div className="mm-menu">
                    <ul>
                        {menu_data.map((menu, i) => (
                            <li key={i} className={!menu.submenus ? '' : navTitle === menu?.title ? 
                            "has-droupdown active" : "has-droupdown"}>
                                {menu.submenus && <button  onClick={() => openMobileMenu(menu.title)}>{menu.title} </button>}

                                {!menu.mobile_pages_menu &&
                                    <ul className={navTitle === menu?.title ? "sub-menu active" : "sub-menu"}>
                                        {menu?.submenus?.map((sub,i) => (
                                            <li key={i}><a href={`${sub.link}`} >{sub.title}</a></li>
                                        ))}
                                    </ul>
                                }

                                {menu.mobile_pages_menu &&
                                    <ul className={navTitle === menu?.title ? "sub-menu active" : "sub-menu"}>
                                        {menu?.mobile_pages_menu?.map((sub,i) => (
                                            <li key={i}><a href={`${sub.link}`} >{sub.title}</a></li>
                                        ))}
                                    </ul>
                                }
                                
                                {!menu.submenus && <a href={menu.link}>{menu.title}</a>}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>

        {/* overlay start */}
        <div onClick={() => setIsOpen(false)} className={`body-overlay ${isOpen ? 'apply' : ''}`}></div>
        {/* overlay end */}
    </>;
}

export default OffCanvas;