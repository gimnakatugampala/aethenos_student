import React from 'react';
import menu_data from '../menu-data';
import { InstructorVerify } from '../../../api';
import { useEffect } from 'react';
import { useState } from 'react';

const MainMenu = () => {
    const [CHECK_INSTRUCTOR, setCHECK_INSTRUCTOR] = useState(null)

useEffect(() => {
    InstructorVerify()
    .then(res => {
        setCHECK_INSTRUCTOR(res)
    })

}, [])

    return (
        <ul className="mainmenu">
            {menu_data.map((menu, i) => (
                <li  key={i} >
                    {CHECK_INSTRUCTOR ? (<a onClick={() => window.location.href = "http://aethenos-instructor.infinityfreeapp.com/courses"}>{menu.title}</a>) : (<a href={menu.link}>{menu.title}</a>)}
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