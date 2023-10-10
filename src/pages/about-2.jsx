import SEO from '../components/seo';
import { Wrapper } from '../layout';
import AboutTwoMain from '../components/abouts/about-2';

const AboutTwo = () => {
    return (
        <Wrapper>
            <SEO pageTitle={'About Two'} />
            <AboutTwoMain />
        </Wrapper>
    )
}

export default AboutTwo;