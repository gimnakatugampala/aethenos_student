import React from 'react'
import { Footer, Header } from '../../layout/index.jsx';
import ForgotPasswordArea from './ForgotPasswordArea.jsx'

const ForgotPasswordMain = () => {
  return (
    <div className='sticky-header'>
            <div id="main-wrapper" className="main-wrapper">
                <Header no_top_bar={true} />
                {/* <BreadcrumbThree title="My Account" subtitle="Account" /> */}
                <ForgotPasswordArea />
             <Footer />
            </div>
        </div>
  )
}

export default ForgotPasswordMain