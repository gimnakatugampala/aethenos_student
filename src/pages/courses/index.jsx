import SEO from '../../components/seo';
import { Wrapper } from '../../layout';
import CourseStyleOneMain from './components/course-style-1';

const AllCourses = () => {
    return (
        <Wrapper>
            <SEO pageTitle={'All Courses'} />
            <CourseStyleOneMain />
        </Wrapper>
    )
}

export default AllCourses;