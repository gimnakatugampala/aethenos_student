import React from 'react';
import { Footer, Header } from '../../../layout';
import Breadcrumb from '../../breadcrumb/breadcrumb';
import TeamArea from './team-area';

const index = () => {
    return (
        <div className='sticky-header'>
            <div id="main-wrapper" className="main-wrapper">
                <Header no_top_bar={true} />
                <Breadcrumb title={'leadership Instruction'} current_page="Instructors 2" />
                <TeamArea/>
             <Footer />
            </div>
        </div>
    )
}

export default index;