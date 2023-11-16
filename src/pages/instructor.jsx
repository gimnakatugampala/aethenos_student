import React from 'react'
import SEO from '../components/seo';
import { Wrapper } from '../layout';
import InstructorLogin from '../components/instructor';

const Instructor = () => {
  return (
    <Wrapper>
            <SEO pageTitle={'Instructor'} />
            <InstructorLogin />
            
    </Wrapper>
  )
}

export default Instructor