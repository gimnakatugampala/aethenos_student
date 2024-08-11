import React from 'react';
import { Footer, Header } from '../../layout';
import EditProfileArea from './editprofile';

const index = () => {
    return (
        <div className='sticky-header'>
            <div id="main-wrapper" className="main-wrapper">
                <Header no_top_bar={true} />
                <EditProfileArea />
             <Footer />
            </div>
        </div>
    )
}

export default index;