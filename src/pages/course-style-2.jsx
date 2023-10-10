import SEO from '../components/seo';
import { Wrapper } from '../layout';
import CourseStyleTwoMain from '../components/course-style-2';

const CourseStyleTwo = () => {
    return (
        <Wrapper>
            <SEO pageTitle={'Course Style 2'} />
            <CourseStyleTwoMain />
        </Wrapper>
    )
}

export default CourseStyleTwo;