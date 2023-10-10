import SEO from '../components/seo';
import { Wrapper } from '../layout';
import HomeYoga from '../components/homes/home-yoga-instructor';

const HomeSix = () => {
    return (
        <Wrapper>
            <SEO pageTitle={'Yoga Instructor'} />
            <HomeYoga />
        </Wrapper>
    )
}

export default HomeSix;