import SEO from '../components/seo';
import { Wrapper } from '../layout';
import HomeKindergarten from '../components/homes/home-kindergarten';

const HomeSeven = () => {
    return (
        <Wrapper>
            <SEO pageTitle={'Kindergarten'} />
            <HomeKindergarten />
        </Wrapper>
    )
}

export default HomeSeven;