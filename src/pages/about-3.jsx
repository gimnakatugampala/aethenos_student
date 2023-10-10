import SEO from '../components/seo';
import { Wrapper } from '../layout';
import AboutThreeMain from '../components/abouts/about-3';

const AboutThree = () => {
    return (
        <Wrapper>
            <SEO pageTitle={'About Three'} />
            <AboutThreeMain />
        </Wrapper>
    )
}

export default AboutThree;