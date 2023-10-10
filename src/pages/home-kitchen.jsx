import SEO from '../components/seo';
import { Wrapper } from '../layout';
import HomeKitchen from '../components/homes/home-kitchen';

const HomeFive = () => {
    return (
        <Wrapper>
            <SEO pageTitle={'Kitchen Coach'} />
            <HomeKitchen />
        </Wrapper>
    )
};

export default HomeFive;