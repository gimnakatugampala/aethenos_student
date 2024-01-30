import React from 'react';
import menu_data from '../menu-data';
import { useEffect } from 'react';
import { useState } from 'react';
import Cookies from 'js-cookie';

const MainMenu = () => {

    const [CURRENTUSER, setCURRENTUSER] = useState(null)

    useEffect(() => {
        setCURRENTUSER(Cookies.get('aethenos'))
    }, [CURRENTUSER])
    

    return (
        <ul className="mainmenu">
            {menu_data.map((menu, i) => (
                menu.title == "Instructors" && CURRENTUSER != null ? <li key={i}><a href={"https://aethenosinstructor.exon.lk/"}>{menu.title}</a></li> : 
                <li key={i} >
                   <a  href={menu.link}>{menu.title}</a>
                    {/* {!menu.mega_menu && 
                        <ul className="submenu">
                            {menu.submenus.map((nav, i) => (
                                <li key={i}>
                                    <Link href={`${nav.link}`}>

                                        {nav.title}
                                        {nav?.hot && <span className="badge-1">hot</span>}
                                        {nav?.new && <span className="badge">new</span>}

                                    </Link>
                                </li>
                            ))}
                        </ul>
                    } */}
                    {/* {menu.mega_menu && 
                        <ul className="mega-menu">
                            {menu.submenus.map((nav, i) => (
                                <li key={i}>
                                    <h6 className="menu-title">{nav.title}</h6>
                                    <ul className="submenu mega-sub-menu-01">
                                        {nav.mega_submenu.map((m, i) => (
                                            <li key={i}>
                                                <Link href={`${m.link}`}>
                                                    {m.title}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    } */}
                </li>
            ))}
        </ul>
    );
}

export default MainMenu;