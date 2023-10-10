import SEO from '../components/seo';
import { Wrapper } from '../layout';
import HomeDistantLearning from '../components/homes/home-distant-learning';

const HomeTwo = () => {
    return (
        <Wrapper>
            <SEO pageTitle={'Distant Learning'} />
            <HomeDistantLearning />
        </Wrapper>
    )
}

export default HomeTwo;