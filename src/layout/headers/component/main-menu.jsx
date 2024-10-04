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
                menu.title == "Instructor" && CURRENTUSER != null ? <li key={i}><a style={{fontSize: "20px"}} href={"https://instructor.aethenos.com/"}>{menu.title}</a></li> : 
                <li key={i} >
                   <a style={{fontSize: "20px", padding: "0px 20px"}} href={menu.link}>{menu.title}</a>
                  
                </li>
            ))}
        </ul>
    );
}

export default MainMenu;