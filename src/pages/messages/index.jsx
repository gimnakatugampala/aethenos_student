import React from 'react'
import Messages from './messages'
import { Wrapper } from '../../layout'
import SEO from '../../components/seo'
import CardContainer from '../../contexts/CardContainer'
import { Footer, Header } from '../../layout';

const index = () => {
  return (
    <Wrapper>
        <SEO pageTitle={'Messages'} />
        <Header />
        
        {/* <CardContainer> */}
        <Messages />
        {/* </CardContainer> */}

        <Footer />
    </Wrapper>
  )
}

export default index