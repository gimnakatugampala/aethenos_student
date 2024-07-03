import React from 'react'
import { Wrapper } from '../../layout'
import SEO from '../../components/seo'
import ForgotPasswordMain from './ForgotPasswordMain'

const index = () => {
  return (
    <Wrapper>
            <SEO pageTitle={'Forgot Password'} />
            <ForgotPasswordMain />
    </Wrapper>
  )
}

export default index