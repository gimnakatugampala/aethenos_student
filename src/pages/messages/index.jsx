import React from 'react'
import Messages from './messages'
import { Wrapper } from '../../layout'
import SEO from '../../components/seo'
import CardContainer from '../../contexts/CardContainer'


const index = () => {
  return (
    <Wrapper>
        <SEO pageTitle={'Messages'} />
        <CardContainer>

        <Messages />
        </CardContainer>
    </Wrapper>
  )
}

export default index