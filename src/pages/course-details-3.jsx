import SEO from '../components/seo';
import { Wrapper } from '../layout';
import CourseDetailsThreeMain from '../components/course-details-3';

const CourseDetailsThree = () => {
    return (
        <Wrapper>
            <SEO pageTitle={'Course Details 3'} />
            <CourseDetailsThreeMain />
        </Wrapper>
    )
}

export default CourseDetailsThree;