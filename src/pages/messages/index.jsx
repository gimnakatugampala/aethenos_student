import React from 'react'
import Messages from './messages'
import { Wrapper } from '../../layout'
import SEO from '../../components/seo'


const index = () => {
  return (
    <Wrapper>
        <SEO pageTitle={'Messages'} />
        <Messages />
    </Wrapper>
  )
}

export default index