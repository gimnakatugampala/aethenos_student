import SEO from '../components/seo';
import { Wrapper } from '../layout';
import HomeUniversity from '../components/homes/home-university';

const HomeThree = () => {
    return (
        <Wrapper>
            <SEO pageTitle={'University'} />
            <HomeUniversity />
        </Wrapper>
    )
}

export default HomeThree;