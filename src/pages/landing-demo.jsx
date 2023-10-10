import SEO from '../components/seo';
import { Wrapper } from '../layout';
import HomeLanding from '../components/landing-demo';

const LandingDemo = () => {
    return (
        <Wrapper>
            <SEO pageTitle={'Landing Demo'} />
            <HomeLanding />
        </Wrapper>
    )
}

export default LandingDemo;