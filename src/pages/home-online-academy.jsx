import SEO from '../components/seo';
import { Wrapper } from '../layout';
import HomeOnlineAcademy from '../components/homes/home-online-academy';

const HomeFour = () => {
    return (
        <Wrapper>
            <SEO pageTitle={'Online Academy'} />
            <HomeOnlineAcademy />
        </Wrapper>
    )
};

export default HomeFour;