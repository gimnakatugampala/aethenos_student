import SEO from '../components/seo';
import { Wrapper } from '../layout';
import CourseDetailsTwoMain from '../components/course-details-2';
import { course_data } from '../data';

const course = course_data[0]

const CourseDetailsTwo = () => {
    return (
        <Wrapper>
            <SEO pageTitle={'Course Details 2'} />
            <CourseDetailsTwoMain course={course} />
        </Wrapper>
    )
}

export default CourseDetailsTwo;